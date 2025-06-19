import React from "react";
import type { Grievance } from "../../../pages/GrievanceManagement/GrievanceManagement";
import { X } from "lucide-react";
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
  <div className="relative flex p-2 rounded-lg mb-4">
    {/* Close Button */}
    <button
      onClick={onClose}
      className="absolute -left-4 top-3 flex items-center justify-center w-8 h-10 bg-blue-800 text-white rounded-l-full rounded-r-none"
    >
      <X size={18} className="ml-1" />
    </button>

    {/* Card Content */}
    <div className="px-6 py-4 flex flex-col w-full bg-[#fff8f7] rounded-md shadow-sm">
      {/* Status Badge */}
      <div className="flex justify-end w-full mb-3">
        <span
          className={`text-xs font-medium px-2.5 py-1 rounded-md ${
            grievance.status === "solved"
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {grievance.status.charAt(0).toUpperCase() + grievance.status.slice(1)}
        </span>
      </div>
    
      {/* Title */}
      <h2 
        className="text-md font-semibold text-gray-700 mb-3"
        style={{ fontSize: FONTS.header.fontSize }}
      >
        {grievance.title}
      </h2>

      {/* Description */}
      <div className="mb-4">
        <p className="text-xs font-medium text-gray-500 mb-1">DESCRIPTION</p>
        <p 
          className="text-gray-700 text-sm leading-snug whitespace-pre-line"
          style={{ fontSize: FONTS.paragraph.fontSize }}
        >
          {grievance.description}
        </p>
      </div>

      {/* Employee Details */}
      <div className="grid grid-cols-2 gap-2 text-sm mb-4">
        <p><span className="font-medium">Employee:</span> {grievance.employee}</p>
        <p><span className="font-medium">ID:</span> {grievance.empid}</p>
        <p><span className="font-medium">Email:</span> {grievance.mail}</p>
        <p><span className="font-medium">Role:</span> {grievance.role}</p>
        <p><span className="font-medium">Department:</span> {grievance.department}</p>
        <p><span className="font-medium">Date:</span> {grievance.date}</p>
      </div>

      {/* Action Button */}
      {grievance.status === "unsolved" && (
        <button
          onClick={onMarkSolved}
          className="w-full sm:w-40 bg-[#006666] text-white px-4 py-2 rounded-md hover:bg-[#004f4f] transition-colors"
        >
          Mark as Solved
        </button>
      )}
    </div>
  </div>
);
};
