"use client"

import { X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import type { TeamMember } from "./use-onboarding-state"

interface EmployeeModalProps {
  isOpen: boolean
  employee: TeamMember | null
  onClose: () => void
  onViewDocs: (employeeName: string) => void
}

export function EmployeeModal({
  isOpen,
  employee,
  onClose,
  onViewDocs,
}: EmployeeModalProps) {
  return (
    <AnimatePresence>
      {isOpen && employee && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-white rounded-lg max-h-[90vh] w-full max-w-2xl "
          >
              <button
                onClick={onClose}
                className="absoulte top-2 left-3 -ml-10  text-white hover:text-gray-600 bg-blue-700 rounded-l-full h-10 w-10 flex items-center justify-center shadow "
              >
                <X size={30} />
              </button>
            <div className="flex items-center border-b p-4 -mt-10 ">
              <h3 className="text-lg font-semibold">
                {employee.name}'s Onboarding Details
              </h3>
            
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <InfoItem label="Role" value={employee.role} />
                <InfoItem label="Email" value={employee.email} />
                <InfoItem label="Phone" value={employee.phone} />
                <InfoItem label="Hire Date" value={employee.hireDate} />
                <InfoItem
                  label="Onboarding Status"
                  value={employee.onboardingStatus}
                  valueClass={
                    employee.onboardingStatus === "Completed"
                      ? "text-green-600"
                      : employee.onboardingStatus === "In Progress"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }
                />
              </div>

              <div className="pt-4">
                <h4 className="font-medium mb-2">Document Status</h4>
                <DocumentStatus label="I-9 Form" status={employee.documents.i9Form} />
                <DocumentStatus label="W-4 Form" status={employee.documents.w4Form} />
                <DocumentStatus label="Direct Deposit" status={employee.documents.directDeposit} />
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function InfoItem({ label, value, valueClass = "" }: { label: string; value: string; valueClass?: string }) {
  return (
    <div>
      <p className="text-sm text-gray-800">{label}</p>
      <p className={`font-medium border rounded px-2 py-1 ${valueClass}`}>{value}</p>
    </div>
  )
}

function DocumentStatus({ label, status }: { label: string; status: boolean }) {
  return (
    <div className="flex items-center justify-between mb-2">
      <span>{label}</span>
      <span
        className={`px-2 py-1 text-xs rounded-full ${
          status ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
        }`}
      >
        {status ? "Completed" : "Pending"}
      </span>
    </div>
  )
}
