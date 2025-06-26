import type React from "react"
import { useState } from "react"
import { ChevronDown, ChevronRight, Edit, Trash2, Plus } from "lucide-react"
import AssetTable from "./AssetTable"
import LocalAsset from "../../../pages/Asset Category/Assetcategory";

interface Asset {
  id: string
  asset_name: string
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

interface AssetCategoryCardProps {
  category: string
  count: number
  assets: LocalAsset[]
  searchQuery: string
  onEditCategory: (category: string) => void
  onDeleteCategory: (category: string) => void
  onEditAsset: (asset: LocalAsset) => void
  onDeleteAsset: (asset: LocalAsset) => void
  onViewAsset: (asset:LocalAsset) => void
  onAddAsset: (category: string) => void
}

const AssetCategoryCard: React.FC<AssetCategoryCardProps> = ({
  category,
  count,
  assets,
  searchQuery,
  onEditCategory,
  onDeleteCategory,
  onEditAsset,
  onDeleteAsset,
  onViewAsset,
  onAddAsset,
}) => {
  const [isExpanded, setIsExpanded] = useState(true)

  
  const filteredAssets = assets?.filter(
    (asset) =>
      asset?.asset_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset?.trackingId?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  
  if (searchQuery && filteredAssets?.length === 0) {
    return null
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow mb-4">
      <div className="flex items-center justify-between p-4">
        <div
          className="flex items-center gap-3 cursor-pointer transition-colors flex-1 -m-2 p-2 rounded"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <ChevronDown className="w-4 h-4 text-gray-900" />
          ) : (
            <ChevronRight className="w-4 h-4 text-gray-900" />
          )}

          <div className="flex items-center gap-3">
            <span className="bg-[#006666] text-white text-xs font-medium px-2 py-1 rounded-full min-w-[24px] text-center">
              {searchQuery ? filteredAssets?.length : count}
            </span>
            <span className="font-medium text-gray-900 text-sm capitalize">{category}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onAddAsset(category)}
            className="p-1 text-gray-400 hover:text-[#006666] transition-colors"
            title="Add New Asset"
          >
            <Plus className="w-4 h-4 text-gray-600" />
          </button>
          <button
            onClick={() => onEditCategory(category)}
            className="p-1 text-gray-400 hover:text-[#006666] transition-colors"
            title="Edit Category"
          >
            <Edit className="w-4 h-4 text-gray-600" />
          </button>
          <button
            onClick={() => onDeleteCategory(category)}
            className="p-1 text-gray-400 hover:text-red-600 transition-colors"
            title="Delete Category"
          >
            <Trash2 className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="border-t border-gray-200">
          <AssetTable
            assets={(searchQuery ? filteredAssets : assets)?.map(asset => ({
              id: asset.id,
              asset_name: asset.asset_name,
              status: asset.status,
              trackingId: asset.trackingId,
              batchNo: asset.batchNo,
              avatar: asset.avatar,
              avatarBg: asset.avatarBg,
              description: asset.description,
              category: asset.category,
              purchaseDate: asset.purchaseDate,
              cost: asset.cost,
              expiryDate: asset.expiryDate,
            }))}
            onEditAsset={(asset) => {
              const originalAsset = assets.find(a => a.id === asset.id);
              if (originalAsset) onEditAsset(originalAsset);
            }}
            onDeleteAsset={(asset) => {
              const originalAsset = assets.find(a => a.id === asset.id);
              if (originalAsset) onDeleteAsset(originalAsset);
            }}
            onViewAsset={(asset) => {
              const originalAsset = assets.find(a => a.id === asset.id);
              if (originalAsset) onViewAsset(originalAsset);
            }}
          />
        </div>
      )}
    </div>
  )
}

export default AssetCategoryCard
