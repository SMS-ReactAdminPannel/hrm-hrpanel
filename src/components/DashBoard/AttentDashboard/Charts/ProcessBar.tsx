import React from "react";
import ReactApexChart from "react-apexcharts";

interface ApexChartProps {
  value: number;
  color: string;
}

const ApexChart: React.FC<ApexChartProps> = ({ value, color }) => {
  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "bar",
      sparkline: { enabled: true },
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "30%",
        borderRadius: 4,
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val) => `${val}%`,
      style: {
        colors: [color],
        fontSize: "14px",
        fontWeight: 600,
      },
    },
    xaxis: {
      categories: [""],
      max: 100,
      labels: { show: false },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: { show: false },
    fill: { colors: [color] },
    grid: { show: false },
  };

  const series = [{ name: "Progress", data: [value] }];

  return (
    <div className="w-full">
      <ReactApexChart options={options} series={series} type="bar" height={40} />
    </div>
  );
};


export default ApexChart;
