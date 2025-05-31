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

const dataSets = {
  Weekly: [
    { date: "Mon", Visited: 44 },
    { date: "Tue", Visited: 55 },
    { date: "Wed", Visited: 41 },
    { date: "Thu", Visited: 67 },
    { date: "Fri", Visited: 22 },
    { date: "Sat", Visited: 43 },
    { date: "Sun", Visited: 44 },
  ],
  Monthly: [
    { date: "Week 1", Visited: 180 },
    { date: "Week 2", Visited: 210 },
    { date: "Week 3", Visited: 175 },
    { date: "Week 4", Visited: 220 },
  ],
  Yearly: [
    { date: "Jan", Visited: 850 },
    { date: "Feb", Visited: 900 },
    { date: "Mar", Visited: 920 },
    { date: "Apr", Visited: 880 },
    { date: "May", Visited: 950 },
    { date: "Jun", Visited: 970 },
    { date: "Jul", Visited: 890 },
    { date: "Aug", Visited: 930 },
    { date: "Sep", Visited: 910 },
    { date: "Oct", Visited: 960 },
    { date: "Nov", Visited: 940 },
    { date: "Dec", Visited: 970 },
  ],
};

const dateRanges = ["Weekly", "Monthly", "Yearly"];

const VisterBar = () => {
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

  const chartData = dataSets[selectedRange];

  // Find most visited day/week/month for summary
  const maxVisit = Math.max(...chartData.map((item) => item.Visited));
  const maxItem = chartData.find((item) => item.Visited === maxVisit);

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
            className="flex items-center text-xs text-[#006666] border px-3 py-1.5 rounded-md bg-white hover:bg-gray-50"
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
                    setSelectedRange(range as "Weekly" | "Monthly" | "Yearly");
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
      <div className="w-full h-[340px] -ml-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="vertical" >
            <XAxis
              type="number"
              axisLine={false}
              tickLine={false}
              tick={false}
            />
            <YAxis
              dataKey="date"
              type="category"
              axisLine={false}
              tickLine={false}
              width={80}
            />
            <Tooltip />
            <Bar dataKey="Visited" barSize={14} fill="#93c5fd" radius={[0, 10, 10, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="border-t-2 gap-1 flex  pt-2 justify-between ">
        <div className="flex-6 w-full h-full">
          <h2 className="font-semibold">Most Visited {selectedRange === "Weekly" ? "Day" : selectedRange === "Monthly" ? "Week" : "Month"}</h2>
          <p>
            Total {maxVisit} visits on {maxItem?.date}
          </p>
        </div>
        <div className="flex-1 flex">
          <button className="w-full h-full flex items-center justify-center">
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VisterBar;
