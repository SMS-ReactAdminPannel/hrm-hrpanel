import React from "react"
import { Edit, Trash2 } from "lucide-react"
import type { Employee } from "../../components/EmployeeShift/employee"

interface EmployeeShiftTableProps {
  employees: Employee[]
  groupBy: string | null
  onEditEmployee: (employee: Employee) => void
  onDeleteEmployee: (employee: Employee) => void
}

const EmployeeShiftTable: React.FC<EmployeeShiftTableProps> = ({
  employees,
  groupBy,
  onEditEmployee,
  onDeleteEmployee,
}) => {
  const groupEmployees = () => {
    if (!groupBy) return { "All Employees": employees }

    const grouped: Record<string, Employee[]> = {}

    employees.forEach((employee) => {
      let key: string

      if (groupBy === "rotatingShift") {
        key = employee.title
      } else {
        key = employee[groupBy as keyof Employee] as string
      }

      if (!grouped[key]) {
        grouped[key] = []
      }
      grouped[key].push(employee)
    })

    return grouped
  }

  const getGroupHeader = (groupKey: string) => {
    if (!groupBy) return groupKey

    switch (groupBy) {
      case "rotatingShift":
        return `Shift Pattern: ${groupKey}`
      case "department":
        return `Department: ${groupKey}`
      case "jobRole":
        return `Job Role: ${groupKey}`
      case "reportingManager":
        return `Reporting Manager: ${groupKey}`
      default:
        return groupKey
    }
  }

  const groupedEmployees = groupEmployees()

  return (
    <div className="flex-1 overflow-hidden mt-6">
      <div className="h-full overflow-auto rounded-md custom-scrollbar">
        <table className="w-full">
          <thead className="bg-[#006666] border-b border-gray-200 sticky top-0">
            <tr>
              <th className="px-4 lg:px-6 py-3 text-left text-md font-medium text-white min-w-[200px]">Employee</th>
              <th className="px-4 lg:px-6 py-3 text-left text-md font-medium text-white min-w-[150px]">Title</th>
              <th className="px-4 lg:px-6 py-3 text-left text-md font-medium text-white min-w-[120px]">Based On</th>
              <th className="px-4 lg:px-6 py-3 text-left text-md font-medium text-white min-w-[180px]">Rotate</th>
              <th className="px-4 lg:px-6 py-3 text-left text-md font-medium text-white min-w-[150px]">Start Date</th>
              <th className="px-4 lg:px-6 py-3 text-left text-md font-medium text-white min-w-[150px]">
                Current Shift
              </th>
              <th className="px-4 lg:px-6 py-3 text-left text-md font-medium text-white min-w-[150px]">Next Shift</th>
              <th className="px-4 lg:px-6 py-3 text-left text-md font-medium text-white min-w-[150px]">Next Switch</th>
              <th className="px-4 lg:px-6 py-3 text-left text-md font-medium text-white min-w-[200px] sticky right-0 bg-[#006666]">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-[#eff4f5] divide-y divide-gray-200">
            {Object.keys(groupedEmployees).length > 0 ? (
              Object.entries(groupedEmployees).map(([groupKey, groupEmployees]) => (
                <React.Fragment key={groupKey}>
                  {groupBy && (
                    <tr className="bg-gray-50">
                      <td colSpan={9} className="px-4 lg:px-6 py-3 font-medium text-gray-900">
                        {getGroupHeader(groupKey)}
                      </td>
                    </tr>
                  )}

                  {groupEmployees.map((employee) => (
                    <tr key={employee.id}>
                      <td className="px-4 lg:px-6 whitespace-nowrap">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                            <div className="text-sm text-gray-500">{employee.employeeId}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 lg:px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{employee.title}</td>
                      <td className="px-4 lg:px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{employee.basedOn}</td>
                      <td className="px-4 lg:px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{employee.rotate}</td>
                      <td className="px-4 lg:px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                        {employee.startDate}
                      </td>
                      <td className="px-4 lg:px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            employee.currentShift === "None"
                              ? "bg-gray-100 text-gray-800"
                              : employee.currentShift.includes("Morning")
                                ? "bg-blue-100 text-blue-800"
                                : employee.currentShift.includes("Night")
                                  ? "bg-purple-100 text-purple-800"
                                  : "bg-green-100 text-green-800"
                          }`}
                        >
                          {employee.currentShift}
                        </span>
                      </td>
                      <td className="px-4 lg:px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            employee.nextShift === "None"
                              ? "bg-gray-100 text-gray-800"
                              : employee.nextShift.includes("Morning")
                                ? "bg-blue-100 text-blue-800"
                                : employee.nextShift.includes("Night")
                                  ? "bg-purple-100 text-purple-800"
                                  : "bg-green-100 text-green-800"
                          }`}
                        >
                          {employee.nextShift}
                        </span>
                      </td>
                      <td className="px-4 lg:px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                        {employee.nextSwitch}
                      </td>
                      <td className="px-4 lg:px-6 py-4 whitespace-nowrap sticky right-0 bg-[#eff4f5]">
                        <div className="flex items-center gap-2">
                          <button
                            className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
                            onClick={() => onEditEmployee(employee)}
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded"
                            onClick={() => onDeleteEmployee(employee)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="px-6 py-4 text-center text-gray-500">
                  No employees found matching your search criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default EmployeeShiftTable
