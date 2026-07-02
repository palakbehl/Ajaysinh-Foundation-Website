import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiClock, FiCalendar, FiBookOpen } from 'react-icons/fi';
import PremiumButton from '../ui/PremiumButton';

const FeaturedBlog = ({ blog }) => {
  if (!blog) return null;

  const { id, title, category, excerpt, image, author, date, readTime } = blog;

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="grid lg:grid-cols-12 gap-6 lg:gap-0 bg-white rounded-[3rem] overflow-hidden shadow-soft border border-navy/5 relative"
      >
        {/* Asymmetrical Left Side: Image (7 cols on large screens) */}
        <div className="lg:col-span-7 relative min-h-[350px] lg:h-[520px] overflow-hidden group">
          <img
            src={image}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
          />
          {/* Subtle vignette overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy/30 via-transparent to-transparent" />
          <div className="absolute top-6 left-6 z-10">
            <span className="bg-primary text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full shadow-md">
              Featured Story
            </span>
          </div>
        </div>

        {/* Asymmetrical Right Side: Narrative Panel (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-center p-8 lg:p-14 bg-white relative z-10 lg:-ml-6 lg:rounded-l-[3rem]">
          {/* Category */}
          <span className="text-primary font-bold text-xs uppercase tracking-widest mb-4 block">
            {category}
          </span>

          {/* Title */}
          <Link to={`/blogs/${id}`}>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-navy leading-tight mb-4 hover:text-primary transition-colors duration-300">
              {title}
            </h2>
          </Link>

          {/* Excerpt */}
          <p className="text-navy/60 leading-relaxed mb-6 text-sm md:text-base">
            {excerpt}
          </p>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-5 text-xs text-navy/40 mb-8 pb-6 border-b border-gray-100">
            <span className="flex items-center gap-1.5">
              <FiCalendar className="text-primary" />
              {date}
            </span>
            <span className="flex items-center gap-1.5">
              <FiClock className="text-primary" />
              {readTime}
            </span>
          </div>

          {/* Author & CTA Row */}
          <div className="flex flex-wrap items-center justify-between gap-6 mt-auto">
            {/* Author */}
            <div className="flex items-center gap-3">
              <img
                src={author.avatar}
                alt={author.name}
                className="w-11 h-11 rounded-full object-cover border border-gray-100 shadow-sm"
              />
              <div>
                <p className="font-bold text-navy text-sm leading-tight">{author.name}</p>
                <p className="text-navy/40 text-[10px] uppercase tracking-wider mt-0.5">{author.title}</p>
              </div>
            </div>

            {/* CTA Button */}
            <PremiumButton to={`/blogs/${id}`} variant="primary" size="sm" icon={<FiBookOpen />}>
              Read Full Story
            </PremiumButton>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default FeaturedBlog;
