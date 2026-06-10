import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Admin from './models/Admin.js';

dotenv.config();

const checkDb = async () => {
  try {
    await connectDB();
    const admins = await Admin.find({});
    console.log('Found Admins:', admins.map(a => ({ email: a.email, password: a.password })));
    
    if (admins.length > 0) {
      const isMatch = await admins[0].comparePassword('Admin@1234');
      console.log('Password Match for Admin@1234:', isMatch);
    }

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

checkDb();
