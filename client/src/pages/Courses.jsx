import { useState } from 'react';
import { MagnifyingGlassIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import CourseCard from '../components/ui/CourseCard';
import coursesData from '../data/courses.json';

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState('All');
  
  const filteredCourses = coursesData.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          course.school.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = filterLevel === 'All' || course.level === filterLevel;
    
    return matchesSearch && matchesLevel;
  });

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-24">
      {/* Header Banner */}
      <div className="relative bg-[#0f172a] py-20 px-4 text-center overflow-hidden border-b border-[#1e293b]">
        {/* Dot Pattern Background */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#ffffff 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }}></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5 tracking-tight">Explore Our Courses</h1>
          <p className="text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto">
            Discover a world-class education designed to challenge, inspire, and prepare you for the future. Filter by level to find your path.
          </p>
        </div>
      </div>
      
      {/* Search & Filters Area */}
      <div className="bg-white px-4 py-8 border-b border-gray-200">
        <div className="max-w-4xl mx-auto">
          {/* Search Bar */}
          <div className="relative flex items-center mb-8">
            <MagnifyingGlassIcon className="absolute left-4 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search for programs, keywords, or departments..."
              className="w-full pl-12 pr-4 py-3.5 bg-[#f8fafc] border border-gray-200 rounded-lg outline-none text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-4">
            {['All', 'Undergraduate', 'Postgraduate'].map(level => (
              <button
                key={level}
                onClick={() => setFilterLevel(level)}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all border ${
                  filterLevel === level 
                    ? 'bg-[#0f172a] text-white border-[#0f172a] shadow-sm' 
                    : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Course Grid Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        {filteredCourses.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.slice(0, 6).map(course => (
                <CourseCard key={course.id} {...course} />
              ))}
            </div>
            
            {/* Load More Button */}
            {filteredCourses.length > 6 && (
              <div className="mt-16 text-center">
                <button className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-gray-300 text-gray-700 text-sm font-semibold hover:bg-gray-50 transition-colors bg-white shadow-sm">
                  Load More Courses
                  <ChevronDownIcon className="w-4 h-4" strokeWidth={2} />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-xl text-gray-500 mb-4">No courses found matching your criteria.</p>
            <button 
              onClick={() => { setSearchTerm(''); setFilterLevel('All'); }}
              className="text-primary hover:underline font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
