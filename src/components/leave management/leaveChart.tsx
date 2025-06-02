import React, { useRef, useEffect } from 'react';
import { Chart, DoughnutController, ArcElement, Tooltip } from 'chart.js';

Chart.register(DoughnutController, ArcElement, Tooltip);

interface DoughnutChartProps {
  percentage: number;
  filledColor?: string;
  emptyColor?: string;
  cutout?: string;
  size?: string;
  content?: string;
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({
  percentage = 50,
  filledColor = 'rgba(63, 81, 181, 0.7)',
  emptyColor = 'rgba(0, 0, 0, 0)',
  cutout = '65%',
  size = 'h-56 w-56', // Adjusted to match your height
  content = ""
}) => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  const chartData = {
    labels: ["Filled", "Empty"],
    datasets: [{
      label: "Progress",
      data: [percentage, 100 - percentage],
      backgroundColor: [filledColor, emptyColor],
      borderWidth: 0
    }]
  };

  useEffect(() => {
    if (chartRef.current) {
      const chart = new Chart(chartRef.current, {
        type: 'doughnut',
        data: chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: { enabled: false }
          },
          cutout: cutout,
          elements: {
            arc: { borderWidth: 0 }
          }
        }
      });

      return () => chart.destroy();
    }
  }, [percentage, filledColor, emptyColor, cutout]);

  return (
    <div className="flex flex-col items-center dark:bg-transparent justify-center space-y-2">
      <div className={`relative h-38 ${size}`}>
        <canvas ref={chartRef} />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold">{percentage}%</span>
        </div>
      </div>
      {content && (
        <div className="font-bold text-2xl text-center w-full">
          {content}
        </div>
      )}
    </div>
  );
};

export default DoughnutChart;