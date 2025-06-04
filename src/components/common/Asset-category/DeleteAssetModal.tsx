import type React from "react"
import { useRef, useEffect } from "react"
import { AlertTriangle } from "lucide-react"

interface DeleteAssetModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  assetName: string
}

const DeleteAssetModal: React.FC<DeleteAssetModalProps> = ({ isOpen, onClose, onConfirm, assetName }) => {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div ref={modalRef} className="bg-white rounded-md shadow-xl w-full max-w-md">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-red-100 rounded-md flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Delete Asset</h2>
          </div>

          <p className="text-gray-600 mb-6">
            Are you sure you want to delete the asset <span className="font-medium">"{assetName}"</span>? This action
            cannot be undone and will permanently remove this asset from the system.
          </p>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Delete Asset
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteAssetModal
