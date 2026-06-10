import { useState, useEffect } from 'react';
import AdminTable from '../../components/admin/AdminTable';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import { PlusIcon } from '@heroicons/react/24/outline';
import api from '../../utils/api';

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    capacity: '',
    description: '',
    status: 'upcoming'
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await api.get('/api/events');
      setEvents(res.data.data);
    } catch (error) {
      console.error('Error fetching events', error);
      alert('Failed to load events');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (event = null) => {
    if (event) {
      setEditingEvent(event);
      setFormData({
        title: event.title,
        date: event.date.split('T')[0], // format for input type="date"
        time: event.time,
        location: event.location,
        capacity: event.capacity,
        description: event.description,
        status: event.status
      });
    } else {
      setEditingEvent(null);
      setFormData({
        title: '',
        date: '',
        time: '',
        location: '',
        capacity: '',
        description: '',
        status: 'upcoming'
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingEvent(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingEvent) {
        await api.put(`/api/events/${editingEvent._id}`, formData);
        alert('Event updated successfully!');
      } else {
        await api.post('/api/events', formData);
        alert('Event created successfully!');
      }
      handleCloseModal();
      fetchEvents();
    } catch (error) {
      console.error('Error saving event', error);
      alert(error.response?.data?.message || 'Failed to save event');
    }
  };

  const handleDelete = async (event) => {
    if (window.confirm(`Are you sure you want to delete ${event.title}?`)) {
      try {
        await api.delete(`/api/events/${event._id}`);
        fetchEvents();
      } catch (error) {
        console.error('Error deleting event', error);
        alert('Failed to delete event');
      }
    }
  };

  const columns = [
    { key: 'title', label: 'Event Title' },
    { key: 'date', label: 'Date', render: (val) => new Date(val).toLocaleDateString() },
    { key: 'location', label: 'Location' },
    { key: 'status', label: 'Status' },
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Events</h1>
          <p className="mt-2 text-sm text-gray-600">Schedule and organize university events.</p>
        </div>
        <Button onClick={() => handleOpenModal()} variant="primary" className="bg-admin-accent hover:bg-indigo-700 border-none">
          <PlusIcon className="w-5 h-5 mr-2" />
          Add New Event
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-card p-6">
        {isLoading ? (
          <p>Loading events...</p>
        ) : (
          <AdminTable 
            columns={columns} 
            data={events} 
            onEdit={handleOpenModal} 
            onDelete={handleDelete} 
          />
        )}
      </div>

      {/* Event Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        title={editingEvent ? 'Edit Event' : 'Add New Event'}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
              <input 
                type="text" 
                required 
                value={formData.title} 
                onChange={e => setFormData({...formData, title: e.target.value})} 
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-admin-accent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input 
                type="date" 
                required 
                value={formData.date} 
                onChange={e => setFormData({...formData, date: e.target.value})} 
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-admin-accent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time (e.g. 10:00 AM)</label>
              <input 
                type="text" 
                required 
                value={formData.time} 
                onChange={e => setFormData({...formData, time: e.target.value})} 
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-admin-accent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input 
                type="text" 
                required 
                value={formData.location} 
                onChange={e => setFormData({...formData, location: e.target.value})} 
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-admin-accent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
              <input 
                type="number" 
                required 
                value={formData.capacity} 
                onChange={e => setFormData({...formData, capacity: e.target.value})} 
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-admin-accent outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select 
                value={formData.status} 
                onChange={e => setFormData({...formData, status: e.target.value})} 
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-admin-accent outline-none"
              >
                <option value="upcoming">Upcoming</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea 
                required 
                rows="4"
                value={formData.description} 
                onChange={e => setFormData({...formData, description: e.target.value})} 
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-admin-accent outline-none"
              ></textarea>
            </div>

          </div>
          
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <Button type="button" onClick={handleCloseModal} className="bg-white text-gray-700 border-gray-300 hover:bg-gray-50">
              Cancel
            </Button>
            <Button type="submit" variant="primary" className="bg-admin-accent hover:bg-indigo-700 border-none">
              {editingEvent ? 'Save Changes' : 'Create Event'}
            </Button>
          </div>
        </form>
      </Modal>

    </div>
  );
};

export default AdminEvents;
