
import type React from "react"

import { useState, useRef, useEffect } from "react"
import { toast } from "react-toastify"
import type { Asset } from "../types/assets"
import { getCategoryIcon, getStatusColor } from "../utils/asset-utils"

interface AddEditAssetModalProps {
  newAsset: Omit<Asset, "id" | "dateAdded">
  setNewAsset: (asset: Omit<Asset, "id" | "dateAdded">) => void
  editingAsset: Asset | null
  handleAddAsset: () => void
  handleUpdateAsset: () => void
  handleCloseModal: () => void
}

const AddEditAssetModal: React.FC<AddEditAssetModalProps> = ({
  newAsset,
  setNewAsset,
  editingAsset,
  handleAddAsset,
  handleUpdateAsset,
  handleCloseModal,
}) => {
  const [showModalCategoryDropdown, setShowModalCategoryDropdown] = useState<boolean>(false)
  const [showModalStatusDropdown, setShowModalStatusDropdown] = useState<boolean>(false)

  const modalRef = useRef<HTMLDivElement>(null)
  const modalCategoryDropdownRef = useRef<HTMLDivElement>(null)
  const modalStatusDropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        handleCloseModal()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [handleCloseModal])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalCategoryDropdownRef.current && !modalCategoryDropdownRef.current.contains(event.target as Node)) {
        setShowModalCategoryDropdown(false)
      }
      if (modalStatusDropdownRef.current && !modalStatusDropdownRef.current.contains(event.target as Node)) {
        setShowModalStatusDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingAsset) {
      handleUpdateAsset()
      toast.success("Asset updated successfully!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    } else {
      handleAddAsset()
      toast.success("Asset added successfully!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div
        ref={modalRef}
        className="bg-white/90 backdrop-blur-sm rounded-md p-8 w-full max-w-md shadow-2xl border border-white/20 transform transition-all duration-300 scale-100 max-h-[90vh] overflow-y-auto"
      >
        <h2 className="text-2xl font-bold bg-[#006666] bg-clip-text text-transparent mb-6">
          {editingAsset ? "Edit Asset" : "Add New Asset"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Asset Name</label>
            <input
              type="text"
              required
              placeholder="Enter asset name"
              value={newAsset.name}
              onChange={(e) => setNewAsset({ ...newAsset, name: e.target.value })}
              className="w-full px-4 py-3 bg-white/70 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Assigned To</label>
            <input
              type="text"
              required
              placeholder="Enter assignee name"
              value={newAsset.assignedTo}
              onChange={(e) => setNewAsset({ ...newAsset, assignedTo: e.target.value })}
              className="w-full px-4 py-3 bg-white/70 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
            <div className="relative" ref={modalCategoryDropdownRef}>
              <button
                type="button"
                onClick={() => setShowModalCategoryDropdown(!showModalCategoryDropdown)}
                className="w-full px-4 py-3 bg-white/70 border border-slate-200 rounded-xl flex items-center justify-between focus:outline-none"
              >
                <span className={newAsset.category ? "text-slate-800" : "text-slate-500"}>
                  {newAsset.category || "Select category"}
                </span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${showModalCategoryDropdown ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showModalCategoryDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-sm border border-[#006666]/20 rounded-md shadow-xl z-50 overflow-hidden">
                  {["Laptop", "Monitor", "Accessory"].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        setNewAsset({ ...newAsset, category: cat })
                        setShowModalCategoryDropdown(false)
                      }}
                      className={`w-full px-4 py-3 text-left hover:bg-gradient-to-r hover:from-[#006666]/5 hover:to-[#006666]/10 transition-all duration-200 flex items-center gap-3 border-b border-gray-100 last:border-b-0 ${
                        newAsset.category === cat
                          ? "bg-[#006666]/10 text-[#006666] font-medium shadow-sm"
                          : "text-slate-700 hover:text-[#006666]"
                      }`}
                    >
                      {getCategoryIcon(cat)}
                      <span>{cat}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <input type="text" value={newAsset.category} required hidden readOnly />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Serial Number</label>
            <input
              type="text"
              required
              placeholder="Enter serial number"
              value={newAsset.serialNumber}
              onChange={(e) => setNewAsset({ ...newAsset, serialNumber: e.target.value })}
              className="w-full px-4 py-3 bg-white/70 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all font-mono"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
            <div className="relative" ref={modalStatusDropdownRef}>
              <button
                type="button"
                onClick={() => setShowModalStatusDropdown(!showModalStatusDropdown)}
                className="w-full px-4 py-3 bg-white/70 border border-slate-200 rounded-md flex items-center justify-between focus:outline-none"
              >
                <span className="flex items-center gap-2">
                  <span
                    className={`inline-flex px-2 py-1 rounded-md text-xs font-medium border ${getStatusColor(
                      newAsset.status,
                    )}`}
                  >
                    {String(newAsset.status).charAt(0).toUpperCase() + String(newAsset.status).slice(1)}
                  </span>
                </span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${showModalStatusDropdown ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showModalStatusDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white/90 backdrop-blur-sm border border-white/20 rounded-md shadow-xl z-50 overflow-hidden">
                  {(["active", "maintenance", "returned"] as const).map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => {
                        setNewAsset({ ...newAsset, status })
                        setShowModalStatusDropdown(false)
                      }}
                      className={`w-full px-4 py-3 text-left hover:bg-gradient-to-r hover:from-teal-50 hover:to-cyan-50 transition-all duration-200 flex items-center gap-3 ${
                        newAsset.status === status ? "bg-[#006666]" : ""
                      }`}
                    >
                      <span
                        className={`inline-flex px-3 py-1 rounded-md text-xs font-medium border ${getStatusColor(
                          status,
                        )}`}
                      >
                        {String(status).charAt(0).toUpperCase() + String(status).slice(1)}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <input type="text" value={newAsset.status} required hidden readOnly />
          </div>

          <div className="flex gap-3 mt-8">
            <button
              type="button"
              onClick={handleCloseModal}
              className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-md hover:bg-slate-50 transition-all font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-[#006666] text-white rounded-md hover:shadow-lg hover:scale-105 transition-all font-medium"
            >
              {editingAsset ? "Update Asset" : "Add Asset"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddEditAssetModal
