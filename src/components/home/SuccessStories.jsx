import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiStar } from 'react-icons/fi';
import { FaQuoteLeft } from 'react-icons/fa';
import { FloatingCircle, FloatingRing, FloatingHeart, DotGrid, FloatingCross, DashedCircle } from '../ui/FloatingShapes';

const stories = [
  {
    id: 1,
    name: 'Rahul Kumar',
    role: 'Beneficiary, Education Program',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    quote: 'The scholarship from Ajaysinh Foundation changed my life. I am now pursuing my engineering degree and hope to help others in my village someday.',
    location: 'Bihar, India',
    rating: 5,
  },
  {
    id: 2,
    name: 'Priya Sharma',
    role: 'Regular Donor',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    quote: 'Seeing the transparent impact of my monthly donations gives me immense peace. The foundation truly bridges the gap between those who want to help and those who need it.',
    location: 'Mumbai, India',
    rating: 5,
  },
  {
    id: 3,
    name: 'Sunita Devi',
    role: 'Women Empowerment Program',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    quote: 'Learning tailoring through their skill center made me financially independent. I can now provide for my children\'s education with dignity.',
    location: 'Rajasthan, India',
    rating: 5,
  }
];

const SuccessStories = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % stories.length);
  const prev = () => setCurrent((c) => (c === 0 ? stories.length - 1 : c - 1));

  const activeStory = stories[current];

  return (
    <section className="py-24 bg-navy text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl"></div>
      
      {/* Floating Decorative Elements */}
      <FloatingCircle size={100} color="#ffffff" className="top-16 left-[5%] opacity-[0.03]" delay={0} />
      <FloatingRing size={80} color="#C6A969" className="bottom-20 right-[8%] opacity-20" delay={1} />
      <FloatingHeart size={28} color="#C6A969" className="top-[20%] right-[12%] opacity-20" delay={1.5} />
      <DotGrid className="absolute top-20 left-[8%] opacity-10" cols={5} rows={3} color="#ffffff" />
      <FloatingCross size={16} color="#C6A969" className="bottom-[30%] left-[4%] opacity-20" delay={2} />
      <DashedCircle size={120} color="#C6A969" className="top-[30%] right-[3%] opacity-10" delay={0} />

      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-gold font-bold tracking-widest text-xs uppercase mb-4 block">Success Stories</span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            Voices of <span className="text-gold">Impact</span>
          </h2>
        </div>

        {/* Magazine-Style Layout */}
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8 items-center">
            
            {/* Left: Large Profile Image */}
            <div className="lg:col-span-2 relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  {/* Decorative frame behind image */}
                  <div className="absolute -inset-3 rounded-[2.5rem] border-2 border-gold/20 -z-10"></div>
                  <div className="absolute -inset-6 rounded-[3rem] border border-white/5 -z-20"></div>
                  
                  <div className="aspect-[3/4] rounded-[2rem] overflow-hidden relative">
                    <img
                      src={activeStory.image}
                      alt={activeStory.name}
                      className="w-full h-full object-cover"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent"></div>
                    
                    {/* Name badge at bottom of image */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h4 className="text-2xl font-heading font-bold">{activeStory.name}</h4>
                      <p className="text-gold text-sm font-medium">{activeStory.role}</p>
                      <p className="text-white/50 text-xs mt-1">{activeStory.location}</p>
                    </div>
                  </div>
                  
                  {/* Floating quote icon */}
                  <motion.div 
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute -top-4 -right-4 w-14 h-14 bg-gold rounded-2xl flex items-center justify-center shadow-lg z-10"
                  >
                    <FaQuoteLeft className="text-xl text-navy" />
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right: Quote & Controls */}
            <div className="lg:col-span-3 flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Rating stars */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(activeStory.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 + 0.3 }}
                      >
                        <FiStar className="text-gold fill-gold text-lg" />
                      </motion.div>
                    ))}
                  </div>

                  {/* Large quote */}
                  <blockquote className="text-2xl md:text-3xl lg:text-4xl font-heading leading-snug mb-10 text-white/90">
                    "{activeStory.quote}"
                  </blockquote>
                  
                  {/* Divider */}
                  <div className="w-16 h-0.5 bg-gold/40 mb-8"></div>
                </motion.div>
              </AnimatePresence>

              {/* Controls & Thumbnails */}
              <div className="flex items-center justify-between">
                {/* Thumbnail selector */}
                <div className="flex items-center gap-3">
                  {stories.map((story, i) => (
                    <motion.button
                      key={story.id}
                      onClick={() => setCurrent(i)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className={`relative rounded-full overflow-hidden transition-all duration-300 ${
                        i === current 
                          ? 'w-14 h-14 ring-2 ring-gold ring-offset-2 ring-offset-navy' 
                          : 'w-11 h-11 opacity-50 hover:opacity-80 grayscale hover:grayscale-0'
                      }`}
                    >
                      <img src={story.image} alt={story.name} className="w-full h-full object-cover" />
                    </motion.button>
                  ))}
                </div>

                {/* Arrow controls */}
                <div className="flex gap-3">
                  <motion.button 
                    onClick={prev}
                    whileHover={{ scale: 1.15, backgroundColor: 'rgba(198, 169, 105, 1)', borderColor: 'rgba(198, 169, 105, 1)', color: '#0D1B2A' }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center transition-colors text-white"
                  >
                    <FiChevronLeft className="text-xl" />
                  </motion.button>
                  <motion.button 
                    onClick={next}
                    whileHover={{ scale: 1.15, backgroundColor: 'rgba(198, 169, 105, 1)', borderColor: 'rgba(198, 169, 105, 1)', color: '#0D1B2A' }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center transition-colors text-white"
                  >
                    <FiChevronRight className="text-xl" />
                  </motion.button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
