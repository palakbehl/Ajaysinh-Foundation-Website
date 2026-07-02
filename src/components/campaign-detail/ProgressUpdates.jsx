import { motion } from 'framer-motion';

const ProgressUpdates = ({ updates = [] }) => {
  if (!updates || updates.length === 0) return null;

  return (
    <section className="bg-cream py-16">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <span className="text-primary font-semibold uppercase tracking-widest text-xs block mb-3">CAMPAIGN TIMELINE</span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy">Latest Progress</h2>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-5 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gold/30" />

          {updates.map((update, i) => (
            <motion.div
              key={update.title + i}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.15 }}
              className={`relative flex gap-6 mb-10 last:mb-0 ${
                i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Date circle on line */}
              <div className="absolute left-5 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-gold border-4 border-cream z-10" style={{ top: '20px' }} />

              {/* Spacer for desktop alternating */}
              <div className="hidden md:block md:w-1/2" />

              {/* Card */}
              <div className="ml-12 md:ml-0 md:w-1/2">
                <div className="bg-white rounded-2xl shadow-soft p-5 hover:shadow-md transition-shadow">
                  <span className="text-xs text-gold font-semibold uppercase tracking-wider">{update.date}</span>
                  <h4 className="font-heading font-bold text-navy mt-1 mb-2">{update.title}</h4>
                  <p className="text-navy/50 text-sm leading-relaxed mb-3">{update.desc}</p>
                  {update.image && (
                    <div className="rounded-xl overflow-hidden">
                      <img src={update.image} alt={update.title} className="w-full h-32 object-cover" />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgressUpdates;
