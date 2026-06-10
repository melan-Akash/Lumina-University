import express from 'express';
import {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
} from '../controllers/courseController.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getCourses)
  .post(protectAdmin, createCourse);

router.route('/:id')
  .get(getCourse)
  .put(protectAdmin, updateCourse)
  .delete(protectAdmin, deleteCourse);

export default router;
