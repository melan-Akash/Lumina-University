import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  excerpt: String,
  imageUrl: String,
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft',
  },
  publishedAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const News = mongoose.model('News', newsSchema);
export default News;
