import Course from '../models/Course.js';

export const getCourses = async (req, res) => {
  const { level, school, search } = req.query;
  const query = { isPublished: true };

  if (level && level !== 'All') {
    query.level = level;
  }
  
  if (school) {
    query.school = school;
  }

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { school: { $regex: search, $options: 'i' } }
    ];
  }

  const courses = await Course.find(query);
  res.status(200).json({ success: true, data: courses });
};

export const getCourse = async (req, res) => {
  const { id } = req.params;
  
  const course = await Course.findOne({
    $or: [{ _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }, { slug: id }],
  });

  if (!course) {
    return res.status(404).json({ success: false, message: 'Course not found' });
  }

  res.status(200).json({ success: true, data: course });
};

export const createCourse = async (req, res) => {
  const course = await Course.create(req.body);
  res.status(201).json({ success: true, data: course });
};

export const updateCourse = async (req, res) => {
  const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!course) {
    return res.status(404).json({ success: false, message: 'Course not found' });
  }

  res.status(200).json({ success: true, data: course });
};

export const deleteCourse = async (req, res) => {
  const course = await Course.findByIdAndDelete(req.params.id);

  if (!course) {
    return res.status(404).json({ success: false, message: 'Course not found' });
  }

  res.status(200).json({ success: true, data: {} });
};
