import { useState, useEffect } from 'react';
import AdminTable from '../../components/admin/AdminTable';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import api from '../../utils/api';

const AdminCourses = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    level: 'Undergraduate',
    duration: '',
    school: '',
    tuitionFee: {
      domestic: '',
      international: ''
    },
    entryRequirements: [''],
    careerOutcomes: ['']
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await api.get('/api/courses');
      setCourses(res.data.data);
    } catch (error) {
      console.error('Error fetching courses', error);
      alert('Failed to load courses');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (course = null) => {
    if (course) {
      setEditingCourse(course);
      setFormData({
        title: course.title,
        description: course.description,
        level: course.level,
        duration: course.duration,
        school: course.school,
        tuitionFee: {
          domestic: course.tuitionFee?.domestic || '',
          international: course.tuitionFee?.international || ''
        },
        entryRequirements: course.entryRequirements.length ? course.entryRequirements : [''],
        careerOutcomes: course.careerOutcomes.length ? course.careerOutcomes : ['']
      });
    } else {
      setEditingCourse(null);
      setFormData({
        title: '',
        description: '',
        level: 'Undergraduate',
        duration: '',
        school: '',
        tuitionFee: { domestic: '', international: '' },
        entryRequirements: [''],
        careerOutcomes: ['']
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCourse(null);
  };

  const handleArrayChange = (index, field, value) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const addArrayItem = (field) => {
    setFormData({ ...formData, [field]: [...formData[field], ''] });
  };

  const removeArrayItem = (index, field) => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: newArray });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCourse) {
        await api.put(`/api/courses/${editingCourse._id}`, formData);
        alert('Course updated successfully!');
      } else {
        await api.post('/api/courses', formData);
        alert('Course created successfully!');
      }
      handleCloseModal();
      fetchCourses();
    } catch (error) {
      console.error('Error saving course', error);
      alert(error.response?.data?.message || 'Failed to save course');
    }
  };

  const handleDelete = async (course) => {
    if (window.confirm(`Are you sure you want to delete ${course.title}?`)) {
      try {
        await api.delete(`/api/courses/${course._id}`);
        fetchCourses();
      } catch (error) {
        console.error('Error deleting course', error);
        alert('Failed to delete course');
      }
    }
  };

  const columns = [
    { key: 'title', label: 'Course Title' },
    { key: 'level', label: 'Level' },
    { key: 'school', label: 'School' },
    { key: 'duration', label: 'Duration' },
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Courses</h1>
          <p className="mt-2 text-sm text-gray-600">View, edit, and add academic programs.</p>
        </div>
        <Button onClick={() => handleOpenModal()} variant="primary" className="bg-admin-accent hover:bg-indigo-700 border-none">
          <PlusIcon className="w-5 h-5 mr-2" />
          Add New Course
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-card p-6">
        {isLoading ? (
          <p>Loading courses...</p>
        ) : (
          <AdminTable 
            columns={columns} 
            data={courses} 
            onEdit={handleOpenModal} 
            onDelete={handleDelete} 
          />
        )}
      </div>

      {/* Course Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        title={editingCourse ? 'Edit Course' : 'Add New Course'}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input 
                type="text" 
                required 
                value={formData.title} 
                onChange={e => setFormData({...formData, title: e.target.value})} 
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-admin-accent outline-none"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea 
                required 
                rows="3"
                value={formData.description} 
                onChange={e => setFormData({...formData, description: e.target.value})} 
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-admin-accent outline-none"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
              <select 
                value={formData.level} 
                onChange={e => setFormData({...formData, level: e.target.value})} 
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-admin-accent outline-none"
              >
                <option value="Undergraduate">Undergraduate</option>
                <option value="Postgraduate">Postgraduate</option>
                <option value="Research">Research</option>
                <option value="Short Course">Short Course</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">School (e.g. School of Arts)</label>
              <input 
                type="text" 
                required 
                value={formData.school} 
                onChange={e => setFormData({...formData, school: e.target.value})} 
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-admin-accent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duration (e.g. 3 Years)</label>
              <input 
                type="text" 
                required 
                value={formData.duration} 
                onChange={e => setFormData({...formData, duration: e.target.value})} 
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-admin-accent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Domestic Tuition Fee (Number)</label>
              <input 
                type="number" 
                required 
                value={formData.tuitionFee.domestic} 
                onChange={e => setFormData({...formData, tuitionFee: { ...formData.tuitionFee, domestic: e.target.value }})} 
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-admin-accent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">International Tuition Fee (Number)</label>
              <input 
                type="number" 
                required 
                value={formData.tuitionFee.international} 
                onChange={e => setFormData({...formData, tuitionFee: { ...formData.tuitionFee, international: e.target.value }})} 
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-admin-accent outline-none"
              />
            </div>

            {/* Entry Requirements Array */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Entry Requirements</label>
              {formData.entryRequirements.map((req, idx) => (
                <div key={idx} className="flex gap-2 mb-2">
                  <input 
                    type="text" 
                    required 
                    value={req} 
                    onChange={e => handleArrayChange(idx, 'entryRequirements', e.target.value)} 
                    className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-admin-accent outline-none"
                  />
                  {formData.entryRequirements.length > 1 && (
                    <button type="button" onClick={() => removeArrayItem(idx, 'entryRequirements')} className="text-red-500 hover:text-red-700">
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
              <button type="button" onClick={() => addArrayItem('entryRequirements')} className="text-sm text-admin-accent font-medium hover:underline">
                + Add Requirement
              </button>
            </div>

            {/* Career Outcomes Array */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Career Outcomes</label>
              {formData.careerOutcomes.map((career, idx) => (
                <div key={idx} className="flex gap-2 mb-2">
                  <input 
                    type="text" 
                    required 
                    value={career} 
                    onChange={e => handleArrayChange(idx, 'careerOutcomes', e.target.value)} 
                    className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-admin-accent outline-none"
                  />
                  {formData.careerOutcomes.length > 1 && (
                    <button type="button" onClick={() => removeArrayItem(idx, 'careerOutcomes')} className="text-red-500 hover:text-red-700">
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
              <button type="button" onClick={() => addArrayItem('careerOutcomes')} className="text-sm text-admin-accent font-medium hover:underline">
                + Add Career Outcome
              </button>
            </div>

          </div>
          
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <Button type="button" onClick={handleCloseModal} className="bg-white text-gray-700 border-gray-300 hover:bg-gray-50">
              Cancel
            </Button>
            <Button type="submit" variant="primary" className="bg-admin-accent hover:bg-indigo-700 border-none">
              {editingCourse ? 'Save Changes' : 'Create Course'}
            </Button>
          </div>
        </form>
      </Modal>

    </div>
  );
};

export default AdminCourses;
