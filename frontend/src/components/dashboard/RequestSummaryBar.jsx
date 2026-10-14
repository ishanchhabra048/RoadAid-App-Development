import React from 'react';
import { ArrowRight, Check, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { Tooltip } from '../ui/Tooltip';
import { GlassCard } from '../ui/GlassCard';

export const RequestSummaryBar = ({
  hasLocation,
  hasIssue,
  selectedIssueTitle,
  locationSummary,
  onSubmit,
  isSubmitting = false,
}) => {
  const isReady = hasLocation && hasIssue;

  // Tooltip content explaining what is missing
  const getMissingTooltip = () => {
    if (!hasLocation && !hasIssue) return "Please share your location and pick an issue to continue";
    if (!hasLocation) return "Please detect or enter your breakdown location above";
    if (!hasIssue) return "Please choose your vehicle problem above";
    return "";
  };

  return (
    <GlassCard className="p-4 sm:p-5 border-white/[0.12] bg-surface-elevated/90 backdrop-blur-2xl">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Status Checklist */}
        <div className="flex flex-wrap items-center gap-4 text-xs w-full sm:w-auto">
          {/* Step 1 indicator */}
          <div className="flex items-center gap-2">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
              hasLocation ? 'bg-success text-[#0B0F1A]' : 'bg-white/10 text-text-muted'
            }`}>
              {hasLocation ? <Check className="w-3.5 h-3.5" /> : '1'}
            </div>
            <span className={hasLocation ? 'text-text-primary font-medium' : 'text-text-muted'}>
              {hasLocation ? (locationSummary || 'Location locked') : 'Location needed'}
            </span>
          </div>

          <span className="text-white/20 hidden sm:inline">|</span>

          {/* Step 2 indicator */}
          <div className="flex items-center gap-2">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
              hasIssue ? 'bg-success text-[#0B0F1A]' : 'bg-white/10 text-text-muted'
            }`}>
              {hasIssue ? <Check className="w-3.5 h-3.5" /> : '2'}
            </div>
            <span className={hasIssue ? 'text-text-primary font-medium' : 'text-text-muted'}>
              {hasIssue ? selectedIssueTitle : 'Issue unselected'}
            </span>
          </div>
        </div>

        {/* CTA Button with Tooltip when disabled */}
        <div className="w-full sm:w-auto flex justify-end">
          <Tooltip content={getMissingTooltip()} disabled={isReady}>
            <Button
              size="lg"
              disabled={!isReady || isSubmitting}
              loading={isSubmitting}
              withPulse={isReady}
              onClick={onSubmit}
              icon={ArrowRight}
              iconPosition="right"
              className="w-full sm:w-auto px-8 py-3.5 text-base font-bold"
            >
              Request Help Now
            </Button>
          </Tooltip>
        </div>
      </div>
    </GlassCard>
  );
};
