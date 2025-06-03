import React from "react";
import type { Grievance } from "../../../pages/GrievanceManagement/GrievanceManagement";

type Props = {
  grievance: Grievance;
};

export const GrievanceCard: React.FC<Props> = ({ grievance }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-2 border-l-4 transition-all hover:shadow-lg cursor-pointer border-[#006666]">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold text-[#006666]">{grievance.title}</h3>
        <span
          className={`text-xs font-medium px-2 py-1 rounded-full ${
            grievance.status === "solved"
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {grievance.status}
        </span>
      </div>
     
<h3 className="text-sm font-semibold text-gray-800 mb-1">Issue Description:</h3>
<p className="text-gray-700 mb-6 whitespace-pre-line">{grievance.description}</p>

      <div className="mt-3 text-sm text-gray-500">
        <span className="font-medium">{grievance.employee}</span> — {grievance.date}
      </div>
    </div>
  );
};
