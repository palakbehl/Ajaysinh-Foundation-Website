import mongoose from 'mongoose';

const campaignSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  goalAmount: { type: Number, required: true },
  raisedAmount: { type: Number, default: 0 },
  category: { type: String, required: true },
  beneficiaries: { type: Number },
  featured: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model('Campaign', campaignSchema);
