import mongoose from 'mongoose';
import CSRInquiry from '../models/CSRInquiry.js';

let fallbackCSRInquiries = [
  {
    _id: 'csr-demo-1',
    companyName: 'Apex Innovations Pvt Ltd',
    contactPerson: 'Karan Mehra',
    email: 'karan.mehra@apex.com',
    phone: '+91 98111 22334',
    csrInterest: 'Education & Digital Literacy',
    proposedBudget: '₹10L - ₹25L',
    message: 'We are interested in funding smart classes in rural primary schools as part of our FY26 CSR initiative.',
    status: 'New',
    createdAt: new Date().toISOString(),
  },
  {
    _id: 'csr-demo-2',
    companyName: 'Horizon Healthcare Logistics',
    contactPerson: 'Dr. Shalini Gupta',
    email: 'shalini@horizonlogistics.in',
    phone: '+91 98222 33445',
    csrInterest: 'Healthcare & Mobile Medical Vans',
    proposedBudget: '₹25L+',
    message: 'Proposal to deploy 2 mobile healthcare diagnosis units for elder care in suburban Delhi.',
    status: 'In Progress',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

/**
 * @desc    Get all CSR inquiries (Admin with search & filters)
 * @route   GET /api/csr-inquiries
 * @access  Private (Admin)
 */
export const getCSRInquiries = async (req, res, next) => {
  try {
    const { search, status, page, limit } = req.query;

    if (mongoose.connection.readyState !== 1) {
      let filtered = [...fallbackCSRInquiries];
      if (status && status !== 'All Status') {
        filtered = filtered.filter((c) => c.status.toLowerCase() === status.toLowerCase());
      }
      if (search) {
        const s = search.toLowerCase();
        filtered = filtered.filter(
          (c) => c.companyName.toLowerCase().includes(s) || c.contactPerson.toLowerCase().includes(s)
        );
      }
      return res.status(200).json({
        success: true,
        count: filtered.length,
        total: filtered.length,
        page: 1,
        pages: 1,
        inquiries: filtered,
        isOfflineFallback: true,
      });
    }

    const query = {};

    if (status && status !== 'All Status') {
      query.status = { $regex: new RegExp(`^${status}$`, 'i') };
    }

    if (search) {
      query.$or = [
        { companyName: { $regex: search, $options: 'i' } },
        { contactPerson: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { csrInterest: { $regex: search, $options: 'i' } },
      ];
    }

    const pageSize = parseInt(limit, 10) || 50;
    const currentPage = parseInt(page, 10) || 1;
    const skip = (currentPage - 1) * pageSize;

    const total = await CSRInquiry.countDocuments(query);
    const inquiries = await CSRInquiry.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(pageSize);

    res.status(200).json({
      success: true,
      count: inquiries.length,
      total,
      page: currentPage,
      pages: Math.ceil(total / pageSize) || 1,
      inquiries,
    });
  } catch (error) {
    console.warn('getCSRInquiries DB fallback triggered:', error.message);
    res.status(200).json({
      success: true,
      count: fallbackCSRInquiries.length,
      total: fallbackCSRInquiries.length,
      page: 1,
      pages: 1,
      inquiries: fallbackCSRInquiries,
      isOfflineFallback: true,
    });
  }
};

/**
 * @desc    Update CSR inquiry status
 * @route   PUT /api/csr-inquiries/:id
 * @access  Private (Admin)
 */
export const updateCSRStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['New', 'Contacted', 'In Progress', 'Completed'];
    const normalizedStatus = validStatuses.find(
      (s) => s.toLowerCase() === (status || '').toLowerCase()
    );

    if (!normalizedStatus) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be New, Contacted, In Progress, or Completed',
      });
    }

    if (mongoose.connection.readyState !== 1) {
      const inq = fallbackCSRInquiries.find((c) => c._id === id);
      if (inq) {
        inq.status = normalizedStatus;
        return res.status(200).json({
          success: true,
          message: `Inquiry status updated to ${normalizedStatus} (Offline mode)`,
          inquiry: inq,
        });
      }
      return res.status(404).json({ success: false, message: 'CSR inquiry not found' });
    }

    const inquiry = await CSRInquiry.findByIdAndUpdate(
      id,
      { status: normalizedStatus },
      { new: true, runValidators: true }
    );

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'CSR inquiry not found',
      });
    }

    res.status(200).json({
      success: true,
      message: `Inquiry status updated to ${normalizedStatus}`,
      inquiry,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete CSR inquiry
 * @route   DELETE /api/csr-inquiries/:id
 * @access  Private (Admin)
 */
export const deleteCSRInquiry = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (mongoose.connection.readyState !== 1) {
      fallbackCSRInquiries = fallbackCSRInquiries.filter((c) => c._id !== id);
      return res.status(200).json({
        success: true,
        message: 'CSR inquiry deleted successfully (Offline mode)',
      });
    }

    const inquiry = await CSRInquiry.findByIdAndDelete(id);

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'CSR inquiry not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'CSR inquiry deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Submit CSR inquiry (Public)
 * @route   POST /api/csr-inquiries
 * @access  Public
 */
export const submitCSRInquiry = async (req, res, next) => {
  try {
    const {
      companyName,
      contactPerson,
      email,
      phone,
      csrInterest,
      budgetRange,
      proposedBudget,
      message,
    } = req.body;

    if (!companyName || !contactPerson || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all required inquiry fields',
      });
    }

    if (mongoose.connection.readyState !== 1) {
      const newInq = {
        _id: `csr-${Date.now()}`,
        companyName,
        contactPerson,
        email,
        phone,
        csrInterest,
        budgetRange: budgetRange || proposedBudget,
        proposedBudget: proposedBudget || budgetRange,
        message,
        status: 'New',
        createdAt: new Date().toISOString(),
      };
      fallbackCSRInquiries.unshift(newInq);
      return res.status(201).json({
        success: true,
        message: 'CSR partnership inquiry submitted successfully! (Offline mode)',
        inquiry: newInq,
      });
    }

    const inquiry = await CSRInquiry.create({
      companyName,
      contactPerson,
      email,
      phone,
      csrInterest,
      budgetRange: budgetRange || proposedBudget,
      proposedBudget: proposedBudget || budgetRange,
      message,
      status: 'New',
    });

    res.status(201).json({
      success: true,
      message: 'CSR partnership inquiry submitted successfully! Our team will reach out within 48 hours.',
      inquiry,
    });
  } catch (error) {
    next(error);
  }
};
