import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiClock, FiCalendar, FiArrowRight } from 'react-icons/fi';

const BlogCard = ({ blog }) => {
  const { id, title, category, excerpt, image, author, date, readTime } = blog;

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="bg-white rounded-[2rem] overflow-hidden shadow-soft hover:shadow-xl transition-all duration-500 flex flex-col h-full group"
    >
      {/* Layered Image Frame */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        {/* Soft elegant gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Category tag */}
        <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold text-primary uppercase tracking-wider shadow-sm">
          {category}
        </span>
      </div>

      {/* Content Area */}
      <div className="p-8 flex flex-col flex-grow">
        {/* Title */}
        <Link to={`/blogs/${id}`}>
          <h3 className="text-xl font-heading font-bold text-navy line-clamp-2 mb-3 group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
        </Link>

        {/* Excerpt */}
        <p className="text-navy/60 text-sm line-clamp-3 mb-6 leading-relaxed flex-grow">
          {excerpt}
        </p>

        {/* Author Metadata */}
        <div className="flex items-center gap-3 pt-5 border-t border-gray-100 mb-6">
          <img
            src={author.avatar}
            alt={author.name}
            className="w-10 h-10 rounded-full object-cover border border-gray-100"
          />
          <div>
            <p className="font-semibold text-navy text-xs leading-tight">{author.name}</p>
            <p className="text-navy/40 text-[10px] uppercase tracking-wider mt-0.5">{author.title}</p>
          </div>
        </div>

        {/* Card Footer with Details */}
        <div className="flex items-center justify-between text-xs text-navy/45 mt-auto">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <FiCalendar className="text-primary" />
              {date}
            </span>
            <span className="flex items-center gap-1.5">
              <FiClock className="text-primary" />
              {readTime}
            </span>
          </div>

          <Link
            to={`/blogs/${id}`}
            className="flex items-center gap-1 text-primary font-bold group-hover:text-gold transition-colors duration-300 cursor-pointer"
          >
            Read More
            <FiArrowRight className="transition-transform group-hover:translate-x-1 duration-300" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogCard;
