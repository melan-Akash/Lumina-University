import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
  },
  level: {
    type: String,
    enum: ['Undergraduate', 'Postgraduate'],
  },
  school: {
    type: String,
    enum: [
      'School of Technologies',
      'School of Management',
      'School of Art & Design',
      'School of Sport & Health Sciences',
    ],
  },
  duration: String,
  fees: String,
  shortDesc: String,
  overview: String,
  modules: [String],
  requirements: String,
  careerOutcomes: [String],
  imageUrl: String,
  isPublished: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

courseSchema.pre('save', function (next) {
  if (this.isModified('title')) {
    this.slug = this.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  }
  next();
});

const Course = mongoose.model('Course', courseSchema);
export default Course;
