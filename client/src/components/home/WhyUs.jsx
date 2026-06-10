import { GlobeAltIcon, LightBulbIcon, BriefcaseIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import SectionHeader from '../ui/SectionHeader';

const features = [
  {
    name: 'Global Perspective',
    description: 'Study alongside students from over 100 countries and participate in international exchange programs.',
    icon: GlobeAltIcon,
  },
  {
    name: 'Innovative Research',
    description: 'Engage with cutting-edge research facilities and faculty members who are leaders in their fields.',
    icon: LightBulbIcon,
  },
  {
    name: 'Career Readiness',
    description: 'Benefit from our strong industry links, dedicated career services, and built-in placement opportunities.',
    icon: BriefcaseIcon,
  },
  {
    name: 'Vibrant Community',
    description: 'Join over 200 student societies and enjoy a campus life that is rich in culture, sports, and arts.',
    icon: UserGroupIcon,
  },
];

const WhyUs = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader 
          title="Why Choose Lumina" 
          subtitle="We are committed to providing an environment where intellectual curiosity thrives and leaders are forged."
          centered={true}
        />

        <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.name} className="relative text-center sm:text-left flex flex-col items-center sm:items-start">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-container text-white shadow-lg">
                <feature.icon className="h-8 w-8" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold leading-7 text-primary mb-3">
                {feature.name}
              </h3>
              <p className="text-base leading-7 text-on-surface-variant">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
