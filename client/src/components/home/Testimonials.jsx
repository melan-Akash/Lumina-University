import { useState } from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const testimonials = [
  {
    id: 1,
    quote: '"I name oonderstandrating opportunize innanurating with future educations and meited vatow. Leadership & caine through in the amornce of kiy business experience."',
    author: 'Aaran Botmsan',
    major: 'Major: Aeademi Technology',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 2,
    quote: '"Lumina University provided me with the tools and the network to excel in my career. The faculty genuinely cares about student success."',
    author: 'Sarah Jenkins',
    major: 'Major: Computer Science',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section className="py-24 bg-[#eff5ff]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Student Testimonials
          </h2>
        </div>

        <div className="flex items-center justify-between gap-4 md:gap-12">
          <button 
            onClick={prevTestimonial}
            className="text-secondary hover:text-secondary-container transition-colors flex-shrink-0"
          >
            <ArrowLeftIcon className="w-6 h-6 md:w-8 md:h-8" strokeWidth={2} />
          </button>

          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 flex-grow max-w-4xl mx-auto">
            <div className="w-32 h-32 md:w-48 md:h-48 flex-shrink-0">
              <img 
                src={current.image} 
                alt={current.author} 
                className="w-full h-full object-cover rounded-full shadow-lg"
              />
            </div>
            <div className="text-center md:text-left">
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6 font-medium">
                {current.quote}
              </p>
              <div>
                <h4 className="font-bold text-gray-900 text-lg">{current.author}</h4>
                <p className="text-gray-500 text-sm">{current.major}</p>
              </div>
            </div>
          </div>

          <button 
            onClick={nextTestimonial}
            className="text-secondary hover:text-secondary-container transition-colors flex-shrink-0"
          >
            <ArrowRightIcon className="w-6 h-6 md:w-8 md:h-8" strokeWidth={2} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
