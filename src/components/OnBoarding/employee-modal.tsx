"use client"

import { X } from "lucide-react"
import type { TeamMember } from "./use-onboarding-state"

interface EmployeeModalProps {
  isOpen: boolean
  employee: TeamMember | null
  onClose: () => void
  onViewDocs: (employeeName: string) => void
}

export function EmployeeModal({ isOpen, employee, onClose, onViewDocs }: EmployeeModalProps) {
  if (!isOpen || !employee) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-h-[90vh] w-full max-w-2xl overflow-hidden">
        <div className="flex items-center justify-between border-b p-4">
          <h3 className="text-lg font-semibold">{employee.name}'s Onboarding Details</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Role</p>
              <p className="font-medium">{employee.role}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{employee.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-medium">{employee.phone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Hire Date</p>
              <p className="font-medium">{employee.hireDate}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Onboarding Status</p>
              <p
                className={`font-medium ${
                  employee.onboardingStatus === "Completed"
                    ? "text-green-600"
                    : employee.onboardingStatus === "In Progress"
                      ? "text-yellow-600"
                      : "text-red-600"
                }`}
              >
                {employee.onboardingStatus}
              </p>
            </div>
          </div>

          <div className="pt-4">
            <h4 className="font-medium mb-2">Document Status</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>I-9 Form</span>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    employee.documents.i9Form ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}
                >
                  {employee.documents.i9Form ? "Completed" : "Pending"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>W-4 Form</span>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    employee.documents.w4Form ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}
                >
                  {employee.documents.w4Form ? "Completed" : "Pending"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Direct Deposit</span>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    employee.documents.directDeposit ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}
                >
                  {employee.documents.directDeposit ? "Completed" : "Pending"}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              onClick={() => onViewDocs(employee.name)}
              className="px-4 py-2 bg-[#006666] text-white rounded-md hover:bg-[#005555] transition-colors"
            >
              View Documents
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
