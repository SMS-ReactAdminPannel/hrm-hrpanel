import type React from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { MdKeyboardBackspace, MdTimer } from "react-icons/md"
import { IoSettingsSharp } from "react-icons/io5"
import { PiBowlSteamFill } from "react-icons/pi"
import { CgProfile } from "react-icons/cg"
import mainlayout from "../../assets/mainLayout.jpg"

const EmployeeDetails: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()

  // Employee data passed via router state
  const employee = location.state?.employee

  if (!employee) {
    return (
      <div className="p-6 text-center">
        <p>No employee selected.</p>
        <button onClick={() => navigate(-1)} className="mt-4 underline text-blue-600">
          Go Back
        </button>
      </div>
    )
  }

  const employeeAttendanceData = {
    daysPresent: [1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 15, 16, 17, 18, 19, 20, 22, 23, 24, 25, 26, 27, 29, 30, 31],
    profilePic: `/placeholder.svg?height=40&width=40`,
  }

  // Generate weeks for December 2025
  const generateWeeksInMonth = (year: number, month: number) => {
    const daysInMonth = new Date(year, month, 0).getDate()
    const firstDay = new Date(year, month - 1, 1).getDay()
    const weeks = []

    let currentWeek = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      currentWeek.push(null)
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month - 1, day)
      const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
      const weekday = weekdays[date.getDay()]

      currentWeek.push({ day, weekday })

      // If we've completed a week (7 days) or it's the last day
      if (currentWeek.length === 7 || day === daysInMonth) {
        // Fill remaining days with null if needed
        while (currentWeek.length < 7) {
          currentWeek.push(null)
        }
        weeks.push([...currentWeek])
        currentWeek = []
      }
    }

    return weeks
  }

  const weeks = generateWeeksInMonth(2025, 12) // December 2025
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  return (
    <div className="space-y-6 min-h-screen ">
      <div className="justify-end">
        <button onClick={() => navigate(-1)} className="mb-4 text-gray-500 hover:text-red-500 bg-white rounded">
          <MdKeyboardBackspace size={28} />
        </button>
      </div>

      <div>
        <p className="font-bold text-lg">Employee Attendance</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <div className="bg-white p-5 rounded-lg shadow flex items-center space-x-4">
          <div className="bg-blue-100 p-3 rounded-full">
            <IoSettingsSharp className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Completed Projects</p>
            <p className="text-xl font-semibold text-gray-900">2</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg shadow flex items-center space-x-4">
          <div className="bg-green-100 p-3 rounded-full">
            <MdTimer className="w-8 h-8 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Worked Duration</p>
            <p className="text-xl font-semibold text-gray-900">216Hrs:40mins</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg shadow flex items-center space-x-4">
          <div className="bg-yellow-100 p-3 rounded-full">
            <PiBowlSteamFill className="w-8 h-8 text-yellow-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Break Time</p>
            <p className="text-xl font-semibold text-gray-900">24Hrs</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg shadow flex items-center space-x-4">
          <div className="bg-red-100 p-3 rounded-full">
            <CgProfile className="w-8 h-8 text-red-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Leave</p>
            <p className="text-xl font-semibold text-gray-900">4</p>
          </div>
        </div>
      </div>

      {/* Monthly Timesheet - Week-based Layout */}
      <div className="bg-white rounded-xl shadow-xl border border-white/20 overflow-hidden">
        <div className="p-6 border-b border-white/30">
          <h3 className="text-xl font-semibold text-slate-800">Monthly Timesheet - December 2025</h3>
          <div className="mt-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 text-white flex items-center justify-center text-sm font-bold">
              {employee.Name.charAt(0)}
            </div>
  <div className="flex items-center space-x-4">
  {/* Image/Icon */}
  <div className="h-12 rounded-full bg-[#006666] flex items-center justify-center">
    {/* You can replace this with an actual image if needed */}
    <img
      src={mainlayout}
      alt="Profile"
      className="h-12 w-12 rounded-full object-cover"
    />
  </div>

  {/* Name and Designation */}
  <div className="flex flex-col">
    <span className="font-medium text-3xl text-gray-700">{employee.Name}</span>
    <span className="text-lg font-medium text-gray-600">{employee.Designation}</span>
  </div>
</div>
 </div>
        </div>
{/* monthly details */}
        <div className="p-6 mb-12">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#006666] text-white">
                {weekdays.map((weekday) => (
                  <th key={weekday} className="border border-gray-300 px-4 py-3 text-center">
                    {weekday}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {weeks.map((week, weekIndex) => (
                <tr key={weekIndex} className="hover:bg-gray-50">
                  {week.map((dayData, dayIndex) => {
                    if (!dayData) {
                      return <td key={dayIndex} className="border border-gray-300 px-4 py-3 bg-gray-100"></td>
                    }

                    const { day, weekday } = dayData
                    const isSunday = weekday === "Sun"
                    const isPresent = employeeAttendanceData.daysPresent.includes(day)

                    const tooltipData = {
                      firstIn: "09:00 AM",
                      lastOut: "06:00 PM",
                      required: "8h",
                    }

                    return (
                      <td
                        key={dayIndex}
                        className="relative group text-center px-4 py-3 border border-gray-300 bg-white"
                      >
                        <div className="flex flex-col items-center gap-2">
                          <span className="text-sm font-medium">{day}</span>
                          {isSunday ? (
                            <span className="text-red-500 font-semibold text-lg">R</span>
                          ) : (
                            <>
                              <span
                                className={`font-semibold text-lg ${isPresent ? "text-green-600" : "text-red-600"}`}
                              >
                                {isPresent ? "P" : "A"}
                              </span>
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
                        </div>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">Days</h4>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-green-600 font-semibold">P</span>
                <span>Present</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-600 font-semibold">A</span>
                <span>Absent</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-500 font-semibold">R</span>
                <span>Rest Day (Sunday)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeeDetails
