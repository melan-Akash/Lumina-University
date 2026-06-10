import express from 'express';
import {
  getAllNews,
  getSingleNews,
  createNews,
  updateNews,
  deleteNews,
} from '../controllers/newsController.js';
import { protectAdmin } from '../middleware/auth.js';
import { upload } from '../config/cloudinary.js';

const router = express.Router();

router.route('/')
  .get(getAllNews)
  .post(protectAdmin, upload.single('image'), createNews);

router.route('/:id')
  .get(getSingleNews)
  .put(protectAdmin, upload.single('image'), updateNews)
  .delete(protectAdmin, deleteNews);

export default router;
