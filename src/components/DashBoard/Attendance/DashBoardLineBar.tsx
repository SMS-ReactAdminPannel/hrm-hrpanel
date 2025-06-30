import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  Title,
} from "chart.js";
import { Line } from "react-chartjs-2";
import React, { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { FONTS } from "../../../constants/uiConstants";

// Chart.js registration
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  Title
);

// Props
type dProps = {
  dataPoints: {
    FinancialTeam: number[];
    ProjectManager: number[];
    MarketingTeam: number[];
    ProductDesignTeam: number[];
  };
};

// Dropdown options
const dateRanges = [
  "FinancialTeam",
  "ProjectManager",
  "MarketingTeam",
  "ProductDesignTeam",
];

export const ChartCard: React.FC<dProps> = ({ dataPoints }) => {
  const [selectedRange, setSelectedRange] = useState("FinancialTeam");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
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

  // Get selected dataset
  const filteredData = dataPoints[selectedRange as keyof typeof dataPoints];

  // Line chart config
  const data = {
    labels: filteredData.map((_, i) => `Day ${i + 1}`),
    datasets: [
      {
        label: selectedRange,
        data: filteredData,
        borderColor: "#006666",
        backgroundColor: "#71C0BB",
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
     hover: {
    mode: undefined, 
  },    
  interaction: {
    mode: undefined, // ✅ use undefined instead of null
    intersect: false,
  },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "Days",
        },
        grid: { display: false },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: "Value",
        },
        grid: { display: false },
      },
    },
  };

  return (
    <div className="grid gap-1 p-2 ">
      <div className="flex justify-between mb-3 items-center">
        <h1 className="text-xl font-semibold text-[#006666]" style={{...FONTS.header}}>Attendance</h1>

        {/* Dropdown */}
        <div className="relative pt-3" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center text-xs text-[#006666] border px-3 py-1.5 rounded-md bg-white hover:bg-[]"
          >
            {selectedRange}
            <ChevronDown className="w-4 h-4 ml-2 text-[#006666]" />
          </button>
          {isOpen && (
            <div className="absolute right-0 mt-2 bg-white border rounded-md shadow-lg z-10 min-w-[140px]">
              {dateRanges.map((range) => (
                <button
                  key={range}
                  onClick={() => {
                    setSelectedRange(range);
                    setIsOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-gradient-to-r hover:from-teal-50 hover:to-cyan-50 transition-all duration-200  ${
                    selectedRange === range
                      ? "bg-gray-100 font-medium"
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

      {/* Chart */}
      <div className="w-full h-[330px]">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};
