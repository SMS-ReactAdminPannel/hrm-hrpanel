import type React from "react"
import { User, Calendar, Star, TrendingUp, Plus, Eye } from "lucide-react"
import StarRating from "../../components/Appraisal/StarRating"
import SearchInput from "../../components/Appraisal/SearchInput"
import { FONTS } from "../../constants/uiConstants"
import  { useState,useEffect } from 'react';
import {  getAllAppraisals } from "../../features/Appraisal/service"


interface Employee {
  // id: string
  Employee: string
  Position: string
  Rating: number
  Status: string
  department: string
  ProjectPeriod: string
}
// const employees: Employee[] = [
//   {
//     id: '1',
//     Employee: 'Harry',
//     Position: 'Software Engineer',
//     Rating: 4.5,
//     Status: 'Active',
//     department: 'Engineering',
//     ProjectPeriod: 'Jan 2023 - Dec 2023',
//   },
//   {
//     id: '2',
//     Employee: 'james',
//     Position: 'Product Manager',
//     Rating: 2,
//     Status: 'On Leave',
//     department: 'Product',
//     ProjectPeriod: 'Mar 2023 - Mar 2024',
//   },
//   {
//     id: '3',
//     Employee: ' Smith',
//     Position: 'UI/UX Designer',
//     Rating: 3,
//     Status: 'Active',
//     department: 'Design',
//     ProjectPeriod: 'Feb 2024 - Jan 2025',
//   },
//   {
//     id: '4',
//     Employee: 'Michael',
//     Position: 'QA Engineer',
//     Rating: 4,
//     Status: 'Inactive',
//     department: 'Quality Assurance',
//     ProjectPeriod: 'Jul 2022 - Jun 2023',
//   },
//   {
//     id: '5',
//     Employee: 'John',
//     Position: 'DevOps Engineer',
//     Rating: 5,
//     Status: 'Active',
//     department: 'Infrastructure',
//     ProjectPeriod: 'Aug 2023 - Jul 2024',
//   },
//   {
//     id: '6',
//     Employee: 'Harry',
//     Position: 'Software Engineer',
//     Rating: 4.5,
//     Status: 'Active',
//     department: 'Engineering',
//     ProjectPeriod: 'Jan 2023 - Dec 2023',
//   },
//   {
//     id: '7',
//     Employee: 'james',
//     Position: 'Product Manager',
//     Rating: 2,
//     Status: 'On Leave',
//     department: 'Product',
//     ProjectPeriod: 'Mar 2023 - Mar 2024',
//   },
//   {
//     id: '8',
//     Employee: ' Smith',
//     Position: 'UI/UX Designer',
//     Rating: 3,
//     Status: 'Active',
//     department: 'Design',
//     ProjectPeriod: 'Feb 2024 - Jan 2025',
//   },
//   {
//     id: '9',
//     Employee: 'Michael',
//     Position: 'QA Engineer',
//     Rating: 4,
//     Status: 'Inactive',
//     department: 'Quality Assurance',
//     ProjectPeriod: 'Jul 2022 - Jun 2023',
//   },
//   {
//     id: '10',
//     Employee: 'John',
//     Position: 'DevOps Engineer',
//     Rating: 5,
//     Status: 'Active',
//     department: 'Infrastructure',
//     ProjectPeriod: 'Aug 2023 - Jul 2024',
//   },

// ];


interface DashboardProps {
  appraisals: Employee[]
  searchTerm: string
  onSearchChange: (value: string) => void
  onViewEmployee: (employee: Employee) => void
  onNewAppraisal: () => void
  getStatusColor: (status: string) => string
}

const Dashboard: React.FC<DashboardProps> = ({
  // appraisals,
  searchTerm,
  onSearchChange,
  onViewEmployee,
  onNewAppraisal,
  getStatusColor,
}) => {
  const [filteredappraisals, setFilteredAppraisals] = useState<Employee[]>([]);

  const fetchAppraisals = async () => {
    try {
      const response = await getAllAppraisals(); 
      const visitors = response?.data ?? [];
      console.log("Fetched appraisals:", visitors.data);
      setFilteredAppraisals(visitors || []);
    } catch (error) {
      console.error("Error fetching appraisals:", error);
    }
  };

  useEffect(() => {
    fetchAppraisals();
  }, []);
  return (
    <div className="space-y-6  w-full  ">
      {/* Stats Cards */}
      <div className="grid grid-cols-4 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <div className="bg-[#eff4f5] rounded-xl shadow-sm border border-gray-200 p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p style={FONTS.statusCardHeader}  className="text-sm font-medium text-gray-600">Total Employees</p>
              <p className="text-2xl font-bold text-gray-900">156</p>
            </div>
            <div className="lg:p-2 bg-blue-100 rounded-md">
              <User className="w-4 h-4 lg:w-4 lg:h-4 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-[#eff4f5] rounded-xl shadow-sm border border-gray-200 p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p style={FONTS.statusCardHeader} className="text-sm font-medium text-gray-600">Pending Reviews</p>
              <p className="text-2xl font-bold text-gray-900">23</p>
            </div>
            <div className="lg:p-2 bg-red-100 rounded-lg">
              <Calendar className="w-4 h-4 lg:w-4 lg:h-4 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-[#eff4f5] rounded-xl shadow-sm border border-gray-200 p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p style={FONTS.statusCardHeader} className="text-sm font-medium text-gray-600">Avg Rating</p>
              <p className="text-2xl font-bold text-gray-900">4.3</p>
            </div>
            <div className="lg:p-2 bg-yellow-100 rounded-lg">
              <Star className="w-4 h-4 lg:w-4 lg:h-4 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-[#eff4f5] rounded-xl shadow-sm border border-gray-200 p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p style={FONTS.statusCardHeader} className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">89%</p>
            </div>
            <div className="lg:p-2 bg-green-100 rounded-lg">
              <TrendingUp className="w-4 h-4 lg:w-4 lg:h-4 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Employee List with Search */}
      <div className="bg-[#eff4f5] rounded-md shadow-sm  bg-transparent ">
        <div className="py-4 border-gray-200 flex flex-row md:flex-row md:justify-between md:items-center gap-4">
          {/* Search Input */}
          <div className="w-full md:max-w-md" style={FONTS.tableBody}>
            <SearchInput
              value={searchTerm}
              onChange={onSearchChange}
              placeholder="Search employees name, position, or department..."
            />
          </div>

          {/* New Appraisal Button */}
          <div className="w-100  ">
            <button
              onClick={onNewAppraisal}
              className="bg-[#3a357f] text-white px-2 py-2 rounded-md hover:bg-[#3a357f] transition-colors flex justify-end gap-2  "
            >
              <Plus className="" />
              New Appraisal
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full ">
            <thead className="bg-[#3a357f]">
              <tr>
                <th className="px-6 py-3 text-left text-md  text-white">Employee</th>
                <th className="px-6 py-3 text-left text-md  text-white">Position</th>
                <th className="px-6 py-3 text-left text-md text-white">Rating</th>
                <th className="px-6 py-3 text-left text-md  text-white">Status</th>
                <th className="px-6 py-3 text-left text-md text-white">Project period</th>
                <th className="px-6 py-3 text-left text-md  text-white">Actions</th>
              </tr>
            </thead>
            <tbody style={FONTS.tableBody} className="bg-[#eff4f5] divide-y divide-gray-200  ">
              { filteredappraisals.map((employee) => (
                <tr key={employee.Employee} className="hover:bg-gray-100 transition-colors h-[10%]">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{employee.Employee || "no data"}</div>
                      <div className="text-sm text-gray-500">{employee.department || "no data"}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.Position || "no data"}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <StarRating rating={employee.Rating} readonly />
                      <span className="text-sm text-gray-600">({employee.Rating})</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-md ${getStatusColor(employee.Status)}`}
                    >
                      {employee.Status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.ProjectPeriod}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => onViewEmployee(employee)}
                      className="text-[#006666] hover:text-[#005555] flex items-center gap-1"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          { filteredappraisals.length === 0 && (
            <div className="text-center py-8">
              <div style={FONTS.paragraph} className="text-gray-900">No employees found matching your search</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
