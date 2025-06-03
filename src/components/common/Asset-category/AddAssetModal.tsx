import type React from "react"
import { useState, useEffect, useRef } from "react"
import { X, Calendar, ChevronDown } from "lucide-react"

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

interface DropdownOption {
  value: string
  label: string
}

interface CustomDropdownProps {
  label: string
  value: string
  options: DropdownOption[]
  onChange: (value: string) => void
  placeholder?: string
  error?: string
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  label,
  value,
  options,
  onChange,
  placeholder = "Select an option",
  error
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const selectedOption = options.find(option => option.value === value)

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div
        className={`w-full px-3 py-2 pr-10 border rounded-md cursor-pointer transition-all duration-200 ${
          error 
            ? 'border-red-300 focus:ring-red-500' 
            : isOpen 
              ? 'border-[#006666] ring-2 ring-[#006666] ring-opacity-20' 
              : 'border-gray-300 hover:border-[#006666]'
        } bg-white`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-between">
          <span className={selectedOption ? 'text-gray-900' : 'text-gray-500'}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown 
            className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
              isOpen ? 'transform rotate-180' : ''
            }`} 
          />
        </div>
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {options.map((option) => (
            <div
              key={option.value}
              className={`px-3 py-2 cursor-pointer transition-colors duration-150 ${
                value === option.value
                  ? 'bg-[#006666] text-white'
                  : 'text-gray-900 hover:bg-gray-50'
              }`}
              onClick={() => {
                onChange(option.value)
                setIsOpen(false)
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
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

  const statusOptions: DropdownOption[] = [
    { value: "Available", label: "Available" },
    { value: "Not-Available", label: "Not Available" }
  ]

  const batchOptions: DropdownOption[] = [
    { value: "LPB002", label: "LPB002" },
    { value: "MOB001", label: "MOB001" }
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (name === "name" && value) {
      const words = value.trim().split(" ")
      const avatar =
        words.length > 1 ? words[0][0].toUpperCase() + words[1][0].toUpperCase() : value.substring(0, 2).toUpperCase()
      setFormData((prev) => ({ ...prev, avatar }))
    }

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleDropdownChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.name?.trim()) newErrors.name = "Asset name is required"
    if (!formData.trackingId?.trim()) newErrors.trackingId = "Tracking ID is required"
    if (!formData.cost?.trim()) newErrors.cost = "Cost is required"
    else {
      const costNumber = Number.parseFloat(formData.cost)
      if (Number.isNaN(costNumber) || costNumber <= 0) {
        newErrors.cost = "Cost must be a valid positive number"
      }
    }
    if (!formData.purchaseDate) newErrors.purchaseDate = "Purchase date is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (!validateForm()) return

    onSave({
      ...formData,
      avatarBg: formData.avatarBg || "bg-gray-500",
      cost: formData.cost || "0",
    })
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

        <div className="p-6 space-y-6">
          {/* Asset Name Input */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Asset Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#006666] ${
                errors.name ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter asset name"
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>

          {/* Tracking ID Input */}
          <div>
            <label htmlFor="trackingId" className="block text-sm font-medium text-gray-700 mb-1">
              Tracking ID *
            </label>
            <input
              type="text"
              id="trackingId"
              name="trackingId"
              value={formData.trackingId}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#006666] ${
                errors.trackingId ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter tracking ID"
            />
            {errors.trackingId && <p className="mt-1 text-sm text-red-600">{errors.trackingId}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Custom Status Dropdown */}
            <CustomDropdown
              label="Status"
              value={formData.status}
              options={statusOptions}
              onChange={(value) => handleDropdownChange('status', value)}
              placeholder="Select status"
              error={errors.status}
            />

            {/* Custom BatchNo Dropdown */}
            <CustomDropdown
              label="Batch No"
              value={formData.batchNo}
              options={batchOptions}
              onChange={(value) => handleDropdownChange('batchNo', value)}
              placeholder="Select batch number"
              error={errors.batchNo}
            />
          </div>

          {/* Cost Input */}
          <div>
            <label htmlFor="cost" className="block text-sm font-medium text-gray-700 mb-1">
              Cost *
            </label>
            <input
              type="number"
              id="cost"
              name="cost"
              value={formData.cost}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#006666] ${
                errors.cost ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter cost"
              min="0"
              step="0.01"
            />
            {errors.cost && <p className="mt-1 text-sm text-red-600">{errors.cost}</p>}
          </div>

          {/* Purchase Date Input */}
          <div>
            <label htmlFor="purchaseDate" className="block text-sm font-medium text-gray-700 mb-1">
              Purchase Date *
            </label>
            <input
              type="date"
              id="purchaseDate"
              name="purchaseDate"
              value={formData.purchaseDate}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#006666] ${
                errors.purchaseDate ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {errors.purchaseDate && <p className="mt-1 text-sm text-red-600">{errors.purchaseDate}</p>}
          </div>

          {/* Description Textarea */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#006666]"
              placeholder="Enter description (optional)"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-[#006666] text-white rounded-md hover:bg-[#005252] transition-colors"
              onClick={handleSubmit}
            >
              Add Asset
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddAssetModal