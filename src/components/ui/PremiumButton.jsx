import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';

const variants = {
  primary: {
    bg: 'bg-primary',
    text: 'text-white',
    glow: 'rgba(11, 79, 58, 0.4)',
    gradient: 'from-primary to-emerald-700',
  },
  gold: {
    bg: 'bg-gold',
    text: 'text-navy',
    glow: 'rgba(198, 169, 105, 0.4)',
    gradient: 'from-gold to-amber-500',
  },
  navy: {
    bg: 'bg-navy',
    text: 'text-white',
    glow: 'rgba(13, 27, 42, 0.4)',
    gradient: 'from-navy to-slate-800',
  },
  outline: {
    bg: 'bg-transparent border-2 border-primary',
    text: 'text-primary',
    glow: 'rgba(11, 79, 58, 0.25)',
    gradient: 'from-primary to-emerald-700',
  },
  'outline-white': {
    bg: 'bg-transparent border-2 border-white/30',
    text: 'text-white',
    glow: 'rgba(255, 255, 255, 0.15)',
    gradient: 'from-white/20 to-white/5',
  },
  ghost: {
    bg: 'bg-white border border-gray-200',
    text: 'text-navy',
    glow: 'rgba(0, 0, 0, 0.08)',
    gradient: 'from-gray-50 to-white',
  },
};

const PremiumButton = ({
  children,
  to,
  href,
  variant = 'primary',
  size = 'md',
  icon,
  className = '',
  onClick,
  type = 'button',
  ...props
}) => {
  const ref = useRef(null);
  const v = variants[variant] || variants.primary;

  // Magnetic hover effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.15);
    y.set((e.clientY - centerY) * 0.15);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const sizeClasses = {
    sm: 'px-5 py-2.5 text-sm',
    md: 'px-8 py-3.5 text-base',
    lg: 'px-10 py-4 text-lg',
  };

  const baseClasses = `
    relative overflow-hidden rounded-full font-semibold 
    inline-flex items-center gap-2.5 
    transition-all duration-300 cursor-pointer
    ${v.bg} ${v.text}
    ${sizeClasses[size] || sizeClasses.md}
    ${className}
  `;

  const content = (
    <>
      {/* Gradient sweep on hover */}
      <span className="absolute inset-0 overflow-hidden rounded-full">
        <span className="btn-shine-pro absolute top-0 -left-full w-[200%] h-full bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-[-20deg]"></span>
      </span>

      {/* Bottom glow line */}
      <span 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] rounded-full btn-glow-line transition-all duration-500"
        style={{ backgroundColor: v.glow, boxShadow: `0 0 12px 2px ${v.glow}` }}
      ></span>
      
      <span className="relative z-10 flex items-center gap-2.5">
        {children}
        {icon && (
          <span className="inline-flex btn-icon-anim transition-transform duration-300">
            {icon}
          </span>
        )}
      </span>
    </>
  );

  const motionProps = {
    ref,
    style: { x: springX, y: springY },
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    whileHover: {
      scale: 1.04,
      boxShadow: `0 15px 35px -5px ${v.glow}, 0 0 20px ${v.glow}`,
    },
    whileTap: { scale: 0.96 },
    transition: { type: 'spring', stiffness: 400, damping: 17 },
  };

  if (to) {
    return (
      <motion.div {...motionProps} className="inline-block">
        <Link to={to} className={baseClasses} {...props}>
          {content}
        </Link>
      </motion.div>
    );
  }

  if (href) {
    return (
      <motion.a href={href} className={baseClasses} {...motionProps} {...props}>
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button type={type} className={baseClasses} onClick={onClick} {...motionProps} {...props}>
      {content}
    </motion.button>
  );
};

export default PremiumButton;
