import { FONTS } from '../../constants/uiConstants';
import type { Card } from './types';


interface LeaveTypeCardProps {
  card: Card;
  // color: string;
  onEdit: (card: Card) => void;
  onDelete: (id: number) => void;
  onShowDetails: (card: Card) => void;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
  showDropdown: boolean;
  toggleDropdown: () => void;
  getInitials: (title: string) => string;
}

export default function LeaveTypeCard({
  card,
  color,
  onEdit,
  onDelete,
  onShowDetails,
  dropdownRef,
  showDropdown,
  toggleDropdown,
  getInitials
}: LeaveTypeCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <div className={`w-10 h-10 bg-green-600 rounded-full ${color} flex items-center justify-center text-black text-sm font-bold mr-3`}>
              {getInitials(card.holiday_name)}
            </div>
            <div>
              <h3 className="font-medium !text-gray-800" style={{...FONTS.cardheader}}>{card.holiday_name}</h3>
              <p className="text-sm !text-gray-500" style={{ ...FONTS.cardSubHeader}}>{card.holiday_type}</p>
            </div>
          </div>
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                <div className="py-1">
                  <button
                    onClick={() => onEdit(card)}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(card._id)}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => onShowDetails(card)}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    View Details
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-lg !text-gray-500 font-semibold" style={{ ...FONTS.subParagraph }}>{card.holiday_date} days</span>
          <span className="text-sm !text-gray-500">{card.is_active}</span>
        </div>
      </div>
    </div>
  );
}