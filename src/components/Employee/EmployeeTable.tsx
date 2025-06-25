import type React from "react"
import { useState } from "react"
import { Edit, Trash2 } from "lucide-react"
import type { Employee, EmploymentType } from "../../components/Employee/Employee"
import { FONTS } from "../../constants/uiConstants"
import { X } from "lucide-react"

const modalAnimationStyle = `
  @keyframes slideUp {
    0% { transform: translateY(100%); opacity: 0; }
    100% { transform: translateY(0); opacity: 1; }
  }
  .animate-slideUp {
    animation: slideUp 0.4s ease-out forwards;
  }
`

interface EmployeeTableProps {
  employees: Employee[]
  sortConfig: { key: keyof Employee; direction: "ascending" | "descending" } | null
  onSort: (key: keyof Employee) => void
  onEdit: (employee: Employee) => void
  onDelete: (employeeId: string) => void
}

export const EmployeeTable: React.FC<EmployeeTableProps> = ({ employees, sortConfig, onSort, onEdit, onDelete }) => {
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null)

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

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editingEmployee) return;
    setEditingEmployee({ ...editingEmployee, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = () => {
    if (editingEmployee) {
      onEdit(editingEmployee);
      setEditingEmployee(null);
    }
  };

  return (
    <div className="bg-[#eff4f5] rounded shadow overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-[#006666] text-md">
          <tr>
            {["id", "name", "email", "department", "jobTitle", "employmentType"].map((key) => (
              <th
                key={key}
                className="px-4 py-3 text-left text-md font-medium text-white cursor-pointer"
                style={{ ...FONTS.cardSubHeader }}
                onClick={() => onSort(key as keyof Employee)}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
                {sortConfig?.key === key && (sortConfig.direction === "ascending" ? " ↑" : " ↓")}
              </th>
            ))}
            <th className="px-4 py-2 text-left text-md text-white" style={{ ...FONTS.cardSubHeader }}>Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 font-bold">
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td className="px-4 py-5 !text-black text-sm" style={{ ...FONTS.cardSubHeader }}>{emp.id}</td>
              <td className="px-4 py-2 !text-black text-sm" style={{ ...FONTS.cardSubHeader }}>{emp.name}</td>
              <td className="px-4 py-2 !text-black text-sm" style={{ ...FONTS.cardSubHeader }}>{emp.email}</td>
              <td className="px-4 py-2 !text-black text-sm" style={{ ...FONTS.cardSubHeader }}>{emp.department}</td>
              <td className="px-4 py-2 !text-black text-sm" style={{ ...FONTS.cardSubHeader }}>{emp.jobTitle}</td>
              <td className="px-4 py-2">
                <span className={`px-2 py-1 text-xs !text-black rounded-full ${getEmploymentTypeColor(emp.employmentType)}`} style={{ ...FONTS.cardSubHeader }}>
                  {emp.employmentType}
                </span>
              </td>
              <td className="px-4 py-2 space-x-2" style={{ ...FONTS.tableBody }}>
                <button className="text-blue-600 hover:text-blue-800" onClick={() => setEditingEmployee(emp)}>
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
       <style>{modalAnimationStyle}</style> 
      
      {editingEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        

          <div className="bg-white  p-10 rounded shadow-lg w-full max-w-2xl h-[550px] mx-auto animate-slideUp">
              <button
  onClick={() => setEditingEmployee(null)}
  className="absolute top-1 left-3 -ml-[51px] text-white hover:text-gray-600 bg-blue-700 rounded-l-full h-10 w-10 flex items-center justify-center shadow"
>
  <X size={30} />
</button>

            <h3 className="text-lg text-black font-bold mb-4 text-center">Edit Employee</h3>

            <div className="grid gap-6">
              <input name="name" value={editingEmployee.id} onChange={handleEditChange} className="border p-2 rounded" />
              <input name="name" value={editingEmployee.name} onChange={handleEditChange} className="border p-2 rounded" />
              <input name="email" value={editingEmployee.email} onChange={handleEditChange} className="border p-2 rounded" />
              <input name="department" value={editingEmployee.department} onChange={handleEditChange} className="border p-2 rounded" />
              <input name="jobTitle" value={editingEmployee.jobTitle} onChange={handleEditChange} className="border p-2 rounded" />
              <input name="name" value={editingEmployee.employmentType} onChange={handleEditChange} className="border p-2 rounded" />
            </div>
            <div className="flex gap-2 mt-4 justify-center">
              <button onClick={handleEditSubmit} className="bg-green-800 text-white px-4 py-2 rounded">Save</button>
              <button onClick={() => setEditingEmployee(null)} className="bg-green-800 text-white px-4 py-2 rounded">Cancel</button>
            </div>
          </div>
        </div>
      )}
     </div>
  )
}
