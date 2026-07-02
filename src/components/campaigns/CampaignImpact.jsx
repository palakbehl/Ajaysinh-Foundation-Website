import { motion } from 'framer-motion';
import { FiSmile, FiHome, FiCoffee, FiMapPin } from 'react-icons/fi';
import {
  FloatingCircle,
  FloatingRing,
  FloatingCross,
  FloatingLeaf,
  DashedCircle,
} from '../ui/FloatingShapes';

const stats = [
  { value: '5,000+', label: 'Children Helped', icon: FiSmile },
  { value: '1,200+', label: 'Families Supported', icon: FiHome },
  { value: '1,00,000+', label: 'Meals Served', icon: FiCoffee },
  { value: '25+', label: 'Villages Reached', icon: FiMapPin },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const CampaignImpact = () => {
  return (
    <section className="bg-navy py-20 relative overflow-hidden">
      {/* Floating Shapes */}
      <FloatingCircle
        size={120}
        color="rgba(198, 169, 105, 0.08)"
        delay={0}
        className="top-10 left-[5%]"
      />
      <FloatingRing
        size={80}
        color="rgba(255, 255, 255, 0.1)"
        delay={1}
        className="top-20 right-[10%]"
      />
      <FloatingCross
        size={24}
        color="rgba(198, 169, 105, 0.2)"
        delay={2}
        className="bottom-16 left-[15%]"
      />
      <FloatingLeaf
        size={50}
        color="rgba(255, 255, 255, 0.08)"
        delay={1.5}
        className="bottom-10 right-[20%]"
      />
      <DashedCircle
        size={140}
        color="rgba(198, 169, 105, 0.1)"
        delay={0.5}
        className="top-1/2 -translate-y-1/2 left-[50%]"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-gold text-sm font-bold tracking-[0.2em] uppercase">
            Our Collective Impact
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mt-4">
            Together, We've Made a Difference
          </h2>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  scale: 1.02,
                }}
                transition={{ duration: 0.3 }}
                className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-8 text-center group cursor-default"
              >
                {/* Icon */}
                <div className="w-16 h-16 bg-gold/15 rounded-full flex items-center justify-center mx-auto mb-5 group-hover:bg-gold/25 transition-colors duration-300">
                  <Icon className="w-7 h-7 text-gold" />
                </div>

                {/* Stat Value */}
                <h3 className="text-3xl md:text-4xl font-heading font-bold text-gold mb-2">
                  {stat.value}
                </h3>

                {/* Label */}
                <p className="text-white/80 text-sm font-medium">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default CampaignImpact;
