import News from '../models/News.js';

export const getAllNews = async (req, res) => {
  const news = await News.find({ status: 'published' }).sort({ publishedAt: -1, createdAt: -1 });
  res.status(200).json({ success: true, data: news });
};

export const getSingleNews = async (req, res) => {
  const news = await News.findById(req.params.id);

  if (!news) {
    return res.status(404).json({ success: false, message: 'News article not found' });
  }

  res.status(200).json({ success: true, data: news });
};

export const createNews = async (req, res) => {
  let imageUrl = '';
  if (req.file) {
    imageUrl = req.file.path;
  }

  const newsData = { ...req.body, imageUrl };
  if (newsData.status === 'published' && !newsData.publishedAt) {
    newsData.publishedAt = Date.now();
  }

  const news = await News.create(newsData);
  res.status(201).json({ success: true, data: news });
};

export const updateNews = async (req, res) => {
  const updateData = { ...req.body };
  if (req.file) {
    updateData.imageUrl = req.file.path;
  }

  if (updateData.status === 'published') {
    const existing = await News.findById(req.params.id);
    if (existing && existing.status === 'draft') {
       updateData.publishedAt = Date.now();
    }
  }

  const news = await News.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!news) {
    return res.status(404).json({ success: false, message: 'News article not found' });
  }

  res.status(200).json({ success: true, data: news });
};

export const deleteNews = async (req, res) => {
  const news = await News.findByIdAndDelete(req.params.id);

  if (!news) {
    return res.status(404).json({ success: false, message: 'News article not found' });
  }

  res.status(200).json({ success: true, data: {} });
};
