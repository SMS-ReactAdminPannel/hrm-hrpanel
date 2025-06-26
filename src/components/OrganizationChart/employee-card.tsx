"use client"
import type { Employee } from "./employee"
import { Edit, Trash2, Mail, Phone } from "lucide-react"

interface EmployeeCardProps {
  employee: Employee
  onEdit: () => void
  onDelete: () => void
}

export function EmployeeCard({ employee, onEdit, onDelete }: EmployeeCardProps) {
  const getDepartmentColor = (department: string) => {
    const colors = {
      Executive: "bg-purple-500 bg-gradient-to-br from-purple-500 to-purple-600 text-white",
      Technology: "bg-blue-500 bg-gradient-to-br from-blue-500 to-blue-600 text-white",
      Finance: "bg-green-500 bg-gradient-to-br from-green-500 to-green-600 text-white",
      Marketing: "bg-pink-500 bg-gradient-to-br from-pink-500 to-pink-600 text-white",
      Product: "bg-orange-500 bg-gradient-to-br from-orange-500 to-orange-600 text-white",
    }
    return colors[department as keyof typeof colors] || "bg-gradient-to-br from-gray-500 to-gray-600 text-white"
  }

  return (
    <div className="relative group">
      <div
        className={`
        w-72 p-6 rounded-2xl shadow-xl border-2 border-blue-200 
        ${getDepartmentColor(employee.department)}
        transform transition-all duration-300 hover:scale-102 hover:shadow-2xl
        backdrop-blur-sm
      `}
      >
        {/* Action Buttons */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="flex space-x-2">
            <button
              onClick={onEdit}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors duration-200"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={onDelete}
              className="p-2 bg-white/20 hover:bg-red-500/50 rounded-full transition-colors duration-200"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Avatar */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">
            {employee.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
        </div>

        {/* Employee Info */}
        <div className="text-center">
          <h3 className="text-lg font-bold mb-1">{employee.name}</h3>
          <p className="text-sm opacity-90 mb-2">{employee.position}</p>
          <div className="text-xs opacity-80 mb-3">
            <span className="bg-white/20 px-2 py-1 rounded-full">{employee.department}</span>
          </div>

          {/* Contact Info */}
          <div className="space-y-1 text-xs opacity-80">
            <div className="flex items-center justify-center space-x-1">
              <Mail className="w-3 h-3" />
              <span className="truncate">{employee.email}</span>
            </div>
            <div className="flex items-center justify-center space-x-1">
              <Phone className="w-3 h-3" />
              <span>{employee.phone}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
