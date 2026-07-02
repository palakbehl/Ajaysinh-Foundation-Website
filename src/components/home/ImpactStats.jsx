import { motion } from 'framer-motion';
import { FloatingCircle, FloatingHeart, FloatingLeaf, FloatingCross, DashedCircle } from '../ui/FloatingShapes';

const stats = [
  { id: 1, number: '5,000+', label: 'Lives Changed' },
  { id: 2, number: '400+', label: 'Children Sheltered' },
  { id: 3, number: '100+', label: 'Elders Supported' },
  { id: 4, number: '1,00,000+', label: 'Meals Distributed' },
  { id: 5, number: '25+', label: 'Communities Reached' },
];

const ImpactStats = () => {
  return (
    <section className="relative -mt-8 z-30 px-4">
      <div className="container mx-auto max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-navy rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden"
        >
          {/* Floating elements inside the stats bar */}
          <FloatingCircle size={60} color="#ffffff" className="top-2 left-[5%] opacity-[0.03]" delay={0} />
          <FloatingHeart size={20} color="#C6A969" className="top-4 right-[10%] opacity-10" delay={1} />
          <FloatingLeaf size={30} color="#ffffff" className="bottom-2 left-[60%] opacity-[0.04]" delay={2} />
          <FloatingCross size={12} color="#C6A969" className="bottom-4 right-[20%] opacity-10" delay={1.5} />
          <DashedCircle size={80} color="#C6A969" className="-right-4 -top-4 opacity-10" delay={0} />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-4 relative z-10">
            {stats.map((stat, index) => (
              <div key={stat.id} className="text-center group cursor-default">
                <motion.h3 
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, type: "spring" }}
                  className="text-3xl md:text-4xl font-heading font-bold text-gold mb-2 group-hover:scale-110 transition-transform"
                >
                  {stat.number}
                </motion.h3>
                <p className="text-sm md:text-base text-white/80 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ImpactStats;
