import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
  donorName: { type: String },
  email: { type: String },
  phone: { type: String },
  amount: { type: Number, required: true },
  paymentId: { type: String },
  anonymous: { type: Boolean, default: false },
  status: { type: String, enum: ['pending', 'successful', 'failed'], default: 'pending' },
  campaignId: { type: mongoose.Schema.Types.ObjectId, ref: 'Campaign' }
}, { timestamps: true });

export default mongoose.model('Donation', donationSchema);
