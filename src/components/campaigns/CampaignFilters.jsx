import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiFilter } from 'react-icons/fi';

const CampaignFilters = ({
  onSearchChange,
  onCategoryChange,
  onStatusChange,
  onSortChange,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  const [sort, setSort] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearchChange?.(value);
  };

  const handleCategory = (e) => {
    const value = e.target.value;
    setCategory(value);
    onCategoryChange?.(value);
  };

  const handleStatus = (e) => {
    const value = e.target.value;
    setStatus(value);
    onStatusChange?.(value);
  };

  const handleSort = (e) => {
    const value = e.target.value;
    setSort(value);
    onSortChange?.(value);
  };

  const selectBaseClasses =
    'appearance-none bg-cream border border-gray-200 rounded-xl px-4 py-3 text-navy text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-300 cursor-pointer';

  return (
    <motion.section
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white sticky top-20 z-40 shadow-sm border-b border-gray-100"
    >
      <div className="container mx-auto px-4 md:px-8 max-w-7xl py-8">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-navy/40 text-lg" />
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search campaigns..."
              className="w-full bg-cream border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-navy text-sm placeholder:text-navy/40 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-300"
            />
          </div>

          {/* Category Dropdown */}
          <div className="relative w-full lg:w-48">
            <FiFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-navy/40 text-sm pointer-events-none" />
            <select
              value={category}
              onChange={handleCategory}
              className={`${selectBaseClasses} w-full pl-10`}
            >
              <option value="">All Categories</option>
              <option value="Education">Education</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Elder Care">Elder Care</option>
              <option value="Women Empowerment">Women Empowerment</option>
              <option value="Community Welfare">Community Welfare</option>
              <option value="Disability Support">Disability Support</option>
            </select>
            {/* Custom dropdown arrow */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg
                className="w-4 h-4 text-navy/40"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          {/* Status Filter */}
          <div className="relative w-full lg:w-40">
            <select
              value={status}
              onChange={handleStatus}
              className={`${selectBaseClasses} w-full`}
            >
              <option value="">All Status</option>
              <option value="Active">Active</option>
              <option value="Completed">Completed</option>
              <option value="Upcoming">Upcoming</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg
                className="w-4 h-4 text-navy/40"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          {/* Sort Dropdown */}
          <div className="relative w-full lg:w-44">
            <select
              value={sort}
              onChange={handleSort}
              className={`${selectBaseClasses} w-full`}
            >
              <option value="">Most Recent</option>
              <option value="Most Funded">Most Funded</option>
              <option value="Ending Soon">Ending Soon</option>
              <option value="Goal: High to Low">Goal: High to Low</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg
                className="w-4 h-4 text-navy/40"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default CampaignFilters;
