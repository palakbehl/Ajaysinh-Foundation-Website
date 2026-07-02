import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import PremiumButton from '../ui/PremiumButton';
import { FloatingCircle, FloatingRing, FloatingCross, FloatingDiamond, DashedCircle } from '../ui/FloatingShapes';

const AboutCTA = () => {
  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="rounded-[3rem] overflow-hidden shadow-float relative"
        >
          <div className="grid lg:grid-cols-5">
            {/* Left Side — Text Content (60%) */}
            <div className="lg:col-span-3 bg-primary p-12 md:p-16 flex flex-col justify-center relative overflow-hidden">
              {/* Floating shapes inside card — white at very low opacity */}
              <FloatingCircle size={60} color="rgba(255,255,255,0.06)" className="top-8 right-12" delay={0} />
              <FloatingCircle size={40} color="rgba(255,255,255,0.04)" className="bottom-12 left-8" delay={1.5} />
              <FloatingRing size={80} color="rgba(255,255,255,0.08)" strokeWidth={1} className="top-[50%] right-[5%]" delay={0.5} />
              <FloatingCross size={16} color="rgba(255,255,255,0.1)" className="top-[20%] left-[60%]" delay={2} />
              <FloatingDiamond size={12} color="rgba(255,255,255,0.08)" className="bottom-[30%] right-[25%]" delay={1} />
              <DashedCircle size={100} color="rgba(255,255,255,0.06)" className="bottom-4 right-[40%]" delay={0} />

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="relative z-10"
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-6 leading-tight">
                  Be a Part of{' '}
                  <span className="text-gold">Our Mission</span>
                </h2>
                <p className="text-white/80 text-lg leading-relaxed mb-10 max-w-lg">
                  Together, we can build a future full of hope, equality, and opportunities for all.
                </p>

                <div className="flex flex-wrap gap-4">
                  <PremiumButton
                    to="/volunteer"
                    variant="gold"
                    icon={<FiArrowRight />}
                  >
                    Join Us Today
                  </PremiumButton>
                  <PremiumButton
                    to="/donate"
                    variant="outline-white"
                  >
                    Donate Now
                  </PremiumButton>
                </div>
              </motion.div>
            </div>

            {/* Right Side — Image (40%) */}
            <div className="lg:col-span-2 relative min-h-[300px] lg:min-h-0">
              <img
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80"
                alt="Volunteers helping community"
                className="w-full h-full object-cover absolute inset-0"
              />
              {/* Gradient overlay from left edge */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-transparent"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutCTA;
