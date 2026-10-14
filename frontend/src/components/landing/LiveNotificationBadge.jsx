import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { CheckCircle2, Navigation, Clock } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';

const mockNotifications = [
  {
    name: "Rahul Sharma",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    action: "accepted your request",
    eta: "4 min away",
    location: "Outer Ring Road",
  },
  {
    name: "Vikram Patel",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    action: "en route with tire kit",
    eta: "6 min away",
    location: "Indiranagar 100ft Rd",
  },
  {
    name: "Amit Verma",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
    action: "dispatched battery unit",
    eta: "3 min away",
    location: "Koramangala 5th Block",
  },
];

export const LiveNotificationBadge = () => {
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % mockNotifications.length);
        setIsVisible(true);
      }, 600);
    }, 4500);

    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  const current = mockNotifications[index];

  return (
    <div className="relative z-20 flex justify-center w-full max-w-sm pointer-events-auto">
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.div
            key={current.name}
            initial={{ opacity: 0, y: 16, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.95 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <GlassCard className="py-2.5 px-3.5 flex items-center gap-3 border-primary/20 shadow-[0_12px_36px_rgba(0,0,0,0.5),0_0_24px_rgba(255,159,28,0.12)]">
              {/* Avatar with Live Indicator */}
              <div className="relative shrink-0">
                <img
                  src={current.avatar}
                  alt={current.name}
                  className="w-9 h-9 rounded-full object-cover border border-white/20"
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-success border-2 border-[#0B0F1A]" />
              </div>

              {/* Details */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-semibold text-text-primary truncate">
                    {current.name}
                  </span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-success shrink-0" />
                </div>
                <div className="text-[11px] text-text-secondary truncate">
                  {current.action}
                </div>
              </div>

              {/* ETA Pill */}
              <div className="shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/25 text-primary text-[11px] font-mono font-medium">
                <Clock className="w-3 h-3" />
                <span>{current.eta}</span>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
