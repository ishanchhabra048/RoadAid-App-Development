import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Navigation, 
  AlertTriangle, 
  RotateCw, 
  Edit3, 
  Check, 
  Crosshair 
} from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { LeafletMap } from './LeafletMap';
import { stateCrossfade } from '../../lib/motion';
import { formatCoordinates } from '../../lib/utils';

export const LocationModule = ({
  status,
  coords,
  addressDetails,
  error,
  onRequestLocation,
  onSetManualAddress,
  onFallbackMock,
  disabled = false,
}) => {
  const [manualMode, setManualMode] = useState(false);
  const [addressInput, setAddressInput] = useState('');

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (!addressInput.trim()) return;
    onSetManualAddress(addressInput.trim());
    setManualMode(false);
  };

  return (
    <GlassCard className="p-6 h-full flex flex-col justify-between relative overflow-hidden">
      <div>
        {/* Module Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-semibold font-heading text-text-primary">
                1. Breakdown Location
              </h2>
              <p className="text-xs text-text-secondary">
                Exact pin for patrol dispatch
              </p>
            </div>
          </div>

          {/* Status Badge */}
          {status === 'success' && (
            <Badge variant="success" size="sm" dot>
              Location Locked
            </Badge>
          )}
          {status === 'requesting' && (
            <Badge variant="accent" size="sm" dot dotPing>
              Acquiring GPS…
            </Badge>
          )}
          {status === 'error' && (
            <Badge variant="danger" size="sm">
              Permission Needed
            </Badge>
          )}
        </div>

        {/* Dynamic Content by State */}
        <AnimatePresence mode="wait">
          {/* STATE: IDLE */}
          {status === 'idle' && !manualMode && (
            <motion.div
              key="idle"
              variants={stateCrossfade}
              initial="initial"
              animate="animate"
              exit="exit"
              className="py-6 flex flex-col items-center text-center space-y-4"
            >
              <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-surface border border-white/10">
                <Navigation className="w-7 h-7 text-primary" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-text-primary">
                  Share your live breakdown coordinates
                </p>
                <p className="text-xs text-text-secondary max-w-xs">
                  We use browser GPS to route mechanics directly to your vehicle's lane.
                </p>
              </div>
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-2.5 w-full max-w-xs">
                <Button
                  size="md"
                  onClick={onRequestLocation}
                  disabled={disabled}
                  icon={Navigation}
                  className="w-full"
                >
                  Locate Me Automatically
                </Button>
                <button
                  type="button"
                  onClick={() => setManualMode(true)}
                  disabled={disabled}
                  className="text-xs text-text-muted hover:text-text-primary transition-colors underline underline-offset-4 py-1"
                >
                  Or enter address manually
                </button>
              </div>
            </motion.div>
          )}

          {/* STATE: MANUAL INPUT */}
          {manualMode && (
            <motion.form
              key="manual"
              variants={stateCrossfade}
              initial="initial"
              animate="animate"
              exit="exit"
              onSubmit={handleManualSubmit}
              className="py-4 space-y-3"
            >
              <label htmlFor="address-input" className="text-xs text-text-secondary block font-medium">
                Enter landmark, highway km-stone, or street:
              </label>
              <input
                id="address-input"
                type="text"
                value={addressInput}
                onChange={(e) => setAddressInput(e.target.value)}
                placeholder="e.g. Near Silk Board Flyover, Hosur Rd, Bengaluru"
                className="w-full rounded-xl bg-background/60 border border-white/10 px-3.5 py-2.5 text-xs text-text-primary placeholder:text-text-muted outline-none focus:border-accent"
                autoFocus
              />
              <div className="flex items-center gap-2">
                <Button type="submit" size="sm" variant="accent" disabled={!addressInput.trim()}>
                  Confirm Address
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={() => setManualMode(false)}
                >
                  Cancel
                </Button>
              </div>
            </motion.form>
          )}

          {/* STATE: REQUESTING (RADAR-PING LOADER) */}
          {status === 'requesting' && (
            <motion.div
              key="requesting"
              variants={stateCrossfade}
              initial="initial"
              animate="animate"
              exit="exit"
              className="py-8 flex flex-col items-center justify-center text-center space-y-4"
            >
              <div className="relative flex items-center justify-center w-20 h-20">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent/30 opacity-75" />
                <span className="relative flex items-center justify-center w-12 h-12 rounded-full bg-accent/20 border border-accent/40 text-accent">
                  <Crosshair className="w-6 h-6 animate-spin" />
                </span>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-text-primary">
                  Locating your breakdown position…
                </p>
                <p className="text-xs text-text-secondary font-mono">
                  Connecting to high-accuracy satellite GPS
                </p>
              </div>
            </motion.div>
          )}

          {/* STATE: SUCCESS */}
          {status === 'success' && coords && (
            <motion.div
              key="success"
              variants={stateCrossfade}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-3"
            >
              {/* Mini Dark Leaflet Map */}
              <LeafletMap
                driverPos={[coords.lat, coords.lng]}
                accuracy={coords.accuracy}
                className="h-44 w-full rounded-xl overflow-hidden border border-white/10"
              />

              {/* Coordinates & Accuracy Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
                <span className="font-mono text-primary font-medium bg-primary/10 px-2.5 py-1 rounded-md border border-primary/20">
                  {formatCoordinates(coords.lat, coords.lng)}
                </span>
                <Badge variant="accent" size="sm">
                  Accuracy ±{coords.accuracy || 12}m
                </Badge>
              </div>

              {/* Formatted address */}
              <div className="rounded-xl bg-background/50 border border-white/[0.06] p-3 text-xs text-text-secondary flex items-start justify-between gap-2">
                <p className="leading-relaxed line-clamp-2">
                  {addressDetails?.formatted || "Live GPS pinned on road"}
                </p>
                <button
                  type="button"
                  onClick={() => setManualMode(true)}
                  disabled={disabled}
                  className="text-text-muted hover:text-text-primary p-1 rounded transition-colors shrink-0"
                  title="Edit address"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STATE: ERROR (Permission Denied / Timeout) */}
          {status === 'error' && (
            <motion.div
              key="error"
              variants={stateCrossfade}
              initial="initial"
              animate="animate"
              exit="exit"
              className="py-5 space-y-4"
            >
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-danger/10 border border-danger/25 text-danger">
                <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <p className="font-semibold text-text-primary">
                    Unable to detect automatic location
                  </p>
                  <p className="text-text-secondary leading-relaxed">
                    {error || "Location access was blocked by your browser settings."}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={onRequestLocation}
                  icon={RotateCw}
                >
                  Retry GPS
                </Button>
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => onFallbackMock("outer-ring-road")}
                >
                  Use Mock Bengaluru GPS
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer hint */}
      {status === 'success' && !disabled && (
        <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-text-muted">
          <span>Signal: High (Galileo / GPS)</span>
          <button
            type="button"
            onClick={onRequestLocation}
            className="text-accent hover:underline flex items-center gap-1"
          >
            <RotateCw className="w-3 h-3" /> Refresh Pin
          </button>
        </div>
      )}
    </GlassCard>
  );
};
