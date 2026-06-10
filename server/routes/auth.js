import express from 'express';
import { register, login, getMe } from '../controllers/authController.js';
import { protectUser } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protectUser, getMe);

export default router;
