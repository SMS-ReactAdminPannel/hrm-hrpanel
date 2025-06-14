import React, { useState, useEffect } from "react"
import { PieChart, Pie, Cell, Tooltip } from "recharts"
import { CiSearch } from "react-icons/ci"
import { FaBriefcase } from "react-icons/fa"
import { IoIosPeople } from "react-icons/io"
import { MdTimer } from "react-icons/md"
import { useNavigate } from "react-router-dom";
const Attendance: React.FC = () => {

  type EmployeeDetail = {
  ID: string
  Name: string
  Designation: string
  Status: string
  CheckIn: string
  CheckOut: string
  Duration: string
}

  // const [value, setValue] = useState("")
  const [selectedDate, setSelectedDate] = useState("")

  const details = [
    { ID: "JD01",Name: "Hema",Designation: "Junior Developer",Status: "Present",CheckIn: "9:30 am",CheckOut: "6:30pm",Duration: "9h",},
    { ID: "D02",Name: "Priya",Designation: "Designer",Status: "Absent",CheckIn: "-",CheckOut: "-",Duration: "0h",},
    {ID: "TL03",Name: "Nila",Designation: "TL",Status: "Present",CheckIn: "9:30 am",CheckOut: "6:30 pm",Duration: "9h",},
    {ID: "SD04",Name: "Dev",Designation: "Senior Developer",Status: "Present",CheckIn: "9:30 am",CheckOut: "6:30 pm",Duration: "9h",},
    {ID: "M05",Name: "Karen",Designation: "Marketing",Status: "Present",CheckIn: "9:30 am",CheckOut: "6:30 pm",Duration:"9h",},
    {ID: "SD06",Name: "Wilson",Designation: "Senior Developer",Status: "Present",CheckIn: "9:30 am",CheckOut: "6:30 pm",
      Duration: "9h",},
    {ID: "JD07",Name: "Kia",Designation: "Junior Developer",Status: "Present",CheckIn: "9:30 am",CheckOut: "6:30 pm",Duration: "9h",},
    {ID: "M08",Name: "Sam",Designation: "Marketing",Status: "Present",CheckIn: "9:30 am",CheckOut: "6:30 pm",Duration: "9h",},
    {ID: "A09",Name: "Kim",Designation: "Admin",Status: "Present",CheckIn: "9:30 am",CheckOut: "6:30 pm",Duration: "9h",},
    {ID: "A10",Name: "Kook",Designation: "Admin",Status: "Absent",CheckIn: "-",CheckOut: "-",Duration: "0h",},
    {ID: "A11",Name: "Kanna",Designation: "Junior Developer",Status: "Absent",CheckIn: "-",CheckOut: "-",Duration: "0h",},
  ]
  const [searchQuery, setSearchQuery] = useState("")
     const navigate = useNavigate();

  const filtereddetails = details.filter((details) => {
    const query = searchQuery.trim().toLowerCase()
    return (
      details.Designation.toLowerCase().includes(query) ||
      details.Status.toLowerCase().includes(query) ||
      details.Name.toLowerCase().includes(query)
    )
  })
  // Donut
  const presentCount = details.filter((d) => d.Status === "Present").length
  const absentCount = details.filter((d) => d.Status === "Absent").length
  const chartData = [
    { name: "Present", value: presentCount },
    { name: "Absent", value: absentCount },
  ]
  const COLORS = ["#00C49F", "#FF8042"]
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
  const filteringDetails = details.filter((item) => {
    const query = searchQuery.trim().toLowerCase()
    const matchesSearch =
      item.Designation.toLowerCase().includes(query) ||
      item.Status.toLowerCase().includes(query) ||
      item.Name.toLowerCase().includes(query)

    const matchesDesignation = designationFilter === "" || item.Designation === designationFilter

    return matchesSearch && matchesDesignation
  })
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
    const [selectedEmployee, setSelectedEmployee] = useState<EmployeeDetail | null>(null)


     const handleClick = (employee: EmployeeDetail) => {
  navigate("/attendance-id", { state: { employee } });
};

const dummyData = [
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
  const [isOpen, setIsOpen] = useState(false)

  return (
    
    <div className="p-6 space-y-6 min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-cyan-100">
      <div>
        <p className="text-4xl font-bold bg-[#006666] bg-clip-text text-transparent mt-2 leading-relaxed pb-1">
          Attendance Management
        </p>
      </div>
      <div>
        {/* Top Section */}
        <div className="flex gap-6 mt-4">
          {/* Left: No of Employees Card */}
          <div className="flex-1 bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-200 flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-xl">No Of Employees</p>
              <p className="text-2xl font-bold text-slate-800">{details.length}</p>
            </div>
            <IoIosPeople className="w-10 h-10 text-green-600" />
          </div>
          <div className="flex-1 bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-200 flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-xl">Total Duration</p>
              <p className="text-2xl font-bold text-slate-800">9 Hrs</p>
            </div>
            <MdTimer className="w-10 h-10 text-red-600" />
          </div>
          <div className="flex-1 bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-200 flex items-center justify-between">
            <div>
      {/* Permission Summary Card */}
      <div
        className=" cursor-pointer flex justify-between items-center max-w-sm"
        onClick={() => setIsOpen(true)}
      >
        <div>
          <p className="text-gray-600 text-xl">Permission</p>
          <p className="text-2xl font-bold">{dummyData.length}</p>
        </div>
        <MdTimer className="w-10 h-10 text-yellow-400 ml-16" />
      </div>

      {/* Simple Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Permission Requests</h2>
              <button onClick={() => setIsOpen(false)} className="text-gray-500 text-sm">Close</button>
            </div>

            {dummyData.map((person) => (
              <div key={person.id} className="border-b py-3">
                <p className="font-semibold">{person.name}</p>
                <p className="text-sm text-gray-500">{person.email}</p>
                <p className="text-xs capitalize text-gray-400">{person.status}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
          </div>
          
          {/* Right: Pie Chart with Labels */}
          <div className="flex-1 bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-200 flex items-center justify-between">
            <div>
              <p className=" text-gray-600 text-xl mb-1">Attendance</p>
              <p className="text-green-600">Present: {details.filter((emp) => emp.Status === "Present").length}</p>
              <p className="text-red-500">Absent: {details.filter((emp) => emp.Status === "Absent").length}</p>
            </div>
            
            <PieChart width={120} height={120}>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={30}
                outerRadius={50}
                paddingAngle={3}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>
        </div>
      </div>

      <div className="flex gap-4 justify-between">
        <div>
          {/* Day and Date Picker */}
          <label className="block text-sm font-medium mt-10"></label>
          <input
            type="date"
            className="pw-[250px] pl-10 pr-4 py-3 bg-white/70 border border-white/20 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-transparent transition-all duration-200 "
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          {selectedDate && <p className="text-sm mt-1 text-gray-600">You selected: {selectedDate}</p>}
        </div>
        {/* Search */}
        <div className="relative max-w-md mt-10 w-96 ">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            <CiSearch size={20} />
          </span>
          <input
            type="search"
            placeholder="Search by Name, Designation or Status"
            className="pl-10 pr-4 py-3 bg-white/70 border border-white/20 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-transparent transition-all duration-200 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {/* Designation filter - Custom Dropdown */}
        <div className="relative max-w-md mt-4" ref={designationDropdownRef}>
          <label className="flex items-center gap-2 text-sm font-medium mb-6"></label>
          <button
            onClick={() => setShowDesignationDropdown(!showDesignationDropdown)}
            className="pl-10 pr-4 py-3 bg-white/70 border border-white/20 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-transparent transition-all duration-200 w-full text-left flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <FaBriefcase className="text-gray-400" />
              {designationFilter || "Designation"}
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
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto scrollbar-hide">
              <div
                onClick={() => {
                  setDesignationFilter("")
                  setShowDesignationDropdown(false)
                }}
                className="px-4 py-3 cursor-pointer hover:bg-teal-100 hover:text-teal-800 transition-colors duration-200 flex items-center gap-2"
              >
                <FaBriefcase className="text-gray-400" />
                All
              </div>
              {designations.map((designation, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setDesignationFilter(designation)
                    setShowDesignationDropdown(false)
                  }}
                  className="px-4 py-3 cursor-pointer hover:bg-teal-100 hover:text-teal-800 transition-colors duration-200 "
                >
                  {designation}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Table Section */}
      <div className="overflow-x-auto rounded-xl">
        <table className="min-w-full bg-white border rounded shadow-md">
          <thead className="bg-[#006666] text-white">
            <tr>
              <th className="px-6 py-4 text-left">ID</th>
              <th className="px-6 py-4 text-left">Name</th>
              <th className="px-6 py-4  text-left">Designation</th>
              <th className="px-6 py-4  text-left">Status</th>
              <th className="px-6 py-4  text-left">Check In</th>
              <th className="px-6 py-4  text-left">Check Out</th>
              <th className="px-6 py-4  text-left">Duration</th>
            </tr>
          </thead>
          <tbody>
                {paginatedDetails.map((item) => (
                <tr
          key={item.ID}
          className="hover:bg-gray-100 cursor-pointer transition duration-200"
          onClick={() => handleClick(item)}  // Navigate here
        >

                <td className="px-4 py-2">{item.ID}</td>
                <td className="px-4 py-2">
                  <div className="flex items-center gap-2">
                    {/* Initial Circle */}
                    <div className="w-8 h-8 rounded-full bg-teal-500 text-white flex items-center justify-center text-sm font-semibold">
                      {item.Name?.charAt(0).toUpperCase()}
                    </div>

                    {/* Name */}
                    <span>{item.Name}</span>
                  </div>
                </td>

                <td className="px-4 py-2">{item.Designation}</td>
                <td
                  className={`px-4 py-2 font-semibold ${item.Status === "Present" ? "text-green-600" : "text-red-500"}`}
                >
                  {item.Status}
                </td>
                <td className="px-4 py-2">{item.CheckIn}</td>
                <td className="px-4 py-2">{item.CheckOut}</td>
                <td className="px-4 py-2">{item.Duration}</td>
              </tr>
            ))}
          </tbody>
        </table>


        {/* Pagination Controls */}
        <div className="flex justify-end mt-4 space-x-2">
          {/* Previous Button with Icon */}
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 rounded-full bg-white/60 text-slate-700 hover:bg-white/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 border border-white/20"
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
              className={`px-3 py-2 rounded-full transition-all duration-200 border ${
                currentPage === index + 1
                  ? "bg-[#006666] text-white shadow-lg border-none"
                  : "bg-white/60 text-slate-700 hover:bg-white/80 border-white/20"
              }`}
            >
              {index + 1}
            </button>
          ))}

          {/* Next Button with Icon */}
          <button
            onClick={() =>
              setCurrentPage((prev) => (prev < Math.ceil(filteredDetails.length / rowsPerPage) ? prev + 1 : prev))
            }
            disabled={currentPage >= Math.ceil(filteredDetails.length / rowsPerPage)}
            className="px-3 py-2 rounded-full bg-white/60 text-slate-700 hover:bg-white/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 border border-white/20"
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
  )
}

export default Attendance
