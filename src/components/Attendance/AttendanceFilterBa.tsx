import type { Dispatch, SetStateAction } from "react";

interface AttendanceFiltersProps {
  designationFilter: string;
  setDesignationFilter: Dispatch<SetStateAction<string>>;
  selectedDate: string;
  setSelectedDate: Dispatch<SetStateAction<string>>;
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  onPermissionClick: () => void;
}

export const AttendanceFiltersBar: React.FC<AttendanceFiltersProps> = ({
  designationFilter,
  setDesignationFilter,
  selectedDate,
  setSelectedDate,
  searchQuery,
  setSearchQuery,
  // onPermissionClick,
}) => {
  return (
    <div className="flex gap-4 justify-between ">
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="p-2 border rounded-md px-8 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#4c469f]"
      />

      <select
        value={designationFilter}
        onChange={(e) => setDesignationFilter(e.target.value)}
        className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4c469f] "
      >
        <option value="">All Designations</option>
        <option value="Manager">Manager</option>
        <option value="Developer">Developer</option>
        <option value="Designer">Designer</option>
      </select>

      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        className="p-2 rounded-md px-8 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#4c469f]"
      />

      {/* <button
        onClick={onPermissionClick}
        className="px-4 py-2 bg-[#5e59a9]/80 text-white rounded-md hover:bg-[#5e59a9]"
      >
        Permission
      </button> */}
    </div>
  );
};
