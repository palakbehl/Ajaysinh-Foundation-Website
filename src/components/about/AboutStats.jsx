import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { FiHeart, FiUsers, FiAward, FiCoffee } from 'react-icons/fi';
import { FloatingCircle, FloatingRing, FloatingCross, FloatingDiamond, DashedCircle, FloatingWave } from '../ui/FloatingShapes';

const stats = [
  { value: 5000, suffix: '+', label: 'Lives Impacted', icon: FiHeart, display: '5,000+' },
  { value: 500, suffix: '+', label: 'Active Volunteers', icon: FiUsers, display: '500+' },
  { value: 50, suffix: '+', label: 'Campaigns Completed', icon: FiAward, display: '50+' },
  { value: 100000, suffix: '+', label: 'Meals Served', icon: FiCoffee, display: '1,00,000+' },
];

const AnimatedNumber = ({ value, suffix, display }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => {
    const num = Math.round(latest);
    // Use Indian number formatting for the 100000 case
    if (value >= 100000) {
      return num.toLocaleString('en-IN') + suffix;
    }
    return num.toLocaleString() + suffix;
  });

  useEffect(() => {
    if (isInView) {
      const controls = animate(motionValue, value, {
        duration: 2,
        ease: 'easeOut',
      });
      return controls.stop;
    }
  }, [isInView, motionValue, value]);

  return (
    <motion.span ref={ref} className="text-gold font-heading text-4xl md:text-5xl font-bold block mb-2">
      {rounded}
    </motion.span>
  );
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 200, damping: 20 },
  },
};

const AboutStats = () => {
  return (
    <section className="py-24 md:py-32 bg-navy relative overflow-hidden">
      {/* Floating Decorative Elements — white/gold at low opacity */}
      <FloatingCircle size={80} color="rgba(255,255,255,0.06)" className="top-12 left-[8%]" delay={0} />
      <FloatingCircle size={50} color="rgba(198,169,105,0.08)" className="bottom-20 right-[6%]" delay={1} />
      <FloatingRing size={100} color="rgba(255,255,255,0.08)" strokeWidth={1} className="top-[30%] right-[4%]" delay={0.5} />
      <FloatingCross size={20} color="rgba(198,169,105,0.25)" className="top-[20%] left-[15%]" delay={1.8} />
      <FloatingDiamond size={16} color="rgba(255,255,255,0.12)" className="bottom-[25%] left-[6%]" delay={2.2} />
      <DashedCircle size={120} color="rgba(198,169,105,0.12)" className="bottom-8 left-[35%]" delay={0} />
      <FloatingWave width={140} color="rgba(255,255,255,0.1)" className="top-[65%] right-[20%]" delay={0.8} />

      {/* Gradient glow blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gold/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-gold font-bold tracking-widest text-xs uppercase mb-4 block">
            OUR IMPACT
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white">
            Numbers That Speak
          </h2>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                variants={cardVariants}
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.1)' }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-8 text-center cursor-default"
              >
                {/* Gold Icon Circle */}
                <div className="w-16 h-16 rounded-full bg-gold/15 flex items-center justify-center mx-auto mb-6">
                  <Icon className="text-gold" size={28} />
                </div>

                {/* Animated Number */}
                <AnimatedNumber value={stat.value} suffix={stat.suffix} display={stat.display} />

                {/* Label */}
                <span className="text-white/80 text-sm tracking-wide">
                  {stat.label}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutStats;
