import { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FiHome, FiChevronRight, FiArrowRight, FiBookOpen, FiHeart,
  FiUsers, FiSun, FiDroplet, FiShield, FiActivity, FiTrendingUp,
  FiAward, FiTarget, FiCheckCircle, FiFileText, FiDownload,
  FiPhone, FiMail, FiMapPin, FiClock, FiStar, FiGlobe, FiLock
} from 'react-icons/fi';

import DonationCard from '../components/donate/DonationCard';
import DonationAmountSelector from '../components/donate/DonationAmountSelector';
import DonationForm from '../components/donate/DonationForm';
import ImpactCard from '../components/donate/ImpactCard';
import DonateFAQAccordion from '../components/donate/DonateFAQAccordion';
import TestimonialCard from '../components/donate/TestimonialCard';
import TransparencyCard from '../components/donate/TransparencyCard';
import PaymentMethods from '../components/donate/PaymentMethods';
import TrustBadge from '../components/donate/TrustBadge';
import DonateCSRCard from '../components/donate/DonateCSRCard';
import PremiumButton from '../components/ui/PremiumButton';
import {
  FloatingCircle, FloatingRing, FloatingLeaf, DotGrid,
  FloatingCross, FloatingDiamond, DashedCircle
} from '../components/ui/FloatingShapes';

/* ─── static data ─────────────────────────────────── */

const trustBadges = [
  { label: 'Verified NGO', icon: FiCheckCircle },
  { label: 'Tax Benefit Available', icon: FiFileText },
  { label: 'Secure Donation', icon: FiLock },
  { label: 'Transparent Impact', icon: FiShield }
];

const impactStats = [
  { value: '5,000+', label: 'Children Supported', desc: 'Through digital learning and rural schools', icon: FiBookOpen },
  { value: '25,000+', label: 'Meals Distributed', desc: 'Nutritious hot food supplied weekly', icon: FiDroplet },
  { value: '1,500+', label: 'Families Helped', desc: 'Direct village welfare and sanitation', icon: FiUsers },
  { value: '1,250+', label: 'Volunteers Active', desc: 'Changemakers executing on the field', icon: FiStar },
  { value: '850+', label: 'Medical Support Cases', desc: 'Distributed medicine and health checkups', icon: FiActivity }
];

const donationOptions = [
  { id: 'onetime', title: 'One-Time Donation', desc: 'Provide immediate, crucial support to active ground campaigns.', icon: FiHeart, accent: '#0E4D45' },
  { id: 'monthly', title: 'Monthly Donation', desc: 'Join our sustainer family and support long-term rural initiatives.', icon: FiSun, accent: '#D4A24C' },
  { id: 'child', title: 'Sponsor a Child', desc: 'Directly fund rural child education, study tools, and nutrition plans.', icon: FiBookOpen, accent: '#3498DB' },
  { id: 'food', title: 'Food Support', desc: 'Provide dry ration kits and healthy meals to underprivileged tribal families.', icon: FiDroplet, accent: '#27AE60' },
  { id: 'education', title: 'Education Support', desc: 'Build library centers, digital computer labs, and smart rural classrooms.', icon: FiTrendingUp, accent: '#9B59B6' },
  { id: 'medical', title: 'Medical Support', desc: 'Fund pediatric clinics, medicine distributions, and health diagnostic drives.', icon: FiActivity, accent: '#E74C3C' }
];

const testimonials = [
  {
    quote: "Sponsoring children through Ajaysinh Foundation allowed me to track exactly how my money was spent. The monthly progress reports are absolutely transparent.",
    name: "Vikram Malhotra",
    role: "Regular Donor & Supporter",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
  },
  {
    quote: "Seeing the solar borewells dug in remote Bihar villages brought tears of joy. Truly, every single rupee translates to a direct ground difference.",
    name: "Shweta Roy",
    role: "CSR Partner Coordinator",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
  }
];

const transparencyDocs = [
  { title: 'NGO Registration Certificate', desc: 'Official Section 8 incorporation credentials and leadership profiles.', icon: FiFileText, fileType: 'PDF', fileSize: '1.4 MB' },
  { title: 'Tax Exemption 80G Card', desc: 'Approved government 80G tax benefit certification sheets.', icon: FiShield, fileType: 'PDF', fileSize: '0.4 MB' },
  { title: 'Annual Financial Audit 2024-25', desc: 'Complete transparent audited ledger reports for public review.', icon: FiTrendingUp, fileType: 'PDF', fileSize: '4.8 MB' },
  { title: 'NITI Aayog Darpan Details', desc: 'Government portal registration ID and validation certificate.', icon: FiStar, fileType: 'PDF', fileSize: '0.6 MB' }
];

const faqs = [
  { question: 'Is my donation completely secure?', answer: 'Yes! All transactions are encrypted with industry-standard 256-bit SSL connections using Razorpay and secure UPI networks to protect your data.' },
  { question: 'Will I receive a tax exemption certificate?', answer: 'Absolutely. Ajaysinh Foundation is registered under Section 80G. You will receive an official tax deduction receipt via email immediately after checkout.' },
  { question: 'How are my contribution funds distributed?', answer: 'We maintain strict fiscal discipline. Over 90% of all public contributions go directly into field program execution, with under 10% kept for operational management.' },
  { question: 'Can I choose to contribute on a recurring basis?', answer: 'Yes! Select the "Monthly Donation" cause or check "Make this a Monthly Recurring Contribution" in our form to join our regular sustainer circle.' },
  { question: 'Who can I contact for large or corporate partnerships?', answer: 'For large individual contributions, estate planning, or corporate CSR alignments, please contact our team at csr@ajaysinhfoundation.org.' }
];

/* ─── animation helpers ───────────────────────────── */
const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

/* ─── SECTION HEADER helper ───────────────────────── */
const SectionHeader = ({ tagline, title, light = false }) => (
  <motion.div {...fadeUp} className="text-center mb-16">
    <span className={`font-bold uppercase tracking-widest text-xs block mb-3 ${light ? 'text-gold' : 'text-primary'}`}>
      {tagline}
    </span>
    <h2 className={`text-3xl md:text-4xl lg:text-5xl font-heading font-bold leading-tight ${light ? 'text-white' : 'text-navy'}`}>
      {title}
    </h2>
  </motion.div>
);

/* ═══════════════════════════════════════════════════
   DONATE PAGE
   ═══════════════════════════════════════════════════ */
const DonatePage = () => {
  const formRef = useRef(null);

  const [selectedCause, setSelectedCause] = useState('onetime');
  const [selectedAmount, setSelectedAmount] = useState(1000);
  const [customAmount, setCustomAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('upi');

  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: 'smooth' });

  const currentAmount = selectedAmount === 'custom' ? customAmount : selectedAmount;

  return (
    <>
      <Helmet>
        <title>Donate Now | Ajaysinh Foundation</title>
        <meta name="description" content="Support Ajaysinh Foundation with safe, secure, and 80G tax-exempt donations to fund child education, rural wellness camps, and solar water borewells." />
      </Helmet>

      <div className="bg-[#FAF8F5] min-h-screen overflow-hidden text-navy">

        {/* ══════════════════════════════════════════
            1. HERO SECTION
            ══════════════════════════════════════════ */}
        <section className="bg-cream relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
          {/* Decorative assets */}
          <div className="absolute top-0 left-0 w-[42%] h-full bg-white/40 rounded-br-[180px] -z-0" />
          <div className="absolute bottom-0 right-[8%] w-96 h-96 bg-primary/5 rounded-full blur-[100px] -z-0" />
          <FloatingRing size={70} color="#C6A96940" className="top-28 right-[10%]" delay={0} />
          <FloatingLeaf size={50} color="#0B4F3A" className="bottom-20 left-[6%]" delay={1.5} />
          <FloatingCross size={14} color="#C6A969" className="top-[45%] left-[22%]" delay={2} />
          <DotGrid className="absolute bottom-10 right-[5%]" cols={4} rows={3} color="#C6A969" />

          <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
            {/* Breadcrumb */}
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 text-xs md:text-sm mb-6 flex-wrap text-navy/55"
            >
              <Link to="/" className="hover:text-primary transition-colors flex items-center gap-1">
                <FiHome className="text-xs" /> Home
              </Link>
              <FiChevronRight className="text-navy/25 text-xs" />
              <span className="text-primary font-bold">Donate Now</span>
            </motion.nav>

            <div className="grid lg:grid-cols-12 gap-12 items-center">
              {/* Left Side Details */}
              <div className="lg:col-span-6 max-w-2xl">
                <motion.span
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-primary uppercase tracking-widest text-xs font-bold mb-3 block"
                >
                  MAKE A DIFFERENCE
                </motion.span>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-navy leading-tight mb-5"
                >
                  Your Kindness <br />
                  <span className="text-primary">Can Change Lives</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-navy/60 text-base md:text-lg leading-relaxed mb-8"
                >
                  Every contribution helps provide food, shelter, education, healthcare, and hope to vulnerable communities.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex flex-wrap gap-4"
                >
                  <PremiumButton onClick={scrollToForm} icon={<FiArrowRight />}>
                    Donate Now
                  </PremiumButton>
                  <PremiumButton variant="outline" to="/campaigns">
                    View Campaigns
                  </PremiumButton>
                </motion.div>

                {/* Trust indicators row */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="grid grid-cols-2 gap-3 mt-10"
                >
                  {trustBadges.map((badge, idx) => (
                    <TrustBadge key={idx} {...badge} />
                  ))}
                </motion.div>
              </div>

              {/* Right Side Composition */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-6 relative flex justify-center"
              >
                <div className="relative w-full max-w-[540px] aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-float">
                  <img
                    src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80"
                    alt="Happy child smiling"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/35 to-transparent" />
                  
                  {/* Floating count sticker */}
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute -bottom-4 -left-4 bg-[#D4A24C] text-[#0B1F33] rounded-2xl px-6 py-4 shadow-float z-10 border border-white/20"
                  >
                    <p className="text-2xl font-heading font-bold">5,000+</p>
                    <p className="text-xs font-semibold">Lives Saved</p>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            2. IMPACT STATISTICS
            ══════════════════════════════════════════ */}
        <section className="bg-white py-16 relative overflow-hidden border-y border-navy/5">
          <FloatingCircle size={50} color="#DCE8E230" className="top-12 left-[5%]" delay={0} />

          <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {impactStats.map((stat, idx) => (
                <ImpactCard key={idx} {...stat} delay={idx * 0.1} />
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            3. DONATION OPTIONS & AMOUNT SELECTOR
            ══════════════════════════════════════════ */}
        <section className="py-20 relative overflow-hidden bg-[#FAF8F5]">
          <FloatingCross size={16} color="#C6A969" className="top-20 right-[12%]" delay={0} />

          <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
            <SectionHeader tagline="DONATION OPPORTUNITIES" title="Choose How You Wish to Help" />

            {/* Selection Cause cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {donationOptions.map((opt) => (
                <DonationCard
                  key={opt.id}
                  title={opt.title}
                  desc={opt.desc}
                  icon={opt.icon}
                  accent={opt.accent}
                  active={selectedCause === opt.id}
                  onClick={() => setSelectedCause(opt.id)}
                />
              ))}
            </div>

            {/* Donation Amount selector presets */}
            <DonationAmountSelector
              selectedAmount={selectedAmount}
              onSelectAmount={setSelectedAmount}
              customAmount={customAmount}
              onChangeCustomAmount={setCustomAmount}
            />
          </div>
        </section>

        {/* ══════════════════════════════════════════
            5. DONATION FORM & GATEWAYS
            ══════════════════════════════════════════ */}
        <section ref={formRef} className="py-20 relative overflow-hidden bg-white border-y border-navy/5">
          <FloatingLeaf size={45} color="#0B4F3A" className="top-20 right-[10%]" delay={1} />
          <DashedCircle size={100} color="#0D1B2A" className="bottom-12 left-[3%]" delay={0} />

          <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
            <div className="grid lg:grid-cols-12 gap-12 items-start">
              {/* Form columns inputs */}
              <div className="lg:col-span-8">
                <DonationForm amount={currentAmount} paymentMethod={paymentMethod} />
              </div>

              {/* Checkout gateway selectors */}
              <div className="lg:col-span-4">
                <PaymentMethods selectedMethod={paymentMethod} onSelectMethod={setPaymentMethod} amount={currentAmount} />
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            7. IMPACT STORIES SECTION
            ══════════════════════════════════════════ */}
        <section className="py-20 relative overflow-hidden bg-[#FAF8F5]">
          <DotGrid className="absolute top-16 right-[5%]" cols={4} rows={3} color="#C6A969" />

          <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
            <SectionHeader tagline="PROVEN IMPACT" title="See the Difference You Create" />

            <div className="grid lg:grid-cols-12 gap-16 items-center">
              {/* Before/After imagery collage */}
              <div className="lg:col-span-6 relative">
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-8 rounded-[2rem] overflow-hidden aspect-[4/3] shadow-soft group relative">
                    <img
                      src="https://images.unsplash.com/photo-1594708767771-a7502209ff51?auto=format&fit=crop&w=500&q=80"
                      alt="Water scarcity village"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 bg-navy text-white text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full pointer-events-none">
                      Before: Scarcity
                    </div>
                  </div>
                  <div className="col-span-4 rounded-[2rem] overflow-hidden aspect-[3/4] translate-y-8 shadow-soft group relative">
                    <img
                      src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=400&q=80"
                      alt="Safe schooling"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 bg-primary text-white text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full pointer-events-none">
                      After: Smiles
                    </div>
                  </div>
                </div>
              </div>

              {/* Narrative reviews */}
              <div className="lg:col-span-6 space-y-6">
                {testimonials.map((t, idx) => (
                  <TestimonialCard key={idx} quote={t.quote} name={t.name} role={t.role} image={t.image} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            8. TRANSPARENCY SECTION
            ══════════════════════════════════════════ */}
        <section className="py-20 relative overflow-hidden bg-white border-y border-navy/5">
          <FloatingDiamond size={14} color="#0B4F3A" className="top-24 left-[15%]" delay={0.5} />

          <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
            <SectionHeader tagline="TRUST & CERTIFICATIONS" title="100% Transparent, Fully Audited Ledger" />

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {transparencyDocs.map((doc, idx) => (
                <TransparencyCard key={idx} {...doc} />
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            9. FAQ SECTION
            ══════════════════════════════════════════ */}
        <section className="py-20 relative overflow-hidden bg-[#FAF8F5]">
          <FloatingRing size={60} color="#C6A96925" className="top-16 left-[8%]" delay={0.5} />

          <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
            <SectionHeader tagline="FREQUENTLY ASKED QUESTIONS" title="Everything You Need to Know" />
            <DonateFAQAccordion faqs={faqs} />
          </div>
        </section>

        {/* ══════════════════════════════════════════
            10. CSR / LARGE DONATIONS SECTION
            ══════════════════════════════════════════ */}
          <section className="py-16 bg-[#FAF8F5]">
            <div className="container mx-auto px-4 md:px-8 max-w-7xl">
              <DonateCSRCard />
            </div>
          </section>

        {/* ══════════════════════════════════════════
            11. FINAL CTA SECTION & MAP OFFICE LOCATION
            ══════════════════════════════════════════ */}
        <section className="bg-navy relative py-24 overflow-hidden text-white">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-0" />
          <div className="absolute bottom-0 left-[10%] w-72 h-72 bg-gold/8 rounded-full blur-[100px] -z-0" />
          <FloatingRing size={80} color="#C6A96930" className="top-12 left-[8%]" delay={0} />

          <div className="container mx-auto px-4 md:px-8 max-w-5xl relative z-10 text-center">
            <motion.div {...fadeUp} className="mb-16">
              <span className="text-gold font-bold uppercase tracking-widest text-xs block mb-4">
                BE THE CHANGE
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white leading-tight mb-6">
                Together, We Can Build a Better Tomorrow
              </h2>
              <p className="text-white/60 text-base md:text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
                Join India's most trusted social impact network. If you cannot volunteer, a direct monthly contribution supports children, elders, and families across deep tribal communities.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <PremiumButton variant="gold" onClick={scrollToForm} icon={<FiArrowRight />}>
                  Donate Today
                </PremiumButton>
                <PremiumButton variant="outline-white" to="/volunteer" icon={<FiHeart />}>
                  Become a Volunteer
                </PremiumButton>
              </div>
            </motion.div>

            {/* Small map block near footer */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white text-navy rounded-3xl p-4 shadow-float max-w-3xl mx-auto overflow-hidden border border-white/20"
            >
              <div className="rounded-2xl overflow-hidden aspect-[21/9] bg-cream shadow-inner">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117711.95689139556!2d72.76632465!3d22.7838561!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e4e20703f56f1%3A0xc3fa5bb8bf9cb0f!2sVaso%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale opacity-85 contrast-110"
                />
              </div>
              <div className="pt-4 px-2 flex flex-col md:flex-row md:items-center justify-between text-left gap-4 text-xs font-semibold">
                <div>
                  <p className="text-navy font-bold">Ajaysinh Foundation Office</p>
                  <p className="text-navy/50 font-normal">Lavki Village, Taluko - Vaso, Dist. Kheda, Gujarat - 387380</p>
                </div>
                <div className="text-navy/70">
                  <p>contact@ajaysinhfoundation.org</p>
                  <p>+91 70964 85680</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

      </div>
    </>
  );
};

export default DonatePage;
