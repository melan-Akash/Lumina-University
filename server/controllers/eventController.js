import Event from '../models/Event.js';

export const getEvents = async (req, res) => {
  const events = await Event.find({ isPublished: true }).sort({ date: 1 });
  res.status(200).json({ success: true, data: events });
};

export const getEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    return res.status(404).json({ success: false, message: 'Event not found' });
  }

  res.status(200).json({ success: true, data: event });
};

export const createEvent = async (req, res) => {
  const event = await Event.create(req.body);
  res.status(201).json({ success: true, data: event });
};

export const updateEvent = async (req, res) => {
  const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!event) {
    return res.status(404).json({ success: false, message: 'Event not found' });
  }

  res.status(200).json({ success: true, data: event });
};

export const deleteEvent = async (req, res) => {
  const event = await Event.findByIdAndDelete(req.params.id);

  if (!event) {
    return res.status(404).json({ success: false, message: 'Event not found' });
  }

  res.status(200).json({ success: true, data: {} });
};
