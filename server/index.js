import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

// Import Routes
import authRoutes from './routes/auth.js';
import adminAuthRoutes from './routes/adminAuth.js';
import courseRoutes from './routes/courses.js';
import eventRoutes from './routes/events.js';
import enquiryRoutes from './routes/enquiries.js';
import staffRoutes from './routes/staff.js';
import newsRoutes from './routes/news.js';
import galleryRoutes from './routes/gallery.js';

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors({ 
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true 
}));
app.use(express.json());

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin/auth', adminAuthRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/gallery', galleryRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  const status = err.statusCode || 500;
  res.status(status).json({ 
    success: false, 
    message: err.message || 'Server Error' 
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
