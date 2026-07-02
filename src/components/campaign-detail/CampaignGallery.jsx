import { motion } from 'framer-motion';
import { FiEye } from 'react-icons/fi';

const CampaignGallery = ({ gallery = [] }) => {
  if (!gallery || gallery.length === 0) return null;

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className="text-primary font-semibold uppercase tracking-widest text-xs block mb-3">CAMPAIGN GALLERY</span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy">Moments of Impact</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-[180px]">
          {gallery.map((src, i) => {
            // Assign masonry tall row spanning dynamically
            const isTall = i === 0 || i === 3 || i === 4;
            return (
              <motion.div
                key={src}
                initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className={`rounded-2xl overflow-hidden relative group cursor-pointer ${isTall ? 'row-span-2' : ''}`}
              >
                <img src={src} alt={`Gallery Photo ${i + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                  <FiEye className="text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CampaignGallery;
