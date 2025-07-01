import type React from "react"
import { User, Calendar, Star, TrendingUp, Eye } from "lucide-react"
import StarRating from "../../components/Appraisal/StarRating"

import { FONTS } from "../../constants/uiConstants"
import  { useState,useEffect,useMemo } from 'react';
import {  getAllAppraisals } from "../../features/Appraisal/service"
import { Pagination } from "../Pagination/pagination";



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
// ];


interface DashboardProps {
  appraisals: Employee[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onViewEmployee: (employee: Employee) => void;
  onNewAppraisal: () => void;
  getStatusColor: (status: string) => string;
}

const Dashboard: React.FC<DashboardProps> = ({
  // appraisals,
  onViewEmployee,
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
  //pagination
 // pagination
const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 5;

const paginatedAppraisals = useMemo(() => {
  const start = (currentPage - 1) * itemsPerPage;
  return filteredappraisals.slice(start, start + itemsPerPage);
}, [filteredappraisals, currentPage]);

const totalPages = Math.ceil(filteredappraisals.length / itemsPerPage);

useEffect(() => {
  setCurrentPage(1); // Reset to page 1 on data change
}, [filteredappraisals.length]);


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
        
        <div className="overflow-x-auto">
          <table className="w-full ">
            <thead className="bg-[#3a357f]">
              <tr>
                <th className="px-6 py-3 text-left text-md  text-white">Employee</th>
                <th className="px-6 py-3 text-left text-md  text-white">Position</th>
                  <th className="px-6 py-3 text-left text-md  text-white">Department</th>
                <th className="px-6 py-3 text-left text-md text-white">Rating</th>
                <th className="px-6 py-3 text-left text-md  text-white">Status</th>
                <th className="px-6 py-3 text-left text-md text-white">Project period</th>
                <th className="px-6 py-3 text-left text-md  text-white">Actions</th>
              </tr>
            </thead>
            <tbody style={FONTS.tableBody} className="bg-[#eff4f5] divide-y divide-gray-200  ">
              { paginatedAppraisals.map((employee) => (
                <tr key={employee.Employee} className="hover:bg-gray-100 transition-colors h-[10%]">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{employee.Employee || "no data"}</div>
                      {/* <div className="text-sm text-gray-500">{employee.department || "no data"}</div> */}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.Position || "no data"}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.department || "no data"}</td>
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
      
{/* Pagination Controls */}
{totalPages > 0 && (
  
   <div><Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={(page) => setCurrentPage(page)}
    /></div>
)}
    </div>
  )
}

export default Dashboard
