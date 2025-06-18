import type React from "react"
import { Package } from "lucide-react"

const EmptyState: React.FC = () => {
  return (
    <div className="text-center py-12">
      <Package className="w-16 h-16 text-slate-400 mx-auto mb-4" />
      <p className="text-slate-600 text-lg">No assets found</p>
      <p className="text-slate-500">Try adjusting your search or filter criteria</p>
    </div>
  )
}

export default EmptyState
