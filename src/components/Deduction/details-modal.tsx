"use client"
import { useRef, useEffect, useState } from "react"

// Mock types and utils for demo
interface Card {
  title: string
  isPretax: string
  isRecurring: string
  deductionType: string
  isConditionBased: string
  calculationType: string
  employerRate: number
  employeeRate: number
  hasMaxLimit: string
  eligibilityCondition: string
  eligibilityValue: number
}

function getInitials(name: string) {
  return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2)
}

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

  if (!isOpen || !card) return null

  return (
    <div 
      className={`fixed inset-0 bg-black flex items-end justify-center z-50 transition-all duration-100 ${
        isAnimating ? 'bg-opacity-50' : 'bg-opacity-0'
      }`}
    >

      <button 
        onClick={handleClose} 
        className={`left-8 mb-[630px] ml-[150px] w-11 h-11 flex items-center justify-center rounded-l-3xl bg-blue-700 transition-all duration-300 shadow-lg z-10 ${
          isAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className=" w-6 pr-1 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div 
        ref={modalRef} 
        className={`bg-white rounded-t-3xl shadow-2xl w-[1200px] h-[700px] overflow-hidden transform transition-all duration-250 ease-out ${
          isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        }`}
      >
        {/* Header */}
        <div className="relative ml-4 mt-3 bg-white px-3 py-4 border-b-1 border-blue-300">
          
          <div className=" flex ">
            <div
              className={`w-16 h-16 rounded-full ${cardColor} flex items-center justify-center text-white text-xl font-bold mb-4 shadow-lg`}
            >
              {getInitials(card.title)}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mt-5 ml-5">{card.title}</h3>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-4 max-h-[60vh] overflow-y-auto">
          <div className=" p-6 grid grid-cols-2 gap-9 ">
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
        </div>

        {/* Footer */}
        <div className="px-8 pt-3 py-8">
          <button
            className="w-full px-6 py-5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium "
            onClick={handleClose}
            type="button"
          >
            Close
          </button>
        </div>
      </div>
    </div>
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