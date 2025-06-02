import type React from "react"
import { useRef, useEffect } from "react"
import { X, Calendar, DollarSign, Package, User, Hash, Tag, Clock } from "lucide-react"

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

interface AssetDetailsCardProps {
  isOpen: boolean
  onClose: () => void
  asset: Asset | null
  onEdit: (asset: Asset) => void
}

const AssetDetailsCard: React.FC<AssetDetailsCardProps> = ({ isOpen, onClose, asset, onEdit }) => {
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

  if (!isOpen || !asset) return null

  const getStatusColor = (status: string) => {
    return status === "Available"
      ? "text-green-600 bg-green-50 border-green-200"
      : "text-red-600 bg-red-50 border-red-200"
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Not specified"
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatCurrency = (amount?: string) => {
    if (!amount) return "Not specified"
    return `$${Number.parseFloat(amount).toLocaleString()}`
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div ref={modalRef} className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-[#006666] to-[#008080]">
          <div className="flex items-center gap-4">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold ${asset.avatarBg}`}
            >
              {asset.avatar}
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{asset.name}</h2>
              <p className="text-white/80 text-sm">Asset Details</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Status Badge */}
          <div className="mb-6">
            <span
              className={`inline-flex px-4 py-2 text-sm font-medium rounded-full border ${getStatusColor(asset.status)}`}
            >
              {asset.status}
            </span>
          </div>

          {/* Asset Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Basic Information</h3>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Hash className="w-5 h-5 text-[#006666] mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Asset ID</p>
                    <p className="text-gray-900 font-mono">{asset.id}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Tag className="w-5 h-5 text-[#006666] mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Tracking ID</p>
                    <p className="text-gray-900 font-mono text-[#006666] font-semibold">{asset.trackingId}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Package className="w-5 h-5 text-[#006666] mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Category</p>
                    <p className="text-gray-900 capitalize">{asset.category || "Not specified"}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Package className="w-5 h-5 text-[#006666] mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Batch Number</p>
                    <p className="text-gray-900 font-mono">{asset.batchNo}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Financial & Dates */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                Financial & Timeline
              </h3>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <DollarSign className="w-5 h-5 text-[#006666] mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Cost</p>
                    <p className="text-gray-900 font-semibold text-lg">{formatCurrency(asset.cost)}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-[#006666] mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Purchase Date</p>
                    <p className="text-gray-900">{formatDate(asset.purchaseDate)}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#006666] mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Expiry Date</p>
                    <p className="text-gray-900">{formatDate(asset.expiryDate)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          {asset.description && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 mb-3">Description</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 leading-relaxed">{asset.description}</p>
              </div>
            </div>
          )}

          {/* Asset Summary Card */}
          <div className="mt-6 bg-gradient-to-r from-[#006666]/5 to-[#008080]/5 rounded-lg p-4 border border-[#006666]/20">
            <h4 className="font-semibold text-[#006666] mb-2">Asset Summary</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Status</p>
                <p className="font-medium text-gray-900">{asset.status}</p>
              </div>
              <div>
                <p className="text-gray-600">Category</p>
                <p className="font-medium text-gray-900 capitalize">{asset.category || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-600">Value</p>
                <p className="font-medium text-gray-900">{formatCurrency(asset.cost)}</p>
              </div>
              <div>
                <p className="text-gray-600">Age</p>
                <p className="font-medium text-gray-900">
                  {asset.purchaseDate
                    ? `${Math.floor((new Date().getTime() - new Date(asset.purchaseDate).getTime()) / (1000 * 60 * 60 * 24 * 30))} months`
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => {
              onEdit(asset)
              onClose()
            }}
            className="px-4 py-2 bg-[#006666] text-white rounded-lg hover:bg-[#005252] transition-colors flex items-center gap-2"
          >
            <User className="w-4 h-4" />
            Edit Asset
          </button>
        </div>
      </div>
    </div>
  )
}

export default AssetDetailsCard
