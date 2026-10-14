import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { AlertCircle } from 'lucide-react';

export const CancelModal = ({
  isOpen,
  onClose,
  onConfirmCancel,
  requestId,
}) => {
  const [selectedReason, setSelectedReason] = useState('Found alternate assistance');

  const reasons = [
    'Found alternate assistance / friendly driver',
    'Managed to fix or restart vehicle myself',
    'ETA is longer than expected',
    'Accidental / test request',
  ];

  const handleConfirm = () => {
    onConfirmCancel(selectedReason);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Cancel Roadside Dispatch?"
      description={`Request #${requestId || 'RA-ACTIVE'} is currently allocated to a nearby mobile mechanic.`}
    >
      <div className="space-y-4 pt-2">
        <div className="p-3 rounded-xl bg-danger/10 border border-danger/25 text-danger flex items-start gap-2.5 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>
            Canceling will immediately release the dispatched technician and cancel GPS patrol tracking.
          </span>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium text-text-secondary">
            Reason for cancellation:
          </label>
          <div className="space-y-1.5">
            {reasons.map((reason) => (
              <label
                key={reason}
                className="flex items-center gap-2.5 p-2 rounded-lg bg-surface hover:bg-surface-hover cursor-pointer border border-white/[0.06] text-xs text-text-primary transition-colors"
              >
                <input
                  type="radio"
                  name="cancel-reason"
                  checked={selectedReason === reason}
                  onChange={() => setSelectedReason(reason)}
                  className="accent-primary"
                />
                <span>{reason}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="pt-3 border-t border-white/[0.08] flex items-center justify-end gap-2.5">
          <Button variant="ghost" size="sm" onClick={onClose}>
            Keep Dispatch
          </Button>
          <Button variant="danger" size="sm" onClick={handleConfirm}>
            Yes, Cancel Request
          </Button>
        </div>
      </div>
    </Modal>
  );
};
