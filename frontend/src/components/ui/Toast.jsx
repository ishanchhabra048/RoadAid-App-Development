import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, XCircle, X } from 'lucide-react';
import { cn } from '../../lib/utils';

export const ToastItem = ({ toast, onDismiss }) => {
  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-success shrink-0" />,
    danger: <XCircle className="w-5 h-5 text-danger shrink-0" />,
    warning: <AlertCircle className="w-5 h-5 text-primary shrink-0" />,
    info: <Info className="w-5 h-5 text-accent shrink-0" />,
  };

  const borders = {
    success: 'border-success/30 shadow-[0_0_24px_rgba(52,211,153,0.15)]',
    danger: 'border-danger/30 shadow-[0_0_24px_rgba(248,113,113,0.15)]',
    warning: 'border-primary/30 shadow-[0_0_24px_rgba(255,159,28,0.15)]',
    info: 'border-accent/30 shadow-[0_0_24px_rgba(56,189,248,0.15)]',
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.18 } }}
      className={cn(
        'relative flex items-start gap-3 w-full max-w-sm rounded-xl p-4',
        'bg-[#121927]/90 backdrop-blur-xl border',
        borders[toast.type] || borders.info
      )}
      role="status"
    >
      {icons[toast.type] || icons.info}
      
      <div className="flex-1 min-w-0 pr-2">
        {toast.title && (
          <h4 className="text-sm font-semibold text-text-primary leading-tight">
            {toast.title}
          </h4>
        )}
        <p className="text-xs text-text-secondary mt-0.5 leading-relaxed">
          {toast.message}
        </p>
      </div>

      <button
        onClick={() => onDismiss(toast.id)}
        aria-label="Dismiss notification"
        className="text-text-muted hover:text-text-primary p-0.5 rounded transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

export const ToastContainer = ({ toasts = [], onDismiss }) => {
  return (
    <aside 
      aria-label="Notifications" 
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-md w-full pointer-events-none px-4 sm:px-0"
    >
      <div className="flex flex-col gap-2.5 w-full items-end pointer-events-auto">
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => (
            <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
          ))}
        </AnimatePresence>
      </div>
    </aside>
  );
};
