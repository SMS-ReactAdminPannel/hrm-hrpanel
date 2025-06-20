import type React from "react"
import { useState } from "react"
import { X } from "lucide-react"
import type { Employee, Department, JobTitle, EmploymentType } from "../../components/Employee/Employee"

interface AddEmployeeModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (employee: Employee) => void
}

export const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [newEmployee, setNewEmployee] = useState<Employee>({
    id: "",
    name: "",
    email: "",
    contactNumber: "",
    department: "Engineering",
    jobTitle: "Manager",
    hireDate: "",
    employmentType: "Full-time",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = () => {
    const newErrors: Record<string, string> = {}
    const requiredFields = [
      "id",
      "name",
      "email",
      "contactNumber",
      "hireDate",
      "department",
      "jobTitle",
      "employmentType",
    ]

    requiredFields.forEach((field) => {
      if (!(newEmployee as any)[field]?.trim?.()) {
        newErrors[field] = `${field} is required`
      }
    })

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onAdd(newEmployee)
    setNewEmployee({
      id: "",
      name: "",
      email: "",
      contactNumber: "",
      department: "Engineering",
      jobTitle: "Manager",
      hireDate: "",
      employmentType: "Full-time",
    })
    setErrors({})
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-xl shadow-lg relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add New Employee</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {["id", "name", "email", "contactNumber", "hireDate"].map((field) => (
            <div key={field} className="flex flex-col">
              <input
                type={field === "hireDate" ? "date" : "text"}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={(newEmployee as any)[field]}
                onChange={(e) => {
                  setNewEmployee({ ...newEmployee, [field]: e.target.value })
                  setErrors({ ...errors, [field]: "" })
                }}
                className={`border rounded p-2 ${errors[field] ? "border-red-500" : ""}`}
              />
              {errors[field] && <span className="text-sm text-red-500">{errors[field]}</span>}
            </div>
          ))}

          <div className="flex flex-col">
            <select
              value={newEmployee.department}
              onChange={(e) => {
                setNewEmployee({ ...newEmployee, department: e.target.value as Department })
                setErrors({ ...errors, department: "" })
              }}
              className={`border rounded p-2 ${errors.department ? "border-red-500" : ""}`}
            >
              <option value="">Select Department</option>
              {["Engineering", "Marketing", "HR", "Finance", "Operations"].map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
            {errors.department && <span className="text-sm text-red-500">{errors.department}</span>}
          </div>

          <div className="flex flex-col">
            <select
              value={newEmployee.jobTitle}
              onChange={(e) => {
                setNewEmployee({ ...newEmployee, jobTitle: e.target.value as JobTitle })
                setErrors({ ...errors, jobTitle: "" })
              }}
              className={`border rounded p-2 ${errors.jobTitle ? "border-red-500" : ""}`}
            >
              <option value="">Select Job Title</option>
              {["Manager", "Developer", "Designer", "Analyst", "Specialist"].map((job) => (
                <option key={job} value={job}>
                  {job}
                </option>
              ))}
            </select>
            {errors.jobTitle && <span className="text-sm text-red-500">{errors.jobTitle}</span>}
          </div>

          <div className="flex flex-col col-span-2">
            <select
              value={newEmployee.employmentType}
              onChange={(e) => {
                setNewEmployee({ ...newEmployee, employmentType: e.target.value as EmploymentType })
                setErrors({ ...errors, employmentType: "" })
              }}
              className={`border rounded p-2 ${errors.employmentType ? "border-red-500" : ""}`}
            >
              <option value="">Select Employment Type</option>
              {["Full-time", "Part-time", "Contract", "Intern"].map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.employmentType && <span className="text-sm text-red-500">{errors.employmentType}</span>}
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400" onClick={onClose}>
            Cancel
          </button>
          <button className="bg-[#006666] text-white px-4 py-2 rounded hover:bg-teal-700" onClick={handleSubmit}>
            Add Employee
          </button>
        </div>
      </div>
    </div>
  )
}
