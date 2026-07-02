import { motion } from 'framer-motion';
import { FiHeart, FiEye, FiUsers, FiZap, FiRefreshCw, FiHome, FiArrowUpRight } from 'react-icons/fi';
import { FloatingCircle, FloatingLeaf, FloatingCross, DotGrid, FloatingRing, FloatingWave } from '../ui/FloatingShapes';

const values = [
  {
    icon: <FiHeart />,
    title: 'Compassion',
    description: 'We lead with empathy, treating every individual with kindness and understanding.',
    accent: '#EF4444',
    accentLight: '#FEE2E2',
  },
  {
    icon: <FiEye />,
    title: 'Transparency',
    description: 'Every donation, every initiative — fully accountable and openly reported.',
    accent: '#3B82F6',
    accentLight: '#DBEAFE',
  },
  {
    icon: <FiUsers />,
    title: 'Equality',
    description: 'We believe every person deserves equal access to opportunities and resources.',
    accent: '#8B5CF6',
    accentLight: '#EDE9FE',
  },
  {
    icon: <FiZap />,
    title: 'Empowerment',
    description: 'We provide tools and skills for communities to become self-sufficient.',
    accent: '#F59E0B',
    accentLight: '#FEF3C7',
  },
  {
    icon: <FiRefreshCw />,
    title: 'Sustainability',
    description: 'Building programs that create lasting change, not temporary solutions.',
    accent: '#10B981',
    accentLight: '#D1FAE5',
  },
  {
    icon: <FiHome />,
    title: 'Community',
    description: 'Working together, hand in hand, to build stronger neighborhoods.',
    accent: '#EC4899',
    accentLight: '#FCE7F3',
  },
];

const ValueCard = ({ value, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="focus-card rounded-[2rem] bg-white shadow-soft hover:shadow-xl transition-all duration-500 group cursor-pointer relative overflow-hidden"
      style={{ '--card-accent': value.accent }}
    >
      <div className="p-8 md:p-10 h-full flex flex-col relative">
        {/* Large watermark icon */}
        <div
          className="absolute -bottom-6 -right-6 pointer-events-none"
          style={{ color: value.accent, opacity: 0.04, fontSize: '140px', lineHeight: 1 }}
        >
          {value.icon}
        </div>

        {/* Icon box */}
        <motion.div
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-[-6deg] group-hover:shadow-lg relative z-10"
          style={{ backgroundColor: value.accentLight, color: value.accent }}
        >
          {value.icon}
        </motion.div>

        {/* Content */}
        <h3 className="text-xl font-heading font-bold text-navy mb-3 group-hover:text-primary transition-colors relative z-10">
          {value.title}
        </h3>
        <p className="text-navy/60 text-sm leading-relaxed flex-1 relative z-10">
          {value.description}
        </p>

        {/* Hover-reveal arrow */}
        <div className="mt-6 relative z-10">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300"
            style={{ backgroundColor: value.accentLight, color: value.accent }}
          >
            <FiArrowUpRight className="text-lg" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const CoreValues = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Floating Decorative Elements */}
      <FloatingCircle size={80} color="#DCE8E2" className="top-12 left-[4%] opacity-30" delay={0} />
      <FloatingLeaf size={50} color="#0B4F3A" className="top-[20%] right-[5%]" delay={1} />
      <FloatingCross size={18} color="#C6A969" className="bottom-24 left-[6%]" delay={2} />
      <DotGrid className="absolute bottom-20 right-[5%]" cols={5} rows={4} color="#0B4F3A" />
      <FloatingRing size={70} color="#C6A969" className="top-[60%] left-[3%]" delay={1.5} />
      <FloatingWave width={110} color="#DCE8E2" className="top-[40%] right-[2%]" delay={0.5} />

      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-bold tracking-widest text-xs uppercase mb-4 block">
            WHAT DRIVES US
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-navy mb-6">
            Our Core <span className="text-gold">Values</span>
          </h2>
          <p className="text-navy/70 text-lg">
            These principles guide everything we do — from the smallest act of kindness
            to the largest community initiative.
          </p>
        </motion.div>

        {/* 3x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {values.map((value, index) => (
            <ValueCard key={index} value={value} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreValues;
