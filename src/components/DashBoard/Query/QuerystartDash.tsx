import { useEffect, useState } from "react";
import { Ticket, CheckCircle, Clock } from "lucide-react";
import { FONTS } from "../../../constants/uiConstants";

export default function SupportQueryBlock() {
  const [selectedMonth, setSelectedMonth] = useState("January");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
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
    <div className="rounded-2xl p-6 shadow-sm h-full bg-transparent">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="grid-col-2">
        <div>
          <h2
            className="text-xl font-semibold text-gray-900"
            style={{ fontSize: FONTS.header2.fontSize }}
          >
            Query Insights
          </h2>
          <p
            className="text-sm mt-2 font-bold text-gray-800"
            style={{ fontSize: FONTS.paragraph.fontSize }}
          >
            Summary of last 7 Days
          </p>
        </div>
      </div>

      {/* Filters */}
     
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          style={FONTS.subParagraph}
          className="px-2 py-1 h-6 w-24 text-xs rounded bg-blue-200 !text-black focus:outline-none text-right"
        >
          {[
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
          ].map((month) => (
            <option key={month} value={month}>{month}</option>
          ))}
        </select>

       
      </div>
      

      {/* Main content */}
      <div className="flex flex-col h-full gap-6">
          {/* Bottom Metrics */}
        <div className="flex justify-between mt-4 gap-2">
          <div className="flex items-center  bg-yellow-100 gap-3 bg-gray-200 border rounded-xl p-2 shadow-md">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center">
              <Ticket className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <div className="text-xs font-bold text-gray-800">New Queries</div>
              <div className="text-black font-semibold">142</div>
            </div>
          </div>

          <div className="flex  bg-yellow-100 items-center gap-3 bg-gray-200 border rounded-xl p-2 shadow-md">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-teal-600" />
            </div>
            <div>
              <div className="text-xs font-bold text-gray-800">Solved Queries</div>
              <div className="text-black font-semibold">28</div>
            </div>
          </div>

          <div className="flex items-center  bg-yellow-100 gap-3 bg-gray-200 border rounded-xl p-2 shadow-md">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center">
              <Clock className="w-4 h-4 text-orange-600" />
            </div>
            <div>
              <div className="text-xs font-bold  text-gray-800">Unsolved Queries</div>
              <div className="text-black font-semibold">1 Day</div>
            </div>
          </div>
        </div>

        {/* Top Stats */}
        <div className="flex justify-between items-center">
          {/* Total */}
          <div className="flex flex-col items-center">
            <div className="shadow-md bg-blue-200 border w-32 h-28 rounded-xl flex flex-col items-center justify-center ml-20">
              <div className="text-4xl text-black  font-semibold">164</div>
              <div className="text-sm font-bold text-gray-800 mt-1">Total Queries</div>
            </div>
          </div>

          {/* Circular Progress */}
          <div className="relative w-40 h-40">
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

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-2xl text-black font-semibold">{completionPercentage}%</div>
              <div className="text-xs text-gray-800  font-bold text-center leading-tight">Completed Task</div>
            </div>
          </div>
        </div>

      
      </div>
    </div>
  );
}
