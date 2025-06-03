import React from "react";
import type { Grievance } from "../../../pages/GrievanceManagement/GrievanceManagement";
import { ArrowLeft } from "lucide-react";

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
    <div className="flex flex-col w-full h-full bg-[#fff8f7] p-6 rounded-xl">
      {/* Back button */}
      <button
        onClick={onClose}
        className="flex items-center text-[#006666] text-sm font-medium mb-6 hover:underline w-fit"
      >
        <ArrowLeft className="mr-2" size={18} />
        Back
      </button>

      {/* Title */}
      <h2 className="text-xl font-bold text-[#006666] mb-2">{grievance.title}</h2>

      {/* Status */}
      <span
        className={`text-sm font-medium px-2 py-0.5 rounded-full mb-4 inline-block w-fit ${
          grievance.status === "solved"
            ? "bg-green-100 text-green-800"
            : "bg-yellow-100 text-yellow-800"
        }`}
      >
        {grievance.status === "solved" ? "Solved" : "Unsolved"}
      </span>

      {/* Description */}
      <p className="text-gray-700 mb-6 whitespace-pre-line">{grievance.description}</p>

      {/* Details */}
      <div className="text-sm text-gray-600 space-y-1 mb-6">
        <p><strong>Employee:</strong> {grievance.employee}</p>
        <p><strong>Employee ID:</strong> {grievance.empid}</p>
        <p><strong>Mail ID:</strong> {grievance.mail}</p>
        <p><strong>Role:</strong> {grievance.role}</p>
        <p><strong>Department:</strong> {grievance.department}</p>
        <p><strong>Date:</strong> {grievance.date}</p>
      </div>

      {/* Mark as Solved Button */}
      {grievance.status === "unsolved" && (
        <button
          onClick={onMarkSolved}
          className="w-40 bg-[#006666] text-white py-2 rounded-lg hover:bg-[#004f4f] transition"
        >
          Mark as Solved
        </button>
      )}
    </div>
  );
};
