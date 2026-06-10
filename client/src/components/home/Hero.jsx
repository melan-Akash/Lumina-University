import { useState, useEffect } from 'react';
import Button from '../ui/Button';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    title: 'Shape Your Future at',
    highlight: 'Lumina University',
    subtitle: 'Join a global community of innovators, leaders, and creators. Discover programs designed to challenge you and prepare you for a rapidly changing world.'
  },
  {
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    title: 'Discover Academic',
    highlight: 'Excellence',
    subtitle: 'Learn from world-class faculty in state-of-the-art facilities. We empower you to push boundaries and redefine what is possible.'
  },
  {
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    title: 'Experience a Vibrant',
    highlight: 'Campus Life',
    subtitle: 'Engage with diverse cultures, join hundreds of societies, and create memories and connections that will last a lifetime.'
  }
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative bg-primary text-white h-[80vh] min-h-[600px] flex items-center overflow-hidden">
      {/* Slider Backgrounds */}
      {slides.map((slide, index) => (
        <div 
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === current ? 'opacity-100' : 'opacity-0'}`}
        >
          <img
            src={slide.image}
            alt="University Campus"
            className="w-full h-full object-cover"
          />
          {/* Refined Professional Overlay */}
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/50 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent"></div>
        </div>
      ))}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="max-w-3xl">
          {slides.map((slide, index) => (
            <div 
              key={index}
              className={`transition-all duration-1000 transform ${
                index === current 
                  ? 'opacity-100 translate-y-0 relative delay-300' 
                  : 'opacity-0 translate-y-8 absolute inset-0 pointer-events-none'
              }`}
            >
              {index === current && (
                <>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight drop-shadow-md">
                    {slide.title} <span className="text-secondary-fixed-dim">{slide.highlight}</span>
                  </h1>
                  <p className="text-lg md:text-xl text-gray-100 mb-10 max-w-2xl leading-relaxed drop-shadow">
                    {slide.subtitle}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button to="/courses" variant="primary" className="bg-secondary hover:bg-secondary-container border-none px-8 py-4 text-lg shadow-lg">
                      Explore Programs
                    </Button>
                    <Button to="/about" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg backdrop-blur-sm">
                      Virtual Tour
                    </Button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Slider Controls */}
      <div className="absolute bottom-8 right-8 hidden md:flex items-center gap-4 z-20">
        <button 
          onClick={prevSlide}
          className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/20 transition-colors backdrop-blur-md"
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <button 
          onClick={nextSlide}
          className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/20 transition-colors backdrop-blur-md"
        >
          <ChevronRightIcon className="w-6 h-6" />
        </button>
      </div>
      
      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, index) => (
          <button 
            key={index}
            onClick={() => setCurrent(index)}
            className={`transition-all duration-300 rounded-full ${index === current ? 'w-8 h-2.5 bg-secondary' : 'w-2.5 h-2.5 bg-white/50 hover:bg-white/80'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
