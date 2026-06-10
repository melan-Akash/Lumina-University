import { useState, useEffect } from 'react';
import AdminTable from '../../components/admin/AdminTable';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import { PlusIcon } from '@heroicons/react/24/outline';
import api from '../../utils/api';

const AdminGallery = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form state
  const [caption, setCaption] = useState('');
  const [category, setCategory] = useState('');
  const [order, setOrder] = useState('');
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const res = await api.get('/api/gallery');
      setImages(res.data.data);
    } catch (error) {
      console.error('Error fetching gallery', error);
      alert('Failed to load gallery');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = () => {
    setCaption('');
    setCategory('');
    setOrder(0);
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      return alert('Please select an image to upload.');
    }

    const formData = new FormData();
    formData.append('caption', caption);
    formData.append('category', category);
    formData.append('order', order);
    formData.append('image', imageFile);

    try {
      // Note: Backend only supports adding images, not updating existing image files.
      await api.post('/api/gallery', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Image added to gallery successfully!');
      handleCloseModal();
      fetchGallery();
    } catch (error) {
      console.error('Error saving image', error);
      alert(error.response?.data?.message || 'Failed to upload image');
    }
  };

  const handleDelete = async (imageItem) => {
    if (window.confirm(`Are you sure you want to delete this image?`)) {
      try {
        await api.delete(`/api/gallery/${imageItem._id}`);
        fetchGallery();
      } catch (error) {
        console.error('Error deleting image', error);
        alert('Failed to delete image');
      }
    }
  };

  const columns = [
    { 
      key: 'imageUrl', 
      label: 'Thumbnail',
      render: (val) => <img src={val} alt="Gallery" className="w-16 h-16 rounded object-cover" />
    },
    { key: 'caption', label: 'Caption' },
    { key: 'category', label: 'Category' },
    { key: 'createdAt', label: 'Added On', render: (val) => new Date(val).toLocaleDateString() },
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Campus Gallery</h1>
          <p className="mt-2 text-sm text-gray-600">Upload and organize images of the campus.</p>
        </div>
        <Button onClick={() => handleOpenModal()} variant="primary" className="bg-admin-accent hover:bg-indigo-700 border-none">
          <PlusIcon className="w-5 h-5 mr-2" />
          Add New Photo
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-card p-6">
        {isLoading ? (
          <p>Loading gallery...</p>
        ) : (
          <AdminTable 
            columns={columns} 
            data={images} 
            onEdit={null} // Gallery updates typically mean just deleting and re-uploading
            onDelete={handleDelete} 
          />
        )}
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        title="Upload New Photo"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image File (Upload)</label>
              <input 
                type="file" 
                required
                accept="image/*"
                onChange={e => setImageFile(e.target.files[0])} 
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-admin-accent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Caption</label>
              <input 
                type="text" 
                required 
                value={caption} 
                onChange={e => setCaption(e.target.value)} 
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-admin-accent outline-none"
                placeholder="e.g. Students relaxing in the quad"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category (Optional)</label>
              <input 
                type="text" 
                value={category} 
                onChange={e => setCategory(e.target.value)} 
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-admin-accent outline-none"
                placeholder="e.g. Campus, Events, Facilities"
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

          </div>
          
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <Button type="button" onClick={handleCloseModal} className="bg-white text-gray-700 border-gray-300 hover:bg-gray-50">
              Cancel
            </Button>
            <Button type="submit" variant="primary" className="bg-admin-accent hover:bg-indigo-700 border-none">
              Upload Photo
            </Button>
          </div>
        </form>
      </Modal>

    </div>
  );
};

export default AdminGallery;
