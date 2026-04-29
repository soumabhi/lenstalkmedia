import mongoose from 'mongoose';

const businessPillarSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, default: '' },
  color: { type: String, default: '#0e7490' },
  order: { type: Number, default: 0 },
  published: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model('BusinessPillar', businessPillarSchema);
