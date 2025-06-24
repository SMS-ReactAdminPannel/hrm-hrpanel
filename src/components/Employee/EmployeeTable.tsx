import React, { useState } from 'react';
import { Edit, Trash2 } from "lucide-react"
import type { Employee, EmploymentType } from "../../components/Employee/Employee"
import { FONTS } from '../../constants/uiConstants';
import { X } from "lucide-react"


interface EmployeeTableProps {
  employees: Employee[]
  sortConfig: { key: keyof Employee; direction: "ascending" | "descending" } | null
  onSort: (key: keyof Employee) => void
  // onEdit: (employee: Employee) =>  void
  onDelete: (employeeId: string) => void
}

export const EmployeeTable: React.FC<EmployeeTableProps> = ({ employees, sortConfig, onSort, onEdit, onDelete }) => {
  const getEmploymentTypeColor = (type: EmploymentType) => {
    switch (type) {
      case "Full-time":
        return "bg-green-100 text-green-800"
      case "Part-time":
        return "bg-blue-100 text-blue-800"
      case "Contract":
        return "bg-purple-100 text-purple-800"
      case "Intern":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }
  

  const [isEditing, setIsEditing] = useState(false);
 
  return (

    <div className="rounded shadow overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
         <thead style={{...FONTS.tableHeader}} className="bg-[#5e59a9]/100 backdrop-blur-sm">
          <tr  >
            {["id", "name", "email", "department", "jobTitle", "employmentType"].map((key) => (
              <th
                key={key}
                className="px-4 py-3 text-left text-md font-medium text-white cursor-pointer"
                style={{...FONTS.tableHeader}}
                onClick={() => onSort(key as keyof Employee)}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
                {sortConfig?.key === key && (sortConfig.direction === "ascending" ? " ↑" : " ↓")}
              </th>
            ))}
            <th className="px-4 py-2 text-left text-md text-white" style={{...FONTS.tableHeader}}>Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200" >
          {employees.map((emp) => (
            <tr key={emp.id} style={{...FONTS.tableBody}} className='text-black ' >
              <td className="px-4 py-5 text-sm" style={{...FONTS.tableBody}}>{emp.id}</td>
              <td className="px-4 py-2 text-sm" style={{...FONTS.tableBody}}>{emp.name}</td>
              <td className="px-4 py-2 text-sm" style={{...FONTS.tableBody}}>{emp.email}</td>
              <td className="px-4 py-2 text-sm" style={{...FONTS.tableBody}}>{emp.department}</td>
              <td className="px-4 py-2 text-sm" style={{...FONTS.tableBody}}>{emp.jobTitle}</td>
              <td className="px-4 py-2">
                <span className={`px-2 py-1 text-xs rounded-full ${getEmploymentTypeColor(emp.employmentType)}`} style={{...FONTS.tableBody}}>
                  {emp.employmentType}
                </span>
              </td>
              <td className="px-4 py-2 space-x-2" style={{...FONTS.tableBody}}>
                <button className="text-blue-600 hover:text-blue-800" onClick={() => 
                  setIsEditing(true)}>
                  <Edit size={16} />
                </button>
                <button className="text-red-600 hover:text-red-800" onClick={() => onDelete(emp.id)}>
                  <Trash2 size={16} />
                </button>
               
              </td>
            </tr>
          ))}
          {employees.length === 0 && (
            <tr>
              <td colSpan={7} className="px-4 py-2 text-center text-gray-500">
                No employees found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {isEditing && (
        <div className="fixed h-[100%] inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <form className="relative h-[65%] p-6 rounded-2xl backdrop-blur-md bg-white/20 border border-white/30 shadow-xl w-full max-w-2xl">
            <div className="flex justify-end">
              <button className="text-black  px-2 py-1 rounded" onClick={() => setIsEditing(false)}>
                <X size={24} />
              </button>
            </div>

            <p style={{ ...FONTS.header3 }}>Employee Management Edit</p>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <p style={{ ...FONTS.paragraph }}>Id</p>
                <input
                  type="text"
                  className="w-full bg-white/30 placeholder-black/70 border border-white/40 p-2 rounded-lg backdrop-blur-sm"
                  placeholder="Id"
                />
              </div>

              <div>
                <p style={{ ...FONTS.paragraph }}>Name</p>
                <input
                  type="text"
                  className="w-full bg-white/30 placeholder-black/70 border border-white/40 p-2 rounded-lg backdrop-blur-sm"
                  placeholder="Name"
                />
              </div>

              <div>
                <p style={{ ...FONTS.paragraph }}>Email</p>
                <input
                  type="email"
                  className="w-full bg-white/30 placeholder-black/70 border border-white/40 p-2 rounded-lg backdrop-blur-sm"
                  placeholder="Email"
                />
              </div>

              <div>
                <p style={{ ...FONTS.paragraph }}>Title</p>
                <input
                  type="text"
                  className="w-full bg-white/30 placeholder-black/70 border border-white/40 p-2 rounded-lg backdrop-blur-sm"
                  placeholder="Job Title"
                />
              </div>

              <div>
                <p style={{ ...FONTS.paragraph }}>Status</p>
                <select className="w-full bg-white/30 border border-white/40 p-2 rounded-lg backdrop-blur-sm text-black">
                  <option value="Full-Time">Full-Time</option>
                  <option value="Part-Time">Part-Time</option>
                  <option value="Contract">Contract</option>
                </select>
              </div>

              <div>
                <p style={{ ...FONTS.paragraph }}>Department</p>
                <select className="w-full bg-white/30 border border-white/40 p-2 rounded-lg backdrop-blur-sm text-black">
                  <option value="Engineering">Engineering</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Finance">Finance</option>
                </select>
              </div>
            </div>

            {/* Buttons fixed to bottom right */}
            <div className="absolute bottom-3 right-6 flex gap-3">
              <button
                type="submit"
                className="bg-blue-600/80 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
                style={{ ...FONTS.button}}
              >
                Save
              </button>
              <button
                type="button"
                className="bg-gray-400/80 text-white px-5 py-2 rounded-lg hover:bg-gray-500 transition"
                style={{ ...FONTS.button }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      
      )}


     
    </div>

  )
}
