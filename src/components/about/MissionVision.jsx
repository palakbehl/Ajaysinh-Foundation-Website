import { motion } from 'framer-motion';
import { FiCrosshair, FiEye, FiStar } from 'react-icons/fi';
import { FloatingCircle, FloatingRing, FloatingLeaf, DotGrid, FloatingCross, DashedCircle, FloatingDiamond, FloatingWave } from '../ui/FloatingShapes';

const cardData = [
  {
    icon: FiCrosshair,
    title: 'Our Mission',
    description:
      'To empower underprivileged communities by providing access to quality education, healthcare, and sustainable livelihood opportunities. We work at the grassroots level, ensuring that every individual — regardless of their background — has the tools and support to live a life of dignity, self-reliance, and fulfillment.',
    accent: 'primary',
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
  },
  {
    icon: FiEye,
    title: 'Our Vision',
    description:
      'To build a just and equitable society where every person has access to their fundamental rights — education, health, and livelihood. We envision a world where poverty is no longer a barrier to potential, where communities thrive through mutual support, and where every child grows up with hope and opportunity.',
    accent: 'gold',
    iconBg: 'bg-gold/10',
    iconColor: 'text-gold',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
};

const MissionVision = () => {
  return (
    <section className="relative py-24 md:py-32 bg-cream overflow-hidden">
      {/* Floating Decorative Elements */}
      <FloatingCircle size={100} color="#DCE8E2" className="top-16 left-[4%] opacity-40" delay={0} />
      <FloatingRing size={80} color="#C6A969" className="top-24 right-[6%]" delay={1} />
      <FloatingLeaf size={50} color="#0B4F3A" className="bottom-28 left-[6%]" delay={0.5} />
      <DotGrid className="absolute top-20 right-[4%]" cols={4} rows={4} color="#0B4F3A" />
      <DashedCircle size={140} color="#0D1B2A" className="bottom-10 right-[15%]" delay={0} />
      <FloatingCross size={18} color="#C6A969" className="top-[55%] left-[3%]" delay={2} />
      <FloatingDiamond size={14} color="#0B4F3A" className="top-[35%] right-[50%]" delay={1.5} />
      <FloatingWave width={110} color="#C6A969" className="bottom-20 left-[10%]" delay={1} />
      <FloatingCircle size={50} color="#C6A969" className="bottom-40 right-[4%] opacity-20" delay={2.5} />

      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="w-12 h-0.5 bg-gold" />
            <span className="text-gold font-semibold uppercase tracking-wider text-sm">
              Our Purpose
            </span>
            <span className="w-12 h-0.5 bg-gold" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-navy">
            Mission & Vision
          </h2>
        </motion.div>

        {/* Mission & Vision Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid md:grid-cols-2 gap-8 lg:gap-10 mb-16"
        >
          {cardData.map((card, index) => {
            const Icon = card.icon;
            const accentBorder =
              card.accent === 'primary' ? 'hover:border-primary/30' : 'hover:border-gold/30';
            const accentShadow =
              card.accent === 'primary'
                ? 'hover:shadow-[0_20px_60px_-15px_rgba(11,79,58,0.15)]'
                : 'hover:shadow-[0_20px_60px_-15px_rgba(198,169,105,0.15)]';

            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className={`
                  relative p-8 md:p-10 rounded-[2rem]
                  bg-white/60 backdrop-blur-xl
                  border border-white/40
                  shadow-soft transition-all duration-500
                  ${accentBorder} ${accentShadow}
                  group
                `}
              >
                {/* Glass highlight line */}
                <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />

                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 5, scale: 1.05 }}
                  className={`w-16 h-16 ${card.iconBg} rounded-2xl flex items-center justify-center mb-6`}
                >
                  <Icon className={`text-2xl ${card.iconColor}`} />
                </motion.div>

                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-heading font-bold text-navy mb-4">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-navy/65 leading-relaxed text-base md:text-lg">
                  {card.description}
                </p>

                {/* Bottom accent line */}
                <div
                  className={`absolute bottom-0 left-10 right-10 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                    card.accent === 'primary' ? 'bg-primary' : 'bg-gold'
                  }`}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Values Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative"
        >
          <div className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-[2rem] p-8 md:p-10 shadow-soft">
            <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
              {/* Icon */}
              <div className="w-14 h-14 bg-gold/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                <FiStar className="text-2xl text-gold" />
              </div>

              {/* Content */}
              <div className="flex-1">
                <h4 className="text-xl md:text-2xl font-heading font-bold text-navy mb-2">
                  Our Values
                </h4>
                <p className="text-navy/65 text-base md:text-lg leading-relaxed">
                  <span className="text-primary font-semibold">Compassion</span>,{' '}
                  <span className="text-primary font-semibold">Integrity</span>,{' '}
                  <span className="text-primary font-semibold">Empowerment</span>, and{' '}
                  <span className="text-primary font-semibold">Transparency</span>{' '}
                  guide every step we take.
                </p>
              </div>

              {/* Decorative value pills */}
              <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
                {['Compassion', 'Integrity', 'Empowerment', 'Transparency'].map((value, i) => (
                  <motion.span
                    key={value}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="px-4 py-2 bg-primary/5 text-primary text-sm font-medium rounded-full border border-primary/10"
                  >
                    {value}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MissionVision;
