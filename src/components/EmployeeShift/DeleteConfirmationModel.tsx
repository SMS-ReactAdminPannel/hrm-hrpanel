import type React from "react"
import { X } from "lucide-react"
import type { Employee } from "../../components/EmployeeShift/employee"
import { FONTS } from "../../constants/uiConstants"

interface DeleteConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  employee: Employee | null
  onConfirm: () => void
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ isOpen, onClose, employee, onConfirm }) => {
  if (!isOpen || !employee) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold 
          !text-black" style={{...FONTS.cardheader}} >Confirm Deletion</h2>
          <button onClick={onClose} className="text-white-400 hover:text-gray-500">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">
          <p className="!text-gray-700 mb-6" style={{...FONTS.cardSubHeader}}>
            Are you sure you want to delete the rotating shift assignment for{" "}
            <span className="font-semibold">{employee.name}</span>?
          </p>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2  bg-gray-900/40 rounded-md shadow-sm text-sm font-medium text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#5e59a9] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteConfirmationModal
