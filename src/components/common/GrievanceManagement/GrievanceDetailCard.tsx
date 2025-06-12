import React from "react";
import type { Grievance } from "../../../pages/GrievanceManagement/GrievanceManagement";
import { ArrowLeft } from "lucide-react";
import { FONTS } from "../../../constants/uiConstants";

type Props = {
  grievance: Grievance;
  onClose: () => void;
  onMarkSolved: () => void;
};

export const GrievanceDetailCard: React.FC<Props> = ({
  grievance,
  onClose,
  onMarkSolved,
}) => {
  return (
    <div className="px-8 py-8 flex flex-col w-full h-full bg-[#fff8f7] p-6 rounded-md ">
      
      <button
        onClick={onClose}
        className="flex items-center  text-green text-sm 
        font-medium mb-6 hover:underline w-fit  rounded  "
        style={{fontSize:FONTS.header3.fontSize}}
      >
        <ArrowLeft className="mr-2" size={25} />
       
      </button>

    
      <h2 className="text-xl font-bold text-[#006666] mb-2"
      style={{fontSize:FONTS.header.fontSize}}>{grievance.title}</h2>

    
      <span
        className={`text-sm font-medium px-3 py-1 rounded-md mb-4 w-fit ${
          grievance.status === "solved"
            ? "bg-green-100 text-green-800"
            : "bg-yellow-100 text-yellow-800"
        }`}
      >
        {grievance.status === "solved" ? "Solved" : "Unsolved"}
      </span>


<h3 className="text-sm font-semibold text-gray-800 mb-2"
style={{fontSize:FONTS.header3.fontSize}}>Issue Description:</h3>
<p className="text-gray-700 mb-3 whitespace-pre-line"
style={{fontSize:FONTS.paragraph.fontSize}}>{grievance.description}</p>


      
      <div className="text-sm text-gray-600 space-y-1 mb-4 "
        style={{ fontSize: FONTS.paragraph.fontSize }}>
        <p><strong>Employee:</strong> {grievance.employee}</p>
        <p><strong>Employee ID:</strong> {grievance.empid}</p>
        <p><strong>Mail ID:</strong> {grievance.mail}</p>
        <p><strong>Role:</strong> {grievance.role}</p>
        <p><strong>Department:</strong> {grievance.department}</p>
        <p><strong>Date:</strong> {grievance.date}</p>
      </div>

      {grievance.status === "unsolved" && (
        <button
          onClick={onMarkSolved}
          className="w-40 bg-[#006666] text-white px-4 py-2 rounded-md hover:bg-[#004f4f] transition"
        >
          Mark as Solved
        </button>
      )}
    </div>
  );
};
