import mongoose from 'mongoose';
import Volunteer from '../models/Volunteer.js';

let fallbackVolunteers = [
  {
    _id: 'vol-demo-1',
    fullName: 'Aarav Mehta',
    email: 'aarav.mehta@example.com',
    phone: '+91 98980 12345',
    city: 'New Delhi',
    occupation: 'Teacher',
    interests: 'Education, Child Welfare',
    availability: 'Weekends',
    motivation: 'Passionate about giving back to underprivileged children.',
    status: 'Pending',
    createdAt: new Date().toISOString(),
  },
  {
    _id: 'vol-demo-2',
    fullName: 'Rhea Patel',
    email: 'rhea.patel@example.com',
    phone: '+91 97234 56789',
    city: 'Ahmedabad',
    occupation: 'Software Engineer',
    interests: 'Healthcare, Digital Literacy',
    availability: 'Flexible',
    motivation: 'Want to help build digital learning labs for rural schools.',
    status: 'Accepted',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

/**
 * @desc    Get all volunteer applications (Admin with search & filters)
 * @route   GET /api/volunteers
 * @access  Private (Admin)
 */
export const getVolunteers = async (req, res, next) => {
  try {
    const { search, status, page, limit } = req.query;

    if (mongoose.connection.readyState !== 1) {
      let filtered = [...fallbackVolunteers];
      if (status && status !== 'All Status') {
        filtered = filtered.filter((v) => v.status.toLowerCase() === status.toLowerCase());
      }
      if (search) {
        const s = search.toLowerCase();
        filtered = filtered.filter((v) => v.fullName.toLowerCase().includes(s) || v.email.toLowerCase().includes(s));
      }
      return res.status(200).json({
        success: true,
        count: filtered.length,
        total: filtered.length,
        page: 1,
        pages: 1,
        volunteers: filtered,
        isOfflineFallback: true,
      });
    }

    const query = {};

    if (status && status !== 'All Status') {
      query.status = { $regex: new RegExp(`^${status}$`, 'i') };
    }

    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { city: { $regex: search, $options: 'i' } },
        { occupation: { $regex: search, $options: 'i' } },
        { interests: { $regex: search, $options: 'i' } },
      ];
    }

    const pageSize = parseInt(limit, 10) || 50;
    const currentPage = parseInt(page, 10) || 1;
    const skip = (currentPage - 1) * pageSize;

    const total = await Volunteer.countDocuments(query);
    const volunteers = await Volunteer.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(pageSize);

    res.status(200).json({
      success: true,
      count: volunteers.length,
      total,
      page: currentPage,
      pages: Math.ceil(total / pageSize) || 1,
      volunteers,
    });
  } catch (error) {
    console.warn('getVolunteers DB fallback triggered:', error.message);
    res.status(200).json({
      success: true,
      count: fallbackVolunteers.length,
      total: fallbackVolunteers.length,
      page: 1,
      pages: 1,
      volunteers: fallbackVolunteers,
      isOfflineFallback: true,
    });
  }
};

/**
 * @desc    Update volunteer application status
 * @route   PUT /api/volunteers/:id
 * @access  Private (Admin)
 */
export const updateVolunteerStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['Pending', 'Reviewed', 'Accepted', 'Rejected'];
    const normalizedStatus = validStatuses.find(
      (s) => s.toLowerCase() === (status || '').toLowerCase()
    );

    if (!normalizedStatus) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be Pending, Reviewed, Accepted, or Rejected',
      });
    }

    if (mongoose.connection.readyState !== 1) {
      const vol = fallbackVolunteers.find((v) => v._id === id);
      if (vol) {
        vol.status = normalizedStatus;
        return res.status(200).json({
          success: true,
          message: `Volunteer status updated to ${normalizedStatus} (Offline mode)`,
          volunteer: vol,
        });
      }
      return res.status(404).json({ success: false, message: 'Volunteer application not found' });
    }

    const volunteer = await Volunteer.findByIdAndUpdate(
      id,
      { status: normalizedStatus },
      { new: true, runValidators: true }
    );

    if (!volunteer) {
      return res.status(404).json({
        success: false,
        message: 'Volunteer application not found',
      });
    }

    res.status(200).json({
      success: true,
      message: `Volunteer status updated to ${normalizedStatus}`,
      volunteer,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete volunteer application
 * @route   DELETE /api/volunteers/:id
 * @access  Private (Admin)
 */
export const deleteVolunteer = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (mongoose.connection.readyState !== 1) {
      fallbackVolunteers = fallbackVolunteers.filter((v) => v._id !== id);
      return res.status(200).json({
        success: true,
        message: 'Volunteer application deleted successfully (Offline mode)',
      });
    }

    const volunteer = await Volunteer.findByIdAndDelete(id);

    if (!volunteer) {
      return res.status(404).json({
        success: false,
        message: 'Volunteer application not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Volunteer application deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Submit volunteer application (Public)
 * @route   POST /api/volunteers
 * @access  Public
 */
export const submitVolunteer = async (req, res, next) => {
  try {
    const {
      fullName,
      email,
      phone,
      age,
      city,
      occupation,
      interests,
      availability,
      motivation,
      message,
    } = req.body;

    if (!fullName || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Full name, email, and phone number are required',
      });
    }

    if (mongoose.connection.readyState !== 1) {
      const newVol = {
        _id: `vol-${Date.now()}`,
        fullName,
        email,
        phone,
        age: age ? Number(age) : undefined,
        city,
        occupation,
        interests,
        availability,
        motivation: motivation || message,
        message: message || motivation,
        status: 'Pending',
        createdAt: new Date().toISOString(),
      };
      fallbackVolunteers.unshift(newVol);
      return res.status(201).json({
        success: true,
        message: 'Application submitted successfully! Our coordinator will contact you soon. (Offline mode)',
        volunteer: newVol,
      });
    }

    const volunteer = await Volunteer.create({
      fullName,
      email,
      phone,
      age: age ? Number(age) : undefined,
      city,
      occupation,
      interests,
      availability,
      motivation: motivation || message,
      message: message || motivation,
      status: 'Pending',
    });

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully! Our coordinator will contact you soon.',
      volunteer,
    });
  } catch (error) {
    next(error);
  }
};
