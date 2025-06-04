import React from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register required components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const chartData = [
  { date: "Mon", Present: 44, Absent: 13 },
  { date: "Tue", Present: 55, Absent: 23 },
  { date: "Wed", Present: 41, Absent: 20 },
  { date: "Thu", Present: 67, Absent: 8 },
  { date: "Fri", Present: 22, Absent: 13 },
  { date: "Sat", Present: 43, Absent: 27 },
  { date: "Sun", Present: 44, Absent: 13 },
];

const data = {
  labels: chartData.map((item) => item.date),
  datasets: [
    {
      label: "Present",
      data: chartData.map((item) => item.Present),
      backgroundColor: "#006666",
      stack: "attendance",
    //   barThickness: 10,
    },
    {
      label: "Absent",
      data: chartData.map((item) => item.Absent),
      backgroundColor: "#019191",
      stack: "attendance",
    //   barThickness: 10,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    tooltip: {
      enabled: true, // Disable tooltip
    },
    legend: {
      display: false, // Remove label/legend
    },
  },
  scales: {
    x: {
      stacked: true,
      grid: {
        display: false, // Remove grid lines
        drawBorder: false,
      },
      ticks: {
        display: true, // Optional: hide X-axis labels
      },
    },
    y: {
      stacked: true,
      beginAtZero: true,
      grid: {
        display: false, // Remove grid lines
        drawBorder: false,
      },
      ticks: {
        display: true, // Optional: hide Y-axis labels
      },
    },
  },
};


const StackBar: React.FC = () => {
  return (
    <div className="w-full h-[250px]">
      <Bar data={data} options={options} />
    </div>
  );
};

export default StackBar;
