import { motion } from 'framer-motion';

const ImpactStat = ({ value, label, desc, icon: Icon, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="bg-white/90 backdrop-blur-md border border-white/40 rounded-3xl p-6 md:p-8 flex items-center gap-5 shadow-soft relative overflow-hidden group hover:shadow-md transition-shadow"
    >
      {/* Decorative inner glow */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl -z-0" />

      {/* Icon */}
      <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center flex-shrink-0 relative z-10">
        <Icon className="text-2xl group-hover:scale-110 transition-transform duration-300" />
      </div>

      {/* Text Details */}
      <div className="relative z-10">
        <h3 className="text-3xl md:text-4xl font-heading font-bold text-navy leading-none mb-1">
          {value}
        </h3>
        <p className="font-semibold text-navy text-sm mb-0.5">
          {label}
        </p>
        <p className="text-navy/45 text-[11px] leading-tight">
          {desc}
        </p>
      </div>
    </motion.div>
  );
};

export default ImpactStat;
