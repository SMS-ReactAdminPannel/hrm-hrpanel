import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PayrollStack: React.FC = () => {
  const chartData = {
    labels: ["Paid", "Pending", "Unpaid"],
    datasets: [
      {
        data: [60, 25, 15],
        backgroundColor: ["#7c3aed", "#f97316", "#94a3b8"],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    rotation: -90,
    circumference: 180,
    cutout: "70%",
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="p-2">
      {/* Transaction History Table */}
      <div className=" col-span-3   ">
        {/* Title and View Button */}
        <div className="flex justify-between items-center  mb-6">
          <h2 className="text-xl font-bold text-gray-800 tracking-wide">
            Payroll Summary
          </h2>
          <button className="text-sm text-white hover:test-blue-200">
            View Report
          </button>
        </div>

        {/* Bold Stat Blocks */}
        <div className="grid grid-cols-3 gap-2 text-center mb-2">
          <div className="bg-purple-50 py-3 rounded-lg shadow-sm">
            <p className="text-xs font-bold text-gray-800 uppercase">Payment</p>
            <p className="text-lg font-bold text-purple-700">₹181.34</p>
          </div>
          <div className="bg-yellow-50 py-3 rounded-lg shadow-sm">
            <p className="text-xs font-bold text-gray-800 uppercase">Pending</p>
            <p className="text-lg font-bold text-yellow-600">₹37.13</p>
          </div>
          <div className="bg-green-50 py-3 rounded-lg shadow-sm">
            <p className="text-xs font-bold text-gray-800 uppercase">Paid</p>
            <p className="text-lg font-bold text-green-700">₹234.20</p>
          </div>
        </div>

        {/* Semi Doughnut Chart */}
        <div className="flex justify-center items-center mt-auto ">
          <div className="w-60 h-60 ">
            <Doughnut data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayrollStack;
