"use client"

import type React from "react"

import { Edit3, Trash2 } from "lucide-react"
import type { Asset } from "./types/assets"
import { getCategoryIcon, getStatusColor } from "./utils/asset-utils"

interface AssetsTableProps {
  assets: Asset[]
  handleRowClick: (asset: Asset) => void
  handleEditAsset: (asset: Asset) => void
  handleDeleteAsset: (asset: Asset) => void
}

const AssetsTable: React.FC<AssetsTableProps> = ({ assets, handleRowClick, handleEditAsset, handleDeleteAsset }) => {
  return (
    <div className="bg-[#eff4f5] backdrop-blur-sm rounded-lg shadow border border-white/20 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full bg-[#eff4f5]">
          <thead className="bg-[#6f70ce] text-white">
            <tr>
              <th className="text-left px-6 py-4 font-md">Asset Details</th>
              <th className="text-left px-6 py-4 font-md">Assigned To</th>
              <th className="text-left px-6 py-4 font-md">Category</th>
              <th className="text-left px-6 py-4 font-md">Serial Number</th>
              <th className="text-left px-6 py-4 font-md">Status</th>
              <th className="text-left px-6 py-4 font-md">Actions</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset, index) => (
              <tr
                key={asset.id}
                onClick={() => handleRowClick(asset)}
                className="border-b border-slate-200/50 transition-all duration-200 group cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-slate-200 transition-colors">
                      {getCategoryIcon(asset.category)}
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">{asset.name}</p>
                      <p className="text-sm text-slate-500">Issued on {asset.dateAdded}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-700">{asset.assignedTo}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-2 px-2 py-1 bg-slate-100 text-slate-700 rounded-md text-sm">
                    {getCategoryIcon(asset.category)}
                    {asset.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <code className="bg-slate-100 px-2 py-1 rounded text-sm font-mono text-slate-700">
                    {asset.serialNumber}
                  </code>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex px-2 py-1 rounded-md text-xs font-medium border ${getStatusColor(asset.status)}`}
                  >
                    {String(asset.status).charAt(0).toUpperCase() + String(asset.status).slice(1)}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleEditAsset(asset)
                      }}
                      className="p-2 text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeleteAsset(asset)
                      }}
                      className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
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
    </div>
  )
}

export default AssetsTable
