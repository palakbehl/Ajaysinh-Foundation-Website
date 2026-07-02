import { motion } from 'framer-motion';

const presets = [500, 1000, 2500, 5000, 10000];

const DonationAmountSelector = ({
  selectedAmount,
  onSelectAmount,
  customAmount,
  onChangeCustomAmount,
}) => {
  const isCustomActive = selectedAmount === 'custom';

  const getImpactMessage = (amt) => {
    const parsed = Number(amt);
    if (!parsed) return '';
    if (parsed <= 500) return '₹500 provides nutritious hot meals to village children for a week.';
    if (parsed <= 1000) return '₹1,000 provides high-quality books and school supplies to rural students.';
    if (parsed <= 2500) return '₹2,500 provides complete winter clothing and hygiene kits to three elderly citizens.';
    if (parsed <= 5000) return '₹5,000 funds vital health checks, multivitamins, and pediatric care for five families.';
    return `₹${parsed.toLocaleString('en-IN')} coordinates deep community water security or shelter programs.`;
  };

  const activeAmount = isCustomActive ? customAmount : selectedAmount;

  return (
    <div className="space-y-6 bg-white/80 backdrop-blur-xl rounded-[2rem] p-6 md:p-8 border border-navy/5 shadow-soft">
      <div>
        <h3 className="font-heading font-bold text-navy text-lg mb-1">
          Select Donation Amount
        </h3>
        <p className="text-navy/50 text-xs font-medium">
          Choose a preset amount or input a custom sum below.
        </p>
      </div>

      {/* Preset amount buttons grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {presets.map((amt) => {
          const isActive = selectedAmount === amt;
          return (
            <motion.button
              key={amt}
              type="button"
              onClick={() => onSelectAmount(amt)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`rounded-2xl py-4 text-center text-base font-bold shadow-soft transition-all duration-300 cursor-pointer border ${
                isActive
                  ? 'bg-primary text-white border-primary shadow-md'
                  : 'bg-cream text-navy/70 border-navy/5 hover:border-primary/30'
              }`}
            >
              ₹{amt.toLocaleString('en-IN')}
            </motion.button>
          );
        })}
      </div>

      {/* Custom amount trigger */}
      <div className="grid md:grid-cols-12 gap-4 items-center">
        <div className="md:col-span-4">
          <motion.button
            type="button"
            onClick={() => onSelectAmount('custom')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full rounded-2xl py-4 font-bold text-sm shadow-soft transition-all border cursor-pointer ${
              isCustomActive
                ? 'bg-primary text-white border-primary shadow-md'
                : 'bg-cream text-navy/70 border-navy/5 hover:border-primary/30'
            }`}
          >
            Custom Amount
          </motion.button>
        </div>

        {/* Custom amount input field */}
        <div className="md:col-span-8 relative">
          <span className="absolute left-5 top-1/2 -translate-y-1/2 text-navy/40 font-bold text-base select-none">
            ₹
          </span>
          <input
            type="text"
            disabled={!isCustomActive}
            placeholder="Enter custom sum..."
            value={customAmount}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, '');
              onChangeCustomAmount(val);
            }}
            className={`w-full rounded-2xl pl-9 pr-5 py-4 text-sm font-semibold transition-all border focus:outline-none focus:ring-2 ${
              isCustomActive
                ? 'border-primary bg-white focus:ring-primary/20'
                : 'border-navy/5 bg-cream/40 opacity-60 text-navy/40'
            }`}
          />
        </div>
      </div>

      {/* Impact feedback notice */}
      {activeAmount && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          key={activeAmount}
          className="bg-primary/5 rounded-2xl p-4 flex items-center gap-3 border border-primary/10"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-primary flex-shrink-0 animate-pulse" />
          <p className="text-primary text-xs md:text-sm font-semibold leading-relaxed">
            {getImpactMessage(activeAmount)}
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default DonationAmountSelector;
