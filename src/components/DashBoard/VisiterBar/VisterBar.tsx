import { useState, useRef, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChevronDown } from "lucide-react";
import { FaChevronRight } from "react-icons/fa6";

const chartData = [
  {
    date: "Mon",
    Visited: 44,
  },
  {
    date: "Tue",
    Visited: 55,
  },
  {
    date: "Wes",
    Visited: 41,
  },
  {
    date: "Thr",
    Visited: 67,
  },
  {
    date: "Fri",
    Visited: 22,
  },
  {
    date: "Sat",
    Visited: 43,
  },
  {
    date: "Sun",
    Visited: 44,
  },
];

const dateRanges = ["Weekly", "Monthly", "Yearly"];
const VisterBar = () => {
  const [selectedRange, setSelectedRange] = useState("Weekly");
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

  const getFilteredData = () => {
    switch (selectedRange) {
      case "Weekly":
      case "Monthly":
      case "Yearly":
        return chartData;
      default:
        return chartData;
    }
  };

  return (
    <div className="w-full p-5 ">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-semibold text-[#006666]">
            User Visits by Day
          </h2>
        </div>

        {/* Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center text-xs text-text-[#006666] border px-3 py-1.5 rounded-md bg-white hover:bg-gray-50"
          >
            {selectedRange || "Select"}
            <ChevronDown className="w-4 h-4 ml-2" />
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

      {/* Horizontal Bar Chart */}
      <div className="w-full h-[300px] -">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={getFilteredData()} layout="vertical">
            <XAxis
              type="number"
              axisLine={false} // removes the axis line
              tickLine={false} // removes tick marks
              tick={false}
            />
            <YAxis
              dataKey="date"
              type="category"
              axisLine={false} // removes axis line
              tickLine={false}
            />
            <Tooltip />
            <Bar dataKey="Visited" barSize={10} fill="#93c5fd" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="border-t-2 gap-1 flex -mt-4 pt-2 justify-between ">
        <div className="flex-6 w-full h-full">
          <h2 className="font-semibold">Most Visited Day</h2>
          <p>Total 67 visits on Thursday</p>
        </div>
        <div className="flex-1  flex  ">
          <button className="w-full h-full flex items-center justify-center"><FaChevronRight /></button>
        </div>
      </div>
    </div>
  );
};

export default VisterBar;
