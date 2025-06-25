import React, { useState } from "react"
import { X } from "lucide-react"
import type { Employee, Department, JobTitle, EmploymentType } from "../../components/Employee/Employee"
import { FONTS } from "../../constants/uiConstants"

interface AddEmployeeModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (employee: Employee) => void
}

// Inline animation styles (slide-up)
const modalAnimationStyle = `
  @keyframes slideUp {
    0% { transform: translateY(100%); opacity: 0; }
    100% { transform: translateY(0); opacity: 1; }
  }
  .animate-slideUp {
    animation: slideUp 0.4s ease-out forwards;
  }
`

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
    <>
     
       <style>{modalAnimationStyle}</style> 
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">

        
       
        <div className="bg-white p-6 rounded-lg w-full max-w-2xl  h-[600px] shadow-lg relative animate-slideUp">
      
        <button
            onClick={onClose}
            className="absolute top-2 left-3 -ml-12    text-white   p-1 shadow hover:text-gray-600  rounded-l-full bg-blue-700"
          >
            <X size={30} />
        </button>

          <h2 className="text-xl font-semibold mb-4 text-center">Add New Employee</h2>


          <div className="grid grid-cols-1 gap-4">
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
                {errors[field] && (
                  <span className="text-sm text-red-500">{errors[field]}</span>
                )}
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
              {errors.department && (
                <span className="text-sm text-red-500">{errors.department}</span>
              )}
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
              {errors.jobTitle && (
                <span className="text-sm text-red-500">{errors.jobTitle}</span>
              )}
            </div>

            <div className="flex flex-col ">
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
              {errors.employmentType && (
                <span className="text-sm text-red-500">{errors.employmentType}</span>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              className="bg-[#006666] text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="bg-[#006666] text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={handleSubmit}
            >
              Add Employee
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
