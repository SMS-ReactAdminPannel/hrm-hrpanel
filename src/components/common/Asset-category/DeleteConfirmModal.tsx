

import type React from "react"
import { useRef, useEffect } from "react"
import { AlertTriangle } from "lucide-react"
import { FONTS } from "../../../constants/uiConstants"

interface DeleteConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  categoryName: string
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({ isOpen, onClose, onConfirm, categoryName }) => {
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
    <div className="fixed inset-0 bg-black/10  bg-opacity-50 flex items-center justify-center z-50 p-4
     backdrop-filter backdrop-blur bg-opacity-10 backdrop-saturate-100 backdrop-contrast-100">

      <div ref={modalRef} className="bg-white rounded-lg shadow-xl w-full max-w-md
       backdrop-filter backdrop-blur bg-opacity-10 backdrop-saturate-100 backdrop-contrast-100
       border border-white">

        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <h2 className="text-xl font-semibold text-white"
            style={{ ...FONTS.header3 }}>Delete Category</h2>
          </div>

          <p className="text-white mb-6"
          style={{ ...FONTS.paragraph }}>
            Are you sure you want to delete the category <span className="font-medium">"{categoryName}"</span>? This
            action cannot be undone and will remove all assets in this category.
          </p>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              style={{ ...FONTS.paragraph }}
              className="flex-1 px-4 py-2 border border-gray-300 text-white
             rounded-lg hover:bg-gray-500 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              style={{ ...FONTS.paragraph }}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Delete Category
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteConfirmModal
