import { useParams, Link } from 'react-router-dom';
import { 
  PlusIcon, 
  CheckCircleIcon, 
  ArrowRightIcon, 
  ArrowDownTrayIcon 
} from '@heroicons/react/24/outline';
import coursesData from '../data/courses.json';

const CourseDetail = () => {
  const { id } = useParams();
  const course = coursesData.find(c => c.id === id);

  if (!course) {
    return (
      <div className="py-24 text-center bg-[#f8fafc] min-h-screen">
        <h2 className="text-3xl font-bold text-[#0f172a] mb-4">Course not found</h2>
        <Link to="/courses" className="text-secondary hover:underline font-medium">
          Return to courses
        </Link>
      </div>
    );
  }

  const isPostgrad = course.level.toLowerCase() === 'postgraduate';

  return (
    <div className="bg-[#f8fafc] min-h-screen pt-8 pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-8 flex items-center gap-2">
          <Link to="/" className="hover:text-gray-900 transition-colors">Home</Link>
          <span>&rsaquo;</span>
          <Link to="/courses" className="hover:text-gray-900 transition-colors">Courses</Link>
          <span>&rsaquo;</span>
          <span className="text-gray-900 font-medium">{course.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          
          {/* Left Column: Main Content */}
          <div className="lg:col-span-2">
            
            {/* Tag & Title */}
            <div className={`inline-block text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.05em] py-1.5 px-3 rounded-full mb-5 ${
              isPostgrad ? 'bg-[#0f172a] text-white' : 'bg-[#fee2e2] text-[#bb0027]'
            }`}>
              {course.level}
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-bold text-[#0f172a] mb-6 leading-tight">
              {course.title}
            </h1>
            
            {/* Overview */}
            <div className="text-gray-600 text-lg leading-relaxed mb-10 space-y-4">
              <p>{course.overview}</p>
            </div>
            
            {/* Hero Image */}
            <div className="rounded-xl overflow-hidden mb-12 shadow-sm border border-gray-100">
              <img 
                src={course.image} 
                alt={course.title} 
                className="w-full h-auto object-cover max-h-[400px]" 
              />
            </div>
            
            {/* Course Modules */}
            <h2 className="text-2xl font-bold text-[#0f172a] mb-6">Course Modules</h2>
            <div className="space-y-4 mb-12">
              {course.modules.slice(0, 3).map((module, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-lg p-5 flex justify-between items-center cursor-pointer hover:border-gray-300 hover:shadow-sm transition-all">
                  <span className="font-medium text-gray-800 text-sm">Year {i+1}: {module}</span>
                  <PlusIcon className="w-5 h-5 text-gray-400" strokeWidth={2} />
                </div>
              ))}
            </div>
            
            {/* Entry Requirements */}
            <div className="bg-[#eff5ff] rounded-xl p-8 sm:p-10 mb-12">
              <h2 className="text-2xl font-bold text-[#0f172a] mb-8">Entry Requirements</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <CheckCircleIcon className="w-6 h-6 text-secondary flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm mb-1">A-Levels / High School Diploma</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{course.requirements}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <CheckCircleIcon className="w-6 h-6 text-secondary flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm mb-1">International Baccalaureate (IB)</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">34 points overall, with 6,6,5 in Higher Level subjects including Mathematics.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <CheckCircleIcon className="w-6 h-6 text-secondary flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm mb-1">English Language</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">IELTS 6.5 overall (minimum 6.0 in each component) or equivalent.</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Career Outcomes */}
            <h2 className="text-2xl font-bold text-[#0f172a] mb-6">Career Outcomes</h2>
            <div className="flex flex-wrap gap-3">
              {course.careerOutcomes.map((career, i) => (
                <span key={i} className="bg-[#e2e8f0] text-gray-700 px-4 py-2 rounded-full text-xs font-semibold shadow-sm">
                  {career}
                </span>
              ))}
            </div>
            
          </div>
          
          {/* Right Column: Sticky Sidebar */}
          <div>
            <div className="lg:sticky lg:top-8">
              <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border border-gray-100 p-8">
                <h2 className="text-xl font-bold text-[#0f172a] mb-6 border-b border-gray-100 pb-4">Key Information</h2>
                
                <div className="space-y-6 mb-8">
                  <div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Duration</div>
                    <div className="text-[13px] font-bold text-gray-800">{course.duration} {course.duration.includes('year') ? '(with Placement)' : ''}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Level</div>
                    <div className="text-[13px] font-bold text-gray-800">{course.level} Degree</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">School</div>
                    <div className="text-[13px] font-bold text-gray-800">{course.school}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Tuition Fees</div>
                    <div className="text-[13px] font-bold text-gray-800 leading-relaxed">
                      {course.fees} (UK)<br/>
                      <span className="text-gray-500 font-medium">£22,500 / year (International)</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Start Date</div>
                    <div className="text-[13px] font-bold text-gray-800">September 2026</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <button className="w-full bg-secondary hover:bg-secondary-container text-white py-3.5 rounded-md text-sm font-bold transition-colors flex items-center justify-center gap-2 shadow-md">
                    Apply Now <ArrowRightIcon className="w-4 h-4" strokeWidth={2.5} />
                  </button>
                  <button className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-3.5 rounded-md text-sm font-semibold transition-colors flex items-center justify-center gap-2">
                    <ArrowDownTrayIcon className="w-4 h-4" strokeWidth={2} /> Download Prospectus
                  </button>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
