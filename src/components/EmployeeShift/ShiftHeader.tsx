import React, { useRef, useEffect } from "react";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
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
    <div className="border-gray-200 py-2   -mb-5">
      <div className="flex items-center justify-start lg:gap-10 sm:gap-4   ">
        <div className="">
          <h1 style={FONTS.header}>Shift</h1>
        </div>
        <div className="flex lg:gap-3 sm:gap-2 md:h-8">
          <div className="">
            <button
              className="text-white px-2 md:px-4 py-1 rounded-lg font-medium text-sm md:text-base transition-colors duration-200 "
              style={{ backgroundColor: "#5e59a9", ...FONTS.button }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor =
                  "rgba(94, 89, 169, 0.9)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#5e59a9")
              }
              onClick={onAssignClick}
            >
              Assign
            </button>
          </div>
          <div className="flex relative border border-gray-300 rounded-md md:w-80  backdrop-blur-xl bg-white/10  ">
            <input
              type="text"
              placeholder="Search by employee name"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full  pr-12 pl-4 px-2 py-1 bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-lg text-white placeholder-gray-300"
              style={{ ...FONTS.paragraph }}
            />
            <Search className="text-gray-300 absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4" />
          </div>

          <div className="flex items-center gap-3 ">
            <div
              className="relative "
              ref={groupDropdownRef}
              style={{ zIndex: 50, ...FONTS.paragraph }}
            >
              <button
                className={`flex items-center gap-2 px-3 md:px-3 py-2 border rounded-md text-sm md:text-base transition-colors duration-200  h-8 focus:ring-2 focus:ring-gray-300 rounded-lg  ${
                  groupBy
                    ? "border-gray-300 bg-transparent backdrop-blur-xl bg-white/10 text-[#5e59a9]"
                    : "border-gray-300 bg-transparent backdrop-blur-xl bg-white/10 text-white hover:bg-gray-500/10"
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
                <div
                  className="absolute right-0 mt-2 w-48 bg-white border rounded-xl border-gray-200 rounded-lg shadow-lg z-20"
                  style={{ ...FONTS.statusCardDescription }}
                >
                  <button
                    className={`block rounded-t-xl w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                      !groupBy
                        ? "bg-[#5e59a9]/10 text-[#5e59a9] font-medium"
                        : "text-gray-700"
                    }`}
                    onClick={() => handleGroupBySelect(null)}
                  >
                    None
                  </button>
                  <button
                    className={`block w-full  text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                      groupBy === "rotatingShift"
                        ? "bg-[#5e59a9]/10 text-[#5e59a9] font-medium"
                        : "text-gray-700"
                    }`}
                    onClick={() => handleGroupBySelect("rotatingShift")}
                  >
                    Rotating Shift
                  </button>
                  <button
                    className={`block w-full  text-left px-4 py-2 text-sm hover:bg-gray-100 ${
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
                    className={`block w-full rounded-b-xl text-left px-4 py-2 text-sm hover:bg-gray-100 ${
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
    </div>
  );
};

export default EmployeeShiftHeader;
