import { motion } from 'framer-motion';

const DonationCard = ({ title, desc, icon: Icon, active, onClick, accent = '#0E4D45' }) => {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`text-left rounded-[2rem] p-6 md:p-8 border shadow-soft hover:shadow-xl transition-all duration-500 flex flex-col h-full group cursor-pointer relative overflow-hidden bg-white ${
        active ? 'ring-2 ring-offset-2' : 'border-navy/5'
      }`}
      style={{
        borderColor: active ? accent : 'rgba(13,27,42,0.05)',
        '--tw-ring-color': accent
      }}
    >
      {/* Top highlight bar */}
      <span
        className="absolute top-0 inset-x-0 h-1.5 transition-opacity duration-300"
        style={{
          backgroundColor: accent,
          opacity: active ? 1 : 0.2
        }}
      />

      {/* Icon Circle */}
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300"
        style={{
          backgroundColor: active ? `${accent}15` : 'rgba(14,77,69,0.08)'
        }}
      >
        <Icon
          className="text-2xl transition-transform duration-500 group-hover:scale-110"
          style={{ color: active ? accent : '#0E4D45' }}
        />
      </div>

      {/* Details */}
      <h3 className="font-heading font-bold text-navy text-lg mb-2 group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="text-navy/60 text-xs md:text-sm leading-relaxed mb-4 flex-grow">
        {desc}
      </p>

      {/* Select circle indicator */}
      <div className="flex items-center gap-2 mt-auto pt-4 border-t border-gray-55 text-xs font-semibold">
        <span
          className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-all ${
            active ? 'border-primary bg-primary' : 'border-navy/20 bg-transparent'
          }`}
          style={{
            borderColor: active ? accent : 'rgba(13,27,42,0.2)',
            backgroundColor: active ? accent : 'transparent'
          }}
        >
          {active && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
        </span>
        <span className="text-navy/70 uppercase text-[10px] tracking-wider font-bold">
          {active ? 'Selected Cause' : 'Select Cause'}
        </span>
      </div>
    </motion.button>
  );
};

export default DonationCard;
