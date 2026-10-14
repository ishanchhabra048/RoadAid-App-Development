import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Wrench, Navigation, CheckCircle2 } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { sectionEntrance, staggerContainer, staggerItem } from '../../lib/motion';

export const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      icon: MapPin,
      title: "Share Live GPS Pin",
      description: "One tap transmits your exact highway or city breakdown coordinates. No guessing landmark names.",
      tag: "GPS Accuracy ±12m",
    },
    {
      number: "02",
      icon: Wrench,
      title: "Pick Your Issue",
      description: "Choose from flat tire, dead battery, engine breakdown, or fuel delivery. Add details if needed.",
      tag: "Transparent Rates",
    },
    {
      number: "03",
      icon: Navigation,
      title: "Mechanic Arrives Fast",
      description: "Watch your verified mechanic drive to you in real-time with live ETA, direct call, and toolkits.",
      tag: "Avg. Arrival 12 Min",
    },
  ];

  return (
    <section id="how-it-works" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <motion.div
        variants={sectionEntrance}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true }}
        className="text-center max-w-2xl mx-auto mb-20 space-y-4"
      >
        <span className="text-xs font-mono uppercase tracking-widest text-primary font-semibold">
          Seamless 3-Step Rescue
        </span>
        <h2 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-text-primary">
          From panic to peace in minutes.
        </h2>
        <p className="text-text-secondary text-base sm:text-lg">
          Engineered for stress-free dispatch with real-time tracking and zero hidden phone trees.
        </p>
      </motion.div>

      {/* 3 Step Cards with connecting drawn line */}
      <div className="relative">
        {/* Animated Connecting SVG line (desktop) */}
        <div className="hidden lg:block absolute top-1/2 left-[15%] right-[15%] -translate-y-8 z-0 pointer-events-none">
          <svg className="w-full h-4 overflow-visible" fill="none">
            <line
              x1="0"
              y1="50%"
              x2="100%"
              y2="50%"
              stroke="rgba(255, 159, 28, 0.25)"
              strokeWidth="2"
              strokeDasharray="6 6"
            />
          </svg>
        </div>

        <motion.div
          variants={staggerContainer(0.12)}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative z-10"
        >
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div key={step.number} variants={staggerItem}>
                <GlassCard hoverLift className="p-8 h-full flex flex-col justify-between group">
                  <div className="space-y-6">
                    {/* Top Row: Number + Icon */}
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/10 transition-all duration-300">
                        <Icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                      </div>
                      <span className="font-mono text-2xl font-bold text-white/20 group-hover:text-primary/60 transition-colors">
                        {step.number}
                      </span>
                    </div>

                    {/* Step Content */}
                    <div className="space-y-2">
                      <h3 className="font-heading text-xl font-semibold text-text-primary">
                        {step.title}
                      </h3>
                      <p className="text-text-secondary text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Feature Pill */}
                  <div className="pt-6 mt-6 border-t border-white/[0.06] flex items-center gap-1.5 text-xs font-mono text-accent">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>{step.tag}</span>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
