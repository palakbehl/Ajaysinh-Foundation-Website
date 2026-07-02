import { motion } from 'framer-motion';
import CampaignCard from '../campaigns/CampaignCard';
import { campaigns } from '../../data/campaigns';

const RelatedCampaigns = ({ currentId }) => {
  // Filter out the current campaign and show up to 3 related ones
  const related = campaigns
    .filter((c) => c.id !== currentId)
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section className="bg-cream py-16">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className="text-primary font-semibold uppercase tracking-widest text-xs block mb-3">EXPLORE MORE</span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy">Related Campaigns</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {related.map((campaign, i) => (
            <motion.div
              key={campaign.id}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.12 }}
            >
              <CampaignCard campaign={campaign} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedCampaigns;
