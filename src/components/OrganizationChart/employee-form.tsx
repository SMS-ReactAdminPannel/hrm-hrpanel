import type React from "react"
import { useState, useEffect } from "react"
import type { Employee, EmployeeFormData } from "./employee"
import { ChevronDown } from "lucide-react"

interface EmployeeFormProps {
  employee?: Employee | null
  employees: Employee[]
  onSubmit: (employeeData: EmployeeFormData) => void
  onCancel: () => void
}

export function EmployeeForm({ employee, employees, onSubmit, onCancel }: EmployeeFormProps) {
  const [formData, setFormData] = useState<EmployeeFormData>({
    name: "",
    position: "",
    department: "",
    email: "",
    phone: "",
    managerId: null,
  })

  const [errors, setErrors] = useState<Partial<EmployeeFormData>>({})
  const [isDepartmentOpen, setIsDepartmentOpen] = useState(false)
  const [isManagerOpen, setIsManagerOpen] = useState(false)

  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name,
        position: employee.position,
        department: employee.department,
        email: employee.email,
        phone: employee.phone,
        managerId: employee.managerId,
      })
    } else {
      setFormData({
        name: "",
        position: "",
        department: "",
        email: "",
        phone: "",
        managerId: null,
      })
    }
  }, [employee])

  const validateForm = (): boolean => {
    const newErrors: Partial<EmployeeFormData> = {}

    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.position.trim()) newErrors.position = "Position is required"
    if (!formData.department.trim()) newErrors.department = "Department is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid"
    if (!formData.phone.trim()) newErrors.phone = "Phone is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  const handleInputChange = (field: keyof EmployeeFormData, value: string | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  // Get potential managers (exclude current employee and their subordinates)
  const potentialManagers = employees.filter((emp) => {
    if (employee && emp.id === employee.id) return false
    return true
  })

  const departments = Array.from(
    new Set([
      ...employees.map((emp) => emp.department),
      "Executive",
      "Technology",
      "Finance",
      "Product",
      "Marketing",
      "Sales",
      "Human Resources",
      "Operations",
    ]),
  )
    .filter(Boolean)
    .sort()

  return (
    <div className="bg-white p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-bold text-gray-800 uppercase tracking-wide">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            placeholder="Enter full name"
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 bg-white transition-all duration-200 outline-none font-medium"
          />
          {errors.name && <p className="text-xs text-red-600 font-semibold">{errors.name}</p>}
        </div>

        {/* Position Field */}
        <div className="space-y-2">
          <label htmlFor="position" className="block text-sm font-bold text-gray-800 uppercase tracking-wide">
            Position
          </label>
          <input
            id="position"
            type="text"
            value={formData.position}
            onChange={(e) => handleInputChange("position", e.target.value)}
            placeholder="Enter position title"
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 bg-white transition-all duration-200 outline-none font-medium"
          />
          {errors.position && <p className="text-xs text-red-600 font-semibold">{errors.position}</p>}
        </div>

        {/* Department Field */}
        <div className="space-y-2">
          <label htmlFor="department" className="block text-sm font-bold text-gray-800 uppercase tracking-wide">
            Department
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsDepartmentOpen(!isDepartmentOpen)}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 bg-white transition-all duration-200 outline-none font-medium text-left flex items-center justify-between"
            >
              <span className={formData.department ? "text-gray-900" : "text-gray-500"}>
                {formData.department || "Select department"}
              </span>
              <ChevronDown className={`w-5 h-5 transition-transform ${isDepartmentOpen ? "rotate-180" : ""}`} />
            </button>

            {isDepartmentOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 max-h-48 overflow-y-auto">
                {departments.map((dept) => (
                  <button
                    key={dept}
                    type="button"
                    onClick={() => {
                      handleInputChange("department", dept)
                      setIsDepartmentOpen(false)
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors font-medium"
                  >
                    {dept}
                  </button>
                ))}
              </div>
            )}
          </div>
          {errors.department && <p className="text-xs text-red-600 font-semibold">{errors.department}</p>}
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-bold text-gray-800 uppercase tracking-wide">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            placeholder="Enter email address"
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 bg-white transition-all duration-200 outline-none font-medium"
          />
          {errors.email && <p className="text-xs text-red-600 font-semibold">{errors.email}</p>}
        </div>

        {/* Phone Field */}
        <div className="space-y-2">
          <label htmlFor="phone" className="block text-sm font-bold text-gray-800 uppercase tracking-wide">
            Phone
          </label>
          <input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            placeholder="Enter phone number"
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 bg-white transition-all duration-200 outline-none font-medium"
          />
          {errors.phone && <p className="text-xs text-red-600 font-semibold">{errors.phone}</p>}
        </div>

        {/* Manager Field */}
        <div className="space-y-2">
          <label htmlFor="manager" className="block text-sm font-bold text-gray-800 uppercase tracking-wide">
            Manager
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsManagerOpen(!isManagerOpen)}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 bg-white transition-all duration-200 outline-none font-medium text-left flex items-center justify-between"
            >
              <span className={formData.managerId ? "text-gray-900" : "text-gray-500"}>
                {formData.managerId
                  ? `${potentialManagers.find((m) => m.id === formData.managerId)?.name} - ${
                      potentialManagers.find((m) => m.id === formData.managerId)?.position
                    }`
                  : "Select manager (optional)"}
              </span>
              <ChevronDown className={`w-5 h-5 transition-transform ${isManagerOpen ? "rotate-180" : ""}`} />
            </button>

            {isManagerOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 max-h-48 overflow-y-auto">
                <button
                  type="button"
                  onClick={() => {
                    handleInputChange("managerId", null)
                    setIsManagerOpen(false)
                  }}
                  className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors font-medium"
                >
                  No Manager
                </button>
                {potentialManagers.map((manager) => (
                  <button
                    key={manager.id}
                    type="button"
                    onClick={() => {
                      handleInputChange("managerId", manager.id)
                      setIsManagerOpen(false)
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors font-medium"
                  >
                    {manager.name} - {manager.position}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex space-x-4 pt-6">
          <button
            type="submit"
            className="flex-1 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 uppercase tracking-wide"
          >
            {employee ? "Update Employee" : "Add Employee"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-8 py-4 bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 uppercase tracking-wide"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
