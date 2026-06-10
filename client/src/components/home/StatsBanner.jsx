const stats = [
  { id: 1, name: 'Global Ranking', value: 'Top 50' },
  { id: 2, name: 'Student Satisfaction', value: '94%' },
  { id: 3, name: 'Employability Rate', value: '98%' },
  { id: 4, name: 'International Students', value: '15k+' },
];

const StatsBanner = () => {
  return (
    <div className="bg-primary-container py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <dl className="grid grid-cols-2 gap-x-8 gap-y-12 text-center lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-3">
              <dt className="text-base leading-7 text-gray-300">{stat.name}</dt>
              <dd className="order-first text-4xl font-bold tracking-tight text-white sm:text-5xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};

export default StatsBanner;
