import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';

const ContactFAQAccordion = ({ faqs = [] }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleIndex = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {faqs.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className="bg-white rounded-2xl border border-navy/5 shadow-soft overflow-hidden transition-all duration-300"
          >
            <button
              onClick={() => toggleIndex(idx)}
              className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 hover:bg-cream/35 transition-colors duration-250"
            >
              <span className="font-heading font-bold text-navy text-base md:text-lg">
                {faq.question}
              </span>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center text-primary flex-shrink-0"
              >
                <FiChevronDown />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <div className="px-6 pb-6 pt-2 text-navy/60 text-sm leading-relaxed border-t border-gray-50">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export default ContactFAQAccordion;
