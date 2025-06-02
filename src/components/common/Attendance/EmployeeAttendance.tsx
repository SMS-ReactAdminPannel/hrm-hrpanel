// import React from "react"
// import { MdClose } from "react-icons/md"

// export type Employee = {
//   ID: string
//   Name: string
//   Designation: string
//   Status: string
//   CheckIn: string
//   CheckOut: string
//   Duration: string
// }

// interface EmployeeProps {
//   employee: Employee
//   onClose: () => void
// }

// const EmployeeAttendance: React.FC<EmployeeProps> = ({ employee, onClose }) => {
//   return (
//     <div className="relative bg-white/70 backdrop-blur-md rounded-xl shadow-xl p-6 border border-white/20 max-w-2xl w-full mx-auto animate-fadeIn">
//       <button
//         onClick={onClose}
//         className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition-colors"
//       >
//         <MdClose size={24} />
//       </button>

//       <div className="flex items-center gap-4 mb-4">
//         <div className="w-14 h-14 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 text-white flex items-center justify-center text-xl font-bold shadow-md">
//           {employee.Name.charAt(0)}
//         </div>
//         <div>
//           <h2 className="text-2xl font-semibold text-slate-800">{employee.Name}</h2>
//           <p className="text-slate-600">{employee.Designation}</p>
//         </div>
//       </div>

//       <div className="grid grid-cols-2 gap-4 text-sm text-slate-700">
//         <div>
//           <p className="font-medium text-slate-500">Employee ID:</p>
//           <p>{employee.ID}</p>
//         </div>
//         <div>
//           <p className="font-medium text-slate-500">Status:</p>
//           <p className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
//             employee.Status === "Present"
//               ? "bg-green-100 text-green-700"
//               : "bg-red-100 text-red-600"
//           }`}>
//             {employee.Status}
//           </p>
//         </div>
//         <div>
//           <p className="font-medium text-slate-500">Check-In:</p>
//           <p>{employee.CheckIn}</p>
//         </div>
//         <div>
//           <p className="font-medium text-slate-500">Check-Out:</p>
//           <p>{employee.CheckOut}</p>
//         </div>
//         <div>
//           <p className="font-medium text-slate-500">Duration:</p>
//           <p>{employee.Duration}</p>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default EmployeeAttendance

