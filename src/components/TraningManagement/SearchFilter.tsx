import type React from "react"
import { Search, Plus } from "lucide-react"
import {FONTS} from "../../constants/uiConstants"

interface SearchFilterBarProps {
  searchTerm: string
  selectedCategory: string
  categories: string[]
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onCategoryChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  onNewProgram: () => void
}

export const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  searchTerm,
  selectedCategory,
  categories,
  onSearchChange,
  onCategoryChange,
  onNewProgram,
}) => (
  <div className="flex flex-row gap-4">
    <div className="flex-1 relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 !text-gray-600 "  style={{...FONTS.paragraph}}/>
      <input
        type="text"
        placeholder="Search programs..."
        value={searchTerm}
        onChange={onSearchChange}
        className="w-100 md:w-96 pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006666] focus:border-transparent bg-white placeholder:text-black !text-gray-600"
        style={{...FONTS.paragraph}}
      />
    </div>

    <div className="flex items-center space-x-2">
      <select
        value={selectedCategory}
        onChange={onCategoryChange}
        className="w-full md:w-60 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#006666] focus:border-transparent  !text-gray-600"
        style={{...FONTS.paragraph}}
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category === "all" ? "All Categories" : category}
          </option>
        ))}
      </select>
    </div>

    <button
      onClick={onNewProgram}
      className="flex items-center space-x-2 bg-[#5e59a9] text-white px-4 md:px-6 py-2 md:py-2.5 rounded-lg hover:bg-[#005555] transition-colors"
      style={FONTS.paragraph}
    >
      <Plus className="w-4 h-4" />
      <span className="text-sm md:text-base">New Program</span>
    </button>
  </div>
)
