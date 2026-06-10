import { Link } from 'react-router-dom';
import SectionHeader from '../ui/SectionHeader';
import CourseCard from '../ui/CourseCard';
import Button from '../ui/Button';
import coursesData from '../../data/courses.json';

const FeaturedCourses = () => {
  // Select a few diverse courses for the homepage
  const featuredCourses = coursesData.slice(0, 3);

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <SectionHeader 
            title="Popular Programs" 
            subtitle="Discover our most sought-after degree programs designed to accelerate your career."
          />
          <div className="mb-4">
            <Button to="/courses" variant="outline">
              View All Courses
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCourses.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;
