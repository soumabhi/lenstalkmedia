import mongoose from 'mongoose';

const processStepSchema = new mongoose.Schema({
  number: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, default: '' },
  order: { type: Number, default: 0 },
  published: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model('ProcessStep', processStepSchema);
