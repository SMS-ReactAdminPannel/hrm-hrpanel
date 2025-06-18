import React, { useState } from 'react';
import { CiFilter } from 'react-icons/ci';
import { RiDeleteBinLine } from 'react-icons/ri';
import { FaEdit } from 'react-icons/fa';
import { FONTS } from '../../constants/uiConstants';

type Department = 'Engineering' | 'Marketing' | 'HR' | 'Finance' | 'Operations';
type JobTitle = 'Manager' | 'Developer' | 'Designer' | 'Analyst' | 'Specialist';
type EmploymentType = 'Full-time' | 'Part-time' | 'Contract' | 'Intern';

interface Employee {
  id: string;
  name: string;
  email: string;
  contactNumber: string;
  department: Department;
  jobTitle: JobTitle;
  hireDate: string;
  employmentType: EmploymentType;
}

const EmployeeManagement = () => {
  const initialEmployees: Employee[] = [
    { id: 'EMP001', name: 'Sowmiya', email: 'sowmiya.doe@example.com', contactNumber: '7262768293', department: 'Engineering', jobTitle: 'Developer', hireDate: '2020-05-15', employmentType: 'Full-time' },
    { id: 'EMP002', name: 'Suruthi', email: 'suruthi.smith@example.com', contactNumber: '5552345678', department: 'Marketing', jobTitle: 'Manager', hireDate: '2019-08-22', employmentType: 'Full-time' },
    { id: 'EMP003', name: 'Wikki', email: 'wikki.j@example.com', contactNumber: '5553456789', department: 'HR', jobTitle: 'Specialist', hireDate: '2021-01-10', employmentType: 'Part-time' },
    { id: 'EMP004', name: 'Siva Shankar', email: 'siva.d@example.com', contactNumber: '5554567890', department: 'Finance', jobTitle: 'Analyst', hireDate: '2020-11-05', employmentType: 'Full-time' },
    { id: 'EMP005', name: 'Surya', email: 'surya.b@example.com', contactNumber: '5555678901', department: 'Operations', jobTitle: 'Manager', hireDate: '2018-03-18', employmentType: 'Full-time' },
    { id: 'EMP006', name: 'Rajesh', email: 'rajesh.w@example.com', contactNumber: '5556789012', department: 'Engineering', jobTitle: 'Designer', hireDate: '2022-04-01', employmentType: 'Contract' },
    { id: 'EMP007', name: 'Muthu Vel', email: 'muthu.l@example.com', contactNumber: '5557890123', department: 'Finance', jobTitle: 'Analyst', hireDate: '2017-12-12', employmentType: 'Full-time' },
    { id: 'EMP008', name: 'Vetri Vel', email: 'vetri.t@example.com', contactNumber: '5558901234', department: 'HR', jobTitle: 'Manager', hireDate: '2016-07-19', employmentType: 'Full-time' },
    { id: 'EMP009', name: 'James White', email: 'james.w@example.com', contactNumber: '5559012345', department: 'Marketing', jobTitle: 'Designer', hireDate: '2023-01-10', employmentType: 'Intern' },
    { id: 'EMP010', name: 'Susan Harris', email: 'susan.h@example.com', contactNumber: '5550123456', department: 'Engineering', jobTitle: 'Developer', hireDate: '2022-10-05', employmentType: 'Full-time' },
  ];

  const [employees] = useState<Employee[]>(initialEmployees);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: keyof Employee; direction: 'ascending' | 'descending' } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | ''>('');
  const [errors, setErrors] = useState<Record<string, string>>({});


  const itemsPerPage = 5;

  const requestSort = (key: keyof Employee) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortedAndFilteredEmployees = () => {
    let filtered = employees.filter((employee) => {
      const matchesSearch = Object.values(employee).some(
        (value) => typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
      );
      const matchesDepartment = selectedDepartment ? employee.department === selectedDepartment : true;
      return matchesSearch && matchesDepartment;
    });

    if (sortConfig !== null) {
      filtered.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'ascending' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  };

  const filteredEmployees = getSortedAndFilteredEmployees();
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const paginatedEmployees = filteredEmployees.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getEmploymentTypeColor = (type: EmploymentType) => {
    switch (type) {
      case 'Full-time': return 'bg-green-100 text-green-800';
      case 'Part-time': return 'bg-blue-100 text-blue-800';
      case 'Contract': return 'bg-purple-100 text-purple-800';
      case 'Intern': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const workModeData = [
    { name: 'Remote', value: 4 },
    { name: 'Hybrid', value: 3 },
    { name: 'On-site', value: 3 },
  ];

  const [showAddForm, setShowAddForm] = useState(false);

// Define departments array for dropdown
const departments = [
  { _id: '1', name: 'Engineering' },
  { _id: '2', name: 'Marketing' },
  { _id: '3', name: 'HR' },
  { _id: '4', name: 'Finance' },
  { _id: '5', name: 'Operations' },
];

const [newEmployee, setNewEmployee] = useState<Employee>({
  id: '',
  name: '',
  email: '',
  contactNumber: '',
  department: 'Engineering',
  jobTitle: 'Manager',
  hireDate: '',
  employmentType: 'Full-time',
});


  return (
    <div className="container mx-auto  py-2">
  <div className="flex justify-between items-center mb-6">
    <h1 className="text-black" style={FONTS.header}>Employee</h1>
    <button
      onClick={() => setShowAddForm(true)}
      className="bg-[#006666] hover:bg-teal-700 text-white px-4 py-2 rounded-md shadow-md"
      style={{fontSize:FONTS.paragraph.fontSize}}
    >
      + Add Employee
    </button>
  </div>
      
      
  {/* Total Employees */}
  <div className="grid grid-cols-4 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
       <div className="bg-[#eff4f5] w-full max-w-md rounded-lg p-4 pt-5 shadow-sm border
        border-gray-100 hover:shadow-md transition-all duration-200 mx-auto ">
           <div className="flex items-center justify-between">
             <div>
              <p className="text-sm font-medium text-black mb-1"
               style={{fontSize:FONTS.paragraph.fontSize}}>Total Employees</p>
               <p className="text-5xl font-semibold text-indigo-600 mt-3">{employees.length}</p>
               <p className="text-xs text-black mt-5">Across all departments</p>
             </div>
             <div className="p-3 rounded-lg bg-indigo-50">
               <svg className="w-6 h-6 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                 <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-1a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v1h-3zM4.75 12.094A5.973 5.973 0 004 15v1H1v-1a3 3 0 013.75-2.906z" />
               </svg>
             </div>
           </div>
         </div>

  {/* New Employees */}
 <div className="bg-[#eff4f5] w-full max-w-md rounded-lg p-4 pt-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 mx-auto">
          <div className="flex items-center justify-between">
             <div>
              <p className="text-sm font-medium text-black mb-1"
                style={{ fontSize: FONTS.paragraph.fontSize }}>New Employees</p>
               <p className="text-5xl font-semibold text-emerald-600 mt-3">
                 {employees.filter(emp => {
                  const hireDate = new Date(emp.hireDate);
                  const thirtyDaysAgo = new Date();
                  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
                  return hireDate >= thirtyDaysAgo;
                }).length}
              </p>
              <p className="text-xs text-black mt-5">Last 30 days</p>
            </div>
            <div className="p-3 rounded-lg bg-emerald-50">
              <svg className="w-6 h-6 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>


  {/* Resigned Employees */}
  <div className="bg-[#eff4f5] w-full max-w-md rounded-lg p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 mx-auto">
           <div className="flex items-center justify-between">
             <div>
              <p className="text-sm font-medium text-black mb-1"
                style={{ fontSize: FONTS.paragraph.fontSize }}>Resigned Employees</p>
               <p className="text-5xl font-semibold text-amber-600 mt-3">0</p>
              <p className="text-xs text-black mt-5">This quarter</p>
             </div>
             <div className="p-3 rounded-lg bg-amber-50">
               <svg className="w-6 h-6 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
               </svg>
             </div>
           </div>
         </div>

  {/* Work Mode Stats */}
  <div className="bg-[#eff4f5] p-4 rounded shadow border">
          <h3 className="text-lg font-semibold text-black mb-4"
            style={{ fontSize: FONTS.paragraph.fontSize }}>Work Mode Stats</h3>
    {workModeData.map((mode, index) => (
      <div key={mode.name} className="flex justify-between items-center mb-2">
        <span className="text-sm">{mode.name}</span>
        <div className="w-24 bg-gray-200 rounded-full h-2 relative">
          <div
            className="h-2 rounded-full"
            style={{
              width: `${(mode.value / 10) * 100}%`,
              backgroundColor: COLORS[index],
            }}
          />
        </div>
        <span className="text-sm font-semibold ml-2">{mode.value}</span>
      </div>
    ))}
  </div>
</div>


      {/* Search, Filter, and Table */}
      <div className="mb-6 flex justify-between items-center gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search employees..."
            className="w-100 pl-10 pr-4 py-2 border bg-gray-300 rounded-lg"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
          <svg className="absolute left-3 top-3 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <div className="relative">
          <CiFilter className="text-3xl  bg-[#006666] text-white cursor-pointer" onClick={() => setFilterOpen(!filterOpen)} />
          {filterOpen && (
            <div className="absolute right-0 mt-2 bg-white border rounded shadow w-48 z-10">
              <select
                value={selectedDepartment}
                onChange={(e) => {
                  setSelectedDepartment(e.target.value as Department | '');
                  setCurrentPage(1);
                  setFilterOpen(false);
                }}
                className="w-full p-2 text-sm"
              >
                <option value="">All Departments</option>
                {['Engineering', 'Marketing', 'HR', 'Finance', 'Operations'].map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#eff4f5] rounded shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#006666] text-md">
            <tr>
              {['id', 'name', 'email', 'department', 'jobTitle', 'employmentType'].map((key) => (
                <th
                  key={key}
                  className="px-4 py-3 text-left text-md font-medium text-white uppercase cursor-pointer"
                  style={{fontSize:FONTS.paragraph.fontSize}}
                  onClick={() => requestSort(key as keyof Employee)}
                >
                  {key}
                  {sortConfig?.key === key && (sortConfig.direction === 'ascending' ? ' ↑' : ' ↓')}
                </th>
              ))}
              <th className="px-4 py-2 text-left text-md text-white">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedEmployees.map((emp) => (
              <tr key={emp.id}>
                <td className="px-4 py-5 text-sm">{emp.id}</td>
                <td className="px-4 py-2  text-sm">
                  
                  {emp.name}
                </td>
                <td className="px-4 py-2 text-sm">{emp.email}</td>
                <td className="px-4 py-2 text-sm">{emp.department}</td>
                <td className="px-4 py-2 text-sm">{emp.jobTitle}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${getEmploymentTypeColor(emp.employmentType)}`}>
                    {emp.employmentType}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <button className="text-blue-600 "><FaEdit /></button>
                  <button className="text-red-600 ml-3 "><RiDeleteBinLine /></button>
                </td>
              </tr>
            ))}
            {paginatedEmployees.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-2 text-center text-gray-500">No employees found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-xl shadow-lg relative">
        <h2 className="text-xl font-semibold mb-4">Add New Employee</h2>

        <div className="grid grid-cols-2 gap-4">
          {['id', 'name', 'email', 'contactNumber', 'hireDate'].map((field) => (
            <div key={field} className="flex flex-col">
              <input
                type={field === 'hireDate' ? 'date' : 'text'}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={(newEmployee as any)[field]}
                onChange={(e) => {
                  setNewEmployee({ ...newEmployee, [field]: e.target.value });
                }}
                className={`border rounded p-2 ${errors[field] ? "border-red-500" : ""}`}
              />
              {errors[field] && (
                <span className="text-sm text-red-500">{errors[field]}</span>
              )}
            </div>
          ))}

          {/* 🔽 Department Dropdown - Dynamic */}
          <div className="flex flex-col">
            <select
              value={newEmployee.department}
              onChange={(e) => {
                setNewEmployee({ ...newEmployee, department: e.target.value as Department });
                setErrors({ ...errors, department: "" });
              }}
              className={`border rounded p-2 ${errors.department ? "border-red-500" : ""}`}
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept._id} value={dept.name}>
                  {dept.name}
                </option>
              ))}
            </select>
            {errors.department && (
              <span className="text-sm text-red-500">{errors.department}</span>
            )}
          </div>

          {/* Job Title */}
          <div className="flex flex-col">
            <select
              value={newEmployee.jobTitle}
              onChange={(e) => {
                setNewEmployee({ ...newEmployee, jobTitle: e.target.value as JobTitle });
                setErrors({ ...errors, jobTitle: "" });
              }}
              className={`border rounded p-2 ${errors.jobTitle ? "border-red-500" : ""}`}
            >
              <option value="">Select Job Title</option>
              {['Manager', 'Developer', 'Designer', 'Analyst', 'Specialist'].map((job) => (
                <option key={job}>{job}</option>
              ))}
            </select>
            {errors.jobTitle && (
              <span className="text-sm text-red-500">{errors.jobTitle}</span>
            )}
          </div>

          {/* Employment Type */}
          <div className="flex flex-col">
            <select
              value={newEmployee.employmentType}
              onChange={(e) => {
                setNewEmployee({ ...newEmployee, employmentType: e.target.value as EmploymentType });
                setErrors({ ...errors, employmentType: "" });
              }}
              className={`border rounded p-2 ${errors.employmentType ? "border-red-500" : ""}`}
            >
              <option value="">Select Employment Type</option>
              {['Full-time', 'Part-time', 'Contract', 'Intern'].map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
            {errors.employmentType && (
              <span className="text-sm text-red-500">{errors.employmentType}</span>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            className="bg-gray-300 text-black px-4 py-2 rounded"
            onClick={() => setShowAddForm(false)}
          >
            Cancel
          </button>
          <button
            className="bg-[#006666] text-white px-4 py-2 rounded"
            onClick={() => {
              const newErrors: Record<string, string> = {};
              const requiredFields = [
                'id',
                'name',
                'email',
                'contactNumber',
                'hireDate',
                'department',
                'jobTitle',
                'employmentType',
              ];

              requiredFields.forEach((field) => {
                if (!(newEmployee as any)[field]?.trim?.()) {
                  newErrors[field] = `${field} is required`;
                }
              });

              if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
                return;
              }

              // Simulate add
              console.log('Add:', newEmployee);
              setShowAddForm(false);
            }}
          >
            Add
          </button>
        </div>
      </div>
  </div>
)}



      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 border bg-white text-black rounded mx-1 disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border bg-[#006666] text-white rounded mx-1 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EmployeeManagement;
