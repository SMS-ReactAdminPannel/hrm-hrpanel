"use client"

import { useState, useRef, useEffect } from "react"
import { Search, Filter } from "lucide-react"
import type { Filters } from "./types"
import {FONTS} from "../../constants/uiConstants"

interface SearchFilterProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  filters: Filters
  onFiltersChange: (filters: Filters) => void
}

export const SearchFilter = ({ searchQuery, onSearchChange, filters, onFiltersChange }: SearchFilterProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const filterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="flex items-center space-x-4">
      <div className="relative">
        {/* <Search className="w-4 h-4 absolute left-3 top-3 !text-gray-400" /> */}
        <input
          type="text"
          placeholder="Search employees..."
          className="pl-10 pr-4 py-2 border rounded-lg w-64"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        style={{...FONTS.paragraph}}
        />
      </div>
      <div className="relative" ref={filterRef}>
        <button className="px-4 py-2.5 bg-white rounded-md border" onClick={() => setIsFilterOpen(!isFilterOpen)} style={{...FONTS.button}}>
          <Filter className="w-5 h-5 !text-gray-500" />
        </button>

        {isFilterOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-10 border">
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium !text-gray-700 mb-1">Status</label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={filters.status}
                  onChange={(e) => onFiltersChange({ ...filters, status: e.target.value })} 
                >
                  <option value="All">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium !text-gray-700 mb-1" >Department</label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={filters.department}
                  onChange={(e) => onFiltersChange({ ...filters, department: e.target.value })}

                >
                  <option value="All">All Departments</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Finance">Finance</option>
                  <option value="HR">HR</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Exit Type</label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={filters.exitType}
                  onChange={(e) => onFiltersChange({ ...filters, exitType: e.target.value })}
                >
                  <option value="All">All Types</option>
                  <option value="Resignation">Resignation</option>
                  <option value="Termination">Termination</option>
                  <option value="Retirement">Retirement</option>
                </select>
              </div>

              <div className="flex justify-between pt-2">
                <button
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                  onClick={() => {
                    onFiltersChange({
                      status: "All",
                      department: "All",
                      exitType: "All",
                    })
                    setIsFilterOpen(false)
                  }}
                >
                  Reset
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
                  onClick={() => setIsFilterOpen(false)}
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
