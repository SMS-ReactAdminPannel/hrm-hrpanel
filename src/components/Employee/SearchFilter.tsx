import type React from "react";
import { ChevronDown } from "lucide-react";
import type { Department } from "../../components/Employee/Employee";


interface SearchFilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterOpen: boolean;
  onFilterToggle: () => void;
  selectedDepartment: Department | "";
  onDepartmentChange: (department: Department | "") => void;
}

export const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  searchTerm,
  onSearchChange,
  filterOpen,
  onFilterToggle,
  selectedDepartment,
  onDepartmentChange,
}) => {
  const departments: Department[] = [
    "Engineering",
    "Marketing",
    "HR",
    "Finance",
    "Operations",
  ];

  return (
    <div className="mb-6 flex flex-row md:flex-row justify-between items-start md:items-center gap-4">
      {/* Search Input */}
      <div className="relative flex-1 w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-400"
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
        <input
          type="text"
          placeholder="Search employees..."
          className="w-100 pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-[#eff4f5] focus:outline-none focus:ring-2 focus:ring-[#006666]/50"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      
      {/* Filter Dropdown */}
<div className="relative w-48">
  <button
    onClick={onFilterToggle}
    className="flex items-center justify-between w-48 px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors"
  >
    <span>
      {selectedDepartment || "All Departments"}
    </span>
    <ChevronDown
      className={`w-4 h-4 ml-2 transition-transform ${
        filterOpen ? "rotate-180" : ""
      }`}
    />
  </button>

  {/* Dropdown Menu */}
  {filterOpen && (
    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1">
      <div
        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
        onClick={() => {
          onDepartmentChange("");
          onFilterToggle();
        }}
      >
        All Departments
      </div>
      {departments.map((dept) => (
        <div
          key={dept}
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
          onClick={() => {
            onDepartmentChange(dept);
            onFilterToggle();
          }}
        >
          {dept}
        </div>
      ))}
    </div>
  )}
</div>

    </div>
  );
};