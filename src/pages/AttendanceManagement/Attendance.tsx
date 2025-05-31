import React, { useState,useEffect } from 'react';
import {PieChart, Pie, Cell, Tooltip, Legend} from 'recharts';
import { CiSearch } from "react-icons/ci";
import { FaBriefcase } from 'react-icons/fa';
import { IoIosPeople } from "react-icons/io";



const Attendance: React.FC = () => {
  const [value, setValue] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
   
  const details = [
    {ID: 'JD01',Name: 'Hema',Designation: 'Junior Developer',Status: 'Present',CheckIn: '9:30 am',CheckOut: '6:30pm',Duration: '9h'},
    {ID: 'D02',Name: 'Priya',Designation: 'Designer',Status: 'Absent',CheckIn: '-',CheckOut: '-',Duration: '0h'},
    {ID: 'TL03',Name: 'Nila',Designation: 'TL',Status: 'Present',CheckIn: '9:30 am',CheckOut: '6:30 pm',Duration: '9h'},
     {ID: 'SD04',Name: 'Dev',Designation: 'Senior Developer',Status: 'Present',CheckIn: '9:30 am',CheckOut: '6:30 pm',Duration: '9h'},
     {ID: 'M05',Name: 'Karen',Designation: 'Marketing',Status: 'Present',CheckIn: '9:30 am',CheckOut: '6:30 pm',Duration: '9h'},
    {ID: 'SD06',Name: 'Wilson',Designation: 'Senior Developer',Status: 'Present',CheckIn: '9:30 am',CheckOut: '6:30 pm',Duration: '9h'},
    { ID: 'JD07',Name: 'Kia',Designation: 'Junior Developer',Status: 'Present',CheckIn: '9:30 am',CheckOut: '6:30 pm',Duration: '9h'},
    {ID: 'M08', Name: 'Sam',Designation: 'Marketing',Status: 'Present',CheckIn: '9:30 am',CheckOut: '6:30 pm', Duration: '9h'},
    {ID: 'A09', Name: 'Kim',Designation: 'Admin',Status: 'Present',CheckIn: '9:30 am',CheckOut: '6:30 pm', Duration: '9h'},
    {ID: 'A10', Name: 'Kook',Designation: 'Admin',Status: 'Absent',CheckIn: '-',CheckOut: '-', Duration: '0h'},
    {ID: 'A11', Name: 'Kanna',Designation: 'Junior Developer',Status: 'Absent',CheckIn: '-',CheckOut: '-', Duration: '0h'},
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
  const presentCount = details.filter(d => d.Status === 'Present').length;
  const absentCount = details.filter(d => d.Status === 'Absent').length;
  const chartData = [
    { name: 'Present', value: presentCount },
    { name: 'Absent', value: absentCount }
  ];
  const COLORS = ['#00C49F', '#FF8042'];
  // Designation filter
  const [designationFilter, setDesignationFilter] = useState("");
  const designations = Array.from(new Set(details.map(d => d.Designation)));


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
    <div className="p-6 space-y-6 min-h-screen">
      <div className="">
  {/* Top Section */}
  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
    
    {/* Left: No of Employees Card */}
    <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow border border-b-[#006666] hover:scale-103 transition-transform duration-300 ">
      <div >
        <p className="text-md font-bold ">No Of Employees: {details.length}</p>
      </div>
      <div>
        <IoIosPeople size={50} className="text-green-600" />
      </div>
    </div>

    {/* Right: Pie Chart with Labels */}
    <div className="flex items-center gap-6 bg-white p-4 rounded-lg shadow hover:scale-103 transition-transform duration-100">
      <div>
        <p className="text-lg font-semibold mb-1">Attendance</p>
        <p className="text-[#00C49F]">Present: {details.filter(emp => emp.Status === 'Present').length}</p>
        <p className="text-[#FF8042]">Absent: {details.filter(emp => emp.Status === 'Absent').length}</p>
      </div>
      <div className=''>
        <PieChart width={180} height={180}>
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
</div>

      <div className='flex gap-4 justify-between'>
        <div>
          {/* Day and Date Picker */}
            <label className="block text-sm font-medium mt-10"></label>
            <input
              type="date"
              className="p-2 border border-[#006666] rounded-full shadow-sm hover:scale-103 transition-transform duration-200"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
            {selectedDate && <p className="text-sm mt-1 text-gray-600">You selected: {selectedDate}</p>}
          </div>
              {/* Serach */}
       <div className="relative max-w-md mt-10 w-96 hover:scale-103 transition-transform duration-200 ">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            <CiSearch size={20} />
          </span>
          <input
            type="search"
            placeholder="Search by Name, Desgination  or Status"
            className="pl-10 pr-4 py-2 w-full border rounded-full shadow border-[#006666] focus:outline-none focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {/* Designation filter */}
         <div  className="relative max-w-md mt-4 hover:scale-103 transition-transform duration-200">
        <label className="flex items-center gap-2 text-sm font-medium mb-6">
        </label>
        <select
          value={designationFilter}
          onChange={(e) => setDesignationFilter(e.target.value)}
            className="p-2 border border-[#006666] focus-outline-none rounded-full shadow-sm w-60"
            >
      <option value="" className='text-gray-300'> <FaBriefcase className="text-gray-300" />Designation</option>
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
                <td className={`px-4 py-2 font-semibold ${
                  item.Status === 'Present' ? 'text-green-600' : 'text-red-500'
                  }`}>
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
      currentPage === 1 ? "bg-gray-300" : "bg-teal-500 text-white hover:bg-teal-600"
    }`}
  >
    Prev
  </button>

  {/* Page Numbers */}
  {Array.from({ length: Math.ceil(filteredDetails.length / rowsPerPage) }, (_, index) => (
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
  ))}

  <button
    onClick={() =>
      setCurrentPage((prev) =>
        prev < Math.ceil(filteredDetails.length / rowsPerPage) ? prev + 1 : prev
      )
    }
    disabled={currentPage >= Math.ceil(filteredDetails.length / rowsPerPage)}
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
