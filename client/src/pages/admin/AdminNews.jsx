import { useState, useEffect } from 'react';
import AdminTable from '../../components/admin/AdminTable';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import { PlusIcon } from '@heroicons/react/24/outline';
import api from '../../utils/api';

const AdminNews = () => {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState(null);

  // Form state
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [summary, setSummary] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('draft');
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      // Fetching all news including drafts for the admin
      const res = await api.get('/api/news');
      setNews(res.data.data);
    } catch (error) {
      console.error('Error fetching news', error);
      alert('Failed to load news');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (article = null) => {
    if (article) {
      setEditingNews(article);
      setTitle(article.title);
      setContent(article.content);
      setSummary(article.summary || '');
      setCategory(article.category);
      setStatus(article.status);
    } else {
      setEditingNews(null);
      setTitle('');
      setContent('');
      setSummary('');
      setCategory('');
      setStatus('draft');
    }
    setImage(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingNews(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('summary', summary);
    formData.append('category', category);
    formData.append('status', status);
    if (image) {
      formData.append('image', image);
    }

    try {
      if (editingNews) {
        await api.put(`/api/news/${editingNews._id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        alert('News article updated successfully!');
      } else {
        await api.post('/api/news', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        alert('News article created successfully!');
      }
      handleCloseModal();
      fetchNews();
    } catch (error) {
      console.error('Error saving news', error);
      alert(error.response?.data?.message || 'Failed to save news');
    }
  };

  const handleDelete = async (article) => {
    if (window.confirm(`Are you sure you want to delete "${article.title}"?`)) {
      try {
        await api.delete(`/api/news/${article._id}`);
        fetchNews();
      } catch (error) {
        console.error('Error deleting news', error);
        alert('Failed to delete news article');
      }
    }
  };

  const columns = [
    { 
      key: 'imageUrl', 
      label: 'Image',
      render: (val) => val ? <img src={val} alt="News" className="w-16 h-10 rounded object-cover" /> : <div className="w-16 h-10 rounded bg-gray-200"></div>
    },
    { key: 'title', label: 'Title' },
    { key: 'category', label: 'Category' },
    { 
      key: 'status', 
      label: 'Status',
      render: (val) => (
        <span className={`px-2 py-1 rounded text-xs font-bold ${val === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
          {val.toUpperCase()}
        </span>
      )
    },
    { key: 'createdAt', label: 'Created', render: (val) => new Date(val).toLocaleDateString() },
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage News</h1>
          <p className="mt-2 text-sm text-gray-600">Publish university news and announcements.</p>
        </div>
        <Button onClick={() => handleOpenModal()} variant="primary" className="bg-admin-accent hover:bg-indigo-700 border-none">
          <PlusIcon className="w-5 h-5 mr-2" />
          Add News Article
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-card p-6">
        {isLoading ? (
          <p>Loading news...</p>
        ) : (
          <AdminTable 
            columns={columns} 
            data={news} 
            onEdit={handleOpenModal} 
            onDelete={handleDelete} 
          />
        )}
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        title={editingNews ? 'Edit News Article' : 'Add News Article'}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input 
                type="text" 
                required 
                value={title} 
                onChange={e => setTitle(e.target.value)} 
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-admin-accent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category (e.g. Research, Campus Life)</label>
              <input 
                type="text" 
                required 
                value={category} 
                onChange={e => setCategory(e.target.value)} 
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-admin-accent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Summary (Short blurb)</label>
              <textarea 
                rows="2"
                required
                value={summary} 
                onChange={e => setSummary(e.target.value)} 
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-admin-accent outline-none"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Content (Full article)</label>
              <textarea 
                rows="6"
                required
                value={content} 
                onChange={e => setContent(e.target.value)} 
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-admin-accent outline-none"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select 
                value={status} 
                onChange={e => setStatus(e.target.value)} 
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-admin-accent outline-none"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Featured Image (Upload)</label>
              <input 
                type="file" 
                accept="image/*"
                onChange={e => setImage(e.target.files[0])} 
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-admin-accent outline-none"
              />
              {editingNews?.imageUrl && !image && (
                <p className="text-xs text-gray-500 mt-1">Leave empty to keep current image.</p>
              )}
            </div>

          </div>
          
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <Button type="button" onClick={handleCloseModal} className="bg-white text-gray-700 border-gray-300 hover:bg-gray-50">
              Cancel
            </Button>
            <Button type="submit" variant="primary" className="bg-admin-accent hover:bg-indigo-700 border-none">
              {editingNews ? 'Save Changes' : 'Publish Article'}
            </Button>
          </div>
        </form>
      </Modal>

    </div>
  );
};

export default AdminNews;
