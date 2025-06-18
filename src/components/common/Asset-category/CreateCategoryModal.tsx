import type React from "react"
import { useState } from "react"
import { X } from 'lucide-react'

interface CreateCategoryModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (categoryData: { name: string; description: string }) => void
  editingCategory?: string | null
}

const CreateCategoryModal: React.FC<CreateCategoryModalProps> = ({ isOpen, onClose, onSubmit, editingCategory }) => {
  const [formData, setFormData] = useState({
    name: editingCategory || "",
    description: "",
  })
  const [errors, setErrors] = useState<{ name?: string; description?: string }>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors: { name?: string; description?: string } = {}
    if (!formData.name.trim()) {
      newErrors.name = "Category name is required"
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onSubmit(formData)
    setFormData({ name: "", description: "" })
    setErrors({})
  }

  const handleClose = () => {
    setFormData({ name: "", description: "" })
    setErrors({})
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="bg-black/20 rounded-md shadow-2xl w-[140%] max-w-2xl p-2
     backdrop-filter backdrop-blur bg-opacity-10 backdrop-saturate-100 backdrop-contrast-100 border border-white ">


      <div className="flex items-center justify-between p-6 border-b border-gray-200">

        <h2 className="text-xl font-semibold text-white">
          {editingCategory ? "Edit Category" : "Create New Category"}
        </h2>
        <button onClick={handleClose} className=" hover:text-gray-600 transition-colors">
          <X className="w-5 h-5 text-white" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-white mb-1">
              Category Name *
            </label>
            <input
            required
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006666] focus:border-transparent ${
                errors.name ? "border-red-300" : "border-gray-300"
              }`}
              placeholder="Enter category name (e.g., Laptops, Monitors)"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-white mb-1">
              Description *
            </label>
            <textarea
            required
              id="description"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006666] focus:border-transparent ${
                errors.description ? "border-red-300" : "border-gray-300"
              }`}
              placeholder="Enter category description"
            />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            type="button"
            onClick={handleClose}
            className="flex-1 px-4 py-2 border border-gray-300 text-white rounded-md hover:bg-gray-500 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 px-4 py-2 bg-[#006666] text-white rounded-md hover:bg-[#005252] transition-colors"
          >
            {editingCategory ? "Update" : "Create"} Category
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateCategoryModal
