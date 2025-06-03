import type React from "react"
import { Edit, Trash2 } from "lucide-react"

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

interface AssetTableProps {
  assets: Asset[]
  onEditAsset: (asset: Asset) => void
  onDeleteAsset: (asset: Asset) => void
  onViewAsset: (asset: Asset) => void
}

const AssetTable: React.FC<AssetTableProps> = ({ assets, onEditAsset, onDeleteAsset, onViewAsset }) => {
  const getStatusColor = (status: string) => {
    return status === "Available"
      ? "text-green-600 bg-green-50 border-green-200"
      : "text-red-600 bg-red-50 border-red-200"
  }

  if (assets.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No assets found matching your search criteria.</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Asset</th>
            <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tracking Id
            </th>
            <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Batch No</th>
            <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {assets.map((asset) => (
            <tr
              key={asset.id}
              className="hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => onViewAsset(asset)}
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${asset.avatarBg}`}
                  >
                    {asset.avatar}
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-900">{asset.name}</span>
                    {asset.description && (
                      <p className="text-xs text-gray-500 truncate max-w-xs">{asset.description}</p>
                    )}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(asset.status)}`}
                >
                  {asset.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-sm text-[#006666] hover:text-[#004d4d] font-medium">{asset.trackingId}</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-sm text-gray-900">{asset.batchNo}</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onEditAsset(asset)
                    }}
                    className="p-1 text-gray-400 hover:text-[#006666] transition-colors"
                    title="Edit Asset"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onDeleteAsset(asset)
                    }}
                    className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                    title="Delete Asset"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AssetTable
