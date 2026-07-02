import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiMail, FiSend } from 'react-icons/fi';
import PremiumButton from '../ui/PremiumButton';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="rounded-[3rem] overflow-hidden relative min-h-[380px] flex items-center shadow-xl"
      >
        {/* Underlay emotional background image */}
        <img
          src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80"
          alt="Children smiling"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Soft, deep color mask overlay */}
        <div className="absolute inset-0 bg-navy/85" />

        {/* Dynamic content card */}
        <div className="relative z-10 text-center max-w-2xl mx-auto px-6 py-12 flex flex-col items-center">
          <div className="w-14 h-14 bg-gold/20 rounded-full flex items-center justify-center mb-6">
            <FiMail className="text-gold text-2xl" />
          </div>

          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
            Join Our Inner Circle
          </h2>
          <p className="text-white/70 text-base md:text-lg mb-8 leading-relaxed">
            Stay updated with our latest impact stories, humanitarian initiatives, and transparent reports from the field.
          </p>

          {!subscribed ? (
            <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col sm:flex-row gap-3">
              {/* Glassmorphic input field */}
              <div className="relative flex-grow">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 text-lg" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-full py-4 pl-12 pr-4 text-white text-sm placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition-all duration-300"
                />
              </div>

              {/* Styled subscribe button */}
              <PremiumButton type="submit" variant="gold" size="md" icon={<FiSend />}>
                Subscribe
              </PremiumButton>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 text-emerald-200 font-bold px-6 py-4 rounded-full text-center"
            >
              ✓ Thank you! You have subscribed to our newsletter successfully.
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default Newsletter;
