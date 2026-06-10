import { Link } from 'react-router-dom';
import { ClockIcon, MapPinIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const CourseCard = ({ id, title, level, duration, image, shortDesc }) => {
  const isPostgrad = level.toLowerCase() === 'postgraduate';
  
  return (
    <Link to={`/courses/${id}`} className="group flex flex-col bg-white rounded-[14px] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 border border-gray-100 h-full overflow-hidden">
      <div className="relative h-48 sm:h-52 overflow-hidden bg-gray-100">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <div className={`absolute top-4 left-4 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.05em] py-1.5 px-3 rounded-full ${
          isPostgrad ? 'bg-[#0f172a] text-white' : 'bg-white text-gray-900 shadow-sm'
        }`}>
          {level}
        </div>
      </div>
      
      <div className="p-6 sm:p-7 flex flex-col flex-grow">
        <h3 className="text-[20px] font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-[1.3]">
          {title}
        </h3>
        <p className="text-gray-500 text-[14px] mb-6 line-clamp-3 flex-grow leading-relaxed">
          {shortDesc}
        </p>
        
        <div className="mt-auto pt-5 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-5 text-[13px] text-gray-500 font-medium">
            <div className="flex items-center gap-1.5">
              <ClockIcon className="w-[18px] h-[18px]" strokeWidth={2} />
              <span>{duration}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPinIcon className="w-[18px] h-[18px]" strokeWidth={2} />
              <span>Main Campus</span>
            </div>
          </div>
          <ArrowRightIcon className="w-5 h-5 text-gray-900 transform group-hover:translate-x-1 transition-transform" strokeWidth={2} />
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
