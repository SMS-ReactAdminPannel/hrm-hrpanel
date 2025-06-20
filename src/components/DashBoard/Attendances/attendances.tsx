import type { ChartOptions } from "chart.js";
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const Attendances: React.FC = () => {
  const chartData = {
    labels: ["Present", "Late", "Permission", "Absent"],
    datasets: [
      {
        label: "Attendance",
        data: [53, 16, 7, 6],
        backgroundColor: ["#22c55e", "#0f172a", "#facc15", "#dc2626"],
        borderWidth: 4,
        borderRadius: 8,
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

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">
          Attendance Overview
        </h2>
        <select
          className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-md border border-gray-300"
          defaultValue="Today"
        >
          <option>Today</option>
          <option>Week</option>
          <option>Month</option>
        </select>
      </div>

      <div className="relative flex justify-center items-center ">
        <div className="w-[300px] h-[300px]">
          <Doughnut data={chartData} options={chartOptions}/>
        </div> 
        <div className="absolute text-center p-4 mt-14">
          <p className="text-gray-500 text-sm">Total Attendance</p>
          <p className="text-xl font-bold text-gray-900">120</p>
        </div>
      </div>

      <div className="mb-2">
        <h3 className="text-base font-bold text-gray-700 mb-1">Status</h3>
        <div className="space-y-2 text-base">
          {[
            { label: "Present", color: "bg-green-500", percent: "59%" },
            { label: "Late", color: "bg-slate-600", percent: "21%" },
            { label: "Permission", color: "bg-yellow-400", percent: "2%" },
            { label: "Absent", color: "bg-red-600", percent: "15%" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex justify-between items-center"
            >
              <div className="flex items-center space-x-2">
                <span className={`w-3 h-3 rounded-full ${item.color}`} />
                <span>{item.label}</span>
              </div>
              <span className="font-medium text-gray-700">
                {item.percent}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-200 rounded-lg">
        <p className="p-2 text-center text-base font-medium text-gray-700 hover:underline cursor-pointer">
          View Details
        </p>
      </div>
    </div>
  );
};

export default Attendances;
