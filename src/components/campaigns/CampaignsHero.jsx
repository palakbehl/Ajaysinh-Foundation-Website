import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiChevronRight, FiArrowDown } from 'react-icons/fi';
import { FloatingCircle, FloatingRing, FloatingCross, FloatingDiamond, DotGrid } from '../ui/FloatingShapes';

const CampaignsHero = () => {
  return (
    <section className="relative min-h-[50vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1600&q=80"
          alt="Children smiling"
          className="w-full h-full object-cover"
        />
        {/* Overlays */}
        <div className="absolute inset-0 bg-navy/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/60 to-navy/40" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </div>

      {/* Floating Shapes */}
      <FloatingCircle size={60} color="rgba(255,255,255,0.05)" className="top-28 right-[10%]" delay={0} />
      <FloatingRing size={80} color="rgba(198,169,105,0.15)" className="bottom-24 left-[8%]" delay={1} />
      <FloatingCross size={14} color="rgba(198,169,105,0.3)" className="top-[40%] right-[20%]" delay={2} />
      <FloatingDiamond size={12} color="rgba(255,255,255,0.1)" className="top-[30%] left-[15%]" delay={1.5} />
      <DotGrid className="absolute top-32 right-[5%] opacity-10" cols={4} rows={3} color="#ffffff" />

      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10 pt-32 pb-20 md:pt-40 md:pb-24">
        {/* Breadcrumb - with pill background for visibility */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 text-sm bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
            <Link to="/" className="text-white/70 hover:text-gold transition-colors duration-300">
              Home
            </Link>
            <FiChevronRight className="text-white/40 text-xs" />
            <span className="text-gold font-semibold">Our Campaigns</span>
          </div>
        </motion.nav>

        {/* Content - centered on mobile, left-aligned on desktop */}
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <span className="text-gold font-semibold uppercase tracking-widest text-xs block mb-4">
              OUR CAMPAIGNS
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-[1.1] mb-6">
              Every Contribution{' '}
              <br className="hidden md:block" />
              Creates a Lasting{' '}
              <span className="text-gold">Impact</span>
            </h1>

            <p className="text-lg text-white/70 leading-relaxed mb-8 max-w-lg">
              Support our ongoing initiatives that bring real change to communities and help those who need it the most.
            </p>
          </motion.div>

          {/* Stats pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-3"
          >
            {[
              { label: '8 Active Campaigns', accent: 'bg-primary' },
              { label: '₹50L+ Raised', accent: 'bg-gold' },
              { label: '5,000+ Lives Impacted', accent: 'bg-white' },
            ].map((pill, i) => (
              <motion.div
                key={pill.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 px-4 py-2 rounded-full"
              >
                <span className={`w-2 h-2 rounded-full ${pill.accent}`} />
                <span className="text-white/90 text-sm font-medium">{pill.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
        >
          <span className="text-white/40 text-xs uppercase tracking-widest">Scroll</span>
          <FiArrowDown className="text-white/40" />
        </motion.div>
      </div>
    </section>
  );
};

export default CampaignsHero;
