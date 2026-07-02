import mongoose from 'mongoose';

const csrInquirySchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  contactPerson: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  proposedBudget: { type: String },
  message: { type: String, required: true },
  status: { type: String, enum: ['new', 'in_progress', 'completed'], default: 'new' },
}, { timestamps: true });

export default mongoose.model('CSRInquiry', csrInquirySchema);
