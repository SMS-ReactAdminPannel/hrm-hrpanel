import { useState, useRef, useEffect } from "react";
import { MdOutlineFileDownload } from "react-icons/md";
import { IoInformationCircleSharp } from "react-icons/io5";

import DailyTimeSheet from "../../components/TimeSheets/DailyTimeSheet";
import MonthlyTimeSheets from "../../components/TimeSheets/MonthlyTimeSheets";
import WeeklyTimeSheet from "../../components/TimeSheets/WeeklyTimeSheet";
import FilterTimeSheet from "../../components/TimeSheets/FilterTimeSheet";
import ExportTimeSheet from "../../components/TimeSheets/ExportTimeSheet";
import { FONTS } from "../../constants/uiConstants";

const TimeSheet = () => {
  const [timeSheetView, setTimeSheetView] = useState("weekly");
  const [showLegend, setShowLegend] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);


  type TimeEntry = {
    day: string;
    hoursWorked: number;
    isHoliday: boolean;
    firstIn: string;
    lastOut: string;
    requiredHours?: number;
  };

  type WeeklyTimesheetUser = {
    name: string;
    profilePic?: string;
    timeEntries: TimeEntry[];
  };

  type DailyTimesheetUser = {
    name: string;
    profilePic?: string;
    firstIn: string;
    lastOut: string;
    regular: number;
    overtime: number;
    dailyDoubleOvertime: number;
    tracked: number;
  };

  type MonthlyUserData = {
    name: string;
    profilePic?: string;
    daysData: {
      day: number;
      firstIn: string;
      lastOut: string;
      regular: number;
      overtime: number;
      dailyDoubleOvertime: number;
      tracked: number;
    }[];
  };

  const [weeklyTimesheet] = useState<WeeklyTimesheetUser[]>([]);
  const [dailyTimesheet] = useState<DailyTimesheetUser[]>([]);
  const [monthlyTimesheet] = useState<MonthlyUserData[]>([]);


  const timeSheetOptions = [
    { label: "Weekly Timesheets", value: "weekly" },
    { label: "Daily Timesheets", value: "daily" },
    { label: "Monthly Timesheets", value: "monthly" },
  ];

  const handleExport = (params: any) => {
    console.log("Exporting with params:", params);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // useEffect(() => {
  //   const fetchTimesheet = async () => {
  //     try {
        
  //       const responce = await getemployeeTimeSheet("68468e814eacfb4787b749cd", {});
  //       const rawData=responce;
  //       console.log("data:",rawData)
        

  //       // Weekly
  //       const weeklyMap = new Map();
  //       rawData.forEach((entry: any) => {
  //         const key = entry.name;
  //         if (!weeklyMap.has(key)) {
  //           weeklyMap.set(key, {
  //             name: entry.name,
  //             profilePic: entry.profilePic,
  //             timeEntries: [],
  //           });
  //         }
  //         weeklyMap.get(key).timeEntries.push({
  //           day: entry.day,
  //           hoursWorked: entry.hoursWorked,
  //           isHoliday: entry.isHoliday,
  //           firstIn: entry.firstIn,
  //           lastOut: entry.lastOut,
  //           requiredHours: entry.requiredHours || 8,
  //         });
  //       });
  //       setWeeklyTimesheet(Array.from(weeklyMap.values()));

  //       // Daily
  //       const dailyData = rawData.map((entry: any) => ({
  //         name: entry.name,
  //         profilePic: entry.profilePic,
  //         firstIn: entry.firstIn,
  //         lastOut: entry.lastOut,
  //         regular: entry.regular,
  //         overtime: entry.overtime,
  //         dailyDoubleOvertime: entry.dailyDoubleOvertime,
  //         tracked: entry.tracked,
  //       }));
  //       setDailyTimesheet(dailyData);

  //       // Monthly
  //       const monthlyMap = new Map();
  //       rawData.forEach((entry: any) => {
  //         const key = entry.name;
  //         if (!monthlyMap.has(key)) {
  //           monthlyMap.set(key, {
  //             name: entry.name,
  //             profilePic: entry.profilePic,
  //             daysData: [],
  //           });
  //         }
  //         monthlyMap.get(key).daysData.push({
  //           day: new Date(entry.date).getDate(),
  //           firstIn: entry.firstIn,
  //           lastOut: entry.lastOut,
  //           regular: entry.regular,
  //           overtime: entry.overtime,
  //           dailyDoubleOvertime: entry.dailyDoubleOvertime,
  //           tracked: entry.tracked,
  //         });
  //       });
  //       setMonthlyTimesheet(Array.from(monthlyMap.values()));
  //     } catch (error) {
  //       console.log("Error fetching timesheet:", error);
  //     }
  //   };

  //   fetchTimesheet();
  // }, []);

  return (
    <div className="relative">
      <div className={`bg--200 rounded-lg transition duration-300 ${isExportOpen ? "blur-sm pointer-events-none select-none" : ""}`}>
        <div className="flex justify-between items-center font-bold">
          <h1 className="py-3 text-black" style={FONTS.header}>Timesheets</h1>
        </div>

        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-5">
            <FilterTimeSheet />
            <div className="flex gap-4">
              {timeSheetView === "monthly" && (
                <button onClick={() => setShowLegend(true)} className="bg-[#eff4f5] text-black px-3 py-1 rounded flex items-center gap-2 transition">
                  <IoInformationCircleSharp /> Legend
                </button>
              )}
              <button onClick={() => setIsExportOpen(true)} className="bg-[#eff4f5] text-black px-3 py-2 rounded flex items-center gap-2 transition">
                <MdOutlineFileDownload /> Export
              </button>
            </div>
          </div>

          <div className="relative w-56" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className="w-full px-4 py-2 bg-[#eff4f5] text-black rounded-md shadow-sm flex justify-between items-center hover:shadow-md hover:scale-[1.02] transition"
              title="Timesheet View"
            >
              {timeSheetOptions.find((opt) => opt.value === timeSheetView)?.label || "Select"}
              <span className="ml-2">&#9662;</span>
            </button>

            {isDropdownOpen && (
              <ul className="absolute z-50 mt-2 w-full bg-white text-[#006666] border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                {timeSheetOptions.map((option) => (
                  <li
                    key={option.value}
                    onClick={() => {
                      setTimeSheetView(option.value);
                      setIsDropdownOpen(false);
                    }}
                    className={`px-4 py-2 cursor-pointer hover:bg-[#f0fdfa] hover:text-[#006666] transition ${timeSheetView === option.value ? "bg-[#e6fffa] text-[#006666] font-semibold" : ""}`}
                  >
                    {option.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="w-full mt-6">
          {timeSheetView === "weekly" && <WeeklyTimeSheet timesheet={weeklyTimesheet} />}
          {timeSheetView === "daily" && <DailyTimeSheet timesheet={dailyTimesheet} />}
          {timeSheetView === "monthly" && <MonthlyTimeSheets timesheet={monthlyTimesheet} />}
        </div>

        {showLegend && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-80 shadow-xl relative">
              <h3 className="text-lg font-bold mb-4 text-[#006666]">Legend</h3>
              <ul className="space-y-3">
                <li><span className="w-5 h-5 bg-green-500 rounded-sm inline-block" /> Presented</li>
                <li><span className="w-5 h-5 bg-red-500 rounded-sm inline-block" /> Absent</li>
                <li><span className="w-5 h-5 bg-orange-400 rounded-sm inline-block" /> Half Day</li>
                <li><span className="w-5 h-5 bg-blue-500 rounded-sm inline-block" /> Permission</li>
                <li><span className="w-5 h-5 bg-gray-400 rounded-sm inline-block" /> Rest Day (R)</li>
              </ul>
              <button onClick={() => setShowLegend(false)} className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl hover:bg-[#006666] hover:text-white">
                &times;
              </button>
            </div>
          </div>
        )}
      </div>

      {isExportOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center">
          <ExportTimeSheet onClose={() => setIsExportOpen(false)} onExport={handleExport}/>
        </div>
      )}
    </div>
  );
};

export default TimeSheet;
