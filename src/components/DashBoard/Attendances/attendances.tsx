import type { ChartOptions } from "chart.js";
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { FONTS } from "../../../constants/uiConstants";
import { useState } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

const Attendances: React.FC = () => {
  const attendanceStats = [
    {
      label: "Present",
      value: 59,
      color: "#8CCDEB",
    },
    {
      label: "Late",
      value: 16,
      color: "#B5FCCD",
    },
    {
      label: "Permission",
      value: 7,
      color: "#FFF085",
    },
    {
      label: "Absent",
      value: 6,
      color: "#EBEAFF",
    },
  ];

  const total = attendanceStats.reduce((sum, item) => sum + item.value, 0);

  const chartData = {
    labels: attendanceStats.map((item) => item.label),
    datasets: [
      {
        label: "Attendance",
        data: attendanceStats.map((item) => item.value),
        backgroundColor: attendanceStats.map((item) => item.color),
        borderWidth: 0,
        spacing: 6,
        borderRadius: 10,
      },
    ],
  };

  const chartOptions: ChartOptions<"doughnut"> = {
    rotation: -90,
    circumference: 180,
    cutout: "60%",
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
  };
  const [selectedDateRange, setSelectedDateRange] = useState("Today");
const [showDateDropdown, setShowDateDropdown] = useState(false);

const dateRanges = ["Today", "Week", "Month"];


  return (
    <div className="relative gap-2 w-full h-full ">
      <div className="p-2 ">
        <div className="flex justify-between items-center ">
          <h2 className="text-xl font-semibold !text-gray-700" style={{...FONTS.cardheader}}>
            Attendance Overview
          </h2>
        <div className="relative inline-block text-sm ml-2">
  <button
    onClick={() => setShowDateDropdown(!showDateDropdown)}
    className="flex items-center text-gray-700"
  >
    <span className="mr-1">{selectedDateRange}</span>
    <svg
      className={`w-5 h-5 text-gray-700 transition-transform duration-200 ${showDateDropdown ? "rotate-180" : ""}`}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.08 1.04l-4.25 4.25a.75.75 0 0 1-1.08 0L5.21 8.27a.75.75 0 0 1 .02-1.06z" />
    </svg>
  </button>

  {showDateDropdown && (
    <ul className="absolute right-0 mt-1 bg-white border border-gray-200 rounded shadow z-10 w-32">
      {dateRanges.map((range) => (
        <li
          key={range}
          onClick={() => {
            setSelectedDateRange(range);
            setShowDateDropdown(false);
          }}
          className="px-3 py-1 hover:bg-blue-200 cursor-pointer"
        >
          {range}
        </li>
      ))}
    </ul>
  )}
</div>


        </div>

        <div className="relative flex justify-center items-center">
          <div className="w-[200px] h-[200px] -mb-10 -mt-10 ">
            <Doughnut data={chartData} options={chartOptions} />
          </div>
          <div className="absolute text-center p-4 mt-24 ">
            <p className="text-gray-700 text-xs">Total Attendance</p>
            <p className="text-xl font-bold text-gray-900">{total}</p>
          </div>
        </div>

        <div className="mb-1">
          <h3 className="text-base font-bold !text-gray-700 " style={{...FONTS.subParagraph}}>Status</h3>
          <div className="space-y-1 text-base">
            {attendanceStats.map((item) => (
              <div
                key={item.label}
                className="flex justify-between items-center"
              >
                <div className="flex items-center space-x-1">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-xs">{item.label}</span>
                </div>
                <span
                  className="text-xs font-medium"
                  style={{ color: item.color }}
                >
                  {((item.value / total) * 100).toFixed(0)}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-200 rounded-lg mt-2 border  ">
          <p className="p-1 text-center text-base font-medium !text-gray-700 hover:underline cursor-pointer" style={{...FONTS.subParagraph}}>
            View Details
          </p>
        </div>
      </div>
    </div>
  );
};

export default Attendances;
