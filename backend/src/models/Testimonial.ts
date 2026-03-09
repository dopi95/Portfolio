import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: 5
  },
  avatar: String,
  photo: String,
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'approved'
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

testimonialSchema.index({ status: 1, order: 1 });
testimonialSchema.index({ createdAt: -1 });

export default mongoose.model('Testimonial', testimonialSchema);
