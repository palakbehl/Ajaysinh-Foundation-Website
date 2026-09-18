import mongoose from 'mongoose';
import Donation from '../models/Donation.js';
import Campaign from '../models/Campaign.js';

let fallbackDonations = [
  {
    _id: 'don-demo-1',
    donorName: 'Vikram Malhotra',
    email: 'vikram.m@example.com',
    phone: '+91 98200 11223',
    amount: 5000,
    paymentMethod: 'UPI',
    transactionId: 'UPI9823491021',
    status: 'successful',
    campaignTitle: 'Bright Futures Education Program',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    _id: 'don-demo-2',
    donorName: 'Sunita Sharma',
    email: 'sunita.sharma@example.com',
    phone: '+91 97111 44556',
    amount: 2500,
    paymentMethod: 'Card',
    transactionId: 'TXN48102941',
    status: 'successful',
    campaignTitle: 'Safe Shelter Initiative',
    createdAt: new Date(Date.now() - 172800000).toISOString(),
  },
];

/**
 * @desc    Get all donations (Admin with search & filters)
 * @route   GET /api/donations
 * @access  Private (Admin)
 */
export const getDonations = async (req, res, next) => {
  try {
    const { search, status, paymentMethod, page, limit } = req.query;

    if (mongoose.connection.readyState !== 1) {
      let filtered = [...fallbackDonations];
      if (status && status !== 'All Status') {
        filtered = filtered.filter((d) => d.status.toLowerCase() === status.toLowerCase());
      }
      if (paymentMethod && paymentMethod !== 'All Methods') {
        filtered = filtered.filter((d) => d.paymentMethod.toLowerCase() === paymentMethod.toLowerCase());
      }
      if (search) {
        const s = search.toLowerCase();
        filtered = filtered.filter((d) => d.donorName.toLowerCase().includes(s) || d.email.toLowerCase().includes(s));
      }
      const sum = filtered.filter((d) => d.status === 'successful').reduce((acc, d) => acc + d.amount, 0);

      return res.status(200).json({
        success: true,
        count: filtered.length,
        total: filtered.length,
        successfulAmount: sum,
        page: 1,
        pages: 1,
        donations: filtered,
        isOfflineFallback: true,
      });
    }

    const query = {};

    if (status && status !== 'All Status') {
      query.status = status.toLowerCase();
    }

    if (paymentMethod && paymentMethod !== 'All Methods') {
      query.paymentMethod = paymentMethod.toLowerCase();
    }

    if (search) {
      query.$or = [
        { donorName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { transactionId: { $regex: search, $options: 'i' } },
        { paymentId: { $regex: search, $options: 'i' } },
      ];
    }

    const pageSize = parseInt(limit, 10) || 50;
    const currentPage = parseInt(page, 10) || 1;
    const skip = (currentPage - 1) * pageSize;

    const total = await Donation.countDocuments(query);
    const donations = await Donation.find(query)
      .populate('campaignId', 'title slug')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(pageSize);

    // Calculate aggregated stats
    const totalAmountAgg = await Donation.aggregate([
      { $match: { status: 'successful' } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);
    const successfulAmount = totalAmountAgg.length > 0 ? totalAmountAgg[0].total : 0;

    res.status(200).json({
      success: true,
      count: donations.length,
      total,
      successfulAmount,
      page: currentPage,
      pages: Math.ceil(total / pageSize) || 1,
      donations,
    });
  } catch (error) {
    console.warn('getDonations DB fallback triggered:', error.message);
    const sum = fallbackDonations.reduce((acc, d) => acc + d.amount, 0);
    res.status(200).json({
      success: true,
      count: fallbackDonations.length,
      total: fallbackDonations.length,
      successfulAmount: sum,
      page: 1,
      pages: 1,
      donations: fallbackDonations,
      isOfflineFallback: true,
    });
  }
};

/**
 * @desc    Get single donation by ID
 * @route   GET /api/donations/:id
 * @access  Private (Admin)
 */
export const getDonationById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (mongoose.connection.readyState !== 1) {
      const found = fallbackDonations.find((d) => d._id === id);
      if (found) return res.status(200).json({ success: true, donation: found });
      return res.status(404).json({ success: false, message: 'Donation record not found' });
    }

    const donation = await Donation.findById(id).populate('campaignId', 'title slug goalAmount raisedAmount');

    if (!donation) {
      const fallback = fallbackDonations.find((d) => d._id === id);
      if (fallback) return res.status(200).json({ success: true, donation: fallback });
      return res.status(404).json({
        success: false,
        message: 'Donation record not found',
      });
    }

    res.status(200).json({
      success: true,
      donation,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Submit public donation
 * @route   POST /api/donations
 * @access  Public
 */
export const createDonation = async (req, res, next) => {
  try {
    const {
      fullName,
      donorName,
      email,
      phone,
      pan,
      country,
      address,
      amount,
      paymentMethod,
      paymentId,
      transactionId,
      isAnonymous,
      isRecurring,
      claim80G,
      message,
      campaignId,
    } = req.body;

    if (!amount || Number(amount) <= 0) {
      return res.status(400).json({
        success: false,
        message: 'A valid donation amount is required',
      });
    }

    if (mongoose.connection.readyState !== 1) {
      const newDonation = {
        _id: `don-${Date.now()}`,
        donorName: isAnonymous ? 'Anonymous' : (fullName || donorName || 'Supporter'),
        email,
        phone,
        pan,
        country: country || 'India',
        address,
        amount: Number(amount),
        paymentMethod: paymentMethod || 'online',
        paymentId,
        transactionId,
        status: transactionId || paymentId ? 'successful' : 'pending',
        campaignId: campaignId || null,
        campaignTitle: 'Support Ajaysinh Foundation Causes',
        createdAt: new Date().toISOString(),
      };
      fallbackDonations.unshift(newDonation);
      return res.status(201).json({
        success: true,
        message: 'Donation processed successfully. Thank you for your generosity! (Offline mode)',
        donation: newDonation,
      });
    }

    let campaignTitle = '';
    if (campaignId) {
      const campaign = await Campaign.findById(campaignId);
      if (campaign) {
        campaignTitle = campaign.title;
        campaign.raisedAmount = (campaign.raisedAmount || 0) + Number(amount);
        await campaign.save();
      }
    }

    const donation = await Donation.create({
      donorName: isAnonymous ? 'Anonymous' : (fullName || donorName || 'Supporter'),
      email,
      phone,
      pan,
      country: country || 'India',
      address,
      amount: Number(amount),
      paymentMethod: paymentMethod || 'online',
      paymentId,
      transactionId,
      anonymous: Boolean(isAnonymous),
      isRecurring: Boolean(isRecurring),
      claim80G: Boolean(claim80G),
      message,
      status: transactionId || paymentId ? 'successful' : 'pending',
      campaignId: campaignId || null,
      campaignTitle,
    });

    res.status(201).json({
      success: true,
      message: 'Donation processed successfully. Thank you for your generosity!',
      donation,
    });
  } catch (error) {
    next(error);
  }
};
