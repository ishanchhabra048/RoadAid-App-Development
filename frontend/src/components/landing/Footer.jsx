import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench, Shield, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t border-white/[0.08] bg-[#070A12] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-text-secondary">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 text-primary">
            <Wrench className="w-4 h-4" />
          </div>
          <span className="font-heading font-semibold text-text-primary text-base">
            Road<span className="text-primary">Aid</span>
          </span>
          <span className="text-xs text-text-muted">
            · Emergency roadside intelligence
          </span>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm">
          <Link to="/" className="hover:text-text-primary transition-colors">Safety Standard</Link>
          <Link to="/mechanic" className="hover:text-text-primary transition-colors">Join as Partner Mechanic</Link>
          <a href="#how-it-works" className="hover:text-text-primary transition-colors">Coverage Map</a>
          <span className="text-white/20">|</span>
          <span className="inline-flex items-center gap-1.5 font-mono text-xs text-success">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            Dispatch API Online
          </span>
        </div>

        {/* Copyright */}
        <div className="text-xs text-text-muted flex items-center gap-1">
          <span>© {new Date().getFullYear()} RoadAid Technologies India Inc.</span>
        </div>
      </div>
    </footer>
  );
};
