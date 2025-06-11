

import type React from "react"
import { Search,  Plus } from "lucide-react"
import { FONTS } from "../../../constants/uiConstants"

interface AssetCategoryHeaderProps {
  searchQuery: string
  onSearch: (query: string) => void
  onFilter: () => void
  onCreate: () => void
}

const AssetCategoryHeader: React.FC<AssetCategoryHeaderProps> = ({ searchQuery, onSearch, onCreate }) => {
  return (
    <div className=" border-b border-gray-200">
    
      
      <div className="flex items-center justify-between mb-3">
        <h1 className=" text-[black]" style={FONTS.header}>Asset Category</h1>
        
      </div>

      <div className="flex items-center justify-between px-6 py-4 gap-4">
        <div className="flex items-center gap-3 flex-1 max-w-2xl">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
            
              type="text"
              placeholder="Search assets here..."
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
              className=" pl-10 pr-3  py-2 bg-[#eff4f5] rounded-md focus:outline-none focus:ring-2 focus:ring-[#006666] focus:border-transparent"
            />
            {searchQuery && (
              <button
                onClick={() => onSearch("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>

          
        </div>

        <div className="flex items-center gap-3">
          

          <button
            onClick={onCreate}
            className="flex items-center gap-2 px-4 py-2 bg-[#006666] text-white rounded-md hover:bg-[#005252] transition-colors"
          >
            <Plus className="w-4 h-4" />
            Create Category
          </button>
        </div>
      </div>

    
      {searchQuery && (
        <div className="mt-4 text-sm text-gray-600 bg-[#eff4f5]">
          Showing results for: <span className="font-medium text-[#006666]">"{searchQuery}"</span>
        </div>
      )}
    </div>
  )
}

export default AssetCategoryHeader
