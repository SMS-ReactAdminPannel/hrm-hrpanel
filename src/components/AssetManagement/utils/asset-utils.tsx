import { Laptop, Monitor, Package } from "lucide-react"

export const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Laptop":
      return <Laptop className="w-4 h-4" />
    case "Monitor":
      return <Monitor className="w-4 h-4" />
    case "Accessory":
      return <Package className="w-4 h-4" />
    default:
      return <Package className="w-4 h-4" />
  }
}

export const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-emerald-100 text-emerald-800 border-emerald-200"
    case "maintenance":
      return "bg-amber-100 text-amber-800 border-amber-200"
    case "returned":
      return "bg-red-100 text-red-800 border-red-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}
