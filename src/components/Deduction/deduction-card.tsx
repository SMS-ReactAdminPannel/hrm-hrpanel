"use client"

import type { Card } from "./types"
import { getInitials } from "./utils"
import { ActionDropdown } from "./action-dropdown"
import { FONTS } from "../../constants/uiConstants"

interface DeductionCardProps {
  card: Card
  color: string
  onEdit: (card: Card) => void
  onDelete: (id: number) => void
  onShowDetails: (card: Card) => void
}

export function DeductionCard({ card, color, onEdit, onDelete, onShowDetails }: DeductionCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div
            className={`w-12 h-12 rounded-full ${color} flex items-center justify-center text-black text-lg font-bold mr-4`}
          >
            {getInitials(card.title)}
          </div>
          <ActionDropdown card={card} onEdit={onEdit} onDelete={onDelete} />
        </div>

        <div className="mt-4">
          <h3 className="text-2xl !font-bold !text-gray-800" style={{...FONTS.header2}}>{card.title}</h3>
          <p className="!text-sm !text-black mt-1" style={{...FONTS.header3}}>{card.deductionType}</p>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <div>
            <p className="!text-sm !text-black" style={{...FONTS.cardheader}}>Employer Rate</p>
            <p className="text-gray-800 font-medium">{card.employerRate}%</p>
          </div>
          <div>
            <p className="!text-sm !text-black" style={{...FONTS.cardheader}}>Employee Rate</p>
            <p className="text-gray-800 font-medium">{card.employeeRate}%</p>
          </div>
        </div>

        <button
          onClick={() => onShowDetails(card)}
          className="mt-4 w-full py-2 !bg-gray-200 hover:bg-gray-200 !text-black rounded-md transition-colors text-sm font-medium"
          style={{...FONTS.button}}
        >
          View Details
        </button>
      </div>
    </div>
  )
}
