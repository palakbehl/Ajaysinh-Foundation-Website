import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FiPlay, FiX, FiClock } from 'react-icons/fi';

const VideoCard = ({ video }) => {
  const { title, desc, thumbnail, duration, category, videoUrl } = video;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        whileHover={{ y: -6 }}
        onClick={() => setIsOpen(true)}
        className="bg-white rounded-[2rem] overflow-hidden shadow-soft hover:shadow-xl transition-all duration-500 flex flex-col cursor-pointer group"
      >
        {/* Visual Frame */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          
          {/* Translucent cinematic overlay */}
          <div className="absolute inset-0 bg-navy/40 group-hover:bg-navy/55 transition-colors duration-500 flex items-center justify-center" />

          {/* Pulse Play Button */}
          <div className="absolute z-10 w-16 h-16 bg-white/95 text-primary rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-500 ease-out">
            {/* Visual pulsing wave ring */}
            <span className="absolute inset-0 rounded-full bg-white/40 animate-ping group-hover:animate-none group-hover:scale-150 group-hover:opacity-0 transition-all duration-700" />
            <FiPlay className="text-xl ml-1 fill-current" />
          </div>

          {/* Duration Badge */}
          <span className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-white text-[10px] font-bold flex items-center gap-1">
            <FiClock className="text-gold" />
            {duration}
          </span>

          {/* Category Badge */}
          <span className="absolute top-4 left-4 bg-primary text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
            {category}
          </span>
        </div>

        {/* Content Details */}
        <div className="p-6 flex-grow flex flex-col justify-between">
          <div>
            <h4 className="font-heading font-bold text-navy text-lg mb-2 line-clamp-1 group-hover:text-primary transition-colors">
              {title}
            </h4>
            <p className="text-navy/50 text-xs line-clamp-2 leading-relaxed">
              {desc}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Cinematic Modal Player Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Dark blur backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-navy/90 backdrop-blur-md"
            />

            {/* Content box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl relative w-full max-w-4xl aspect-video z-10 border border-white/10"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/80 transition-colors cursor-pointer"
              >
                <FiX className="text-lg" />
              </button>

              {/* Video Player Placeholder */}
              <div className="w-full h-full relative bg-black flex items-center justify-center">
                {videoUrl ? (
                  <iframe
                    src={videoUrl}
                    title={title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full"
                  />
                ) : (
                  <div className="text-center p-8">
                    <img
                      src={thumbnail}
                      alt={title}
                      className="absolute inset-0 w-full h-full object-cover opacity-40 blur-sm"
                    />
                    <div className="relative z-10 text-white">
                      <p className="text-gold uppercase tracking-widest text-xs font-bold mb-2">Cinematic Storytelling</p>
                      <h3 className="text-2xl md:text-3xl font-heading font-bold max-w-lg mx-auto mb-4">{title}</h3>
                      <p className="text-white/60 text-sm max-w-md mx-auto mb-6">{desc}</p>
                      <div className="inline-flex items-center gap-2 bg-primary text-white font-bold px-6 py-3 rounded-full text-xs uppercase tracking-wider">
                        ✓ Playing video placeholder
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VideoCard;
