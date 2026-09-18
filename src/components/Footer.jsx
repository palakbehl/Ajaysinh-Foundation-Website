import { Link } from 'react-router-dom';
import { FiHeart, FiMapPin, FiPhone, FiMail, FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiArrowRight, FiShield } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-navy text-white/80 pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand & Description */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 group inline-flex">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
                <FiHeart className="text-xl" />
              </div>
              <div>
                <h2 className="font-heading font-bold text-xl leading-none text-white">AJAYSINH</h2>
                <p className="text-[10px] tracking-widest text-gold font-semibold uppercase">Foundation</p>
              </div>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs">
              Dedicated to uplifting communities, providing education, and creating opportunities for the underprivileged. Together, we can build a better tomorrow.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold hover:text-navy transition-colors"><FiFacebook /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold hover:text-navy transition-colors"><FiTwitter /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold hover:text-navy transition-colors"><FiInstagram /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold hover:text-navy transition-colors"><FiLinkedin /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-xl text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {['About Us', 'Our Campaigns', 'Latest Blogs', 'CSR Initiatives', 'Volunteer With Us', 'Contact Us'].map((link) => (
                <li key={link}>
                  <Link to={`/${link.split(' ')[0].toLowerCase()}`} className="hover:text-gold transition-colors text-sm flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold/50 group-hover:bg-gold transition-colors"></span>
                    {link}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/admin/login" className="hover:text-gold transition-colors text-sm flex items-center gap-2 group text-white/70">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 group-hover:bg-emerald-300 transition-colors"></span>
                  <FiShield className="text-xs text-emerald-400" /> Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading text-xl text-white mb-6">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <FiMapPin className="text-gold text-lg shrink-0 mt-0.5" />
                <span>123 Foundation House,<br/>Community Road, New Delhi, 110001</span>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone className="text-gold text-lg shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <FiMail className="text-gold text-lg shrink-0" />
                <span>contact@ajaysinhfoundation.org</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-heading text-xl text-white mb-6">Newsletter</h3>
            <p className="text-sm mb-4">Subscribe to our newsletter to get updates on our latest campaigns and impact.</p>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-sm text-white focus:outline-none focus:border-gold transition-colors"
                />
              </div>
              <button className="w-full bg-gold hover:bg-gold/90 text-navy font-semibold py-3 rounded-lg transition-colors flex justify-center items-center gap-2 text-sm">
                Subscribe <FiArrowRight />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>&copy; {new Date().getFullYear()} Ajaysinh Foundation. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-gold transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-gold transition-colors">Terms of Service</Link>
            <Link to="/admin/login" className="hover:text-gold transition-colors flex items-center gap-1.5 text-white/50 hover:text-white">
              <FiShield className="text-xs text-emerald-400" /> Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
