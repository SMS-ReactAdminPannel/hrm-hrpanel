import { useState } from "react";
import { MdOutlineFileDownload } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import Approvals from "./Approvals";
import DailyTimeSheet from "../../components/TimeSheets/DailyTimeSheet";
import MonthlyTimeSheets from "../../components/TimeSheets/MonthlyTimeSheets";
import WeeklyTimeSheet from "../../components/TimeSheets/WeeklyTimeSheet";
import { IoInformationCircleSharp } from "react-icons/io5";


const TimeSheet = () => {
    const [activeTab, setActiveTab] = useState("timesheets");
    const [activeFilter, setActiveFilter] = useState("organization");
    const [timeSheetView, setTimeSheetView] = useState("weekly");

    const hourOptions = Array.from({ length: 10 }, (_, i) => `${i}-${i + 1} hr`);

    return (
        <div className="bg-gray-200 p-2">
            <div className="flex justify-between items-center font-bold">
                <section>
                    <button
                        className={`px-5 py-3 border-b-4 transition ${activeTab === "timesheets"
                            ? "border-[#006666] text-[#006666]"
                            : "border-transparent hover:border-[#006666]"
                            }`}
                        onClick={() => setActiveTab("timesheets")}
                    >
                        Timesheets
                    </button>
                    <button
                        className={`px-5 py-3 border-b-4 transition ml-2 ${activeTab === "approvals"
                            ? "border-[#006666] text-[#006666]"
                            : "border-transparent hover:border-[#006666]"
                            }`}
                        onClick={() => setActiveTab("approvals")}
                    >
                        Approvals
                    </button>
                </section>

                <section>
                    <button
                        className={`px-4 border rounded transition mr-2 ${activeFilter === "organization"
                            ? "border-[#006666] text-[#006666] bg-[#faf3eb]"
                            : "border-transparent hover:border-[#006666]"
                            }`}
                        onClick={() => setActiveFilter("organization")}
                    >
                        Organization
                    </button>
                    <button
                        className={`px-4 border rounded transition ${activeFilter === "managed"
                            ? "border-[#006666] text-[#006666] bg-[#faf3eb]"
                            : "border-transparent hover:border-[#006666]"
                            }`}
                        onClick={() => setActiveFilter("managed")}
                    >
                        Managed by me
                    </button>
                </section>
            </div>

            <hr className="border border-[#006666] mb-6" />

            {activeTab === "timesheets" && (
                <>
                    <div className="flex items-center justify-between py-4">
                        <select
                            className="border border-[#006666] bg-transparent focus:outline-none text-[#006666] rounded-md p-2 text-md font-bold"
                            value={timeSheetView}
                            onChange={(e) => setTimeSheetView(e.target.value)}
                            title="TimeSheet"
                        >
                            <option value="weekly">Weekly Timesheets</option>
                            <option value="daily">Daily Timesheets</option>
                            <option value="monthly">Monthly Timesheets</option>
                        </select>

                        <div className="flex gap-4">
                            {timeSheetView === "monthly" && <button className="border border-[#006666] text-black px-3 py-1 rounded flex items-center gap-2"><IoInformationCircleSharp /> Legend</button>}
                            <button className="bg-[#006666] text-white px-3 py-1 rounded flex items-center gap-2">
                                <MdOutlineFileDownload /> Export
                            </button>
                        </div>
                    </div>

                    <hr className="border border-[#006666] mb-6" />

                    <div className="flex items-center gap-2 py-4">
                        <select
                            className="w-36 border border-[#006666] bg-transparent focus:outline-none text-[#006666] rounded-md p-2 text-md font-bold"
                            title="Payroll Hours"
                        >
                            <option>Payroll Hours</option>
                            {hourOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>

                        <select className="w-36 border border-[#006666] bg-transparent text-[#006666] rounded-md p-2 font-bold" title="fd">
                            <option>Groups</option>
                            <option>Work</option>
                            <option>Intern</option>
                        </select>

                        <select className="w-36 border border-[#006666] bg-transparent text-[#006666] rounded-md p-2 font-bold" title="f">
                            <option>Members</option>
                            <option>Work</option>
                            <option>Intern</option>
                        </select>

                        <select className="w-36 border border-[#006666] bg-transparent text-[#006666] rounded-md p-2 font-bold" title="fe">
                            <option>Schedules</option>
                            <option>Work</option>
                            <option>Intern</option>
                        </select>

                        <a className="bg-[#006666] text-white px-5 py-1 rounded flex items-center gap-2 ml-5 cursor-pointer">
                            <FaPlus /> Filter
                        </a>
                    </div>

                    <hr className="border border-[#006666] mb-6" />

                    {timeSheetView === "weekly" && <WeeklyTimeSheet />}
                    {timeSheetView === "daily" && <DailyTimeSheet />}
                    {timeSheetView === "monthly" && <MonthlyTimeSheets />}
                </>
            )}

            {activeTab === "approvals" && <Approvals />}
        </div>
    );
};

export default TimeSheet;
