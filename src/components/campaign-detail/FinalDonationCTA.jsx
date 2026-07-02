import { motion } from 'framer-motion';
import { FiHeart } from 'react-icons/fi';
import { FloatingCircle, FloatingRing, FloatingCross } from '../ui/FloatingShapes';
import PremiumButton from '../ui/PremiumButton';

const FinalDonationCTA = ({ campaign }) => {
  const { image, category } = campaign || {};

  // Curate dynamic headlines based on campaign category
  let headline = "Your contribution can change a child's tomorrow.";
  let subtitle = "Join us in building a world where every child learns, grows, and thrives.";

  if (category === 'Elder Care') {
    headline = "Your contribution can bring comfort and dignity to our elders.";
    subtitle = "Join us in ensuring a safe, healthy, and warm home for elderly mothers and fathers.";
  } else if (category === 'Healthcare') {
    headline = "Your contribution can save a life today.";
    subtitle = "Help us deliver critical treatments, free medications, and diagnostics to underserved villages.";
  } else if (category === 'Community Welfare') {
    headline = "Your contribution can secure nourishment and clean water for all.";
    subtitle = "Join us in building sustainable wells and distributing healthy meals to daily laborers.";
  } else if (category === 'Women Empowerment') {
    headline = "Your contribution can empower a woman to become self-reliant.";
    subtitle = "Help us fund machines, skills, and microfinance networks to foster female financial freedom.";
  }

  const bgImage = image || "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1400&q=80";

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="rounded-[3rem] overflow-hidden relative min-h-[320px] flex items-center"
        >
          {/* Background */}
          <img
            src={bgImage}
            alt={headline}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-navy/80" />

          {/* Floating shapes */}
          <FloatingCircle size={60} color="rgba(255,255,255,0.05)" className="top-8 right-[10%]" delay={0} />
          <FloatingRing size={80} color="rgba(198,169,105,0.12)" className="bottom-8 left-[8%]" delay={1} />
          <FloatingCross size={14} color="rgba(198,169,105,0.25)" className="top-[30%] left-[20%]" delay={2} />

          {/* Content */}
          <div className="relative z-10 text-center max-w-2xl mx-auto px-6 py-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.2 }}
            >
              <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiHeart className="text-gold text-2xl" />
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
                {headline}
              </h2>
              <p className="text-white/70 text-lg mb-8 leading-relaxed">
                {subtitle}
              </p>
              <PremiumButton to="/donate" variant="gold" icon={<FiHeart />}>Donate Now</PremiumButton>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalDonationCTA;
