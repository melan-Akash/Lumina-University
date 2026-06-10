import SectionHeader from '../components/ui/SectionHeader';

const About = () => {
  return (
    <div className="bg-surface min-h-screen">
      {/* Hero Section */}
      <div className="bg-primary text-white py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">About Lumina</h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            A legacy of excellence, a future of innovation. Discover the history and mission driving Lumina University forward.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <h2 className="text-3xl font-bold text-primary mb-6">Our History</h2>
            <p className="text-on-surface-variant text-lg leading-relaxed mb-6">
              Founded in 1892, Lumina University was established with a singular vision: to create an institution where academic rigor meets practical innovation. Over the past century, we have grown from a small regional college into a globally recognized university.
            </p>
            <p className="text-on-surface-variant text-lg leading-relaxed">
              Our alumni have gone on to win Nobel Prizes, lead multinational corporations, and drive social change across the globe. Today, we remain committed to our founding principles while constantly adapting to the challenges of the 21st century.
            </p>
          </div>
          <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
            <img 
              src="https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Historic campus building" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <SectionHeader 
          title="Our Core Values" 
          subtitle="These principles guide everything we do, from our curriculum design to our community engagement."
          centered={true}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {[
            { title: 'Excellence', desc: 'We strive for the highest standards in teaching, research, and administration.' },
            { title: 'Inclusivity', desc: 'We foster a diverse community where every voice is heard and valued.' },
            { title: 'Innovation', desc: 'We embrace new ideas, technologies, and methodologies to solve complex problems.' }
          ].map((value, idx) => (
            <div key={idx} className="bg-white p-8 rounded-xl shadow-card text-center">
              <div className="w-16 h-16 bg-secondary-container text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                {idx + 1}
              </div>
              <h3 className="text-xl font-bold text-primary mb-4">{value.title}</h3>
              <p className="text-on-surface-variant">{value.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
