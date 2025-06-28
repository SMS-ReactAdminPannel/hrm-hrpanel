// import { useNavigate } from "react-router-dom";

// // Inside AttendancePage




// interface AttendanceItem {
//   ID: string;
//   Name: string;
//   Designation: string;
//   Status: string;
//   CheckIn: string;
//   CheckOut: string;
//   Duration: string;
// }

// interface AttendanceTableProps {
//   paginatedDetails: AttendanceItem[];
//   filteredDetails: AttendanceItem[];
//   currentPage: number;
//   rowsPerPage: number;
//   onPageChange: (page: number) => void;
//   onEmployeeClick: (item: AttendanceItem) => void;
  
// }

// export const AttendanceTable: React.FC<AttendanceTableProps> = ({
//   paginatedDetails,
//   filteredDetails,
//   currentPage,
//   rowsPerPage,
//   onPageChange,
//   onEmployeeClick,
// }) => {
//   const totalPages = Math.ceil(filteredDetails.length / rowsPerPage);
//   const navigate = useNavigate();

//   const handleEmployeeClick = (item: AttendanceItem) => {
//   navigate(`/attendance/${item.ID}`);
// };

//   return (
//     <div className="overflow-hidden rounded-md mt-6">
//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-[#5e59a9]/70 backdrop-blur-sm">
//             <tr>
//               {["ID", "Name", "Designation", "Status", "Check In", "Check Out", "Duration"].map((heading) => (
//                 <th
//                   key={heading}
//                   className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider"
//                 >
//                   {heading}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody className="bg-white/45 backdrop-blur divide-y divide-gray-100">
//             {paginatedDetails.map((item) => (
//               <tr
//                 key={item.ID}
//                 className="hover:bg-white/70 hover:backdrop-blur-sm cursor-pointer transition duration-200"
//                 onClick={() => onEmployeeClick(item)}
//               >
//                 <td className="px-6 py-1 text-sm font-medium text-gray-900 whitespace-nowrap">{item.ID}</td>
//                 <td className="px-6 py-1 text-sm text-gray-900 whitespace-nowrap">
//                   <div className="flex items-center gap-3">
//                     <div className="w-9 h-9 rounded-full bg-[#5e59a9]/60 text-white flex items-center justify-center text-sm font-semibold shadow-sm">
//                       {item.Name?.charAt(0).toUpperCase()}
//                     </div>
//                     <span className="font-medium">{item.Name}</span>
//                   </div>
//                 </td>
//                 <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">{item.Designation}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <span
//                     className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
//                       item.Status === "Present"
//                         ? "bg-green-100 text-green-800 border border-green-200"
//                         : "bg-red-100 text-red-800 border border-red-200"
//                     }`}
//                   >
//                     {item.Status}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">{item.CheckIn}</td>
//                 <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">{item.CheckOut}</td>
//                 <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">{item.Duration}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-t border-gray-100">
//        <div className="text-sm text-gray-500">
//   Showing {Math.min((currentPage - 1) * rowsPerPage + 1, filteredDetails.length)} to{" "}
//   {Math.min(currentPage * rowsPerPage, filteredDetails.length)} of {filteredDetails.length} entries
// </div>


//         <div className="flex space-x-2">
//           <button
//             onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
//             disabled={currentPage === 1}
//             className="px-3 py-2 rounded-lg bg-white text-gray-700 border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:bg-gray-50"
//           >
//             <svg
//               className="w-4 h-4"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 8 14"
//             >
//               <path
//                 stroke="currentColor"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13"
//               />
//             </svg>
//           </button>

//           {Array.from({ length: totalPages }, (_, index) => (
//             <button
//               key={index + 1}
//               onClick={() => onPageChange(index + 1)}
//               className={`px-3.5 py-2 rounded-lg transition-all duration-200 ${
//                 currentPage === index + 1
//                   ? "bg-[#5e59a9]/60 text-white shadow-md"
//                   : "bg-white text-gray-700 border border-gray-200 hover:bg-[#5e59a9]/60"
//               }`}
//             >
//               {index + 1}
//             </button>
//           ))}

//           <button
//             onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
//             disabled={currentPage >= totalPages}
//             className="px-3 py-2 rounded-lg bg-white text-gray-700 border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:bg-gray-50"
//           >
//             <svg
//               className="w-4 h-4"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 8 14"
//             >
//               <path
//                 stroke="currentColor"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"
//               />
//             </svg>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
