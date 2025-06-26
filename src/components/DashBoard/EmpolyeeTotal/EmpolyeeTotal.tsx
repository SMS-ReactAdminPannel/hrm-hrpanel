import { ChartCard } from "../../../components/DashBoard/LineBar/EmpolyeeTotalLine";
import React from "react";
import { FONTS } from "../../../constants/uiConstants";

type DashboardCardProps = {
  title: string;
  desc:string;
  value: number;
  perColor: string;
  borderColor: string;
  dataPoints: number[];
};

export const Empolyeetotal: React.FC<DashboardCardProps> = ({
  title,
  value,
  desc,
  perColor,
  borderColor,
  
  dataPoints,
}) => {
  return (
    <div className="rounded-xl shadow-md p-3 w-full h-full border bg-gray-500 bg-clip-padding backdrop-filter  backdrop-blur bg-opacity-10 backdrop-saturate-100 backdrop-contrast-100 overflow-hidden "> 
       <div className="flex-1 flex-cols ">
        <div className="flex flex-col justify-center  grow flex-2 ">
          <h3 className="text-white font-semibold mb-2"
            style={{...FONTS.header}}> {title}</h3>
          {/* <p className="text-sm text-black">{desc}</p> */}
          <span className="text-4xl font-semibold  " style={{ color: perColor }}>
            {value}
          </span>   
          
        </div>

      {/* Chart */}
      <div className=" flex-4 mt-3 ">
        <ChartCard
          dataPoints={dataPoints}
          borderColor={borderColor}
          backgroundColor={`${borderColor.replace("0.8", "0.1")}`}
        />
      </div>
       </div>
    </div>
  );
};

export default Empolyeetotal;
