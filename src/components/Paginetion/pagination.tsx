import type React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { FONTS } from "../../constants/uiConstants"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-end items-center mt-4 space-x-2">
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="flex items-center px-3 py-2 border bg-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 text-black"
      >
        <ChevronLeft size={16} className="mr-1" />
       
      </button>

      <span className="px-4 py-2 text-sm !text-gray-600"style={{...FONTS.paragraph}}>
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="flex items-center px-3 py-2 border bg-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 !text-black"style={{...FONTS.cardSubHeader}}
      >
      
        <ChevronRight size={16} className="ml-1" />
      </button>
    </div>
  )
}
