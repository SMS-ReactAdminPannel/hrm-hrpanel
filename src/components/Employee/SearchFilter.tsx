import React from "react";
import { ChevronDown, Search } from "lucide-react";
import type { Department } from "../../components/Employee/Employee";

interface SearchFilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterOpen: boolean;
  onFilterToggle: () => void;
  selectedDepartment: Department | "";
  onDepartmentChange: (department: Department | "") => void;
  departments: Department[];
}

export const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  searchTerm,
  onSearchChange,
  filterOpen,
  onFilterToggle,
  selectedDepartment,
  onDepartmentChange,
  departments,
}) => {
  const getDepartmentName = (dept: Department | "") =>
    typeof dept === "string" ? dept || "All Departments" : dept?.name ?? "Unnamed";

  return (
    <div className="flex flex-row justify-center items-center md:items-center gap-2 w-full">
      {/* Search Input */}
      <div className="relative flex-1 flex max-w-64">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="w-4 h-4 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search employees..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-[#eff4f5] focus:outline-none focus:ring-2 focus:ring-[#006666]/50"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {/* Filter Dropdown */}
      <div className="relative max-w-80">
        <button
          onClick={onFilterToggle}
          className="flex items-center justify-between w-full px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors"
        >
          <span>{getDepartmentName(selectedDepartment)}</span>
          <ChevronDown
            className={`w-4 h-4 ml-2 transition-transform ${
              filterOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Dropdown Menu */}
        {filterOpen && (
          <div className="absolute right-0 mt-2  w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1 max-h-60 overflow-y-auto">
            <div
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                onDepartmentChange("");
                onFilterToggle();
              }}
            >
              All Departments
            </div>

            {Array.isArray(departments) &&
              departments.map((dept) => (
                <div
                  key={dept._id}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    onDepartmentChange(dept);
                    onFilterToggle();
                  }}
                >
                  {dept.name || "Unnamed"}
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};
