import type React from "react"
import { X } from "lucide-react"
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
  if (!isOpen) return null

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    onFormDataChange({
      ...formData,
      [name]: value,
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-400 rounded-md w-full max-w-2xl">
        <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white-900">Assign Rotating Shift</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={onSubmit} className="p-6 z-100 bg-clip-padding backdrop-filter backdrop-blur bg-opacity-10 backdrop-saturate-100 backdrop-contrast-100 shadow-2xl">
          <div className="grid grid-cols-2 gap-y-3 gap-x-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="employee" className="block text-sm font-medium text-white">
                Employee
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="employee"
                  id="employee"
                  value={formData.employee}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                  required
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="title" className="block text-sm font-medium text-white">
                Title
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="basedOn" className="block text-sm font-medium text-white">
                Based On
              </label>
              <div className="mt-1">
                <select
                  id="basedOn"
                  name="basedOn"
                  value={formData.basedOn}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                >
                  <option value="After">After</option>
                  <option value="Weekend">Weekend</option>
                  <option value="Month">Month</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="rotate" className="block text-sm font-medium text-white">
                Rotate
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="rotate"
                  id="rotate"
                  value={formData.rotate}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                  placeholder="e.g. Rotate after 5 days"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="rotate" className="block text-sm font-medium text-white">
                Department
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="department"
                  id="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                  placeholder="Department"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="jobRole" className="block text-sm font-medium text-white">
                Job Role
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="jobRole"
                  id="jobRole"
                  value={formData.jobRole}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                  placeholder="Department"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-white">
                Start Date
              </label>
              <div className="mt-1">
                <input
                  type="date"
                  name="startDate"
                  id="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="currentShift" className="block text-sm font-medium text-white">
                Current Shift
              </label>
              <div className="mt-1">
                <select
                  id="currentShift"
                  name="currentShift"
                  value={formData.currentShift}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                  required
                >
                  <option value="">Select shift</option>
                  <option value="Morning">Morning</option>
                  <option value="Night">Night</option>
                  <option value="Regular Shift">Regular Shift</option>
                  <option value="None">None</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="nextShift" className="block text-sm font-medium text-white">
                Next Shift
              </label>
              <div className="mt-1">
                <select
                  id="nextShift"
                  name="nextShift"
                  value={formData.nextShift}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                  required
                >
                  <option value="">Select shift</option>
                  <option value="Morning">Morning</option>
                  <option value="Night">Night</option>
                  <option value="Regular Shift">Regular Shift</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 md:px-4 md:py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#006666] hover:bg-[#005353] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-2 md:px-4 md:py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#5e59a9] hover:bg-[#005353] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Assign Shift
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AssignShiftModal
