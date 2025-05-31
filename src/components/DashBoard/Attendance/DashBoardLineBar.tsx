import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import React, { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
);

type dProps = {
  dataPoints: number[];
};
const dateRanges = [
  "FinancialTeam",
  "ProjectManager",
  "MarketingTeam",
  "ProductDesignTeam",
];

export const ChartCard: React.FC<dProps> = ({ dataPoints }) => {
  const [selectedRange, setSelectedRange] = useState("");

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

  // Function to get filtered data based on selected range (you can customize this logic)
  const getFilteredData = () => {
    // Add your filtering logic here based on selectedRange
    // For now, returning the same data, but you can modify this based on your needs
    switch (selectedRange) {
      case "FinancialTeam":
        return dataPoints;
      case "ProjectManager":
        return dataPoints;
      case "MarketingTeam":
        return dataPoints;
      case "ProductDesignTeam":
        return dataPoints;
      default:
        return dataPoints;
    }
  };
  const filteredData = getFilteredData();
  const data = {
    labels: filteredData.map((_, i) => i + 1),
    datasets: [
      {
        data: filteredData,
        fill: true,
        tension: 0.5,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true },
      tooltip: { enabled: true },
    },
    scales: {
      x: {
        display: true,
        grid: { display: false },
      },
      y: {
        display: true,
        grid: { display: false },
      },
    },
  };

  return (
    <div className=" grid gap-1 p-3">
      <div className="flex justify-between mb-3 ">
        <div className="text-xl font-semibold text-[#006666]">
            <h1>Attendance</h1>
        </div>
        <div className="relative " ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center text-xs text-gray-700 px-3 py-1.5 rounded-md bg-white hover:bg-gray-50"
          >
            {selectedRange}
            <ChevronDown className="w-4 h-4 text-[#006666]" />
          </button>
          {isOpen && (
            <div className="absolute right-0 mt-2 bg-white rounded-md shadow-lg z-10 min-w-[100px]">
              {dateRanges.map((range) => (
                <button
                  key={range}
                  onClick={() => {
                    setSelectedRange(range);
                    setIsOpen(true);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                    selectedRange === range
                      ? "text- bg-gray-50 font-medium"
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
      <div className=" w-full h-[300px] min-h-[200px] ">
        <Line data={data} options={options} />
        
      </div>
    </div>
  );
};
