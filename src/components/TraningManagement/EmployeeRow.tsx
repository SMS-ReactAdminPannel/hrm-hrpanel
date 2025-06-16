import type React from "react"
import type { Employee, TrainingProgram } from "../../components/TraningManagement/Traning"

interface EmployeeRowProps {
  employee: Employee
  selectedProgram?: TrainingProgram | null
}

export const EmployeeRow: React.FC<EmployeeRowProps> = ({ employee, selectedProgram }) => {
  const programProgress = selectedProgram
    ? employee.programProgress[selectedProgram.id] || 0
    : employee.trainingProgress

  const enrollmentDate = selectedProgram ? employee.enrollmentDate[selectedProgram.id] : null

  return (
    <tr className="bg-red-200 transition-colors text-gray-900">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{employee.id}</td>
      <td className="px-4 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-[#006666] rounded-full flex items-center justify-center text-white text-sm font-medium">
            {employee.avatar}
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">{employee.name}</p>
            <p className="text-sm text-gray-900">{employee.position}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.department}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="w-full bg-gray-200 rounded-full h-2 mr-3">
            <div
              className={`h-2 rounded-full ${programProgress === 100 ? "bg-green-600" : "bg-blue-600"}`}
              style={{ width: `${programProgress}%` }}
            ></div>
          </div>
          <span className="text-sm text-gray-900">{programProgress}%</span>
        </div>
      </td>
      {selectedProgram && (
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          {enrollmentDate ? new Date(enrollmentDate).toLocaleDateString() : "N/A"}
        </td>
      )}
      {!selectedProgram && (
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.completedCourses}</td>
      )}
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`px-2 py-1 rounded-full text-sm font-medium ${
            programProgress === 100
              ? "bg-green-100 text-green-800"
              : employee.status === "active"
                ? "bg-blue-400 text-white"
                : employee.status === "pending"
                  ? "bg-yellow-500 text-white"
                  : employee.status === "overdue"
                    ? "bg-red-800 text-white"
                    : ""
          }`}
        >
          {programProgress === 100 ? "Completed" : employee.status}
        </span>
      </td>
    </tr>
  )
}
