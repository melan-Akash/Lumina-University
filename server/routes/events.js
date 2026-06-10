import express from 'express';
import {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
} from '../controllers/eventController.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getEvents)
  .post(protectAdmin, createEvent);

router.route('/:id')
  .get(getEvent)
  .put(protectAdmin, updateEvent)
  .delete(protectAdmin, deleteEvent);

export default router;
