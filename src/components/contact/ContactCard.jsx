import { motion } from 'framer-motion';

const ContactCard = ({ title, desc, icon: Icon }) => {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-6 border border-navy/5 shadow-soft hover:shadow-xl transition-all duration-500 flex items-center gap-5 group"
    >
      {/* Icon Wrapper */}
      <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors duration-300 group-hover:bg-primary/20">
        <Icon className="text-2xl text-primary transition-transform duration-500 group-hover:scale-110" />
      </div>

      {/* Info Details */}
      <div>
        <h4 className="text-xs uppercase tracking-wider text-navy/40 font-bold mb-0.5">
          {title}
        </h4>
        <p className="text-navy font-semibold text-base leading-snug whitespace-pre-line">
          {desc}
        </p>
      </div>
    </motion.div>
  );
};

export default ContactCard;
