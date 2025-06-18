import { Clock, FileText, Star, User, X } from "lucide-react"
import type { Notification } from "../../types/Notification"


 type Props = {
  notification: Notification
  onClose: () => void
  onMarkAsRead: (notification: Notification) => void
  onToggleStarred: (notification: Notification) => void
  onDelete: (notification: Notification) => void
}

const NotificationDetails: React.FC<Props> = ({
  notification,
  onClose,
   onMarkAsRead,
  onToggleStarred,
  onDelete,
}) => {
  return (
    <div className="w-1/2 bg-white border-l border-gray-200 p-6 fixed right-0 top-0 h-full overflow-y-auto scrollbar-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Notification Details</h2>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <X className="h-5 w-5 text-gray-500" />
        </button>
      </div>

      <div className="space-y-5">
        {/* Icon and Type */}
        <div className="flex items-center space-x-4">
          <div className={`p-2 rounded-lg ${notification.isStarred ? "bg-yellow-100" : "bg-gray-200"}`}>
            {notification.icon === "star" ? (
              <Star
                className={`h-5 w-5 ${notification.isStarred ? "text-yellow-600" : "text-gray-600"}`}
              />
            ) : (
              <FileText className="h-5 w-5 text-gray-600" />
            )}
          </div>
          <div>
            <p className="text-sm text-gray-500 uppercase tracking-wide">{notification.type}</p>
            <p className="text-lg font-medium text-gray-900">
              {notification.isStarred ? "Important" : "Regular"} Notification
            </p>
          </div>
        </div>

        {/* From */}
        {notification.name && (
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">From</h3>
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-lg bg-[#006666] flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{notification.name}</p>
                <p className="text-xs text-gray-500">{notification.type}</p>
              </div>
            </div>
          </div>
        )}

        {/* Message */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">Message</h3>
          <p className="text-sm text-gray-900 leading-relaxed bg-gray-50 p-4 rounded-lg">
            {notification.message}
          </p>
        </div>

        {/* Timestamp */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">Time</h3>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-700">{notification.timestamp}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-4 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-500 mb-3">Actions</h3>
          <div className="space-y-2">
            <button
              onClick={() => onMarkAsRead(notification)}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
            >
              Mark as Read
            </button>
            <button
              onClick={() => onToggleStarred(notification)}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
            >
              {notification.isStarred ? "Remove from Unreads" : "Add to Unreads"}
            </button>
            <button
              onClick={() => onDelete(notification)}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
            >
              Delete Notification
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotificationDetails
