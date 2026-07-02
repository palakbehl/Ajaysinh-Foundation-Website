import { motion } from 'framer-motion';

// Reusable floating dot cluster
export const DotGrid = ({ className = '', cols = 5, rows = 5, color = '#C6A969' }) => (
  <div className={`grid gap-2 opacity-20 ${className}`} style={{ gridTemplateColumns: `repeat(${cols}, 6px)` }}>
    {Array.from({ length: cols * rows }).map((_, i) => (
      <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
    ))}
  </div>
);

// Floating circle with pulse
export const FloatingCircle = ({ size = 80, color = '#DCE8E2', delay = 0, duration = 6, className = '' }) => (
  <motion.div
    animate={{ y: [0, -15, 0], scale: [1, 1.05, 1] }}
    transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
    className={`rounded-full absolute pointer-events-none ${className}`}
    style={{ width: size, height: size, backgroundColor: color }}
  />
);

// Floating ring (hollow circle)
export const FloatingRing = ({ size = 60, color = '#C6A969', strokeWidth = 2, delay = 0, className = '' }) => (
  <motion.div
    animate={{ y: [0, -12, 0], rotate: [0, 90, 0] }}
    transition={{ duration: 8, delay, repeat: Infinity, ease: 'easeInOut' }}
    className={`rounded-full absolute pointer-events-none ${className}`}
    style={{
      width: size, height: size,
      border: `${strokeWidth}px solid ${color}`,
      opacity: 0.3
    }}
  />
);

// SVG Leaf shape
export const FloatingLeaf = ({ size = 40, color = '#0B4F3A', delay = 0, className = '' }) => (
  <motion.svg
    animate={{ y: [0, -10, 0], rotate: [0, 15, -15, 0] }}
    transition={{ duration: 7, delay, repeat: Infinity, ease: 'easeInOut' }}
    className={`absolute pointer-events-none ${className}`}
    width={size} height={size} viewBox="0 0 40 40" fill="none"
  >
    <path
      d="M20 2C20 2 35 10 35 22C35 30 28 38 20 38C12 38 5 30 5 22C5 10 20 2 20 2Z"
      fill={color} fillOpacity="0.15"
    />
    <path d="M20 8V32" stroke={color} strokeOpacity="0.2" strokeWidth="1" />
  </motion.svg>
);

// Heart shape
export const FloatingHeart = ({ size = 30, color = '#C6A969', delay = 0, className = '' }) => (
  <motion.svg
    animate={{ y: [0, -8, 0], scale: [1, 1.1, 1] }}
    transition={{ duration: 5, delay, repeat: Infinity, ease: 'easeInOut' }}
    className={`absolute pointer-events-none ${className}`}
    width={size} height={size} viewBox="0 0 24 24" fill="none"
  >
    <path
      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      fill={color} fillOpacity="0.2"
    />
  </motion.svg>
);

// Dashed circle
export const DashedCircle = ({ size = 100, color = '#0D1B2A', delay = 0, className = '' }) => (
  <motion.svg
    animate={{ rotate: [0, 360] }}
    transition={{ duration: 20, delay, repeat: Infinity, ease: 'linear' }}
    className={`absolute pointer-events-none ${className}`}
    width={size} height={size} viewBox="0 0 100 100"
  >
    <circle cx="50" cy="50" r="45" fill="none" stroke={color} strokeWidth="1" strokeDasharray="6 4" strokeOpacity="0.15" />
  </motion.svg>
);

// Cross / Plus shape
export const FloatingCross = ({ size = 20, color = '#C6A969', delay = 0, className = '' }) => (
  <motion.svg
    animate={{ rotate: [0, 90, 180, 270, 360], y: [0, -6, 0] }}
    transition={{ duration: 10, delay, repeat: Infinity, ease: 'easeInOut' }}
    className={`absolute pointer-events-none ${className}`}
    width={size} height={size} viewBox="0 0 20 20"
  >
    <line x1="10" y1="2" x2="10" y2="18" stroke={color} strokeOpacity="0.3" strokeWidth="2" />
    <line x1="2" y1="10" x2="18" y2="10" stroke={color} strokeOpacity="0.3" strokeWidth="2" />
  </motion.svg>
);

// Wave / Squiggle line
export const FloatingWave = ({ width = 120, color = '#C6A969', delay = 0, className = '' }) => (
  <motion.svg
    animate={{ x: [0, 10, 0], opacity: [0.15, 0.25, 0.15] }}
    transition={{ duration: 6, delay, repeat: Infinity, ease: 'easeInOut' }}
    className={`absolute pointer-events-none ${className}`}
    width={width} height="20" viewBox="0 0 120 20"
  >
    <path
      d="M0 10 Q15 0, 30 10 Q45 20, 60 10 Q75 0, 90 10 Q105 20, 120 10"
      fill="none" stroke={color} strokeWidth="2" strokeOpacity="0.3"
    />
  </motion.svg>
);

// Diamond shape
export const FloatingDiamond = ({ size = 16, color = '#0B4F3A', delay = 0, className = '' }) => (
  <motion.div
    animate={{ y: [0, -8, 0], rotate: [45, 45, 45] }}
    transition={{ duration: 5, delay, repeat: Infinity, ease: 'easeInOut' }}
    className={`absolute pointer-events-none ${className}`}
    style={{
      width: size, height: size,
      backgroundColor: color,
      opacity: 0.15,
      transform: 'rotate(45deg)',
    }}
  />
);
