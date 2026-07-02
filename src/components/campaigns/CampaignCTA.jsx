import { motion } from 'framer-motion';
import { FiHeart, FiArrowRight } from 'react-icons/fi';
import PremiumButton from '../ui/PremiumButton';
import {
  FloatingCircle,
  FloatingRing,
  FloatingCross,
  FloatingDiamond,
} from '../ui/FloatingShapes';

const CampaignCTA = () => {
  return (
    <section className="bg-cream py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="rounded-[3rem] overflow-hidden bg-primary shadow-2xl relative"
        >
          {/* Floating Shapes inside card */}
          <FloatingCircle
            size={100}
            color="rgba(255, 255, 255, 0.04)"
            delay={0}
            className="top-4 right-[10%]"
          />
          <FloatingRing
            size={70}
            color="rgba(255, 255, 255, 0.06)"
            delay={1}
            className="bottom-4 left-[5%]"
          />
          <FloatingCross
            size={18}
            color="rgba(255, 255, 255, 0.08)"
            delay={2}
            className="top-8 left-[30%]"
          />
          <FloatingDiamond
            size={14}
            color="rgba(255, 255, 255, 0.06)"
            delay={1.5}
            className="bottom-8 right-[25%]"
          />

          {/* Content */}
          <div className="relative z-10 px-8 py-12 md:px-16 md:py-16 flex flex-col md:flex-row items-center gap-8 md:gap-12">
            {/* Left — Icon */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex-shrink-0"
            >
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center">
                <FiHeart className="w-8 h-8 text-gold" />
              </div>
            </motion.div>

            {/* Center — Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="flex-1 text-center md:text-left"
            >
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-3">
                Want to start your own campaign?
              </h2>
              <p className="text-white/70 text-base md:text-lg max-w-xl">
                Join hands with us and raise funds for a cause close to your
                heart.
              </p>
            </motion.div>

            {/* Right — Button */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex-shrink-0"
            >
              <PremiumButton
                to="/contact"
                variant="gold"
                icon={<FiArrowRight className="w-5 h-5" />}
              >
                Start a Campaign
              </PremiumButton>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CampaignCTA;
