"use client"

import { useRef, useEffect } from "react"
import type { NewCard, Card } from "./types"
import { CustomSelect } from "./custom-select"
import { FONTS } from "../../constants/uiConstants"
import { AnimatePresence, motion } from "framer-motion"

interface FormModalProps {
  isOpen: boolean
  editingCard: Card | null
  newCard: NewCard
  onClose: () => void
  onSubmit: () => void
  onCardChange: (card: NewCard) => void
}

export function FormModal({ isOpen, editingCard, newCard, onClose, onSubmit, onCardChange }: FormModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (isOpen && modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onClose])

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
            className="rounded-xl w-[800px]  bg-white   shadow-2xl max-h-[90vh] overflow-y-auto scrollbar-hide"
          >
            <div className="flex justify-between items-center p-6 border-b backdrop-blur sticky top-0 z-50">
              <h3 className="text-2xl !text-black" style={{ ...FONTS.cardheader }}>
                {editingCard ? "Edit Deduction" : "Create New Deduction"}
              </h3>
              <button onClick={onClose} className="!text-black rounded-md hover:text-black transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                     viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>

            <div className="p-6 ">
              <div className="space-y-6">
                <div className="grid grid-cols-3  md:grid-cols-2 gap-3">
                  {/* Title */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-black">Title*</label>
                    <input
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded-md transition-all"
                      value={newCard.title}
                      onChange={(e) => onCardChange({ ...newCard, title: e.target.value })}
                      placeholder="Enter deduction title"
                      required
                    />
                  </div>

                  <CustomSelect
                    label="Is Pretax"
                    value={newCard.isPretax}
                    options={["Yes", "No"]}
                    onChange={(value) => onCardChange({ ...newCard, isPretax: value })}
                    className="text-black"
                  />

                  <CustomSelect
                    label="Is Recurring"
                    value={newCard.isRecurring}
                    options={["One Time deduction", "Monthly", "Yearly"]}
                    onChange={(value) => onCardChange({ ...newCard, isRecurring: value })}
                    className="text-black"
                  />

                  <CustomSelect
                    label="Deduction Type"
                    value={newCard.deductionType}
                    options={["Amount", "Percentage", "Fixed Amount"]}
                    onChange={(value) => onCardChange({ ...newCard, deductionType: value })}
                    className="text-black"
                  />

                  <CustomSelect
                    label="Is Condition Based"
                    value={newCard.isConditionBased}
                    options={["Yes", "No"]}
                    onChange={(value) => onCardChange({ ...newCard, isConditionBased: value })}
                    className="text-black"
                  />

                  <CustomSelect
                    label="Calculation Type"
                    value={newCard.calculationType}
                    options={["Amount", "Percentage"]}
                    onChange={(value) => onCardChange({ ...newCard, calculationType: value })}
                  />

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-black">Employer Rate (%)</label>
                    <input
                      type="number"
                      step="0.1"
                      className="w-full p-1 border border-gray-300 rounded-md transition-all"
                      value={newCard.employerRate}
                      onChange={(e) => onCardChange({ ...newCard, employerRate: e.target.value })}
                      placeholder="Enter employer rate"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-black">Employee Rate (%)</label>
                    <input
                      type="number"
                      step="0.1"
                      className="w-full p-3 border border-gray-300 rounded-lg transition-all"
                      value={newCard.employeeRate}
                      onChange={(e) => onCardChange({ ...newCard, employeeRate: e.target.value })}
                      placeholder="Enter employee rate"
                    />
                  </div>

                  <CustomSelect
                    label="Has Maximum Limit"
                    value={newCard.hasMaxLimit}
                    options={["Yes", "No"]}
                    onChange={(value) => onCardChange({ ...newCard, hasMaxLimit: value })}
                  />

                  <CustomSelect
                    label="Eligibility Condition"
                    value={newCard.eligibilityCondition}
                    options={["If Basic Pay Greater Than (>)", "If Basic Pay Less Than (<)", "Always"]}
                    onChange={(value) => onCardChange({ ...newCard, eligibilityCondition: value })}
                    className="text-black"
                  />

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-black">Eligibility Value</label>
                    <input
                      type="number"
                      step="0.1"
                      className="w-full p-3 border border-gray-300 rounded-lg transition-all"
                      value={newCard.eligibilityValue}
                      onChange={(e) => onCardChange({ ...newCard, eligibilityValue: e.target.value })}
                      placeholder="Enter eligibility value"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                   className="px-6 py-1 rounded-md text-white transition-colors bg-[#006666] hover:bg-green-700"
                    onClick={onClose}
                    type="button"
                  >
                    Cancel
                  </button>
                  <button
                    className="px-6 py-1 rounded-md text-white transition-colors bg-[#006666] hover:bg-green-700"
                    onClick={onSubmit}
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
  )
}
