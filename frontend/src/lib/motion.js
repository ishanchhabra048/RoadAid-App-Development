/**
 * Framer Motion shared animation variants & transitions.
 * Configured with Linear/Vercel style physics:
 * smooth cubic bezier [0.22, 1, 0.36, 1] and crisp spring dynamics.
 */

export const transitions = {
  smooth: {
    duration: 0.6,
    ease: [0.22, 1, 0.36, 1],
  },
  fast: {
    duration: 0.25,
    ease: [0.22, 1, 0.36, 1],
  },
  spring: {
    type: "spring",
    stiffness: 400,
    damping: 17,
  },
  gentleSpring: {
    type: "spring",
    stiffness: 260,
    damping: 24,
  },
};

export const pageEntrance = {
  initial: { opacity: 0, y: 24 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: transitions.smooth
  },
  exit: { 
    opacity: 0, 
    y: -16,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } 
  },
};

export const sectionEntrance = {
  initial: { opacity: 0, y: 24 },
  whileInView: { 
    opacity: 1, 
    y: 0,
    transition: transitions.smooth
  },
  viewport: { once: true, margin: "-60px" },
};

export const staggerContainer = (staggerChildren = 0.08, delayChildren = 0) => ({
  initial: {},
  animate: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

export const staggerItem = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: transitions.smooth,
  },
};

export const buttonMotion = {
  whileHover: { 
    scale: 1.03,
    transition: transitions.spring 
  },
  whileTap: { 
    scale: 0.96,
    transition: transitions.spring 
  },
};

export const cardHover = {
  whileHover: { 
    y: -4,
    transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] }
  },
};

export const pulseRing = {
  initial: { scale: 1, opacity: 0.6 },
  animate: {
    scale: 1.6,
    opacity: 0,
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeOut",
    },
  },
};

export const stateCrossfade = {
  initial: { opacity: 0, scale: 0.98, y: 8 },
  animate: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: transitions.fast 
  },
  exit: { 
    opacity: 0, 
    scale: 0.98, 
    y: -8,
    transition: { duration: 0.18, ease: "easeIn" } 
  },
};

export const modalBackdrop = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export const modalContent = {
  initial: { opacity: 0, scale: 0.95, y: 16 },
  animate: { 
    opacity: 1, 
    scale: 1, 
    y: 0, 
    transition: transitions.spring 
  },
  exit: { 
    opacity: 0, 
    scale: 0.95, 
    y: 12, 
    transition: { duration: 0.18 } 
  },
};
