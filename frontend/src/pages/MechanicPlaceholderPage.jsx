import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench, ArrowLeft, ShieldCheck, Clock } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

export const MechanicPlaceholderPage = () => {
  return (
    <div className="min-h-screen bg-background ambient-background flex items-center justify-center p-4 sm:p-6 text-text-primary">
      <GlassCard className="max-w-md w-full p-8 text-center space-y-6 border-accent/30 shadow-glow-accent-sm">
        <div className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/25 flex items-center justify-center text-accent mx-auto">
          <Wrench className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <Badge variant="accent" size="sm" dot>
            Mechanic Partner Portal
          </Badge>
          <h1 className="font-heading text-2xl font-bold">
            RoadAid Partner Network
          </h1>
          <p className="text-sm text-text-secondary leading-relaxed">
            Mechanic Portal is queued for Phase 2. As an approved roadside technician, you will be able to go online, accept incoming nearby emergency requests, and earn weekly payouts.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-left space-y-1.5 text-text-secondary">
          <div className="flex items-center gap-2 text-success">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>Driver Dispatch Module Active</span>
          </div>
          <div className="flex items-center gap-2 text-accent">
            <Clock className="w-4 h-4 shrink-0" />
            <span>Mechanic Acceptance Console coming up next</span>
          </div>
        </div>

        <div className="pt-2">
          <Link to="/">
            <Button variant="primary" size="md" icon={ArrowLeft}>
              Back to RoadAid Dispatch
            </Button>
          </Link>
        </div>
      </GlassCard>
    </div>
  );
};
