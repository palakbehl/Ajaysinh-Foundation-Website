import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiFileText } from 'react-icons/fi';

const DonateCSRCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-navy text-white rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden shadow-float"
    >
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
        <div className="lg:col-span-8">
          <span className="text-gold font-bold uppercase tracking-widest text-xs block mb-3">
            CORPORATE ALLIANCE
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
            Large Contributions & CSR Partnerships
          </h2>
          <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-2xl">
            Align your corporate social responsibility objectives with Ajaysinh Foundation. We draft complete blueprints, structured budgets, operational milestones, and transparent auditing documents.
          </p>
        </div>

        <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4 justify-end w-full">
          <Link
            to="/csr"
            className="bg-gold hover:bg-amber-500 text-navy rounded-xl py-4 px-6 text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-300 shadow-soft cursor-pointer group"
          >
            <span>Contact CSR Team</span>
            <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="border border-white/20 hover:border-white text-white rounded-xl py-4 px-6 text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer"
          >
            <FiFileText className="text-sm" />
            <span>Download CSR Brochure</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default DonateCSRCard;
