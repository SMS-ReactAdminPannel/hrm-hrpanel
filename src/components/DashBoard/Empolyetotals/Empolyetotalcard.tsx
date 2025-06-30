import React, { useState } from "react";
import { FONTS } from "../../../constants/uiConstants";

const total = 154;

const status = [
  {
    label: "Fulltime",
    count: 112,
    percent: 48,
    color: "bg-yellow-400",
    department: "HR",
  },
  {
    label: "Contract",
    count: 26,
    percent: 34,
    color: "bg-slate-500",
    department: "UI",
  },
  {
    label: "Probation",
    count: 12,
    percent: 22,
    color: "bg-red-500",
    department: "UX",
  },
  {
    label: "WFH",
    count: 4,
    percent: 10,
    color: "bg-pink-500",
    department: "HR",
  },
  {
    label: "Parttime",
    count: 9,
    percent: 23,
    color: "bg-green-800",
    department: "UI",
  },
  {
    label: "Internship",
    count: 21,
    percent: 30,
    color: "bg-orange-400",
    department: "UX",
  },
];

// const departments = ["All", "HR", "UI", "UX"];

const TotalEmploye: React.FC = () => {
  const [selectedDept, setSelectedDept] = useState("All");
const [showDeptDropdown, setShowDeptDropdown] = useState(false);

const departments = ["All", "HR", "Tech", "Sales", "Finance"]; // Replace with your dynamic list

  const filteredStatus =
    selectedDept === "All"
      ? status
      : status.filter((item) => item.department === selectedDept);

 return (
  <div className="relative p-2 w-full h-full m-1">
    {/* Custom Dropdown – fixed to top right */}
    <div className="absolute top-2 right-2 z-10 text-xs">
  <button
    onClick={() => setShowDeptDropdown(!showDeptDropdown)}
    className="flex items-center text-sm bg-transparent px-2 py-1 text-gray-800 outline-none"
  >
    <span className="mr-0.5">{selectedDept}</span>
    <svg
      className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${showDeptDropdown ? "rotate-180" : ""}`}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.08 1.04l-4.25 4.25a.75.75 0 0 1-1.08 0L5.21 8.27a.75.75 0 0 1 .02-1.06z" />
    </svg>
  </button>

  {showDeptDropdown && (
    <ul className="absolute right-0 mt-1 w-40 bg-white border border-gray-300 rounded shadow max-h-60 overflow-y-auto z-20">
      {departments.map((dept) => (
        <li
          key={dept}
          onClick={() => {
            setSelectedDept(dept);
            setShowDeptDropdown(false);
          }}
          className="px-3 py-1 hover:bg-blue-200 cursor-pointer text-sm"
        >
          {dept}
        </li>
      ))}
    </ul>
  )}
</div>


    {/* Main Card Content */}
    <div>
  <p
    className="text-lg font-semibold mb-1 !text-gray-700"
    style={{ ...FONTS.cardheader }}
  >
    Total Employees: {total}
  </p>

  <div className="flex h-4 rounded overflow-hidden shadow-sm border  mb-4 mt-8">
    {filteredStatus.map((s, i) => (
      <div key={i} className={`${s.color}`} style={{ width: `${s.percent}%` }} />
    ))}
  </div>

  {/* Two-column layout */}
  <div className="grid grid-cols-2 gap-4 text-sm md:text-xs  border p-8 rounded">
    {filteredStatus.map((s, i) => (
      <div key={i} className="flex items-start space-x-2 md:space-x-1">
        <div className={`w-2 h-2 ${s.color} rounded-full mt-1`} />
        <div className="flex flex-col">
          <span>
            {s.label} ({s.percent}%)
          </span>
          <span className="font-bold text-xl">{s.count}</span>
        </div>
      </div>
    ))}
  </div>
</div>

    <div className="bg-gray-200 rounded-lg mt-5" style={{ ...FONTS.subParagraph }}>
      <button
        className="p-1 w-full text-center text-base font-medium !text-gray-700 hover:underline cursor-pointer"
        style={{ ...FONTS.subParagraph }}
      >
        View All
      </button>
    </div>
  </div>
);

};

export default TotalEmploye;
