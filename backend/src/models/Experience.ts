import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  location: String,
  startDate: {
    type: String,
    required: true
  },
  endDate: String,
  current: {
    type: Boolean,
    default: false
  },
  description: {
    type: String,
    required: true
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

experienceSchema.index({ order: 1 });

export default mongoose.model('Experience', experienceSchema);
