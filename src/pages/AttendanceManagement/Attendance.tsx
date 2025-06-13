import React, { useState, useEffect } from "react"
import { PieChart, Pie, Cell, Tooltip } from "recharts"
import { CiSearch } from "react-icons/ci"
import { FaBriefcase } from "react-icons/fa"
import { IoIosPeople } from "react-icons/io"
import { MdTimer } from "react-icons/md"
import { useNavigate } from "react-router-dom";
import { FONTS } from "../../constants/uiConstants"

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


     const handleClick = (employee: EmployeeDetail) => {
  navigate("/attendance-id", { state: { employee } });
};
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
 

  return (
    
    <div className=" space-y-6 min-h-screen w-full px-5 py-5">
      <div>
        <p className=" font-bold bg-black bg-clip-text text-transparent mt-2 
        leading-relaxed pb-1 font-family-poppins"
        style={{fontSize:FONTS.header.fontSize}}>
          Attendance 
        </p>
      </div>
      <div>
        {/* Top Section */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Left: No of Employees Card */}
          <div className="flex-1 bg-gray-100 backdrop-blur-sm rounded-lg p-6 shadow border border-white/20  transition-all duration-200 flex items-center h-32 justify-between ">
            <div>
              <p className=" text-sm font medium truncate text-gray-500 font-family-poppins  ">No Of Employees</p>
              <p className="text-sm font-bold text-gray-900">{details.length}</p>
            </div>
            <IoIosPeople className="w-10 h-10 text-green-600" />
          </div>
          <div className="flex-1 bg-gray-100 backdrop-blur-sm rounded-lg p-6 shadow border border-white/20  transition-all duration-200 flex items-center h-32 justify-between">
            <div>
              <p className="text-sm font medium truncate text-gray-500 font-family-poppins">Total Duration</p>
              <p className="text-sm font-bold text-gray-900">9 Hrs</p>
            </div>
            <MdTimer className="w-10 h-10 text-red-600" />
          </div>
          <div className="flex-1 bg-gray-100 backdrop-blur-sm rounded-lg p-6 shadow border border-white/20  transition-all duration-200 flex items-center justify-between">
  {/* Permission Summary Card */}
  <div className=" cursor-pointer flex justify-between items-center max-w-sm " onClick={() => setIsOpen(true)}>
    <div>
      <p className="text-gray-600 text-sm">Permission</p>
      <p className="text-xm font-bold">{dummyData.length}</p>
    </div>
    <MdTimer className="w-10 h-10 text-yellow-400 ml-16" />
  </div>
</div>
          
          {/* Right: Pie Chart with Labels */}
          <div className="bg-gray-100 flex-1  backdrop-blur-sm rounded-lg p-6 shadow border border-white/20  transition-all duration-200 flex items-center justify-between h-32">
            <div>
              <p className=" text-gray-600 text-sm mb-1">Attendance</p>
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
                {chartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>
        </div>
      </div>

    <div className="flex justify-between items-center">
  {/* Date Picker */}
  <div>
    <input
      type="date"
      className="pw-[250px] pl-8 px-4 py-2 bg-gray-200 border border-white/20 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-teal-500/50 font-family-poppins focus:border-transparent transition-all duration-200"
      value={selectedDate}
      onChange={(e) => setSelectedDate(e.target.value)}
    />
  </div>

  {/* Search - Centered */}
  <div className="relative max-w-md w-96">
    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
      <CiSearch size={20} />
    </span>
    <input
      type="search"
      placeholder="Search by Name, Designation or Status"
      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-200 
      placeholder-gray-500 focus:outline-none font-family-poppins focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  </div>

  {/* Designation Dropdown - Right-aligned */}
  <div className="relative w-48 bg" ref={designationDropdownRef}> {/* Reduced width */}
    <button
      onClick={() => setShowDesignationDropdown(!showDesignationDropdown)}
      className="w-full pl-3 pr-4 py-2 bg-gray-200 border border-gray-300 rounded-md shadow-sm text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-transparent"
    >
      <span className="flex items-center gap-2 truncate">
        <FaBriefcase className="text-gray-400 flex-shrink-0" />
        <span className="truncate">{designationFilter || "All Designations"}</span>
      </span>
      <svg
        className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${showDesignationDropdown ? "rotate-180" : ""}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    {showDesignationDropdown && (
      <div className="absolute right-0 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
        <div
          onClick={() => {
            setDesignationFilter("");
            setShowDesignationDropdown(false);
          }}
          className={`px-4 py-2 cursor-pointer hover:bg-teal-100 hover:text-teal-800 transition-colors duration-200 ${
            !designationFilter ? "bg-teal-50 text-teal-800" : ""
          }`}
        >
          All Designations
        </div>
        {designations.map((designation, idx) => (
          <div
            key={idx}
            onClick={() => {
              setDesignationFilter(designation);
              setShowDesignationDropdown(false);
            }}
            className={`px-4 py-2 cursor-pointer hover:bg-teal-100 hover:text-teal-800 transition-colors duration-200 ${
              designationFilter === designation ? "bg-teal-50 text-teal-800" : ""
            }`}
          >
            {designation}
          </div>
        ))}
      </div>
    )}
  </div>
</div>
      {/* Table Section */}
      <div className="overflow-x-auto sm:rounded-md shadow">
        <table className="min-w-full  divide-y divide-gray-900">
          <thead className="bg-[#006666] text-white ">
            <tr style={{ fontSize: FONTS.header2.fontSize }}>
              <th className="px-6 py-5 text-left text-sm font-bold text-white  tracking-wider"
                style={{ fontSize: FONTS.paragraph.fontSize }}>ID</th>
              <th className="px-6 py-5 text-left text-sm font-bold text-white  tracking-wider"
                style={{ fontSize: FONTS.paragraph.fontSize }}>Name</th>
              <th className="px-6 py-5 text-left text-sm font-bold text-white  tracking-wider"
                style={{ fontSize: FONTS.paragraph.fontSize }}>Designation</th>
              <th className="px-6 py-5 text-left text-sm font-bold text-white  tracking-wider"
                style={{ fontSize: FONTS.paragraph.fontSize }}>Status</th>
              <th className="px-6 py-5 text-left text-sm font-bold text-white  tracking-wider"
                style={{ fontSize: FONTS.paragraph.fontSize }}>Check In</th>
              <th className="px-6 py-5 text-left text-sm font-bold text-white  tracking-wider"
                style={{ fontSize: FONTS.paragraph.fontSize }}>Check Out</th>
              <th className="px-6 py-5 text-left text-sm font-bold text-white  tracking-wider"
                style={{ fontSize: FONTS.paragraph.fontSize }}>Duration</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
                {paginatedDetails.map((item) => (
                <tr
          key={item.ID}
          className="hover:bg-gray-100 cursor-pointer transition duration-200"
          onClick={() => handleClick(item)}  // Navigate here
        >
                <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-900 text-left font-family-poppins">{item.ID}</td>
                <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-900 font-family-poppins">
                  <div className="flex items-center gap-2">
                    {/* Initial Circle */}
                        <div className="w-8 h-8 rounded-full bg-teal-500 text-white text-left flex items-center justify-center text-sm font-semibold">
                      {item.Name?.charAt(0).toUpperCase()}
                    </div>

                    {/* Name */}
                    <span>{item.Name}</span>
                  </div>
                </td>
                    <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-900 text-left font-family-poppinsr">{item.Designation}</td>
                 <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-900 font-family-poppins">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs  font-bold
                      ${item.Status === "Present" ? "bg-green-100 text-green-800 text-left" : "bg-red-100 text-red-800 text-left"}`}
                  >
                    {item.Status}
                  </span>
                </td>
                    <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-900 text-left font-family-poppins">{item.CheckIn}</td>
                    <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-900 text-left font-family-poppins">{item.CheckOut}</td>
                    <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-900 text-left font-family-poppinsr">{item.Duration}</td>
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
            className="px-3 py-2 rounded-full bg-gray-50 text-slate-700  disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 border border-white/20"
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
      {/* Permission Modal - positioned at root level */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Permission Requests</h2>
              <button onClick={() => setIsOpen(false)} className="text-gray-500 text-sm hover:text-gray-700">
                Close
              </button>
            </div>

            <div className="max-h-[400px] overflow-y-auto">
              {dummyData.map((person) => (
                <div key={person.id} className="border-b py-3 last:border-b-0">
                  <p className="font-semibold">{person.name}</p>
                  <p className="text-sm text-gray-500">{person.email}</p>
                  <p className="text-xs capitalize text-gray-400">{person.status}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Attendance