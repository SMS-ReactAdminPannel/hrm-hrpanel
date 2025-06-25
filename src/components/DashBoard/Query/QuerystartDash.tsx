import { useEffect, useState } from "react";
import { Ticket, CheckCircle, Clock } from "lucide-react";
import { FONTS } from "../../../constants/uiConstants";

export default function SupportQueryBlock() {
  const [selectedMonth, setSelectedMonth] = useState("January");
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
            className="text-xl font-semibold text-gray-900"
            style={{...FONTS.header}}
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
          className=" h-6 text-xs rounded  !text-black focus:outline-none text-right"
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
      <div className="flex flex-col  gap-6">
          {/* Bottom Metrics */}
        <div className="flex justify-between mt-5 gap-2 md:gap-1 ">
          <div className="flex items-center  bg-yellow-100 gap-3 bg-gray-200 border rounded-xl p-1 shadow-md hover:scale-103 transition-transform duration-300">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center md:w-4 md:h-4">
              <Ticket className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <div className="text-xs font-bold text-gray-800">New Queries</div>
              <div className="text-black font-semibold">142</div>
            </div>
          </div>

          <div className="flex  bg-yellow-100 items-center gap-3 bg-gray-200 border rounded-xl p-1 shadow-md hover:scale-97 transition-transform duration-300">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center md:w-4 md:h-4">
              <CheckCircle className="w-4 h-4 text-teal-600" />
            </div>
            <div>
              <div className="text-xs font-bold text-gray-800">Solved Queries</div>
              <div className="text-black font-semibold">28</div>
            </div>
          </div>

          <div className="flex items-center  bg-yellow-100 gap-3 bg-gray-200 border rounded-xl p-1 shadow-md hover:scale-103 transition-transform duration-300">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center md:w-4 md:h-4">
              <Clock className="w-4 h-4 text-orange-600" />
            </div>
            <div>
              <div className="text-xs font-bold  text-gray-800">Unsolved Queries</div>
              <div className="text-black font-semibold">1 Day</div>
            </div>
          </div>
        </div>

        {/* Top Stats */}
        <div className="flex justify-around  items-center mt-8 ">
          {/* Total */}
          <div className="flex flex-col items-center">
            <div className="shadow-md bg-blue-200 border w-28 h-28 rounded-xl flex flex-col items-center justify-center hover:scale-103 transition-transform duration-300 ">
              <div className="text-4xl text-black  font-semibold">164</div>
              <div className="text-sm font-bold text-gray-800 mt-1">Total Queries</div>
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
