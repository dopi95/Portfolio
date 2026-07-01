import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  message: {
    type: String,
    required: true
  },
  read: {
    type: Boolean,
    default: false
  },
  replied: {
    type: Boolean,
    default: false
  },
  replyMessage: {
    type: String
  },
  repliedAt: {
    type: Date
  }
}, {
  timestamps: true
});

export default mongoose.model('Contact', contactSchema);
