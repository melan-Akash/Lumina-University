import { ArrowRightIcon } from '@heroicons/react/24/outline';
import SectionHeader from '../ui/SectionHeader';
import Button from '../ui/Button';

const newsItems = [
  {
    id: 1,
    tag: 'RESEARCH',
    date: 'Jan 11, 2022',
    title: 'Computer Science, BSc Advanced research methodi...',
    description: 'Master research methodologies and clinical applications for alems aming for careers ...',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 2,
    tag: 'CAMPUS LIFE',
    date: 'Apr 11, 2023',
    title: 'Business Administration Develop leadership skills and...',
    description: 'Develop leadership skills and strategic thinking with our globally recognized business.',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 3,
    tag: 'EVENT',
    date: 'Apr 11, 2022',
    title: 'Event of smat education busineai programs projects...',
    description: 'Loan with renewsive masic and too learaming willnern one data epctor in this screen...',
    image: 'https://images.unsplash.com/photo-1523580494112-071d45d41582?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
  }
];

const LatestNews = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Latest News & Events
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col h-full border border-gray-100">
              <div className="h-48 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-4 mb-3">
                  <span className="bg-red-50 text-secondary text-[10px] font-bold uppercase tracking-wider py-1 px-2 rounded">
                    {item.tag}
                  </span>
                  <span className="text-gray-400 text-xs font-medium">
                    {item.date}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm mb-6 line-clamp-3 flex-grow leading-relaxed">
                  {item.description}
                </p>
                <div className="mt-auto">
                  <a href="#" className="inline-flex items-center text-secondary font-semibold text-sm hover:text-secondary-container transition-colors">
                    Read More <ArrowRightIcon className="w-4 h-4 ml-1" strokeWidth={2.5} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button variant="primary" className="bg-secondary hover:bg-secondary-container text-white px-8 py-3 font-semibold tracking-wide shadow-md">
            View All News
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LatestNews;
