import { motion } from 'framer-motion';
import { FiShoppingBag, FiBook, FiActivity, FiHome, FiUsers } from 'react-icons/fi';
import { FloatingCircle, FloatingRing, FloatingCross } from '../ui/FloatingShapes';

const iconMap = {
  ShoppingBag: FiShoppingBag,
  Book: FiBook,
  Activity: FiActivity,
  Home: FiHome,
  Users: FiUsers
};

const ImpactBreakdown = ({ breakdown }) => {
  if (!breakdown || breakdown.length === 0) return null;

  return (
    <section className="bg-cream py-16 relative overflow-hidden">
      <FloatingCircle size={50} color="#DCE8E230" className="top-16 right-[8%]" delay={0} />
      <FloatingRing size={70} color="#C6A96920" className="bottom-20 left-[5%]" delay={1} />
      <FloatingCross size={12} color="#C6A969" className="top-[40%] left-[12%]" delay={2} />

      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className="text-primary font-semibold uppercase tracking-widest text-xs block mb-3">WHERE YOUR MONEY GOES</span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy">Transparent Impact Breakdown</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {breakdown.map((item, i) => {
            const IconComponent = iconMap[item.icon] || FiShoppingBag;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-white rounded-[2rem] p-6 shadow-soft text-center group"
              >
                <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: `${item.accent}15` }}>
                  <IconComponent className="text-xl" style={{ color: item.accent }} />
                </div>
                <p className="text-3xl font-heading font-bold mb-1" style={{ color: item.accent }}>{item.pct}%</p>
                <p className="font-heading font-semibold text-navy mb-2">{item.title}</p>
                <p className="text-navy/50 text-sm mb-4 leading-relaxed">{item.desc}</p>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }} whileInView={{ width: `${item.pct * 2.5}%` }}
                    viewport={{ once: true }} transition={{ duration: 1, delay: 0.3 + i * 0.15 }}
                    className="h-full rounded-full" style={{ backgroundColor: item.accent }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ImpactBreakdown;
