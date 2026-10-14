import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DashboardHeader } from '../components/dashboard/DashboardHeader';
import { LocationModule } from '../components/dashboard/LocationModule';
import { IssueSelectorModule } from '../components/dashboard/IssueSelectorModule';
import { RequestSummaryBar } from '../components/dashboard/RequestSummaryBar';
import { LiveStatusTracker } from '../components/dashboard/LiveStatusTracker';
import { CancelModal } from '../components/dashboard/CancelModal';
import { Button } from '../components/ui/Button';
import { GlassCard } from '../components/ui/GlassCard';
import { useGeolocation } from '../hooks/useGeolocation';
import { useRequestFlow } from '../hooks/useRequestFlow';
import { ISSUE_TYPES } from '../services/mockApi';
import { pageEntrance } from '../lib/motion';
import { AlertCircle, RotateCcw } from 'lucide-react';

export const UserDashboardPage = () => {
  const [selectedIssueId, setSelectedIssueId] = useState(null);
  const [customNote, setCustomNote] = useState('');

  const geo = useGeolocation();
  const flow = useRequestFlow();

  const isDispatched = flow.stage !== 'idle' && flow.stage !== 'cancelled';
  const selectedIssue = ISSUE_TYPES.find((i) => i.id === selectedIssueId);

  const handleStartRequest = () => {
    if (!geo.coords || !selectedIssueId) return;
    flow.submitRequest({
      location: {
        coords: geo.coords,
        address: geo.addressDetails?.formatted || 'GPS Road Pin',
      },
      issue: selectedIssue,
      note: customNote,
    });
  };

  return (
    <div className="min-h-screen bg-background ambient-background pb-28 sm:pb-16 text-text-primary">
      <DashboardHeader stage={flow.stage} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        <motion.div
          variants={pageEntrance}
          initial="initial"
          animate="animate"
          className="space-y-6 sm:space-y-8"
        >
          {/* Cancelled State View */}
          {flow.stage === 'cancelled' && (
            <GlassCard className="p-8 text-center max-w-lg mx-auto border-danger/30 space-y-4">
              <div className="w-12 h-12 rounded-full bg-danger/10 border border-danger/25 text-danger flex items-center justify-center mx-auto">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h2 className="font-heading text-xl font-bold">Request Withdrawn</h2>
              <p className="text-xs text-text-secondary">
                Your dispatch was successfully cancelled. You can launch a fresh request anytime.
              </p>
              <Button size="sm" variant="primary" icon={RotateCcw} onClick={flow.resetFlow}>
                Create New Request
              </Button>
            </GlassCard>
          )}

          {/* Setup Bento Grid (Location: span 5, Issue: span 7) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            <div className="lg:col-span-5">
              <LocationModule
                status={geo.status}
                coords={geo.coords}
                addressDetails={geo.addressDetails}
                error={geo.error}
                onRequestLocation={geo.requestLocation}
                onSetManualAddress={geo.setManualAddress}
                onFallbackMock={geo.fallbackMockLocation}
                disabled={isDispatched}
              />
            </div>

            <div className="lg:col-span-7">
              <IssueSelectorModule
                selectedIssueId={selectedIssueId}
                onSelectIssue={setSelectedIssueId}
                customNote={customNote}
                onChangeCustomNote={setCustomNote}
                disabled={isDispatched}
              />
            </div>
          </div>

          {/* Desktop Summary / Dispatch Action Bar */}
          {!isDispatched && flow.stage !== 'cancelled' && (
            <div className="hidden sm:block">
              <RequestSummaryBar
                hasLocation={!!geo.coords}
                hasIssue={!!selectedIssueId}
                selectedIssueTitle={selectedIssue?.title}
                locationSummary={geo.addressDetails?.formatted}
                onSubmit={handleStartRequest}
              />
            </div>
          )}

          {/* Module C: Live Status Tracker (Appears after submit with layout animation) */}
          <AnimatePresence>
            {isDispatched && (
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <LiveStatusTracker
                  stage={flow.stage}
                  requestId={flow.requestId}
                  driverCoords={geo.coords}
                  assignedMechanic={flow.assignedMechanic}
                  visibleCandidates={flow.visibleCandidates}
                  etaRemainingSeconds={flow.etaRemainingSeconds}
                  onOpenCancelModal={() => flow.setIsCancelModalOpen(true)}
                  onReset={flow.resetFlow}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>

      {/* Mobile Sticky Bottom Action Bar (375px responsive) */}
      {!isDispatched && flow.stage !== 'cancelled' && (
        <div className="sm:hidden fixed bottom-0 left-0 right-0 p-3 bg-[#0B0F1A]/95 backdrop-blur-2xl border-t border-white/[0.08] z-30 shadow-2xl">
          <RequestSummaryBar
            hasLocation={!!geo.coords}
            hasIssue={!!selectedIssueId}
            selectedIssueTitle={selectedIssue?.title}
            locationSummary={geo.addressDetails?.formatted}
            onSubmit={handleStartRequest}
          />
        </div>
      )}

      {/* Cancellation Modal */}
      <CancelModal
        isOpen={flow.isCancelModalOpen}
        onClose={() => flow.setIsCancelModalOpen(false)}
        onConfirmCancel={flow.confirmCancel}
        requestId={flow.requestId}
      />
    </div>
  );
};
