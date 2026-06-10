import express from 'express';
import {
  getGallery,
  addGalleryImage,
  deleteGalleryImage,
} from '../controllers/galleryController.js';
import { protectAdmin } from '../middleware/auth.js';
import { upload } from '../config/cloudinary.js';

const router = express.Router();

router.route('/')
  .get(getGallery)
  .post(protectAdmin, upload.single('image'), addGalleryImage);

router.route('/:id')
  .delete(protectAdmin, deleteGalleryImage);

export default router;
