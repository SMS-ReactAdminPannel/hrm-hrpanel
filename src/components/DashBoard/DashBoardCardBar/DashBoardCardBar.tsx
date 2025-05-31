import React, { useState, useRef, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { ChevronDown } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Different data for each range
const dataSets = {
  Weekly: [
    { department: "FinancialTeam", Value: 55, fill: "#4f46e5" },
    { department: "ProjectManager", Value: 35, fill: "#ec4899" },
    { department: "Customer Support", Value: 28, fill: "#22c55e" },
    { department: "ProductDesignTeam", Value: 18, fill: "#fbbf24" },
    { department: "Human Resources", Value: 90, fill: "#94e3e3" }
  ],
  Monthly: [
    { department: "FinancialTeam", Value: 230, fill: "#4f46e5" },
    { department: "ProjectManager", Value: 140, fill: "#ec4899" },
    { department: "MarketingTeamt", Value: 105, fill: "#22c55e" },
    { department: "ProductDesignTeam", Value: 90, fill: "#fbbf24" },
    { department: "Human Resources", Value: 90, fill: "#94e3e3" }
  ],
  Yearly: [
    { department: "FinancialTeam", Value: 2700, fill: "#4f46e5" },
    { department: "ProjectManager", Value: 1700, fill: "#ec4899" },
    { department: "Customer Support", Value: 1300, fill: "#22c55e" },
    { department: "ProductDesignTeam", Value: 1100, fill: "#fbbf24" },
    { department: "Human Resources", Value: 90, fill: "#94e3e3" }
  ],
};

const dateRanges = ["Weekly", "Monthly", "Yearly"];

const DashBoardCardBar: React.FC = () => {
  const [selectedRange, setSelectedRange] = useState<"Weekly" | "Monthly" | "Yearly">("Weekly");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Get data based on selected range
  const filteredData = dataSets[selectedRange];

  const data = {
    labels: filteredData.map((d) => d.department),
    datasets: [
      {
        label: "Employee Performance",
        data: filteredData.map((d) => d.Value),
        backgroundColor: filteredData.map((d) => d.fill),
        borderRadius: 0,
        barPercentage: 0.5,
        categoryPercentage: 0.7,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
    hover: {
      mode: undefined,
    },
    interaction: {
      mode: undefined,
      intersect: false,
    },
  };

  return (
    <div className="w-full h-[180px] p-5">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-semibold text-[#006666]">Departments</h2>
          <div className="flex space-x-4 text-xs mt-4">
            {filteredData.map(({ department, fill }) => (
              <div
                key={department}
                className="flex items-center space-x-1"
                style={{ color: fill }}
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: fill }}
                ></span>
                <span>{department}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center text-xs text-[#006666] border px-3 py-1.5 rounded-md bg-white hover:bg-gray-50"
          >
            {selectedRange}
            <ChevronDown className="w-4 h-4" />
          </button>
          {isOpen && (
            <div className="absolute right-0 mt-2 bg-white border rounded-md shadow-lg z-10 min-w-[100px]">
              {dateRanges.map((range) => (
                <button
                  key={range}
                  onClick={() => {
                    setSelectedRange(range as "Weekly" | "Monthly" | "Yearly");
                    setIsOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                    selectedRange === range
                      ? "font-medium bg-gray-100"
                      : "text-gray-700"
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bar Chart */}
      <div className="h-[220px] w-full">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default DashBoardCardBar;
