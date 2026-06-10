import Staff from '../models/Staff.js';

export const getStaffMembers = async (req, res) => {
  const staff = await Staff.find().sort({ order: 1, createdAt: -1 });
  res.status(200).json({ success: true, data: staff });
};

export const createStaffMember = async (req, res) => {
  let photoUrl = '';
  if (req.file) {
    photoUrl = req.file.path;
  }

  const staff = await Staff.create({ ...req.body, photoUrl });
  res.status(201).json({ success: true, data: staff });
};

export const updateStaffMember = async (req, res) => {
  const updateData = { ...req.body };
  if (req.file) {
    updateData.photoUrl = req.file.path;
  }

  const staff = await Staff.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!staff) {
    return res.status(404).json({ success: false, message: 'Staff member not found' });
  }

  res.status(200).json({ success: true, data: staff });
};

export const deleteStaffMember = async (req, res) => {
  const staff = await Staff.findByIdAndDelete(req.params.id);

  if (!staff) {
    return res.status(404).json({ success: false, message: 'Staff member not found' });
  }

  res.status(200).json({ success: true, data: {} });
};
