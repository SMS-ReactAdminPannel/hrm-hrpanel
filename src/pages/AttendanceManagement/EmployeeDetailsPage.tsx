import  React from "react"
import { useNavigate } from "react-router-dom"
import { MdKeyboardBackspace } from "react-icons/md"
import AttendanceCalendar from '../../pages/AttendanceManagement/AttendanceCalendar';
import ScheduleTable from'../AttendanceManagement/AttendanceCalendar.css';
import { FaRegCalendarAlt } from 'react-icons/fa';



const EmployeeDetails: React.FC = () => {
  
  const navigate = useNavigate()
  const [showCalendar, setShowCalendar] = React.useState(false)

  return (
    <div className="space-y-6 min-h-screen  p-2">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-white/50 transition-colors"
        >
          <MdKeyboardBackspace size={24} />
          <span className="font-medium"></span>
        </button>

        <div className="text-sm text-gray-500">
          <span className="font-medium">Today:</span>{" "}
          {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
        </div>
      </div>

      {/* Employee Profile Card  [if needed add them otherwise don't disturb] */}
      {/* <div className="bg-white rounded-xl  overflow-hidden">
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
      </div> */}
       <div className="dashboard-header bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
        <div className="flex items-center justify-between">
          <div className="header-title flex items-center space-x-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <FaRegCalendarAlt className="header-icon text-blue-600 text-xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Employee Attendance</h1>
              <p className="text-sm text-gray-500">Track and manage daily attendance records</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end mb-4">
              <nav className="flex gap-2 bg-gray-100 rounded-lg p-1">
                <button className="px-4 py-1 rounded-md text-sm font-medium text-gray-700 hover:bg-white focus:bg-white transition-colors">
                  Day
                </button>
                <button className="px-4 py-1 rounded-md text-sm font-medium text-gray-700 hover:bg-white
                 focus:bg-white transition-colors"
                 onClick={() => setShowCalendar(true)}>
                  Week
                </button>
                <button
                              className="px-4 py-1 rounded-md text-sm font-medium text-gray-700 hover:bg-white focus:bg-white transition-colors"
                              onClick={() => setShowCalendar(true)}
                            >
                              Month
                            </button>
              </nav>
        </div>
        {showCalendar && (
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 mt-4">
          <AttendanceCalendar />
        </div>
      )}
      {showCalendar && (
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 mt-4">
          
        </div>
      )}
      </div>
    </div>
  )
}
export default EmployeeDetails
