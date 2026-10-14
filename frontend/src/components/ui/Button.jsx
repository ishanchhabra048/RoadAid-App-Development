import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { buttonMotion } from '../../lib/motion';

/**
 * Reusable accessible Button with Framer Motion springs and glow states.
 * WCAG AA compliant: Primary amber uses dark text (#0B0F1A).
 */
export const Button = React.forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  className,
  disabled = false,
  loading = false,
  withPulse = false,
  icon: Icon,
  iconPosition = 'left',
  onClick,
  type = 'button',
  'aria-label': ariaLabel,
  ...props
}, ref) => {
  const prefersReducedMotion = useReducedMotion();

  const variantStyles = {
    primary: 'bg-primary text-primary-contrast font-semibold hover:bg-primary-light shadow-glow-primary hover:shadow-glow-primary',
    secondary: 'bg-surface text-text-primary border border-border hover:border-border-highlight hover:bg-surface-hover backdrop-blur-md',
    ghost: 'bg-transparent text-text-secondary hover:text-text-primary hover:bg-white/[0.05]',
    accent: 'bg-accent text-background font-semibold hover:bg-accent-light shadow-glow-accent',
    danger: 'bg-danger/10 text-danger border border-danger/30 hover:bg-danger/20 hover:border-danger/50',
    outline: 'bg-transparent border border-border text-text-primary hover:border-accent hover:text-accent',
  };

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 rounded-full gap-1.5',
    md: 'text-sm px-5 py-2.5 rounded-full gap-2',
    lg: 'text-base px-7 py-3.5 rounded-full gap-2.5 tracking-wide',
    xl: 'text-lg px-8 py-4 rounded-full gap-3 font-bold',
  };

  const isDisabled = disabled || loading;

  return (
    <div className="relative inline-flex items-center justify-center">
      {/* Optional continuous pulse ring for urgent / primary hero CTAs */}
      {withPulse && !isDisabled && !prefersReducedMotion && (
        <span 
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-primary/40 animate-ping opacity-75 pointer-events-none"
        />
      )}

      <motion.button
        ref={ref}
        type={type}
        disabled={isDisabled}
        onClick={onClick}
        aria-disabled={isDisabled}
        aria-busy={loading}
        aria-label={ariaLabel}
        whileHover={!isDisabled && !prefersReducedMotion ? buttonMotion.whileHover : undefined}
        whileTap={!isDisabled && !prefersReducedMotion ? buttonMotion.whileTap : undefined}
        className={cn(
          'relative inline-flex items-center justify-center select-none font-medium transition-colors duration-200 outline-none',
          'focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background',
          variantStyles[variant] || variantStyles.primary,
          sizeStyles[size] || sizeStyles.md,
          isDisabled && 'opacity-40 cursor-not-allowed filter grayscale-[30%] shadow-none pointer-events-none',
          className
        )}
        {...props}
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-current" aria-hidden="true" />
            <span>Loading...</span>
          </>
        ) : (
          <>
            {Icon && iconPosition === 'left' && (
              <Icon className={cn('w-4 h-4 text-current transition-transform duration-200')} aria-hidden="true" />
            )}
            {children}
            {Icon && iconPosition === 'right' && (
              <Icon className={cn('w-4 h-4 text-current transition-transform duration-200 group-hover:translate-x-1')} aria-hidden="true" />
            )}
          </>
        )}
      </motion.button>
    </div>
  );
});

Button.displayName = 'Button';
