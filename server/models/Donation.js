import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
  donorName: { type: String, trim: true, default: 'Anonymous' },
  email: { type: String, trim: true, lowercase: true },
  phone: { type: String, trim: true },
  pan: { type: String, trim: true, uppercase: true },
  country: { type: String, default: 'India' },
  address: { type: String },
  amount: { type: Number, required: [true, 'Donation amount is required'], min: 1 },
  paymentMethod: { type: String, default: 'online' },
  paymentId: { type: String },
  transactionId: { type: String },
  orderId: { type: String },
  anonymous: { type: Boolean, default: false },
  isRecurring: { type: Boolean, default: false },
  claim80G: { type: Boolean, default: false },
  message: { type: String },
  status: {
    type: String,
    enum: ['pending', 'successful', 'failed'],
    default: 'pending',
  },
  campaignId: { type: mongoose.Schema.Types.ObjectId, ref: 'Campaign' },
  campaignTitle: { type: String },
}, { timestamps: true });

export default mongoose.model('Donation', donationSchema);
