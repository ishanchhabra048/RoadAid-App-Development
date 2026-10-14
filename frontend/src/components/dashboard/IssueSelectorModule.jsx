import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Disc, AlertTriangle, Zap, Fuel, CheckCircle2, FileText } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { ISSUE_TYPES } from '../../services/mockApi';
import { cn } from '../../lib/utils';

export const IssueSelectorModule = ({
  selectedIssueId,
  onSelectIssue,
  customNote,
  onChangeCustomNote,
  disabled = false,
}) => {
  const iconMap = {
    Disc: Disc,
    AlertTriangle: AlertTriangle,
    Zap: Zap,
    Fuel: Fuel,
  };

  return (
    <GlassCard className="p-6 h-full flex flex-col justify-between">
      <div>
        {/* Module Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-semibold font-heading text-text-primary">
                2. Select Vehicle Problem
              </h2>
              <p className="text-xs text-text-secondary">
                Matches technicians with the right equipment
              </p>
            </div>
          </div>
        </div>

        {/* 2x2 Bento Grid of Issue Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {ISSUE_TYPES.map((issue) => {
            const Icon = iconMap[issue.iconName] || Disc;
            const isSelected = selectedIssueId === issue.id;

            return (
              <button
                type="button"
                key={issue.id}
                disabled={disabled}
                onClick={() => onSelectIssue(issue.id)}
                className={cn(
                  'relative text-left p-4 rounded-xl border transition-all duration-200 outline-none group',
                  isSelected
                    ? 'border-primary bg-primary/10 shadow-[0_0_24px_rgba(255,159,28,0.25)] ring-1 ring-primary'
                    : 'border-white/[0.08] bg-surface hover:bg-surface-hover hover:border-white/[0.15]',
                  disabled && 'opacity-50 pointer-events-none'
                )}
              >
                {/* Check Badge if Selected */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-3 right-3 text-primary"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </motion.div>
                )}

                <div className="flex items-start gap-3">
                  {/* Icon Circle */}
                  <div
                    className={cn(
                      'w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors',
                      isSelected
                        ? 'bg-primary text-[#0B0F1A]'
                        : 'bg-white/[0.05] text-primary border border-white/10 group-hover:bg-primary/20'
                    )}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="min-w-0 pr-4">
                    <h3 className="font-heading font-semibold text-sm text-text-primary group-hover:text-primary transition-colors">
                      {issue.title}
                    </h3>
                    <p className="text-xs text-text-secondary mt-0.5 line-clamp-2 leading-relaxed">
                      {issue.description}
                    </p>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-text-muted">
                  <span>Est. Service Cost</span>
                  <span className="text-text-primary font-medium">{issue.estimatedCost}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Smooth Expandable "Describe More" Textarea */}
        <AnimatePresence>
          {selectedIssueId && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <label htmlFor="issue-note" className="block text-xs text-text-secondary font-medium mb-1.5">
                Additional Notes (Optional: car make, landmark, sounds)
              </label>
              <textarea
                id="issue-note"
                rows={2}
                disabled={disabled}
                value={customNote}
                onChange={(e) => onChangeCustomNote(e.target.value)}
                placeholder="e.g. White Honda City 2021, right rear wheel completely flat on highway shoulder..."
                className="w-full rounded-xl bg-background/60 border border-white/10 px-3.5 py-2 text-xs text-text-primary placeholder:text-text-muted outline-none focus:border-primary transition-colors resize-none"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-text-muted">
        <span>Standard inspection included</span>
        <span>Zero advance deposit</span>
      </div>
    </GlassCard>
  );
};
