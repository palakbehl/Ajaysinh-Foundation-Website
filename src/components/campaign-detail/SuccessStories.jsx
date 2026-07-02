import { motion } from 'framer-motion';

const SuccessStories = ({ stories = [] }) => {
  if (!stories || stories.length === 0) return null;

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className="text-primary font-semibold uppercase tracking-widest text-xs block mb-3">BENEFICIARY STORIES</span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy">Voices of Change</h2>
        </motion.div>

        <div className={`grid gap-6 ${stories.length === 1 ? 'max-w-xl mx-auto grid-cols-1' : stories.length === 2 ? 'max-w-4xl mx-auto md:grid-cols-2' : 'md:grid-cols-3'}`}>
          {stories.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.12 }}
              whileHover={{ y: -5 }}
              className="bg-cream rounded-[2rem] p-8 relative flex flex-col justify-between"
            >
              <div>
                {/* Quote mark */}
                <span className="text-gold/20 text-7xl font-heading absolute top-4 right-6 leading-none select-none">"</span>

                <p className="font-heading text-navy italic text-lg leading-relaxed mb-6 relative z-10">
                  "{s.quote}"
                </p>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-4">
                  <img src={s.image} alt={s.name} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" />
                  <div>
                    <p className="font-semibold text-navy text-sm">{s.name}</p>
                    <p className="text-navy/40 text-xs">{s.age}</p>
                  </div>
                </div>

                <span className="inline-block bg-primary/10 text-primary text-xs px-3 py-1 rounded-full font-medium">
                  {s.impact}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
