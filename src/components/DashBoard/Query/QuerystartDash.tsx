import { useEffect, useState } from "react";
import { Ticket, CheckCircle, Clock } from "lucide-react";
import { FONTS } from "../../../constants/uiConstants";

export default function SupportQueryBlock() {
  const [selectedMonth, setSelectedMonth] = useState("January");
  const [open, setOpen] = useState(false);
const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
  // const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [percentage, setPercentage] = useState(0);

  const completionPercentage = 85;
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  

  useEffect(() => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 1;
      if (progress > completionPercentage) {
        clearInterval(interval);
      } else {
        setPercentage(progress);
      }
    }, 15);

    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="rounded-xl p-2 shadow-sm bg-transparent w-full h-full">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="grid-col-2">
        <div>
          <h2
            className="text-xl font-semibold !text-gray-900 mt-2"
            style={{...FONTS.cardheader}}
          >
            Query Insights
          </h2>
          <p
            className="text-sm mt-2 font-bold !text-gray-800"
            style={{ ...FONTS.subParagraph }}
          >
            Summary of last 7 Days
          </p>
        </div>
      </div>

      {/* Filters */}
     
      <div className="relative">
  {/* Dropdown aligned to top-right */}
  <div className="flex justify-end pr-4 pt-2">
    <button
      onClick={() => setOpen(!open)}
      className="flex items-center gap-0 text-sm bg-transparent"
    >
      <span className="mr-1">{selectedMonth}</span>
      <svg
        className={`w-5 h-5 text-gray-700 transition-transform duration-200  ${open ? "rotate-180" : ""}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.08 1.04l-4.25 4.25a.75.75 0 0 1-1.08 0L5.21 8.27a.75.75 0 0 1 .02-1.06z" />
      </svg>
    </button>
  </div>

  {open && (
    <ul className="absolute right-4 top-10 bg-white border border-gray-300 rounded shadow z-10 max-h-60 overflow-y-auto scrollbar-hide w-40">
      {months.map((month) => (
        <li
          key={month}
          onClick={() => {
            setSelectedMonth(month);
            setOpen(false);
          }}
          className="px-3 py-1 hover:bg-blue-200 cursor-pointer text-sm"
        >
          {month}
        </li>
      ))}
    </ul>
  )}
</div>



       
      </div>
      

      {/* Main content */}
      <div className="flex flex-col  gap-6">
          {/* Bottom Metrics */}
        <div
  className="flex justify-center mt-5 gap-4 flex-wrap"
  style={{ ...FONTS.subParagraph }}
>
  {/* New Queries Card */}
  <div className="flex items-center bg-gray-200 gap-3 border rounded-xl p-3 shadow-md hover:scale-97 transition-transform duration-300">
    <div className="w-8 h-8 rounded-lg flex items-center justify-center md:w-5 md:h-5">
      <Ticket className="w-4 h-4 text-purple-600" />
    </div>
    <div>
      <div className="text-xs font-bold !text-gray-800" style={{ ...FONTS.subParagraph }}>
        New Queries
      </div>
      <div className="!text-black font-semibold " style={{ ...FONTS.subParagraph }}>
        142
      </div>
    </div>
  </div>

  {/* Solved Queries Card */}
  <div className="flex items-center bg-gray-200 gap-3 border rounded-xl p-3 shadow-md hover:scale-97 transition-transform duration-300">
    <div className="w-8 h-8 rounded-lg flex items-center justify-center md:w-5 md:h-5">
      <CheckCircle className="w-4 h-4 text-teal-600" />
    </div>
    <div>
      <div className="text-xs font-bold !text-gray-800" style={{ ...FONTS.subParagraph }}>
        Solved Queries
      </div>
      <div className="!text-black font-semibold" style={{ ...FONTS.subParagraph }}>
        28
      </div>
    </div>
  </div>

  {/* Unsolved Queries Card */}
  <div className="flex items-center bg-gray-200 gap-3 border rounded-xl p-3 shadow-md hover:scale-97 transition-transform duration-300">
    <div className="w-8 h-8 rounded-lg flex items-center justify-center md:w-5 md:h-5">
      <Clock className="w-4 h-4 text-orange-600" />
    </div>
    <div>
      <div className="text-xs font-bold !text-gray-800" style={{ ...FONTS.subParagraph }}>
        Unsolved Queries
      </div>
      <div className="!text-black font-semibold" style={{ ...FONTS.subParagraph }}>
        1 Day
      </div>
    </div>
  </div>
</div>


        {/* Top Stats */}
        <div className="flex justify-around  items-center mt-8 ">
          {/* Total */}
          <div className="flex flex-col items-center">
            <div className="shadow-md bg-blue-200 border w-28 h-28 rounded-xl flex flex-col items-center justify-center hover:scale-103 transition-transform duration-300 ">
              <div className="text-4xl !text-black !font-bold !text-xl" style={{...FONTS.subParagraph}}>164</div>
              <div className="text-xs font-bold !text-gray-800 mt-1" style={{...FONTS.subParagraph}} >Total Queries</div>
            </div>
          </div>

          {/* Circular Progress */}
          <div className="relative w-32 h-32 hover:scale-97 transition-transform duration-300 ">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-gray-200"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="text-pink-400 transition-all duration-300 ease-in-out"
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center" >
              <div className="text-2xl !text-black !font-bold !text-xl" style={{...FONTS.subParagraph}}>{completionPercentage}%</div>
              <div className="text-xs !text-gray-800  font-bold text-center leading-tight" style={{...FONTS.subParagraph}}>Completed Task</div>
            </div>
          </div>
        </div>

      
      </div>
    </div>
  );
}
