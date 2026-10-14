import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, PhoneCall, ShieldCheck } from 'lucide-react';
import { Button } from '../ui/Button';
import { GlassCard } from '../ui/GlassCard';
import { sectionEntrance } from '../../lib/motion';

export const CtaBanner = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        variants={sectionEntrance}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true }}
      >
        <GlassCard className="relative overflow-hidden p-8 sm:p-14 border-primary/20 bg-gradient-to-b from-surface to-[#111827]/90 text-center">
          {/* Ambient Glow Blob */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs font-mono">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified & Police-Background Checked
            </span>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text-primary">
              Never get stuck on the road again.
            </h2>

            <p className="text-text-secondary text-sm sm:text-base max-w-lg mx-auto">
              Over 2,400 mechanics ready across city bypasses, expressways, and inner roads.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                withPulse
                onClick={() => navigate('/dashboard')}
                icon={ArrowRight}
                iconPosition="right"
                className="w-full sm:w-auto"
              >
                Launch Live Dispatch
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => window.open('tel:1800-ROADAID', '_self')}
                icon={PhoneCall}
                className="w-full sm:w-auto"
              >
                1800-ROADAID (Toll-Free)
              </Button>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </section>
  );
};
