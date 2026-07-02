import { motion } from 'framer-motion';
import { FiFileText, FiClock, FiImage, FiUsers, FiHelpCircle, FiCheckCircle, FiBookOpen, FiHome } from 'react-icons/fi';
import { DotGrid } from '../ui/FloatingShapes';

const iconMap = {
  Users: FiUsers,
  BookOpen: FiBookOpen,
  Home: FiHome,
  Clock: FiClock
};

const tabs = [
  { label: 'About Campaign', icon: FiFileText, active: true },
  { label: 'Updates', icon: FiClock },
  { label: 'Gallery', icon: FiImage },
  { label: 'Donors', icon: FiUsers },
  { label: 'FAQs', icon: FiHelpCircle },
];

const CampaignOverview = ({ overview }) => {
  if (!overview) return null;

  const { text, checklist = [], stats = [] } = overview;

  return (
    <div>
      {/* Tab navigation */}
      <motion.div
        initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.5 }}
        className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 border-b border-gray-100 scrollbar-hide"
      >
        {tabs.map((tab) => (
          <button
            key={tab.label}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
              tab.active
                ? 'bg-navy text-white shadow-soft'
                : 'text-navy/50 hover:text-navy hover:bg-gray-50'
            }`}
          >
            <tab.icon className="text-sm" />
            {tab.label}
          </button>
        ))}
      </motion.div>

      {/* Content */}
      <div className="grid lg:grid-cols-5 gap-10">
        {/* Left: About */}
        <motion.div
          initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="lg:col-span-3"
        >
          <h2 className="text-2xl font-heading font-bold text-navy mb-6">About the Campaign</h2>
          <p className="text-navy/60 leading-relaxed mb-6">
            {text}
          </p>

          <div className="space-y-3 mb-8">
            {checklist.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -15 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="flex items-start gap-3"
              >
                <FiCheckCircle className="text-primary mt-0.5 flex-shrink-0" />
                <span className="text-navy/70 text-sm">{item}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.3 }}
            className="rounded-2xl overflow-hidden shadow-soft"
          >
            <img
              src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80"
              alt="Classroom support"
              className="w-full h-56 object-cover"
            />
          </motion.div>
        </motion.div>

        {/* Right: Impact card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <div className="bg-cream rounded-[2rem] p-7 relative overflow-hidden">
            <DotGrid className="absolute top-4 right-4" cols={3} rows={3} color="#C6A969" />
            <h3 className="text-xl font-heading font-bold text-navy mb-6 relative z-10">Campaign Impact</h3>
            <div className="grid grid-cols-2 gap-5 relative z-10">
              {stats.map((stat, i) => {
                const IconComponent = iconMap[stat.icon] || FiUsers;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.15 }}
                    className="flex items-start gap-3"
                  >
                    <div className={`w-10 h-10 rounded-full ${stat.bg} flex items-center justify-center flex-shrink-0`}>
                      <IconComponent className={`${stat.color} text-sm`} />
                    </div>
                    <div>
                      <p className="text-navy font-bold text-xl font-heading">{stat.value}</p>
                      <p className="text-navy/50 text-xs">{stat.label}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CampaignOverview;
