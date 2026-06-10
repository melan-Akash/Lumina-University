import Enquiry from '../models/Enquiry.js';
import nodemailer from 'nodemailer';

export const getEnquiries = async (req, res) => {
  const { isRead } = req.query;
  const query = {};

  if (isRead !== undefined) {
    query.isRead = isRead === 'true';
  }

  const enquiries = await Enquiry.find(query).sort({ createdAt: -1 });
  res.status(200).json({ success: true, data: enquiries });
};

export const createEnquiry = async (req, res) => {
  const enquiry = await Enquiry.create(req.body);

  // Setup nodemailer
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: req.body.email,
    to: process.env.EMAIL_USER,
    subject: `New Enquiry: ${req.body.subject}`,
    text: `You have received a new enquiry from ${req.body.name} (${req.body.email}):\n\n${req.body.message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
    // Continue even if email fails
  }

  res.status(201).json({ success: true, data: enquiry });
};

export const markAsRead = async (req, res) => {
  const enquiry = await Enquiry.findByIdAndUpdate(
    req.params.id,
    { isRead: true },
    { new: true, runValidators: true }
  );

  if (!enquiry) {
    return res.status(404).json({ success: false, message: 'Enquiry not found' });
  }

  res.status(200).json({ success: true, data: enquiry });
};

export const deleteEnquiry = async (req, res) => {
  const enquiry = await Enquiry.findByIdAndDelete(req.params.id);

  if (!enquiry) {
    return res.status(404).json({ success: false, message: 'Enquiry not found' });
  }

  res.status(200).json({ success: true, data: {} });
};
