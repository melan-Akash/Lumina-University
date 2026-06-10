import { useState, useEffect } from 'react';
import AdminTable from '../../components/admin/AdminTable';
import api from '../../utils/api';

const AdminEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      const res = await api.get('/api/enquiries');
      setEnquiries(res.data.data);
    } catch (error) {
      console.error('Error fetching enquiries', error);
      alert('Failed to load enquiries');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleRead = async (enquiry) => {
    try {
      await api.put(`/api/enquiries/${enquiry._id}/read`, { isRead: !enquiry.isRead });
      fetchEnquiries();
    } catch (error) {
      console.error('Error updating enquiry', error);
      alert('Failed to update status');
    }
  };

  const handleDelete = async (enquiry) => {
    if (window.confirm(`Are you sure you want to delete the enquiry from ${enquiry.name}?`)) {
      try {
        await api.delete(`/api/enquiries/${enquiry._id}`);
        fetchEnquiries();
      } catch (error) {
        console.error('Error deleting enquiry', error);
        alert('Failed to delete enquiry');
      }
    }
  };

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'subject', label: 'Subject' },
    { key: 'createdAt', label: 'Date', render: (val) => new Date(val).toLocaleDateString() },
    { 
      key: 'isRead', 
      label: 'Status', 
      render: (val, item) => (
        <button 
          onClick={() => handleToggleRead(item)}
          className={`px-3 py-1 rounded-full text-xs font-bold ${
            val ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}
        >
          {val ? 'Read' : 'Unread'}
        </button>
      )
    },
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Enquiries</h1>
          <p className="mt-2 text-sm text-gray-600">Review and respond to messages from the public.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-card p-6">
        {isLoading ? (
          <p>Loading enquiries...</p>
        ) : (
          <AdminTable 
            columns={columns} 
            data={enquiries} 
            onEdit={null} // Enquiries are not editable via form
            onDelete={handleDelete} 
          />
        )}
      </div>
    </div>
  );
};

export default AdminEnquiries;
