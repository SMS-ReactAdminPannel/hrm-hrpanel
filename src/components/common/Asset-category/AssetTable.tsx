import type React from "react"
import { Edit, Trash2 } from "lucide-react"
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

interface AssetTableProps {
  assets: Asset[]
  onEditAsset: (asset: Asset) => void
  onDeleteAsset: (asset: Asset) => void
  onViewAsset: (asset: Asset) => void
  category?: string
}

const AssetTable: React.FC<AssetTableProps> = ({ 
  assets, 
  onEditAsset, 
  onDeleteAsset, 
  onViewAsset, 
  category 
}) => {
  const getStatusColor = (status: string) => {
    return status === "Available"
      ? "text-green-600 bg-green-50 border-green-200"
      : "text-red-600 bg-red-50 border-red-200"
  }

  const tableHeaders = [
    { key: 'asset', label: 'Asset', width: 'w-1/3' },
    { key: 'status', label: 'Status', width: 'w-1/6' },
    { key: 'trackingId', label: 'Tracking ID', width: 'w-1/6' },
    { key: 'batchNo', label: 'Batch No', width: 'w-1/6' },
    { key: 'actions', label: 'Actions', width: 'w-1/6' }
  ]

  if (assets.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
  
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 capitalize">
            {category ? `${category} Assets` : 'Assets'}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Manage your {category || 'asset'} inventory
          </p>
        </div>
        
        <div className="text-center py-12 text-gray-500">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-md flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m-2 0l.01.01M20 13l-.01.01" />
            </svg>
          </div>
          <h4 className="text-lg font-medium text-gray-900 mb-2">No assets found</h4>
          <p className="text-sm">No assets found matching your search criteria.</p>
        </div>
      </div>
    )
  }

  return (
    <div className=" rounded-lg shadow-sm border border-gray-200">

  
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#5e59a9]/70 backdrop-blur-sm ">
            <tr>
              {tableHeaders.map((header) => (
                <th 
                  key={header.key}
                  style={{ ...FONTS.tableHeader}}
                  className={`text-left text-white text-sm
                     px-6 py-4  font-semibold text-gray-600 uppercase tracking-wider ${header.width}`}
                >
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white/45 backdrop-blur divide-y divide-gray-100 divide-y divide-gray-100">
            {assets.map((asset, index) => (
              <tr
                key={asset.id}
                className={`hover:bg-white/70 hover:backdrop-blur-sm cursor-pointer transition duration-200 ${
                  index % 2 === 0 ? '' : 'bg-gray-25'
                }`}
                onClick={() => onViewAsset(asset)}
              >
        
                <td className="px-6 py-4 w-1/3">
                  <div className="flex items-center gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-semibold !text-gray-900 "
                      style={{fontSize:FONTS.tableBody.fontSize,
                        fontFamily:FONTS.tableBody.fontFamily,
                      }}
                        >
                        {asset.name}
                      </div>
                      {asset.description && (
                        <p className="text-xs !text-gray-900 truncate mt-1"
                          style={{ ...FONTS.tableBody }}>
                          {asset.description}
                        </p>
                      )}
                    </div>
                  </div>
                </td>

                
                <td className="px-6 py-4 w-1/6 ">
                  <span
                    style={{ ...FONTS.tableBody }}
                    className={`inline-flex items-center px-1 py-1 text-sm  rounded-md border ${getStatusColor(asset.status)}`}
                  >
                    <span className={`w-1.5 h-1.5   rounded-full mr-1.5 ${
                      asset.status === "Available" ? "bg-green-400 " : "bg-red-400"
                    }`}></span>
                    {asset.status === "Not-Available" ? "Unavailable" : asset.status}
                  </span>
                </td>

              
                <td className="px-6 py-4 w-1/6"
                  style={{ ...FONTS.tableBody }}>
                  <span className="text-sm !text-gray-700 hover:text-[#004d4d] font-medium transition-colors">
                    {asset.trackingId}
                  </span>
                </td>

          
                <td className="px-6 py-4 w-1/6"
                  style={{ ...FONTS.tableBody }}>
                  <span className="text-sm !text-gray-900 font-medium">
                    {asset.batchNo}
                  </span>
                </td>

              
                <td className="px-6 py-4 w-1/6"
                  style={{ ...FONTS.tableBody }}>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onEditAsset(asset)
                      }}
                      className="inline-flex items-center justify-center w-8 h-8 text-gray-400 hover:text-[#006666] hover:bg-gray-100 rounded-md transition-all duration-200"
                      title="Edit Asset"
                    >
                      <Edit className="w-4 h-4 text-gray-600" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onDeleteAsset(asset)
                      }}
                      className="inline-flex items-center justify-center w-8 h-8 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-all duration-200"
                      title="Delete Asset"
                    >
                      <Trash2 className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    
      <div className="px-6 py-3 bg-gray-50 border-t border-gray-200"
        style={{ ...FONTS.tableBody }}>
        <div className="flex items-center justify-between text-sm text-gray-900">
          <span>
            Showing {assets.length} of {assets.length} assets
          </span>
          <span>
            {category && `Category: ${category}`}
          </span>
        </div>
      </div>
    </div>
  )
}

export default AssetTable