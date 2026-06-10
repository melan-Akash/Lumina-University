import SectionHeader from '../components/ui/SectionHeader';

const lifeAreas = [
  {
    title: 'Accommodation',
    description: 'Modern, safe, and comfortable living spaces located both on-campus and in the city center. Find your home away from home.',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Clubs & Societies',
    description: 'With over 200 student-led clubs, from debating to robotics, there is a community waiting for you to join and lead.',
    image: 'https://images.unsplash.com/photo-1523580494112-071d45d41582?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Sports & Fitness',
    description: 'State-of-the-art sports facilities, intramural leagues, and elite athletic programs to keep you active and healthy.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'City Life',
    description: 'Explore a vibrant city rich in culture, history, and entertainment, perfectly suited for the student experience.',
    image: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  }
];

const StudentLife = () => {
  return (
    <div className="bg-surface min-h-screen">
      <div className="relative bg-primary py-24 text-center">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" alt="Students gathering" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Student Life at Lumina</h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Your university experience extends far beyond the classroom. Discover a vibrant, diverse, and supportive community.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <SectionHeader 
          title="Experience More" 
          subtitle="Whether you're looking to pursue a passion, try something new, or simply relax, Lumina has something for everyone."
          centered={true}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
          {lifeAreas.map((area, index) => (
            <div key={index} className="bg-white rounded-xl shadow-card overflow-hidden group">
              <div className="h-64 overflow-hidden">
                <img 
                  src={area.image} 
                  alt={area.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-primary mb-4">{area.title}</h3>
                <p className="text-on-surface-variant text-lg leading-relaxed">
                  {area.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentLife;
