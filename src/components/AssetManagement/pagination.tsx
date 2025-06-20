"use client"

import type React from "react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  setCurrentPage: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, setCurrentPage }) => {
  const generatePaginationItems = () => {
    const items = []
    const maxVisiblePages = 10

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(i)
      }
    } else {
      const leftOffset = Math.floor(maxVisiblePages / 2)
      const rightOffset = Math.ceil(maxVisiblePages / 2) - 1

      if (currentPage <= leftOffset + 1) {
        for (let i = 1; i <= maxVisiblePages - 1; i++) {
          items.push(i)
        }
        items.push("ellipsis")
        items.push(totalPages)
      } else if (currentPage >= totalPages - rightOffset) {
        items.push(1)
        items.push("ellipsis")
        for (let i = totalPages - maxVisiblePages + 2; i <= totalPages; i++) {
          items.push(i)
        }
      } else {
        items.push(1)
        items.push("ellipsis")
        for (let i = currentPage - leftOffset + 1; i <= currentPage + rightOffset - 1; i++) {
          items.push(i)
        }
        items.push("ellipsis")
        items.push(totalPages)
      }
    }

    return items
  }

  const paginationItems = generatePaginationItems()

  return (
    <div className="flex justify-end gap-2 mt-6">
      <button
       onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="px-3 py-2 rounded-full bg-white/60 text-slate-700 hover:bg-[#006666] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 border border-white/20"
        aria-label="Previous page"
      >
        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13"
          />
        </svg>
      </button>

      {paginationItems.map((item, index) => {
        if (item === "ellipsis") {
          return (
            <span key={`ellipsis-${index}`} className="px-3 py-2 text-slate-500 select-none">
              ...
            </span>
          )
        }

        return (
          <button
            key={item}
            onClick={() => setCurrentPage(item as number)}
            className={`px-3 py-2 rounded-[60%] transition-all duration-200 ${
              currentPage === item
                ? "bg-[#006666] text-white shadow-lg"
                : "bg-white/60 text-slate-700 hover:bg-white/80 border border-white/20"
            }`}
            aria-label={`Page ${item}`}
            aria-current={currentPage === item ? "page" : undefined}
          >
            {item}
          </button>
        )
      })}

      <button
        onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="px-3 py-2 rounded-full bg-white/60 text-slate-700 hover:bg-[#006666] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 border border-white/20"
        aria-label="Next page"
      >
        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"
          />
        </svg>
      </button>
    </div>
  )
}

export default Pagination
