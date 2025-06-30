import type React from "react"
import { X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import CustomDropdown from "./CustomDropdown"

// Mock FONTS constant for demo
const FONTS = {
  subHeader: { fontWeight: 600 },
  statusCardHeader: { fontWeight: 500 },
}

interface FormData {
  employee: string
  title: string
  rotate: string
  jobRole: string
  startDate: string
  department: string
  subDepartment: string
  basedOn: string
  currentShift: string
  nextShift: string
}

interface AssignShiftModalProps {
  isOpen: boolean
  onClose: () => void
  formData: FormData
  onFormDataChange: (data: FormData) => void
  onSubmit: (e: React.FormEvent) => void
}

const DEPARTMENTS = [
  {
    name: "Human Resources",
    subDepartments: ["Recruitment", "Employee Relations", "Payroll", "Training & Development"],
  },
  {
    name: "Information Technology",
    subDepartments: ["Software Development", "Network Administration", "Cybersecurity", "Technical Support"],
  },
  {
    name: "Finance",
    subDepartments: ["Accounting", "Financial Planning", "Audit", "Treasury"],
  },
  {
    name: "Operations",
    subDepartments: ["Production", "Quality Control", "Supply Chain", "Maintenance"],
  },
  {
    name: "Marketing",
    subDepartments: ["Digital Marketing", "Brand Management", "Market Research", "Public Relations"],
  },
  {
    name: "Sales",
    subDepartments: ["Inside Sales", "Field Sales", "Customer Success", "Business Development"],
  },
]

const AssignShiftModal: React.FC<AssignShiftModalProps> = ({
  isOpen,
  onClose,
  formData,
  onFormDataChange,
  onSubmit,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    onFormDataChange({
      ...formData,
      [name]: value,
    })
  }

  const handleDropdownChange = (name: string, value: string) => {
    if (name === "department") {
      onFormDataChange({
        ...formData,
        [name]: value,
        subDepartment: "", // Reset sub-department when department changes
      })
    } else {
      onFormDataChange({
        ...formData,
        [name]: value,
      })
    }
  }

  const getSubDepartments = () => {
    const selectedDept = DEPARTMENTS.find((dept) => dept.name === formData.department)
    return selectedDept ? selectedDept.subDepartments : []
  }

  // Convert departments to dropdown options
  const departmentOptions = DEPARTMENTS.map((dept) => ({
    value: dept.name,
    label: dept.name,
  }))

  const subDepartmentOptions = getSubDepartments().map((subDept) => ({
    value: subDept,
    label: subDept,
  }))

  const basedOnOptions = [
    { value: "After", label: "After" },
    { value: "Weekend", label: "Weekend" },
    { value: "Month", label: "Month" },
  ]

  const shiftOptions = [
    { value: "Morning", label: "Morning" },
    { value: "Night", label: "Night" },
    { value: "Regular Shift", label: "Regular Shift" },
    { value: "None", label: "None" },
  ]

  const nextShiftOptions = [
    { value: "Morning", label: "Morning" },
    { value: "Night", label: "Night" },
    { value: "Regular Shift", label: "Regular Shift" },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-md w-full item-center max-w-xl p-6 relative shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-1 -ml-[4rem] text-white hover:text-gray-600 bg-blue-700 rounded-l-full h-10 w-10 flex items-center justify-center shadow"
            >
              <X size={30} />
            </button>

            <div className="">
              {/* Header */}
              <h2 className="text-xl font-semibold !text-[#5e59a9] mb-4 border-b pb-2" style={{ ...FONTS.subHeader }}>
                Assign Rotating Shift
              </h2>

              {/* Form */}
              <form onSubmit={onSubmit} className="space-y-4 overflow-y-auto scrollbar-hide">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Employee", name: "employee", type: "text" },
                    { label: "Title", name: "title", type: "text" },
                    {
                      label: "Rotate",
                      name: "rotate",
                      type: "text",
                      placeholder: "e.g. every 5 days",
                    },
                    { label: "Job Role", name: "jobRole", type: "text" },
                    { label: "Start Date", name: "startDate", type: "date" },
                  ].map((field) => (
                    <div key={field.name}>
                      <label
                        className="block text-sm font-medium text-gray-800 mb-1"
                        htmlFor={field.name}
                        style={{ ...FONTS.statusCardHeader }}
                      >
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        name={field.name}
                        id={field.name}
                        value={(formData as any)[field.name]}
                        onChange={handleInputChange}
                        placeholder={field.placeholder || ""}
                        required
                        className="w-full border-0 border-b border-gray-400 focus:outline-none text-sm px-1 py-2 bg-transparent"
                        autoComplete="off"
                      />
                    </div>
                  ))}

                  {/* Department Dropdown */}
                  <div>
                    <label
                      htmlFor="department"
                      className="block text-sm font-medium text-gray-800 mb-1"
                      style={{ ...FONTS.statusCardHeader }}
                    >
                      Department
                    </label>
                    <CustomDropdown
                      id="department"
                      name="department"
                      value={formData.department}
                      onChange={(value) => handleDropdownChange("department", value)}
                      options={departmentOptions}
                      placeholder="Select department"
                      required
                    />
                  </div>

                  {/* Sub-Department Dropdown */}
                  <div>
                    <label
                      htmlFor="subDepartment"
                      className="block text-sm font-medium text-gray-800 mb-1"
                      style={{ ...FONTS.statusCardHeader }}
                    >
                      Sub-Department
                    </label>
                    <CustomDropdown
                      id="subDepartment"
                      name="subDepartment"
                      value={formData.subDepartment || ""}
                      onChange={(value) => handleDropdownChange("subDepartment", value)}
                      options={subDepartmentOptions}
                      placeholder={formData.department ? "Select sub-department" : "Select department first"}
                      disabled={!formData.department}
                    />
                  </div>

                  {/* Based On */}
                  <div>
                    <label
                      htmlFor="basedOn"
                      className="block text-sm font-medium text-gray-800 mb-1"
                      style={{ ...FONTS.statusCardHeader }}
                    >
                      Based On
                    </label>
                    <CustomDropdown
                      id="basedOn"
                      name="basedOn"
                      value={formData.basedOn}
                      onChange={(value) => handleDropdownChange("basedOn", value)}
                      options={basedOnOptions}
                      placeholder="Select option"
                    />
                  </div>

                  {/* Current Shift */}
                  <div>
                    <label
                      htmlFor="currentShift"
                      className="block text-sm font-medium text-gray-800 mb-1"
                      style={{ ...FONTS.statusCardHeader }}
                    >
                      Current Shift
                    </label>
                    <CustomDropdown
                      id="currentShift"
                      name="currentShift"
                      value={formData.currentShift}
                      onChange={(value) => handleDropdownChange("currentShift", value)}
                      options={shiftOptions}
                      placeholder="Select shift"
                      required
                    />
                  </div>

                  {/* Next Shift */}
                  <div>
                    <label
                      htmlFor="nextShift"
                      className="block text-sm font-medium text-gray-800 mb-1"
                      style={{ ...FONTS.statusCardHeader }}
                    >
                      Next Shift
                    </label>
                    <CustomDropdown
                      id="nextShift"
                      name="nextShift"
                      value={formData.nextShift}
                      onChange={(value) => handleDropdownChange("nextShift", value)}
                      options={nextShiftOptions}
                      placeholder="Select shift"
                      required
                    />
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex justify-end gap-3 pt-4 border-t">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md focus:outline-none"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-[#5e59a9] hover:bg-[#4c4aa1] rounded-md focus:outline-none"
                  >
                    Assign Shift
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default AssignShiftModal
