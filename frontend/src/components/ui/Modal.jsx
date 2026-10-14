import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { modalBackdrop, modalContent } from '../../lib/motion';
import { cn } from '../../lib/utils';

export const Modal = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  className,
  showCloseButton = true,
}) => {
  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? 'modal-title' : undefined}
          aria-describedby={description ? 'modal-desc' : undefined}
        >
          {/* Backdrop with blur */}
          <motion.div
            variants={modalBackdrop}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-md"
          />

          {/* Modal Panel */}
          <motion.div
            variants={modalContent}
            initial="initial"
            animate="animate"
            exit="exit"
            className={cn(
              'relative w-full max-w-lg rounded-2xl border border-white/[0.12] bg-[#121826] p-6 shadow-2xl',
              'backdrop-blur-2xl ring-1 ring-white/10 z-10',
              className
            )}
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                {title && (
                  <h3 id="modal-title" className="font-heading text-xl font-semibold text-text-primary">
                    {title}
                  </h3>
                )}
                {description && (
                  <p id="modal-desc" className="text-sm text-text-secondary mt-1">
                    {description}
                  </p>
                )}
              </div>
              {showCloseButton && (
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close dialog"
                  className="rounded-full p-1.5 text-text-secondary hover:text-text-primary hover:bg-white/[0.08] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
