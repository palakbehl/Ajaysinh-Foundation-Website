import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { getCampaignById } from '../data/campaigns';
import campaignService from '../services/campaignService';
import CampaignDetailHero from '../components/campaign-detail/CampaignDetailHero';
import CampaignOverview from '../components/campaign-detail/CampaignOverview';
import DonationSidebar from '../components/campaign-detail/DonationSidebar';
import ImpactBreakdown from '../components/campaign-detail/ImpactBreakdown';
import CampaignGallery from '../components/campaign-detail/CampaignGallery';
import ProgressUpdates from '../components/campaign-detail/ProgressUpdates';
import SuccessStories from '../components/campaign-detail/SuccessStories';
import CampaignFAQ from '../components/campaign-detail/CampaignFAQ';
import ShareSupport from '../components/campaign-detail/ShareSupport';
import RelatedCampaigns from '../components/campaign-detail/RelatedCampaigns';
import FinalDonationCTA from '../components/campaign-detail/FinalDonationCTA';
import { FiAlertCircle, FiArrowLeft, FiLoader } from 'react-icons/fi';

const CampaignDetailPage = () => {
  const { id } = useParams();
  const staticFallback = getCampaignById(id);
  const [campaign, setCampaign] = useState(staticFallback);
  const [loading, setLoading] = useState(!staticFallback);

  useEffect(() => {
    let isMounted = true;

    const fetchLiveCampaign = async () => {
      try {
        const res = await campaignService.getCampaignByIdOrSlug(id);
        if (res && res.campaign && isMounted) {
          const apiCampaign = res.campaign;
          // Normalize to component schema
          setCampaign({
            id: apiCampaign._id,
            title: apiCampaign.title,
            description: apiCampaign.description,
            image: apiCampaign.featuredImage?.url || apiCampaign.image,
            raised: apiCampaign.raisedAmount ?? 0,
            goal: apiCampaign.goalAmount ?? 100000,
            category: apiCampaign.category,
            donors: apiCampaign.donors ?? 12,
            beneficiaries: apiCampaign.beneficiaries || '100+',
            daysLeft: apiCampaign.daysLeft || 30,
            status: apiCampaign.status || 'Active',
            overview: apiCampaign.overview || staticFallback?.overview || {
              text: apiCampaign.description,
              checklist: ['Community impact initiatives', 'Direct on-ground aid support'],
              stats: [],
            },
            impactBreakdown: apiCampaign.impactBreakdown || staticFallback?.impactBreakdown || [],
            gallery: apiCampaign.gallery?.map((g) => g.url) || staticFallback?.gallery || [],
            updates: apiCampaign.updates || staticFallback?.updates || [],
            stories: apiCampaign.stories || staticFallback?.stories || [],
            faqs: apiCampaign.faqs || staticFallback?.faqs || [],
          });
        }
      } catch (err) {
        // If API fails or not found, keep static fallback if available
        if (!staticFallback && isMounted) {
          setCampaign(null);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchLiveCampaign();

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="pt-32 pb-24 min-h-screen flex flex-col items-center justify-center text-center px-4 bg-cream">
        <FiLoader className="w-10 h-10 text-primary animate-spin mb-4" />
        <p className="text-navy/60">Loading campaign details...</p>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="pt-32 pb-24 min-h-screen flex flex-col items-center justify-center text-center px-4 bg-cream">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6 text-red-500">
          <FiAlertCircle className="w-10 h-10" />
        </div>
        <h1 className="text-4xl font-heading font-bold text-navy mb-4">Campaign Not Found</h1>
        <p className="text-navy/60 max-w-md mb-8">
          The campaign you are looking for does not exist or has been removed. Please check the URL or explore our active causes.
        </p>
        <Link
          to="/campaigns"
          className="flex items-center gap-2 bg-primary hover:bg-primary/95 text-white font-bold px-6 py-3 rounded-xl shadow-lg transition-all cursor-pointer"
        >
          <FiArrowLeft /> Back to Campaigns
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{campaign.title} | Ajaysinh Foundation</title>
        <meta
          name="description"
          content={`${campaign.description} Support this campaign by Ajaysinh Foundation.`}
        />
      </Helmet>
      <div className="overflow-hidden">
        <CampaignDetailHero campaign={campaign} />

        {/* Main content with sticky sidebar */}
        <div className="bg-white">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl py-16">
            <div className="grid lg:grid-cols-3 gap-10">
              {/* Main content area */}
              <div className="lg:col-span-2">
                <CampaignOverview overview={campaign.overview} />
              </div>
              {/* Sticky sidebar */}
              <div className="lg:col-span-1">
                <DonationSidebar campaign={campaign} />
              </div>
            </div>
          </div>
        </div>

        <ImpactBreakdown breakdown={campaign.impactBreakdown} />
        <CampaignGallery gallery={campaign.gallery} />
        <ProgressUpdates updates={campaign.updates} />
        <SuccessStories stories={campaign.stories} />
        <CampaignFAQ faqs={campaign.faqs} />
        <ShareSupport campaign={campaign} />
        <RelatedCampaigns currentId={campaign.id} />
        <FinalDonationCTA campaign={campaign} />
      </div>
    </>
  );
};

export default CampaignDetailPage;
