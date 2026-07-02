import { motion } from 'framer-motion';
import { FiFlag, FiBookOpen, FiMapPin, FiTrendingUp, FiHeart } from 'react-icons/fi';
import { FloatingCircle, FloatingLeaf, FloatingRing, DotGrid, FloatingCross, FloatingWave, FloatingDiamond } from '../ui/FloatingShapes';

const milestones = [
  {
    year: '2020',
    title: 'Foundation Established',
    description: 'Ajaysinh Foundation was established with a mission to support vulnerable communities.',
    icon: <FiFlag />,
    color: '#0B4F3A',
    colorLight: '#DCE8E2',
  },
  {
    year: '2021',
    title: 'First Initiatives',
    description: 'Launched key programs in education support, food distribution, and elder care.',
    icon: <FiBookOpen />,
    color: '#C6A969',
    colorLight: '#FEF3C7',
  },
  {
    year: '2022',
    title: 'Growing Reach',
    description: 'Expanded to 10+ rural villages and established 3 learning centers.',
    icon: <FiMapPin />,
    color: '#0B4F3A',
    colorLight: '#DCE8E2',
  },
  {
    year: '2023',
    title: 'Expanding Impact',
    description: 'Extended our reach to more villages and urban slums with new projects.',
    icon: <FiTrendingUp />,
    color: '#C6A969',
    colorLight: '#FEF3C7',
  },
  {
    year: 'Today',
    title: 'Stronger Together',
    description: 'Continuing our journey towards a brighter, more equitable future.',
    icon: <FiHeart />,
    color: '#0B4F3A',
    colorLight: '#DCE8E2',
  },
];

const TimelineCard = ({ milestone, index, isLeft }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className={`relative flex items-center w-full ${
        isLeft ? 'lg:justify-end' : 'lg:justify-start'
      }`}
    >
      {/* Card */}
      <motion.div
        whileHover={{ y: -4 }}
        className="bg-white rounded-2xl shadow-soft p-8 relative group cursor-pointer w-full lg:w-[85%] transition-all duration-300 hover:shadow-xl"
      >
        {/* Year badge */}
        <div
          className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold mb-4"
          style={{ backgroundColor: milestone.colorLight, color: milestone.color }}
        >
          {milestone.year}
        </div>

        <h3 className="text-xl font-heading font-bold text-navy mb-2 group-hover:text-primary transition-colors">
          {milestone.title}
        </h3>
        <p className="text-navy/60 text-sm leading-relaxed">
          {milestone.description}
        </p>
      </motion.div>
    </motion.div>
  );
};

const ImpactTimeline = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Floating Decorative Elements */}
      <FloatingCircle size={90} color="#DCE8E2" className="top-16 left-[3%] opacity-30" delay={0} />
      <FloatingLeaf size={50} color="#0B4F3A" className="top-[25%] right-[4%]" delay={1} />
      <FloatingRing size={70} color="#C6A969" className="bottom-24 left-[5%]" delay={1.5} />
      <DotGrid className="absolute top-20 right-[5%]" cols={4} rows={4} color="#C6A969" />
      <FloatingCross size={16} color="#0B4F3A" className="bottom-[35%] right-[3%]" delay={2} />
      <FloatingWave width={100} color="#EADBC8" className="bottom-[15%] left-[6%]" delay={0.5} />
      <FloatingDiamond size={14} color="#C6A969" className="top-[50%] left-[2%]" delay={1.2} />

      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="text-primary font-bold tracking-widest text-xs uppercase mb-4 block">
            OUR JOURNEY
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-navy mb-6">
            Milestones That <span className="text-gold">Matter</span>
          </h2>
          <p className="text-navy/70 text-lg">
            A look at the defining moments that have shaped our path towards
            creating lasting, meaningful impact.
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Vertical center line — gold */}
          <div className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-gold/60 via-gold/30 to-gold/10 lg:-translate-x-[1px]" />

          {/* Milestones */}
          <div className="flex flex-col gap-12 lg:gap-16">
            {milestones.map((milestone, index) => {
              const isLeft = index % 2 === 0;
              return (
                <div
                  key={index}
                  className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center"
                >
                  {/* Icon circle — center on large, left on mobile */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.15 + 0.2, type: 'spring', stiffness: 300 }}
                    className="absolute left-6 lg:left-1/2 -translate-x-1/2 z-20"
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-lg shadow-lg border-4 border-white"
                      style={{ backgroundColor: milestone.color, color: '#fff' }}
                    >
                      {milestone.icon}
                    </div>
                  </motion.div>

                  {/* Desktop: alternating left/right. Mobile: all on right of line */}
                  {isLeft ? (
                    <>
                      {/* Left card */}
                      <div className="pl-16 lg:pl-0 lg:pr-8">
                        <TimelineCard milestone={milestone} index={index} isLeft={true} />
                      </div>
                      {/* Empty right space */}
                      <div className="hidden lg:block" />
                    </>
                  ) : (
                    <>
                      {/* Empty left space */}
                      <div className="hidden lg:block" />
                      {/* Right card */}
                      <div className="pl-16 lg:pl-8">
                        <TimelineCard milestone={milestone} index={index} isLeft={false} />
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom terminator dot */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.8 }}
            className="absolute left-6 lg:left-1/2 -translate-x-1/2 -bottom-4"
          >
            <div className="w-4 h-4 rounded-full bg-gold shadow-md border-2 border-white" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ImpactTimeline;
