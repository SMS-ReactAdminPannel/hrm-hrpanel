import { Search } from "lucide-react"
//Shows an empty message/illustration when no notifications are found, 
// especially when using search or when the list is empty.

interface EmptyStateProps {
  message?: string
  subText?: string
}

export default function EmptyState({
  message = "No notifications found",
  subText = "Try adjusting your search terms",
}: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">{message}</h3>
      <p className="text-gray-500">{subText}</p>
    </div>
  )
}
