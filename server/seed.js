import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Admin from './models/Admin.js';

dotenv.config();

const seedAdmin = async () => {
  try {
    await connectDB();

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: 'admin@lumina.ac.uk' });
    
    if (existingAdmin) {
      console.log('Super Admin already exists.');
      process.exit();
    }

    const admin = new Admin({
      name: 'Super Admin',
      email: 'admin@lumina.ac.uk',
      password: 'Admin@1234',
      role: 'superadmin',
    });

    await admin.save();
    console.log('Admin seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();
