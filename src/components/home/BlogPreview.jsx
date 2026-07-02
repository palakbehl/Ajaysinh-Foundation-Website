import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiCalendar } from 'react-icons/fi';
import { FloatingCircle, FloatingHeart, DotGrid, FloatingLeaf, FloatingWave, FloatingDiamond } from '../ui/FloatingShapes';

const blogs = [
  {
    id: 1,
    title: 'The Impact of Nutrition on Early Childhood Development',
    excerpt: 'Proper nutrition in early years lays the foundation for lifelong health and learning. Read how our meal program is making a difference.',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    date: 'Oct 15, 2023',
    category: 'Healthcare'
  },
  {
    id: 2,
    title: 'Stories from the Field: Rebuilding After the Floods',
    excerpt: 'Our disaster response team spent weeks in affected areas. Here are some incredible stories of resilience and hope.',
    image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    date: 'Sep 28, 2023',
    category: 'Community'
  },
  {
    id: 3,
    title: 'Why Digital Literacy Matters for Rural Youth',
    excerpt: 'Bridging the digital divide is crucial for equal opportunities. Learn about our new computer centers in remote villages.',
    image: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    date: 'Sep 10, 2023',
    category: 'Education'
  }
];

const BlogPreview = () => {
  return (
    <section className="py-24 bg-cream relative overflow-hidden">
      {/* Floating Decorative Elements */}
      <FloatingCircle size={80} color="#DCE8E2" className="top-12 right-[6%] opacity-30" delay={0} />
      <FloatingHeart size={26} color="#C6A969" className="top-[30%] left-[4%]" delay={1} />
      <DotGrid className="absolute bottom-24 left-[5%]" cols={4} rows={3} color="#0B4F3A" />
      <FloatingLeaf size={45} color="#0B4F3A" className="bottom-20 right-[8%]" delay={1.2} />
      <FloatingWave width={80} color="#C6A969" className="top-[60%] right-[2%]" delay={0.5} />
      <FloatingDiamond size={12} color="#0B4F3A" className="top-[20%] right-[20%]" delay={2} />

      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-bold tracking-widest text-xs uppercase mb-4 block">Latest Updates</span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-navy mb-6">
            Insights & <span className="text-gold">Stories</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-[2rem] overflow-hidden shadow-soft group hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={blog.image} 
                  alt={blog.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-navy shadow-sm">
                  {blog.category}
                </div>
              </div>
              
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-2 text-xs text-navy/50 mb-4 font-medium">
                  <FiCalendar />
                  {blog.date}
                </div>
                <h3 className="text-xl font-heading font-bold text-navy mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </h3>
                <p className="text-navy/70 text-sm mb-6 line-clamp-3">
                  {blog.excerpt}
                </p>
                
                <Link to={`/blogs/${blog.id}`} className="text-primary font-semibold flex items-center gap-2 hover:text-gold transition-colors text-sm uppercase tracking-wider group/link">
                  Read More 
                  <span className="inline-block transition-transform group-hover/link:translate-x-2">
                    <FiArrowRight />
                  </span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
