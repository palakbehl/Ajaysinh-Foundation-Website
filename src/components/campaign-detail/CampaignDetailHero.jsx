import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiChevronRight, FiHome, FiUsers, FiClock, FiShield, FiHeart, FiShare2, FiBookOpen, FiStar } from 'react-icons/fi';
import { DotGrid, FloatingRing, FloatingCircle, FloatingCross } from '../ui/FloatingShapes';
import PremiumButton from '../ui/PremiumButton';

const CampaignDetailHero = ({ campaign }) => {
  const progress = Math.round((campaign.raised / campaign.goal) * 100);
  const formatAmount = (n) => n >= 100000 ? `₹${(n / 100000).toFixed(n % 100000 === 0 ? 0 : 2)}L` : `₹${n.toLocaleString('en-IN')}`;

  const highlights = [
    { icon: FiBookOpen, title: 'Quality Education', desc: 'Access to books, tuition, and learning materials.', bg: 'bg-primary/10', color: 'text-primary' },
    { icon: FiStar, title: 'Bright Future', desc: 'Helping children dream bigger and achieve more.', bg: 'bg-gold/10', color: 'text-gold' },
    { icon: FiUsers, title: 'Equal Opportunity', desc: 'Every child deserves a chance to succeed.', bg: 'bg-sage/30', color: 'text-primary' },
  ];

  return (
    <section className="bg-cream relative pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden">
      <div className="absolute top-0 left-0 w-[45%] h-full bg-white/50 rounded-br-[200px] -z-0" />
      <div className="absolute bottom-0 right-[15%] w-80 h-80 bg-primary/5 rounded-full blur-[100px] -z-0" />
      <FloatingRing size={60} color="#C6A96940" className="top-36 right-[6%]" delay={0} />
      <FloatingCircle size={40} color="#DCE8E2" className="bottom-28 left-[5%]" delay={1} />
      <FloatingCross size={12} color="#C6A969" className="top-[50%] left-[15%]" delay={2} />
      <DotGrid className="absolute bottom-12 right-[4%]" cols={3} rows={3} color="#C6A969" />

      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 text-sm mb-8 flex-wrap"
        >
          <Link to="/" className="text-navy/40 hover:text-primary transition-colors flex items-center gap-1"><FiHome className="text-xs" /> Home</Link>
          <FiChevronRight className="text-navy/25 text-xs" />
          <Link to="/campaigns" className="text-navy/40 hover:text-primary transition-colors">Our Campaigns</Link>
          <FiChevronRight className="text-navy/25 text-xs" />
          <span className="text-primary font-semibold">{campaign.title}</span>
        </motion.nav>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* LEFT — Text content */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
            <span className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-5">
              {campaign.category}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-navy leading-tight mb-5">
              {campaign.title}
            </h1>
            <p className="text-navy/60 text-lg leading-relaxed mb-8">{campaign.description}</p>

            {/* Quick stats */}
            <div className="flex flex-wrap gap-5 mb-8">
              {[
                { icon: FiUsers, label: `${campaign.beneficiaries} Children Benefited` },
                { icon: FiClock, label: `${campaign.daysLeft} Days Left` },
                { icon: FiShield, label: 'Tax Benefit 80G Certified' },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center"><s.icon className="text-primary text-sm" /></div>
                  <span className="text-navy/70 text-sm font-medium">{s.label}</span>
                </div>
              ))}
            </div>

            {/* Progress card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl shadow-soft p-6 mb-8 border border-gray-100"
            >
              <div className="flex justify-between items-end mb-2">
                <div>
                  <span className="text-primary text-2xl font-bold font-heading">₹{campaign.raised.toLocaleString('en-IN')}</span>
                  <span className="text-navy/40 text-sm ml-2">Raised of ₹{campaign.goal.toLocaleString('en-IN')} Goal</span>
                </div>
                <span className="text-gold font-bold text-lg">{progress}%</span>
              </div>
              <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }} animate={{ width: `${progress}%` }}
                  transition={{ duration: 1.5, delay: 0.6, ease: 'easeOut' }}
                  className="h-full bg-gold rounded-full"
                />
              </div>
              <p className="text-navy/40 text-xs mt-2">{campaign.donors}+ generous donors have contributed</p>
            </motion.div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4">
              <PremiumButton to="/donate" variant="primary" icon={<FiHeart />}>Donate Now</PremiumButton>
              <PremiumButton variant="outline" icon={<FiShare2 />}>Share Campaign</PremiumButton>
            </div>
          </motion.div>

          {/* RIGHT — Image + highlights */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}>
            <div className="rounded-[2rem] overflow-hidden shadow-2xl mb-6">
              <motion.img
                whileHover={{ scale: 1.03 }} transition={{ duration: 0.6 }}
                src={campaign.image} alt={campaign.title}
                className="w-full h-[320px] md:h-[380px] object-cover"
              />
            </div>
            {/* Highlight cards */}
            <div className="grid grid-cols-3 gap-3">
              {highlights.map((h, i) => (
                <motion.div
                  key={h.title}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="bg-white rounded-xl shadow-soft p-4 text-center"
                >
                  <div className={`w-10 h-10 rounded-full ${h.bg} flex items-center justify-center mx-auto mb-2`}>
                    <h.icon className={`${h.color} text-lg`} />
                  </div>
                  <p className="text-navy font-semibold text-xs mb-0.5">{h.title}</p>
                  <p className="text-navy/40 text-[10px] leading-tight hidden md:block">{h.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CampaignDetailHero;
