"use client"

import type React from "react"

import { Search, Filter, Plus } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { getCategoryIcon } from "./utils/asset-utils"
import { FONTS } from "../../constants/uiConstants"

interface AssetsHeaderProps {
  search: string
  setSearch: (search: string) => void
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  setShowModal: (show: boolean) => void
}

const categories = ["all", "Laptop", "Monitor", "Accessory"]

const AssetsHeader: React.FC<AssetsHeaderProps> = ({
  search,
  setSearch,
  selectedCategory,
  setSelectedCategory,
  setShowModal,
}) => {
  const [showCategoryDropdown, setShowCategoryDropdown] = useState<boolean>(false)
  const categoryDropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target as Node)) {
        setShowCategoryDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div>
      <div className="mb-6">
        <h1 className=""style={FONTS.header} >
          Asset
        </h1>
        <p style={FONTS.paragraph}>Manage and track your organization's assets</p>
      </div>

      <div className="mb-8 flex flex-row gap-4">
        <div className="relative max-w-2xl">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            required
            type="text"
            placeholder="Search assets, assignees, or serial numbers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-[250px] pl-10 pr-4 py-2 bg-[#eff4f5] border border-white/20 rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-transparent transition-all duration-200"
          />
        </div>

        <div className="flex gap-3 ml-auto">
          <div className="relative" ref={categoryDropdownRef}>
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 z-10" />
            <button
              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
              className="pl-10 pr-8 py-2 bg-[#eff4f5] rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500/50 cursor-pointer transition-all duration-200 flex items-center justify-between min-w-[180px]"
            >
              <span>{selectedCategory === "all" ? "All Categories" : selectedCategory}</span>
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${showCategoryDropdown ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showCategoryDropdown && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-[#eff4f5] backdrop-blur-sm border border-white/20 rounded-xl shadow-xl z-50 overflow-hidden">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat)
                      setShowCategoryDropdown(false)
                    }}
                    className={`w-full px-4 py-3 text-left hover:bg-gradient-to-r hover:from-teal-50 hover:to-cyan-50 transition-all duration-200 flex items-center gap-3 ${
                      selectedCategory === cat
                        ? "bg-[#006666]/10 text-[#006666] font-medium shadow-sm"
                        : "text-slate-700 hover:text-[#006666]"
                    }`}
                  >
                    {cat !== "all" && getCategoryIcon(cat)}
                    <span>{cat === "all" ? "All Categories" : cat}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#006666] text-white rounded-md shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 font-medium"
          >
            <Plus className="w-5 h-5" />
            Add Asset
          </button>
        </div>
      </div>
    </div>
  )
}

export default AssetsHeader
