import mongoose from 'mongoose';

const companyStatSchema = new mongoose.Schema({
  value: { type: String, required: true },
  suffix: { type: String, default: '' },
  label: { type: String, required: true },
  order: { type: Number, default: 0 },
  published: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model('CompanyStat', companyStatSchema);
