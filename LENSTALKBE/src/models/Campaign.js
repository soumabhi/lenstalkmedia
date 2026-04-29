import mongoose from 'mongoose';

const campaignSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  clientName: { type: String, required: true },
  description: { type: String, required: true },
  category: {
    type: String,
    enum: ['Social Media Campaigns', 'Video Ads', 'Documentary', 'Influencer'],
    required: true,
  },
  feedImages: [{ type: String }],
  reelUrls: [{ type: String }],
  staticPosts: [{ type: String }],
  thumbnailUrl: { type: String, default: '' },
  order: { type: Number, default: 0 },
  published: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model('Campaign', campaignSchema);
