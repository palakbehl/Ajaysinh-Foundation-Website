import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiHeart, FiLock } from 'react-icons/fi';

const amounts = [500, 1000, 2500, 5000];

const DonationSidebar = ({ campaign }) => {
  const [selected, setSelected] = useState(1000);
  const [custom, setCustom] = useState('');
  const [isMonthly, setIsMonthly] = useState(false);

  const { donors = 245 } = campaign || {};

  const handleAmountClick = (amt) => {
    setSelected(amt);
    setCustom('');
  };

  const handleCustomChange = (e) => {
    setCustom(e.target.value);
    setSelected(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.6 }}
      className="bg-white rounded-[2rem] shadow-xl p-7 border border-gray-100 sticky top-28"
    >
      <h3 className="font-heading text-xl font-bold text-navy mb-1">Make a Donation</h3>
      <p className="text-navy/40 text-sm mb-6">Your contribution makes a real difference</p>

      {/* Predefined amounts */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {amounts.map((amt) => (
          <motion.button
            key={amt}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleAmountClick(amt)}
            className={`rounded-xl border-2 py-3.5 text-center font-bold transition-all duration-300 ${
              selected === amt
                ? 'border-primary bg-primary/5 text-primary'
                : 'border-gray-200 text-navy/60 hover:border-primary/40'
            }`}
          >
            ₹{amt.toLocaleString('en-IN')}
          </motion.button>
        ))}
      </div>

      {/* Custom amount */}
      <div className="relative mb-5">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-navy/40 font-semibold">₹</span>
        <input
          type="number"
          value={custom}
          onChange={handleCustomChange}
          placeholder="Enter custom amount"
          className="w-full bg-cream border border-gray-200 rounded-xl pl-8 pr-4 py-3.5 text-navy text-sm placeholder:text-navy/30 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
        />
      </div>

      {/* Monthly toggle */}
      <div className="flex items-center justify-between mb-6 py-3 px-4 bg-cream rounded-xl">
        <span className="text-navy/70 text-sm font-medium">Monthly donation</span>
        <button
          onClick={() => setIsMonthly(!isMonthly)}
          className={`w-11 h-6 rounded-full transition-all duration-300 relative ${
            isMonthly ? 'bg-primary' : 'bg-gray-300'
          }`}
        >
          <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${
            isMonthly ? 'translate-x-[22px]' : 'translate-x-0.5'
          }`} />
        </button>
      </div>

      {/* Donate button */}
      <motion.button
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-gold hover:bg-gold/90 text-navy font-bold py-4 rounded-xl text-lg flex items-center justify-center gap-2 shadow-lg transition-all mb-4"
      >
        <FiHeart /> Donate {custom ? `₹${parseInt(custom).toLocaleString('en-IN')}` : selected ? `₹${selected.toLocaleString('en-IN')}` : 'Now'}
      </motion.button>

      {/* Trust badges */}
      <div className="flex items-center justify-center gap-4 text-navy/30 text-xs mb-5">
        <div className="flex items-center gap-1"><FiLock className="text-sm" /> Secure Payment</div>
        <span>•</span>
        <span>Tax exempt under 80G</span>
      </div>

      {/* Donor avatars */}
      <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
        <div className="flex -space-x-2">
          {['photo-1507003211169-0a1dd7228f2d', 'photo-1580489944761-15a19d654956', 'photo-1573497019940-1c28c88b4f3e'].map((id, i) => (
            <img
              key={i}
              src={`https://images.unsplash.com/${id}?auto=format&fit=crop&w=60&q=80`}
              alt="Donor"
              className="w-8 h-8 rounded-full border-2 border-white object-cover"
            />
          ))}
        </div>
        <p className="text-navy/50 text-xs">
          <span className="font-semibold text-navy">{donors}+</span> donors have contributed
        </p>
      </div>
    </motion.div>
  );
};

export default DonationSidebar;
