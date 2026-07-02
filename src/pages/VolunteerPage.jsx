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

import VolunteerCard from '../components/volunteer/VolunteerCard';
import Timeline from '../components/volunteer/Timeline';
import FAQAccordion from '../components/volunteer/FAQAccordion';
import TestimonialSlider from '../components/volunteer/TestimonialSlider';
import VolunteerForm from '../components/volunteer/VolunteerForm';
import PremiumButton from '../components/ui/PremiumButton';
import {
  FloatingCircle, FloatingRing, FloatingLeaf, DotGrid,
  FloatingCross, FloatingDiamond, DashedCircle
} from '../components/ui/FloatingShapes';

/* ─── static data ─────────────────────────────────── */

const stats = [
  { value: '1,250+', label: 'Active Volunteers', desc: 'Direct changemakers on-ground', icon: FiUsers },
  { value: '85+', label: 'Communities Supported', desc: 'Rural village sites transformed', icon: FiMapPin },
  { value: '12,450+', label: 'Hours Contributed', desc: 'Total dedicated volunteer hours', icon: FiClock },
  { value: '150+', label: 'Campaigns Conducted', desc: 'Across education, health & sustainability', icon: FiStar }
];

const opportunities = [
  { title: 'Teaching & Education', desc: 'Help children learn, grow, and build a better future in rural schools.', commitment: '4-6 hrs/week', icon: FiBookOpen },
  { title: 'Healthcare Camps', desc: 'Support medical camps and health awareness drives in underserved areas.', commitment: 'Flexible weekends', icon: FiActivity },
  { title: 'Food Distribution', desc: 'Be a part of our food distribution and relief efforts across tribal villages.', commitment: '3-4 hrs/week', icon: FiDroplet },
  { title: 'Elder Care Support', desc: 'Spend time with elders in shelter homes and bring happiness to their lives.', commitment: '2-4 hrs/week', icon: FiHeart },
  { title: 'Event Management', desc: 'Assist in organizing corporate partnerships, fundraising drives, and active campaigns.', commitment: 'Project-based', icon: FiAward },
  { title: 'Social Media & Design', desc: 'Use your creative skills to spread awareness and design visual stories.', commitment: 'Remote, 3-5 hrs/week', icon: FiGlobe },
  { title: 'Fundraising Support', desc: 'Collaborate on outreach proposals and corporate sponsorship connections.', commitment: 'Flexible', icon: FiTrendingUp },
  { title: 'Rural Development', desc: 'Engage in infrastructure drives, solar wells, and clean sanitation projects.', commitment: 'Weekend field trips', icon: FiSun }
];

const benefits = [
  { title: 'Real-World Impact', desc: 'Be the direct reason someone smiles and empower communities on the ground.', icon: FiHeart },
  { title: 'Skill Development', desc: 'Sharpen your communication, project coordination, and field execution skills.', icon: FiTrendingUp },
  { title: 'Leadership Experience', desc: 'Lead local volunteer squads and direct impactful developmental projects.', icon: FiAward },
  { title: 'Networking Opportunities', desc: 'Connect with like-minded changemakers, leaders, and corporate sponsors.', icon: FiUsers },
  { title: 'Certificate of Participation', desc: 'Receive validated experience credentials and letters of recommendation.', icon: FiFileText },
  { title: 'Personal Growth', desc: 'Experience deep self-fulfillment while contributing to national social changes.', icon: FiShield }
];

const testimonials = [
  {
    name: 'Riya Shah',
    role: 'Education Volunteer',
    campaign: 'Bright Futures Campaign',
    quote: 'Volunteering with Ajaysinh Foundation has been a life-changing experience. It feels amazing to be part of something so meaningful.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    city: 'Patna'
  },
  {
    name: 'Amit Kumar',
    role: 'Medical Camp Volunteer',
    campaign: 'Rural Wellness Drives',
    quote: 'Being a medical coordinator, I was able to distribute basic health kits and teach hygiene rules. The smiles of the village children are unforgettable.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    city: 'Gaya'
  },
  {
    name: 'Sneha Gupta',
    role: 'Livelihood Volunteer',
    campaign: 'Women Tailoring Center',
    quote: 'Helping rural women set up micro tailoring shops helped me realize the absolute power of vocational training. Truly inspiring ground coordination!',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80',
    city: 'Muzaffarpur'
  }
];

const galleryImages = [
  'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1594708767771-a7502209ff51?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&w=400&q=80'
];

const faqs = [
  { question: 'Do I need prior experience to volunteer?', answer: 'No prior experience is required! We provide comprehensive field-level toolkits and orientation training to guide you through your selected program.' },
  { question: 'Is volunteering remote or onsite?', answer: 'We offer both options! Opportunities like social media marketing, design, and fundraising are completely remote, while education, medical camps, and infrastructure drives are onsite.' },
  { question: 'Will I receive a certificate of participation?', answer: 'Yes! Volunteers who complete a minimum of 20 hours of service receive official certificates and letters of recommendation from Ajaysinh Foundation.' },
  { question: 'What is the minimum age to volunteer?', answer: 'The minimum age to register is 14. For onsite field campaigns, volunteers under 18 must provide written parental consent.' },
  { question: 'What is the minimum time commitment?', answer: 'Time commitments vary by category, starting from just 2 to 4 hours per week. You can align schedules flexibly around weekends or weekdays.' }
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
   VOLUNTEER PAGE
   ═══════════════════════════════════════════════════ */
const VolunteerPage = () => {
  const formRef = useRef(null);
  const opportunitiesRef = useRef(null);

  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: 'smooth' });
  const scrollToOpportunities = () => opportunitiesRef.current?.scrollIntoView({ behavior: 'smooth' });

  return (
    <>
      <Helmet>
        <title>Become a Volunteer | Ajaysinh Foundation</title>
        <meta name="description" content="Join hands with Ajaysinh Foundation as a volunteer to support underprivileged education, medical wellness drives, and rural sanitation campaigns in Bihar, India." />
      </Helmet>

      <div className="bg-soft-cream min-h-screen overflow-hidden">

        {/* ══════════════════════════════════════════
            1. HERO SECTION
            ══════════════════════════════════════════ */}
        <section className="bg-cream relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
          {/* Decorative background vectors */}
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
              <span className="text-primary font-bold">Volunteer</span>
            </motion.nav>

            {/* Grid composition layout */}
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Headlines */}
              <div className="lg:col-span-5 max-w-xl">
                <motion.span
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-primary uppercase tracking-widest text-xs font-bold mb-3 block"
                >
                  JOIN OUR MISSION
                </motion.span>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-navy leading-tight mb-5"
                >
                  Become a <span className="text-primary">Volunteer</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-navy/60 text-lg leading-relaxed mb-8"
                >
                  Join hands with Ajaysinh Foundation and help create meaningful impact in communities that need support.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex flex-wrap gap-4"
                >
                  <PremiumButton onClick={scrollToForm} icon={<FiArrowRight />}>
                    Join Now
                  </PremiumButton>
                  <PremiumButton variant="outline" onClick={scrollToOpportunities}>
                    Explore Opportunities
                  </PremiumButton>
                </motion.div>
              </div>

              {/* Right Column: Hero Collage */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-7 relative flex justify-center"
              >
                <div className="relative w-full max-w-[540px] aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-float">
                  <img
                    src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=600&q=80"
                    alt="Volunteers smiling together"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/35 to-transparent" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            2. WHY VOLUNTEER SECTION
            ══════════════════════════════════════════ */}
        <section className="bg-white py-20 relative overflow-hidden">
          <FloatingCircle size={50} color="#DCE8E230" className="top-16 right-[8%]" delay={0} />

          <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Side: Overlapping Image Cards */}
              <motion.div {...fadeUp} className="relative">
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-8 rounded-[2rem] overflow-hidden shadow-soft aspect-[4/3] relative group">
                    <img
                      src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=500&q=80"
                      alt="Volunteers interacting with kids"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="col-span-4 rounded-[2rem] overflow-hidden shadow-soft aspect-[3/4] translate-y-8 relative group">
                    <img
                      src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=400&q=80"
                      alt="Volunteer teaching"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Right Side: Text Narrative */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <span className="text-primary font-bold uppercase tracking-widest text-xs block mb-3">
                  WHY VOLUNTEER?
                </span>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy leading-tight mb-6">
                  Small Efforts, <span className="text-primary">Big Impact</span>
                </h2>
                <p className="text-navy/60 text-base md:text-lg leading-relaxed mb-8">
                  Your time, skills, and compassion can bring smiles, hope, and a better tomorrow to those
                  who need it the most. We believe every individual has the capacity to spark positive transformation on the ground.
                </p>

                <div className="space-y-4">
                  {[
                    'Be the reason for someone\'s smile',
                    'Empower communities and change lives',
                    'Grow while you give back to society'
                  ].map((bullet, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <FiCheckCircle className="text-primary text-xl mt-0.5 flex-shrink-0" />
                      <p className="text-navy/75 font-medium">{bullet}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            3. VOLUNTEER IMPACT STATISTICS SECTION
            ══════════════════════════════════════════ */}
        <section className="bg-cream py-16 relative overflow-hidden">
          <FloatingRing size={90} color="#C6A96920" className="top-6 left-[5%]" delay={0} />

          <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="bg-white/95 backdrop-blur-md border border-white/50 rounded-3xl p-6 md:p-8 flex items-center gap-5 shadow-soft relative overflow-hidden group hover:shadow-md transition-all duration-300"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl -z-0" />
                  <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center flex-shrink-0 relative z-10 group-hover:scale-105 transition-transform">
                    <stat.icon className="text-2xl" />
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-3xl md:text-4xl font-heading font-bold text-navy leading-none mb-1">
                      {stat.value}
                    </h3>
                    <p className="font-semibold text-navy text-sm mb-0.5">
                      {stat.label}
                    </p>
                    <p className="text-navy/45 text-[11px] leading-tight">
                      {stat.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            4. VOLUNTEER OPPORTUNITIES SECTION
            ══════════════════════════════════════════ */}
        <section ref={opportunitiesRef} className="bg-white py-20 relative overflow-hidden">
          <FloatingCross size={16} color="#C6A969" className="top-20 right-[12%]" delay={0} />
          <DotGrid className="absolute bottom-16 left-[4%]" cols={3} rows={4} color="#0B4F3A" />

          <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
            <SectionHeader tagline="VOLUNTEER OPPORTUNITIES" title="Find Your Ways to Make a Difference" />

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {opportunities.map((opp, idx) => (
                <VolunteerCard
                  key={idx}
                  title={opp.title}
                  desc={opp.desc}
                  icon={opp.icon}
                  commitment={opp.commitment}
                  onApply={scrollToForm}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            5. HOW VOLUNTEERING WORKS SECTION
            ══════════════════════════════════════════ */}
        <section className="bg-cream py-20 relative overflow-hidden">
          <FloatingRing size={60} color="#C6A96925" className="top-16 left-[8%]" delay={0.5} />

          <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
            <SectionHeader tagline="HOW VOLUNTEERING WORKS" title="Simple Steps, Lasting Impact" />
            <Timeline />
          </div>
        </section>

        {/* ══════════════════════════════════════════
            6. VOLUNTEER STORIES SECTION
            ══════════════════════════════════════════ */}
        <section className="bg-white py-20 relative overflow-hidden">
          <FloatingLeaf size={45} color="#0B4F3A" className="top-20 right-[10%]" delay={1} />

          <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
            <SectionHeader tagline="VOLUNTEER STORIES" title="Voices of Change" />
            <TestimonialSlider testimonials={testimonials} />
          </div>
        </section>

        {/* ══════════════════════════════════════════
            7. BENEFITS OF VOLUNTEERING SECTION
            ══════════════════════════════════════════ */}
        <section className="bg-cream py-20 relative overflow-hidden">
          <FloatingDiamond size={14} color="#0B4F3A" className="top-24 left-[15%]" delay={0.5} />

          <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
            <SectionHeader tagline="BENEFITS OF VOLUNTEERING" title="Gain Value While Giving Support" />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((item, idx) => (
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
            8. GALLERY SECTION
            ══════════════════════════════════════════ */}
        <section className="bg-white py-20 relative overflow-hidden">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
            <SectionHeader tagline="GALLERY" title="Moments That Matter" />

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {galleryImages.map((src, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="rounded-3xl overflow-hidden aspect-[4/3] shadow-soft group relative cursor-pointer"
                >
                  <img
                    src={src}
                    alt="Volunteer field gallery"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            9. VOLUNTEER REGISTRATION FORM SECTION
            ══════════════════════════════════════════ */}
        <section ref={formRef} className="bg-cream py-20 relative overflow-hidden">
          <DashedCircle size={100} color="#0D1B2A" className="top-10 right-[4%]" delay={0} />

          <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Form Sidebar info */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <span className="text-primary font-bold uppercase tracking-widest text-xs block mb-3">
                  BECOME A VOLUNTEER
                </span>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy leading-tight mb-6">
                  Join Our Mission
                </h2>
                <p className="text-navy/60 text-base md:text-lg leading-relaxed mb-10">
                  Fill out our online volunteer registration form. Our dedicated coordinator team will
                  review your application and invite you for orientation within 48 hours.
                </p>

                {/* Info block */}
                <div className="bg-white rounded-[2rem] p-8 border border-navy/5 shadow-soft max-w-md">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
                    <FiHeart className="text-xl" />
                  </div>
                  <h4 className="font-heading font-bold text-navy text-lg mb-2">
                    Your time can change lives.
                  </h4>
                  <p className="text-navy/60 text-sm leading-relaxed">
                    Together, we can build a better tomorrow through compassion, service, and collective action.
                  </p>
                </div>
              </motion.div>

              {/* Stateful React Hook Form with Zod Validation */}
              <VolunteerForm />
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            10. FAQ SECTION
            ══════════════════════════════════════════ */}
        <section className="bg-white py-20 relative overflow-hidden">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
            <SectionHeader tagline="FREQUENTLY ASKED QUESTIONS" title="Everything You Need to Know" />
            <FAQAccordion faqs={faqs} />
          </div>
        </section>

        {/* ══════════════════════════════════════════
            11. FINAL CTA SECTION
            ══════════════════════════════════════════ */}
        <section className="bg-navy relative py-24 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-0" />
          <div className="absolute bottom-0 left-[10%] w-72 h-72 bg-gold/8 rounded-full blur-[100px] -z-0" />
          <FloatingRing size={80} color="#C6A96930" className="top-12 left-[8%]" delay={0} />

          <div className="container mx-auto px-4 md:px-8 max-w-4xl relative z-10 text-center">
            <motion.div {...fadeUp}>
              <span className="text-gold font-bold uppercase tracking-widest text-xs block mb-4">
                BE THE CHANGE
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white leading-tight mb-6">
                Your time and effort can change lives.
              </h2>
              <p className="text-white/60 text-base md:text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
                Join our family of 1,250+ active volunteers today. If you are unable to volunteer onsite,
                consider making a small donation to support our programs.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <PremiumButton variant="gold" onClick={scrollToForm} icon={<FiArrowRight />}>
                  Register as Volunteer
                </PremiumButton>
                <PremiumButton variant="outline-white" to="/donate" icon={<FiHeart />}>
                  Donate Instead
                </PremiumButton>
              </div>
            </motion.div>
          </div>
        </section>

      </div>
    </>
  );
};

export default VolunteerPage;
