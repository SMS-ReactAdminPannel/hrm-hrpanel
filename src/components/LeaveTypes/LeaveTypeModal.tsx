import {  useRef } from 'react';
import type { Card, NewCard } from './types';
import { FONTS } from '../../constants/uiConstants';

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
  editingCard
}: LeaveTypeModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   function handleClickOutside(event: MouseEvent) {
  //     if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
  //       onClose();
  //     }
  //   }

  //   if (isOpen) {
  //     document.addEventListener('mousedown', handleClickOutside);
  //   }
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, [isOpen, onClose]);

  
  

  if (!isOpen) return null;
 
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="bg-clip-padding backdrop-filter border rounded-md backdrop-blur bg-opacity-10 backdrop-saturate-100 backdrop-contrast-100 shadow-2xl w-[400px]"
      >
        <div className="p-4 px-6">
          <div className="flex justify-between items-center border-b pb-4 mb-2">
            <h3 className="text-xl font-semibold text-white" style={{...FONTS.header3}}>
              {editingCard ? "Edit Leave Type" : "Create New Leave Type"}
            </h3>
            <button
              onClick={onClose}
              className="text-white rounded hover:text-gray-600 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-white" style={{ ...FONTS.paragraph}}>Title<span className="text-red-500">*</span></label>
              <input
                type="text"
                className="p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#006666] transition"
                value={newCard.holiday_name}
                onChange={(e) => setNewCard({ ...newCard, holiday_name: e.target.value })}
                placeholder="Enter leave type title"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-white" style={{ ...FONTS.paragraph }}>Description<span className="text-red-500">*</span></label>
              <input
                type="text"
                className="p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#006666] transition"
                placeholder="Description"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-white" style={{ ...FONTS.paragraph }}>Total Days<span className="text-red-500">*</span></label>
              <input
                type="number"
                className="p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#006666] transition"
                value={newCard.holiday_date}
                onChange={(e) => setNewCard({ ...newCard, holiday_date: e.target.value })}
                placeholder="Enter total days"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-white" style={{ ...FONTS.paragraph }}>Is Paid</label>
              <select
                className="p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#006666] transition text-gray-700"
                value={newCard.holiday_type}
                onChange={(e) => setNewCard({ ...newCard, holiday_type: e.target.value })}
              >
                <option value="Paid">Paid</option>
                <option value="Unpaid">Unpaid</option>
                <option value="Partial">Partial</option>
                
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-2">
            <button
              className="px-5 border border-gray-300 text-white rounded-lg hover:bg-gray-500 transition"
              onClick={onClose}
              type="button"
              style={{ ...FONTS.button}}
            >
              Cancel
            </button>
            <button
              className={`px-5 py-1 rounded-lg text-white transition ${!newCard.holiday_name || !newCard.holiday_date
                ? 'bg-[#006666] opacity-50 cursor-not-allowed'
                : 'bg-[#006666] hover:bg-[#004d4d]'
                }`}
              onClick={onSubmit}
              type="button"
              disabled={!newCard.holiday_name || !newCard.holiday_date}
              style={{ ...FONTS.button }}
            >
              {editingCard ? "Update" : "Create"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
