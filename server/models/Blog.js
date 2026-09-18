import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Blog title is required'], trim: true },
  slug: { type: String, required: [true, 'Blog slug is required'], unique: true, lowercase: true, trim: true },
  excerpt: { type: String, required: [true, 'Blog excerpt is required'] },
  content: { type: mongoose.Schema.Types.Mixed, required: [true, 'Blog content is required'] },
  image: { type: String }, // Legacy URL fallback
  featuredImage: {
    url: { type: String },
    publicId: { type: String },
  },
  author: {
    name: { type: String, default: 'Ajaysinh Foundation' },
    title: { type: String, default: 'Editorial Team' },
    avatar: { type: String, default: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=60&q=80' }
  },
  category: { type: String, required: [true, 'Category is required'], default: 'Community', trim: true },
  tags: [{ type: String }],
  readTime: { type: String, default: '5 min read' },
  quote: { type: String },
  published: { type: Boolean, default: true },
}, { timestamps: true });

// Pre-save hook to ensure image and featuredImage.url are synced
blogSchema.pre('save', function(next) {
  if (this.featuredImage && this.featuredImage.url && !this.image) {
    this.image = this.featuredImage.url;
  } else if (this.image && (!this.featuredImage || !this.featuredImage.url)) {
    this.featuredImage = { url: this.image, publicId: '' };
  }
  next();
});

export default mongoose.model('Blog', blogSchema);
