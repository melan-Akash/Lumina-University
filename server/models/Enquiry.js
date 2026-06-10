import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  repliedAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Enquiry = mongoose.model('Enquiry', enquirySchema);
export default Enquiry;
