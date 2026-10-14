import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Radio, 
  Navigation, 
  XCircle, 
  ShieldCheck 
} from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { MechanicProfileCard } from './MechanicProfileCard';
import { LeafletMap } from './LeafletMap';

export const LiveStatusTracker = ({
  stage,
  requestId,
  driverCoords,
  assignedMechanic,
  visibleCandidates,
  etaRemainingSeconds,
  onOpenCancelModal,
  onReset,
}) => {
  // Format ETA into mm:ss
  const formatEta = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Compute simulated mechanic position during 'en_route'
  const mechPos = assignedMechanic && driverCoords ? [
    driverCoords.lat + (assignedMechanic.latOffset || 0.006) * (etaRemainingSeconds / 240),
    driverCoords.lng + (assignedMechanic.lngOffset || 0.007) * (etaRemainingSeconds / 240),
  ] : null;

  const stages = [
    { key: 'sent', label: 'Request sent to dispatch tower' },
    { key: 'finding', label: 'Locating nearby patrol units (3km radius)' },
    { key: 'assigned', label: 'Mechanic matched & accepted' },
    { key: 'en_route', label: 'Mechanic en route to your vehicle' },
  ];

  const stageOrder = ['sent', 'finding', 'assigned', 'en_route'];
  const currentIndex = stageOrder.indexOf(stage);

  return (
    <GlassCard className="p-6 sm:p-8 space-y-8 border-primary/20">
      {/* Tracker Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-white/[0.06] border border-white/10 text-primary">
              #{requestId || 'RA-8492'}
            </span>
            <Badge variant={stage === 'en_route' ? 'success' : 'accent'} size="sm" dot dotPing>
              {stage === 'en_route' ? 'En Route' : 'Dispatch Active'}
            </Badge>
          </div>
          <h2 className="font-heading text-xl sm:text-2xl font-bold text-text-primary mt-2">
            Live Rescue Dispatch Center
          </h2>
        </div>

        {/* ETA & Distance Card */}
        <div className="flex items-center gap-3 bg-background/60 border border-white/10 px-4 py-2.5 rounded-2xl">
          <div className="text-right">
            <span className="text-[10px] font-mono uppercase tracking-wider text-text-muted block">
              Estimated Arrival
            </span>
            <span className="font-mono text-2xl font-bold text-primary">
              {stage === 'en_route' ? formatEta(etaRemainingSeconds) : '~4 min'}
            </span>
          </div>
          <div className="w-[1px] h-8 bg-white/10 mx-1" />
          <div className="text-left">
            <span className="text-[10px] font-mono uppercase tracking-wider text-text-muted block">
              Distance
            </span>
            <span className="font-mono text-base font-semibold text-text-primary">
              1.2 km
            </span>
          </div>
        </div>
      </div>

      {/* Bento Grid inside tracker: Left Stepper & Candidates (5 cols), Right Live Map (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: 4-Stage Vertical Stepper */}
        <div className="lg:col-span-5 space-y-6" aria-live="assertive">
          <div className="space-y-6 relative">
            {/* Connecting Vertical line */}
            <div className="absolute top-4 bottom-4 left-4 w-0.5 bg-white/10 -translate-x-1/2 z-0" />

            {stages.map((stg, idx) => {
              const isPast = currentIndex > idx;
              const isCurrent = currentIndex === idx;
              const isFuture = currentIndex < idx;

              return (
                <div key={stg.key} className="flex items-start gap-4 relative z-10">
                  {/* Step icon node */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-all ${
                    isPast
                      ? 'bg-success text-[#0B0F1A] border-success shadow-[0_0_12px_rgba(52,211,153,0.3)]'
                      : isCurrent
                      ? 'bg-primary text-[#0B0F1A] border-primary shadow-glow-primary-sm animate-pulse'
                      : 'bg-background border-white/20 text-text-muted'
                  }`}>
                    {isPast ? (
                      <CheckCircle2 className="w-4 h-4 font-bold" />
                    ) : (
                      <span className="text-xs font-mono font-bold">{idx + 1}</span>
                    )}
                  </div>

                  {/* Step Title & Details */}
                  <div className="min-w-0 pt-0.5">
                    <p className={`text-sm font-medium ${
                      isCurrent ? 'text-primary font-semibold' : isPast ? 'text-text-primary' : 'text-text-muted'
                    }`}>
                      {stg.label}
                    </p>

                    {/* Candidate mechanic avatars appearing in Stage 2 */}
                    {stg.key === 'finding' && isCurrent && (
                      <div className="mt-3 p-3 rounded-xl bg-surface border border-accent/25 space-y-2">
                        <div className="flex items-center gap-2 text-xs text-accent">
                          <Radio className="w-3.5 h-3.5 animate-pulse" />
                          <span>Pinging active units in your quadrant…</span>
                        </div>
                        <div className="flex items-center gap-2 pt-1">
                          <AnimatePresence>
                            {visibleCandidates.map((c) => (
                              <motion.div
                                key={c.id}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="relative"
                              >
                                <img
                                  src={c.avatar}
                                  alt={c.name}
                                  className="w-8 h-8 rounded-full object-cover border border-accent"
                                />
                                <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-success" />
                              </motion.div>
                            ))}
                          </AnimatePresence>
                          <span className="text-xs font-mono text-text-secondary pl-1">
                            {visibleCandidates.length}/3 online
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Assigned Mechanic Profile Card if reached Stage 3 */}
          {(stage === 'assigned' || stage === 'en_route') && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <MechanicProfileCard mechanic={assignedMechanic} />
            </motion.div>
          )}
        </div>

        {/* Right: Map with Moving Mechanic Pin & Progress Bar */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <LeafletMap
              driverPos={driverCoords ? [driverCoords.lat, driverCoords.lng] : [12.9279, 77.6271]}
              mechanicPos={mechPos}
              accuracy={driverCoords?.accuracy || 12}
              zoom={14}
              className="h-80 sm:h-96 w-full"
            />

            {/* Float Overlay on Map: En Route Progress */}
            {stage === 'en_route' && (
              <div className="absolute top-4 left-4 right-4 z-20">
                <GlassCard className="p-3.5 flex items-center justify-between gap-3 bg-[#0B0F1A]/85 backdrop-blur-md border-primary/30">
                  <div className="flex items-center gap-2.5">
                    <Navigation className="w-4 h-4 text-primary animate-pulse" />
                    <div>
                      <p className="text-xs font-semibold text-text-primary">
                        Rahul is driving towards you
                      </p>
                      <p className="text-[11px] font-mono text-text-secondary">
                        Speed ~34 km/h via Outer Ring Road
                      </p>
                    </div>
                  </div>
                  <Badge variant="primary" size="sm" className="font-mono">
                    {formatEta(etaRemainingSeconds)}
                  </Badge>
                </GlassCard>
              </div>
            )}
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between gap-3 pt-2">
            <Button
              variant="danger"
              size="sm"
              icon={XCircle}
              onClick={onOpenCancelModal}
            >
              Cancel Request
            </Button>
            <div className="flex items-center gap-2 text-xs text-text-muted font-mono">
              <ShieldCheck className="w-4 h-4 text-success" />
              <span>Direct Emergency Link Encrypted</span>
            </div>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};
