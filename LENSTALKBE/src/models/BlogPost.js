import mongoose from 'mongoose';

const blogPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  excerpt: { type: String, required: true },
  featuredImage: { type: String, default: '' },
  author: { type: String, default: 'Lenstalk Team' },
  category: { type: String, default: 'General' },
  tags: [{ type: String }],
  publishedAt: { type: Date, default: Date.now },
  published: { type: Boolean, default: false },
}, { timestamps: true });

// Auto-generate slug from title if not provided
blogPostSchema.pre('save', function (next) {
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

export default mongoose.model('BlogPost', blogPostSchema);
