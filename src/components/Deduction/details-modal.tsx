import { useRef, useEffect, useState } from "react"
import type { Card } from "./types"
import { getInitials } from "./utils"
import { AnimatePresence, motion } from "framer-motion"

interface DetailsModalProps {
  isOpen: boolean
  card: Card | null
  cardColor: string
  onClose: () => void
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-3 p-6 border-gray-100 last:border-b-0">
      <span className="text-gray-600 font-medium">{label}</span>
      <span className="text-gray-900 font-semibold max-w-[60%] text-right">{value}</span>
    </div>
  )
}

export function DetailsModal({ isOpen, card, cardColor, onClose }: DetailsModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (isOpen && modalRef.current && !modalRef.current.contains(event.target as Node)) {
        handleClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true)
    }
  }, [isOpen])

  const handleClose = () => {
    setIsAnimating(false)
    setTimeout(() => {
      onClose()
    }, 300)
  }

  return (
    <AnimatePresence>
      {isOpen && card && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
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
            className="bg-white rounded-md shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <div
                    className={`w-12 h-12 rounded-full ${cardColor} flex items-center justify-center text-black text-xl font-bold mr-4`}
                  >
                    {getInitials(card.title)}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">{card.title}</h3>
                </div>
                <button onClick={onClose} className="text-gray-500 rounded-md hover:text-white transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DetailItem label="Is Pretax" value={card.isPretax} />
                <DetailItem label="Is Recurring" value={card.isRecurring} />
                <DetailItem label="Deduction Type" value={card.deductionType} />
                <DetailItem label="Is Condition Based" value={card.isConditionBased} />
                <DetailItem label="Calculation Type" value={card.calculationType} />
                <DetailItem label="Employer Rate" value={`${card.employerRate}%`} />
                <DetailItem label="Employee Rate" value={`${card.employeeRate}%`} />
                <DetailItem label="Has Maximum Limit" value={card.hasMaxLimit} />
                <DetailItem label="Eligibility Condition" value={card.eligibilityCondition} />
                <DetailItem label="Eligibility Value" value={card.eligibilityValue.toString()} />
              </div>

              <div className="flex justify-end mt-6">
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  onClick={onClose}
                  type="button"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Demo component to show the modal
export default function ModalDemo() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const mockCard: Card = {
    title: "Health Insurance",
    isPretax: "Yes",
    isRecurring: "Yes", 
    deductionType: "Percentage",
    isConditionBased: "No",
    calculationType: "Fixed Rate",
    employerRate: 80,
    employeeRate: 20,
    hasMaxLimit: "Yes",
    eligibilityCondition: "Full Time",
    eligibilityValue: 40
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Redesigned Modal Demo</h1>
      </div>
      
      <DetailsModal 
        isOpen={isModalOpen}
        card={mockCard}
        cardColor="bg-blue-500"
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}