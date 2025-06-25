import type React from "react"
import { X } from "lucide-react"
import type { Employee, FormData } from "../../components/EmployeeShift/employee"

const modalAnimationStyle = `
  @keyframes slideUp {
    0% { transform: translateY(100%); opacity: 0; }
    100% { transform: translateY(0); opacity: 1; }
  }
  .animate-slideUp {
    animation: slideUp 0.4s ease-out forwards;
  }
`

interface EditShiftModalProps {
  isOpen: boolean
  onClose: () => void
  employee: Employee | null
  formData: FormData
  onFormDataChange: (data: FormData) => void
  onSubmit: (e: React.FormEvent) => void
}

const EditShiftModal: React.FC<EditShiftModalProps> = ({
  isOpen,
  onClose,
  employee,
  formData,
  onFormDataChange,
  onSubmit,
}) => {
  if (!isOpen || !employee) return null

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    onFormDataChange({
      ...formData,
      [name]: value,
    })
  }

  return (
    <>
      <style>{modalAnimationStyle}</style>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg w-full max-w-2xl border animate-slideUp">
           <button onClick={onClose} className="absoulte top-2  -ml-[39px] text-white hover:text-gray-600 bg-blue-700 rounded-l-full h-10 w-10 flex items-center justify-center shadow">
              <X size={30} />
            </button>
          <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-black">Edit Rotating Shift</h2>
            {/* <button onClick={onClose} className="text-gray hover:text-gray-500">
              <X className="w-5 h-5" />
            </button> */}
          </div>
          <form
            onSubmit={onSubmit}
            className="p-6 bg-clip-padding backdrop-filter backdrop-blur bg-opacity-10 backdrop-saturate-100 backdrop-contrast-100 shadow-2xl"
          >
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="employee" className="block text-sm font-medium text-gray-700">
                  Employee
                </label>
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

              <div className="sm:col-span-2">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title
                </label>
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

              <div>
                <label htmlFor="basedOn" className="block text-sm font-medium text-gray-700">
                  Based On
                </label>
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

              <div>
                <label htmlFor="rotate" className="block text-sm font-medium text-gray-700">
                  Rotate
                </label>
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

              <div>
                <label htmlFor="depaetment" className="block text-sm font-medium text-gray-700">
                  Department
                </label>
                <input
                  type="text"
                  name="depaetment"
                  id="depaetment"
                  value={formData.department}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                  placeholder="Department"
                  required
                />
              </div>

              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                  Start Date
                </label>
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

              <div>
                <label htmlFor="Category" className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <input
                  type="text"
                  name="Category"
                  id="Category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                  placeholder="Category"
                  required
                />
              </div>

              <div>
                <label htmlFor="currentShift" className="block text-sm font-medium text-gray-700">
                  Current Shift
                </label>
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

              <div>
                <label htmlFor="nextShift" className="block text-sm font-medium text-gray-700">
                  Next Shift
                </label>
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

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#006666] hover:bg-[#005353] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#006666] hover:bg-[#005353] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default EditShiftModal
