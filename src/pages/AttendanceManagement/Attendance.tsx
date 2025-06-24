import React, { useState, useEffect } from "react"
import { PieChart, Pie, Cell, Tooltip } from "recharts"
import { CiSearch } from "react-icons/ci"
import { FaBriefcase } from "react-icons/fa"
import { IoIosPeople } from "react-icons/io"
import { MdManageHistory, MdTimer } from "react-icons/md"
import { useNavigate } from "react-router-dom";
import { FONTS } from "../../constants/uiConstants"
import { getDailyAttendance } from "../../features/Attendance/service"


const Attendance: React.FC = () => {
  type EmployeeDetail = {
    ID: string
    Name: string
    Designation: string
    Status: string
    CheckIn: string
    CheckOut: string
    Duration: string
    TotalCompletedProject?: string
    TotalWorkedDuration?: string
    TotalBreakTime?: string
    TotalLeaveDays?: string

  }

  // const [value, setValue] = useState("")
  const [selectedDate, setSelectedDate] = useState("2025-06-11")

  const details = [
    {
      ID: "JD01",
      Name: "Hema",
      Designation: "Junior Developer",
      Status: "Present",
      CheckIn: "9:30 am",
      CheckOut: "6:30pm",
      Duration: "9h",
      TotalCompletedProject: "2",
      TotalWorkedDuration: "215h 40m",
      TotalBreakTime: "24h",
      TotalLeaveDays: "5",
    },
    {
      ID: "D02",
      Name: "Priya",
      Designation: "Designer",
      Status: "Absent",
      CheckIn: "-",
      CheckOut: "-",
      Duration: "0h",
      TotalCompletedProject: "2",
      TotalWorkedDuration: "215h 40m",
      TotalBreakTime: "24h",
      TotalLeaveDays: "5",
    },
    {
      ID: "TL03",
      Name: "Nila",
      Designation: "TL",
      Status: "Present",
      CheckIn: "9:30 am",
      CheckOut: "6:30 pm",
      Duration: "9h",
      TotalCompletedProject: "2",
      TotalWorkedDuration: "215h 40m",
      TotalBreakTime: "24h",
      TotalLeaveDays: "5",
    },
    {
      ID: "SD04",
      Name: "Dev",
      Designation: "Senior Developer",
      Status: "Present",
      CheckIn: "9:30 am",
      CheckOut: "6:30 pm",
      Duration: "9h",
      TotalCompletedProject: "2",
      TotalWorkedDuration: "215h 40m",
      TotalBreakTime: "24h",
      TotalLeaveDays: "5",
    },
    {
      ID: "M05",
      Name: "Karen",
      Designation: "Marketing",
      Status: "Present",
      CheckIn: "9:30 am",
      CheckOut: "6:30 pm",
      Duration: "9h",
      TotalCompletedProject: "2",
      TotalWorkedDuration: "215h 40m",
      TotalBreakTime: "24h",
      TotalLeaveDays: "5",
    },
    {
      ID: "SD06",
      Name: "Wilson",
      Designation: "Senior Developer",
      Status: "Present",
      CheckIn: "9:30 am",
      CheckOut: "6:30 pm",
      Duration: "9h",
      TotalCompletedProject: "2",
      TotalWorkedDuration: "215h 40m",
      TotalBreakTime: "24h",
      TotalLeaveDays: "5",
    },
    {
      ID: "JD07",
      Name: "Kia",
      Designation: "Junior Developer",
      Status: "Present",
      CheckIn: "9:30 am",
      CheckOut: "6:30 pm",
      Duration: "9h",
      TotalCompletedProject: "2",
      TotalWorkedDuration: "215h 40m",
      TotalBreakTime: "24h",
      TotalLeaveDays: "5",
    },
    {
      ID: "M08",
      Name: "Sam",
      Designation: "Marketing",
      Status: "Present",
      CheckIn: "9:30 am",
      CheckOut: "6:30 pm",
      Duration: "9h",
      TotalCompletedProject: "2",
      TotalWorkedDuration: "215h 40m",
      TotalBreakTime: "24h",
      TotalLeaveDays: "5",
    },
    {
      ID: "A09",
      Name: "Kim",
      Designation: "Admin",
      Status: "Present",
      CheckIn: "9:30 am",
      CheckOut: "6:30 pm",
      Duration: "9h",
      TotalCompletedProject: "2",
      TotalWorkedDuration: "215h 40m",
      TotalBreakTime: "24h",
      TotalLeaveDays: "5",
    },
    {
      ID: "A10", Name: "Kook", Designation: "Admin", Status: "Absent", CheckIn: "-", CheckOut: "-", Duration: "0h", TotalCompletedProject: "2",
      TotalWorkedDuration: "215h 40m",
      TotalBreakTime: "24h",
      TotalLeaveDays: "5",
    },
    {
      ID: "A11",
      Name: "Kanna",
      Designation: "Junior Developer",
      Status: "Absent",
      CheckIn: "-",
      CheckOut: "-",
      Duration: "0h",
      TotalCompletedProject: "2",
      TotalWorkedDuration: "215h 40m",
      TotalBreakTime: "24h",
      TotalLeaveDays: "5",
    },
  ]
  const [searchQuery, setSearchQuery] = useState("")
  const navigate = useNavigate()

  // Donut
  const presentCount = details.filter((d) => d.Status === "Present").length
  const absentCount = details.filter((d) => d.Status === "Absent").length
  const chartData = [
    { name: "Present", value: presentCount },
    { name: "Absent", value: absentCount },
  ]
  const COLORS = ['#7e79c2', 'rgba(94, 89, 169, 0.45)'];


  // Designation filter
  const [designationFilter, setDesignationFilter] = useState("")
  const designations = Array.from(new Set(details.map((d) => d.Designation)))

  const filteredDetails = details.filter((item) => {
    const query = searchQuery.trim().toLowerCase()
    const matchesSearch =
      item.Designation.toLowerCase().includes(query) ||
      item.Status.toLowerCase().includes(query) ||
      item.Name.toLowerCase().includes(query)

    const matchesDesignation = designationFilter === "" || item.Designation === designationFilter

    return matchesSearch && matchesDesignation
  })
  const [currentPage, setCurrentPage] = useState(1)
  const rowsPerPage = 10

  const paginatedDetails = filteredDetails.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, designationFilter])
  const [showDesignationDropdown, setShowDesignationDropdown] = useState(false)
  const designationDropdownRef = React.useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (designationDropdownRef.current && !designationDropdownRef.current.contains(event.target as Node)) {
        setShowDesignationDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])
  // Employee component
  // const [selectedEmployee, setSelectedEmployee] = useState<EmployeeDetail | null>(null)

  const handleClick = (employee: DailyAttendanceItem) => {
    navigate("/attendance-id", { state: { employee } })
  }

  interface Person {
    id: number
    name: string
    email: string
    status: string
  }

  const [isOpen, setIsOpen] = useState(false)
  const dummyData: Person[] = [
    {
      id: 1,
      name: "Kia",
      email: "kia@company.com",
      status: "approved",
    },
    {
      id: 2,
      name: "Sam",
      email: "Sam@company.com",
      status: "pending",
    },
  ]



  
  
// Define a type for daily attendance items (adjust fields as needed)
type DailyAttendanceItem = {
  ID: string;
  employee_id: {
    first_name: string;
    role: string;
  };
  status: string;
  Status?: string;
  clockIn: string;
  clockOut: string;
  totalHours: string;
};

const [dailyAttendance, setdailyAttendance] = useState<DailyAttendanceItem[]>([]);
const fetchDailyAttendance = async () => {
  try {
    const response: any = await getDailyAttendance({ date: selectedDate });

    const attendanceData = response?.Data ?? [];

    setdailyAttendance(attendanceData);

    console.log("Daily Attendance fetched:", attendanceData); // ✅ this is correct
  } catch (error) {
    console.error("Error fetching AttendanceData:", error);
  }
};

    
      useEffect(() => {
        fetchDailyAttendance();
      }, [selectedDate]);


console.log(dailyAttendance,"sdfghjk")


  return (
    <div className="space-y-6 min-h-screen w-full  p-1">
      <div>
        <h1 className="text-4xl font-bold text-white mt-2 leading-relaxed pb-1">
          Attendance Dashboard
        </h1>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Employees Card */}
        <div className="bg-[#eff4f5] rounded-lg p-6  border-gray-100 transition-all duration-200 flex items-center justify-between h-32 hover:shadow-lg">

          <div>
            <p className="text-gray-500 font-medium mb-2 font-family-poppins">No. of Employees</p>
            <p className="text-2xl font-semibold text-gray-900">{details.length}</p>
          </div>
          <div className="bg-[#5e59a9]/5 p-3 rounded-full">
            <IoIosPeople className="w-10 h-10 text-[#5e59a9]/40" />
          </div>
        </div>

        {/* Duration Card */}
        <div className="bg-[#eff4f5] rounded-lg p-6  border-gray-100 transition-all duration-200 flex items-center justify-between h-32 hover:shadow-lg">
          <div>
            <p className="text-gray-500 font-medium mb-2 font-family-poppins">Work Duration</p>
            <p className="text-2xl font-semibold text-gray-900">9 Hrs</p>
          </div>
          <div className="bg-[#5e59a9]/5 p-3 rounded-full">
            <MdTimer className="w-10 h-10 text-[#5e59a9]/40" />
          </div>
        </div>

        {/* Permission Card */}
        <div
          className="bg-[#eff4f5] rounded-lg p-6  border-gray-100 transition-all duration-200 flex items-center justify-between h-32 hover:shadow-lg"
          onClick={() => setIsOpen(true)}
        >
          <div>
            <p className="text-gray-500 font-medium mb-2 font-family-poppins">Permission</p>
            <p className="text-2xl font-semibold text-gray-900">{dummyData.length}</p>
          </div>
          <div className="bg-[#5e59a9]/5 p-3 rounded-full">
            <MdManageHistory className="w-10 h-10 text-[#5e59a9]/40" />
          </div>
        </div>

        {/* Attendance Chart Card */}
        <div className="bg-[#eff4f5] rounded-lg p-6  border-gray-100 transition-all duration-200 flex items-center justify-between h-32 hover:shadow-lg">
          <div>
            <p className="text-gray-500 font-medium mb-2 font-family-poppins">Attendance</p>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#5e59a9]/90"></div>
              <p className="text-sm">Present: {presentCount}</p>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-3 h-3 rounded-full bg-[#5e59a9]/50"></div>
              <p className="text-sm">Absent: {absentCount}</p>
            </div>
          </div>

          <PieChart width={120} height={120}>
            <Pie data={chartData} cx="50%" cy="50%" innerRadius={30} outerRadius={50} paddingAngle={3} dataKey="value">
              {chartData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>

      {/* Filters Section */}
      <div className="flex flex-row md:flex-row justify-between gap-4 mt-8">
        {/* Date Picker */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1"></label>
          <input
            type="date"
            className="w-full md:w-[250px] px-4 py-2.5 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#006666]/50 font-family-poppins focus:border-transparent transition-all duration-200"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>

        {/* Search */}
        <div className="relative flex-grow max-w-md">
          <label className="block text-sm font-medium text-gray-700 mb-1"></label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <CiSearch size={20} />
            </span>
            <input
              type="search"
              placeholder="Search by Name, Designation or Status"
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none font-family-poppins focus:placeholder-gray-400 focus:ring-2 focus:ring-[#006666]/50 focus:border-[#006666]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Designation filter */}
        <div className="relative" ref={designationDropdownRef}>
          <label className="block text-sm font-medium text-gray-700 mb-1"></label>
          <button
            onClick={() => setShowDesignationDropdown(!showDesignationDropdown)}
            className="w-full md:w-[250px] px-4 py-2.5 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#006666]/50 focus:border-transparent transition-all duration-200 text-left flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <FaBriefcase className="text-gray-400" />
              <span className="truncate">{designationFilter || "All Designations"}</span>
            </span>
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${showDesignationDropdown ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {showDesignationDropdown && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
              <div
                onClick={() => {
                  setDesignationFilter("")
                  setShowDesignationDropdown(false)
                }}
                className="px-4 py-3 cursor-pointer hover:bg-[#006666]/10 hover:text-[#006666] transition-colors duration-200 flex items-center gap-2 border-b border-gray-100"
              >
                All Designations
              </div>
              {designations.map((designation, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setDesignationFilter(designation)
                    setShowDesignationDropdown(false)
                  }}
                  className="px-4 py-3 cursor-pointer hover:bg-[#006666]/10 hover:text-[#006666] transition-colors duration-200"
                >
                  {designation}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Table Section */}

      <div className="overflow-hidden rounded-md mt-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#5e59a9]/70 backdrop-blur-sm">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">ID</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Designation
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Check In
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Check Out
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Duration
                </th>
              </tr>
            </thead>
            <tbody className="bg-white/45 backdrop-blur divide-y divide-gray-100">
              {dailyAttendance && dailyAttendance.map((item) => (
                <tr
                  key={item.ID}
                  className="hover:bg-white/70 hover:backdrop-blur-sm cursor-pointer transition duration-200"
                  onClick={() => handleClick(item)}
                >
                  <td className="px-6 py-1 whitespace-nowrap text-sm font-medium text-gray-900">{item.ID || "NA"}</td>
                  <td className="px-6 py-1 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#5e59a9]/60 text-white flex items-center justify-center text-sm font-semibold shadow-sm">
                        {item.employee_id.first_name?.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-medium">{item.employee_id.first_name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.employee_id.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium
                  ${item.Status === "Present"
                          ? "bg-green-100 text-green-800 border border-green-200"
                          : "bg-red-100 text-red-800 border border-red-200"
                        }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.clockIn || "-"}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.clockOut || " - "}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.totalHours || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>


        {/* Pagination Controls */}
        <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-t border-gray-100">
          <div className="text-sm text-gray-500">
            Showing {Math.min(filteredDetails.length, (currentPage - 1) * rowsPerPage + 1)} to{" "}
            {Math.min(currentPage * rowsPerPage, filteredDetails.length)} of {filteredDetails.length} entries
          </div>

          <div className="flex space-x-2">
            {/* Previous Button */}
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 rounded-lg bg-white text-gray-700 border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:bg-gray-50"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 8 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13"
                />
              </svg>
            </button>

            {/* Page Numbers */}
            {Array.from({ length: Math.ceil(filteredDetails.length / rowsPerPage) }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-3.5 py-2 rounded-lg transition-all duration-200 ${currentPage === index + 1
                    ? "bg-[#5e59a9]/60 text-white shadow-md"
                    : "bg-white text-gray-700 border border-gray-200 hover:bg-[#5e59a9]/60"
                  }`}
              >
                {index + 1}
              </button>
            ))}

            {/* Next Button */}
            <button
              onClick={() =>
                setCurrentPage((prev) => (prev < Math.ceil(filteredDetails.length / rowsPerPage) ? prev + 1 : prev))
              }
              disabled={currentPage >= Math.ceil(filteredDetails.length / rowsPerPage)}
              className="px-3 py-2 rounded-lg bg-white text-gray-700 border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:bg-gray-50"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 8 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Permission Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl mx-4 animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-[#006666]">Permission Requests</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            <div className="max-h-[400px] overflow-y-auto divide-y divide-gray-100">
              {dummyData.map((person) => (
                <div key={person.id} className="py-4 first:pt-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">{person.name}</p>
                      <p className="text-sm text-gray-500">{person.email}</p>
                    </div>
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize
                        ${person.status === "approved"
                          ? "bg-green-100 text-green-800 border border-green-200"
                          : "bg-yellow-100 text-yellow-800 border border-yellow-200"
                        }`}
                    >
                      {person.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-[#006666] text-white rounded-lg hover:bg-[#005555] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Attendance