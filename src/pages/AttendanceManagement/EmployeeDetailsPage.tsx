import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MdKeyboardBackspace, MdTimer } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import { PiBowlSteamFill } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";


const EmployeeDetails: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Employee data passed via router state
  const employee = location.state?.employee;

  if (!employee) {
    return (
      <div className="p-6 text-center">
        <p>No employee selected.</p>
        <button onClick={() => navigate(-1)} className="mt-4 underline text-blue-600">
          Go Back
        </button>
      </div>
    );
  }
  const employeeAttendanceData = {
    daysPresent: [1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 15, 16, 17, 18, 19, 20, 22, 23, 24, 25, 26, 27, 29, 30,31],
    profilePic: `/placeholder.svg?height=40&width=40`,
  }

  const currentYear = 2025
  const currentMonth = 11
  const daysInMonth = 31
  const getWeekday = (year: number, month: number, day: number) => {
  return new Date(year, month, day).toLocaleDateString("en-US", {
    weekday: "short",
  });
};
  const days = Array.from({ length: daysInMonth }, (_, i) => {
    const dayNum = i + 1
    return {
      day: dayNum,
      weekday: getWeekday(currentYear, currentMonth, dayNum),
    }
  })


  return (
    <div className="p-6 space-y-6 min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-cyan-100">
      <div className="justify-end">
        <button onClick={() => navigate(-1)} className="mb-4 text-gray-500 hover:text-red-500">
          <MdKeyboardBackspace size={28} />
        </button>
      </div>

      <div>
        <p className="font-bold">Employee Attendance</p>
      </div>

      <div className="flex gap-6 mt-4">
        <InfoCard title="Total Completed project" value="2" icon={<IoSettingsSharp className="w-10 h-10 text-blue-600" />} />
        <InfoCard title="Total Worked Duration" value="216Hrs:40mins" icon={<MdTimer className="w-10 h-10 text-green-600" />} />
        <InfoCard title="Total Break Time" value="24Hrs" icon={<PiBowlSteamFill className="w-10 h-10 text-yellow-600" />} />
        <InfoCard title="Total Leave" value="4" icon={<CgProfile className="w-10 h-10 text-red-600" />} />
      </div>
      {/* Monthly Timesheet */}
<div className="bg-white/70 backdrop-blur-md rounded-xl shadow-xl border border-white/20 overflow-hidden">
  <div className="p-6 border-b border-white/30">
    <h3 className="text-xl font-semibold text-slate-800">Monthly Timesheet - December 2025</h3>
  </div>

  <div className="overflow-x-auto scrollbar-hide max-h-[600px] overflow-y-auto">
    <table className="min-w-full border-collapse text-sm">
      <thead className="bg-[#006666] text-white sticky top-0 z-20">
        <tr>
          <th className="border border-gray-300 px-4 py-3 text-left min-w-[200px] sticky left-0 bg-[#006666] z-30 shadow-lg">
            Employee
          </th>
          {days.map(({ day, weekday }) => (
            <th key={day} className="px-3 py-3 text-center border border-gray-300 min-w-[50px]">
              {day} <br />({weekday})
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr className="hover:bg-gray-50">
          <td className="border border-gray-300 px-6 py-3 sticky left-0 z-10 bg-white shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 text-white flex items-center justify-center text-sm font-bold">
                {employee.Name.charAt(0)}
              </div>
              <span className="font-medium text-gray-700">{employee.Name}</span>
            </div>
          </td>
          {days.map(({ day, weekday }) => {
            const isSunday = weekday === "Sun"
            const isPresent = employeeAttendanceData.daysPresent.includes(day)

            const tooltipData = {
              firstIn: "09:00 AM",
              lastOut: "06:00 PM",
              required: "8h",
            }

            return (
              <td key={day} className="relative group text-center px-2 py-3 border border-gray-300 bg-white/30">
                {isSunday ? (
                  <span className="text-red-500 font-semibold">R</span>
                ) : (
                  <>
            <div className={`w-4 h-4 mx-auto rounded-sm ${isPresent ? "bg-green-500" : "bg-red-500"}`} />
            {!isPresent && (
                            <div className="absolute z-40 hidden group-hover:block bg-white border border-gray-300 shadow-lg p-3 rounded-md text-xs text-left w-40 top-full mt-2 left-1/2 transform -translate-x-1/2">
                              <p className="font-semibold mb-1">Day {day}</p>
                              <p>
                                <strong>Status:</strong> <span className="text-red-600">Absent</span>
                              </p>
                            </div>
                          )}
                          {isPresent && (
                            <div className="absolute z-40 hidden group-hover:block bg-white border border-gray-300 shadow-lg p-3 rounded-md text-xs text-left w-40 top-full mt-2 left-1/2 transform -translate-x-1/2">
                              <p className="font-semibold mb-1">Day {day}</p>
                              <p>
                                <strong>First In:</strong> {tooltipData.firstIn}
                              </p>
                              <p>
                                <strong>Last Out:</strong> {tooltipData.lastOut}
                              </p>
                              <p>
                                <strong>Required:</strong> {tooltipData.required}
                              </p>
                              <p>
                                <strong>Status:</strong> <span className="text-green-600">Present</span>
                              </p>
                            </div>
                          )}
                        </>
                      )}
                    </td>
                  )
                })}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// Reusable card for metrics
const InfoCard = ({ title, value, icon }: { title: string; value: string; icon: React.ReactNode }) => (
  <div className="flex-1 bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-200 flex items-center justify-between">
    <div>
      <p className="text-slate-600 text-xl">{title}</p>
      <p className="text-2xl font-bold text-slate-800">{value}</p>
    </div>
    {icon}
  </div>
)

export default EmployeeDetails
