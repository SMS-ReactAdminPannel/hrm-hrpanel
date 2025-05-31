import { useState, useRef, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Title,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { ChevronDown } from "lucide-react";
import { FaChevronRight } from "react-icons/fa6";

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Title);

// Sample data sets
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

  const chartData = dataSets[selectedRange];
  const labels = chartData.map((item) => item.date);
  const values = chartData.map((item) => item.Visited);

  const maxVisit = Math.max(...values);
  const maxItem = chartData.find((item) => item.Visited === maxVisit);

  // Chart.js Data & Options
  const data = {
    labels,
    datasets: [
      {
        label: "Visits",
        data: values,
        backgroundColor: "#93c5fd",
        borderRadius: 10,
        barThickness: 20,
      },
    ],
  };

  const options = {
    indexAxis: "y" as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: { stepSize: 50 },
        grid: { display: false },
      },
      y: {
        grid: { display: false },
      },
    },
  };

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full p-5">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-semibold text-[#006666]">User Visits by Day</h2>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center text-xs text-[#006666] border px-3 py-1.5 rounded-md bg-white hover:bg-gray-50"
          >
            {selectedRange}
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
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-gradient-to-r hover:from-teal-50 hover:to-cyan-50 transition-all duration-200 ${
                    selectedRange === range ? "bg-gray-100 font-medium" : "text-gray-700"
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="w-full h-[340px]">
        <Bar data={data} options={options} />
      </div>

      <div className="border-t-2 gap-1 flex pt-2 justify-between">
        <div className="flex-6 w-full h-full">
          <h2 className="font-semibold text-[#006666]">
            Most Visited {selectedRange === "Weekly" ? "Day" : selectedRange === "Monthly" ? "Week" : "Month"}
          </h2>
          <p>Total {maxVisit} visits on {maxItem?.date}</p>
        </div>
        <div className="flex-1 flex">
          <button className="w-full h-full flex items-center text-[#006666] justify-center">
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VisterBar;
