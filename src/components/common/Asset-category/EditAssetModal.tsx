
import type React from "react"
import { useState, useEffect, useRef } from "react"
import { X, Calendar } from "lucide-react"
import { FONTS } from "../../../constants/uiConstants"

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

interface EditAssetModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (asset: Asset) => void
  asset: Asset | null
}

const EditAssetModal: React.FC<EditAssetModalProps> = ({ isOpen, onClose, onSave, asset }) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const [formData, setFormData] = useState<Asset>({
    id: "",
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

  useEffect(() => {
    if (asset) {
      setFormData({
        ...asset,
        description: asset.description || "",
        category: asset.category || "",
        purchaseDate: asset.purchaseDate || "",
        cost: asset.cost || "",
        expiryDate: asset.expiryDate || "",
      })
    }
  }, [asset])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/10   flex items-center justify-center z-50 
    backdrop-filter backdrop-blur bg-opacity-10 backdrop-saturate-100 backdrop-contrast-100">

      <div ref={modalRef} className="bg-white rounded-md h-[99%] shadow-xl w-full max-w-2xl
      backdrop-filter backdrop-blur bg-opacity-10 backdrop-saturate-100 backdrop-contrast-100
      border border-white ">

        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-white"
           style={{ ...FONTS.header2}}>Update Asset</h2>
          <button onClick={onClose} className="text-white hover:text-gray-900 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 gap-4 ">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white" style={{ ...FONTS.cardSubHeader}}>
                Asset Name
              </label>
              <input
                required
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                
                className="w-full px-3 py-2 border border-gray-300
                 rounded-md focus:outline-none focus:ring-2 focus:ring-[#006666] focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-white " style={{ ...FONTS.cardSubHeader }}>
                Description
              </label>
              <textarea
              
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                style={{ ...FONTS.paragraph }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md !text-black
                focus:outline-none focus:ring-2 focus:ring-[#006666] focus:border-transparent"
                placeholder="Description"
              />
            </div>

            <div className="grid grid-cols-2 gap-4"
              style={{ ...FONTS.cardSubHeader }}>
              <div>
                <label htmlFor="trackingId" className="block text-sm font-medium text-white ">
                  Tracking Id
                </label>
                <input
                required
                  type="text"
                  id="trackingId"
                  name="trackingId"
                  value={formData.trackingId}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 text-black
                  rounded-md focus:outline-none focus:ring-2 focus:ring-[#006666] focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-black " style={{ ...FONTS.cardSubHeader }}>
                  Category
                </label>
                <div className="relative" style={{ ...FONTS.paragraph }}>
                  <select
                  required
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md !text-black
                    focus:outline-none focus:ring-2 focus:ring-[#006666] focus:border-transparent appearance-none"
                  >
                    <option value="">Select category</option>
                    <option value="laptops">Laptops</option>
                    <option value="monitors">Monitors</option>
                    <option value="accessories">Accessories</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="purchaseDate" className="block text-sm font-medium text-white " style={{ ...FONTS.cardSubHeader }}>
                  Purchase Date
                </label>
                <div className="relative">
                  <input
                  required
                    type="date"
                    id="purchaseDate"
                    name="purchaseDate"
                    value={formData.purchaseDate}
                    onChange={handleChange}
                    style={{ ...FONTS.paragraph }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md !text-black
                    focus:outline-none focus:ring-2 focus:ring-[#006666] focus:border-transparent"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <Calendar className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="cost" className="block text-sm font-medium text-white " style={{ ...FONTS.cardSubHeader }}>
                  Cost
                </label>
                <input
                required
                  type="text"
                  id="cost"
                  name="cost"
                  value={formData.cost}
                  onChange={handleChange}
                  style={{ ...FONTS.paragraph }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md !text-black
                   focus:outline-none focus:ring-2 focus:ring-[#006666] focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-white " style={{ ...FONTS.cardSubHeader }}>
                  Status
                </label>
                <div className="relative">
                  <select
                  required
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    style={{ ...FONTS.paragraph }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md !text-black
                    focus:outline-none focus:ring-2 focus:ring-[#006666] focus:border-transparent appearance-none"
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
                <label htmlFor="batchNo" className="block text-sm font-medium text-white " style={{ ...FONTS.cardSubHeader }}>
                  Batch No
                </label>
                <div className="relative">
                  <select
                  required
                    id="batchNo"
                    name="batchNo"
                    value={formData.batchNo}
                    onChange={handleChange}
                    style={{ ...FONTS.paragraph }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md !text-black
                     focus:outline-none focus:ring-2 focus:ring-[#006666] focus:border-transparent appearance-none"
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
              <label htmlFor="expiryDate" className="block text-sm font-medium text-white " style={{ ...FONTS.cardSubHeader }}>
                Expiry Date
              </label>
              <div className="relative">
                <input
                required
                  type="date"
                  id="expiryDate"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  style={{ ...FONTS.paragraph }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md !text-black
                  focus:outline-none focus:ring-2 focus:ring-[#006666] focus:border-transparent"
                />
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <Calendar className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-8">
            <button
              type="button"
              className="px-4 py-2 bg-gray-200 !text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
              onClick={onClose}
              style={{ ...FONTS.button }}
            >
              Close
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#006666] text-white rounded-md hover:bg-[#005252] transition-colors"
              style={{ ...FONTS.button }}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditAssetModal
