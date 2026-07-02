import { motion } from 'framer-motion';
import { FiMapPin, FiPhone, FiMail, FiClock, FiCompass } from 'react-icons/fi';

const MapSection = () => {
  const address = "Lavki Village, Taluko - Vaso, Dist. Kheda, Laval, Nadiad Road, Gujarat - 387380";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="relative rounded-[2rem] overflow-hidden border border-navy/5 shadow-float bg-white p-4"
    >
      {/* Map Iframe Container */}
      <div className="relative rounded-2xl overflow-hidden aspect-[4/3] md:aspect-[16/10] lg:aspect-square xl:aspect-[16/10] bg-cream shadow-inner border border-navy/5">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117711.95689139556!2d72.76632465!3d22.7838561!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e4e20703f56f1%3A0xc3fa5bb8bf9cb0f!2sVaso%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="grayscale opacity-90 contrast-110 hover:grayscale-0 transition-all duration-700"
        />

        {/* Floating Info Badge */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-4 left-4 bg-primary text-white rounded-full py-2.5 px-5 shadow-float flex items-center gap-2 pointer-events-none"
        >
          <FiCompass className="text-sm text-gold animate-spin-slow" />
          <span className="text-[10px] font-bold uppercase tracking-widest">
            Serving communities with compassion.
          </span>
        </motion.div>
      </div>

      {/* Map details panel below */}
      <div className="p-6 md:p-8 grid md:grid-cols-2 gap-6 items-start mt-4 border-t border-gray-150">
        <div>
          <h4 className="font-heading font-bold text-navy text-lg mb-4 flex items-center gap-2">
            <FiMapPin className="text-primary" />
            <span>Our Location</span>
          </h4>
          <p className="text-navy/60 text-sm leading-relaxed mb-4">
            {address}
          </p>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary hover:bg-emerald-700 text-white rounded-full py-2.5 px-6 text-xs font-semibold transition-all duration-300 shadow-soft cursor-pointer"
          >
            <span>Get Directions</span>
            <FiCompass />
          </a>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <FiPhone className="text-primary mt-1" />
            <div>
              <p className="text-[10px] uppercase font-bold text-navy/40 tracking-wider">Contact</p>
              <p className="text-navy font-semibold text-sm">+91 70964 85680</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <FiMail className="text-primary mt-1" />
            <div>
              <p className="text-[10px] uppercase font-bold text-navy/40 tracking-wider">Email</p>
              <p className="text-navy font-semibold text-sm">contact@ajaysinhfoundation.org</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <FiClock className="text-primary mt-1" />
            <div>
              <p className="text-[10px] uppercase font-bold text-navy/40 tracking-wider">Office Hours</p>
              <p className="text-navy font-semibold text-sm">Monday – Saturday, 10:00 AM – 6:00 PM</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MapSection;
