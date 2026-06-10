import express from 'express';
import {
  getStaffMembers,
  createStaffMember,
  updateStaffMember,
  deleteStaffMember,
} from '../controllers/staffController.js';
import { protectAdmin } from '../middleware/auth.js';
import { upload } from '../config/cloudinary.js';

const router = express.Router();

router.route('/')
  .get(getStaffMembers)
  .post(protectAdmin, upload.single('photo'), createStaffMember);

router.route('/:id')
  .put(protectAdmin, upload.single('photo'), updateStaffMember)
  .delete(protectAdmin, deleteStaffMember);

export default router;
