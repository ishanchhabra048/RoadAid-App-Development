import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';

export const Tooltip = ({ content, children, className, disabled = false }) => {
  const [isVisible, setIsVisible] = useState(false);

  if (disabled || !content) return <>{children}</>;

  return (
    <div 
      className="relative inline-flex items-center"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            role="tooltip"
            className={cn(
              'absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 z-40',
              'rounded-lg bg-[#0F172A] border border-white/10 text-xs text-text-primary whitespace-nowrap',
              'shadow-xl backdrop-blur-md pointer-events-none',
              className
            )}
          >
            {content}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#0F172A]" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
