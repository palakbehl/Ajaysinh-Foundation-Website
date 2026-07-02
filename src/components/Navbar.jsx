import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiHeart } from 'react-icons/fi';

const navLinks = [
  { title: 'Home', path: '/' },
  { title: 'About Us', path: '/about' },
  { title: 'Campaigns', path: '/campaigns' },
  { title: 'Blogs', path: '/blogs' },
  { title: 'CSR', path: '/csr' },
  { title: 'Volunteer', path: '/volunteer' },
  { title: 'Contact', path: '/contact' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-soft py-3'
          : 'bg-white/90 backdrop-blur-lg py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 max-w-7xl flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
            <FiHeart className="text-xl group-hover:scale-110 transition-transform" />
          </div>
          <div>
            <h1 className={`font-heading font-bold text-xl leading-none ${isScrolled ? 'text-primary' : 'text-primary'}`}>
              AJAYSINH
            </h1>
            <p className="text-[10px] tracking-widest text-gold font-semibold uppercase">Foundation</p>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          <div className="flex gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.title}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-gold relative group ${
                  location.pathname === link.path ? 'text-primary' : 'text-navy/80'
                }`}
              >
                {link.title}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-gold transition-all duration-300 ${
                  location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </Link>
            ))}
          </div>
          <Link
            to="/donate"
            className="bg-gold hover:bg-gold/90 text-navy font-semibold px-6 py-2.5 rounded-full transition-all shadow-soft flex items-center gap-2 hover:shadow-lg hover:-translate-y-0.5"
          >
            <FiHeart /> Donate Now
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-2xl text-navy"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white shadow-soft overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.title}
                  to={link.path}
                  className={`text-lg font-medium p-2 border-b border-gray-100 ${
                    location.pathname === link.path ? 'text-primary' : 'text-navy'
                  }`}
                >
                  {link.title}
                </Link>
              ))}
              <Link
                to="/donate"
                className="bg-gold text-navy font-semibold px-6 py-3 rounded-xl text-center mt-2 flex justify-center items-center gap-2"
              >
                <FiHeart /> Donate Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
