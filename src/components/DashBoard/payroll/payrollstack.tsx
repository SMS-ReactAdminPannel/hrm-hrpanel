import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { FONTS } from "../../../constants/uiConstants";

ChartJS.register(ArcElement, Tooltip, Legend);

const PayrollStack: React.FC = () => {
  const transactions = [
    {
      name: "Arlene McCoy",
      company: "The Walt Disney Company",
      date: "Mar 1, 2022",
      time: "08:00 AM",
      amount: "₹1,546.12",
      img: "https://i.pravatar.cc/40?img=1",
    },
    {
      name: "Savannah Nguyen",
      company: "Pizza Hut",
      date: "Mar 2, 2022",
      time: "09:30 AM",
      amount: "₹2,120.00",
      img: "https://i.pravatar.cc/40?img=2",
    },
    {
      name: "Kristin Watson",
      company: "Nintendo",
      date: "Mar 3, 2022",
      time: "10:45 AM",
      amount: "₹980.00",
      img: "https://i.pravatar.cc/40?img=3",
    },
    {
      name: "Jane Cooper",
      company: "eBay",
      date: "Mar 4, 2022",
      time: "02:15 PM",
      amount: "₹3,640.00",
      img: "https://i.pravatar.cc/40?img=4",
    },
    {
      name: "Devon Lane",
      company: "Netflix",
      date: "Mar 5, 2022",
      time: "11:00 AM",
      amount: "₹4,200.00",
      img: "https://i.pravatar.cc/40?img=5",
    },
  ];

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
    <div className="grid grid-cols-9 gap-2 mt-1 w-full">
      {/* Transaction History Table */}
      <div className="col-span-6 bg-white rounded-xl border border-white shadow-sm p-4 backdrop-blur bg-opacity-10 backdrop-saturate-100">
        <h2 className="text-lg font-semibold mb-4" style={{...FONTS.header}}>Transaction History</h2>

        {/* Table Headers */}
        <div className="grid grid-cols-4 font-semibold text-sm text-gray-600 border-b pb-2 mb-2">
          <div style={{...FONTS.paragraph}}>Name</div>
          <div style={{...FONTS.paragraph}}>Date - Time</div>
          <div style={{...FONTS.paragraph}}>Amount</div>
          <div style={{...FONTS.paragraph}}>Action</div>
        </div>

        {/* Rows */}
        {transactions.map((txn, index) => (
          <div
            key={index}
            className="grid grid-cols-4 items-center text-sm text-gray-700 border-b py-2 last:border-b-0"
          >
            {/* Name + Avatar */}
            <div className="flex items-center space-x-3">
              <img
                src={txn.img}
                alt={txn.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div>
                <p className="font-medium" style={{...FONTS.paragraph}}>{txn.name}</p>
                <p className="text-xs text-gray-700" style={{...FONTS.subParagraph}}>{txn.company}</p>
              </div>
            </div>

            {/* Date-Time */}
            <div>
              <p style={{...FONTS.paragraph}}>{txn.date}</p>
              <p className="text-xs text-gray-600" style={{...FONTS.subParagraph}}>{txn.time}</p>
            </div>

            {/* Amount */}
            <div>
              <p className="font-semibold" style={{...FONTS.paragraph}}>{txn.amount}</p>
            </div>

            {/* Action */}
            <div className="text-left">
              <button className="text-xs bg-gray-100 px-6 py-1 rounded-md">
                Send Invoice
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className=" col-span-3 bg-white border border-white rounded-xl shadow-lg p-6 backdrop-blur bg-opacity-10 backdrop-saturate-100 flex flex-col justify-between">
  {/* Title and View Button */}
  <div className="flex justify-between items-center mb-6">
    <h2 className="text-xl font-extrabold text-gray-800 tracking-wide" style={{...FONTS.header}}>Payroll Summary</h2>
    <button className="text-sm text-purple-600 hover:underline" style={{...FONTS.button}}>View Report</button>
  </div>

  {/* Bold Stat Blocks */}
  <div className="grid grid-cols-3 gap-3 text-center mb-8">
    <div className="bg-purple-50 py-3 rounded-lg shadow-sm">
      <p className="text-xs text-gray-500 uppercase">Payment</p>
      <p className="text-lg font-bold text-purple-700">₹181.34</p>
    </div>
    <div className="bg-yellow-50 py-3 rounded-lg shadow-sm">
      <p className="text-xs text-gray-500 uppercase">Pending</p>
      <p className="text-lg font-bold text-yellow-600">₹37.13</p>
    </div>
    <div className="bg-green-50 py-3 rounded-lg shadow-sm">
      <p className="text-xs text-gray-500 uppercase">Paid</p>
      <p className="text-lg font-bold text-green-700">₹234.20</p>
    </div>
  </div>

  {/* Semi Doughnut Chart */}
  <div className="flex justify-center items-center mt-auto">
    <div className="w-60 h-60">
      <Doughnut data={chartData} options={chartOptions} />
    </div>
  </div>
</div>

    </div>
  );
};

export default PayrollStack;
