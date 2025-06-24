import { request } from 'http';
import React, { useState } from 'react';

import ReactPaginate from 'react-paginate'

interface LeaveRequestData {
  id: string;
  employeeId: string;
  employeeName: string;
  leaveType: string;
  from: string;
  to: string;
  reason: string;
}

const AttendanceRequest : React.FC = () => {
  //page
  const [currentPage, setCurrentPage]=useState(0)
  const itemperpage =10;
  //search
  const [searchQuery,setSearchQuery]=useState('');


  const leaveRequests: LeaveRequestData[] = [
    {
      id: '1',
      employeeId: 'EMP-001',
      employeeName: 'John Doe',
      leaveType: 'Annual Leave',
      from: '2023-06-01',
      to: '2023-06-05',
      reason: 'Family vacation'
    },
    {
      id: '2',
      employeeId: 'EMP-002',
      employeeName: 'Jane Smith',
      leaveType: 'Sick Leave',
      from: '2023-06-10',
      to: '2023-06-12',
      reason: 'Flu'
    },
    {
      id: '3',
      employeeId: 'EMP-003',
      employeeName: 'Robert Johnson',
      leaveType: 'Emergency Leave',
      from: '2023-06-15',
      to: '2023-06-16',
      reason: 'Family emergency'
    },
    {
      id: '4',
      employeeId: 'EMP-004',
      employeeName: 'Emily Davis',
      leaveType: 'Maternity Leave',
      from: '2023-07-01',
      to: '2023-10-01',
      reason: 'Childbirth'
    },
    {
      id: '5',
      employeeId: 'EMP-005',
      employeeName: 'Michael Wilson',
      leaveType: 'Study Leave',
      from: '2023-06-20',
      to: '2023-06-23',
      reason: 'Professional certification exam'
    },
    {
      id: '6',
      employeeId: 'EMP-006',
      employeeName: 'Sarah Williams',
      leaveType: 'Casual Leave',
      from: '2023-07-05',
      to: '2023-07-07',
      reason: 'Personal work'
    },
    {
      id: '7',
      employeeId: 'EMP-007',
      employeeName: 'David Brown',
      leaveType: 'Paternity Leave',
      from: '2023-08-01',
      to: '2023-08-14',
      reason: 'Newborn child care'
    },
    {
      id: '8',
      employeeId: 'EMP-008',
      employeeName: 'Lisa Miller',
      leaveType: 'Sick Leave',
      from: '2023-06-18',
      to: '2023-06-20',
      reason: 'Migraine'
    },
    {
      id: '9',
      employeeId: 'EMP-009',
      employeeName: 'James Wilson',
      leaveType: 'Bereavement Leave',
      from: '2023-07-10',
      to: '2023-07-12',
      reason: 'Family bereavement'
    },
    {
      id: '10',
      employeeId: 'EMP-010',
      employeeName: 'Patricia Taylor',
      leaveType: 'Annual Leave',
      from: '2023-08-15',
      to: '2023-08-25',
      reason: 'International travel'
    },
    {
      id: '11',
      employeeId: 'EMP-011',
      employeeName: 'Richard Anderson',
      leaveType: 'Compensatory Leave',
      from: '2023-06-25',
      to: '2023-06-26',
      reason: 'Overtime compensation'
    },
    {
      id: '12',
      employeeId: 'EMP-012',
      employeeName: 'Jennifer Thomas',
      leaveType: 'Sick Leave',
      from: '2023-07-08',
      to: '2023-07-10',
      reason: 'Food poisoning'
    },
    {
      id: '13',
      employeeId: 'EMP-013',
      employeeName: 'Charles Moore',
      leaveType: 'Work From Home',
      from: '2023-06-28',
      to: '2023-06-30',
      reason: 'Home maintenance'
    },
    {
      id: '14',
      employeeId: 'EMP-014',
      employeeName: 'Jessica Martin',
      leaveType: 'Annual Leave',
      from: '2023-09-01',
      to: '2023-09-10',
      reason: 'Wedding anniversary trip'
    },
    {
      id: '15',
      employeeId: 'EMP-015',
      employeeName: 'Daniel Jackson',
      leaveType: 'Sabbatical Leave',
      from: '2023-10-01',
      to: '2024-04-01',
      reason: 'Research project'
    }
  ];

   const filteredRequests =leaveRequests.filter((request)=>
  request.employeeName.toLowerCase().includes(searchQuery.toLowerCase())||
  request.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
  request.leaveType.toLowerCase().includes(searchQuery.toLowerCase())
)



  const pageCount = Math.ceil(filteredRequests.length / itemperpage)
  const offset =currentPage *itemperpage;
  const currentItems =filteredRequests.slice(offset,offset + itemperpage)

    const handlePageClick = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };
  return (
    <>
     <div>
        <h1 className="text-4xl font-bold text-white mt-2 leading-relaxed pb-1">
          Attendance Request
        </h1>
      </div>
    <div className="mb-4 flex justify-end">
  <input
    type="text"
    placeholder="Search by name or ID"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="px-4 py-2 border border-gray-300 rounded-md  w-100 md:w-1/3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
  />
</div>

    <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-100">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-[#5e59a9]/70 backdrop-blur-sm">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
              <div className="flex items-center">
                <span>Employee ID</span>
                <svg className="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">Employee</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">Leave Type</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">Dates</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">Reason</th>
            <th className="px-6 py-4 text-right text-sm font-semibold text-white uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentItems.map((request) => (
            <tr key={request.id} className="hover:bg-gray-50 transition-colors duration-150">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900 font-mono">{request.employeeId}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                    <span className="text-indigo-600 font-medium">
                      {request.employeeName.charAt(0)}
                    </span>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{request.employeeName}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                  request.leaveType === 'Annual Leave' ? 'bg-blue-100 text-blue-800' :
                  request.leaveType === 'Sick Leave' ? 'bg-yellow-100 text-yellow-800' :
                  request.leaveType === 'Emergency Leave' ? 'bg-red-100 text-red-800' :
                  'bg-purple-100 text-purple-800'
                }`}>
                  {request.leaveType}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{request.from}</div>
                <div className="text-sm text-gray-500">to {request.to}</div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900 max-w-xs truncate">{request.reason}</div>
             
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end space-x-2">
                  <button className="text-green-600 hover:text-green-900 px-3 py-1 rounded-md hover:bg-green-50 transition-colors">
                    Approve
                  </button>
                  <button className="text-red-600 hover:text-red-900 px-3 py-1 rounded-md hover:bg-red-50 transition-colors">
                    Reject
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination Component */}
      <div className="bg-white px-6 py-3 flex justify-center border-t border-gray-200">
     <ReactPaginate
  previousLabel="Previous"
  nextLabel="Next"
  breakLabel="..."
  onPageChange={handlePageClick}
  pageCount={pageCount}
  marginPagesDisplayed={2}
  pageRangeDisplayed={3}
  containerClassName="flex items-center justify-center space-x-2 mt-4"
  pageClassName="inline-flex items-center justify-center px-3 py-1 border border-gray-300 text-sm text-gray-700 rounded hover:bg-gray-100"
  activeClassName="bg-indigo-600 text-white font-semibold"
  previousClassName="inline-flex items-center px-3 py-1 border border-gray-300 text-sm text-gray-700 rounded hover:bg-gray-100"
  nextClassName="inline-flex items-center px-3 py-1 border border-gray-300 text-sm text-gray-700 rounded hover:bg-gray-100"
  breakClassName="px-3 py-1 text-gray-500"
/>
      </div>
    </div>
    </>
  );
};

export default AttendanceRequest ;