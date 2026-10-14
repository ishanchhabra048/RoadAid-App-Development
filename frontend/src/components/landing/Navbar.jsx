import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Wrench, Shield, Menu, X, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
        scrolled
          ? 'bg-[#0B0F1A]/80 backdrop-blur-xl border-b border-white/[0.08] py-3.5 shadow-2xl'
          : 'bg-transparent py-5'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group outline-none">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 border border-primary/30 group-hover:border-primary/60 transition-colors shadow-glow-primary-sm">
              <Wrench className="w-5 h-5 text-primary group-hover:rotate-12 transition-transform duration-300" />
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-lg tracking-tight text-text-primary">
                Road<span className="text-primary">Aid</span>
              </span>
              <span className="text-[10px] font-mono tracking-wider text-text-muted uppercase">
                24/7 Dispatch
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm">
            <a 
              href="#how-it-works" 
              className="text-text-secondary hover:text-text-primary transition-colors focus-visible:ring-1 focus-visible:ring-accent rounded-md px-1 py-0.5"
            >
              How it works
            </a>
            <Link 
              to="/mechanic" 
              className="text-text-secondary hover:text-text-primary transition-colors focus-visible:ring-1 focus-visible:ring-accent rounded-md px-1 py-0.5 flex items-center gap-1.5"
            >
              <span>For Mechanics</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-accent/15 text-accent border border-accent/20">
                EARN
              </span>
            </Link>
          </nav>

          {/* Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/dashboard')}
            >
              Sign in
            </Button>
            <Button
              variant="primary"
              size="sm"
              withPulse
              onClick={() => navigate('/dashboard')}
              icon={ArrowRight}
              iconPosition="right"
            >
              Get help now
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden p-2 rounded-xl text-text-secondary hover:text-text-primary hover:bg-white/[0.06] transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/[0.08] bg-[#0B0F1A]/95 backdrop-blur-2xl px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-3">
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="text-text-secondary hover:text-text-primary py-2 text-base font-medium"
            >
              How it works
            </a>
            <Link
              to="/mechanic"
              onClick={() => setMobileMenuOpen(false)}
              className="text-text-secondary hover:text-text-primary py-2 text-base font-medium flex items-center justify-between"
            >
              <span>For Mechanics</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-accent/15 text-accent">EARN</span>
            </Link>
          </nav>
          <div className="pt-4 border-t border-white/[0.08] flex flex-col gap-3">
            <Button variant="ghost" className="w-full" onClick={() => { setMobileMenuOpen(false); navigate('/dashboard'); }}>
              Sign in
            </Button>
            <Button variant="primary" withPulse className="w-full" onClick={() => { setMobileMenuOpen(false); navigate('/dashboard'); }}>
              Get help now
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
