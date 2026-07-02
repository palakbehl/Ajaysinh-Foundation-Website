import { Helmet } from 'react-helmet-async';
import AboutHero from '../components/about/AboutHero';
import FoundationStory from '../components/about/FoundationStory';
import MissionVision from '../components/about/MissionVision';
import CoreValues from '../components/about/CoreValues';
import FounderMessage from '../components/about/FounderMessage';
import ImpactTimeline from '../components/about/ImpactTimeline';
import TeamSection from '../components/about/TeamSection';
import AboutStats from '../components/about/AboutStats';
import AboutCTA from '../components/about/AboutCTA';

const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>About Us | Ajaysinh Foundation</title>
        <meta name="description" content="Learn about Ajaysinh Foundation's journey, mission, vision, and the passionate team behind our humanitarian initiatives." />
      </Helmet>
      <div className="overflow-hidden">
        <AboutHero />
        <FoundationStory />
        <MissionVision />
        <CoreValues />
        <FounderMessage />
        <ImpactTimeline />
        <TeamSection />
        <AboutStats />
        <AboutCTA />
      </div>
    </>
  );
};

export default AboutPage;
