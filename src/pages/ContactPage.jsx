import { useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FiHome, FiChevronRight, FiArrowRight, FiBookOpen, FiHeart,
  FiUsers, FiSun, FiDroplet, FiShield, FiActivity, FiTrendingUp,
  FiAward, FiTarget, FiCheckCircle, FiFileText, FiDownload,
  FiPhone, FiMail, FiMapPin, FiClock, FiStar, FiGlobe,
  FiInstagram, FiFacebook, FiLinkedin, FiYoutube, FiTwitter
} from 'react-icons/fi';

import ContactCard from '../components/contact/ContactCard';
import ContactFAQAccordion from '../components/contact/ContactFAQAccordion';
import SocialCard from '../components/contact/SocialCard';
import ContactForm from '../components/contact/ContactForm';
import QuickActionCard from '../components/contact/QuickActionCard';
import MapSection from '../components/contact/MapSection';
import PremiumButton from '../components/ui/PremiumButton';
import {
  FloatingCircle, FloatingRing, FloatingLeaf, DotGrid,
  FloatingCross, FloatingDiamond, DashedCircle
} from '../components/ui/FloatingShapes';

/* ─── static data ─────────────────────────────────── */

const contactInfo = [
  { title: 'Phone Number', desc: '+91 70964 85680', icon: FiPhone },
  { title: 'Email Address', desc: 'contact@ajaysinhfoundation.org', icon: FiMail },
  { title: 'Office Address', desc: 'Lavki Village, Taluko - Vaso,\nDist. Kheda, Laval, Nadiad Road,\nGujarat - 387380', icon: FiMapPin },
  { title: 'Working Hours', desc: 'Monday – Saturday\n10:00 AM – 6:00 PM', icon: FiClock }
];

const quickActions = [
  { title: 'Donate Now', desc: 'Make a direct, secure contribution to support rural village programs.', to: '/donate', btnText: 'Give Support', icon: FiHeart },
  { title: 'Become Volunteer', desc: 'Step out onto the field, join our local campaigns, and change lives.', to: '/volunteer', btnText: 'Register Now', icon: FiUsers },
  { title: 'CSR Partnership', desc: 'Collaborate on sustainable corporate social responsibility campaigns.', to: '/csr', btnText: 'Partner With Us', icon: FiShield },
  { title: 'View Campaigns', desc: 'Explore our 8 active campaigns across child education and wellness.', to: '/campaigns', btnText: 'View Causes', icon: FiBookOpen }
];

const faqs = [
  { question: 'How can I make a donation?', answer: 'You can make direct, secure contributions online through our Donate Now page using credit cards, UPI, or bank transfers. All donations are 80G tax-exempt.' },
  { question: 'How do I register as a volunteer?', answer: 'Simply visit our Become a Volunteer page, fill out the stateful application form with your interests, and our squad coordinator team will reach out within 48 hours.' },
  { question: 'Where is the foundation office located?', answer: 'Our head office is situated at Lavki Village, Taluko - Vaso, Kheda District, Gujarat — 387380, where we direct all rural development initiatives.' },
  { question: 'Can companies partner with the foundation?', answer: 'Yes! We collaborate closely with corporate alliances under CSR mandates to launch water borewells, smart schools, and medical diagnostic camps.' },
  { question: 'How quickly will I receive a response?', answer: 'Our support team monitors all inbound messages constantly and aims to reply to every query within 24 hours.' }
];

const socialMedia = [
  { name: 'Instagram', handle: '@ajaysinhfoundation', icon: FiInstagram, href: 'https://instagram.com' },
  { name: 'Facebook', handle: 'Ajaysinh Foundation', icon: FiFacebook, href: 'https://facebook.com' },
  { name: 'LinkedIn', handle: 'Ajaysinh Foundation', icon: FiLinkedin, href: 'https://linkedin.com' },
  { name: 'YouTube', handle: 'Ajaysinh Foundation TV', icon: FiYoutube, href: 'https://youtube.com' },
  { name: 'Twitter / X', handle: '@ajaysinh_ngo', icon: FiTwitter, href: 'https://twitter.com' }
];

const trustTestimonials = [
  {
    quote: "Ajaysinh Foundation operates with complete operational honesty. Every rupee contributed was tracked perfectly inside their transparent quarterly reports.",
    name: "Dr. Vikram Mehta",
    role: "CSR Partner & Donor"
  },
  {
    quote: "Volunteering with this squad inside remote tribal communities allowed me to witness our clean water borewells change lives directly. Absolutely professional!",
    name: "Priya Sharma",
    role: "On-Ground Volunteer"
  }
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
   CONTACT US PAGE
   ═══════════════════════════════════════════════════ */
const ContactPage = () => {
  const formRef = useRef(null);
  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: 'smooth' });

  return (
    <>
      <Helmet>
        <title>Contact Us | Ajaysinh Foundation</title>
        <meta name="description" content="Get in touch with Ajaysinh Foundation to volunteer, donate, partner under CSR, or ask general questions. We are here to listen and collaborate." />
      </Helmet>

      <div className="bg-soft-cream min-h-screen overflow-hidden">

        {/* ══════════════════════════════════════════
            1. HERO SECTION
            ══════════════════════════════════════════ */}
        <section className="bg-cream relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
          {/* Decorative backgrounds */}
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
              <span className="text-primary font-bold">Contact Us</span>
            </motion.nav>

            {/* Asymmetrical composition */}
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Headlines */}
              <div className="lg:col-span-5 max-w-xl">
                <motion.span
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-primary uppercase tracking-widest text-xs font-bold mb-3 block"
                >
                  GET IN TOUCH
                </motion.span>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-navy leading-tight mb-5"
                >
                  We'd love to <span className="text-primary">hear from you!</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-navy/60 text-lg leading-relaxed mb-8"
                >
                  We would love to hear from you. Reach out to collaborate, volunteer, donate, or ask any questions.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex flex-wrap gap-4"
                >
                  <PremiumButton onClick={scrollToForm} icon={<FiArrowRight />}>
                    Contact Our Team
                  </PremiumButton>
                  <PremiumButton variant="outline" to="/volunteer">
                    Become a Volunteer
                  </PremiumButton>
                </motion.div>
              </div>

              {/* Right Column: Visual collage */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-7 relative flex justify-center"
              >
                <div className="relative w-full max-w-[540px] aspect-[16/10] rounded-[2.5rem] overflow-hidden shadow-float">
                  <img
                    src="https://images.unsplash.com/photo-1577416412292-747c6607f055?auto=format&fit=crop&w=600&q=80"
                    alt="NGO office interactions"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/20 to-transparent" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            2. CONTACT INFO CARDS SECTION
            ══════════════════════════════════════════ */}
        <section className="bg-white py-16 relative overflow-hidden">
          <FloatingCircle size={50} color="#DCE8E230" className="top-12 left-[5%]" delay={0} />

          <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactInfo.map((card, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <ContactCard title={card.title} desc={card.desc} icon={card.icon} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            3. CONTACT + MAP SPLIT SECTION
            ══════════════════════════════════════════ */}
        <section ref={formRef} className="bg-cream py-20 relative overflow-hidden">
          <DashedCircle size={100} color="#0D1B2A" className="top-10 right-[4%]" delay={0} />

          <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left Column: Form */}
              <div className="space-y-6">
                <div className="max-w-md">
                  <span className="text-primary font-bold uppercase tracking-widest text-xs block mb-3">
                    SEND A MESSAGE
                  </span>
                  <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy leading-tight mb-4">
                    Get in Touch
                  </h2>
                  <p className="text-navy/60 text-sm md:text-base leading-relaxed">
                    Have questions, ideas, or want to collaborate? Reach out to us and we'll get back to you as soon as possible.
                  </p>
                </div>
                <ContactForm />
              </div>

              {/* Right Column: Google Maps Embed */}
              <MapSection />
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            4. QUICK ACTIONS SECTION
            ══════════════════════════════════════════ */}
        <section className="bg-white py-20 relative overflow-hidden">
          <FloatingCross size={16} color="#C6A969" className="top-20 right-[12%]" delay={0} />

          <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
            <SectionHeader tagline="QUICK ACTIONS" title="Join the Support Network" />

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickActions.map((action, idx) => (
                <QuickActionCard
                  key={idx}
                  title={action.title}
                  desc={action.desc}
                  to={action.to}
                  btnText={action.btnText}
                  icon={action.icon}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            5. FAQ SECTION
            ══════════════════════════════════════════ */}
        <section className="bg-cream py-20 relative overflow-hidden">
          <FloatingRing size={60} color="#C6A96925" className="top-16 left-[8%]" delay={0.5} />

          <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
            <SectionHeader tagline="FREQUENTLY ASKED QUESTIONS" title="Everything You Need to Know" />
            <ContactFAQAccordion faqs={faqs} />
          </div>
        </section>

        {/* ══════════════════════════════════════════
            6. SOCIAL MEDIA SECTION
            ══════════════════════════════════════════ */}
        <section className="bg-white py-20 relative overflow-hidden">
          <FloatingLeaf size={45} color="#0B4F3A" className="top-20 right-[10%]" delay={1} />
          <DotGrid className="absolute bottom-16 left-[4%]" cols={3} rows={4} color="#0B4F3A" />

          <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
            <SectionHeader tagline="SOCIAL CONNECT" title="Stay Updated on Our Fieldwork" />

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {socialMedia.map((social, idx) => (
                <SocialCard
                  key={idx}
                  name={social.name}
                  handle={social.handle}
                  icon={social.icon}
                  href={social.href}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            7. TESTIMONIAL / TRUST SECTION
            ══════════════════════════════════════════ */}
        <section className="bg-cream py-20 relative overflow-hidden">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
            <SectionHeader tagline="TRUST & FEEDBACK" title="What Our Supporters Say" />

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {trustTestimonials.map((t, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className="bg-white rounded-[2rem] p-8 shadow-soft border border-navy/5 relative flex flex-col justify-between"
                >
                  <span className="text-[6rem] font-heading text-gold/10 select-none leading-none absolute top-4 right-8 pointer-events-none">
                    “
                  </span>
                  <p className="font-heading text-navy italic text-base leading-relaxed mb-6 relative z-10">
                    "{t.quote}"
                  </p>
                  <div className="border-t border-gray-100 pt-4 mt-auto">
                    <h4 className="font-heading font-bold text-navy text-base">{t.name}</h4>
                    <p className="text-primary text-xs uppercase tracking-wider font-semibold mt-0.5">{t.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            8. FINAL CTA SECTION
            ══════════════════════════════════════════ */}
        <section className="bg-navy relative py-24 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-0" />
          <div className="absolute bottom-0 left-[10%] w-72 h-72 bg-gold/8 rounded-full blur-[100px] -z-0" />
          <FloatingRing size={80} color="#C6A96930" className="top-12 left-[8%]" delay={0} />

          <div className="container mx-auto px-4 md:px-8 max-w-4xl relative z-10 text-center">
            <motion.div {...fadeUp}>
              <span className="text-gold font-bold uppercase tracking-widest text-xs block mb-4">
                LET'S TALK
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white leading-tight mb-6">
                Every conversation can create impact.
              </h2>
              <p className="text-white/60 text-base md:text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
                Reach out to us today. Whether you have questions about our audited expense sheets, want to volunteer,
                or would like to coordinate a corporate CSR alignment, we are here to listen.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <PremiumButton variant="gold" onClick={scrollToForm} icon={<FiArrowRight />}>
                  Contact Us Today
                </PremiumButton>
                <PremiumButton variant="outline-white" to="/donate" icon={<FiHeart />}>
                  Support Our Mission
                </PremiumButton>
              </div>
            </motion.div>
          </div>
        </section>

      </div>
    </>
  );
};

export default ContactPage;
