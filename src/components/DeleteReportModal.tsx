import React, { useEffect } from 'react';

type DeleteReportModalProps = {
  open: boolean;
  title?: string;
  message?: string;
  onCancel: () => void;
  onConfirm: () => void;
};

// Modal styled per Figma node 191-86284
const DeleteReportModal: React.FC<DeleteReportModalProps> = ({
  open,
  title = 'Delete this report?',
  message = "Are you sure you want to delete this? You won't be able to get it back.",
  onCancel,
  onConfirm,
}) => {
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[10000]">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/30"
        aria-hidden="true"
        onClick={onCancel}
      />

      {/* Modal Card */}
      <div
        role="dialog"
        aria-modal="true"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-md w-[560px] max-w-[90vw]"
        style={{ boxShadow: '0px 18px 34px 0px rgba(14, 30, 62, 0.12)' }}
      >
        {/* Header */}
        <div className="px-6 py-5">
          <h3 className="text-[20px] leading-[28px] text-[#092540] font-medium">
            {title}
          </h3>
        </div>
        <div className="h-px w-full bg-transparent" />

        {/* Content */}
        <div className="px-6 pt-4 pb-6">
          <p className="text-[16px] leading-[22px] text-[#3a5166]">{message}</p>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 relative">
          <div className="absolute left-0 right-0 top-0 h-px bg-[#e6e9ec]" aria-hidden="true" />
          <div className="flex items-center justify-between">
            {/* Cancel (Flat) */}
            <button
              type="button"
              className="px-4 py-2 rounded-[18px] text-[14px] leading-[20px] text-[#195afe] font-medium hover:bg-[#f3f7ff] active:bg-[#e8eeff]"
              onClick={onCancel}
            >
              Cancel
            </button>

            {/* Confirm Delete (Danger) */}
            <button
              type="button"
              className="px-4 py-2 rounded-[18px] text-[14px] leading-[20px] font-bold text-white"
              style={{ backgroundColor: '#e60061' }}
              onClick={onConfirm}
            >
              Yes, Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteReportModal;


