import { X } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { FONTS } from "../../constants/uiConstants";

// Types
interface Card {
  title: string;
  isPretax: string;
  isRecurring: string;
  deductionType: string;
  isConditionBased: string;
  calculationType: string;
  employerRate: number;
  employeeRate: number;
  hasMaxLimit: string;
  eligibilityCondition: string;
  eligibilityValue: number;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

interface DetailsModalProps {
  isOpen: boolean;
  card: Card | null;
  cardColor: string;
  onClose: () => void;
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-gray-200">
      <span className="text-gray-600 font-medium">{label}</span>
      <span className="text-gray-900 font-semibold max-w-[60%] text-right">
        {value}
      </span>
    </div>
  );
}

export function DetailsModal({
  isOpen,
  card,
  cardColor,
  onClose,
}: DetailsModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        isOpen &&
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  if (!isOpen || !card) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-end transition-all duration-300 ${
        isAnimating ? "bg-black/50" : "bg-black/0"
      }`}
    >
      <div
        ref={modalRef}
        className={`relative bg-white rounded-l-xl shadow-xl w-full max-w-5xl h-[80vh]  transform transition-all duration-300 ${
          isAnimating ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 left-2 -ml-[3rem] text-white hover:text-gray-600 bg-blue-700 rounded-l-full h-10 w-10 flex items-center justify-center shadow"
        >
         <X/>
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 p-6 border-b border-gray-200">
          <div
            className={`w-14 h-14 rounded-full ${cardColor} text-white text-lg font-bold flex items-center justify-center`}
          >
            {getInitials(card.title)}
          </div>
          <h2 className="text-xl font-bold !text-gray-900"
          style={{...FONTS.cardheader}}>{card.title}</h2>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh] grid grid-cols-2 sm:grid-cols-2 gap-6" style={{...FONTS.paragraph}}>
          <DetailItem label="Is Pretax" value={card.isPretax} />
          <DetailItem label="Is Recurring" value={card.isRecurring} />
          <DetailItem label="Deduction Type" value={card.deductionType} />
          <DetailItem label="Is Condition Based" value={card.isConditionBased} />
          <DetailItem label="Calculation Type" value={card.calculationType} />
          <DetailItem label="Employer Rate" value={`${card.employerRate}%`} />
          <DetailItem label="Employee Rate" value={`${card.employeeRate}%`} />
          <DetailItem label="Has Maximum Limit" value={card.hasMaxLimit} />
          <DetailItem
            label="Eligibility Condition"
            value={card.eligibilityCondition}
          />
          <DetailItem
            label="Eligibility Value"
            value={card.eligibilityValue.toString()}
          />
        </div>

        {/* Footer */}
        {/* <div className="p-6 border-t border-gray-200">
          <button
            onClick={handleClose}
            className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Close
          </button>
        </div> */}
      </div>
    </div>
  );
}
