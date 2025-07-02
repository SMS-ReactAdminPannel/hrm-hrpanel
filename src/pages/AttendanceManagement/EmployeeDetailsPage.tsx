import  React from "react"
import { useNavigate } from "react-router-dom"
import { MdKeyboardBackspace } from "react-icons/md"
import AttendanceCalendar from '../../pages/AttendanceManagement/AttendanceCalendar';
import TableForDaily  from'../../components/Attendance/TableForDaily';
import TableForWeek from '../../components/Attendance/TableForWeek'
import { FaRegCalendarAlt } from 'react-icons/fa';



const EmployeeDetails: React.FC = () => {
  const navigate = useNavigate();
  const [showTable, setShowTable] = React.useState<string>("day");

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
      {/* ...profile card code omitted for brevity... */}
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
      <div className="flex items-center justify-between  mt-7">
        <nav className="flex gap-2 bg-gray-100 rounded-lg p-1">
          <button
        className={`px-4 py-1 rounded-md text-sm font-medium text-gray-700 hover:bg-white focus:bg-white transition-colors${showTable === "day" ? " bg-white" : ""}`}
        onClick={() => setShowTable("day")}
          >
        Day
          </button>
          <button
        className={`px-4 py-1 rounded-md text-sm font-medium text-gray-700 hover:bg-white focus:bg-white transition-colors${showTable === "week" ? " bg-white" : ""}`}
        onClick={() => setShowTable("week")}
          >
        Week
          </button>
          <button
        className={`px-4 py-1 rounded-md text-sm font-medium text-gray-700 hover:bg-white focus:bg-white transition-colors${showTable === "month" ? " bg-white" : ""}`}
        onClick={() => setShowTable("month")}
          >
        Month
          </button>
        </nav>
        
      </div>
      {showTable === "day" && (
        <div className="bg-white rounded-xl shadow-md  border border-gray-100 mt-4">
        <TableForDaily />
        </div>
      )}
      {showTable === "week" && (
        <div className="bg-white rounded-xl shadow-md  border border-gray-100 mt-4">
        <TableForWeek />
        </div>
      )}
      {showTable === "month" && (
        <div className="bg-white rounded-xl shadow-md  border border-gray-100 mt-4">
        <AttendanceCalendar />
        </div>
      )}
      </div>
    </div>
  );
};
export default EmployeeDetails
