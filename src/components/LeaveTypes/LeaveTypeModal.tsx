import { useEffect, useRef } from 'react';
import type { Card, NewCard } from './types';

interface LeaveTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  newCard: NewCard;
  setNewCard: React.Dispatch<React.SetStateAction<NewCard>>;
  editingCard: Card | null;
}

export default function LeaveTypeModal({
  isOpen,
  onClose,
  onSubmit,
  newCard,
  setNewCard,
  editingCard,
}: LeaveTypeModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Inline CSS for animation */}
      <style>
        {`
          @keyframes slideUp {
            from { transform: translateY(100%); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          .animate-slide-up {
            animation: slideUp 0.3s ease-out forwards;
          }
        `}
      </style>

      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end md:items-center justify-center z-50">
        <div
          ref={modalRef}
          className="bg-white border rounded-md shadow-2xl w-full max-w-md mx-auto p-6 animate-slide-up"
        >
          <div className="flex justify-between items-center border-b pb-4 mb-4">
            <h3 className="text-xl font-semibold text-black">
              {editingCard ? 'Edit Leave Type' : 'Create New Leave Type'}
            </h3>
            <button
              onClick={onClose}
              className="text-black hover:text-gray-600 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-black">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#006666] outline-none"
                value={newCard.title}
                onChange={(e) =>
                  setNewCard({ ...newCard, title: e.target.value })
                }
                placeholder="Enter leave type title"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-black">
                Description <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#006666] outline-none"
                value={newCard.description}
                onChange={(e) =>
                  setNewCard({ ...newCard, description: e.target.value })
                }
                placeholder="Description"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-black">
                Total Days <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#006666] outline-none"
                value={newCard.totalDays}
                onChange={(e) =>
                  setNewCard({ ...newCard, totalDays: Number(e.target.value) })
                }
                placeholder="Enter total days"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-black">Is Paid</label>
              <select
                className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#006666] text-gray-700"
                value={newCard.isPaid}
                onChange={(e) =>
                  setNewCard({ ...newCard, isPaid: e.target.value })
                }
              >
                <option value="Paid">Paid</option>
                <option value="Unpaid">Unpaid</option>
                <option value="Partial">Partial</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              className="px-5 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 transition"
              onClick={onClose}
              type="button"
            >
              Cancel
            </button>
            <button
              className={`px-5 py-2 rounded-md text-white transition ${
                !newCard.title || !newCard.totalDays
                  ? 'bg-[#006666] opacity-50 cursor-not-allowed'
                  : 'bg-[#006666] hover:bg-[#004d4d]'
              }`}
              onClick={onSubmit}
              type="button"
              disabled={!newCard.title || !newCard.totalDays}
            >
              {editingCard ? 'Update' : 'Create'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
