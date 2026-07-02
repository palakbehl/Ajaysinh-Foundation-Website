import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import CampaignsHero from '../components/campaigns/CampaignsHero';
import CampaignFilters from '../components/campaigns/CampaignFilters';
import FeaturedCampaign from '../components/campaigns/FeaturedCampaign';
import CampaignGrid from '../components/campaigns/CampaignGrid';
import CampaignImpact from '../components/campaigns/CampaignImpact';
import CampaignCTA from '../components/campaigns/CampaignCTA';

const CampaignsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  const [sortBy, setSortBy] = useState('Most Recent');

  return (
    <>
      <Helmet>
        <title>Our Campaigns | Ajaysinh Foundation</title>
        <meta
          name="description"
          content="Browse and support active campaigns by Ajaysinh Foundation. Every contribution makes a lasting impact on education, healthcare, and community welfare."
        />
      </Helmet>
      <div className="overflow-hidden">
        <CampaignsHero />
        <CampaignFilters
          onSearchChange={setSearchTerm}
          onCategoryChange={setCategory}
          onStatusChange={setStatus}
          onSortChange={setSortBy}
        />
        <FeaturedCampaign />
        <CampaignGrid
          searchTerm={searchTerm}
          category={category}
          status={status}
          sortBy={sortBy}
        />
        <CampaignImpact />
        <CampaignCTA />
      </div>
    </>
  );
};

export default CampaignsPage;
