"use client"

import type React from "react"

import { Trash2 } from "lucide-react"
import type { Asset } from "../types/assets"
import { toast } from "react-toastify"

interface DeleteAssetModalProps {
  assetToDelete: Asset
  confirmDeleteAsset: () => void
  setShowDeleteModal: (show: boolean) => void
}

const DeleteAssetModal: React.FC<DeleteAssetModalProps> = ({
  assetToDelete,
  confirmDeleteAsset,
  setShowDeleteModal,
}) => {
  const handleDelete = () => {
    confirmDeleteAsset()
    toast.success("Asset deleted successfully!", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      toastId: "delete-success",
    })
  }

  return (
    <div className="fixed inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/90 backdrop-blur-sm rounded-md p-8 w-full max-w-md shadow-2xl border border-white/20 transform transition-all duration-300 scale-100">
        <div className="text-center">
          <div className="w-16 h-16 bg-[#006666] rounded-full flex items-center justify-center mx-auto mb-4">
            <Trash2 className="w-8 h-8 text-[white]" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Delete Asset</h2>
          <p className="text-slate-600 mb-6">
            Are you sure you want to delete <span className="font-semibold">"{assetToDelete.name}"</span>? This action
            cannot be undone.
          </p>

          <div className="flex gap-3">
            <button
              onClick={() => setShowDeleteModal(false)}
              className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-md hover:bg-slate-50 transition-all font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="flex-1 px-4 py-2 bg-[#006666] text-white rounded-md hover:shadow-lg hover:scale-105 transition-all font-medium"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteAssetModal
