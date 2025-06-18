import type React from "react"
import { useState } from "react"
import { X } from "lucide-react"
import type { Employee, Department, JobTitle, EmploymentType } from "../../components/Employee/Employee"
import { FONTS } from "../../constants/uiConstants"

interface AddEmployeeModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (employee: Employee) => void
  subDepartments: Record<Department, string[]>
}

type WorkMode = 'On-site' | 'Hybrid' | 'Remote'


export const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({ 
  isOpen, 
  onClose, 
  onAdd,
  subDepartments 
}) => {
  const [newEmployee, setNewEmployee] = useState<Omit<Employee, 'id'> & { id: string, workMode: WorkMode }>({
    id: "",
    name: "",
    email: "",
    contactNumber: "",
    department: "",
    subDepartment: "",
    jobTitle: "",
    hireDate: "",
    employmentType: "",
    workMode: ""
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
      "subDepartment",
      "jobTitle",
      "employmentType",
      "workMode"
    ]

    requiredFields.forEach((field) => {
      if (!newEmployee[field as keyof typeof newEmployee]?.toString()?.trim()) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`
      }
    })

    if (!/^\S+@\S+\.\S+$/.test(newEmployee.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onAdd(newEmployee as Employee)
    setNewEmployee({
      id: "",
      name: "",
      email: "",
      contactNumber: "",
      department: "",
      subDepartment: "",
      jobTitle: "",
      hireDate: "",
      employmentType: "",
      workMode: ""
    })
    setErrors({})
    onClose()
  }

  const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const department = e.target.value as Department
    setNewEmployee({ 
      ...newEmployee, 
      department,
      subDepartment: "" // Reset sub-department when department changes
    })
    setErrors({ ...errors, department: "", subDepartment: "" })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="p-6 rounded-lg w-full max-w-xl shadow-lg relative bg-black/40 backdrop-blur-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold !text-white" style={{...FONTS.cardheader}}>
            Add New Employee
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 ">
          {[
            { field: "id", label: "Employee ID", type: "text" },
            { field: "name", label: "Name", type: "text" },
            { field: "email", label: "Email", type: "email" },
            { field: "contactNumber", label: "Contact Number", type: "tel" },
            { field: "hireDate", label: "Hire Date", type: "date" }
          ].map(({ field, label, type }) => (
            <div key={field} className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-white">{label}</label>
              <input
                type={type}
                placeholder={label}
                value={newEmployee[field as keyof typeof newEmployee] as string}
                onChange={(e) => {
                  setNewEmployee({ ...newEmployee, [field]: e.target.value })
                  setErrors({ ...errors, [field]: "" })
                }}
                className={`border rounded p-2 ${errors[field] ? "border-red-500" : ""}`}
              />
              {errors[field] && (
                <span className="text-sm !text-red-500" style={{...FONTS.subParagraph}}>
                  {errors[field]}
                </span>
              )}
            </div>
          ))}

         <div className="flex flex-col">
  <label className="mb-1 text-sm font-medium text-white">Department</label>
  <select
    value={newEmployee.department}
    onChange={handleDepartmentChange}
    className={`border rounded p-2 ${errors.department ? "border-red-500" : ""}`}
  >
    <option value="">Select Department</option>
    {Object.keys(subDepartments).map((dept) => (
      <option key={dept} value={dept}>
        {dept}
      </option>
    ))}
  </select>
  {errors.department && (
    <span className="text-sm !text-red-500" style={{...FONTS.subParagraph}}>
      {errors.department}
    </span>
  )}
</div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-white">Sub-Department</label>
            <select
              value={newEmployee.subDepartment}
              onChange={(e) => {
                setNewEmployee({ ...newEmployee, subDepartment: e.target.value })
                setErrors({ ...errors, subDepartment: "" })
              }}
              className={`border rounded p-2 ${errors.subDepartment ? "border-red-500" : ""}`}
              disabled={!newEmployee.department}
            >
              <option value="">Select Sub-Department</option>
              {newEmployee.department && subDepartments[newEmployee.department].map((subDept) => (
                <option key={subDept} value={subDept}>
                  {subDept}
                </option>
              ))}
            </select>
            {errors.subDepartment && (
              <span className="text-sm !text-red-500" style={{...FONTS.subParagraph}}>
                {errors.subDepartment}
              </span>
            )}
          </div>

          <div className="flex flex-col">
  <label className="mb-1 text-sm font-medium text-white">Job Title</label>
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
    <span className="text-sm !text-red-500" style={{...FONTS.subParagraph}}>
      {errors.jobTitle}
    </span>
  )}
</div>

          <div className="flex flex-col">
  <label className="mb-1 text-sm font-medium text-white">Employment Type</label>
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
    <span className="text-sm !text-red-500" style={{...FONTS.subParagraph}}>
      {errors.employmentType}
    </span>
  )}
</div>
<div className="flex flex-col">
  <label className="mb-1 text-sm font-medium text-white">Work Mode</label>
  <select
    value={newEmployee.workMode}
    onChange={(e) => {
      setNewEmployee({ ...newEmployee, workMode: e.target.value as WorkMode })
      setErrors({ ...errors, workMode: "" })
    }}
    className={`border rounded p-2 ${errors.workMode ? "border-red-500" : ""}`}
  >
    <option value="">Select Work Mode</option>
    {["On-site", "Hybrid", "Remote"].map((mode) => (
      <option key={mode} value={mode}>
        {mode}
      </option>
    ))}
  </select>
  {errors.workMode && (
    <span className="text-sm !text-red-500" style={{...FONTS.subParagraph}}>
      {errors.workMode}
    </span>
  )}
</div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button 
            className="bg-gray-300 !text-black px-4 py-2 rounded hover:bg-gray-400" 
            style={{...FONTS.paragraph}} 
            onClick={onClose}
          >
            Cancel
          </button>
          <button 
            className="bg-[#006666] !text-white px-4 py-2 rounded hover:bg-teal-700" 
            style={{...FONTS.paragraph}} 
            onClick={handleSubmit}
          >
            Add Employee
          </button>
        </div>
      </div>
    </div>
  )
}