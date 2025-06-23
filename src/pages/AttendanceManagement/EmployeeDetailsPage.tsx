import type React from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { MdKeyboardBackspace, MdTimer } from "react-icons/md"
import { IoSettingsSharp } from "react-icons/io5"
import { PiBowlSteamFill } from "react-icons/pi"
import { CgProfile } from "react-icons/cg"
import { FaCalendarAlt } from "react-icons/fa"
import mainlayout from "../../assets/mainLayout.jpg"
import AttendanceCalendar from '../../pages/AttendanceManagement/AttendanceCalendar';


const EmployeeDetails: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()

  // Employee data passed via router state
  const employee = location.state?.employee

  if (!employee) {
    return (
      <div className="flex flex-col items-center justify-center h-screen  p-6">
        <div className="p-8 rounded-xl shadow-lg max-w-md w-full text-center">
          <div className="text-amber-500 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No Employee Selected</h2>
          <p className="text-gray-600 mb-6">
            Please select an employee from the attendance list to view their details.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-[#006666] text-white rounded-lg hover:bg-[#005555] transition-colors flex items-center justify-center gap-2 w-full"
          >
            <MdKeyboardBackspace size={20} />
            <span>Return to Attendance</span>
          </button>
        </div>
      </div>
    )
  }

  const employeeAttendanceData = {
    daysPresent: [1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 15, 16, 17, 18, 19, 20, 22, 23, 24, 25, 26, 27, 29, 30, 31],
    profilePic: `/placeholder.svg?height=40&width=40`,
  }

  // Generate weeks for December 2025
  // const generateWeeksInMonth = (year: number, month: number) => {
  //   const daysInMonth = new Date(year, month, 0).getDate()
  //   const firstDay = new Date(year, month - 1, 1).getDay()
  //   const weeks = []

  //   let currentWeek = []

  //   // Add empty cells for days before the first day of the month
  //   for (let i = 0; i < firstDay; i++) {
  //     currentWeek.push(null)
  //   }

  //   // Add all days of the month
  //   for (let day = 1; day <= daysInMonth; day++) {
  //     const date = new Date(year, month - 1, day)
  //     const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  //     const weekday = weekdays[date.getDay()]

  //     currentWeek.push({ day, weekday })

  //     // If we've completed a week (7 days) or it's the last day
  //     if (currentWeek.length === 7 || day === daysInMonth) {
  //       // Fill remaining days with null if needed
  //       while (currentWeek.length < 7) {
  //         currentWeek.push(null)
  //       }
  //       weeks.push([...currentWeek])
  //       currentWeek = []
  //     }
  //   }

  //   return weeks
  // }

  // const weeks = generateWeeksInMonth(2025, 12) // December 2025
  // const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  // Calculate attendance statistics
  const totalDays = 31
  const presentDays = employeeAttendanceData.daysPresent.length
  // const absentDays = totalDays - presentDays - 5 // Assuming 5 Sundays in December 2025
  // const attendancePercentage = Math.round((presentDays / (totalDays - 5)) * 96)

  return (
    <div className="space-y-6 min-h-screen  p-6">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
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

      {/* Employee Profile Card */}
      <div className="bg-white rounded-xl  overflow-hidden">
        <div className="bg-[#5e59a9]/60 from-[#006666] to-[#008080] p-6 text-white">
          <div className="flex items-center gap-4">
            <div className="h-20 w-20 rounded-full border-4 border-white shadow-md overflow-hidden">
              <img src={mainlayout || "/placeholder.svg"} alt="Profile" className="h-full w-full object-cover" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{employee.Name}</h1>
              <p className="text-teal-100">{employee.Designation}</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Employee ID</p>
              <p className="font-medium">{employee.ID}</p>
            </div>
            <div>
              <p className="text-gray-500">Status</p>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                ${employee.Status === "Present" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
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
              <div>
              <p className="text-gray-500">Total Completed Projects</p>
              <p className="font-medium">{employee.TotalCompletedProject || "N/A"}</p>
            </div>
             <div>
              <p className="text-gray-500">Total Worked Duration</p>
              <p className="font-medium">{employee.TotalWorkedDuration}</p>
            </div>
             <div>
              <p className="text-gray-500">Total Break Time</p>
              <p className="font-medium">{employee.TotalBreakTime}</p>
            </div>
             <div>
              <p className="text-gray-500">Total Leave Days</p>
              <p className="font-medium">{employee.TotalLeaveDays}</p>
            </div>
          </div>
        </div>
      </div>
       <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <AttendanceCalendar />
        </div>

      {/* Stats Cards */}
      {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-[#eff4f5] p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">

          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <IoSettingsSharp className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-md">Projects</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">2</p>
          <p className="text-sm text-gray-500 mt-1">Total Completed Projects</p>
        </div>

        <div className="bg-[#eff4f5] p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-100 p-3 rounded-full">
              <MdTimer className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-md">Hours</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">216h 40m</p>
          <p className="text-sm text-gray-500 mt-1">Total Worked Duration</p>
        </div>

        <div className="bg-[#eff4f5] p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-yellow-100 p-3 rounded-full">
              <PiBowlSteamFill className="w-6 h-6 text-yellow-600" />
            </div>
            <span className="text-xs font-medium text-yellow-600 bg-yellow-50 px-2 py-1 rounded-md">Break</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">24h</p>
          <p className="text-sm text-gray-500 mt-1">Total Break Time</p>
        </div>

        <div className="bg-[#eff4f5] p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-red-100 p-3 rounded-full">
              <CgProfile className="w-6 h-6 text-red-600" />
            </div>
            <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded-md">Leave</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">4</p>
          <p className="text-sm text-gray-500 mt-1">Total Leave Days</p>
        </div>
      </div> */}

      {/* Attendance Summary */}
      {/* <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
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
        </div> */}

        {/* Progress Bar */}
        {/* <div className="mb-6">
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">Attendance Rate</span>
            <span className="text-sm font-medium text-gray-700">{attendancePercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-[#5e59a9]/60 h-2.5 rounded-full" style={{ width: `${attendancePercentage}%` }}></div>
          </div>
        </div> */}

        {/* Calendar */}
        {/* <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                {weekdays.map((weekday) => (
                  <th
                    key={weekday}
                    className={`border px-4 py-3 text-center text-sm font-medium ${weekday === "Sun" ? "bg-red-50 text-red-800" : "bg-[#5e59a9]/60 text-white"}`}
                  >
                    {weekday}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {weeks.map((week, weekIndex) => (
                <tr key={weekIndex}>
                  {week.map((dayData, dayIndex) => {
                    if (!dayData) {
                      return <td key={dayIndex} className="border border-gray-200 px-4 py-3 bg-gray-50"></td>
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
                        className={`relative group text-center px-4 py-3 border border-gray-200 ${
                          isSunday ? "bg-red-50" : "hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex flex-col items-center gap-1">
                          <span className={`text-sm font-medium ${isSunday ? "text-red-800" : ""}`}>{day}</span>
                          {isSunday ? (
                            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-red-100 text-red-800 font-semibold text-sm">
                              R
                            </span>
                          ) : (
                            <span
                              className={`inline-flex items-center justify-center w-7 h-7 rounded-full ${
                                isPresent ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                              } font-semibold text-sm`}
                            >
                              {isPresent ? "P" : "A"}
                            </span>
                          )} */}

                          {/* Tooltip */}
                          {/* {!isSunday && (
                            <div className="absolute z-40 hidden group-hover:block bg-white border border-gray-200 shadow-lg p-3 rounded-lg text-xs text-left w-48 top-full mt-2 left-1/2 transform -translate-x-1/2">
                              <div className="flex justify-between items-center mb-2 pb-1 border-b border-gray-100">
                                <p className="font-semibold">December {day}, 2025</p>
                                <span
                                  className={`px-1.5 py-0.5 rounded text-xs font-medium ${
                                    isPresent ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                  }`}
                                >
                                  {isPresent ? "Present" : "Absent"}
                                </span>
                              </div>

                              {isPresent ? (
                                <>
                                  <div className="grid grid-cols-2 gap-2">
                                    <div>
                                      <p className="text-gray-500">First In</p>
                                      <p className="font-medium">{tooltipData.firstIn}</p>
                                    </div>
                                    <div>
                                      <p className="text-gray-500">Last Out</p>
                                      <p className="font-medium">{tooltipData.lastOut}</p>
                                    </div>
                                  </div>
                                  <div className="mt-2">
                                    <p className="text-gray-500">Duration</p>
                                    <p className="font-medium">{tooltipData.required}</p>
                                  </div>
                                </>
                              ) : (
                                <p className="text-gray-600">No attendance record for this day.</p>
                              )}
                            </div>
                          )}
                        </div>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div> */}

        {/* Legend */}
        {/* <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h4 className="font-semibold text-gray-800 mb-3">Legend</h4>
          <div className="flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-800 font-semibold text-xs">
                P
              </span>
              <span className="text-gray-700">Present</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-100 text-red-800 font-semibold text-xs">
                A
              </span>
              <span className="text-gray-700">Absent</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-100 text-red-800 font-semibold text-xs">
                R
              </span>
              <span className="text-gray-700">Rest Day (Sunday)</span>
            </div>
          </div>
        </div>  

      </div> */}
    </div>
  )
}

export default EmployeeDetails
