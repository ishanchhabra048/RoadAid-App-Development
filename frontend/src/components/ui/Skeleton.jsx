import React from 'react';
import { cn } from '../../lib/utils';

export const Skeleton = ({ className, circle = false, ...props }) => {
  return (
    <div
      className={cn(
        'relative overflow-hidden bg-white/[0.05]',
        circle ? 'rounded-full' : 'rounded-lg',
        'before:absolute before:inset-0 before:-translate-x-full',
        'before:bg-gradient-to-r before:from-transparent before:via-white/[0.08] before:to-transparent',
        'before:animate-[shimmer_1.8s_infinite]',
        className
      )}
      {...props}
    />
  );
};
