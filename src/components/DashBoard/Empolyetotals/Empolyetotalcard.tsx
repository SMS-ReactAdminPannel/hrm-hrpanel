import React, { useState } from "react";

const total = 154;

const status = [
  { label: "Fulltime", count: 112, percent: 48, color: "bg-yellow-400", department: "HR" },
  { label: "Contract", count: 26, percent: 34, color: "bg-slate-500", department: "UI" },
  { label: "Probation", count: 12, percent: 22, color: "bg-red-500", department: "UX" },
  { label: "WFH", count: 4, percent: 10, color: "bg-pink-500", department: "HR" },
  { label: "Parttime", count: 9, percent: 23, color: "bg-green-800", department: "UI" },
  { label: "Internship", count: 21, percent: 30, color: "bg-orange-400", department: "UX" },
];

const departments = [ "All", "HR", "UI", "UX"];

const TotalEmploye: React.FC = () => {
  const [selectedDept, setSelectedDept] = useState("All");

  const filteredStatus =
    selectedDept === "All"
      ? status
      : status.filter((item) => item.department === selectedDept);

  return (
    <div className="p-6 rounded shadow  border w-full  mx-auto">
      <div className="flex justify-between items-center mb-4 border-b">
        <h2 className="text-xl font-bold  pb-2">Employee Status</h2>
        <select
          value={selectedDept}
          onChange={(e) => setSelectedDept(e.target.value)}
          className="text-sm px-3 py-1 border rounded"
        >
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <p className="text-lg font-bold mb-2">Total Employees: {total}</p>

        <div className="flex h-4 rounded overflow-hidden shadow-sm border mb-4">
          {filteredStatus.map((s, i) => (
            <div key={i} className={`${s.color}`} style={{ width: `${s.percent}%` }} />
          ))}
        </div>

        <div className="grid grid-cols-3 md:grid-cols-4 gap-4 border p-4 rounded text-sm">
          {filteredStatus.map((s, i) => (
            <div key={i} className="flex items-start space-x-2">
              <div className={`w-2 h-2 ${s.color} rounded-full mt-1`} />
              <div className="flex flex-col">
                <span>{s.label} ({s.percent}%)</span>
                <span className="font-bold text-2xl">{s.count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* <div className="border-t pt-4">
        <p className="font-semibold text-sm mb-1">Top Performer</p>
        <div className="flex items-center bg-orange-100 p-4 rounded">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo7WfE6wFfdpeFph92LdEFJFnula0ecIObiQ&s"
            alt="Top Performer"
            className="w-10 h-10 rounded-full mr-4"
          />
          <div className="flex-1">
            <p className="font-semibold">Daniel</p>
            <p className="text-sm text-gray-500">Software Developer</p>
          </div>
          <span className="text-orange-600 font-bold">Performance: 99%</span>
        </div>
      </div> */}

      <button className="mt-4 w-full bg-orange-200 text-black px-4 py-2 rounded hover:bg-gray-400">
        View All
      </button>
    </div>
  );
};

export default TotalEmploye;
