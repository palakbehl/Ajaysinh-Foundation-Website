import { motion } from 'framer-motion';
import { FaQuoteLeft } from 'react-icons/fa';
import { FloatingCircle, FloatingRing, FloatingLeaf, DotGrid, FloatingCross, FloatingHeart, DashedCircle } from '../ui/FloatingShapes';

const FounderMessage = () => {
  return (
    <section className="py-24 bg-cream relative overflow-hidden">
      {/* Floating Decorative Elements */}
      <FloatingCircle size={100} color="#EADBC8" className="top-10 right-[6%] opacity-30" delay={0} />
      <FloatingRing size={80} color="#C6A969" className="bottom-16 left-[4%] opacity-20" delay={1} />
      <FloatingLeaf size={45} color="#0B4F3A" className="top-[30%] left-[3%]" delay={1.5} />
      <DotGrid className="absolute top-20 right-[4%]" cols={4} rows={4} color="#0B4F3A" />
      <FloatingCross size={16} color="#C6A969" className="bottom-[40%] right-[5%]" delay={2} />
      <FloatingHeart size={26} color="#C6A969" className="top-[15%] left-[8%]" delay={0.5} />
      <DashedCircle size={130} color="#0B4F3A" className="bottom-[10%] right-[8%] opacity-10" delay={0} />

      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Portrait Image with decorative border */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center"
          >
            {/* Outer decorative ring */}
            <div className="absolute -inset-6 rounded-[3rem] border border-gold/15 pointer-events-none" />
            {/* Inner decorative ring */}
            <div className="absolute -inset-3 rounded-[2.5rem] border-2 border-gold/25 pointer-events-none" />

            {/* Image container */}
            <div className="relative w-full max-w-md aspect-[3/4] rounded-[2rem] overflow-hidden shadow-float">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80"
                alt="Ajaysinh Jadeja — Founder"
                className="w-full h-full object-cover"
              />
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy/30 via-transparent to-transparent" />
            </div>

            {/* Floating quote badge */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-4 -right-2 lg:-right-6 w-14 h-14 bg-gold rounded-2xl flex items-center justify-center shadow-lg z-20"
            >
              <FaQuoteLeft className="text-xl text-navy" />
            </motion.div>
          </motion.div>

          {/* Right: Message Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col"
          >
            {/* Label */}
            <span className="text-primary font-bold tracking-widest text-xs uppercase mb-6 block">
              FROM THE FOUNDER
            </span>

            {/* Large italic quote */}
            <blockquote className="text-2xl md:text-3xl lg:text-[2rem] font-heading italic leading-snug text-navy/90 mb-10">
              "Every child deserves a chance to dream, and every community deserves the
              tools to thrive. This is not just our mission — it is our promise."
            </blockquote>

            {/* Gold divider */}
            <div className="w-16 h-0.5 bg-gold/60 mb-8" />

            {/* Founder info */}
            <div className="mb-2">
              <h4 className="text-xl font-heading font-bold text-navy">
                Ajaysinh Jadeja
              </h4>
              <p className="text-navy/50 text-sm font-medium mt-1">
                Founder & Chairman
              </p>
            </div>

            {/* Small gold horizontal line */}
            <div className="w-10 h-[2px] bg-gold/40 mt-4 mb-6" />

            {/* Signature-style text */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.6 }}
              className="font-heading italic text-gold/70 text-lg tracking-wide"
            >
              Ajaysinh Jadeja
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FounderMessage;
