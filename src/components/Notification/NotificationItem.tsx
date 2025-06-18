import { Clock, FileText, Star, User } from "lucide-react"
import type { Notification } from "../../types/Notification"

// Represents a single notification preview in the list view
// Clicking it opens the detailed view
type Props = {
  notification: Notification
  selectedNotification: Notification | null
  onClick: (notification: Notification) => void
}

const NotificationItem: React.FC<Props> = ({ notification, selectedNotification, onClick }) => {
  const isSelected = selectedNotification?.id === notification.id
  const isStarred = notification.isStarred ?? false  // ✅ Default to false if undefined

  return (
    <div
      onClick={() => onClick(notification)}
      className={`flex items-start space-x-4 p-4 rounded-lg transition-colors cursor-pointer ${
        isSelected ? "bg-blue-50 border-2 border-blue-200" : "bg-gray-50 hover:bg-gray-100"
      }`}
    >
      {/* Icon */}
      <div className="flex-shrink-0 mt-1">
        <div className={`p-2 rounded-lg ${isStarred ? "bg-yellow-100" : "bg-gray-200"}`}>
          {notification.icon === "star" ? (
            <Star className={`h-4 w-4 ${isStarred ? "text-yellow-600" : "text-gray-600"}`} />
          ) : (
            <FileText className="h-4 w-4 text-gray-600" />
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {notification.name && <p className="text-md font-medium text-gray-900 mb-1">{notification.name}</p>}
        <p className="text-sm text-gray-700 leading-relaxed">{notification.message}</p>
        <div className="flex items-center mt-2 space-x-2">
          <Clock className="h-3 w-3 text-gray-400" />
          <span className="text-xs text-gray-500">{notification.timestamp}</span>
        </div>
      </div>

      {/* Avatar */}
      <div className="flex-shrink-0">
        <div className="h-7 w-7 rounded-lg bg-[#006666] flex items-center justify-center">
          <User className="w-4 h-4 text-white" />
        </div>
      </div>
    </div>
  )
}

export default NotificationItem
