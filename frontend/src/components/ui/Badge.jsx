import React from 'react';
import { cn } from '../../lib/utils';

export const Badge = ({
  children,
  variant = 'neutral',
  size = 'sm',
  dot = false,
  dotPing = false,
  className,
  ...props
}) => {
  const variantStyles = {
    primary: 'bg-primary/10 text-primary border-primary/25',
    accent: 'bg-accent/10 text-accent border-accent/25',
    success: 'bg-success/10 text-success border-success/25',
    danger: 'bg-danger/10 text-danger border-danger/25',
    neutral: 'bg-white/[0.05] text-text-secondary border-white/[0.08]',
  };

  const dotColors = {
    primary: 'bg-primary',
    accent: 'bg-accent',
    success: 'bg-success',
    danger: 'bg-danger',
    neutral: 'bg-slate-400',
  };

  const sizeStyles = {
    sm: 'text-xs px-2.5 py-1',
    md: 'text-sm px-3.5 py-1.5',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border font-medium select-none backdrop-blur-md',
        variantStyles[variant] || variantStyles.neutral,
        sizeStyles[size] || sizeStyles.sm,
        className
      )}
      {...props}
    >
      {dot && (
        <span className="relative flex h-2 w-2">
          {dotPing && (
            <span
              className={cn(
                'animate-ping absolute inline-flex h-full w-full rounded-full opacity-75',
                dotColors[variant] || dotColors.neutral
              )}
            />
          )}
          <span
            className={cn(
              'relative inline-flex rounded-full h-2 w-2',
              dotColors[variant] || dotColors.neutral
            )}
          />
        </span>
      )}
      {children}
    </span>
  );
};
