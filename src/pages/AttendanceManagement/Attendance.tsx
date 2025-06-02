import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { CiSearch } from "react-icons/ci";
import { FaBriefcase } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { MdTimer } from "react-icons/md";

const Attendance: React.FC = () => {
  const [value, setValue] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const details = [
    {
      ID: "JD01",
      Name: "Hema",
      Designation: "Junior Developer",
      Status: "Present",
      CheckIn: "9:30 am",
      CheckOut: "6:30pm",
      Duration: "9h",
    },
    {
      ID: "D02",
      Name: "Priya",
      Designation: "Designer",
      Status: "Absent",
      CheckIn: "-",
      CheckOut: "-",
      Duration: "0h",
    },
    {
      ID: "TL03",
      Name: "Nila",
      Designation: "TL",
      Status: "Present",
      CheckIn: "9:30 am",
      CheckOut: "6:30 pm",
      Duration: "9h",
    },
    {
      ID: "SD04",
      Name: "Dev",
      Designation: "Senior Developer",
      Status: "Present",
      CheckIn: "9:30 am",
      CheckOut: "6:30 pm",
      Duration: "9h",
    },
    {
      ID: "M05",
      Name: "Karen",
      Designation: "Marketing",
      Status: "Present",
      CheckIn: "9:30 am",
      CheckOut: "6:30 pm",
      Duration: "9h",
    },
    {
      ID: "SD06",
      Name: "Wilson",
      Designation: "Senior Developer",
      Status: "Present",
      CheckIn: "9:30 am",
      CheckOut: "6:30 pm",
      Duration: "9h",
    },
    {
      ID: "JD07",
      Name: "Kia",
      Designation: "Junior Developer",
      Status: "Present",
      CheckIn: "9:30 am",
      CheckOut: "6:30 pm",
      Duration: "9h",
    },
    {
      ID: "M08",
      Name: "Sam",
      Designation: "Marketing",
      Status: "Present",
      CheckIn: "9:30 am",
      CheckOut: "6:30 pm",
      Duration: "9h",
    },
    {
      ID: "A09",
      Name: "Kim",
      Designation: "Admin",
      Status: "Present",
      CheckIn: "9:30 am",
      CheckOut: "6:30 pm",
      Duration: "9h",
    },
    {
      ID: "A10",
      Name: "Kook",
      Designation: "Admin",
      Status: "Absent",
      CheckIn: "-",
      CheckOut: "-",
      Duration: "0h",
    },
    {
      ID: "A11",
      Name: "Kanna",
      Designation: "Junior Developer",
      Status: "Absent",
      CheckIn: "-",
      CheckOut: "-",
      Duration: "0h",
    },
  ];
  const [searchQuery, setSearchQuery] = useState("");
  const filtereddetails = details.filter((details) => {
    const query = searchQuery.trim().toLowerCase();
    return (
      details.Designation.toLowerCase().includes(query) ||
      details.Status.toLowerCase().includes(query) ||
      details.Name.toLowerCase().includes(query)
    );
  });
  // Donut
  const presentCount = details.filter((d) => d.Status === "Present").length;
  const absentCount = details.filter((d) => d.Status === "Absent").length;
  const chartData = [
    { name: "Present", value: presentCount },
    { name: "Absent", value: absentCount },
  ];
  const COLORS = ["#00C49F", "#FF8042"];
  // Designation filter
  const [designationFilter, setDesignationFilter] = useState("");
  const designations = Array.from(new Set(details.map((d) => d.Designation)));

  const filteredDetails = details.filter((item) => {
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      item.Designation.toLowerCase().includes(query) ||
      item.Status.toLowerCase().includes(query) ||
      item.Name.toLowerCase().includes(query);

    const matchesDesignation =
      designationFilter === "" || item.Designation === designationFilter;

    return matchesSearch && matchesDesignation;
  });
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const filteringDetails = details.filter((item) => {
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      item.Designation.toLowerCase().includes(query) ||
      item.Status.toLowerCase().includes(query) ||
      item.Name.toLowerCase().includes(query);

    const matchesDesignation =
      designationFilter === "" || item.Designation === designationFilter;

    return matchesSearch && matchesDesignation;
  });
  const paginatedDetails = filteredDetails.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, designationFilter]);

  return (
    <div className="p-6 space-y-6 min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-cyan-100">
      <div>
        <p className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-teal-800 to-cyan-800 bg-clip-text text-transparent mt-2 leading-relaxed pb-1">Attendance Management</p>
      </div>
      <div>
  {/* Top Section */}
  <div className="flex gap-6">
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
              <p className="text-slate-600 text-xl" >Total Duration</p>
        <p className="text-2xl font-bold text-slate-800">9 Hrs</p>
          </div>
        <MdTimer className="w-10 h-10 text-red-600"  />
        </div>
    {/* Right: Pie Chart with Labels */}
    <div className="flex-1 bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-200 flex items-center justify-between">
      <div>
        <p className="text-lg font-semibold mb-1">Attendance</p>
        <p className="text-green-600">
          Present:{" "}
          {details.filter((emp) => emp.Status === "Present").length}
        </p>
        <p className="text-red-500">
          Absent:{" "}
          {details.filter((emp) => emp.Status === "Absent").length}
        </p>
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
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
            />
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
            className="pw-[250px] pl-10 pr-4 py-3 bg-white/70  border border-white/20 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-transparent transition-all duration-200l-10 pr-4 py-2 w-full border rounded-full shadow border-[#006666] focus:outline-none focus:border-transparent"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          {selectedDate && (
            <p className="text-sm mt-1 text-gray-600">
              You selected: {selectedDate}
            </p>
          )}
        </div>
        {/* Serach */}
        <div className="relative max-w-md mt-10 w-96 hover:scale-103 transition-transform duration-200 ">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            <CiSearch size={20} />
          </span>
          <input
            type="search"
            placeholder="Search by Name, Desgination  or Status"
            className="pw-[250px] pl-10 pr-4 py-3 bg-white/70  border border-white/20 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-transparent transition-all duration-200l-10 pr-4 py-2 w-full border rounded-full shadow border-[#006666] focus:outline-none focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {/* Designation filter */}
        <div className="relative max-w-md mt-4 hover:scale-103 transition-transform duration-200">
          <label className="flex items-center gap-2 text-sm font-medium mb-6"></label>
          <select
            value={designationFilter}
            onChange={(e) => setDesignationFilter(e.target.value)}
            className="pw-[250px] pl-10 pr-4 py-3 bg-white/70  border border-white/20 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-transparent transition-all duration-200l-10 pr-4 py-2 w-full border rounded-full shadow border-[#006666] focus:outline-none focus:border-transparent"
          >
            <option value="" className="text-black">
              {" "}
              <FaBriefcase className="text-gray-300" />
              Designation
            </option>
            {designations.map((designation, idx) => (
              <option key={idx} value={designation}>
                {designation}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Table Section */}
      <div className="overflow-x-auto rounded-xl">
        <table className="min-w-full bg-white border rounded shadow-md">
          <thead className="bg-gradient-to-r from-teal-600 p-6 to-cyan-600 text-white">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Designation</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Check In</th>
              <th className="px-4 py-2 text-left">Check Out</th>
              <th className="px-4 py-2 text-left">Duration</th>
            </tr>
          </thead>
          <tbody>
            {paginatedDetails.map((item) => (
              <tr
                key={item.ID}
                className="hover:bg-gray-50 transition duration-200"
              >
                <td className="px-4 py-2">{item.ID}</td>
                <td className="px-4 py-2">{item.Name}</td>
                <td className="px-4 py-2">{item.Designation}</td>
                <td
                  className={`px-4 py-2 font-semibold ${
                    item.Status === "Present"
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
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
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-full ${
              currentPage === 1
                ? "bg-gray-300"
                : "bg-teal-500 text-white hover:bg-teal-600"
            }`}
          >
            Prev
          </button>

          {/* Page Numbers */}
          {Array.from(
            { length: Math.ceil(filteredDetails.length / rowsPerPage) },
            (_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-4 py-2 rounded-full ${
                  currentPage === index + 1
                    ? "bg-cyan-600 text-white"
                    : "bg-gray-200 hover:bg-cyan-300"
                }`}
              >
                {index + 1}
              </button>
            )
          )}

          <button
            onClick={() =>
              setCurrentPage((prev) =>
                prev < Math.ceil(filteredDetails.length / rowsPerPage)
                  ? prev + 1
                  : prev
              )
            }
            disabled={
              currentPage >= Math.ceil(filteredDetails.length / rowsPerPage)
            }
            className={`px-4 py-2 rounded-full ${
              currentPage >= Math.ceil(filteredDetails.length / rowsPerPage)
                ? "bg-gray-300"
                : "bg-teal-500 text-white hover:bg-teal-600"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Attendance;