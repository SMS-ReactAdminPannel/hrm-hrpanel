import type React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { FONTS } from "../../constants/uiConstants"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export const Pagination: React.FC<PaginationProps> =  ({ 
 currentPage, totalPages, onPageChange }) => {
  const maxDots = 7
  const showDots = totalPages <= maxDots

  return (
    <div className="flex items-center justify-center space-x-4 bg-white">
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <div className="flex items-center space-x-2">
        {showDots ? (
          // Show all dots
          Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                page === currentPage ? "bg-blue-600 scale-125" : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))
        ) : (
          // Show limited dots with current page indicator
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-600">{currentPage}</span>
            <div className="w-8 h-1 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 transition-all duration-300 ease-out"
                style={{
                  width: `${(currentPage / totalPages) * 100}%`,
                }}
              />
            </div>
            <span className="text-sm text-gray-400">{totalPages}</span>
          </div>
        )}
      </div>

      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  )
}
