import { motion } from 'framer-motion';

const CSRCard = ({ title, desc, icon: Icon, benefits = [], variant = 'focus', accent = '#0B4F3A' }) => {
  const isFocusVariant = variant === 'focus';

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`bg-white rounded-[2rem] p-8 shadow-soft hover:shadow-xl transition-all duration-500 border border-navy/5 flex flex-col h-full group ${
        !isFocusVariant ? 'relative overflow-hidden' : ''
      }`}
    >
      {/* Dynamic top highlight border for models */}
      {!isFocusVariant && (
        <span className="absolute top-0 inset-x-0 h-1.5" style={{ backgroundColor: accent }} />
      )}

      {/* Styled Icon Container */}
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300"
        style={{ backgroundColor: `${accent}12` }}
      >
        <Icon className="text-2xl transition-transform duration-500 group-hover:scale-110" style={{ color: accent }} />
      </div>

      {/* Title */}
      <h3 className="font-heading font-bold text-navy text-xl mb-3 group-hover:text-primary transition-colors duration-300">
        {title}
      </h3>

      {/* Description */}
      <p className="text-navy/60 text-sm leading-relaxed mb-6 flex-grow">
        {desc}
      </p>

      {/* Benefits checklist (exclusive to partnership models) */}
      {!isFocusVariant && benefits.length > 0 && (
        <div className="space-y-2 mt-auto pt-4 border-t border-gray-100">
          <p className="text-[10px] font-bold uppercase tracking-wider text-navy/40">Core Benefits</p>
          <ul className="space-y-1.5">
            {benefits.map((b, idx) => (
              <li key={idx} className="text-xs text-navy/75 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent }} />
                {b}
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
};

export default CSRCard;
