import React from "react";
import type { Grievance } from "../../../pages/GrievanceManagement/GrievanceManagement";
import { X , ChevronLeft, User, Mail, Calendar, Building, UserCheck} from "lucide-react";
import { FONTS } from "../../../constants/uiConstants";
import {motion} from "framer-motion";

type Props = {
  grievance: Grievance;
  onBack: () => void;
  onStatusChange: (id: number, status: "solved" | "unsolved") => void;
};

export const GrievanceDetailCard: React.FC<Props> = ({
  grievance,
  onBack, onStatusChange
}) => {

return (
  <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6"
    >
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="border-b px-6 py-4 bg-[#5e59a9]/20">
          <button
            onClick={onBack}
            className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Back 
          </button>

          <div className="flex flex-col sm:flex-row justify-between mt-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{grievance.title}</h1>
              <p className="text-sm text-gray-500 mt-1">
                ID: {grievance.id} • Submitted: {new Date(grievance.date).toLocaleDateString()}
              </p>
            </div>

            <div className="flex items-center gap-3 mt-4 sm:mt-0">
              <span
                className={`px-4 py-1 mt-5 rounded-full text-sm font-medium ${
                  grievance.status === "solved"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {grievance.status.toUpperCase()}
              </span>
              <button
                onClick={() =>
                  onStatusChange(
                    grievance.id,
                    grievance.status === "solved" ? "unsolved" : "solved"
                  )
                }
                className={`px-4 py-2 mt-5 rounded-md text-sm font-semibold transition-colors ${
                  grievance.status === "solved"
                    ? "bg-[#3a357f] text-white hover:bg-[#857fd1]"
                    : "bg-green-600 text-white hover:bg-green-700"
                }`}
              >
                Mark as {grievance.status === "solved" ? "Unsolved" : "Solved"}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6">
          {/* Description */}
          <div className="lg:col-span-2">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Description</h2>
            <div className="bg-gray-50 p-4 rounded-lg text-gray-700 leading-relaxed shadow">
              {grievance.description}
            </div>
          </div>

          {/* Employee Details & Actions */}
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-4 shadow">
              <h3 className="text-md font-semibold text-gray-800 mb-3">Employee Info</h3>
              <div className="space-y-3">
                {[
                  { label: "Name", value: grievance.employee, icon: <User /> },
                  { label: "Employee ID", value: grievance.empid, icon: <UserCheck /> },
                  { label: "Email", value: grievance.mail, icon: <Mail /> },
                  { label: "Department", value: grievance.department, icon: <Building /> },
                  { label: "Role", value: grievance.role, icon: <UserCheck /> },
                ].map(({ label, value, icon }, i) => (
                  <div className="flex items-start gap-3" key={i}>
                    <div className="text-gray-500 mt-1">{icon}</div>
                    <div>
                      <p className="text-xs text-gray-500">{label}</p>
                      <p className="text-sm font-medium text-gray-800">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 shadow">
              <h3 className="text-md font-semibold text-gray-800 mb-3">Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
                  Add Comment
                </button>
                <button className="w-full bg-gray-100 text-gray-700 py-2 rounded-md hover:bg-gray-200 transition">
                  Assign to Team
                </button>
                <button className="w-full bg-gray-100 text-gray-700 py-2 rounded-md hover:bg-gray-200 transition">
                  Export Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default GrievanceDetailCard;
