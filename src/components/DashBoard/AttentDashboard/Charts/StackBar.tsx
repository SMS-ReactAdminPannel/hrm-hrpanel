import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// Define props
interface StackBarProps {
  month: string;
  department: string;
}

// Define data type
interface AttendanceDay {
  date: string;
  Present: number;
  Absent: number;
}

const StackBar: React.FC<StackBarProps> = ({ month, department }) => {
  const [chartData, setChartData] = useState<AttendanceDay[]>([]);

  // Simulated fetch or API call
  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        // Simulate API response with filtered data
        const simulatedData: AttendanceDay[] = [
          { date: "Mon", Present: 45, Absent: 5 },
          { date: "Tue", Present: 50, Absent: 3 },
          { date: "Wed", Present: 40, Absent: 8 },
          { date: "Thu", Present: 60, Absent: 2 },
          { date: "Fri", Present: 35, Absent: 10 },
          { date: "Sat", Present: 50, Absent: 4 },
          { date: "Sun", Present: 38, Absent: 7 },
        ];

        // TODO: Replace with real API call if available
        /*
        const res = await fetch(
          `/api/attendance?month=${month}&department=${department}`
        );
        const data = await res.json();
        setChartData(data);
        */

        setChartData(simulatedData);
      } catch (error) {
        console.error("Failed to fetch attendance data:", error);
      }
    };

    fetchAttendanceData();
  }, [month, department]);

  const data = {
    labels: chartData.map((item) => item.date),
    datasets: [
      {
        label: "Present",
        data: chartData.map((item) => item.Present),
        backgroundColor: "#006666",
        stack: "attendance",
      },
      {
        label: "Absent",
        data: chartData.map((item) => item.Absent),
        backgroundColor: "#019191",
        stack: "attendance",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        enabled: true,
      },
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false,
          drawBorder: false,
        },
      },
      y: {
        stacked: true,
        beginAtZero: true,
        grid: {
          display: false,
          drawBorder: false,
        },
      },
    },
  };

  return (
    <div className="w-full h-[250px]">
      <Bar data={data} options={options} />
    </div>
  );
};

export default StackBar;
