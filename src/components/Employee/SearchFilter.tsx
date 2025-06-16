import type React from "react"
import { Filter } from "lucide-react"
import type { Department } from "../../components/Employee/Employee"

interface SearchFilterBarProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  filterOpen: boolean
  onFilterToggle: () => void
  selectedDepartment: Department | ""
  onDepartmentChange: (department: Department | "") => void
}

export const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  searchTerm,
  onSearchChange,
  filterOpen,
  onFilterToggle,
  selectedDepartment,
  onDepartmentChange,
}) => {
  return (
    <div className="mb-6 flex justify-between items-center gap-4">
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="Search employees..."
          className="w-100 pl-10 pr-4 py-2 border bg-[#eff4f5] rounded-lg"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <svg
          className="absolute left-3 top-3 w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      <div className="relative">
        <Filter className="text-2xl text-[#006666] cursor-pointer" onClick={onFilterToggle} />
        {filterOpen && (
          <div className="absolute right-0 mt-2 bg-white border rounded shadow w-48 z-10">
            <select
              value={selectedDepartment}
              onChange={(e) => {
                onDepartmentChange(e.target.value as Department | "")
              }}
              className="w-full p-2 text-sm"
            >
              <option value="">All Departments</option>
              {["Engineering", "Marketing", "HR", "Finance", "Operations"].map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  )
}
