import { useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FiHome, FiChevronRight, FiArrowRight, FiBookOpen, FiHeart,
  FiUsers, FiSun, FiDroplet, FiShield, FiActivity, FiTrendingUp,
  FiAward, FiTarget, FiCheckCircle, FiFileText, FiDownload,
  FiPhone, FiMail, FiMapPin, FiClock, FiStar, FiGlobe
} from 'react-icons/fi';
import CSRCard from '../components/csr/CSRCard';
import ImpactStat from '../components/csr/ImpactStat';
import Timeline from '../components/csr/Timeline';
import InquiryForm from '../components/csr/InquiryForm';
import DownloadCard from '../components/csr/DownloadCard';
import PremiumButton from '../components/ui/PremiumButton';
import {
  FloatingCircle, FloatingRing, FloatingLeaf, DotGrid,
  FloatingCross, FloatingDiamond, DashedCircle
} from '../components/ui/FloatingShapes';

/* ─── static data ─────────────────────────────────── */

const impactStats = [
  { value: '5,000+', label: 'Lives Impacted', desc: 'Direct beneficiaries across programs', icon: FiHeart },
  { value: '45+', label: 'Villages Reached', desc: 'Rural communities transformed', icon: FiMapPin },
  { value: '3,500+', label: 'Children Supported', desc: 'Through education initiatives', icon: FiBookOpen },
  { value: '25+', label: 'Corporate Projects', desc: 'Successfully delivered partnerships', icon: FiAward },
];

const focusAreas = [
  { title: 'Education & Literacy', desc: 'Building schools, libraries, and scholarship programs for underprivileged children in rural India.', icon: FiBookOpen },
  { title: 'Healthcare Access', desc: 'Mobile health camps, medicine distribution, and pediatric nutrition programs in underserved villages.', icon: FiActivity },
  { title: 'Women Empowerment', desc: 'Tailoring centres, micro-enterprise support, and financial literacy for rural women.', icon: FiUsers },
  { title: 'Rural Development', desc: 'Infrastructure, roads, solar electrification, and community centre construction.', icon: FiSun },
  { title: 'Water & Sanitation', desc: 'Borewell installations, clean water pipelines, and village sanitation drives.', icon: FiDroplet },
  { title: 'Environmental Conservation', desc: 'Tree plantations, waste management programs, and renewable energy advocacy.', icon: FiGlobe },
  { title: 'Skill Development Labs', desc: 'Computer training, vocational workshops, and digital literacy for rural youth.', icon: FiTrendingUp },
  { title: 'Elder & Disability Support', desc: 'Shelter homes, assistive devices, and monthly wellness camps for elderly and disabled.', icon: FiShield },
];

const trustIndicators = [
  { title: '100% Transparency', desc: 'Full audited financial disclosure with real-time fund tracking dashboards for every partner.', icon: FiShield },
  { title: 'Tax Benefits', desc: '80G certified tax exemption on all donations enabling maximum corporate deductions.', icon: FiFileText },
  { title: 'Ground Execution', desc: 'Expert on-ground workforce across 45+ villages with direct beneficiary engagement.', icon: FiTarget },
  { title: 'Real-Time Reporting', desc: 'Quarterly impact dashboards, photo documentation, and milestone progress reports.', icon: FiClock },
  { title: 'Scalable Programs', desc: 'Programs designed to grow with investment — from single villages to entire districts.', icon: FiTrendingUp },
  { title: 'Government Aligned', desc: "Fully aligned with India's national CSR mandates under the Companies Act, 2013.", icon: FiStar },
];

const partnershipModels = [
  { title: 'School Adoption', desc: 'Sponsor complete school infrastructure, teacher training programs, and student scholarships in rural areas.', icon: FiBookOpen, accent: '#0B4F3A', benefits: ['Infrastructure Development', 'Teacher Training', 'Student Scholarships'] },
  { title: 'Healthcare Drives', desc: 'Fund mobile health clinics, medicine supply chains, and annual health camp programs across villages.', icon: FiActivity, accent: '#E67E22', benefits: ['Mobile Clinics', 'Medicine Supply', 'Annual Health Camps'] },
  { title: 'Infrastructure Projects', desc: 'Build solar borewells, community centres, roads, and sustainable energy installations.', icon: FiSun, accent: '#3498DB', benefits: ['Solar Borewells', 'Community Centres', 'Road Construction'] },
  { title: 'Employee Volunteering', desc: 'Engage your team in meaningful ground-level impact through structured volunteer programs.', icon: FiUsers, accent: '#9B59B6', benefits: ['Team Programs', 'Skill Sharing Workshops', 'Field Visits'] },
  { title: "Women's Livelihood", desc: 'Empower rural women through tailoring units, micro-enterprise training, and financial literacy.', icon: FiHeart, accent: '#E91E63', benefits: ['Tailoring Units', 'Micro-Enterprise', 'Financial Training'] },
  { title: 'Green Sustainability', desc: 'Support tree plantation drives, waste management, and renewable energy education programs.', icon: FiGlobe, accent: '#27AE60', benefits: ['Tree Plantation', 'Waste Management', 'Eco Education'] },
];

const caseStudies = [
  {
    title: 'Solar Borewell Project, Kalyanpur',
    partner: 'Corporate Alliance',
    impact: '500+ families now have clean water access year-round',
    image: 'https://images.unsplash.com/photo-1594708767771-a7502209ff51?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'Digital Classroom Initiative',
    partner: 'Tech Foundation',
    impact: '1,200 students gained computer literacy skills',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'Women Tailoring Center, Patna',
    partner: 'CSR Fund',
    impact: '200+ women became financially independent',
    image: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&w=600&q=80',
  },
];

const downloadDocs = [
  { title: 'CSR Brochure', desc: 'Comprehensive overview of our CSR programs and partnership opportunities.', icon: FiFileText, fileType: 'PDF', fileSize: '2.4 MB' },
  { title: 'NGO Profile', desc: 'Detailed organizational profile, leadership team, and mission statement.', icon: FiBookOpen, fileType: 'PDF', fileSize: '1.8 MB' },
  { title: 'Annual Report 2024-25', desc: 'Full year financial audit, impact metrics, and project milestones.', icon: FiTrendingUp, fileType: 'PDF', fileSize: '5.2 MB' },
  { title: '80G Certificate', desc: 'Tax exemption certificate for corporate donation deductions.', icon: FiShield, fileType: 'PDF', fileSize: '0.3 MB' },
  { title: 'NITI Aayog Registration', desc: 'Official government registration under NITI Aayog Darpan portal.', icon: FiAward, fileType: 'PDF', fileSize: '0.5 MB' },
  { title: 'Government Registration', desc: 'Trust registration and Section 8 company incorporation documents.', icon: FiStar, fileType: 'PDF', fileSize: '0.4 MB' },
];

const partnerLogos = ['Tata', 'Infosys', 'Wipro', 'Reliance', 'Adani', 'Mahindra', 'HCL', 'Bharti'];

/* ─── animation helpers ───────────────────────────── */
const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true },
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
   CSR PAGE
   ═══════════════════════════════════════════════════ */
const CSRPage = () => {
  const formRef = useRef(null);
  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: 'smooth' });

  return (
    <>
      <Helmet>
        <title>CSR Partnership | Ajaysinh Foundation</title>
        <meta name="description" content="Partner with Ajaysinh Foundation for impactful Corporate Social Responsibility programs across education, healthcare, and rural development in India." />
      </Helmet>

      <div className="bg-soft-cream min-h-screen overflow-hidden">

        {/* ══════════════════════════════════════════
            1. HERO SECTION
            ══════════════════════════════════════════ */}
        <section className="bg-cream relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
          {/* Decorative background */}
          <div className="absolute top-0 left-0 w-[42%] h-full bg-white/40 rounded-br-[180px] -z-0" />
          <div className="absolute bottom-0 right-[8%] w-96 h-96 bg-primary/5 rounded-full blur-[100px] -z-0" />
          <div className="absolute top-[20%] right-0 w-72 h-72 bg-gold/5 rounded-full blur-[80px] -z-0" />
          <FloatingRing size={70} color="#C6A96940" className="top-28 right-[10%]" delay={0} />
          <FloatingLeaf size={50} color="#0B4F3A" className="bottom-20 left-[6%]" delay={1.5} />
          <FloatingCross size={14} color="#C6A969" className="top-[45%] left-[22%]" delay={2} />
          <FloatingDiamond size={12} color="#0B4F3A" className="top-[30%] right-[25%]" delay={0.5} />
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
              <span className="text-primary font-bold">CSR Partnership</span>
            </motion.nav>

            {/* Headlines */}
            <div className="max-w-3xl">
              <motion.span
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-primary uppercase tracking-widest text-xs font-bold mb-3 block"
              >
                CORPORATE SOCIAL RESPONSIBILITY
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-navy leading-tight mb-5"
              >
                Partner With Purpose,{' '}
                <span className="text-primary">Create Lasting Impact</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-navy/60 text-lg md:text-xl leading-relaxed mb-8"
              >
                Ajaysinh Foundation collaborates with forward-thinking corporations to drive sustainable
                development across education, healthcare, and rural communities.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-wrap gap-4"
              >
                <PremiumButton onClick={scrollToForm} icon={<FiArrowRight />}>
                  Partner With Us
                </PremiumButton>
                <PremiumButton variant="outline" icon={<FiDownload />}>
                  Download CSR Proposal
                </PremiumButton>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            2. INTRODUCTION SECTION
            ══════════════════════════════════════════ */}
        <section className="bg-white py-20 relative overflow-hidden">
          <FloatingCircle size={50} color="#DCE8E230" className="top-16 right-[8%]" delay={0} />
          <DashedCircle size={120} color="#0D1B2A" className="bottom-8 left-[3%]" delay={1} />

          <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left: Image Collage */}
              <motion.div {...fadeUp} className="relative">
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-7 rounded-[2rem] overflow-hidden shadow-soft aspect-[3/4] relative group">
                    <img
                      src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=500&q=80"
                      alt="Children learning in classroom"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="col-span-5 space-y-4 pt-12">
                    <div className="rounded-[2rem] overflow-hidden shadow-soft aspect-square relative group">
                      <img
                        src="https://images.unsplash.com/photo-1594708767771-a7502209ff51?auto=format&fit=crop&w=400&q=80"
                        alt="Clean water project"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div className="rounded-[2rem] overflow-hidden shadow-soft aspect-[4/3] relative group">
                      <img
                        src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=400&q=80"
                        alt="Community empowerment"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  </div>
                </div>
                {/* Floating accent badge */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -bottom-4 -right-4 bg-primary text-white rounded-2xl px-6 py-4 shadow-float z-10"
                >
                  <p className="text-2xl font-heading font-bold">12+</p>
                  <p className="text-xs text-white/70">Years of Impact</p>
                </motion.div>
              </motion.div>

              {/* Right: Content */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <span className="text-primary font-bold uppercase tracking-widest text-xs block mb-3">WHO WE ARE</span>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy leading-tight mb-6">
                  A Trusted Partner for{' '}
                  <span className="text-primary">Corporate Social Impact</span>
                </h2>
                <p className="text-navy/60 text-base md:text-lg leading-relaxed mb-8">
                  Ajaysinh Foundation operates as a Section 8 registered non-profit with over a decade of
                  grassroots experience across 45+ villages. We design, execute, and monitor high-impact
                  CSR programs tailored to your corporate objectives — delivering measurable social returns
                  with complete fiscal transparency.
                </p>
                <div className="space-y-4">
                  {[
                    'Registered under Section 8 of Companies Act, 2013',
                    '80G Tax Exemption Certified for all donations',
                    '100% Transparent Fund Utilization with quarterly audits',
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <FiCheckCircle className="text-primary text-xl mt-0.5 flex-shrink-0" />
                      <p className="text-navy/75 font-medium">{item}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            3. IMPACT STATISTICS
            ══════════════════════════════════════════ */}
        <section className="bg-cream py-16 relative overflow-hidden">
          <FloatingRing size={90} color="#C6A96920" className="top-6 left-[5%]" delay={0} />
          <FloatingLeaf size={40} color="#0B4F3A" className="bottom-10 right-[7%]" delay={1} />

          <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {impactStats.map((stat, idx) => (
                <ImpactStat key={idx} {...stat} delay={idx * 0.15} />
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            4. CSR FOCUS AREAS
            ══════════════════════════════════════════ */}
        <section className="bg-white py-20 relative overflow-hidden">
          <FloatingCross size={16} color="#C6A969" className="top-20 right-[12%]" delay={0} />
          <DotGrid className="absolute bottom-16 left-[4%]" cols={3} rows={4} color="#0B4F3A" />

          <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
            <SectionHeader tagline="OUR IMPACT AREAS" title="Where Your Investment Creates Change" />

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {focusAreas.map((area, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                >
                  <CSRCard title={area.title} desc={area.desc} icon={area.icon} variant="focus" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            5. WHY PARTNER WITH US
            ══════════════════════════════════════════ */}
        <section className="bg-cream py-20 relative overflow-hidden">
          <FloatingDiamond size={14} color="#0B4F3A" className="top-24 left-[15%]" delay={0.5} />
          <FloatingCircle size={60} color="#DCE8E220" className="bottom-12 right-[6%]" delay={0} />

          <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
            <SectionHeader tagline="TRUST INDICATORS" title="Why Leading Corporates Choose Us" />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {trustIndicators.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-white rounded-[2rem] p-8 shadow-soft border border-navy/5 group hover:shadow-xl transition-all duration-500"
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                    <item.icon className="text-primary text-2xl group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="font-heading font-bold text-navy text-xl mb-3 group-hover:text-primary transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-navy/60 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            6. PARTNERSHIP MODELS
            ══════════════════════════════════════════ */}
        <section className="bg-white py-20 relative overflow-hidden">
          <FloatingRing size={60} color="#C6A96925" className="top-16 left-[8%]" delay={0.5} />

          <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
            <SectionHeader tagline="ENGAGEMENT MODELS" title="Flexible Partnership Structures" />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {partnershipModels.map((model, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <CSRCard
                    title={model.title}
                    desc={model.desc}
                    icon={model.icon}
                    accent={model.accent}
                    variant="model"
                    benefits={model.benefits}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            7. SUCCESS CASE STUDIES
            ══════════════════════════════════════════ */}
        <section className="bg-cream py-20 relative overflow-hidden">
          <DotGrid className="absolute top-16 right-[5%]" cols={4} rows={3} color="#C6A969" />

          <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
            <SectionHeader tagline="PROVEN IMPACT" title="Success Stories From the Field" />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {caseStudies.map((study, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className="rounded-[2rem] overflow-hidden shadow-soft group relative aspect-[4/3] cursor-pointer"
                >
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent" />
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <span className="text-gold text-[10px] font-bold uppercase tracking-widest block mb-2">
                      Partner: {study.partner}
                    </span>
                    <h3 className="font-heading font-bold text-white text-xl md:text-2xl mb-2">
                      {study.title}
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed">{study.impact}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            8. CSR PROCESS TIMELINE
            ══════════════════════════════════════════ */}
        <section className="bg-white py-20 relative overflow-hidden">
          <FloatingLeaf size={45} color="#0B4F3A" className="top-20 right-[10%]" delay={1} />
          <FloatingCross size={12} color="#C6A969" className="bottom-24 left-[12%]" delay={0} />

          <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
            <SectionHeader tagline="HOW IT WORKS" title="Your CSR Journey With Us" />
            <Timeline />
          </div>
        </section>

        {/* ══════════════════════════════════════════
            9. DOWNLOADABLE DOCUMENTS
            ══════════════════════════════════════════ */}
        <section className="bg-cream py-20 relative overflow-hidden">
          <DashedCircle size={100} color="#0D1B2A" className="top-10 right-[4%]" delay={0} />

          <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
            <SectionHeader tagline="RESOURCES" title="Download Our CSR Documents" />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {downloadDocs.map((doc, idx) => (
                <DownloadCard key={idx} {...doc} />
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            10. CSR INQUIRY FORM
            ══════════════════════════════════════════ */}
        <section ref={formRef} className="bg-white py-20 relative overflow-hidden">
          <FloatingCircle size={80} color="#DCE8E220" className="top-8 left-[4%]" delay={0} />
          <FloatingRing size={60} color="#C6A96920" className="bottom-16 right-[6%]" delay={1} />

          <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Left: Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <span className="text-primary font-bold uppercase tracking-widest text-xs block mb-3">
                  GET IN TOUCH
                </span>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy leading-tight mb-6">
                  Ready to Make an{' '}
                  <span className="text-primary">Impact?</span>
                </h2>
                <p className="text-navy/60 text-base md:text-lg leading-relaxed mb-10">
                  Fill out the inquiry form and our dedicated CSR partnership team will create a
                  customized proposal aligned with your corporate objectives within 48 hours.
                </p>

                <div className="space-y-6">
                  {[
                    { icon: FiPhone, label: 'Call Us', value: '+91 98765 43210' },
                    { icon: FiMail, label: 'Email', value: 'csr@ajaysinhfoundation.org' },
                    { icon: FiMapPin, label: 'Head Office', value: 'Patna, Bihar, India — 800001' },
                    { icon: FiClock, label: 'Office Hours', value: 'Mon – Sat, 9:00 AM – 6:00 PM' },
                  ].map((contact, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <contact.icon className="text-primary text-lg" />
                      </div>
                      <div>
                        <p className="text-navy/40 text-xs uppercase tracking-wider font-semibold">{contact.label}</p>
                        <p className="text-navy font-medium">{contact.value}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Right: Inquiry Form */}
              <InquiryForm />
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            11. PARTNER LOGO SLIDER
            ══════════════════════════════════════════ */}
        <section className="bg-cream py-16 overflow-hidden">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl mb-10">
            <SectionHeader tagline="TRUSTED BY" title="Our Corporate Partners" />
          </div>

          {/* Auto-scrolling logos */}
          <div className="relative">
            <div className="flex animate-scroll-logos gap-12 w-max">
              {[...partnerLogos, ...partnerLogos].map((name, idx) => (
                <div
                  key={idx}
                  className="w-36 h-20 bg-white rounded-2xl border border-navy/5 shadow-soft flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer flex-shrink-0 group"
                >
                  <div className="w-12 h-12 rounded-full bg-navy/5 group-hover:bg-primary/10 flex items-center justify-center transition-colors duration-300">
                    <span className="font-heading font-bold text-navy/30 group-hover:text-primary text-lg transition-colors duration-300">
                      {name.slice(0, 2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Inline keyframes for auto-scroll */}
          <style>{`
            @keyframes scroll-logos {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .animate-scroll-logos {
              animation: scroll-logos 25s linear infinite;
            }
            .animate-scroll-logos:hover {
              animation-play-state: paused;
            }
          `}</style>
        </section>

        {/* ══════════════════════════════════════════
            12. FINAL CTA
            ══════════════════════════════════════════ */}
        <section className="bg-navy relative py-24 overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-0" />
          <div className="absolute bottom-0 left-[10%] w-72 h-72 bg-gold/8 rounded-full blur-[100px] -z-0" />
          <FloatingRing size={80} color="#C6A96930" className="top-12 left-[8%]" delay={0} />
          <FloatingDiamond size={16} color="#C6A969" className="bottom-20 right-[15%]" delay={1} />
          <DashedCircle size={140} color="#ffffff" className="top-8 right-[20%]" delay={0.5} />

          <div className="container mx-auto px-4 md:px-8 max-w-4xl relative z-10 text-center">
            <motion.div {...fadeUp}>
              <span className="text-gold font-bold uppercase tracking-widest text-xs block mb-4">
                TAKE THE FIRST STEP
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white leading-tight mb-6">
                Let's Build a Better{' '}
                <span className="text-gold">Tomorrow Together</span>
              </h2>
              <p className="text-white/60 text-base md:text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
                Join India's most impactful corporate-NGO partnerships. Your CSR investment with
                Ajaysinh Foundation creates measurable, lasting change in the communities that need it most.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <PremiumButton variant="gold" onClick={scrollToForm} icon={<FiArrowRight />}>
                  Schedule Consultation
                </PremiumButton>
                <PremiumButton variant="outline-white" icon={<FiPhone />}>
                  Call Us Now
                </PremiumButton>
              </div>
            </motion.div>
          </div>
        </section>

      </div>
    </>
  );
};

export default CSRPage;
