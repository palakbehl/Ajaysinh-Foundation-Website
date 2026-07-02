import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiHome,
  FiChevronRight,
  FiClock,
  FiCalendar,
  FiShare2,
  FiSearch,
  FiHeart,
  FiArrowRight,
  FiBookOpen,
  FiAlertCircle
} from 'react-icons/fi';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';
import { getBlogById, blogs } from '../data/blogs';

const BlogDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const blog = getBlogById(id);

  // Search input state
  const [searchQuery, setSearchQuery] = useState('');

  // Handle Search Widget redirection
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    // Redirect to main blogs page with a search query or category state
    navigate(`/blogs?search=${encodeURIComponent(searchQuery)}`);
  };

  // 404 Fallback
  if (!blog) {
    return (
      <div className="pt-32 pb-24 min-h-screen flex flex-col items-center justify-center text-center px-4 bg-cream">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6 text-red-500">
          <FiAlertCircle className="w-10 h-10" />
        </div>
        <h1 className="text-4xl font-heading font-bold text-navy mb-4">Article Not Found</h1>
        <p className="text-navy/60 max-w-md mb-8">
          The article you are looking for does not exist or has been removed. Explore our other stories of hope and community transformation.
        </p>
        <Link
          to="/blogs"
          className="flex items-center gap-2 bg-primary hover:bg-primary/95 text-white font-bold px-6 py-3 rounded-xl shadow-lg transition-all cursor-pointer"
        >
          <FiArrowRight /> Back to Our Blogs
        </Link>
      </div>
    );
  }

  const { title, category, excerpt, image, author, date, readTime, quote, content } = blog;

  // Filter out the current article to show 3 other latest posts in the sidebar
  const latestPosts = blogs
    .filter((b) => b.id !== blog.id)
    .slice(0, 3);

  return (
    <>
      <Helmet>
        <title>{title} | Ajaysinh Foundation Blogs</title>
        <meta name="description" content={excerpt} />
      </Helmet>

      <div className="bg-soft-cream min-h-screen pt-28 pb-16 md:pt-36">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          
          {/* ==========================================
              BREADCRUMBS (Matching screenshot design)
              ========================================== */}
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-xs md:text-sm mb-6 flex-wrap text-navy/55"
          >
            <Link to="/" className="hover:text-primary transition-colors flex items-center gap-1">
              <FiHome className="text-xs" /> Home
            </Link>
            <FiChevronRight className="text-navy/25 text-xs" />
            <Link to="/blogs" className="hover:text-primary transition-colors">Our Blogs</Link>
            <FiChevronRight className="text-navy/25 text-xs" />
            <span className="text-primary font-bold line-clamp-1">{title}</span>
          </motion.nav>

          {/* Dynamic Article Layout */}
          <div className="grid lg:grid-cols-12 gap-10 mt-8 items-start">
            
            {/* ==========================================
                LEFT: RICH ARTICLE COLUMN (8 columns)
                ========================================== */}
            <article className="lg:col-span-8 bg-white rounded-[2.5rem] p-6 md:p-12 shadow-soft border border-navy/5">
              
              {/* Category Badge */}
              <div className="mb-4">
                <span className="bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full">
                  {category}
                </span>
              </div>

              {/* Editorial Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-navy leading-tight mb-5">
                {title}
              </h1>

              {/* Subheading Excerpt */}
              <p className="text-navy/60 text-base md:text-lg italic leading-relaxed mb-6 border-l-4 border-gold pl-4">
                {excerpt}
              </p>

              {/* Author & Publication Details Row */}
              <div className="flex flex-wrap items-center justify-between gap-6 py-5 border-y border-gray-100 mb-8">
                <div className="flex items-center gap-3">
                  <img
                    src={author.avatar}
                    alt={author.name}
                    className="w-12 h-12 rounded-full object-cover border border-gray-150"
                  />
                  <div>
                    <p className="font-bold text-navy text-sm">{author.name}</p>
                    <p className="text-navy/40 text-[10px] uppercase tracking-wider mt-0.5">{author.title}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-xs text-navy/45">
                  <span className="flex items-center gap-1.5">
                    <FiCalendar className="text-primary" />
                    {date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <FiClock className="text-primary" />
                    {readTime}
                  </span>
                </div>
              </div>

              {/* Large Cover Image */}
              <div className="rounded-[2rem] overflow-hidden shadow-soft mb-10 max-h-[460px]">
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Rich Body Content paragraphs */}
              <div className="prose max-w-none text-navy/70 space-y-6 leading-relaxed">
                {content.map((block, idx) => {
                  if (block.type === 'paragraph') {
                    return <p key={idx} className="text-sm md:text-base">{block.text}</p>;
                  }
                  if (block.type === 'heading') {
                    return (
                      <h3 key={idx} className="text-xl md:text-2xl font-heading font-bold text-navy mt-10 mb-4">
                        {block.text}
                      </h3>
                    );
                  }
                  return null;
                })}
              </div>

              {/* Dynamically Loaded Editorial Pull-Quote */}
              {quote && (
                <div className="my-10 bg-cream/60 rounded-3xl p-8 border-l-4 border-primary relative overflow-hidden">
                  <span className="absolute top-2 right-6 text-primary/10 text-8xl font-heading select-none leading-none">"</span>
                  <p className="font-heading text-navy italic text-lg leading-relaxed relative z-10 mb-2">
                    "{quote}"
                  </p>
                  <p className="text-xs uppercase tracking-wider font-bold text-navy/45">— {author.name}</p>
                </div>
              )}

              {/* Social Share Article Widgets */}
              <div className="flex items-center gap-4 pt-8 border-t border-gray-100 mt-10">
                <span className="text-xs uppercase tracking-wider font-bold text-navy/45 flex items-center gap-2">
                  <FiShare2 className="text-primary" /> Share this article:
                </span>
                <div className="flex gap-2">
                  {[
                    { icon: FaFacebookF, href: '#', bg: 'bg-[#3b5998]' },
                    { icon: FaTwitter, href: '#', bg: 'bg-[#1da1f2]' },
                    { icon: FaLinkedinIn, href: '#', bg: 'bg-[#0077b5]' },
                    { icon: FaWhatsapp, href: '#', bg: 'bg-[#25d366]' }
                  ].map((social, i) => (
                    <a
                      key={i}
                      href={social.href}
                      className={`w-8 h-8 rounded-full ${social.bg} text-white flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-sm`}
                    >
                      <social.icon className="text-xs" />
                    </a>
                  ))}
                </div>
              </div>
            </article>

            {/* ==========================================
                RIGHT: SIDEBAR WIDGETS COLUMN (4 columns)
                ========================================== */}
            <aside className="lg:col-span-4 space-y-8">
              
              {/* Widget 1: Search blogs input */}
              <div className="bg-white rounded-[2rem] p-6 shadow-soft border border-navy/5">
                <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search blogs..."
                    className="w-full bg-soft-cream/80 border border-gray-200 rounded-2xl py-3.5 pl-4 pr-12 text-navy text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center hover:bg-primary/95 transition-colors cursor-pointer"
                  >
                    <FiSearch className="text-sm" />
                  </button>
                </form>
              </div>

              {/* Widget 2: About A Jaysinh Foundation Card */}
              <div className="bg-white rounded-[2rem] p-8 shadow-soft border border-navy/5 relative overflow-hidden">
                <div className="absolute -top-12 -right-12 w-28 h-28 bg-primary/5 rounded-full pointer-events-none" />
                
                <h4 className="font-heading font-bold text-navy text-lg mb-4">
                  About A Jaysinh Foundation
                </h4>
                <p className="text-navy/60 text-sm leading-relaxed mb-6">
                  We work towards creating a world where every individual has access to basic needs, quality education, healthcare, and a life of dignity.
                </p>
                
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary/95 text-white font-bold px-6 py-3 rounded-full text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
                >
                  Learn More About Us <FiArrowRight className="text-xs" />
                </Link>
              </div>

              {/* Widget 3: Latest Posts dynamic feed */}
              <div className="bg-white rounded-[2rem] p-8 shadow-soft border border-navy/5">
                <h4 className="font-heading font-bold text-navy text-lg mb-6 pb-2 border-b border-gray-100">
                  Latest Posts
                </h4>

                <div className="space-y-6">
                  {latestPosts.map((post) => (
                    <Link
                      key={post.id}
                      to={`/blogs/${post.id}`}
                      className="flex gap-4 group"
                    >
                      <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex-grow">
                        <h5 className="font-heading font-bold text-navy text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                          {post.title}
                        </h5>
                        <p className="text-navy/40 text-[10px] mt-1 flex items-center gap-1">
                          <FiCalendar />
                          {post.date}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Widget 4: Make a Difference Today Donate CTA Card */}
              <div className="bg-white rounded-[2rem] p-8 shadow-soft border border-navy/5 relative overflow-hidden text-center">
                {/* Decorative glow elements */}
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gold" />
                
                <div className="w-14 h-14 bg-gold/15 rounded-full flex items-center justify-center mx-auto mb-5 text-gold">
                  <FiHeart className="text-2xl animate-pulse" />
                </div>

                <h4 className="font-heading font-bold text-navy text-lg mb-3">
                  Make a Difference Today
                </h4>
                <p className="text-navy/50 text-xs leading-relaxed mb-6 max-w-xs mx-auto">
                  Your support can help us provide education and hope to children who need it the most.
                </p>

                <Link
                  to="/donate"
                  className="w-full bg-gold hover:bg-gold/90 text-navy font-bold py-3.5 rounded-xl shadow-lg hover:shadow-xl flex items-center justify-center gap-2 transition-all text-sm uppercase tracking-wider"
                >
                  <FiHeart /> Donate Now
                </Link>
              </div>

            </aside>

          </div>

        </div>
      </div>
    </>
  );
};

export default BlogDetailPage;
