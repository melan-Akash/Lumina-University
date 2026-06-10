import Gallery from '../models/Gallery.js';
import { cloudinary } from '../config/cloudinary.js';

export const getGallery = async (req, res) => {
  const images = await Gallery.find().sort({ order: 1, createdAt: -1 });
  res.status(200).json({ success: true, data: images });
};

export const addGalleryImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'Please upload an image' });
  }

  const galleryItem = await Gallery.create({
    url: req.file.path,
    publicId: req.file.filename, // multer-storage-cloudinary stores the public_id in filename
    caption: req.body.caption,
    order: req.body.order || 0,
  });

  res.status(201).json({ success: true, data: galleryItem });
};

export const deleteGalleryImage = async (req, res) => {
  const galleryItem = await Gallery.findById(req.params.id);

  if (!galleryItem) {
    return res.status(404).json({ success: false, message: 'Image not found' });
  }

  if (galleryItem.publicId) {
    await cloudinary.uploader.destroy(galleryItem.publicId);
  }

  await galleryItem.deleteOne();

  res.status(200).json({ success: true, data: {} });
};
