import { motion } from 'framer-motion';

const ImpactCard = ({ value, label, desc, icon: Icon, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="bg-white/95 backdrop-blur-md border border-white/40 rounded-3xl p-6 flex flex-col items-start shadow-soft hover:shadow-xl transition-all duration-500 cursor-pointer h-full relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl -z-0 pointer-events-none" />

      {/* Icon Wrapper */}
      <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center flex-shrink-0 relative z-10 group-hover:scale-105 transition-transform duration-300 mb-4">
        <Icon className="text-xl" />
      </div>

      {/* Narrative */}
      <div className="relative z-10 w-full">
        <h3 className="text-2xl md:text-3xl font-heading font-bold text-navy leading-none mb-2">
          {value}
        </h3>
        <p className="font-semibold text-navy text-xs md:text-sm mb-1 leading-snug">
          {label}
        </p>
        <p className="text-navy/45 text-[10px] md:text-xs leading-normal">
          {desc}
        </p>
      </div>
    </motion.div>
  );
};

export default ImpactCard;
