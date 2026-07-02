import { motion } from 'framer-motion';
import { FiHeart, FiArrowRight, FiUsers, FiClock } from 'react-icons/fi';
import {
  DotGrid,
  FloatingCircle,
  FloatingRing,
  FloatingLeaf,
  FloatingDiamond,
} from '../ui/FloatingShapes';
import PremiumButton from '../ui/PremiumButton';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const FeaturedCampaign = () => {
  return (
    <section className="relative bg-cream py-20 overflow-hidden">
      {/* Floating Decorative Elements */}
      <DotGrid className="absolute top-20 right-[6%]" cols={4} rows={4} color="#C6A969" />
      <FloatingRing size={70} color="#0B4F3A" className="top-16 left-[8%]" delay={0} />
      <FloatingCircle size={50} color="#DCE8E2" className="bottom-20 right-[10%]" delay={1} />
      <FloatingLeaf size={36} color="#0B4F3A" className="bottom-32 left-[5%]" delay={1.5} />
      <FloatingDiamond size={14} color="#C6A969" className="top-[40%] right-[3%]" delay={2} />

      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="text-primary uppercase tracking-widest text-sm font-semibold">
            Featured Campaign
          </span>
        </motion.div>

        {/* Asymmetric Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-center"
        >
          {/* Left — Image (3 cols) */}
          <motion.div variants={itemVariants} className="lg:col-span-3 relative group">
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl aspect-[4/3]">
              {/* Category Badge */}
              <span className="absolute top-4 left-4 z-20 bg-primary/90 text-white text-xs font-semibold px-4 py-1.5 rounded-full">
                Education
              </span>

              {/* Bottom overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent z-10" />

              <img
                src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80"
                alt="Bright Futures Education Program – children learning in a classroom"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </motion.div>

          {/* Right — Content (2 cols) */}
          <motion.div
            variants={containerVariants}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            {/* Title */}
            <motion.h3
              variants={itemVariants}
              className="text-3xl md:text-4xl font-heading font-bold text-navy leading-tight"
            >
              Bright Futures Education Program
            </motion.h3>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-navy/60 leading-relaxed text-base"
            >
              Providing quality education, books, and learning resources to
              underprivileged children across rural villages in Bihar and
              Rajasthan. Every child deserves a chance to learn.
            </motion.p>

            {/* Progress Section */}
            <motion.div variants={itemVariants} className="space-y-3">
              {/* Progress Bar */}
              <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '62%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
                  className="h-full bg-gold rounded-full"
                />
              </div>

              {/* Raised / Goal */}
              <div className="flex items-center justify-between">
                <p className="text-primary font-bold text-lg">₹12,50,000</p>
                <p className="text-navy/50 text-sm">of ₹20,00,000</p>
              </div>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-6"
            >
              <div className="flex items-center gap-2 text-navy/60">
                <div className="w-9 h-9 bg-sage rounded-full flex items-center justify-center">
                  <FiUsers className="text-primary text-sm" />
                </div>
                <span className="text-sm font-medium">350+ Beneficiaries</span>
              </div>
              <div className="flex items-center gap-2 text-navy/60">
                <div className="w-9 h-9 bg-gold/10 rounded-full flex items-center justify-center">
                  <FiClock className="text-gold text-sm" />
                </div>
                <span className="text-sm font-medium">45 Days Left</span>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <PremiumButton to="/donate" variant="primary" icon={<FiHeart />}>
                Donate Now
              </PremiumButton>
              <PremiumButton
                to="/campaigns/1"
                variant="outline"
                icon={<FiArrowRight />}
              >
                View Details
              </PremiumButton>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedCampaign;
