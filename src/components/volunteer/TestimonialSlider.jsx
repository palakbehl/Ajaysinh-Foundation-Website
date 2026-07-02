import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiHeart } from 'react-icons/fi';

const TestimonialSlider = ({ testimonials = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  if (!testimonials || testimonials.length === 0) return null;

  const current = testimonials[currentIndex];

  return (
    <div className="relative max-w-4xl mx-auto px-4">
      {/* Slider Box */}
      <div className="bg-white rounded-[2.5rem] shadow-soft border border-navy/5 p-8 md:p-14 relative overflow-hidden min-h-[380px] md:min-h-[300px] flex flex-col justify-between">
        {/* Quote overlay */}
        <span className="absolute top-4 right-10 text-[10rem] font-heading text-gold/10 select-none leading-none pointer-events-none">
          “
        </span>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="grid md:grid-cols-12 gap-8 items-center"
          >
            {/* Avatar Column */}
            <div className="md:col-span-4 flex justify-center">
              <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden border-4 border-cream shadow-soft">
                <img
                  src={current.image}
                  alt={current.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute -bottom-2 -right-2 bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center border-2 border-white shadow-soft">
                  <FiHeart className="text-sm" />
                </div>
              </div>
            </div>

            {/* Testimonial Quote Column */}
            <div className="md:col-span-8">
              <div className="mb-4 flex items-center gap-2">
                <span className="bg-primary/10 text-primary text-[10px] uppercase tracking-widest px-3 py-1 rounded-full font-bold">
                  {current.role}
                </span>
                <span className="text-navy/40 text-xs font-semibold">
                  {current.campaign}
                </span>
              </div>
              <p className="font-heading text-navy italic text-lg md:text-xl leading-relaxed mb-6">
                "{current.quote}"
              </p>
              <div>
                <h4 className="font-heading font-bold text-navy text-lg md:text-xl">
                  {current.name}
                </h4>
                <p className="text-navy/40 text-xs uppercase tracking-wider mt-0.5">
                  {current.city}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Footer controls & pagination dots */}
        <div className="mt-8 pt-6 border-t border-gray-150 flex items-center justify-between">
          {/* Pagination Indicators */}
          <div className="flex gap-1.5">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? 'w-6 bg-primary' : 'w-2 bg-navy/15'
                }`}
              />
            ))}
          </div>

          {/* Nav arrows */}
          <div className="flex gap-2">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full border border-navy/10 flex items-center justify-center text-navy/70 hover:bg-primary hover:text-white hover:border-primary transition-all duration-350"
            >
              <FiChevronLeft className="text-lg" />
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full border border-navy/10 flex items-center justify-center text-navy/70 hover:bg-primary hover:text-white hover:border-primary transition-all duration-350"
            >
              <FiChevronRight className="text-lg" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSlider;
