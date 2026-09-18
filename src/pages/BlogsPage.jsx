import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiHome, FiChevronRight, FiArrowLeft, FiArrowRight, FiHeart } from 'react-icons/fi';
import { blogs } from '../data/blogs';
import blogService from '../services/blogService';
import FeaturedBlog from '../components/blogs/FeaturedBlog';
import CategoryFilter from '../components/blogs/CategoryFilter';
import BlogCard from '../components/blogs/BlogCard';
import VideoCard from '../components/blogs/VideoCard';
import Newsletter from '../components/blogs/Newsletter';
import { FloatingCircle, FloatingRing, FloatingLeaf, DotGrid, FloatingCross } from '../components/ui/FloatingShapes';

// High-fidelity video stories data
const videoStories = [
  {
    id: 1,
    title: 'Dug in 10 Days: Kalyanpur Well Collective',
    desc: 'See how absolute community unity and raw engineering tools brought clean water to drought-prone Kalyanpur village.',
    thumbnail: 'https://images.unsplash.com/photo-1594708767771-a7502209ff51?auto=format&fit=crop&w=600&q=80',
    duration: '4:15 min',
    category: 'Water Security',
    videoUrl: '' // Empty opens cinematic local modal details
  },
  {
    id: 2,
    title: 'Tailoring Center Graduation Day Highlights',
    desc: 'Witness the graduation ceremony of 35 rural women and their transition into financially independent tailoring boutique owners.',
    thumbnail: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&w=600&q=80',
    duration: '3:40 min',
    category: 'Empowerment',
    videoUrl: ''
  },
  {
    id: 3,
    title: 'Pediatric Health Diagnosis Mobile Camps',
    desc: 'Join our chief medical officers inside deep Bihar forests distributing deworming kits, multivitamin treatments, and eyeglasses.',
    thumbnail: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=600&q=80',
    duration: '5:20 min',
    category: 'Healthcare',
    videoUrl: ''
  }
];

const BlogsPage = () => {
  const [activeCategory, setActiveCategory] = useState('All Stories');
  const [currentPage, setCurrentPage] = useState(1);
  const [blogList, setBlogList] = useState(blogs);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchLiveBlogs = async () => {
      try {
        const res = await blogService.getBlogs();
        if (res && res.blogs && res.blogs.length > 0) {
          const mapped = res.blogs.map((b) => ({
            id: b.slug || b._id,
            title: b.title,
            category: b.category || 'Community',
            slug: b.slug,
            excerpt: b.excerpt,
            image: b.featuredImage?.url || b.image || 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
            author: b.author || {
              name: 'Ajaysinh Foundation',
              avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=60&q=80',
              title: 'Editorial Lead',
            },
            date: b.createdAt ? new Date(b.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recent',
            readTime: b.readTime || '5 min read',
            tags: b.tags || ['Community', 'Impact'],
            quote: b.quote || '',
            content: b.content,
          }));
          setBlogList(mapped);
        }
      } catch (err) {
        // Fallback to static blogs
      }
    };
    fetchLiveBlogs();
  }, []);

  // The first blog is featured at the top
  const featuredBlog = blogList[0] || blogs[0];

  // Filter out the featured blog in "All Stories" view to avoid duplicate listings in the grid,
  // but keep it in category searches to ensure all articles are discoverable!
  const filteredBlogs = blogList.filter((blog) => {
    const matchesCategory =
      activeCategory === 'All Stories' || blog.category === activeCategory;
    const isFeatured = activeCategory === 'All Stories' && blog.id === featuredBlog.id;

    return matchesCategory && !isFeatured;
  });

  // Calculate pagination indices
  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBlogs = filteredBlogs.slice(startIndex, startIndex + itemsPerPage);

  const handleCategorySelect = (category) => {
    setActiveCategory(category);
    setCurrentPage(1); // Reset to page 1 on filter
  };

  return (
    <>
      <Helmet>
        <title>Our Stories & Blogs | Ajaysinh Foundation</title>
        <meta
          name="description"
          content="Explore stories of hope, rural development, child education, healthcare impacts, and community updates by Ajaysinh Foundation."
        />
      </Helmet>

      <div className="bg-soft-cream min-h-screen overflow-hidden">
        {/* ==========================================
            1. HERO SECTION
            ========================================== */}
        <section className="bg-cream relative pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden">
          {/* Decorative floating layouts */}
          <div className="absolute top-0 left-0 w-[40%] h-full bg-white/40 rounded-br-[180px] -z-0" />
          <div className="absolute bottom-0 right-[10%] w-80 h-80 bg-primary/5 rounded-full blur-[90px] -z-0" />
          <FloatingRing size={70} color="#C6A96940" className="top-28 right-[10%]" delay={0} />
          <FloatingLeaf size={45} color="#0B4F3A" className="bottom-20 left-[6%]" delay={1.5} />
          <FloatingCross size={14} color="#C6A969" className="top-[45%] left-[20%]" delay={2} />
          <DotGrid className="absolute bottom-8 right-[5%]" cols={4} rows={3} color="#C6A969" />

          <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
            {/* Breadcrumb Navigation */}
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
              <span className="text-primary font-bold">Our Blogs</span>
            </motion.nav>

            {/* Typography headlines */}
            <div className="max-w-3xl">
              <motion.span
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-primary uppercase tracking-widest text-xs font-bold mb-3 block"
              >
                EDITORIAL PLATFORM
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-navy leading-tight mb-5"
              >
                Our Stories & Blogs
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-navy/60 text-lg md:text-xl leading-relaxed"
              >
                Stories of hope, impact, transformation, and community change.
              </motion.p>
            </div>
          </div>
        </section>

        {/* ==========================================
            2. FEATURED BLOG SECTION
            ========================================== */}
        {activeCategory === 'All Stories' && (
          <FeaturedBlog blog={featuredBlog} />
        )}

        {/* ==========================================
            3. BLOG CATEGORIES SECTION
            ========================================== */}
        <section className="py-8 bg-white border-y border-navy/5">
          <CategoryFilter activeCategory={activeCategory} onSelectCategory={handleCategorySelect} />
        </section>

        {/* ==========================================
            4. BLOG GRID SECTION
            ========================================== */}
        <section className="py-16 px-4 max-w-7xl mx-auto">
          <div className="mb-10 flex items-center justify-between">
            <h3 className="font-heading font-bold text-navy text-2xl md:text-3xl">
              {activeCategory === 'All Stories' ? 'Recent Publications' : `${activeCategory} Articles`}
            </h3>
            <span className="text-navy/40 text-sm font-semibold">
              Showing {filteredBlogs.length} {filteredBlogs.length === 1 ? 'Article' : 'Articles'}
            </span>
          </div>

          {filteredBlogs.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {paginatedBlogs.map((blog, idx) => (
                  <motion.div
                    key={blog.id}
                    layout
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                  >
                    <BlogCard blog={blog} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-[2rem] p-16 text-center shadow-soft border border-navy/5"
            >
              <h4 className="font-heading font-bold text-navy text-xl mb-2">No articles found</h4>
              <p className="text-navy/50 text-sm max-w-md mx-auto">
                We haven't posted any articles under the "{activeCategory}" category yet. Stay tuned, as we publish new stories weekly.
              </p>
            </motion.div>
          )}

          {/* ==========================================
              8. PAGINATION SECTION
              ========================================== */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-16 pt-8 border-t border-gray-100">
              {/* Prev Button */}
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                className="w-12 h-12 rounded-full border border-navy/15 flex items-center justify-center text-navy hover:bg-primary hover:text-white hover:border-primary disabled:opacity-30 disabled:pointer-events-none transition-all duration-300 cursor-pointer"
              >
                <FiArrowLeft />
              </button>

              {/* Number Buttons */}
              {Array.from({ length: totalPages }).map((_, idx) => {
                const pageNum = idx + 1;
                const isSelected = pageNum === currentPage;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-12 h-12 rounded-full font-semibold transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? 'bg-primary text-white shadow-soft'
                        : 'border border-navy/10 text-navy/70 hover:border-primary/50'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              {/* Next Button */}
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                className="w-12 h-12 rounded-full border border-navy/15 flex items-center justify-center text-navy hover:bg-primary hover:text-white hover:border-primary disabled:opacity-30 disabled:pointer-events-none transition-all duration-300 cursor-pointer"
              >
                <FiArrowRight />
              </button>
            </div>
          )}
        </section>

        {/* ==========================================
            5. IMPACT STORIES SECTION
            ========================================== */}
        <section className="bg-cream py-20 relative overflow-hidden">
          <FloatingCircle size={60} color="#DCE8E250" className="top-12 left-[5%]" delay={0} />
          <FloatingRing size={80} color="#C6A96920" className="bottom-12 right-[8%]" delay={1} />
          <DotGrid className="absolute top-16 right-[6%]" cols={3} rows={3} color="#C6A969" />

          <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="text-primary font-bold uppercase tracking-widest text-xs block mb-3">VOICES OF CHANGE</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-navy">Impact Stories</h2>
            </motion.div>

            <div className="grid lg:grid-cols-12 gap-10 items-center">
              {/* Asymmetrical Left Side: Collage (7 cols) */}
              <div className="lg:col-span-7 grid grid-cols-12 gap-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="col-span-8 rounded-[2rem] overflow-hidden shadow-soft aspect-[4/3] relative group"
                >
                  <img
                    src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=500&q=80"
                    alt="Children studying"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="col-span-4 rounded-[2rem] overflow-hidden shadow-soft aspect-[3/4] translate-y-8 relative group"
                >
                  <img
                    src="https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&w=400&q=80"
                    alt="Tailoring graduates"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="col-span-4 rounded-[2rem] overflow-hidden shadow-soft aspect-square relative group"
                >
                  <img
                    src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=400&q=80"
                    alt="Elderly shelter support"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="col-span-8 rounded-[2rem] overflow-hidden shadow-soft aspect-[2/1] translate-y-8 relative group"
                >
                  <img
                    src="https://images.unsplash.com/photo-1594708767771-a7502209ff51?auto=format&fit=crop&w=500&q=80"
                    alt="Clean water installation"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </motion.div>
              </div>

              {/* Asymmetrical Right Side: Quote Narrative Panel (5 cols) */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="lg:col-span-5 bg-white rounded-[2.5rem] p-8 md:p-12 shadow-soft relative"
              >
                {/* Large quote glyph overlay */}
                <span className="absolute top-4 right-8 text-gold/15 text-8xl font-heading select-none">"</span>

                <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mb-6">
                  <FiHeart className="text-gold text-xl" />
                </div>

                <p className="font-heading text-navy italic text-xl md:text-2xl leading-relaxed mb-6">
                  "Because of the support of our donors, Sunita Devi now runs her own micro tailoring shop, earning her own livelihood and inspiring her daughter to seek college."
                </p>

                <div className="border-t border-gray-150 pt-6">
                  <p className="font-heading font-bold text-navy text-lg">Sunita Devi</p>
                  <p className="text-navy/40 text-xs uppercase tracking-wider mt-0.5">Empowerment Graduate</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ==========================================
            6. VIDEO STORIES SECTION
            ========================================== */}
        <section className="bg-white py-20 relative overflow-hidden">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="text-primary font-bold uppercase tracking-widest text-xs block mb-3">CINEMATIC DIARIES</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-navy">On the Ground</h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {videoStories.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </div>
        </section>

        {/* ==========================================
            7. NEWSLETTER SUBSCRIPTION SECTION
            ========================================== */}
        <Newsletter />
      </div>
    </>
  );
};

export default BlogsPage;
