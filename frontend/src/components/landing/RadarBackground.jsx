import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export const RadarBackground = () => {
  const prefersReducedMotion = useReducedMotion();

  // 6 nearby mechanic patrol pins with custom angles/radii
  const blips = [
    { id: 1, angle: 35, dist: 130, delay: 0.4, label: "Rahul S." },
    { id: 2, angle: 110, dist: 190, delay: 1.2, label: "Vikram P." },
    { id: 3, angle: 195, dist: 110, delay: 2.1, label: "Amit V." },
    { id: 4, angle: 260, dist: 220, delay: 2.8, label: "Priya N." },
    { id: 5, angle: 320, dist: 160, delay: 3.4, label: "Rajesh K." },
    { id: 6, angle: 75, dist: 260, delay: 0.9, label: "Suresh D." },
  ];

  return (
    <div 
      aria-hidden="true" 
      className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center select-none z-0"
    >
      {/* Concentric rings */}
      <div className="relative w-[600px] h-[600px] sm:w-[720px] sm:h-[720px] rounded-full border border-white/[0.04] flex items-center justify-center">
        <div className="w-[460px] h-[460px] sm:w-[540px] sm:h-[540px] rounded-full border border-white/[0.06] flex items-center justify-center">
          <div className="w-[300px] h-[300px] sm:w-[360px] sm:h-[360px] rounded-full border border-white/[0.08] flex items-center justify-center">
            <div className="w-[160px] h-[160px] sm:w-[180px] sm:h-[180px] rounded-full border border-primary/20 flex items-center justify-center">
              
              {/* Center User Dot ("Stranded Driver") */}
              <div className="relative flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-primary shadow-glow-primary z-20 border-2 border-[#0B0F1A]" />
                {!prefersReducedMotion && (
                  <motion.div
                    animate={{ scale: [1, 2.4], opacity: [0.7, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                    className="absolute w-6 h-6 rounded-full bg-primary/40 pointer-events-none"
                  />
                )}
              </div>

            </div>
          </div>
        </div>

        {/* Rotating conic sweep beam */}
        {!prefersReducedMotion && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full"
            style={{
              background: 'conic-gradient(from 0deg, transparent 270deg, rgba(255, 159, 28, 0.04) 330deg, rgba(255, 159, 28, 0.18) 360deg)',
            }}
          />
        )}

        {/* Radar crosshairs */}
        <div className="absolute inset-x-0 h-[1px] bg-white/[0.04]" />
        <div className="absolute inset-y-0 w-[1px] bg-white/[0.04]" />

        {/* Mechanic radar blips blinking as sweep hits them */}
        {blips.map((blip) => {
          const rad = (blip.angle * Math.PI) / 180;
          const x = Math.cos(rad) * blip.dist;
          const y = Math.sin(rad) * blip.dist;

          return (
            <div
              key={blip.id}
              className="absolute z-10 flex flex-col items-center"
              style={{
                transform: `translate(${x}px, ${y}px)`,
              }}
            >
              <motion.div
                animate={!prefersReducedMotion ? {
                  opacity: [0.2, 1, 0.3],
                  scale: [0.8, 1.25, 0.9],
                } : { opacity: 0.8 }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: blip.delay,
                  ease: "easeInOut",
                }}
                className="relative flex items-center justify-center"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-accent shadow-glow-accent border border-[#0B0F1A]" />
                <div className="absolute w-5 h-5 rounded-full bg-accent/20 animate-ping opacity-60" />
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
