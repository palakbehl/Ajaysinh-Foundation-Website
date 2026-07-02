import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiPlayCircle, FiHeart } from 'react-icons/fi';
import { DotGrid, FloatingCircle, FloatingRing, FloatingLeaf, FloatingHeart, DashedCircle, FloatingCross, FloatingWave, FloatingDiamond } from '../ui/FloatingShapes';
import PremiumButton from '../ui/PremiumButton';

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 pb-28 bg-cream">
      {/* Decorative Background Shapes */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-sage/30 rounded-bl-[150px] -z-10 transform translate-x-10 -translate-y-10"></div>
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-gold/10 rounded-full blur-3xl -z-10"></div>

      {/* Floating Decorative Elements */}
      <FloatingCircle size={100} color="#DCE8E2" className="top-32 left-[8%] opacity-40" delay={0} />
      <FloatingRing size={70} color="#C6A969" className="top-20 right-[15%]" delay={1} />
      <FloatingLeaf size={50} color="#0B4F3A" className="bottom-40 left-[5%]" delay={0.5} />
      <FloatingHeart size={28} color="#C6A969" className="top-44 right-[40%]" delay={2} />
      <DotGrid className="absolute top-28 right-[8%]" cols={4} rows={4} color="#0B4F3A" />
      <DashedCircle size={120} color="#0D1B2A" className="bottom-20 right-[12%]" delay={0} />
      <FloatingCross size={18} color="#C6A969" className="top-[60%] left-[3%]" delay={1.5} />
      <FloatingDiamond size={12} color="#0B4F3A" className="top-[30%] left-[45%]" delay={2.5} />
      <FloatingWave width={100} color="#C6A969" className="bottom-36 right-[5%]" delay={1} />
      <FloatingCross size={14} color="#0B4F3A" className="bottom-52 left-[48%]" delay={3} />

      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="w-12 h-0.5 bg-gold"></span>
              <span className="text-gold font-semibold uppercase tracking-wider text-sm">Together, We Can</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-navy leading-[1.1] mb-6 text-balance">
              Empowering Lives.<br/>
              <span className="text-gold">Inspiring</span> Futures.
            </h1>
            <p className="text-lg md:text-xl text-navy/70 mb-8 leading-relaxed max-w-xl text-balance">
              Ajaysinh Foundation is committed to creating a better tomorrow for children, elderly, and communities through care, education, and support.
            </p>
            
            <div className="flex flex-wrap items-center gap-4">
              <PremiumButton to="/campaigns" variant="primary" icon={<FiArrowRight />}>
                Explore Our Work
              </PremiumButton>
              
            </div>
          </motion.div>

          {/* Image & Floating Card */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative pb-4"
          >
            {/* Extra floating shapes around image */}
            <FloatingRing size={50} color="#C6A969" className="-top-6 -right-4" delay={0.5} />
            <FloatingLeaf size={35} color="#0B4F3A" className="-bottom-2 right-10" delay={1.5} />

            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl aspect-[4/3] group">
              <div className="absolute inset-0 bg-navy/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Children smiling" 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Floating Stats Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="absolute bottom-6 left-6 bg-white p-5 rounded-2xl shadow-float glass-panel hidden md:flex items-center gap-4 z-20"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-primary text-2xl">
                <FiHeart />
              </div>
              <div>
                <p className="text-sm text-navy/60 font-medium">Total Donations</p>
                <p className="text-2xl font-heading font-bold text-navy">$2.5M+</p>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
