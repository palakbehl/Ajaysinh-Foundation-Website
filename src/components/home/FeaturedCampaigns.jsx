import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiHeart } from 'react-icons/fi';
import { FloatingCircle, FloatingLeaf, DotGrid, FloatingRing, FloatingCross } from '../ui/FloatingShapes';

const campaigns = [
  {
    id: 1,
    title: 'Help Build a School in Rural Bihar',
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    raised: 250000,
    goal: 500000,
    category: 'Education'
  },
  {
    id: 2,
    title: 'Medical Camp for Elderly Care',
    image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    raised: 120000,
    goal: 150000,
    category: 'Healthcare'
  },
  {
    id: 3,
    title: 'Clean Drinking Water Initiative',
    image: 'https://images.unsplash.com/photo-1594708767771-a7502209ff51?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    raised: 80000,
    goal: 300000,
    category: 'Community'
  }
];

const CampaignCard = ({ campaign }) => {
  const progress = Math.min((campaign.raised / campaign.goal) * 100, 100);

  return (
    <motion.div 
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
      className="bg-white rounded-3xl overflow-hidden shadow-soft group hover:shadow-xl transition-all duration-300 flex flex-col"
    >
      <Link to={`/campaigns/${campaign.id}`} className="relative h-64 overflow-hidden block">
        <img 
          src={campaign.image} 
          alt={campaign.title} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold text-primary uppercase tracking-wider shadow-sm">
          {campaign.category}
        </div>
        {/* Floating heart on hover */}
        <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 cursor-pointer hover:bg-red-50 hover:text-red-500 text-navy/50">
          <FiHeart />
        </div>
      </Link>
      
      <div className="p-6 flex flex-col flex-grow">
        <Link to={`/campaigns/${campaign.id}`}>
          <h3 className="text-xl font-heading font-bold text-navy mb-4 line-clamp-2 group-hover:text-primary transition-colors">
            {campaign.title}
          </h3>
        </Link>
        
        <div className="mt-auto">
          <div className="w-full bg-gray-100 rounded-full h-2.5 mb-3 overflow-hidden">
            <motion.div 
              className="bg-gold h-2.5 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: `${progress}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
          </div>
          
          <div className="flex justify-between text-sm mb-6">
            <div>
              <span className="text-navy/60 block">Raised</span>
              <span className="font-bold text-primary">₹{campaign.raised.toLocaleString()}</span>
            </div>
            <div className="text-right">
              <span className="text-navy/60 block">Goal</span>
              <span className="font-bold text-navy">₹{campaign.goal.toLocaleString()}</span>
            </div>
          </div>
          
          <Link
            to={`/campaigns/${campaign.id}`}
            className="block text-center w-full border-2 border-primary text-primary font-semibold py-3 rounded-xl btn-fill-hover transition-all duration-300 cursor-pointer"
          >
            View Cause
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const FeaturedCampaigns = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Floating Decorative Elements */}
      <FloatingCircle size={70} color="#DCE8E2" className="top-20 left-[4%] opacity-30" delay={0} />
      <FloatingLeaf size={40} color="#0B4F3A" className="bottom-28 right-[5%]" delay={1} />
      <DotGrid className="absolute top-24 right-[4%]" cols={4} rows={3} color="#C6A969" />
      <FloatingRing size={60} color="#EADBC8" className="bottom-16 left-[8%]" delay={1.5} />
      <FloatingCross size={14} color="#0B4F3A" className="top-[40%] right-[2%]" delay={2} />

      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="text-primary font-bold tracking-widest text-xs uppercase mb-4 block">Active Campaigns</span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-navy">
              Support Our <span className="text-gold">Causes</span>
            </h2>
          </div>
          <Link to="/campaigns" className="text-primary font-semibold flex items-center gap-2 hover:text-gold transition-colors shrink-0 group">
            View All Campaigns 
            <span className="inline-block transition-transform group-hover:translate-x-2">
              <FiArrowRight />
            </span>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {campaigns.map((campaign, index) => (
            <motion.div
              key={campaign.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <CampaignCard campaign={campaign} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCampaigns;
