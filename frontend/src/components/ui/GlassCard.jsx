import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { cardHover } from '../../lib/motion';

/**
 * Silicon Valley aesthetic GlassCard:
 * Multi-layer translucent blur, 1px border, inset top highlight.
 */
export const GlassCard = React.forwardRef(({
  children,
  className,
  hoverLift = false,
  glow = false,
  asMotion = false,
  onClick,
  ...props
}, ref) => {
  const prefersReducedMotion = useReducedMotion();

  const baseClasses = cn(
    'relative rounded-2xl border border-white/[0.08] bg-surface backdrop-blur-xl',
    'shadow-[0_8px_32px_0_rgba(0,0,0,0.37),inset_0_1px_0_rgba(255,255,255,0.06)]',
    hoverLift && 'transition-colors duration-200 hover:border-white/[0.18] hover:bg-surface-hover',
    glow && 'shadow-[0_0_40px_rgba(255,159,28,0.15)] border-primary/30',
    className
  );

  if (asMotion || hoverLift) {
    return (
      <motion.div
        ref={ref}
        onClick={onClick}
        whileHover={hoverLift && !prefersReducedMotion ? cardHover.whileHover : undefined}
        className={baseClasses}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div ref={ref} onClick={onClick} className={baseClasses} {...props}>
      {children}
    </div>
  );
});

GlassCard.displayName = 'GlassCard';
