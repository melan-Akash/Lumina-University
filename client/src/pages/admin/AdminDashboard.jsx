import { 
  MagnifyingGlassIcon, 
  PlusIcon,
  BookOpenIcon,
  CalendarDaysIcon,
  QuestionMarkCircleIcon,
  IdentificationIcon,
  AdjustmentsHorizontalIcon,
  Bars3BottomRightIcon
} from '@heroicons/react/24/outline';
import coursesData from '../../data/courses.json';

const AdminDashboard = () => {
  const stats = [
    { title: 'TOTAL COURSES', value: '1,248', change: '+12%', changeType: 'increase', vs: 'vs last semester', icon: BookOpenIcon, color: 'text-gray-600', bg: 'bg-gray-100', pillBg: 'bg-green-100', pillText: 'text-green-700' },
    { title: 'UPCOMING EVENTS', value: '34', change: '— Stable', changeType: 'stable', vs: 'vs last month', icon: CalendarDaysIcon, color: 'text-red-500', bg: 'bg-red-50', pillBg: 'bg-orange-50', pillText: 'text-orange-600' },
    { title: 'ACTIVE ENQUIRIES', value: '892', change: '+24%', changeType: 'increase', vs: 'vs last month', icon: QuestionMarkCircleIcon, color: 'text-indigo-600', bg: 'bg-indigo-50', pillBg: 'bg-green-100', pillText: 'text-green-700' },
    { title: 'FACULTY STAFF', value: '456', change: '-2%', changeType: 'decrease', vs: 'vs last year', icon: IdentificationIcon, color: 'text-gray-500', bg: 'bg-gray-100', pillBg: 'bg-red-100', pillText: 'text-red-600' },
  ];

  return (
    <div className="min-h-full">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
        <h1 className="text-[22px] font-bold text-[#0f172a]">Dashboard</h1>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <MagnifyingGlassIcon className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="pl-9 pr-4 py-2 border border-gray-300 rounded-md text-[13px] w-64 focus:outline-none focus:ring-1 focus:ring-[#0f172a] focus:border-[#0f172a]"
            />
          </div>
          <button className="px-4 py-2 border border-gray-300 rounded-md text-[13px] font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
            Export Data
          </button>
          <button className="px-4 py-2 bg-[#0a1526] hover:bg-[#112240] text-white rounded-md text-[13px] font-semibold flex items-center gap-2 transition-colors">
            <PlusIcon className="w-4 h-4" strokeWidth={2.5} />
            Add New Course
          </button>
        </div>
      </div>

      <div className="p-8 max-w-[1400px] mx-auto">
        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">{stat.title}</h3>
                  <div className="text-[28px] font-bold text-gray-900 leading-none">{stat.value}</div>
                </div>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.bg}`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </div>
              <div className="flex items-center gap-2 mt-auto">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${stat.pillBg} ${stat.pillText}`}>
                  {stat.changeType === 'increase' && '↑ '}{stat.changeType === 'decrease' && '↓ '}{stat.change}
                </span>
                <span className="text-[11px] text-gray-400 font-medium">{stat.vs}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#0f172a]">Course Catalog</h2>
              <p className="text-[13px] text-gray-500 mt-1">Manage institutional course offerings, prerequisites, and faculty assignments.</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
                <AdjustmentsHorizontalIcon className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
                <Bars3BottomRightIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#0a1526] text-white text-[11px] uppercase tracking-wider">
                  <th className="py-3 px-6 font-semibold w-[35%]">Course Title</th>
                  <th className="py-3 px-6 font-semibold">Level</th>
                  <th className="py-3 px-6 font-semibold">School</th>
                  <th className="py-3 px-6 font-semibold">Duration</th>
                  <th className="py-3 px-6 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {coursesData.slice(0, 4).map((course, i) => (
                  <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-[#e2e8f0] flex items-center justify-center flex-shrink-0 text-[#0f172a]">
                          {/* Simulated icons based on index for demo purposes to match mockup */}
                          {i === 0 && <span className="text-[16px] font-serif">A</span>}
                          {i === 1 && <span className="text-[16px] font-mono">&lt;&gt;</span>}
                          {i === 2 && <span className="text-[16px]">📜</span>}
                          {i === 3 && <span className="text-[16px]">🏛️</span>}
                        </div>
                        <div>
                          <div className="font-bold text-[13px] text-[#0f172a]">{course.title}</div>
                          <div className="text-[11px] text-gray-500 uppercase">{course.id.substring(0, 6).toUpperCase()}-{100 + i}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        course.level.toLowerCase() === 'postgraduate' 
                          ? 'bg-purple-100 text-purple-700' 
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {course.level === 'Postgraduate' ? 'Graduate' : course.level}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-[13px] text-gray-600 font-medium">
                      {course.school}
                    </td>
                    <td className="py-4 px-6 text-[13px] text-gray-600 font-medium">
                      16 Weeks
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex flex-col items-end gap-1">
                        <button className="text-[12px] font-semibold text-gray-600 hover:text-[#0f172a] transition-colors">Edit</button>
                        <button className="text-[12px] font-semibold text-red-600 hover:text-red-800 transition-colors">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t border-gray-100 flex items-center justify-between">
            <div className="text-[12px] text-gray-500">
              Showing <span className="font-bold text-gray-900">1</span> to <span className="font-bold text-gray-900">4</span> of <span className="font-bold text-gray-900">1,248</span> results
            </div>
            <div className="flex gap-1">
              <button className="px-3 py-1.5 border border-gray-200 rounded text-[12px] font-semibold text-gray-400 bg-gray-50 cursor-not-allowed">Previous</button>
              <button className="w-8 h-8 flex items-center justify-center rounded bg-[#0a1526] text-white text-[12px] font-semibold">1</button>
              <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-600 hover:bg-gray-50 text-[12px] font-semibold transition-colors">2</button>
              <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-600 hover:bg-gray-50 text-[12px] font-semibold transition-colors">3</button>
              <span className="w-8 h-8 flex items-center justify-center text-gray-400 text-[12px]">...</span>
              <button className="px-3 py-1.5 border border-gray-200 rounded text-[12px] font-semibold text-gray-600 hover:bg-gray-50 transition-colors">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
