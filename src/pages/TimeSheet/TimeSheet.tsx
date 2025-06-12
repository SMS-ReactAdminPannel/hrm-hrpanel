import { useState, useRef, useEffect } from "react";
import { MdOutlineFileDownload } from "react-icons/md";
import { IoInformationCircleSharp } from "react-icons/io5";
import DailyTimeSheet from "../../components/TimeSheets/DailyTimeSheet";
import MonthlyTimeSheets from "../../components/TimeSheets/MonthlyTimeSheets";
import WeeklyTimeSheet from "../../components/TimeSheets/WeeklyTimeSheet";
import FilterTimeSheet from "../../components/TimeSheets/FilterTimeSheet";
import ExportTimeSheet from "../../components/TimeSheets/ExportTimeSheet";
import { FONTS } from "../../constants/uiConstants";
import { getemployeeTimeSheet } from "../../features/timesheet/services";


const TimeSheet = () => {
    const [timeSheetView, setTimeSheetView] = useState("weekly");
    const [showLegend, setShowLegend] = useState(false);
    const [isExportOpen, setIsExportOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [timesheet, setTimesheet] = useState<any>([]);


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


    const fetchtimesheet = async () => {
  try {
    const response: any = await getemployeeTimeSheet("68468e814eacfb4787b749cd", {});
    setTimesheet(response?.data?.data || []);
    console.log(response?.data?.data, "Timesheet Data");
  } catch (error) {
    console.error("Error fetching in timesheet:", error);
  }
};


  useEffect(() => {
   fetchtimesheet();
 }, []);

    return (
        <div className="relative">
            <div className={`bg--200  rounded-lg transition duration-300 ${isExportOpen ? "blur-sm pointer-events-none select-none" : ""}`}>
                <div className="flex justify-between items-center font-bold">
                    <h1
                        className="py-3 text-black" style={FONTS.header}
                
                    >
                        Timesheets
                    </h1>

                </div>


                <div className="flex gap-4">
                    {timeSheetView === "monthly" && (
                        <button
                            onClick={() => setShowLegend(true)}
                            
                            className=" bg-[#006666] text-white px-3 py-1 rounded flex items-center gap-2  transition"
                        >
                            <IoInformationCircleSharp /> Legend
                        </button>
                    )}
                    <button
                        onClick={() => setIsExportOpen(true)}
                
                        className="bg-[#006666] text-white px-3 py-2 rounded flex items-center gap-2 transition"
                    >
                        <MdOutlineFileDownload /> Export
                    </button>
                </div>



                <div className="flex items-center justify-between flex-wrap gap-4">

                    <FilterTimeSheet />

                    <div className="relative w-60" ref={dropdownRef}>
                        <button
                            type="button"
                            onClick={() => setIsDropdownOpen((prev) => !prev)}
                            
                            className="w-full px-4 py-2 bg-[#eff4f5]  text-black rounded-md shadow-sm flex justify-between items-center hover:shadow-md hover:scale-[1.02] transition"
                            title="Timesheet View"
                        >
                            {timeSheetOptions.find((opt) => opt.value === timeSheetView)?.label || "Select"}
                            <span className="ml-2">&#9662;</span>
                        </button>

                        {isDropdownOpen && (
                            <ul className="absolute z-50 mt-2 w-full bg-white text-[#006666] border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"
            
                                >
                                {timeSheetOptions.map((option) => (
                                    <li
                                        key={option.value}
                                        onClick={() => {
                                            setTimeSheetView(option.value);
                                            setIsDropdownOpen(false);
                                        }}
                                        className={`px-4 py-2 cursor-pointer hover:bg-[#f0fdfa] hover:text-[#006666] transition ${timeSheetView === option.value ? "bg-[#e6fffa] text-[#006666] font-semibold" : ""
                                            }`}
                                    >
                                        {option.label}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                {/* <hr className="border-[#006666] mb-6" /> */}

                <div className="w-full">
                    <div className="w-full">
  {timeSheetView === "weekly" && <WeeklyTimeSheet timesheet={timesheet} />}
  {timeSheetView === "daily" && <DailyTimeSheet timesheet={timesheet} />}
  {timeSheetView === "monthly" && <MonthlyTimeSheets timesheet={timesheet} />}
</div>

                </div>


                {showLegend && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white rounded-lg p-6 w-80 shadow-xl relative">
                            <h3 className="text-lg font-bold mb-4 text-[#006666]">Legend</h3>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3">
                                    <span className="w-5 h-5 bg-green-500 rounded-sm inline-block"></span>
                                    Presented
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-5 h-5 bg-red-500 rounded-sm inline-block"></span>
                                    Absent
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-5 h-5 bg-orange-400 rounded-sm inline-block"></span>
                                    Half Day
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-5 h-5 bg-blue-500 rounded-sm inline-block"></span>
                                    Permission
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-5 h-5 bg-gray-400 rounded-sm inline-block"></span>
                                    Rest Day (R)
                                </li>
                            </ul>
                            <button
                                onClick={() => setShowLegend(false)}
                                className="absolute top-2 right-2 text-gray-500 px-2 rounded hover:text-black text-xl hover:bg-[#006666] hover:text-white"
                                title="Close"
                            >
                                &times;
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {isExportOpen && (
                <div className="absolute inset-0 z-50 flex items-center justify-center">
                    <ExportTimeSheet
                        onClose={() => setIsExportOpen(false)}
                        onExport={handleExport}
                    />
                </div>
            )}
        </div>
    );
};

export default TimeSheet;
