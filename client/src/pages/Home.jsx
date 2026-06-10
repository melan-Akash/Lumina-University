import Hero from '../components/home/Hero';
import StatsBanner from '../components/home/StatsBanner';
import FeaturedCourses from '../components/home/FeaturedCourses';
import WhyUs from '../components/home/WhyUs';
import LatestNews from '../components/home/LatestNews';
import Testimonials from '../components/home/Testimonials';
import Partners from '../components/home/Partners';

const Home = () => {
  return (
    <main>
      <Hero />
      <StatsBanner />
      <FeaturedCourses />
      <WhyUs />
      <LatestNews />
      <Testimonials />
      <Partners />
    </main>
  );
};

export default Home;
