"use client"

import type React from "react"

import { Edit3 } from "lucide-react"
import type { Asset, Employee } from "../types/assets"
import { getCategoryIcon, getStatusColor } from "../utils/asset-utils"

interface AssetDetailsModalProps {
  selectedAsset: Asset
  getEmployeeDetails: (employeeName: string) => Employee | null
  setShowDetailModal: (show: boolean) => void
  handleEditAsset: (asset: Asset) => void
}

const AssetDetailsModal: React.FC<AssetDetailsModalProps> = ({
  selectedAsset,
  getEmployeeDetails,
  setShowDetailModal,
  handleEditAsset,
}) => {
  const employee = getEmployeeDetails(selectedAsset.assignedTo)

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/90 backdrop-blur-sm rounded-md p-4 w-full max-w-4xl shadow-2xl border border-white/20 transform transition-all duration-300 scale-100 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-teal-600 bg-clip-text text-transparent">
            Asset Details
          </h2>
          <button
            onClick={() => setShowDetailModal(false)}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Close details"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white/60 rounded-md p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-[#006666] rounded-md text-white">{getCategoryIcon(selectedAsset.category)}</div>
              <div>
                <h3 className="text-xl font-semibold text-slate-800">Asset Information</h3>
                <p className="text-slate-600">Complete asset details</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-600">Asset Name</label>
                  <p className="text-lg font-semibold text-slate-800">{selectedAsset.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600">Category</label>
                  <div className="flex items-center gap-2 mt-1">
                    {getCategoryIcon(selectedAsset.category)}
                    <span className="text-slate-800 font-medium">{selectedAsset.category}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-600">Serial Number</label>
                  <code className="block bg-slate-100 px-3 py-2 rounded-md text-sm font-mono text-slate-800 mt-1">
                    {selectedAsset.serialNumber}
                  </code>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600">Status</label>
                  <div className="mt-1">
                    <span
                      className={`inline-flex px-3 py-1 rounded-md text-xs font-medium border ${getStatusColor(selectedAsset.status)}`}
                    >
                      {String(selectedAsset.status).charAt(0).toUpperCase() + String(selectedAsset.status).slice(1)}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-600">Date Added</label>
                <p className="text-slate-800 font-medium mt-1">
                  {new Date(selectedAsset.dateAdded).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-600">Asset ID</label>
                <p className="text-slate-800 font-medium mt-1">#{selectedAsset.id}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/60 rounded-md p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-[#006666] rounded-md flex items-center justify-center text-white text-md font-medium">
                {selectedAsset.assignedTo
                  .split(" ")
                  .map((n:any) => n[0])
                  .join("")}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-800">Employee Information</h3>
                <p className="text-slate-600">Assigned user details</p>
              </div>
            </div>

            {employee ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-600">Full Name</label>
                    <p className="text-lg font-semibold text-slate-800">{employee.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-600">Position</label>
                    <p className="text-slate-800 font-medium">{employee.position}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-600">Department</label>
                    <p className="text-slate-800 font-medium">{employee.department}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-600">Manager</label>
                    <p className="text-slate-800 font-medium">{employee.manager}</p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-600">Email Address</label>
                  <a
                    href={`mailto:${employee.email}`}
                    className="block text-teal-600 hover:text-teal-700 font-medium mt-1"
                  >
                    {employee.email}
                  </a>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-600">Phone Number</label>
                  <a
                    href={`tel:${employee.phone}`}
                    className="block text-teal-600 hover:text-teal-700 font-medium mt-1"
                  >
                    {employee.phone}
                  </a>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-600">Start Date</label>
                  <p className="text-slate-800 font-medium mt-1">
                    {new Date(employee.startDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <p className="text-slate-600">Employee details not found</p>
                <p className="text-sm text-slate-500">Assigned to: {selectedAsset.assignedTo}</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-3 mt-8 pt-6 border-t border-slate-200">
          <button
            onClick={() => {
              setShowDetailModal(false)
              handleEditAsset(selectedAsset)
            }}
            className="flex items-center gap-2 px-4 py-2 bg-[#006666] text-white rounded-md hover:shadow-lg hover:scale-105 transition-all font-medium"
          >
            <Edit3 className="w-4 h-4" />
            Edit Asset
          </button>
          <button
            onClick={() => setShowDetailModal(false)}
            className="px-4 py-2 border border-slate-300 text-slate-700 rounded-md hover:bg-slate-50 transition-all font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default AssetDetailsModal
