import { useState, useEffect } from 'react';
import AdminTable from '../../components/admin/AdminTable';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import { PlusIcon } from '@heroicons/react/24/outline';
import api from '../../utils/api';

const AdminStaff = () => {
  const [staff, setStaff] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);

  // Form state
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [order, setOrder] = useState('');
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const res = await api.get('/api/staff');
      setStaff(res.data.data);
    } catch (error) {
      console.error('Error fetching staff', error);
      alert('Failed to load staff');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (staffMember = null) => {
    if (staffMember) {
      setEditingStaff(staffMember);
      setName(staffMember.name);
      setDepartment(staffMember.department);
      setRole(staffMember.role);
      setEmail(staffMember.email);
      setBio(staffMember.bio || '');
      setOrder(staffMember.order || 0);
    } else {
      setEditingStaff(null);
      setName('');
      setDepartment('');
      setRole('');
      setEmail('');
      setBio('');
      setOrder(0);
    }
    setPhoto(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingStaff(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('department', department);
    formData.append('role', role);
    formData.append('email', email);
    formData.append('bio', bio);
    formData.append('order', order);
    if (photo) {
      formData.append('photo', photo);
    }

    try {
      if (editingStaff) {
        await api.put(`/api/staff/${editingStaff._id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        alert('Staff updated successfully!');
      } else {
        await api.post('/api/staff', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        alert('Staff created successfully!');
      }
      handleCloseModal();
      fetchStaff();
    } catch (error) {
      console.error('Error saving staff', error);
      alert(error.response?.data?.message || 'Failed to save staff');
    }
  };

  const handleDelete = async (staffMember) => {
    if (window.confirm(`Are you sure you want to delete ${staffMember.name}?`)) {
      try {
        await api.delete(`/api/staff/${staffMember._id}`);
        fetchStaff();
      } catch (error) {
        console.error('Error deleting staff', error);
        alert('Failed to delete staff member');
      }
    }
  };

  const columns = [
    { 
      key: 'photoUrl', 
      label: 'Photo',
      render: (val) => val ? <img src={val} alt="Staff" className="w-10 h-10 rounded-full object-cover" /> : <div className="w-10 h-10 rounded-full bg-gray-200"></div>
    },
    { key: 'name', label: 'Name' },
    { key: 'role', label: 'Role' },
    { key: 'department', label: 'Department' },
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Staff Directory</h1>
          <p className="mt-2 text-sm text-gray-600">Add or edit faculty and staff profiles.</p>
        </div>
        <Button onClick={() => handleOpenModal()} variant="primary" className="bg-admin-accent hover:bg-indigo-700 border-none">
          <PlusIcon className="w-5 h-5 mr-2" />
          Add Staff Member
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-card p-6">
        {isLoading ? (
          <p>Loading staff...</p>
        ) : (
          <AdminTable 
            columns={columns} 
            data={staff} 
            onEdit={handleOpenModal} 
            onDelete={handleDelete} 
          />
        )}
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        title={editingStaff ? 'Edit Staff Member' : 'Add Staff Member'}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input 
                type="text" 
                required 
                value={name} 
                onChange={e => setName(e.target.value)} 
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-admin-accent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                type="email" 
                required 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-admin-accent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <input 
                type="text" 
                required 
                value={role} 
                onChange={e => setRole(e.target.value)} 
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-admin-accent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <input 
                type="text" 
                required 
                value={department} 
                onChange={e => setDepartment(e.target.value)} 
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-admin-accent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
              <input 
                type="number" 
                value={order} 
                onChange={e => setOrder(e.target.value)} 
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-admin-accent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Photo (Upload)</label>
              <input 
                type="file" 
                accept="image/*"
                onChange={e => setPhoto(e.target.files[0])} 
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-admin-accent outline-none"
              />
              {editingStaff?.photoUrl && !photo && (
                <p className="text-xs text-gray-500 mt-1">Leave empty to keep current photo.</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
              <textarea 
                rows="4"
                value={bio} 
                onChange={e => setBio(e.target.value)} 
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-admin-accent outline-none"
              ></textarea>
            </div>

          </div>
          
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <Button type="button" onClick={handleCloseModal} className="bg-white text-gray-700 border-gray-300 hover:bg-gray-50">
              Cancel
            </Button>
            <Button type="submit" variant="primary" className="bg-admin-accent hover:bg-indigo-700 border-none">
              {editingStaff ? 'Save Changes' : 'Create Staff Member'}
            </Button>
          </div>
        </form>
      </Modal>

    </div>
  );
};

export default AdminStaff;
