import { motion } from 'framer-motion';
import { FiBookOpen, FiHeart, FiUsers, FiHome, FiSun, FiSmile, FiArrowUpRight } from 'react-icons/fi';
import { FloatingCircle, FloatingLeaf, FloatingHeart, DotGrid, FloatingCross, FloatingWave } from '../ui/FloatingShapes';

const areas = [
  {
    icon: <FiBookOpen />,
    title: 'Quality Education',
    description: 'Providing access to quality education for underprivileged children to build a brighter future.',
    accent: '#3B82F6',
    accentLight: '#DBEAFE',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    stat: '1,200+',
    statLabel: 'Students Enrolled',
    span: 'lg:col-span-2 lg:row-span-1',
  },
  {
    icon: <FiHeart />,
    title: 'Healthcare Support',
    description: 'Accessible and affordable healthcare services for the most vulnerable communities around us.',
    accent: '#EF4444',
    accentLight: '#FEE2E2',
    image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    stat: '50+',
    statLabel: 'Medical Camps',
    span: 'lg:col-span-1 lg:row-span-2',
  },
  {
    icon: <FiSun />,
    title: 'Women Empowerment',
    description: 'Empowering women through skills, livelihood, and education programs.',
    accent: '#EC4899',
    accentLight: '#FCE7F3',
    image: null,
    stat: '800+',
    statLabel: 'Women Trained',
    span: 'lg:col-span-1 lg:row-span-1',
  },
  {
    icon: <FiHome />,
    title: 'Elder Care',
    description: 'Safe shelter, nutrition, and medical care for our senior citizens.',
    accent: '#F59E0B',
    accentLight: '#FEF3C7',
    image: null,
    stat: '100+',
    statLabel: 'Elders Sheltered',
    span: 'lg:col-span-1 lg:row-span-1',
  },
  {
    icon: <FiUsers />,
    title: 'Community Support',
    description: 'Building resilient communities through disaster relief and sustainable development.',
    accent: '#10B981',
    accentLight: '#D1FAE5',
    image: null,
    stat: '25+',
    statLabel: 'Communities',
    span: 'lg:col-span-1 lg:row-span-1',
  },
  {
    icon: <FiSmile />,
    title: 'Disability Inclusion',
    description: 'Creating equal opportunities and inclusive environments for persons with disabilities.',
    accent: '#8B5CF6',
    accentLight: '#EDE9FE',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    stat: '300+',
    statLabel: 'Lives Touched',
    span: 'lg:col-span-2 lg:row-span-1',
  }
];

/* Corner bracket decorations rendered as JSX */
const CornerBrackets = () => (
  <>
    <span className="corner corner-tl" />
    <span className="corner corner-tr" />
    <span className="corner corner-bl" />
    <span className="corner corner-br" />
  </>
);

const FocusAreaCard = ({ area, index }) => {
  const isWide = area.span.includes('col-span-2');
  const isTall = area.span.includes('row-span-2');

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className={`focus-card corner-brackets rounded-[2rem] overflow-visible shadow-soft hover:shadow-xl transition-all duration-500 group cursor-pointer ${area.span}`}
      style={{ '--card-accent': area.accent }}
    >
      {/* Corner brackets */}
      <CornerBrackets />
      
      {/* Side accent strip */}
      <div className="accent-strip" style={{ background: area.accent }} />

      {(isWide && area.image) ? (
        /* ---- WIDE CARD: horizontal split ---- */
        <div className="focus-card-inner flex flex-col md:flex-row h-full rounded-[2rem] overflow-hidden" style={{ '--card-accent': area.accent }}>
          <div className="flex-1 p-8 md:p-10 flex flex-col justify-center relative z-10">
            {/* Watermark icon */}
            <div className="absolute -bottom-6 -right-6 opacity-[0.04] pointer-events-none" style={{ color: area.accent, fontSize: '140px', lineHeight: 1 }}>
              {area.icon}
            </div>
            
            <motion.div 
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5 transition-all duration-500 group-hover:scale-110 group-hover:rotate-[-6deg] group-hover:shadow-lg relative z-10"
              style={{ backgroundColor: area.accentLight, color: area.accent }}
            >
              {area.icon}
            </motion.div>
            <h3 className="text-2xl font-heading font-bold text-navy mb-3 group-hover:text-primary transition-colors relative z-10">{area.title}</h3>
            <p className="text-navy/60 leading-relaxed mb-5 relative z-10">{area.description}</p>
            
            {/* Stat pill */}
            <div className="flex items-center gap-3 relative z-10">
              <div 
                className="px-4 py-1.5 rounded-full text-sm font-bold transition-shadow duration-300 group-hover:shadow-md" 
                style={{ backgroundColor: area.accentLight, color: area.accent }}
              >
                {area.stat}
              </div>
              <span className="text-sm text-navy/50 font-medium">{area.statLabel}</span>
            </div>
          </div>
          
          <div className="md:w-[45%] h-48 md:h-auto relative overflow-hidden">
            <img src={area.image} alt={area.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-r from-white/50 to-transparent"></div>
            
            {/* Hover-reveal arrow badge */}
            <motion.div 
              className="absolute bottom-5 right-5 w-12 h-12 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-3 group-hover:translate-y-0 transition-all duration-400"
              style={{ color: area.accent }}
            >
              <FiArrowUpRight className="text-xl" />
            </motion.div>
          </div>
        </div>
      ) : isTall ? (
        /* ---- TALL CARD: vertical with large image ---- */
        <div className="focus-card-inner h-full flex flex-col rounded-[2rem] overflow-hidden" style={{ '--card-accent': area.accent }}>
          <div className="h-48 lg:h-56 relative overflow-hidden">
            <img src={area.image} alt={area.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-transparent"></div>
            
            {/* Icon badge */}
            <div 
              className="absolute top-4 left-4 w-12 h-12 rounded-xl flex items-center justify-center text-xl backdrop-blur-md bg-white/90 shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-3deg]"
              style={{ color: area.accent }}
            >
              {area.icon}
            </div>
          </div>
          
          <div className="p-8 flex-1 flex flex-col justify-between relative overflow-hidden z-10">
            {/* Watermark */}
            <div className="absolute -bottom-8 -right-8 opacity-[0.03] pointer-events-none" style={{ color: area.accent, fontSize: '160px', lineHeight: 1 }}>
              {area.icon}
            </div>
            
            <div className="relative z-10">
              <h3 className="text-2xl font-heading font-bold text-navy mb-3 group-hover:text-primary transition-colors">{area.title}</h3>
              <p className="text-navy/60 leading-relaxed mb-5">{area.description}</p>
            </div>
            
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-3">
                <div 
                  className="px-4 py-1.5 rounded-full text-sm font-bold transition-shadow duration-300 group-hover:shadow-md"
                  style={{ backgroundColor: area.accentLight, color: area.accent }}
                >
                  {area.stat}
                </div>
                <span className="text-sm text-navy/50 font-medium">{area.statLabel}</span>
              </div>
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300"
                style={{ backgroundColor: area.accentLight, color: area.accent }}
              >
                <FiArrowUpRight />
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ---- COMPACT CARD ---- */
        <div className="focus-card-inner p-8 h-full flex flex-col justify-between rounded-[2rem] overflow-hidden" style={{ '--card-accent': area.accent }}>
          {/* Watermark icon */}
          <div className="absolute -bottom-4 -right-4 opacity-[0.04] pointer-events-none" style={{ color: area.accent, fontSize: '110px', lineHeight: 1 }}>
            {area.icon}
          </div>
          
          <div className="relative z-10">
            <motion.div 
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5 transition-all duration-500 group-hover:scale-110 group-hover:rotate-[-6deg] group-hover:shadow-lg"
              style={{ backgroundColor: area.accentLight, color: area.accent }}
            >
              {area.icon}
            </motion.div>
            <h3 className="text-xl font-heading font-bold text-navy mb-3 group-hover:text-primary transition-colors">{area.title}</h3>
            <p className="text-navy/60 text-sm leading-relaxed mb-5">{area.description}</p>
          </div>
          
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-2">
              <span className="text-xl font-heading font-bold" style={{ color: area.accent }}>{area.stat}</span>
              <span className="text-xs text-navy/50 font-medium">{area.statLabel}</span>
            </div>
            <div 
              className="w-9 h-9 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300"
              style={{ backgroundColor: area.accentLight, color: area.accent }}
            >
              <FiArrowUpRight />
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

const FocusAreas = () => {
  return (
    <section className="py-24 bg-cream relative overflow-hidden">
      {/* Floating Decorative Elements */}
      <FloatingCircle size={90} color="#EADBC8" className="top-10 left-[5%] opacity-30" delay={0} />
      <FloatingLeaf size={55} color="#0B4F3A" className="top-[15%] right-[4%]" delay={1} />
      <FloatingHeart size={24} color="#C6A969" className="bottom-20 left-[8%]" delay={1.5} />
      <DotGrid className="absolute bottom-16 right-[6%]" cols={4} rows={4} color="#0B4F3A" />
      <FloatingCross size={16} color="#C6A969" className="top-[50%] left-[2%]" delay={2} />
      <FloatingWave width={100} color="#DCE8E2" className="top-[70%] right-[3%]" delay={0.5} />

      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-bold tracking-widest text-xs uppercase mb-4 block">Our Focus Areas</span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-navy mb-6">
            Where We Make a <span className="text-gold">Difference</span>
          </h2>
          <p className="text-navy/70 text-lg">
            Our comprehensive approach addresses the root causes of poverty and inequality, focusing on critical areas that drive sustainable community development.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 auto-rows-auto">
          {areas.map((area, index) => (
            <FocusAreaCard key={index} area={area} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FocusAreas;
