import HeroSection from '../components/home/HeroSection';
import ImpactStats from '../components/home/ImpactStats';
import AboutSection from '../components/home/AboutSection';
import FocusAreas from '../components/home/FocusAreas';
import FeaturedCampaigns from '../components/home/FeaturedCampaigns';
import SuccessStories from '../components/home/SuccessStories';
import BlogPreview from '../components/home/BlogPreview';
import VolunteerCTA from '../components/home/VolunteerCTA';

const HomePage = () => {
  return (
    <div className="overflow-hidden">
      <HeroSection />
      <ImpactStats />
      <AboutSection />
      <FocusAreas />
      <FeaturedCampaigns />
      <SuccessStories />
      <BlogPreview />
      <VolunteerCTA />
    </div>
  );
};

export default HomePage;
