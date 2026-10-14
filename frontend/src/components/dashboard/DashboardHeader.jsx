import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, PhoneCall, AlertCircle } from 'lucide-react';
import { Badge } from '../ui/Badge';

export const DashboardHeader = ({ stage = 'idle' }) => {
  return (
    <header className="border-b border-white/[0.08] bg-[#0B0F1A]/70 backdrop-blur-xl sticky top-0 z-30 py-3.5 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Back Link & Title */}
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="flex items-center justify-center w-9 h-9 rounded-xl border border-white/[0.08] bg-surface hover:bg-surface-hover text-text-secondary hover:text-text-primary transition-colors"
            aria-label="Back to home"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-heading font-bold text-lg text-text-primary leading-tight">
                RoadAid Emergency Center
              </h1>
              <Badge variant="danger" size="sm" dot dotPing>
                LIVE
              </Badge>
            </div>
            <p className="text-xs text-text-secondary">
              GPS Priority Dispatch Line · Active
            </p>
          </div>
        </div>

        {/* SOS Emergency Hotline */}
        <div className="flex items-center gap-3">
          <a
            href="tel:112"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-danger/10 border border-danger/30 text-danger text-xs font-mono font-semibold hover:bg-danger/20 transition-colors"
            title="Dial Police / Ambulance in India"
          >
            <AlertCircle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">SOS</span> 112
          </a>
          <a
            href="tel:1800-ROADAID"
            className="hidden md:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-surface border border-white/[0.08] text-text-secondary text-xs hover:text-text-primary transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5 text-primary" />
            <span>Support: 1800-ROADAID</span>
          </a>
        </div>
      </div>
    </header>
  );
};
