import { motion } from 'framer-motion';
import { FiDownload } from 'react-icons/fi';

const TransparencyCard = ({ title, desc, icon: Icon, fileType, fileSize }) => {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="bg-white rounded-[2rem] p-6 border border-navy/5 shadow-soft hover:shadow-xl transition-all duration-500 flex flex-col h-full group"
    >
      {/* Icon Circle */}
      <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
        <Icon className="text-2xl text-primary transition-transform duration-500 group-hover:scale-110" />
      </div>

      {/* Details */}
      <h3 className="font-heading font-bold text-navy text-lg mb-2">
        {title}
      </h3>
      <p className="text-navy/60 text-xs md:text-sm leading-relaxed mb-6 flex-grow">
        {desc}
      </p>

      {/* Actions */}
      <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-4 mt-auto">
        <div className="flex items-center gap-2">
          <span className="bg-gold/10 text-gold text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-full font-bold">
            {fileType}
          </span>
          <span className="text-navy/40 text-[10px] font-semibold">
            {fileSize}
          </span>
        </div>
        <button
          type="button"
          className="text-primary hover:text-emerald-700 font-bold text-xs flex items-center gap-1 group/btn transition-all duration-300"
        >
          <span>Download</span>
          <FiDownload className="text-xs transition-transform duration-300 group-hover/btn:translate-y-0.5" />
        </button>
      </div>
    </motion.div>
  );
};

export default TransparencyCard;
