import { motion } from 'framer-motion';

const steps = [
  {
    num: '01',
    title: 'Inquiry',
    desc: 'Submit your interest via our inquiry form or schedule a one-on-one consultation with our CSR team.'
  },
  {
    num: '02',
    title: 'Consultation',
    desc: 'We align on your corporate philanthropic focus areas, geographical preferences, and budget specifications.'
  },
  {
    num: '03',
    title: 'Proposal Planning',
    desc: 'Our team drafts comprehensive project blueprints, structured budgets, operational milestones, and impact reports.'
  },
  {
    num: '04',
    title: 'Project Execution',
    desc: 'We carry out direct, transparent, and monitored execution on-ground with real-time tracking.'
  },
  {
    num: '05',
    title: 'Reporting & Analysis',
    desc: 'You receive quarterly milestone audits, comprehensive compliance documentation, and validated impact results.'
  }
];

const Timeline = () => {
  return (
    <div className="relative max-w-3xl mx-auto px-4 py-8">
      {/* Central progress pipeline */}
      <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-4 bottom-4 w-0.5 bg-primary/25" />

      {steps.map((step, i) => (
        <motion.div
          key={step.num}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: i * 0.15 }}
          className={`relative flex gap-6 mb-12 last:mb-0 ${
            i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
          }`}
        >
          {/* Timeline node */}
          <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary text-white border-4 border-soft-cream flex items-center justify-center font-bold text-xs z-10" style={{ top: '16px' }}>
            {step.num}
          </div>

          {/* Grid balance spacer */}
          <div className="hidden md:block md:w-1/2" />

          {/* Information Card */}
          <div className="ml-10 md:ml-0 md:w-1/2">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-[2rem] p-6 md:p-8 shadow-soft border border-navy/5 relative"
            >
              <h4 className="font-heading font-bold text-navy text-lg mb-2">
                {step.title}
              </h4>
              <p className="text-navy/60 text-sm leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Timeline;
