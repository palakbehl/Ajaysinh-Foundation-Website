import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

const QuickActionCard = ({ title, desc, icon: Icon, to, btnText }) => {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="bg-white rounded-[2rem] p-8 border border-navy/5 shadow-soft hover:shadow-xl transition-all duration-500 flex flex-col h-full group"
    >
      {/* Icon Circle */}
      <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300 group-hover:bg-primary/20">
        <Icon className="text-2xl text-primary transition-transform duration-500 group-hover:scale-110" />
      </div>

      {/* Details */}
      <h3 className="font-heading font-bold text-navy text-xl mb-2 group-hover:text-primary transition-colors duration-300">
        {title}
      </h3>
      <p className="text-navy/60 text-sm leading-relaxed mb-6 flex-grow">
        {desc}
      </p>

      {/* Button link */}
      <Link
        to={to}
        className="w-full bg-cream hover:bg-primary text-navy hover:text-white rounded-xl py-3 px-5 text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-300 mt-auto group/btn cursor-pointer"
      >
        <span>{btnText}</span>
        <FiArrowRight className="transition-transform duration-300 group-hover/btn:translate-x-1" />
      </Link>
    </motion.div>
  );
};

export default QuickActionCard;
