import type React from "react"
import { useState, useEffect, useRef } from "react"
import { X, Calendar } from "lucide-react"

interface Asset {
  id: string
  name: string
  status: "Available" | "Not-Available"
  trackingId: string
  batchNo: string
  avatar: string
  avatarBg: string
  description?: string
  category?: string
  purchaseDate?: string
  cost?: string
  expiryDate?: string
}

interface AddAssetModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (asset: Omit<Asset, "id">) => void
  category: string
}

const AddAssetModal: React.FC<AddAssetModalProps> = ({ isOpen, onClose, onSave, category }) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const [formData, setFormData] = useState<Omit<Asset, "id">>({
    name: "",
    status: "Available",
    trackingId: "",
    batchNo: "",
    avatar: "",
    avatarBg: "",
    description: "",
    category: category,
    purchaseDate: "",
    cost: "",
    expiryDate: "",
  })

  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  // Avatar background colors
  const avatarColors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-orange-500",
    "bg-cyan-500",
    "bg-gray-600",
  ]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        handleClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: "",
        status: "Available",
        trackingId: "",
        batchNo: category === "laptops" ? "LPB002" : "MOB001",
        avatar: "",
        avatarBg: avatarColors[Math.floor(Math.random() * avatarColors.length)],
        description: "",
        category: category,
        purchaseDate: "",
        cost: "",
        expiryDate: "",
      })
      setErrors({})
    }
  }, [isOpen, category])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Generate avatar from name
    if (name === "name" && value) {
      const words = value.trim().split(" ")
      const avatar =
        words.length > 1 ? words[0][0].toUpperCase() + words[1][0].toUpperCase() : value.substring(0, 2).toUpperCase()
      setFormData((prev) => ({ ...prev, avatar }))
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.name?.trim()) {
      newErrors.name = "Asset name is required"
    }
    if (!formData.trackingId?.trim()) {
      newErrors.trackingId = "Tracking ID is required"
    }
    if (!formData.cost?.trim()) {
      newErrors.cost = "Cost is required"
    } else {
      // Validate cost is a valid number
      const costNumber = Number.parseFloat(formData.cost)
      if (Number.isNaN(costNumber) || costNumber <= 0) {
        newErrors.cost = "Cost must be a valid positive number"
      }
    }
    if (!formData.purchaseDate) {
      newErrors.purchaseDate = "Purchase date is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    // Ensure all required fields have values before saving
    const assetData: Omit<Asset, "id"> = {
      name: formData.name || "",
      status: formData.status || "Available",
      trackingId: formData.trackingId || "",
      batchNo: formData.batchNo || "",
      avatar: formData.avatar || "",
      avatarBg: formData.avatarBg || "bg-gray-500",
      description: formData.description || "",
      category: formData.category || category,
      purchaseDate: formData.purchaseDate || "",
      cost: formData.cost || "0",
      expiryDate: formData.expiryDate || "",
    }

    onSave(assetData)
    onClose()
  }

  const handleClose = () => {
    setFormData({
      name: "",
      status: "Available",
      trackingId: "",
      batchNo: "",
      avatar: "",
      avatarBg: "",
      description: "",
      category: "",
      purchaseDate: "",
      cost: "",
      expiryDate: "",
    })
    setErrors({})
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div ref={modalRef} className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Add New Asset to {category}</h2>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Asset Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name || ""}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#006666] focus:border-transparent ${
                  errors.name ? "border-red-300" : "border-gray-300"
                }`}
                placeholder="Enter asset name"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description || ""}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#006666] focus:border-transparent"
                placeholder="Enter asset description"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="trackingId" className="block text-sm font-medium text-gray-700 mb-1">
                  Tracking ID *
                </label>
                <input
                  type="text"
                  id="trackingId"
                  name="trackingId"
                  value={formData.trackingId || ""}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#006666] focus:border-transparent ${
                    errors.trackingId ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder="e.g., LPT0040"
                />
                {errors.trackingId && <p className="text-red-500 text-xs mt-1">{errors.trackingId}</p>}
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={formData.category || ""}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600 capitalize"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="purchaseDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Purchase Date *
                </label>
                <div className="relative">
                  <input
                    type="date"
                    id="purchaseDate"
                    name="purchaseDate"
                    value={formData.purchaseDate || ""}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#006666] focus:border-transparent ${
                      errors.purchaseDate ? "border-red-300" : "border-gray-300"
                    }`}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <Calendar className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
                {errors.purchaseDate && <p className="text-red-500 text-xs mt-1">{errors.purchaseDate}</p>}
              </div>

              <div>
                <label htmlFor="cost" className="block text-sm font-medium text-gray-700 mb-1">
                  Cost *
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  id="cost"
                  name="cost"
                  value={formData.cost || ""}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#006666] focus:border-transparent ${
                    errors.cost ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder="e.g., 1299.00"
                />
                {errors.cost && <p className="text-red-500 text-xs mt-1">{errors.cost}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <div className="relative">
                  <select
                    id="status"
                    name="status"
                    value={formData.status || "Available"}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#006666] focus:border-transparent appearance-none"
                  >
                    <option value="Available">Available</option>
                    <option value="Not-Available">Not-Available</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="batchNo" className="block text-sm font-medium text-gray-700 mb-1">
                  Batch No
                </label>
                <div className="relative">
                  <select
                    id="batchNo"
                    name="batchNo"
                    value={formData.batchNo || ""}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#006666] focus:border-transparent appearance-none"
                  >
                    <option value="LPB002">LPB002</option>
                    <option value="MOB001">MOB001</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                Expiry Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  id="expiryDate"
                  name="expiryDate"
                  value={formData.expiryDate || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#006666] focus:border-transparent"
                />
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <Calendar className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Avatar Preview */}
            {formData.avatar && (
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${formData.avatarBg || "bg-gray-500"}`}
                >
                  {formData.avatar}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Avatar Preview</p>
                  <p className="text-xs text-gray-500">Generated from asset name</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 mt-8">
            <button
              type="button"
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#006666] text-white rounded-md hover:bg-[#005252] transition-colors"
            >
              Add Asset
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddAssetModal
