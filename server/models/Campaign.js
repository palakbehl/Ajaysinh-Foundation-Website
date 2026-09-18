import mongoose from 'mongoose';

const campaignSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Campaign title is required'], trim: true },
  slug: { type: String, required: [true, 'Campaign slug is required'], unique: true, lowercase: true, trim: true },
  description: { type: String, required: [true, 'Campaign description is required'] },
  shortDescription: { type: String },
  image: { type: String }, // Legacy URL fallback
  featuredImage: {
    url: { type: String },
    publicId: { type: String },
  },
  gallery: [{
    url: { type: String },
    publicId: { type: String },
  }],
  goalAmount: { type: Number, required: [true, 'Goal amount is required'], min: 0 },
  raisedAmount: { type: Number, default: 0, min: 0 },
  category: { type: String, required: [true, 'Campaign category is required'], trim: true },
  beneficiaries: { type: String, default: '100+' },
  daysLeft: { type: Number, default: 30 },
  deadline: { type: Date },
  status: {
    type: String,
    enum: ['Active', 'Upcoming', 'Completed'],
    default: 'Active',
  },
  featured: { type: Boolean, default: false },
  overview: {
    text: { type: String },
    checklist: [{ type: String }],
    stats: [{ type: mongoose.Schema.Types.Mixed }],
  },
  impactBreakdown: [{ type: mongoose.Schema.Types.Mixed }],
  updates: [{ type: mongoose.Schema.Types.Mixed }],
  stories: [{ type: mongoose.Schema.Types.Mixed }],
  faqs: [{ type: mongoose.Schema.Types.Mixed }],
}, { timestamps: true });

// Virtual or pre-save helper to ensure image string or featuredImage.url are synced
campaignSchema.pre('save', function(next) {
  if (this.featuredImage && this.featuredImage.url && !this.image) {
    this.image = this.featuredImage.url;
  } else if (this.image && (!this.featuredImage || !this.featuredImage.url)) {
    this.featuredImage = { url: this.image, publicId: '' };
  }
  next();
});

export default mongoose.model('Campaign', campaignSchema);
