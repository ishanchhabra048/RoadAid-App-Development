import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Clock, Award } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { RadarBackground } from './RadarBackground';
import { LiveNotificationBadge } from './LiveNotificationBadge';
import { pageEntrance } from '../../lib/motion';

export const Hero = () => {
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();

  const trustChips = [
    { icon: Clock, label: "Avg. arrival 12 min", mono: true },
    { icon: Award, label: "2,400+ verified mechanics" },
    { icon: ShieldCheck, label: "24/7 emergency dispatch" },
  ];

  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Radar Background Layer */}
      <RadarBackground />

      <motion.div
        variants={pageEntrance}
        initial="initial"
        animate="animate"
        className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center space-y-8"
      >
        {/* Live Status Pill */}
        <Badge variant="accent" size="md" dot dotPing className="shadow-glow-accent-sm">
          <span>Active Patrol Network · Bengaluru & Tier-1 Metros</span>
        </Badge>

        {/* Hero Headline */}
        <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-text-primary leading-[1.08]">
          Stranded? Help is{' '}
          <span className="bg-gradient-to-r from-primary via-amber-400 to-orange-500 bg-clip-text text-transparent">
            just a tap away.
          </span>
        </h1>

        {/* Subtext: exactly one line, max 18 words */}
        <p className="text-base sm:text-xl text-text-secondary max-w-2xl font-normal leading-relaxed">
          Instant on-demand roadside dispatch for punctures, battery jumpstarts, towing, and engine emergencies nationwide.
        </p>

        {/* Massive CTA with Pulse Ring & Nudging Arrow */}
        <div className="pt-2 flex flex-col items-center gap-6">
          <Button
            size="xl"
            withPulse
            onClick={() => navigate('/dashboard')}
            icon={ArrowRight}
            iconPosition="right"
            className="group px-9 py-4 text-lg font-bold shadow-glow-primary"
          >
            Find Nearby Mechanics
          </Button>

          {/* 3 Trust Chips */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2">
            {trustChips.map((chip, idx) => {
              const Icon = chip.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface border border-white/[0.08] backdrop-blur-md text-xs text-text-secondary"
                >
                  <Icon className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span className={chip.mono ? "font-mono font-medium text-text-primary" : ""}>
                    {chip.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Floating live notification mini-card */}
        <div className="pt-6 w-full flex justify-center">
          <LiveNotificationBadge />
        </div>
      </motion.div>
    </section>
  );
};
