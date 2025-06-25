"use client"
import { Edit, Trash2, Mail, Phone, Plus } from "lucide-react"
import type { Employee } from "./employee"

interface EmployeeCardProps {
  employee: Employee
  onEdit: () => void
  onDelete: () => void
  onAddChild: () => void
}

export function EmployeeCard({ employee, onEdit, onDelete, onAddChild }: EmployeeCardProps) {

  const getDepartmentColor = (department: string) => {
    const colors = {
      Executive: "border border-9 border-purple-400 bg-gradient-to-br from-purple-500 to-purple-600 text-white",
      Technology: "border border-9 border-blue-400 bg-gradient-to-br from-blue-500 to-blue-600 text-white",
      Finance: "border border-9 border-green-400 bg-gradient-to-br from-green-500 to-green-600 text-white",
      Marketing: "border border-9 border-pink-400 bg-gradient-to-br from-pink-500 to-pink-600 text-white",
      Product: "border border-9 border-orange-400 bg-gradient-to-br from-orange-500 to-orange-600 text-white",
    }
    return colors[department as keyof typeof colors] || "bg-gradient-to-br from-gray-500 to-gray-600 text-white"
  }
  return (
    <div
      className={`
        w-[400px] p-6 rounded-lg shadow-lg border-2 border-blue-200 
        ${getDepartmentColor(employee.department)}
        transform transition-all duration-300 hover:scale-102 hover:shadow-2xl
        backdrop-blur-sm bg-gray-100
      `}
    >
      <div className="flex items-center space-x-3 mb-3 ">
        <div className="flex justify-center mb-4 rounded-lg">
          <div className="w-16 h-16 border border-purple-400 text-purple-400 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">
            {employee.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">{employee.name}</h3>
          <p className="text-sm text-gray-600 truncate">{employee.position}</p>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Mail className="w-4 h-4" />
          <span className="truncate">{employee.email}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Phone className="w-4 h-4" />
          <span>{employee.phone}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {employee.department}
        </span>
        <div className="flex space-x-1">
          <button
            onClick={onAddChild}
            className="p-1.5 text-black hover:text-green-600 hover:bg-green-50 rounded transition-colors"
            title="Add employee under this person"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button
            onClick={onEdit}
            className="p-1.5 text-black hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
            title="Edit employee"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={onDelete}
            className="p-1.5 text-black hover:text-red-600 hover:bg-red-50 rounded transition-colors"
            title="Delete employee"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
