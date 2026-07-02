import { motion } from 'framer-motion';

const SocialCard = ({ name, handle, icon: Icon, href }) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-navy/5 shadow-soft hover:shadow-xl transition-all duration-500 flex flex-col items-center text-center group cursor-pointer"
    >
      {/* Icon Circle */}
      <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4 transition-all duration-500 group-hover:bg-primary group-hover:text-white text-primary">
        <Icon className="text-2xl transition-transform duration-500 group-hover:rotate-12" />
      </div>

      {/* Media Details */}
      <h4 className="font-heading font-bold text-navy text-lg mb-0.5 group-hover:text-primary transition-colors">
        {name}
      </h4>
      <p className="text-navy/40 text-xs font-semibold">
        {handle}
      </p>
    </motion.a>
  );
};

export default SocialCard;
