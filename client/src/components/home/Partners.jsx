import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const partners = [
  { id: 1, name: 'Academic University', icon: 'Academic University' },
  { id: 2, name: 'University of ORLKO', icon: 'UNIVERSITY of ORLKO' },
  { id: 3, name: 'Vieltorn Mationst Science', icon: 'Vieltorn Mationst Science' },
  { id: 4, name: 'Microsoft', icon: 'Microsoft' },
  { id: 5, name: 'corporate', icon: 'corporate' },
  { id: 6, name: 'Academic Government of University', icon: 'Academic Government of University' },
];

const Partners = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-12">
          Our Partners
        </h2>

        <div className="flex items-center justify-between gap-4">
          <button className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0">
            <ChevronLeftIcon className="w-6 h-6" strokeWidth={2} />
          </button>

          <div className="flex items-center justify-between flex-grow overflow-hidden gap-8 px-4 opacity-50 grayscale">
            {partners.map((partner) => (
              <div key={partner.id} className="flex-shrink-0 flex items-center justify-center font-bold text-sm text-gray-600 gap-2">
                 {/* Placeholder for logos since we don't have SVGs */}
                 <div className="w-6 h-6 rounded-full bg-gray-300"></div>
                 <span className="whitespace-nowrap max-w-[120px] overflow-hidden text-ellipsis">{partner.icon}</span>
              </div>
            ))}
          </div>

          <button className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0">
            <ChevronRightIcon className="w-6 h-6" strokeWidth={2} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Partners;
