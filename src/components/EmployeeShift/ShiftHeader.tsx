import React, { useRef, useEffect } from "react";
import { Search, ChevronDown, ChevronUp} from "lucide-react";
import { FONTS } from "../../constants/uiConstants";

interface EmployeeShiftHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  groupBy: string | null;
  onGroupByChange: (group: string | null) => void;
  showGroupFilter: boolean;
  onShowGroupFilterChange: (show: boolean) => void;
  onAssignClick: () => void;
}

const EmployeeShiftHeader: React.FC<EmployeeShiftHeaderProps> = ({
  searchTerm,
  onSearchChange,
  groupBy,
  onGroupByChange,
  // showGroupFilter,
  onShowGroupFilterChange,
  onAssignClick,
}) => {
  const [isGroupDropdownOpen, setIsGroupDropdownOpen] = React.useState(false);
  const groupDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        groupDropdownRef.current &&
        !groupDropdownRef.current.contains(event.target as Node)
      ) {
        setIsGroupDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleGroupBySelect = (group: string | null) => {
    onGroupByChange(group);
    setIsGroupDropdownOpen(false);
    onShowGroupFilterChange(true);
  };
  const getGroupByDisplayText = () => {
    if (!groupBy) return "Group By";

    switch (groupBy) {
      case "rotatingShift":
        return "Rotating Shift";
      case "department":
        return "Department";
      case "jobRole":
        return "Job Role";
      case "reportingManager":
        return "Reporting Manager";
      default:
        return "Group By";
    }
  };

  return (
    <div className="border-gray-200 py-2  -mb-3">
      <div className="flex items-center justify-between">
        <h1 style={FONTS.header}>Shift</h1>
        <button
          className="text-white px-4 md:px-6 py-2 rounded-lg font-medium text-sm md:text-base transition-colors duration-200"
          style={{ backgroundColor: "#5e59a9" }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.65")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
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
            className="w-full pl-10 pr-4 py-2 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            style={{ ...FONTS.cardSubHeader }}
          />
        </div>

        <div className="flex items-center gap-3">
          <div
            className="relative"
            ref={groupDropdownRef}
            style={{ zIndex: 50, ...FONTS.button }}
          >
            <button
              className={`flex items-center gap-2 px-3 md:px-4 py-2 border rounded-md text-sm md:text-base transition-colors duration-200 ${
                groupBy
                  ? "border-gray-300 bg-white text-[#5e59a9]"
                  : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => setIsGroupDropdownOpen(!isGroupDropdownOpen)}
            >
              {getGroupByDisplayText()}
              {isGroupDropdownOpen ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>

            {isGroupDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-20" style={{...FONTS.statusCardDescription}}>
                <button
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                    !groupBy
                      ? "bg-[#5e59a9]/10 text-[#5e59a9] font-medium"
                      : "text-gray-700"
                  }`}
                  onClick={() => handleGroupBySelect(null)}
                >
                  None
                </button>
                <button
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                    groupBy === "rotatingShift"
                      ? "bg-[#5e59a9]/10 text-[#5e59a9] font-medium"
                      : "text-gray-700"
                  }`}
                  onClick={() => handleGroupBySelect("rotatingShift")}
                >
                  Rotating Shift
                </button>
                <button
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                    groupBy === "department"
                      ? "bg-[#5e59a9]/10 text-[#5e59a9] font-medium"
                      : "text-gray-700"
                  }`}
                  onClick={() => handleGroupBySelect("department")}
                >
                  Department
                </button>
                <button
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                    groupBy === "jobRole"
                      ? "bg-[#5e59a9]/10 text-[#5e59a9] font-medium"
                      : "text-gray-700"
                  }`}
                  onClick={() => handleGroupBySelect("jobRole")}
                >
                  Job Role
                </button>
                <button
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                    groupBy === "reportingManager"
                      ? "bg-[#5e59a9]/10 text-[#5e59a9] font-medium"
                      : "text-gray-700"
                  }`}
                  onClick={() => handleGroupBySelect("reportingManager")}
                >
                  Reporting Manager
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeShiftHeader;
