import express from 'express';
import {
  getEnquiries,
  createEnquiry,
  markAsRead,
  deleteEnquiry,
} from '../controllers/enquiryController.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(protectAdmin, getEnquiries)
  .post(createEnquiry); // Public route for contact form

router.route('/:id')
  .delete(protectAdmin, deleteEnquiry);

router.route('/:id/read')
  .put(protectAdmin, markAsRead);

export default router;
