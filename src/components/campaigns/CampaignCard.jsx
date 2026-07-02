import { motion } from 'framer-motion';
import { FiHeart, FiUsers, FiClock } from 'react-icons/fi';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const CampaignCard = ({ campaign }) => {
  const {
    id,
    title,
    description,
    image,
    raised,
    goal,
    category,
    beneficiaries,
    daysLeft,
    status,
  } = campaign;

  const [liked, setLiked] = useState(false);
  const progress = Math.min((raised / goal) * 100, 100);

  const formatAmount = (amount) => {
    if (amount >= 100000) {
      return `${(amount / 100000).toFixed(1)}L`;
    }
    if (amount >= 1000) {
      return `${(amount / 1000).toFixed(0)}K`;
    }
    return amount.toLocaleString('en-IN');
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="bg-white rounded-[2rem] shadow-soft overflow-hidden group hover:shadow-xl transition-all duration-500"
    >
      {/* Image Section */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />

        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Category badge — top right */}
        <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-navy">
          {category}
        </span>

        {/* Heart icon — top left, reveal on hover */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            setLiked(!liked);
          }}
          className={`absolute top-4 left-4 w-9 h-9 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
            liked
              ? 'bg-red-500 text-white'
              : 'bg-white/90 backdrop-blur-sm text-navy/60'
          }`}
        >
          <FiHeart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
        </motion.button>

        {/* Status badge for completed/upcoming */}
        {status === 'Completed' && (
          <span className="absolute bottom-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-bold">
            ✓ Completed
          </span>
        )}
        {status === 'Upcoming' && (
          <span className="absolute bottom-4 left-4 bg-gold text-navy px-3 py-1 rounded-full text-xs font-bold">
            Upcoming
          </span>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-lg font-heading font-bold text-navy line-clamp-2 group-hover:text-primary transition-colors duration-300 mb-2">
          {title}
        </h3>

        {/* Description */}
        <p className="text-navy/60 text-sm line-clamp-2 mb-4">{description}</p>

        {/* Progress Bar */}
        <div className="bg-gray-100 rounded-full h-2.5 overflow-hidden mb-3">
          <motion.div
            className="bg-gold rounded-full h-full"
            initial={{ width: 0 }}
            whileInView={{ width: `${progress}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
          />
        </div>

        {/* Amount Row */}
        <div className="flex items-baseline gap-1.5 mb-4">
          <span className="text-primary font-bold text-base">
            ₹{formatAmount(raised)}
          </span>
          <span className="text-navy/50 text-sm">
            raised of ₹{formatAmount(goal)}
          </span>
        </div>

        {/* Stats Row */}
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-1.5 text-xs text-navy/50">
            <FiUsers className="w-3.5 h-3.5" />
            <span>{beneficiaries} Beneficiaries</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-navy/50">
            <FiClock className="w-3.5 h-3.5" />
            <span>
              {daysLeft > 0 ? `${daysLeft} Days Left` : 'Campaign Ended'}
            </span>
          </div>
        </div>

        {/* View Campaign Button */}
        <Link
          to={`/campaigns/${id}`}
          className="block text-center w-full border-2 border-primary text-primary font-semibold py-2.5 rounded-xl relative overflow-hidden group/btn transition-all duration-300 hover:text-white cursor-pointer"
        >
          <span className="absolute inset-0 bg-primary translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
          <span className="relative z-10">View Campaign →</span>
        </Link>
      </div>
    </motion.div>
  );
};

export default CampaignCard;

