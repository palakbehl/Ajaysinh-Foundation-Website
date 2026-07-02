import { motion } from 'framer-motion';

const TrustBadge = ({ label, icon: Icon }) => {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="bg-white/90 backdrop-blur-md border border-white/50 rounded-2xl px-5 py-3.5 flex items-center gap-3 shadow-soft"
    >
      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
        <Icon className="text-base" />
      </div>
      <span className="text-navy text-xs font-bold uppercase tracking-wider">
        {label}
      </span>
    </motion.div>
  );
};

export default TrustBadge;
