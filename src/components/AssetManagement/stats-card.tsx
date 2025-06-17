import type React from "react"
import { Package, Filter } from "lucide-react"
import type { Asset } from "./types/assets"

interface StatsCardsProps {
  assets: Asset[]
}

const StatsCards: React.FC<StatsCardsProps> = ({ assets }) => {
  const activeAssets = assets.filter((a) => a.status === "active").length
  const maintenanceAssets = assets.filter((a) => a.status === "maintenance").length
  const uniqueCategories = new Set(assets.map((a) => a.category)).size

  return (
    <div className="grid grid-cols-4 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-[#eff4f5] backdrop-blur-sm rounded-lg p-6 shadow border border-white/20 hover:shadow-xl transition-all duration-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-600 text-sm">Total Assets</p>
            <p className="text-2xl font-bold text-slate-800">{assets.length}</p>
          </div>
          <Package className="w-8 h-8 text-blue-600" />
        </div>
      </div>

      <div className="bg-[#eff4f5] backdrop-blur-sm rounded-lg p-6 shadow border border-white/20 hover:shadow-xl transition-all duration-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-600 text-sm">Active</p>
            <p className="text-2xl font-bold text-emerald-600">{activeAssets}</p>
          </div>
          <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-emerald-600 rounded-full"></div>
          </div>
        </div>
      </div>

      <div className="bg-[#eff4f5] backdrop-blur-sm rounded-lg p-6 shadow border border-white/20 hover:shadow-xl transition-all duration-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-600 text-sm">Maintenance</p>
            <p className="text-2xl font-bold text-amber-600">{maintenanceAssets}</p>
          </div>
          <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-amber-600 rounded-full"></div>
          </div>
        </div>
      </div>

      <div className="bg-[#eff4f5] backdrop-blur-sm rounded-lg p-6 shadow border border-white/20 hover:shadow-xl transition-all duration-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-600 text-sm">Categories</p>
            <p className="text-2xl font-bold text-slate-800">{uniqueCategories}</p>
          </div>
          <Filter className="w-8 h-8 text-purple-600" />
        </div>
      </div>
    </div>
  )
}

export default StatsCards
