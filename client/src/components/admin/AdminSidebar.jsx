import { Link, useLocation } from 'react-router-dom';
import { 
  Squares2X2Icon,
  AcademicCapIcon, 
  CalendarIcon, 
  ChatBubbleLeftRightIcon, 
  UserGroupIcon, 
  NewspaperIcon, 
  PhotoIcon,
  ArrowRightStartOnRectangleIcon
} from '@heroicons/react/24/outline';

const AdminSidebar = () => {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: Squares2X2Icon, exact: true },
    { name: 'Course Management', href: '/admin/courses', icon: AcademicCapIcon },
    { name: 'Events', href: '/admin/events', icon: CalendarIcon },
    { name: 'Enquiries', href: '/admin/enquiries', icon: ChatBubbleLeftRightIcon },
    { name: 'Faculty & Staff', href: '/admin/staff', icon: UserGroupIcon },
    { name: 'News', href: '/admin/news', icon: NewspaperIcon },
    { name: 'Gallery', href: '/admin/gallery', icon: PhotoIcon },
  ];

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    window.location.href = '/admin/login';
  };

  const isActive = (item) => {
    if (item.exact) {
      return location.pathname === item.href;
    }
    return location.pathname.startsWith(item.href);
  };

  return (
    <div className="w-64 bg-[#2b3240] min-h-screen flex flex-col font-sans">
      <div className="p-6 mb-2 border-b border-white/5">
        <h1 className="font-bold text-lg text-white mb-1">Admin Portal</h1>
        <p className="text-[11px] text-gray-400 font-medium">Institutional Management</p>
      </div>

      <nav className="flex-1 py-4">
        {navigation.map((item) => {
          const active = isActive(item);
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center gap-4 px-6 py-3.5 transition-colors text-[13px] font-semibold ${
                active 
                  ? 'bg-[#1e2330] text-white border-l-[3px] border-white' 
                  : 'text-gray-400 hover:text-white border-l-[3px] border-transparent'
              }`}
            >
              <item.icon className="w-[18px] h-[18px] flex-shrink-0" strokeWidth={2} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-6">
        <button className="w-full bg-[#0a1526] hover:bg-[#112240] text-white py-2.5 rounded-md text-[13px] font-semibold transition-colors mb-6 shadow-md">
          Generate Report
        </button>
        
        <div className="flex items-center gap-3">
          <img src="https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff" alt="Admin" className="w-9 h-9 rounded-full" />
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-bold text-white truncate">Admin User</p>
            <button onClick={handleLogout} className="flex items-center text-[11px] text-gray-400 hover:text-white transition-colors mt-0.5">
              <ArrowRightStartOnRectangleIcon className="w-3 h-3 mr-1" /> Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
