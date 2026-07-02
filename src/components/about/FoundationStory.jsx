import { motion } from 'framer-motion';
import { FiHeart, FiAward } from 'react-icons/fi';
import { DotGrid, FloatingCircle, FloatingRing, FloatingLeaf, FloatingCross, DashedCircle, FloatingDiamond } from '../ui/FloatingShapes';

const FoundationStory = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay: i * 0.15, ease: 'easeOut' },
    }),
  };

  return (
    <section className="relative py-24 md:py-32 bg-white overflow-hidden">
      {/* Floating Decorative Elements */}
      <FloatingCircle size={90} color="#DCE8E2" className="top-20 right-[5%] opacity-40" delay={0} />
      <FloatingRing size={70} color="#C6A969" className="bottom-32 left-[3%]" delay={1} />
      <FloatingLeaf size={45} color="#0B4F3A" className="top-[40%] right-[3%]" delay={0.5} />
      <FloatingCross size={16} color="#C6A969" className="top-28 left-[45%]" delay={2} />
      <DashedCircle size={130} color="#0D1B2A" className="bottom-16 right-[10%]" delay={0} />
      <DotGrid className="absolute bottom-24 left-[6%]" cols={4} rows={4} color="#0B4F3A" />
      <FloatingDiamond size={12} color="#0B4F3A" className="top-[30%] left-[50%]" delay={1.5} />

      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={fadeUp}
          className="mb-16 md:mb-20"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="w-12 h-0.5 bg-gold" />
            <span className="text-gold font-semibold uppercase tracking-wider text-sm">
              Our Story
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-navy">
            A Journey of Hope & Impact
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">
          {/* Left — Image Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {/* Image 1 — top left, slightly offset up */}
              <motion.div
                variants={fadeUp}
                custom={0}
                className="relative -mt-4 md:-mt-8"
              >
                <div className="rounded-[1.5rem] overflow-hidden shadow-float group">
                  <img
                    src="https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&w=600&q=80"
                    alt="Community members collaborating on a project"
                    className="w-full h-64 md:h-80 object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </motion.div>

              {/* Image 2 — top right, offset down */}
              <motion.div
                variants={fadeUp}
                custom={1}
                className="relative mt-6 md:mt-10"
              >
                <div className="rounded-[1.5rem] overflow-hidden shadow-float group">
                  <img
                    src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80"
                    alt="Children learning in a classroom"
                    className="w-full h-64 md:h-80 object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </motion.div>
            </div>

            {/* Decorative Green Service Card */}
            <motion.div
              variants={fadeUp}
              custom={2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:-bottom-8 md:right-8 z-20"
            >
              <div className="bg-primary text-white px-6 py-4 rounded-2xl shadow-float flex items-center gap-4">
                <div className="w-12 h-12 bg-white/15 rounded-full flex items-center justify-center">
                  <FiAward className="text-xl text-gold" />
                </div>
                <div>
                  <p className="text-2xl font-heading font-bold">15+</p>
                  <p className="text-sm text-white/80 font-medium">Years of Service</p>
                </div>
              </div>
            </motion.div>

            {/* Decorative border accent */}
            <div className="absolute -bottom-4 -left-4 w-48 h-48 rounded-[1.5rem] border-2 border-primary/10 -z-10" />
          </motion.div>

          {/* Right — Story Text */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="space-y-6"
          >
            <motion.div variants={fadeUp} custom={0} className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <FiHeart className="text-lg" />
              </div>
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                Where It All Began
              </span>
            </motion.div>

            <motion.p
              variants={fadeUp}
              custom={1}
              className="text-lg text-navy/75 leading-relaxed"
            >
              What began as a humble initiative by a small group of compassionate individuals has grown into a movement 
              touching thousands of lives. The Ajaysinh Foundation was born out of a deep-rooted desire to serve the 
              most vulnerable — the children who lacked access to education, the elderly abandoned by society, and 
              families struggling to meet their most basic needs.
            </motion.p>

            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-lg text-navy/75 leading-relaxed"
            >
              In the early days, our founders would visit rural communities, organize health camps, and run 
              makeshift schools under trees. Every act of kindness, no matter how small, reinforced the belief 
              that change is possible when people come together with purpose. Through dedication and the 
              generosity of our supporters, we expanded our reach across multiple states.
            </motion.p>

            <motion.p
              variants={fadeUp}
              custom={3}
              className="text-lg text-navy/75 leading-relaxed"
            >
              Today, the Ajaysinh Foundation stands as a beacon of hope for thousands. From building schools 
              and medical centers to running sustainable livelihood programs, every effort is driven by a single 
              vision — a world where no one is left behind. Our journey is far from over, and with your support, 
              we continue to write new chapters of impact and transformation.
            </motion.p>

            {/* Signature-style accent */}
            <motion.div
              variants={fadeUp}
              custom={4}
              className="pt-6 border-t border-gray-100 flex items-center gap-4"
            >
              <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center">
                <span className="text-gold font-heading text-2xl font-bold">A</span>
              </div>
              <div>
                <p className="font-heading font-bold text-navy text-lg">Ajaysinh Foundation</p>
                <p className="text-sm text-navy/50">Building a Better Tomorrow</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FoundationStory;
