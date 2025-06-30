import { useRef, useEffect } from "react";
import type { NewCard, Card } from "./types";
import { CustomSelect } from "./custom-select";
import { FONTS } from "../../constants/uiConstants";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

interface FormModalProps {
  isOpen: boolean;
  editingCard: Card | null;
  newCard: NewCard;
  onClose: () => void;
  onSubmit: () => void;
  onCardChange: (card: NewCard) => void;
}

export function FormModal({
  isOpen,
  editingCard,
  newCard,
  onClose,
  onSubmit,
  onCardChange,
}: FormModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        isOpen &&
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            ref={modalRef}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="rounded-xl w-[800px]  bg-white relative  shadow-2xl max-h-[90vh] scrollbar-hide"
          >
            <div>
              <button
                onClick={onClose}
                className="absolute top-2 left-1 -ml-11 text-white hover:text-gray-600 bg-blue-700 rounded-l-full h-10 w-10 flex items-center justify-center shadow"
              >
                <X size={30} />
              </button>
            </div>
            <div className="flex justify-between items-center p-4 border-b top-0 z-50">
              <h3
                className="text-2xl !text-black"
                style={{ ...FONTS.cardheader }}
              >
                {editingCard ? "Edit Deduction" : "Create New Deduction"}
              </h3>
            </div>

            <div className="p-4 ">
              <div className="space-y-1">
                <div className="grid grid-cols-3  md:grid-cols-2 gap-3">
                  {/* Title */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium !text-black" 
                    style={{...FONTS.cardSubHeader}}>
                      Title*
                    </label>
                    <input
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded-md transition-all"
                      value={newCard.title}
                      onChange={(e) =>
                        onCardChange({ ...newCard, title: e.target.value })
                      }
                      placeholder="Enter deduction title"
                      required
                    />
                  </div>

                  <CustomSelect
                    label="Is Pretax"
                    value={newCard.isPretax}
                    options={["Yes", "No"]}
                    onChange={(value) =>
                      onCardChange({ ...newCard, isPretax: value })
                    }
                    className="text-black"
                  />

                  <CustomSelect
                    label="Is Recurring"
                    value={newCard.isRecurring}
                    options={["One Time deduction", "Monthly", "Yearly"]}
                    onChange={(value) =>
                      onCardChange({ ...newCard, isRecurring: value })
                    }
                    className="text-black"
                  />

                  <CustomSelect
                    label="Deduction Type"
                    value={newCard.deductionType}
                    options={["Amount", "Percentage", "Fixed Amount"]}
                    onChange={(value) =>
                      onCardChange({ ...newCard, deductionType: value })
                    }
                    className="text-black"
                  />

                  <CustomSelect
                    label="Is Condition Based"
                    value={newCard.isConditionBased}
                    options={["Yes", "No"]}
                    onChange={(value) =>
                      onCardChange({ ...newCard, isConditionBased: value })
                    }
                    className="text-black"
                  />

                  <CustomSelect
                    label="Calculation Type"
                    value={newCard.calculationType}
                    options={["Amount", "Percentage"]}
                    onChange={(value) =>
                      onCardChange({ ...newCard, calculationType: value })
                    }
                  />

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-black">
                      Employer Rate (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      className="w-full p-3 border border-gray-300 rounded-md transition-all"
                      value={newCard.employerRate}
                      onChange={(e) =>
                        onCardChange({
                          ...newCard,
                          employerRate: e.target.value,
                        })
                      }
                      placeholder="Enter employer rate"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-black">
                      Employee Rate (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      className="w-full p-3 border border-gray-300 rounded-lg transition-all"
                      value={newCard.employeeRate}
                      onChange={(e) =>
                        onCardChange({
                          ...newCard,
                          employeeRate: e.target.value,
                        })
                      }
                      placeholder="Enter employee rate"
                    />
                  </div>

                  <CustomSelect
                    label="Has Maximum Limit"
                    value={newCard.hasMaxLimit}
                    options={["Yes", "No"]}
                    onChange={(value) =>
                      onCardChange({ ...newCard, hasMaxLimit: value })
                    }
                  />

                  <CustomSelect
                    label="Eligibility Condition"
                    value={newCard.eligibilityCondition}
                    options={[
                      "If Basic Pay Greater Than (>)",
                      "If Basic Pay Less Than (<)",
                      "Always",
                    ]}
                    onChange={(value) =>
                      onCardChange({ ...newCard, eligibilityCondition: value })
                    }
                    className="text-black"
                  />

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-black">
                      Eligibility Value
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      className="w-full p-3 border border-gray-300 rounded-lg transition-all"
                      value={newCard.eligibilityValue}
                      onChange={(e) =>
                        onCardChange({
                          ...newCard,
                          eligibilityValue: e.target.value,
                        })
                      }
                      placeholder="Enter eligibility value"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-400 hover:bg-gray-200 rounded-md focus:outline-none"
                    onClick={onClose}
                    style={{ ...FONTS.button }}
                    type="button"
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 text-sm font-medium text-white bg-[#5e59a9] hover:bg-[#4c4aa1] rounded-md focus:outline-none"
                    onClick={onSubmit}
                    style={{ ...FONTS.button }}
                    type="button"
                    disabled={!newCard.title}
                  >
                    {editingCard ? "Update" : "Create"}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
