import mongoose from 'mongoose';

const csrInquirySchema = new mongoose.Schema({
  companyName: { type: String, required: [true, 'Company name is required'], trim: true },
  contactPerson: { type: String, required: [true, 'Contact person name is required'], trim: true },
  email: { type: String, required: [true, 'Email is required'], trim: true, lowercase: true },
  phone: { type: String, required: [true, 'Phone number is required'], trim: true },
  csrInterest: { type: String, trim: true },
  budgetRange: { type: String, trim: true },
  proposedBudget: { type: String, trim: true }, // Legacy alternative
  message: { type: String, required: [true, 'Message is required'] },
  status: {
    type: String,
    enum: ['New', 'Contacted', 'In Progress', 'Completed', 'new', 'in_progress', 'completed'],
    default: 'New',
  },
}, { timestamps: true });

export default mongoose.model('CSRInquiry', csrInquirySchema);
