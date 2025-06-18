import type React from "react"
import { Edit, Trash2 } from "lucide-react"
import type { Employee, EmploymentType } from "../../components/Employee/Employee"
import { FONTS } from "../../constants/uiConstants"

interface EmployeeTableProps {
  employees: Employee[]
  sortConfig: { key: keyof Employee; direction: "ascending" | "descending" } | null
  onSort: (key: keyof Employee) => void
  onEdit: (employee: Employee) => void
  onDelete: (employeeId: string) => void
  onRowClick?: (employee: Employee) => void // ✅ NEW PROP
}

export const EmployeeTable: React.FC<EmployeeTableProps> = ({
  employees,
  sortConfig,
  onSort,
  onEdit,
  onDelete,
  onRowClick
}) => {
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

  return (
    <div className="rounded shadow overflow-x-auto mt-29">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-[#5e59a9]/70 backdrop-blur-sm" style={{ ...FONTS.tableHeader }}>
          <tr>
            {["id", "name", "email", "department", "jobTitle", "employmentType"].map((key) => (
              <th
                key={key}
                className="px-4 py-3 text-left text-md font-medium text-white cursor-pointer"
                onClick={() => onSort(key as keyof Employee)}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
                {sortConfig?.key === key && (sortConfig.direction === "ascending" ? " ↑" : " ↓")}
              </th>
            ))}
            <th className="px-4 py-2 text-left text-md !text-white" style={{ ...FONTS.tableHeader }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white/45 backdrop-blur divide-y divide-gray-100">
          {employees.map((emp) => (
            <tr
              key={emp.id}
              className="hover:bg-white/70 hover:backdrop-blur-sm transition duration-200 cursor-pointer"
              onClick={() => onRowClick?.(emp)}
            >
              <td className="px-4 py-5">{emp.id}</td>
              <td className="px-4 py-2">{emp.name}</td>
              <td className="px-4 py-2">{emp.email}</td>
              <td className="px-4 py-2">
                <div className="font-medium">{emp.department}</div>
                {emp.subDepartment && (
                  <div className="text-xs text-gray-500 mt-1">{emp.subDepartment}</div>
                )}
              </td>
              <td className="px-4 py-2">{emp.jobTitle}</td>
              <td className="px-4 py-2">
                <span className={`px-2 py-1 text-xs rounded-full ${getEmploymentTypeColor(emp.employmentType)}`}>
                  {emp.employmentType}
                </span>
              </td>
              <td className="px-4 py-2 space-x-2" onClick={(e) => e.stopPropagation()}> {/* ✅ Prevent row click */}
                <button
                  className="text-blue-600 hover:text-blue-800"
                  onClick={() => onEdit(emp)}
                >
                  <Edit size={16} />
                </button>
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={() => onDelete(emp.id)}
                >
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
          {employees.length === 0 && (
            <tr>
              <td colSpan={7} className="px-4 py-2 text-center !text-gray-500" style={{ ...FONTS.cardSubHeader }}>
                No employees found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
