import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiLink, FiArrowRight, FiMail } from 'react-icons/fi';
import { FaFacebookF, FaTwitter, FaWhatsapp, FaLinkedinIn } from 'react-icons/fa';
import PremiumButton from '../ui/PremiumButton';

const socials = [
  { icon: FaFacebookF, bg: 'bg-[#1877F2]', label: 'Facebook' },
  { icon: FaTwitter, bg: 'bg-[#1DA1F2]', label: 'Twitter' },
  { icon: FaWhatsapp, bg: 'bg-[#25D366]', label: 'WhatsApp' },
  { icon: FaLinkedinIn, bg: 'bg-[#0A66C2]', label: 'LinkedIn' },
];

const ShareSupport = () => {
  const [copied, setCopied] = useState(false);
  const url = 'ajaysinhfoundation.org/campaigns/bright-futures';

  const handleCopy = () => {
    navigator.clipboard?.writeText(`https://${url}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Share */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h3 className="text-2xl font-heading font-bold text-navy mb-2">Share This Campaign</h3>
            <p className="text-navy/50 text-sm mb-6">Help spread the word and reach more supporters</p>

            <div className="flex gap-3 mb-6">
              {socials.map((s) => (
                <motion.button
                  key={s.label}
                  whileHover={{ scale: 1.1, y: -3 }} whileTap={{ scale: 0.95 }}
                  className={`w-12 h-12 rounded-full ${s.bg} text-white flex items-center justify-center shadow-md`}
                  aria-label={`Share on ${s.label}`}
                >
                  <s.icon />
                </motion.button>
              ))}
            </div>

            <div className="bg-cream rounded-xl px-4 py-3 flex items-center gap-3">
              <FiLink className="text-navy/40 flex-shrink-0" />
              <span className="text-navy/50 text-sm truncate flex-1">{url}</span>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleCopy}
                className="bg-primary text-white text-xs font-semibold px-4 py-1.5 rounded-lg flex-shrink-0 hover:bg-primary/90 transition-colors"
              >
                {copied ? 'Copied!' : 'Copy'}
              </motion.button>
            </div>
          </motion.div>

          {/* Volunteer */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h3 className="text-2xl font-heading font-bold text-navy mb-2">Want to Volunteer?</h3>
            <p className="text-navy/50 text-sm mb-6">
              Join our team of passionate volunteers and make a hands-on impact. We need teachers, mentors, event organizers, and field support.
            </p>
            <div className="flex flex-wrap gap-3">
              <PremiumButton to="/volunteer" variant="primary" icon={<FiArrowRight />}>Join as Volunteer</PremiumButton>
              <PremiumButton to="/contact" variant="outline" icon={<FiMail />}>Contact Us</PremiumButton>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ShareSupport;
