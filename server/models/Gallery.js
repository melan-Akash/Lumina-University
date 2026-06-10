import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  caption: String,
  publicId: String,
  order: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Gallery = mongoose.model('Gallery', gallerySchema);
export default Gallery;
