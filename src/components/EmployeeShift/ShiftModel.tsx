import React from "react"
import { X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import type { FormData } from "../../components/EmployeeShift/employee"

interface AssignShiftModalProps {
  isOpen: boolean
  onClose: () => void
  formData: FormData
  onFormDataChange: (data: FormData) => void
  onSubmit: (e: React.FormEvent) => void
}

const AssignShiftModal: React.FC<AssignShiftModalProps> = ({
  isOpen,
  onClose,
  formData,
  onFormDataChange,
  onSubmit,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    onFormDataChange({
      ...formData,
      [name]: value,
    })
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-md w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-black">Assign Rotating Shift</h2>
              <button onClick={onClose} className="text-black hover:text-gray-500">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={onSubmit}
              className="p-6 z-100 bg-clip-padding backdrop-filter backdrop-blur bg-opacity-10 backdrop-saturate-100 backdrop-contrast-100 shadow-2xl"
            >
              <div className="grid grid-cols-2 gap-y-3 gap-x-4 sm:grid-cols-2">
                {[
                  { label: "Employee", name: "employee", type: "text" },
                  { label: "Title", name: "title", type: "text" },
                  { label: "Rotate", name: "rotate", type: "text", placeholder: "e.g. Rotate after 5 days" },
                  { label: "Department", name: "department", type: "text" },
                  { label: "Job Role", name: "jobRole", type: "text" },
                  { label: "Start Date", name: "startDate", type: "date" },
                ].map((field) => (
                  <div key={field.name} className="sm:col-span-1">
                    <label htmlFor={field.name} className="block text-sm font-medium text-black">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      name={field.name}
                      id={field.name}
                      value={(formData as any)[field.name]}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                      placeholder={field.placeholder || ""}
                      required
                    />
                  </div>
                ))}

                <div className="sm:col-span-1">
                  <label htmlFor="basedOn" className="block text-sm font-medium text-black">Based On</label>
                  <select
                    id="basedOn"
                    name="basedOn"
                    value={formData.basedOn}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
                  >
                    <option value="After">After</option>
                    <option value="Weekend">Weekend</option>
                    <option value="Month">Month</option>
                  </select>
                </div>

                <div className="sm:col-span-1">
                  <label htmlFor="currentShift" className="block text-sm font-medium text-black">Current Shift</label>
                  <select
                    id="currentShift"
                    name="currentShift"
                    value={formData.currentShift}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
                  >
                    <option value="">Select shift</option>
                    <option value="Morning">Morning</option>
                    <option value="Night">Night</option>
                    <option value="Regular Shift">Regular Shift</option>
                    <option value="None">None</option>
                  </select>
                </div>

                <div className="sm:col-span-1">
                  <label htmlFor="nextShift" className="block text-sm font-medium text-black">Next Shift</label>
                  <select
                    id="nextShift"
                    name="nextShift"
                    value={formData.nextShift}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
                  >
                    <option value="">Select shift</option>
                    <option value="Morning">Morning</option>
                    <option value="Night">Night</option>
                    <option value="Regular Shift">Regular Shift</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-md text-sm font-medium text-white bg-[#006666] hover:bg-[#005353]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md text-sm font-medium text-white bg-[#5e59a9] hover:bg-[#4c4aa1]"
                >
                  Assign Shift
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default AssignShiftModal
