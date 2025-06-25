"use client"
import type React from "react"
import { useState } from "react"
import { X } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

interface CreateCategoryModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (categoryData: { name: string; description: string }) => void
  editingCategory?: string | null
}

const CreateCategoryModal: React.FC<CreateCategoryModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  editingCategory,
}) => {
  const [formData, setFormData] = useState({
    name: editingCategory || "",
    description: "",
  })
  const [errors, setErrors] = useState<{ name?: string; description?: string }>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: { name?: string; description?: string } = {}
    if (!formData.name.trim()) newErrors.name = "Category name is required"
    if (!formData.description.trim()) newErrors.description = "Description is required"

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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ y: 100, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 100, opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-md shadow-2xl w-full max-w-2xl p-2 "
          >
          <button
  onClick={handleClose}
  className="absolute top-15 -ml-11 bg-blue-600 text-white   p-1 shadow hover:text-gray-600 ml-2 rounded-l-full"
>
  <X size={30}  />
</button>

            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              
              <h2 className="text-xl font-semibold text-black">
                {editingCategory ? "Edit Category" : "Create New Category"}
              </h2>
              {/* <button onClick={handleClose} className="hover:text-gray-600 transition-colors">
                <X className="w-5 h-5 text-black" />
              </button> */}
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-black mb-1">
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
                  <label htmlFor="description" className="block text-sm font-medium text-black mb-1">
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
                  {errors.description && (
                    <p className="text-red-500 text-xs mt-1">{errors.description}</p>
                  )}
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 px-4 py-2 bg-[#006666] text-white rounded-md hover:bg-[#005252] transition-colors"
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CreateCategoryModal
