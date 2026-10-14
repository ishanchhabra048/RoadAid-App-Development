import React from 'react';
import { Navbar } from '../components/landing/Navbar';
import { Hero } from '../components/landing/Hero';
import { HowItWorks } from '../components/landing/HowItWorks';
import { CtaBanner } from '../components/landing/CtaBanner';
import { Footer } from '../components/landing/Footer';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background ambient-background text-text-primary selection:bg-primary/20">
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <CtaBanner />
      </main>
      <Footer />
    </div>
  );
};
