import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';

const CampaignFAQ = ({ faqs = [] }) => {
  if (!faqs || faqs.length === 0) return null;

  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-cream py-16">
      <div className="container mx-auto px-4 md:px-8 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className="text-primary font-semibold uppercase tracking-widest text-xs block mb-3">FREQUENTLY ASKED QUESTIONS</span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy">Got Questions? We Have Answers</h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="bg-white rounded-2xl shadow-soft overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                className="w-full flex justify-between items-center p-5 text-left"
              >
                <span className="font-heading font-semibold text-navy pr-4">{faq.q}</span>
                <motion.span
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-primary flex-shrink-0"
                >
                  <FiChevronDown />
                </motion.span>
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-navy/60 text-sm leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CampaignFAQ;
