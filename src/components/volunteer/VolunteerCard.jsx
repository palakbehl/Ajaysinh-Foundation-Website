import { motion } from 'framer-motion';
import { FiClock, FiArrowRight } from 'react-icons/fi';

const VolunteerCard = ({ title, desc, icon: Icon, commitment, onApply }) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="bg-white rounded-[2rem] p-8 border border-navy/5 shadow-soft hover:shadow-xl transition-all duration-500 flex flex-col h-full group"
    >
      {/* Icon */}
      <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300 group-hover:bg-primary/20">
        <Icon className="text-2xl text-primary transition-transform duration-500 group-hover:scale-110" />
      </div>

      {/* Title */}
      <h3 className="font-heading font-bold text-navy text-xl mb-3 group-hover:text-primary transition-colors duration-300">
        {title}
      </h3>

      {/* Description */}
      <p className="text-navy/60 text-sm leading-relaxed mb-6 flex-grow">
        {desc}
      </p>

      {/* Footer Info & Action */}
      <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-4 mt-auto">
        <div className="flex items-center gap-1.5 text-navy/55 text-xs font-semibold">
          <FiClock className="text-sm text-primary" />
          <span>{commitment}</span>
        </div>
        <button
          onClick={onApply}
          className="text-primary hover:text-emerald-700 font-bold text-xs flex items-center gap-1 group/btn transition-colors"
        >
          <span>Apply Now</span>
          <FiArrowRight className="transition-transform duration-300 group-hover/btn:translate-x-1" />
        </button>
      </div>
    </motion.div>
  );
};

export default VolunteerCard;
