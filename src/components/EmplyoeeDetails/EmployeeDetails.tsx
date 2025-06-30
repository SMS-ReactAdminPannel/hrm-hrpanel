import React from "react";
import { MdKeyboardBackspace, MdTimer } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import { PiBowlSteamFill } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import { FaCalendarAlt } from "react-icons/fa";
import mainlayout from "../../assets/mainLayout.jpg";
import { AttendanceCalendar } from "../../components/EmplyoeeDetails/AttendanceCalender";

interface EmployeeDetailsProps {
  employeeId?: string;
  onBack: () => void;
}

export const EmployeeDetails: React.FC<EmployeeDetailsProps> = ({ employeeId, onBack }) => {
  const employeeData = [
    {
      ID: "EMP001",
      Name: "Alice Johnson",
      Designation: "Manager",
      Status: "Present",
      CheckIn: "09:00 AM",
      CheckOut: "05:00 PM",
    },
    {
      ID: "EMP002",
      Name: "Bob Smith",
      Designation: "Developer",
      Status: "Absent",
      CheckIn: "-",
      CheckOut: "-",
    },
  ];

  const employee = employeeData.find((emp) => emp.ID === employeeId);

  if (!employee) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-6">
        <div className="p-8 rounded-xl shadow-lg max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Employee Not Found</h2>
          <button
            onClick={onBack}
            className="px-6 py-2 bg-[#006666] text-white rounded-lg hover:bg-[#005555] transition-colors flex items-center justify-center gap-2 w-full"
          >
            <MdKeyboardBackspace size={20} />
            <span>Return to Attendance</span>
          </button>
        </div>
      </div>
    );
  }

  const employeeAttendanceData = {
    daysPresent: [1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 15, 16, 17, 18, 19, 20, 22, 23, 24, 25, 26, 27, 29, 30, 31],
  };

  const totalDays = 31;
  const presentDays = employeeAttendanceData.daysPresent.length;
  const absentDays = totalDays - presentDays - 5; // 5 Sundays
  const attendancePercentage = Math.round((presentDays / (totalDays - 5)) * 96);

  return (
    <div className="space-y-6 min-h-screen p-6">
      {/* Top Nav */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#006666] hover:text-[#005555] transition-colors"
        >
          <MdKeyboardBackspace size={24} />
          <span className="font-medium">Back to Attendance</span>
        </button>
        <div className="text-sm text-gray-500">
          <span className="font-medium">Today:</span>{" "}
          {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
        </div>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-xl overflow-hidden">
        <div className="bg-[#5e59a9]/60 p-6 text-white">
          <div className="flex items-center gap-4">
            <div className="h-20 w-20 rounded-full border-4 border-white overflow-hidden">
              <img src={mainlayout || "/placeholder.svg"} alt="Profile" className="h-full w-full object-cover" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{employee.Name}</h1>
              <p className="text-teal-100">{employee.Designation}</p>
            </div>
          </div>
        </div>

        <div className="p-6 grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Employee ID</p>
            <p className="font-medium">{employee.ID}</p>
          </div>
          <div>
            <p className="text-gray-500">Status</p>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                employee.Status === "Present" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}
            >
              {employee.Status}
            </span>
          </div>
          <div>
            <p className="text-gray-500">Check In</p>
            <p className="font-medium">{employee.CheckIn}</p>
          </div>
          <div>
            <p className="text-gray-500">Check Out</p>
            <p className="font-medium">{employee.CheckOut}</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* ...Your Stats Cards here (unchanged)... */}
      </div>

      {/* Attendance Summary */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-[#006666]" />
            <h3 className="text-xl font-semibold text-gray-800">Monthly Attendance - December 2025</h3>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-sm text-gray-600">Present: {presentDays}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-sm text-gray-600">Absent: {absentDays}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-300"></div>
              <span className="text-sm text-gray-600">Rest Days: 5</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">Attendance Rate</span>
            <span className="text-sm font-medium text-gray-700">{attendancePercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-[#5e59a9]/60 h-2.5 rounded-full" style={{ width: `${attendancePercentage}%` }}></div>
          </div>
        </div>

        {/* NEW: Calendar Component */}
        <AttendanceCalendar
                 year={2025}
            month={12}
            attendanceDays={employeeAttendanceData.daysPresent} // 👈 this is fine if your data uses daysPresent
            />

        {/* Legend */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-gray-700">Present</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-gray-700">Absent</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-300"></div>
              <span className="text-gray-700">Rest Day</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
