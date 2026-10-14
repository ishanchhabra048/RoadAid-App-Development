import React from 'react';
import { Star, PhoneCall, ShieldCheck, Car } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export const MechanicProfileCard = ({ mechanic }) => {
  if (!mechanic) return null;

  return (
    <GlassCard className="p-4 sm:p-5 border-primary/25 bg-surface/70">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Mechanic info */}
        <div className="flex items-center gap-3.5">
          <div className="relative shrink-0">
            <img
              src={mechanic.avatar}
              alt={mechanic.name}
              className="w-14 h-14 rounded-2xl object-cover border-2 border-primary/40 shadow-glow-primary-sm"
            />
            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-success border-2 border-[#0B0F1A]" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="font-heading font-bold text-base text-text-primary">
                {mechanic.name}
              </h4>
              <Badge variant="primary" size="sm">
                Certified
              </Badge>
            </div>

            <div className="flex items-center gap-2 mt-0.5 text-xs text-text-secondary">
              <div className="flex items-center gap-1 text-primary">
                <Star className="w-3.5 h-3.5 fill-primary text-primary" />
                <span className="font-mono font-semibold">{mechanic.rating}</span>
              </div>
              <span>·</span>
              <span>{mechanic.reviewsCount} rescues</span>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-text-muted mt-1 font-mono">
              <Car className="w-3.5 h-3.5 text-text-secondary" />
              <span className="text-text-primary font-medium">{mechanic.vehicle}</span>
              <span className="text-white/20">|</span>
              <span className="text-accent">{mechanic.plateNumber}</span>
            </div>
          </div>
        </div>

        {/* Contact Mechanic Action */}
        <div className="flex items-center gap-2.5 sm:self-center">
          <Button
            size="sm"
            variant="primary"
            icon={PhoneCall}
            onClick={() => window.open(`tel:${mechanic.phone}`, '_self')}
            aria-label={`Call mechanic ${mechanic.name}`}
          >
            Call Mechanic
          </Button>
        </div>
      </div>
    </GlassCard>
  );
};
