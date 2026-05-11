import { useEffect } from 'react';

/**
 * ConfirmDialog – a lightweight modal for destructive actions.
 *
 * Props:
 *   open        {boolean}  – show/hide the dialog
 *   title       {string}   – dialog heading
 *   message     {string}   – body text
 *   confirmText {string}   – confirm button label (default "Delete")
 *   onConfirm   {function} – called when user confirms
 *   onCancel    {function} – called when user cancels / closes
 */
export default function ConfirmDialog({
  open,
  title = 'Are you sure?',
  message = 'This action cannot be undone.',
  confirmText = 'Delete',
  onConfirm,
  onCancel,
}) {
  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === 'Escape') onCancel?.(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onCancel]);

  // Prevent body scroll when dialog is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Dialog panel */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-7 flex flex-col gap-4 animate-fadeIn">
        {/* Icon */}
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-50 mx-auto">
          <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          </svg>
        </div>

        {/* Text */}
        <div className="text-center">
          <h3 id="confirm-dialog-title" className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
          <p className="text-sm text-gray-500">{message}</p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-1">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 px-4 rounded-xl text-sm font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors border-none cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 px-4 rounded-xl text-sm font-semibold bg-red-600 text-white hover:bg-red-700 transition-colors border-none cursor-pointer"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
