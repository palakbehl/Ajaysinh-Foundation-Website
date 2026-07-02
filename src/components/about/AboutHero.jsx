import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiChevronRight, FiArrowRight, FiHeart } from 'react-icons/fi';
import { DotGrid, FloatingCircle, FloatingRing, FloatingCross, FloatingDiamond, FloatingLeaf } from '../ui/FloatingShapes';
import PremiumButton from '../ui/PremiumButton';

const AboutHero = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-cream">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[50%] h-full bg-sage/20 rounded-bl-[200px] -z-0" />
      <div className="absolute bottom-0 left-[20%] w-96 h-96 bg-primary/5 rounded-full blur-[120px] -z-0" />
      <div className="absolute top-[10%] right-[10%] w-64 h-64 bg-gold/8 rounded-full blur-[100px] -z-0" />

      {/* Floating Decorative Elements */}
      <DotGrid className="absolute top-36 left-[4%]" cols={4} rows={4} color="#0B4F3A" />
      <FloatingRing size={70} color="#C6A969" className="top-32 right-[12%]" delay={0} />
      <FloatingCircle size={50} color="#DCE8E2" className="bottom-20 left-[6%] opacity-40" delay={1} />
      <FloatingLeaf size={40} color="#0B4F3A" className="bottom-28 right-[8%]" delay={1.5} />
      <FloatingCross size={14} color="#C6A969" className="top-[50%] left-[12%]" delay={2} />
      <FloatingDiamond size={12} color="#0B4F3A" className="top-[35%] right-[25%]" delay={1} />
      <DotGrid className="absolute bottom-16 right-[5%]" cols={3} rows={3} color="#C6A969" />
      <FloatingRing size={40} color="#DCE8E2" className="bottom-12 right-[30%]" delay={2} />

      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 text-sm mb-10"
        >
          <Link to="/" className="text-navy/50 hover:text-primary transition-colors duration-300">
            Home
          </Link>
          <FiChevronRight className="text-navy/30" />
          <span className="text-primary font-semibold">About Us</span>
        </motion.nav>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="max-w-xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="w-12 h-0.5 bg-primary" />
              <span className="text-primary font-semibold uppercase tracking-wider text-sm">
                About Ajaysinh Foundation
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-heading font-bold text-navy leading-[1.1] mb-6">
              Driven by Compassion.{' '}
              <br className="hidden sm:block" />
              Committed to{' '}
              <span className="text-gold relative">
                Change.
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                  <path d="M2 8C40 2, 80 2, 120 6C150 9, 180 4, 198 6" stroke="#C6A969" strokeWidth="3" strokeLinecap="round" opacity="0.4"/>
                </svg>
              </span>
            </h1>

            <p className="text-lg text-navy/60 mb-10 leading-relaxed">
              Ajaysinh Foundation is a non-profit organization working tirelessly to uplift the underprivileged and create a world where everyone has access to basic needs, education, and a life of dignity.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <PremiumButton to="/campaigns" variant="primary" icon={<FiArrowRight />}>
                Explore Our Work
              </PremiumButton>
              <PremiumButton to="/contact" variant="outline" icon={<FiHeart />}>
                Get Involved
              </PremiumButton>
            </div>
          </motion.div>

          {/* Image Mosaic */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="grid grid-cols-12 grid-rows-6 gap-3 h-[420px] md:h-[480px]">
              {/* Main large image */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="col-span-7 row-span-6 rounded-[2rem] overflow-hidden shadow-xl"
              >
                <img
                  src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80"
                  alt="Children learning together"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Top right image */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="col-span-5 row-span-3 rounded-[1.5rem] overflow-hidden shadow-lg"
              >
                <img
                  src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=400&q=80"
                  alt="Education program"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Bottom right - stat card */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="col-span-5 row-span-3 bg-primary rounded-[1.5rem] p-5 flex flex-col justify-center shadow-lg"
              >
                <p className="text-gold font-heading text-3xl md:text-4xl font-bold mb-1">5,000+</p>
                <p className="text-white/80 text-sm">Lives impacted through our initiatives across India</p>
                <div className="w-12 h-0.5 bg-gold/40 mt-3" />
              </motion.div>
            </div>

            {/* Floating founded badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.5, type: 'spring' }}
              className="absolute -bottom-4 left-4 md:-bottom-5 md:left-8 z-20"
            >
              <div className="bg-white px-5 py-3 rounded-2xl shadow-float flex items-center gap-3 border border-gray-100">
                <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center">
                  <FiHeart className="text-gold" />
                </div>
                <div>
                  <p className="text-xs text-navy/40 font-medium uppercase tracking-wider">Est.</p>
                  <p className="text-sm font-heading font-bold text-navy">Founded in 2020</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
