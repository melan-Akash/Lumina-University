import Admin from '../models/Admin.js';
import jwt from 'jsonwebtoken';

const generateToken = (id, role, expiresIn = '1d') => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn,
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Please provide email and password' });
  }

  const admin = await Admin.findOne({ email });
  if (!admin) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  const isMatch = await admin.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  const token = generateToken(admin._id, admin.role);

  res.status(200).json({
    success: true,
    token,
    admin: {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
    },
  });
};

export const getMe = async (req, res) => {
  res.status(200).json({
    success: true,
    admin: {
      id: req.admin._id,
      name: req.admin.name,
      email: req.admin.email,
      role: req.admin.role,
    },
  });
};
