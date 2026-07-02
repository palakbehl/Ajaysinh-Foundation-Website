import { motion } from 'framer-motion';
import { FaFacebookF, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import { FloatingCircle, FloatingLeaf, FloatingRing, DotGrid, FloatingCross, FloatingDiamond, DashedCircle } from '../ui/FloatingShapes';

const teamMembers = [
  {
    name: 'Ajaysinh Jadeja',
    role: 'Founder & Chairman',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    socials: { facebook: '#', linkedin: '#', twitter: '#' },
  },
  {
    name: 'Meera Patel',
    role: 'Director of Operations',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    socials: { facebook: '#', linkedin: '#', twitter: '#' },
  },
  {
    name: 'Arjun Sharma',
    role: 'Head of Programs',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    socials: { facebook: '#', linkedin: '#', twitter: '#' },
  },
  {
    name: 'Kavita Singh',
    role: 'Community Lead',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80',
    socials: { facebook: '#', linkedin: '#', twitter: '#' },
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const TeamSection = () => {
  return (
    <section className="py-24 md:py-32 bg-cream relative overflow-hidden">
      {/* Floating Decorative Elements */}
      <FloatingCircle size={70} color="#DCE8E2" className="top-16 left-[5%] opacity-40" delay={0} />
      <FloatingLeaf size={45} color="#0B4F3A" className="top-[12%] right-[6%]" delay={1.2} />
      <DotGrid className="absolute bottom-24 left-[3%]" cols={6} rows={6} color="#C6A969" />
      <FloatingRing size={90} color="#C6A969" className="top-[60%] right-[3%]" delay={0.5} />
      <FloatingCross size={18} color="#C6A969" className="top-[30%] left-[10%]" delay={1.5} />
      <FloatingDiamond size={14} color="#0B4F3A" className="bottom-[20%] right-[12%]" delay={2} />
      <DashedCircle size={110} color="#0B4F3A" className="bottom-10 right-[40%]" delay={0} />

      {/* Background blur blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sage/30 rounded-full blur-3xl -z-0"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-beige/40 rounded-full blur-3xl -z-0"></div>

      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-bold tracking-widest text-xs uppercase mb-4 block">
            OUR TEAM
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-navy">
            The People Behind the Mission
          </h2>
        </motion.div>

        {/* Team Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              variants={cardVariants}
              className="group"
            >
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="bg-white rounded-[2rem] shadow-soft overflow-hidden"
              >
                {/* Image */}
                <div className="aspect-square overflow-hidden rounded-t-[2rem]">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-6 text-center">
                  <h3 className="font-heading font-bold text-navy text-lg mb-1">
                    {member.name}
                  </h3>
                  <p className="text-navy/60 text-sm mb-4">{member.role}</p>

                  {/* Social Icons — visible on hover */}
                  <div className="flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <a
                      href={member.socials.facebook}
                      aria-label={`${member.name} Facebook`}
                      className="w-9 h-9 rounded-full bg-sage flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors duration-300"
                    >
                      <FaFacebookF size={15} />
                    </a>
                    <a
                      href={member.socials.linkedin}
                      aria-label={`${member.name} LinkedIn`}
                      className="w-9 h-9 rounded-full bg-sage flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors duration-300"
                    >
                      <FaLinkedinIn size={15} />
                    </a>
                    <a
                      href={member.socials.twitter}
                      aria-label={`${member.name} Twitter`}
                      className="w-9 h-9 rounded-full bg-sage flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors duration-300"
                    >
                      <FaTwitter size={15} />
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;
