import type { Card } from './types';
import DetailItem from './DetailItem';

interface LeaveTypeDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCard: Card | null;
  // cardColors: Record<number, string>;
  getInitials: (title: string) => string;
}

export default function LeaveTypeDetailsModal({
  isOpen,
  onClose,
  selectedCard,
  // cardColors,
  getInitials
}: LeaveTypeDetailsModalProps) {
  if (!isOpen || !selectedCard) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-50 rounded-md shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <div className={`w-12 h-12 rounded-full ${cardColors[selectedCard._id] || 'bg-blue-200'} flex items-center justify-center text-black text-xl font-bold mr-4`}>
                {getInitials(selectedCard.title)}
              </div>
              <h3 className="text-2xl font-bold text-gray-800">{selectedCard.title}</h3>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 px-4 py-2 rounded-md hover:text-gray-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DetailItem label="Period In" value={selectedCard.periodIn} />
            <DetailItem label="Is Paid" value={selectedCard.isPaid} />
            <DetailItem label="Total Days" value={selectedCard.max_days.toString()} />
            {/* <DetailItem label="Is Paid" value={selectedCard.is_active} /> */}
          </div>

          <div className="flex justify-end mt-6">
            <button
              className="px-4 py-1 bg-[#006666] text-white rounded-md hover:bg-blue-700 transition-colors"
              onClick={onClose}
              type="button"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}