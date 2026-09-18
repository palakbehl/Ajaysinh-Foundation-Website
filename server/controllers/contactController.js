import mongoose from 'mongoose';
import ContactMessage from '../models/ContactMessage.js';

let fallbackMessages = [
  {
    _id: 'msg-demo-1',
    name: 'Rohit Deshmukh',
    email: 'rohit.d@example.com',
    phone: '+91 98333 44556',
    subject: 'Partnership in School Health Camps',
    inquiryType: 'Collaboration',
    message: 'Hello, our hospital in South Delhi wants to volunteer doctors for your next healthcare camp.',
    read: false,
    createdAt: new Date().toISOString(),
  },
  {
    _id: 'msg-demo-2',
    name: 'Meenakshi Iyer',
    email: 'meenakshi@example.com',
    phone: '+91 97444 55667',
    subject: '80G Tax Exemption Certificate Query',
    inquiryType: 'Donation Inquiry',
    message: 'I made a donation recently and wanted to verify when the 80G tax receipt will be sent.',
    read: true,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

/**
 * @desc    Get all contact messages (Admin with search & read/unread filter)
 * @route   GET /api/messages
 * @access  Private (Admin)
 */
export const getContactMessages = async (req, res, next) => {
  try {
    const { search, read, page, limit } = req.query;

    if (mongoose.connection.readyState !== 1) {
      let filtered = [...fallbackMessages];
      if (read !== undefined && read !== '' && read !== 'All') {
        const isRead = read === 'true' || read === true;
        filtered = filtered.filter((m) => m.read === isRead);
      }
      if (search) {
        const s = search.toLowerCase();
        filtered = filtered.filter(
          (m) => m.name.toLowerCase().includes(s) || m.email.toLowerCase().includes(s) || m.subject.toLowerCase().includes(s)
        );
      }
      const unreadCount = fallbackMessages.filter((m) => !m.read).length;
      return res.status(200).json({
        success: true,
        count: filtered.length,
        total: filtered.length,
        unreadCount,
        page: 1,
        pages: 1,
        messages: filtered,
        isOfflineFallback: true,
      });
    }

    const query = {};

    if (read !== undefined && read !== '' && read !== 'All') {
      query.read = read === 'true' || read === true;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } },
        { inquiryType: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } },
      ];
    }

    const pageSize = parseInt(limit, 10) || 50;
    const currentPage = parseInt(page, 10) || 1;
    const skip = (currentPage - 1) * pageSize;

    const total = await ContactMessage.countDocuments(query);
    const messages = await ContactMessage.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(pageSize);

    const unreadCount = await ContactMessage.countDocuments({ read: false });

    res.status(200).json({
      success: true,
      count: messages.length,
      total,
      unreadCount,
      page: currentPage,
      pages: Math.ceil(total / pageSize) || 1,
      messages,
    });
  } catch (error) {
    console.warn('getContactMessages DB fallback triggered:', error.message);
    const unreadCount = fallbackMessages.filter((m) => !m.read).length;
    res.status(200).json({
      success: true,
      count: fallbackMessages.length,
      total: fallbackMessages.length,
      unreadCount,
      page: 1,
      pages: 1,
      messages: fallbackMessages,
      isOfflineFallback: true,
    });
  }
};

/**
 * @desc    Toggle message read/unread status
 * @route   PUT /api/messages/:id
 * @access  Private (Admin)
 */
export const toggleMessageRead = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { read } = req.body;

    if (mongoose.connection.readyState !== 1) {
      const msg = fallbackMessages.find((m) => m._id === id);
      if (msg) {
        msg.read = read !== undefined ? Boolean(read) : !msg.read;
        return res.status(200).json({
          success: true,
          message: `Message marked as ${msg.read ? 'read' : 'unread'} (Offline mode)`,
          data: msg,
        });
      }
      return res.status(404).json({ success: false, message: 'Message not found' });
    }

    const message = await ContactMessage.findById(id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found',
      });
    }

    message.read = read !== undefined ? Boolean(read) : !message.read;
    await message.save();

    res.status(200).json({
      success: true,
      message: `Message marked as ${message.read ? 'read' : 'unread'}`,
      data: message,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete contact message
 * @route   DELETE /api/messages/:id
 * @access  Private (Admin)
 */
export const deleteContactMessage = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (mongoose.connection.readyState !== 1) {
      fallbackMessages = fallbackMessages.filter((m) => m._id !== id);
      return res.status(200).json({
        success: true,
        message: 'Message deleted successfully (Offline mode)',
      });
    }

    const message = await ContactMessage.findByIdAndDelete(id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Message deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Submit contact message (Public)
 * @route   POST /api/messages
 * @access  Public
 */
export const submitContactMessage = async (req, res, next) => {
  try {
    const { fullName, name, email, phone, subject, inquiryType, message } = req.body;

    if (!(fullName || name) || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required',
      });
    }

    if (mongoose.connection.readyState !== 1) {
      const newMsg = {
        _id: `msg-${Date.now()}`,
        name: fullName || name,
        email,
        phone,
        subject: subject || 'General Inquiry',
        inquiryType: inquiryType || 'General Inquiry',
        message,
        read: false,
        createdAt: new Date().toISOString(),
      };
      fallbackMessages.unshift(newMsg);
      return res.status(201).json({
        success: true,
        message: 'Your message has been sent successfully. Our team will contact you shortly. (Offline mode)',
        contact: newMsg,
      });
    }

    const contact = await ContactMessage.create({
      name: fullName || name,
      email,
      phone,
      subject: subject || 'General Inquiry',
      inquiryType: inquiryType || 'General Inquiry',
      message,
      read: false,
    });

    res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully. Our team will contact you shortly.',
      contact,
    });
  } catch (error) {
    next(error);
  }
};
