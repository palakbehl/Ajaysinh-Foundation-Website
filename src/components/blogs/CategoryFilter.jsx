import { motion } from 'framer-motion';

const categories = [
  'All Stories',
  'Child Welfare',
  'Education',
  'Elder Care',
  'Healthcare',
  'Women Empowerment',
  'Disability Support',
  'Community Stories',
  'NGO Updates'
];

const CategoryFilter = ({ activeCategory, onSelectCategory }) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 py-6 max-w-5xl mx-auto px-4">
      {categories.map((category) => {
        const isActive = activeCategory === category;
        return (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className="relative px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 overflow-hidden cursor-pointer"
          >
            {/* Background pill animation */}
            {isActive && (
              <motion.span
                layoutId="activeCategoryPill"
                className="absolute inset-0 bg-primary"
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              />
            )}
            
            <span
              className={`relative z-10 transition-colors duration-300 ${
                isActive ? 'text-white' : 'text-navy/60 hover:text-navy'
              }`}
            >
              {category}
            </span>

            {/* Subtle border outline for inactive buttons */}
            {!isActive && (
              <span className="absolute inset-0 rounded-full border border-navy/10 hover:border-primary/30 transition-colors duration-300" />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default CategoryFilter;
