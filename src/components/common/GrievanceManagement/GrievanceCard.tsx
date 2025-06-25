import React from "react";
import type { Grievance } from "../../../pages/GrievanceManagement/GrievanceManagement";
import { FONTS } from "../../../constants/uiConstants";

type Props = {
  grievance: Grievance;
};

export const GrievanceCard: React.FC<Props> = ({ grievance }) => {
  return (
    <div className="bg-[#eff4f5] shadow rounded-md p-2 border-l-4 transition-all hover:shadow-lg cursor-pointer border-[#006666]">
      <div className="flex justify-between items-start">
        <h3 className="text-lg !text-black"
          style={{
            ...FONTS.header3
          }}>{grievance.title}</h3>
        
        <span
          className={`
            font-medium px-2 py-1 rounded-md ${
            grievance.status === "solved"
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }` }
        >
          {grievance.status}
        </span>
      </div>
     

      <h3 className="text-sm font-semibold !text-gray-800 mb-1" style={{
       ...FONTS.header3
      }}>Issue Description:</h3> 
<p className="!text-gray-700 mb-1 whitespace-pre-line">{grievance.description}</p>

      <div className=" text-sm !text-gray-500"
      style={{...FONTS.paragraph }}>
        <span className="font-medium !text-gray-500"   style={{...FONTS.paragraph }}>{grievance.employee}</span> — {grievance.date}
      </div>
    </div>
  );
};
