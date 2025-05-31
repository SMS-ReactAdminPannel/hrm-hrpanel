import { useState, useRef, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

import { ChevronDown } from "lucide-react";

const chartData = [
  {
    department: "FinancialTeam",
    Value: 44,
    fill:"#93c5fd"
    
  },
  {
    department: "ProjectManager",
    Value: 23,
    fill:"#fda4af"
  },
  {
    department: "MarketingTeam",
    Value: 15,
     fill:"#6ee7b7"
  },
  {
    department: "ProductDesignTeam",
    Value: 22,
    fill:"#d8b4fe"
  },
  
];
const dateRanges = ["Weekly", "Monthly", "Yearly"];

const DashBoardCardBar = () => {
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
      case "Weekly":
        return chartData;
      case "Monthly":
        // You can return monthly data here
        return chartData;
      case "Yearly":
        // You can return yearly data here
        return chartData;
      default:
        return chartData;
    }
  };

  return (
    <div className="  w-full h-[200px] p-5 ">
      <div className="flex justify-between items-center ">
        <div className="">
          <h2 className="text-xl font-semibold text-[#006666]">
            Empolyee Performance
          </h2>
          <div className="flex space-x-4 text-xs mt-4">
            <div className="flex items-center space-x-1 text-blue-600">
              <span className="h-2 w-2 bg-[#93c5fd] rounded-full"></span>
              <span className="text-[#93c5fd]">FinancialTeam</span>
            </div>
            <div className="flex items-center space-x-1 text-rose-400">
              <span className="h-2 w-2 bg-[#aac3c4] rounded-full"></span>
              <span className="text-[#aac3c4] ">ProjectManager</span>
            </div>
            <div className="flex items-center space-x-1 text-blue-600">
              <span className="h-2 w-2 bg-[#ebb8ee] rounded-full"></span>
              <span className="text-[#eca9f0]">MarketingTeam</span>
            </div>
            <div className="flex items-center space-x-1 text-rose-400">
              <span className="h-2 w-2 bg-[#aac3c4] rounded-full"></span>
              <span className="text-[#aac3c4] ">ProductDesignTeam</span>
            </div>
          </div>
        </div>
        {/* Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center text-xs text-[#006666] border px-3 py-1.5 rounded-md bg-white hover:bg-gray-50"
          >
             {selectedRange}
            <ChevronDown className="w-4 h-4 ]" />
          </button>
          {isOpen && (
            <div className="absolute right-0 mt-2 bg-white border rounded-md shadow-lg z-10 min-w-[100px]">
              {dateRanges.map((range) => (
                <button
                  key={range}
                  onClick={() => {
                    setSelectedRange(range);
                    setIsOpen(false);
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

      <div className="-ml-10 mt-2 ">
        <ResponsiveContainer width="100%" height={260}>
          <BarChart
            data={getFilteredData()}  
            margin={{ top: 20, right: 30, left: 60, bottom: 5 }}
          >
            <Bar dataKey="Value" radius={[0, 0, 0, 0]} barSize={50}>
              {
                // custom colors for each bar
                getFilteredData().map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))
              }
            </Bar>
            <XAxis  dataKey="department" />
            <YAxis  />
            <Tooltip />
            
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashBoardCardBar;
