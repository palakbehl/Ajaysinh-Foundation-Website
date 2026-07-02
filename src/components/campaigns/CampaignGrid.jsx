import { motion } from 'framer-motion';
import { FiSearch } from 'react-icons/fi';
import CampaignCard from './CampaignCard';

const campaigns = [
  {
    id: 1,
    title: 'Bright Futures Education Program',
    description:
      'Providing quality education, books, and learning resources to underprivileged children.',
    image:
      'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80',
    raised: 1250000,
    goal: 2000000,
    category: 'Education',
    beneficiaries: '350+',
    daysLeft: 45,
    status: 'Active',
  },
  {
    id: 2,
    title: 'Safe Shelter Initiative',
    description:
      'Building and maintaining safe, hygienic, and dignified living spaces for children and elders.',
    image:
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80',
    raised: 1820000,
    goal: 3000000,
    category: 'Elder Care',
    beneficiaries: '120+',
    daysLeft: 60,
    status: 'Active',
  },
  {
    id: 3,
    title: 'Health & Wellness Support',
    description:
      'Organizing health camps, providing medical aid, and ensuring better healthcare access.',
    image:
      'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=600&q=80',
    raised: 875000,
    goal: 1500000,
    category: 'Healthcare',
    beneficiaries: '600+',
    daysLeft: 30,
    status: 'Active',
  },
  {
    id: 4,
    title: 'Nutritious Meals for All',
    description:
      'Distributing nutritious meals to children, elders, and families in need every day.',
    image:
      'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80',
    raised: 960000,
    goal: 1800000,
    category: 'Community Welfare',
    beneficiaries: '2000+',
    daysLeft: 25,
    status: 'Active',
  },
  {
    id: 5,
    title: 'Women Skill Development',
    description:
      'Empowering women with tailoring, handicraft, and digital literacy skills.',
    image:
      'https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&w=600&q=80',
    raised: 450000,
    goal: 800000,
    category: 'Women Empowerment',
    beneficiaries: '200+',
    daysLeft: 90,
    status: 'Active',
  },
  {
    id: 6,
    title: 'Clean Water for Villages',
    description:
      'Installing water purifiers and building wells in water-scarce rural communities.',
    image:
      'https://images.unsplash.com/photo-1594708767771-a7502209ff51?auto=format&fit=crop&w=600&q=80',
    raised: 680000,
    goal: 1200000,
    category: 'Community Welfare',
    beneficiaries: '500+',
    daysLeft: 55,
    status: 'Active',
  },
  {
    id: 7,
    title: 'Inclusive Education Center',
    description:
      'Creating equal learning opportunities for children with disabilities.',
    image:
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80',
    raised: 320000,
    goal: 1000000,
    category: 'Disability Support',
    beneficiaries: '80+',
    daysLeft: 120,
    status: 'Upcoming',
  },
  {
    id: 8,
    title: 'Rural Healthcare Camp',
    description:
      'Providing free medical checkups and medicines to remote rural communities.',
    image:
      'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=600&q=80',
    raised: 1500000,
    goal: 1500000,
    category: 'Healthcare',
    beneficiaries: '1000+',
    daysLeft: 0,
    status: 'Completed',
  },
];

const CampaignGrid = ({
  searchTerm = '',
  category = '',
  status = '',
  sortBy = 'Most Recent',
}) => {
  // Filter logic
  let filtered = campaigns.filter((c) => {
    const matchesSearch =
      !searchTerm ||
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      !category || category === 'All Categories' || c.category === category;

    const matchesStatus =
      !status || status === 'All Status' || c.status === status;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Sort logic
  switch (sortBy) {
    case 'Most Recent':
      filtered = [...filtered].sort((a, b) => b.id - a.id);
      break;
    case 'Most Funded':
      filtered = [...filtered].sort((a, b) => b.raised - a.raised);
      break;
    case 'Ending Soon':
      filtered = [...filtered].sort((a, b) => a.daysLeft - b.daysLeft);
      break;
    case 'Goal: High to Low':
      filtered = [...filtered].sort((a, b) => b.goal - a.goal);
      break;
    default:
      break;
  }

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((campaign, index) => (
              <motion.div
                key={campaign.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: 'easeOut',
                }}
              >
                <CampaignCard campaign={campaign} />
              </motion.div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <FiSearch className="w-8 h-8 text-navy/30" />
            </div>
            <h3 className="text-xl font-heading font-bold text-navy mb-2">
              No campaigns found
            </h3>
            <p className="text-navy/50 text-sm max-w-md">
              We couldn't find any campaigns matching your criteria. Try
              adjusting your filters or search term.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default CampaignGrid;
