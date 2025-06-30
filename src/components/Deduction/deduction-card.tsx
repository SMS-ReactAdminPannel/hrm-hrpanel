import type { Card } from "./types";
import { getInitials } from "./utils";
import { ActionDropdown } from "./action-dropdown";
import { FONTS } from "../../constants/uiConstants";

interface DeductionCardProps {
  card: Card;
  color: string;
  onEdit: (card: Card) => void;
  onDelete: (id: number) => void;
  onShowDetails: (card: Card) => void;
}

export function DeductionCard({ card, color, onEdit, onDelete, onShowDetails }: DeductionCardProps) {
  return (
    <div className="bg-white rounded-lg border-l-4 border-indigo-500 shadow-xs overflow-hidden hover:shadow-sm transition-shadow">
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-md !${color} flex items-center justify-center text-white font-medium`}
            >
              {getInitials(card.title)}
            </div>
            <div>
              <h3 className="font-semibold !text-gray-800"
              style={{...FONTS.cardheader}}>{card.title}</h3>
              <p className="text-xs !text-gray-500"
              style={{...FONTS.cardSubHeader}}>{card.deductionType}</p>
            </div>
          </div>
          <ActionDropdown card={card} onEdit={onEdit} onDelete={onDelete} />
        </div>

        <div className="flex justify-between py-3 border-y border-gray-100 mb-4">
          <div className="text-center">
            <p className="text-xs text-gray-500"
            >Employer</p>
            <p className="font-medium">{card.employerRate}%</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500">Employee</p>
            <p className="font-medium">{card.employeeRate}%</p>
          </div>
        </div>

        <button
          onClick={() => onShowDetails(card)}
          className="w-full py-2 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          View Details →
        </button>
      </div>
    </div>
  );
}