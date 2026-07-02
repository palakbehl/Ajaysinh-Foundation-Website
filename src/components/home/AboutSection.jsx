import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import { FloatingCircle, FloatingLeaf, FloatingRing, DotGrid, FloatingCross, FloatingDiamond, DashedCircle } from '../ui/FloatingShapes';
import PremiumButton from '../ui/PremiumButton';

const AboutSection = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-cream rounded-full blur-3xl -z-10"></div>
      
      {/* Floating Decorative Elements */}
      <FloatingCircle size={60} color="#EADBC8" className="top-16 right-[8%] opacity-40" delay={0.5} />
      <FloatingLeaf size={45} color="#0B4F3A" className="top-[20%] right-[3%]" delay={1} />
      <DotGrid className="absolute bottom-20 right-[5%]" cols={5} rows={5} color="#C6A969" />
      <FloatingRing size={80} color="#DCE8E2" className="bottom-32 left-[2%]" delay={2} />
      <FloatingCross size={16} color="#C6A969" className="top-[40%] right-[10%]" delay={0.8} />
      <FloatingDiamond size={14} color="#0B4F3A" className="bottom-[15%] right-[15%]" delay={1.8} />
      <DashedCircle size={90} color="#DCE8E2" className="top-10 left-[45%]" delay={0} />

      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Layered Images */}
          <div className="relative">
            <div className="absolute top-0 right-10 w-2/3 h-full bg-sage/20 rounded-[3rem] -z-10 transform translate-x-4 -translate-y-4"></div>
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 gap-4"
            >
              <img 
                src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                alt="Community work" 
                className="rounded-[2rem] shadow-lg w-full h-64 object-cover mt-12"
              />
              <div className="space-y-4">
                <img 
                  src="https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                  alt="Education" 
                  className="rounded-[2rem] shadow-lg w-full h-48 object-cover"
                />
                <div className="bg-primary p-6 rounded-[2rem] shadow-lg text-white">
                  <h4 className="font-heading text-2xl mb-2">15+ Years</h4>
                  <p className="text-sm text-white/80">Of making a difference in communities.</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Content */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary font-bold tracking-widest text-xs uppercase mb-4 block">Who We Are</span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-navy mb-6">
              Creating Opportunities.<br/>
              <span className="text-gold">Changing Lives.</span>
            </h2>
            <p className="text-navy/70 leading-relaxed mb-8 text-lg">
              We are a team of passionate individuals working selflessly to uplift the underprivileged. Through innovative programs and community partnerships, we aim to bring lasting change and build a more equitable society.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 mb-10">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-sage rounded-full flex items-center justify-center text-primary text-xl mb-4">
                  <FiCheckCircle />
                </div>
                <h4 className="font-heading font-bold text-navy text-xl">Our Mission</h4>
                <p className="text-sm text-navy/70 leading-relaxed">To empower individuals and communities through essential support and opportunities.</p>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 bg-beige rounded-full flex items-center justify-center text-gold text-xl mb-4">
                  <FiCheckCircle />
                </div>
                <h4 className="font-heading font-bold text-navy text-xl">Our Vision</h4>
                <p className="text-sm text-navy/70 leading-relaxed">A society where everyone lives with dignity, equality, and hope.</p>
              </div>
            </div>

            <PremiumButton to="/about" variant="navy" icon={<FiArrowRight />}>
              Learn More About Us
            </PremiumButton>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
