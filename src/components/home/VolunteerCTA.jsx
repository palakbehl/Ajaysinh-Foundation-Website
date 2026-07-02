import { motion } from 'framer-motion';
import { FiHeart } from 'react-icons/fi';
import { FloatingCircle, FloatingRing, FloatingHeart, FloatingLeaf, DotGrid, DashedCircle } from '../ui/FloatingShapes';
import PremiumButton from '../ui/PremiumButton';

const VolunteerCTA = () => {
  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-[3rem] overflow-hidden bg-primary shadow-2xl"
        >
          {/* Background Elements */}
          <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center mix-blend-overlay"></div>
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-l from-primary/50 to-primary"></div>

          {/* Floating Decorative Elements inside the card */}
          <FloatingCircle size={80} color="#ffffff" className="top-8 left-[10%] opacity-[0.05]" delay={0} />
          <FloatingRing size={100} color="#C6A969" className="bottom-10 right-[15%] opacity-20" delay={1} />
          <FloatingHeart size={30} color="#ffffff" className="top-12 right-[25%] opacity-[0.08]" delay={2} />
          <DotGrid className="absolute top-10 right-[8%] opacity-10" cols={4} rows={4} color="#ffffff" />
          <DashedCircle size={150} color="#ffffff" className="bottom-0 left-[20%] opacity-[0.06]" delay={0} />
          <FloatingLeaf size={50} color="#ffffff" className="top-[40%] left-[5%] opacity-[0.08]" delay={1.5} />
          
          <div className="relative z-10 p-12 md:p-20 text-center lg:text-left lg:flex items-center justify-between gap-12">
            <div className="max-w-2xl mb-10 lg:mb-0">
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6 leading-tight">
                Become a Volunteer.<br/>
                <span className="text-gold">Be the Change.</span>
              </h2>
              <p className="text-white/80 text-lg md:text-xl mb-8 leading-relaxed">
                Join our community of passionate changemakers. Your time and skills can help us reach more lives and create a lasting impact.
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <PremiumButton to="/volunteer" variant="gold" icon={<FiHeart />}>
                  Join as Volunteer
                </PremiumButton>
                <PremiumButton to="/contact" variant="outline-white">
                  Contact Us
                </PremiumButton>
              </div>
            </div>
            
            <div className="hidden lg:block">
              <motion.div 
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="w-48 h-48 bg-white/10 rounded-full border-[12px] border-white/20 flex items-center justify-center backdrop-blur-md"
              >
                <FiHeart className="text-6xl text-gold" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VolunteerCTA;
