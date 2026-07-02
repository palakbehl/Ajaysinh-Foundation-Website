import { motion } from 'framer-motion';

const TestimonialCard = ({ quote, name, role, image }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-[2rem] p-8 shadow-soft border border-navy/5 relative flex flex-col justify-between"
    >
      <span className="text-[6rem] font-heading text-gold/15 select-none leading-none absolute top-4 right-8 pointer-events-none">
        “
      </span>

      {/* Quote */}
      <p className="font-heading text-navy italic text-base leading-relaxed mb-6 relative z-10">
        "{quote}"
      </p>

      {/* Author Row */}
      <div className="border-t border-gray-100 pt-4 flex items-center gap-4">
        {image && (
          <img
            src={image}
            alt={name}
            className="w-10 h-10 rounded-full object-cover border border-cream shadow-sm flex-shrink-0"
          />
        )}
        <div>
          <h4 className="font-heading font-bold text-navy text-sm md:text-base leading-none mb-1">
            {name}
          </h4>
          <p className="text-primary text-xs uppercase tracking-wider font-semibold">
            {role}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
