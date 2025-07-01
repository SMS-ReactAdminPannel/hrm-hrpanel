import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pages = [];

  // Only show two pages: currentPage - 1 and currentPage (like in screenshot)
  if (currentPage > 1) pages.push(currentPage - 1);
  pages.push(currentPage);

  if (currentPage < totalPages) pages.push(currentPage + 1);

  return (
    <div className="flex items-center justify-center gap-4 py-4">
      {/* Left arrow */}
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        className="text-white disabled:opacity-30 hover:bg-white rounded-md p-1 hover:text-black"
        disabled={currentPage === 1}
      >
        <ChevronLeft className="w-4 h-4  " />
      </button>

      {/* Page numbers */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-2 py-1 rounded-md text-sm font-medium ${
            page === currentPage
              ? "bg-[#5e59a9] text-white"
              : "text-white hover:bg-[#4c4aa1] hover:text-white"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Right arrow */}
      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        className="text-white disabled:opacity-30 hover:bg-white rounded-md p-1 hover:text-black"
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="w-4 h-4 hover:text-[#4c4aa1]" />
      </button>
    </div>
  );
};