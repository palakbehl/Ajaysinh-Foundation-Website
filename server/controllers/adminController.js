import Campaign from '../models/Campaign.js';
import Blog from '../models/Blog.js';
import Donation from '../models/Donation.js';
import Volunteer from '../models/Volunteer.js';
import CSRInquiry from '../models/CSRInquiry.js';
import ContactMessage from '../models/ContactMessage.js';

/**
 * @desc    Get live dashboard analytics and counts
 * @route   GET /api/admin/dashboard
 * @access  Private (Admin)
 */
export const getDashboardStats = async (req, res, next) => {
  try {
    const mongoose = (await import('mongoose')).default;
    if (mongoose.connection.readyState !== 1) {
      return res.status(200).json({
        success: true,
        stats: {
          totalCampaigns: 4,
          activeCampaigns: 4,
          totalBlogs: 3,
          totalDonations: 0,
          totalDonationAmount: 0,
          totalVolunteers: 0,
          pendingVolunteers: 0,
          totalCSRInquiries: 0,
          newCSRInquiries: 0,
          totalMessages: 0,
          unreadMessages: 0,
        },
        recentActivity: {
          donations: [],
          volunteers: [],
          inquiries: [],
          messages: [],
        },
        isOfflineFallback: true,
      });
    }

    const [
      totalCampaigns,
      activeCampaigns,
      totalBlogs,
      totalDonations,
      donationSumResult,
      totalVolunteers,
      pendingVolunteers,
      totalCSRInquiries,
      newCSRInquiries,
      totalMessages,
      unreadMessages,
      recentDonations,
      recentVolunteers,
      recentInquiries,
      recentMessages,
    ] = await Promise.all([
      Campaign.countDocuments(),
      Campaign.countDocuments({ status: { $regex: /^active$/i } }),
      Blog.countDocuments(),
      Donation.countDocuments(),
      Donation.aggregate([
        { $match: { status: 'successful' } },
        { $group: { _id: null, totalAmount: { $sum: '$amount' } } },
      ]),
      Volunteer.countDocuments(),
      Volunteer.countDocuments({ status: { $regex: /^pending$/i } }),
      CSRInquiry.countDocuments(),
      CSRInquiry.countDocuments({ status: { $regex: /^new$/i } }),
      ContactMessage.countDocuments(),
      ContactMessage.countDocuments({ read: false }),
      Donation.find().sort({ createdAt: -1 }).limit(5),
      Volunteer.find().sort({ createdAt: -1 }).limit(5),
      CSRInquiry.find().sort({ createdAt: -1 }).limit(5),
      ContactMessage.find().sort({ createdAt: -1 }).limit(5),
    ]);

    const totalDonationAmount = donationSumResult.length > 0 ? donationSumResult[0].totalAmount : 0;

    res.status(200).json({
      success: true,
      stats: {
        totalCampaigns,
        activeCampaigns,
        totalBlogs,
        totalDonations,
        totalDonationAmount,
        totalVolunteers,
        pendingVolunteers,
        totalCSRInquiries,
        newCSRInquiries,
        totalMessages,
        unreadMessages,
      },
      recentActivity: {
        donations: recentDonations,
        volunteers: recentVolunteers,
        inquiries: recentInquiries,
        messages: recentMessages,
      },
    });
  } catch (error) {
    next(error);
  }
};
