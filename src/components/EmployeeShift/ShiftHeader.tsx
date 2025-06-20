import React, { useRef, useEffect } from "react"
import { Search, MoreVertical, ChevronDown, ChevronUp, X } from "lucide-react"
import { FONTS } from "../../constants/uiConstants"

interface EmployeeShiftHeaderProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  groupBy: string | null
  onGroupByChange: (group: string | null) => void
  showGroupFilter: boolean
  onShowGroupFilterChange: (show: boolean) => void
  onAssignClick: () => void
}

const EmployeeShiftHeader: React.FC<EmployeeShiftHeaderProps> = ({
  searchTerm,
  onSearchChange,
  groupBy,
  onGroupByChange,
  showGroupFilter,
  onShowGroupFilterChange,
  onAssignClick,
}) => {
  const [isGroupDropdownOpen, setIsGroupDropdownOpen] = React.useState(false)
  const groupDropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (groupDropdownRef.current && !groupDropdownRef.current.contains(event.target as Node)) {
        setIsGroupDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleGroupBySelect = (group: string | null) => {
    onGroupByChange(group)
    setIsGroupDropdownOpen(false)
    onShowGroupFilterChange(true)
  }

  return (
    <div className="border-gray-200 py-2">
      <div className="flex items-center justify-between">
        <h1 style={FONTS.header}>
          Shift
        </h1>
        <button
            className="text-white px-4 md:px-6 py-2 rounded-lg font-medium text-sm md:text-base transition-colors duration-200"
            style={{ backgroundColor: "#5e59a9" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "blue")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#5e59a9")}
            onClick={onAssignClick}
          >
            Assign
          </button>
        </div>
      <div className="flex items-center justify-start gap-3 mt-8">
          <div className="relative w-100 md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by employee name"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 bg-[#eff4f5] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-3">

          <div className="relative" ref={groupDropdownRef} style={{ zIndex: 50 }}>
            <button
              className="flex items-center gap-2 px-3 md:px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm md:text-base"
              onClick={() => setIsGroupDropdownOpen(!isGroupDropdownOpen)}
            >
              {/* <MoreVertical className="w-4 h-4" /> */}
              Group By
              {isGroupDropdownOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {isGroupDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                <button
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  onClick={() => handleGroupBySelect(null)}
                >
                  None
                </button>
                <button
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  onClick={() => handleGroupBySelect("rotatingShift")}
                >
                  Rotating Shift
                </button>
                <button
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  onClick={() => handleGroupBySelect("department")}
                >
                  Department
                </button>
                <button
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  onClick={() => handleGroupBySelect("jobRole")}
                >
                  Job Role
                </button>
                <button
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  onClick={() => handleGroupBySelect("reportingManager")}
                >
                  Reporting Manager
                </button>
              </div>
            )}
          </div>

          
          </div>
        </div>

      {showGroupFilter && groupBy && (
        <div className="absolute top-20 right-4 bg-gray-100 p-2 rounded border-b-2 border-blue-500 shadow mt-20">
          <span className="text-sm font-medium">
            {groupBy === "rotatingShift"
              ? "Rotating Shift"
              : groupBy === "department"
                ? "Department"
                : groupBy === "jobRole"
                  ? "Job Role"
                  : groupBy === "reportingManager"
                    ? "Reporting Manager"
                    : ""}
          </span>
          <button
            onClick={() => {
              onGroupByChange(null)
              onShowGroupFilterChange(false)
            }}
            className="text-gray-500 hover:text-gray-700 ml-2"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  )
}

export default EmployeeShiftHeader
