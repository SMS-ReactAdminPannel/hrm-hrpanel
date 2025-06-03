import { useState } from 'react';
import { CiFilter } from 'react-icons/ci';
import { RiDeleteBinLine } from "react-icons/ri";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FaEdit } from "react-icons/fa";

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
    {
      id: 'EMP001',
      name: 'Sowmiya',
      email: 'sowmiya.doe@example.com',
      contactNumber: '7262768293',
      department: 'Engineering',
      jobTitle: 'Developer',
      hireDate: '2020-05-15',
      employmentType: 'Full-time'
    },
    {
      id: 'EMP002',
      name: 'Suruthi',
      email: 'suruthi.smith@example.com',
      contactNumber: '5552345678',
      department: 'Marketing',
      jobTitle: 'Manager',
      hireDate: '2019-08-22',
      employmentType: 'Full-time'
    },
    {
      id: 'EMP003',
      name: 'Wikki',
      email: 'wikki.j@example.com',
      contactNumber: '5553456789',
      department: 'HR',
      jobTitle: 'Specialist',
      hireDate: '2021-01-10',
      employmentType: 'Part-time'
    },
    {
      id: 'EMP004',
      name: 'Siva Shankar',
      email: 'siva.d@example.com',
      contactNumber: '5554567890',
      department: 'Finance',
      jobTitle: 'Analyst',
      hireDate: '2020-11-05',
      employmentType: 'Full-time'
    },
    {
      id: 'EMP005',
      name: 'Surya',
      email: 'surya.b@example.com',
      contactNumber: '5555678901',
      department: 'Operations',
      jobTitle: 'Manager',
      hireDate: '2018-03-18',
      employmentType: 'Full-time'
    },
    {
      id: 'EMP006',
      name: 'Rajesh',
      email: 'rajesh.w@example.com',
      contactNumber: '5556789012',
      department: 'Engineering',
      jobTitle: 'Designer',
      hireDate: '2022-04-01',
      employmentType: 'Contract'
    },
    {
      id: 'EMP007',
      name: 'Muthu Vel',
      email: 'muthu.l@example.com',
      contactNumber: '5557890123',
      department: 'Finance',
      jobTitle: 'Analyst',
      hireDate: '2017-12-12',
      employmentType: 'Full-time'
    },
    {
      id: 'EMP008',
      name: 'Vetri Vel',
      email: 'vetri.t@example.com',
      contactNumber: '5558901234',
      department: 'HR',
      jobTitle: 'Manager',
      hireDate: '2016-07-19',
      employmentType: 'Full-time'
    },
    {
      id: 'EMP009',
      name: 'James White',
      email: 'james.w@example.com',
      contactNumber: '5559012345',
      department: 'Marketing',
      jobTitle: 'Designer',
      hireDate: '2023-01-10',
      employmentType: 'Intern'
    },
    {
      id: 'EMP010',
      name: 'Susan Harris',
      email: 'susan.h@example.com',
      contactNumber: '5550123456',
      department: 'Engineering',
      jobTitle: 'Developer',
      hireDate: '2022-10-05',
      employmentType: 'Full-time'
    },
  ];

  const [employees] = useState<Employee[]>(initialEmployees);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Employee;
    direction: 'ascending' | 'descending';
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | ''>('');

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
        (value) =>
          typeof value === 'string' &&
          value.toLowerCase().includes(searchTerm.toLowerCase())
      );

      const matchesDepartment = selectedDepartment
        ? employee.department === selectedDepartment
        : true;

      return matchesSearch && matchesDepartment;
    });

    if (sortConfig !== null) {
      filtered.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  };

  const filteredEmployees = getSortedAndFilteredEmployees();
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Get count by department for the card
  const getDepartmentCounts = () => {
    const counts: Record<string, number> = {};
    employees.forEach((employee) => {
      counts[employee.department] = (counts[employee.department] || 0) + 1;
    });
    return counts;
  };

  const departmentCounts = getDepartmentCounts();

  // Get employment type color
  const getEmploymentTypeColor = (type: EmploymentType) => {
    switch (type) {
      case 'Full-time':
        return 'bg-green-100 text-green-800';
      case 'Part-time':
        return 'bg-blue-100 text-blue-800';
      case 'Contract':
        return 'bg-purple-100 text-purple-800';
      case 'Intern':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get department data for charts
  const getDepartmentData = () => {
    const counts: Record<string, number> = {};
    employees.forEach((employee) => {
      counts[employee.department] = (counts[employee.department] || 0) + 1;
    });
    return Object.entries(counts).map(([department, count]) => ({
      name: department,
      value: count,
      percentage: Math.round((count / employees.length) * 100)
    }));
  };

  // Get employment type data
  const getEmploymentTypeData = () => {
    const counts: Record<string, number> = {};
    employees.forEach((employee) => {
      counts[employee.employmentType] = (counts[employee.employmentType] || 0) + 1;
    });
    return Object.entries(counts).map(([type, count]) => ({
      type,
      count
    }));
  };

  // Get work mode data (simulated data for Remote, Hybrid, On-site)
  const getWorkModeData = () => {
    return [
      { name: 'Remote', value: 4 },
      { name: 'Hybrid', value: 3 },
      { name: 'On-site', value: 3 }
    ];
  };

  const departmentData = getDepartmentData();
  const employmentTypeData = getEmploymentTypeData();
  const workModeData = getWorkModeData();

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Employee Management </h1>

      {/* Stats Cards */}
      <div className="w-full grid grid-cols-3 md:grid-cols-3 gap-4 mb-8">
        {/* Total Employees Card */}
        <div className="bg-white w-full max-w-md rounded-lg p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Total Employees</p>
              <p className="text-2xl font-semibold text-indigo-600">{employees.length}</p>
              <p className="text-xs text-gray-400 mt-1">Across all departments</p>
            </div>
            <div className="p-3 rounded-lg bg-indigo-50">
              <svg className="w-6 h-6 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-1a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v1h-3zM4.75 12.094A5.973 5.973 0 004 15v1H1v-1a3 3 0 013.75-2.906z" />
              </svg>
            </div>
          </div>
        </div>

        {/* New Employees Card */}
        <div className="bg-white w-full max-w-md rounded-lg p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">New Employees</p>
              <p className="text-2xl font-semibold text-emerald-600">
                {employees.filter(emp => {
                  const hireDate = new Date(emp.hireDate);
                  const thirtyDaysAgo = new Date();
                  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
                  return hireDate >= thirtyDaysAgo;
                }).length}
              </p>
              <p className="text-xs text-gray-400 mt-1">Last 30 days</p>
            </div>
            <div className="p-3 rounded-lg bg-emerald-50">
              <svg className="w-6 h-6 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        {/* Resigned Employees Card */}
        <div className="bg-white w-full max-w-md rounded-lg p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Resigned Employees</p>
              <p className="text-2xl font-semibold text-amber-600">0</p>
              <p className="text-xs text-gray-400 mt-1">This quarter</p>
            </div>
            <div className="p-3 rounded-lg bg-amber-50">
              <svg className="w-6 h-6 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area with Table and Charts */}
      <div className="grid grid-cols-3 lg:grid-cols-3  gap-6">
        {/* Left Side - Table */}
        <div className="lg:col-span-2">
          {/* Search and Add Employee */}
          <div className="mb-6 flex flex-row justify-between items-center gap- relative">
            <div className="relative flex-1 min-w-0">
              <input
                type="text"
                placeholder="Search employees..."
                className="w-100 pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            {/* Filter Icon and Dropdown */}
            <div className="flex-shrink-0 flex items-center pl-2 gap-4 relative">
              <div
                className="text-3xl text-[#006666] cursor-pointer"
                onClick={() => setFilterOpen(!filterOpen)}
              >
                <CiFilter />
              </div>

              <button className="bg-[#006666] hover:bg-[#006666]/90 text-white px-8 py-2 rounded-lg transition duration-200 -mr-12 ">
                Add Employee
              </button>
{/* Dropdown */}
              {filterOpen && (
                <div className="absolute right-0 top-12 bg-white border border-gray-300 rounded shadow-md z-10 w-48">
                  <div className="p-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Department
                    </label>
                    <select
                      value={selectedDepartment}
                      onChange={(e) => {
                        setSelectedDepartment(e.target.value as Department | '');
                        setCurrentPage(1);
                        setFilterOpen(false);
                      }}
                      className="w-full rounded px-2 py-1 text-sm focus:outline-none"
                    >
                      <option value="">All Departments</option>
                      {['Engineering', 'Marketing', 'HR', 'Finance', 'Operations'].map(
                        (dept) => (
                          <option key={dept} value={dept}>
                            {dept}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-lg shadow w-[912px]">
            <div className="overflow-hidden">

              <table className="w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {['Employee id', 'name', 'email', 'Department', 'jobTitle', 'employmentType'].map((key) => (
                      <th
                        key={key}
                        scope="col"
                        className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => requestSort(key as keyof Employee)}
                      >
                        <div className="flex items-center capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                          {sortConfig?.key === key && (
                            <span className="ml-1">{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>
                          )}
                        </div>
                      </th>
                    ))}
                    <th className="px-1 py-3 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedEmployees.length > 0 ? (
                    paginatedEmployees.map((employee) => (
                      <tr key={employee.id} className="hover:bg-gray-50">
                        <td className="px-3 py-4 whitespace-nowrap font-medium text-gray-900">
                          {employee.id}
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap flex items-center">

                          <div className="h-10 w-10 rounded-full bg-[#006666] text-white flex items-center justify-center font-bold">
                            {employee.name.charAt(0)}
                          </div>
                          <span className="ml-3">{employee.name}</span>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-gray-500">
                          {employee.email}
                        </td>

                        <td className="px-3 py-4 whitespace-nowrap">
                          {employee.department}
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap">
                          {employee.jobTitle}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getEmploymentTypeColor(employee.employmentType)}`}>
                            {employee.employmentType}
                          </span>
                        </td>

                        <td className="px-3 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-4">
                            <button className="hover:brightness-125" style={{ color: '#006666' }}>
                              <FaEdit />
                            </button>

                            <button className="text-red-600 hover:text-red-800">
                              <RiDeleteBinLine />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={9} className="px-6 py-4 text-center text-gray-500">
                        No employees found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
{/* Pagination */}
          <div className="flex justify-center mt-4">
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Right Side - Charts */}
        <div className="space-x-12 space-y-6">
{/* Employment Type Bar Chart */}
          <div className="bg-white rounded-lg shadow-lg p-4 w-75 ml-12">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Employment Types</h3>
            <ResponsiveContainer width="80%" height={200}>
              <BarChart data={employmentTypeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" fontSize={12} />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="count"
                  fill="#0088FE"
                  radius={[4, 4, 0, 0]}
                >
                  {employmentTypeData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        entry.type === 'Full-time'
                          ? '#00C49F'
                          : entry.type === 'Part-time'
                            ? '#0088FE'
                            : entry.type === 'Contract'
                              ? '#FF8042'
                              : '#FFBB28'
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
<div className="bg-white rounded-lg shadow-lg p-7 w-85 ml-20 ">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Work Mode Stats</h3>
            <div className="space-y-3">
              {workModeData.map((mode, index) => (
                <div key={mode.name} className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">{mode.name}</span>
                  <div className="flex items-center">
                    <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: `${(mode.value / 10) * 100}%`,
                          backgroundColor: COLORS[index % COLORS.length],
                        }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold text-gray-800">{mode.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EmployeeManagement;
