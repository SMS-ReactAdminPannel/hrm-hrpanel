"use client"

import { useState } from "react"
import { Search, Star, FileText, Clock, User, ArrowLeft, X } from "lucide-react"
import { useEffect } from "react"
import { io, Socket } from "socket.io-client"


// Dummy notification data
type NotificationItem = {
  id: number
  type: string
  icon: string
  name?: string
  message: string
  timestamp: string
  isStarred: boolean
}

export default function NotificationsPage() {

  
const socket: Socket = io(`http://localhost:5173`, {
  transports: ["websocket"],
})

  const [notificationsData, setNotificationsData] = useState<{
    all: NotificationItem[]
    Read: NotificationItem[]
    Unread: NotificationItem[]
  }>({
    all: [
      {
        id: 1,
        type: "employee",
        icon: "document",
        name: "Bob",
        message: "Have Requested Leave",
        timestamp: "Just Now",
        isStarred: false,
      },
      {
        id: 2,
        type: "marketing",
        icon: "star",
        name: "Priya",
        message: "Has requested PF Deduction",
        timestamp: "30 minutes ago",
        isStarred: true,
      },
      {
        id: 3,
        type: "reminder",
        icon: "document",
        name: "Google meet",
        message: "you have missed a meeting on june 1'st",
        timestamp: "2 days ago",
        isStarred: false,
      },
      {
        id: 4,
        type: "product",
        icon: "star",
        name: "Sales Team",
        message: "Hello Sales Marketing Team, We've received a product information request from a potential customer.",
        timestamp: "5 days ago",
        isStarred: true,
      },
      {
        id: 5,
        type: "product",
        icon: "document",
        name: "Marketing Team",
        message: "Hello Sales Marketing Team, We've received a product information request from a potential customer.",
        timestamp: "07 Feb, 2024",
        isStarred: false,
      },
      {
        id: 6,
        type: "meeting",
        icon: "document",
        name: "HR Department",
        message: "Hello Sales Marketing Team, A meeting or presentation has been scheduled with a customer/prospect.",
        timestamp: "01 Feb, 2024",
        isStarred: false,
      },
      {
        id: 7,
        type: "contract",
        icon: "document",
        name: "Legal Team",
        message:
          "Hello Sales Marketing Team, This is a reminder to review the contract or proposal currently under review.",
        timestamp: "28 Jan, 2024",
        isStarred: false,
      },
      {
        id: 8,
        type: "followup",
        icon: "star",
        name: "Customer Service",
        message:
          "Hello Sales Marketing Team, It's time for a follow-up with a customer after their recent purchase/meeting.",
        timestamp: "27 Jan, 2024",
        isStarred: true,
      },
    ],
    Read: [
      {
        id: 9,
        type: "feedback",
        icon: "document",
        name: "Customer Support",
        message:
          "Hello Sales Marketing Team, We've received positive feedback/testimonial from a satisfied customer...",
        timestamp: "26 Jan, 2024",
        isStarred: false,
      },
      {
        id: 10,
        type: "payment",
        icon: "star",
        name: "Finance Team",
        message: "Hello Sales Marketing Team, This is a reminder regarding an outstanding payment from a customer...",
        timestamp: "25 Jan, 2024",
        isStarred: true,
      },
      {
        id: 11,
        type: "campaign",
        icon: "document",
        name: "Marketing Analytics",
        message:
          "Marketing campaign results are now available. Click to view detailed analytics and performance metrics.",
        timestamp: "24 Jan, 2024",
        isStarred: false,
      },
      {
        id: 12,
        type: "lead",
        icon: "document",
        name: "Lead Generation",
        message: "New lead generated from website contact form. Customer interested in premium package options.",
        timestamp: "23 Jan, 2024",
        isStarred: false,
      },
    ],
    Unread: [
      {
        id: 2,
        type: "marketing",
        icon: "star",
        name: "Priya",
        message: "Has requested PF Deduction",
        timestamp: "30 minutes ago",
        isStarred: true,
      },
      {
        id: 4,
        type: "product",
        icon: "star",
        name: "Sales Team",
        message: "Hello Sales Marketing Team, We've received a product information request from a potential customer.",
        timestamp: "5 days ago",
        isStarred: true,
      },
      {
        id: 8,
        type: "followup",
        icon: "star",
        name: "Customer Service",
        message:
          "Hello Sales Marketing Team, It's time for a follow-up with a customer after their recent purchase/meeting.",
        timestamp: "27 Jan, 2024",
        isStarred: true,
      },
      {
        id: 10,
        type: "payment",
        icon: "star",
        name: "Finance Team",
        message: "Hello Sales Marketing Team, This is a reminder regarding an outstanding payment from a customer...",
        timestamp: "25 Jan, 2024",
        isStarred: true,
      },
    ],
  })

  const [activeTab, setActiveTab] = useState<"all" | "Read" | "Unread">("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedNotification, setSelectedNotification] = useState<NotificationItem | null>(null)

  const currentNotifications = notificationsData[activeTab]
  const filteredNotifications = currentNotifications.filter(
    (notification) =>
      notification.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (notification.name && notification.name.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const tabs = [
    { key: "all" as const, label: "All", count: notificationsData.all.length },
    { key: "Read" as const, label: "Read", count: notificationsData.Read.length },
    { key: "Unread" as const, label: "Unread", count: notificationsData.Unread.length },
  ]

  const handleNotificationClick = (notification: NotificationItem) => {
    setSelectedNotification(notification)
  }

  const closeDetails = () => {
    setSelectedNotification(null)
  }

  const handleBackClick = () => {
    window.history.back()
  }

  const handleMarkAsRead = (notification: NotificationItem) => {
    setNotificationsData((prev) => {
      // Remove from current lists
      const newAll = prev.all.filter((n) => n.id !== notification.id)
      const newUnread = prev.Unread.filter((n) => n.id !== notification.id)

      // Add to Read list if not already there
      const isAlreadyRead = prev.Read.some((n) => n.id === notification.id)
      const newRead = isAlreadyRead ? prev.Read : [...prev.Read, notification]

      return {
        all: newAll,
        Read: newRead,
        Unread: newUnread,
      }
    })

    // Close the details panel
    setSelectedNotification(null)
  }
  useEffect(() => {
  const userId = "12345" // Replace with real logged-in user ID

  // Join the user's room
  socket.emit("join-user-room", userId)

  // Listen for incoming notifications
  socket.on("notification", (newNotification: NotificationItem) => {
    setNotificationsData((prev) => {
      const updatedAll = [newNotification, ...prev.all]
      const updatedUnread = [newNotification, ...prev.Unread]
      return {
        ...prev,
        all: updatedAll,
        Unread: updatedUnread,
      }
    })
  })

  return () => {
    socket.off("notification")
  }
}, [])

  return (
    <div className="min-h-screen bg-gray-50 rounded-lg">
      <div className="flex">
        {/* Main Content */}
        <div className={`w-1/2 w-full transition-all duration-300 ${selectedNotification ? "blur-sm" : ""}`}>
          <div className="w-full p-6 bg-white rounded-lg">
            {/* Back Button */}
            <div className="mb-4">
              <button
                onClick={handleBackClick}
                className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="text-sm">Back</span>
              </button>
            </div>

            {/* Header */}
            <div className="mb-6 ">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-xl font-semibold text-gray-900">{notificationsData.all.length} Notification</h1>
                <div className="relative w-80">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search.."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 px-4 py-2 bg-white/70 border border-gray rounded-md  shadow focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-transparent transition-all duration-200 w-full"
                  />
                </div>
              </div>

              {/* Tabs */}
              <div className="flex space-x-8 border-b border-gray-200">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`pb-3 px-1 relative flex items-center space-x-2 ${
                      activeTab === tab.key
                        ? "text-gray-900 border-b-2 border-gray-900"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <span className="font-medium">{tab.label}</span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        activeTab === tab.key ? "bg-red-500 text-white" : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {tab.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Notifications List */}
            <div className="space-y-4">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  className={`flex items-start space-x-4 p-4 rounded-lg transition-colors cursor-pointer ${
                    selectedNotification?.id === notification.id
                      ? "bg-blue-50 border-2 border-blue-200"
                      : "bg-gray-50 hover:bg-gray-100"
                  }`}
                >
                  {/* Icon */}
                  <div className="flex-shrink-0 mt-1">
                    <div className={`p-2 rounded-lg ${notification.isStarred ? "bg-yellow-100" : "bg-gray-200"}`}>
                      {notification.icon === "star" ? (
                        <Star className={`h-4 w-4 ${notification.isStarred ? "text-yellow-600" : "text-gray-600"}`} />
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
              ))}
            </div>

            {/* Empty State */}
            {filteredNotifications.length === 0 && searchQuery && (
              <div className="text-center py-12">
                <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications found</h3>
                <p className="text-gray-500">Try adjusting your search terms</p>
              </div>
            )}
          </div>
        </div>

        {/* Details Panel */}
        {selectedNotification && (
          <div className="w-1/2 bg-white border-l border-gray-200 p-6 fixed right-0 top-0 h-full overflow-y-auto scrollbar-hidden">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Notification Details</h2>
              <button onClick={closeDetails} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            {/* Notification Details */}
            <div className="space-y-5">
              {/* Icon and Type */}
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-lg ${selectedNotification.isStarred ? "bg-yellow-100" : "bg-gray-200"}`}>
                  {selectedNotification.icon === "star" ? (
                    <Star
                      className={`h-5 w-5 ${selectedNotification.isStarred ? "text-yellow-600" : "text-gray-600"}`}
                    />
                  ) : (
                    <FileText className="h-5 w-5 text-gray-600 " />
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wide">{selectedNotification.type}</p>
                  <p className="text-lg font-medium text-gray-900">
                    {selectedNotification.isStarred ? "Important" : "Regular"} Notification
                  </p>
                </div>
              </div>

              {/* From */}
              {selectedNotification.name && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">From</h3>
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 rounded-lg bg-[#006666] flex items-center justify-center">
                      <User
                        className="h-5 w-5 text-white
                      "
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{selectedNotification.name}</p>
                      <p className="text-xs text-gray-500">{selectedNotification.type}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Message */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Message</h3>
                <p className="text-sm text-gray-900 leading-relaxed bg-gray-50 p-4 rounded-lg">
                  {selectedNotification.message}
                </p>
              </div>

              {/* Timestamp */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Time</h3>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-700">{selectedNotification.timestamp}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-500 mb-3">Actions</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => handleMarkAsRead(selectedNotification)}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                  >
                    Mark as Read
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
                    {selectedNotification.isStarred ? "Remove from Unreads" : "Add to Unreads"}
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors">
                    Delete Notification
                  </button>
                </div>
              </div>
            </div>
          </div> /* notification end */
        )}
      </div>
    </div>
  )
}






// "use client"

// import { useState, useEffect, useCallback } from "react"
// import { Search, Star, FileText, Clock, User, ArrowLeft, X } from "lucide-react"
// import { io, Socket } from "socket.io-client"

// type NotificationStatus = "read" | "unread"

// type NotificationItem = {
//   _id: string
//   type: string
//   icon: "star" | "document"
//   name?: string
//   message: string
//   timestamp: string
//   isStarred: boolean
//   status: NotificationStatus
//   createdAt: string
// }

// export default function NotificationsPage() {
 
//   // State management
//   const [notifications, setNotifications] = useState<NotificationItem[]>([])
//   const [socket, setSocket] = useState<Socket | null>(null)
//   const [activeTab, setActiveTab] = useState<"all" | "read" | "unread">("all")
//   const [searchQuery, setSearchQuery] = useState("")
//   const [selectedNotification, setSelectedNotification] = useState<NotificationItem | null>(null)
//   const [isLoading, setIsLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)

//   // Filter notifications based on tab and search
//   const filteredNotifications = notifications.filter(notification => {
//     const matchesTab = activeTab === "all" || notification.status === activeTab
//     const matchesSearch = notification.message.toLowerCase().includes(searchQuery.toLowerCase()) || 
//                          (notification.name && notification.name.toLowerCase().includes(searchQuery.toLowerCase()))
//     return matchesTab && matchesSearch
//   })

//   // Format timestamp helper
//   const formatTimestamp = useCallback((isoString: string): string => {
//     const date = new Date(isoString)
//     const now = new Date()
//     const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

//     if (diffInSeconds < 60) return "Just now"
//     if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
//     if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
//     return `${Math.floor(diffInSeconds / 86400)} days ago`
//   }, [])

//   // Create properly typed notification object
//   const createNotification = useCallback((data: any): NotificationItem => {
//     return {
//       _id: data._id,
//       type: data.type || "general",
//       icon: data.isStarred ? "star" : "document",
//       name: data.sender?.name,
//       message: data.message,
//       timestamp: formatTimestamp(data.createdAt || new Date().toISOString()),
//       isStarred: Boolean(data.isStarred),
//       status: data.status === "read" ? "read" : "unread",
//       createdAt: data.createdAt || new Date().toISOString()
//     }
//   }, [formatTimestamp])

//   // Fetch initial notifications
//   const fetchNotifications = useCallback(async () => {
//     try {
//       setIsLoading(true)
//       setError(null)
      
//       // Replace with your actual API endpoint
//       const response = await fetch(`/api/notification/getNotification/${User}`)
        
//       if (!response.ok) throw new Error('Failed to fetch notifications')
//       const data = await response.json()
//       console.log("Fetched notifications:", data)
//       const formattedNotifications = data.map(createNotification)
      
//       setNotifications(formattedNotifications.sort((a: { createdAt: string | number | Date }, b: { createdAt: string | number | Date }) => 
//         new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
//       ))
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Unknown error occurred')
//       console.error("Notification fetch error:", err)
//     } finally {
//       setIsLoading(false)
//     }
//   }, [createNotification])


//   // Initialize Socket.IO connection
//   useEffect(() => {
//     const newSocket = io(`http://localhost:5173`, {
//       auth: {
//         userId: "user-123" // Replace with actual user ID from your auth system
//       },
//       reconnectionAttempts: 5,
//       reconnectionDelay: 2000
//     })

//     newSocket.on("connect_error", (err) => {
//       console.error("Socket connection error:", err)
//       setError("Realtime connection failed - updates may be delayed")
//     })

//     setSocket(newSocket)

//     return () => {
//       newSocket.disconnect()
//     }
//   }, [])

//   fetchNotifications()

//   // Setup socket listeners and initial data fetch
//   useEffect(() => {
//     // fetchNotifications()

//     if (!socket) return

//     const handleNewNotification = (newNotif: any) => {
//       const notification = createNotification(newNotif)
//       setNotifications(prev => [notification, ...prev])
//     }

//     const handleUpdatedNotification = (updatedNotif: any) => {
//       setNotifications(prev => 
//         prev.map(n => n._id === updatedNotif._id ? createNotification(updatedNotif) : n)
//       )
//       setSelectedNotification(prev => 
//         prev?._id === updatedNotif._id ? createNotification(updatedNotif) : prev
//       )
//     }

//     socket.on("new-notification", handleNewNotification)
//     socket.on("notification-updated", handleUpdatedNotification)

//     return () => {
//       socket.off("new-notification", handleNewNotification)
//       socket.off("notification-updated", handleUpdatedNotification)
//     }
//   }, [socket, fetchNotifications, createNotification])

//   // Mark notification as read
//   const handleMarkAsRead = async (notification: NotificationItem) => {
//     try {
//       // Optimistic update
//       setNotifications(prev => 
//         prev.map(n => 
//           n._id === notification._id ? { ...n, status: "read" } : n
//         )
//       )
      
//       // API call
//       const response = await fetch(`/api/notifications/${notification._id}/read`, {
//         method: "PATCH"
//       })
      
//       if (!response.ok) throw new Error('Failed to mark as read')
//     } catch (err) {
//       console.error("Mark as read error:", err)
//       // Revert optimistic update
//       setNotifications(prev => 
//         prev.map(n => 
//           n._id === notification._id ? { ...n, status: "unread" } : n
//         )
//       )
//     }
//   }

//   // UI rendering
//   return (
//     <div className="min-h-screen bg-gray-50 rounded-lg">
//       <div className="flex">
//         {/* Main Content */}
//         <div className={`w-full md:w-1/2 transition-all duration-300 ${selectedNotification ? "blur-sm" : ""}`}>
//           <div className="w-full p-6 bg-white rounded-lg">
//             {/* Header */}
//             <div className="mb-6">
//               <div className="flex items-center justify-between mb-4">
//                 <h1 className="text-xl font-semibold text-gray-900">
//                   {isLoading ? "Loading..." : `${notifications.length} Notifications`}
//                 </h1>
//                 <div className="relative w-80">
//                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//                   <input
//                     type="text"
//                     placeholder="Search..."
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     className="pl-10 pr-4 py-2 bg-white/70 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-transparent transition-all duration-200 w-full"
//                   />
//                 </div>
//               </div>

//               {/* Tabs */}
//               <div className="flex space-x-8 border-b border-gray-200">
//                 {[
//                   { key: "all", label: "All", count: notifications.length },
//                   { key: "read", label: "Read", count: notifications.filter(n => n.status === "read").length },
//                   { key: "unread", label: "Unread", count: notifications.filter(n => n.status === "unread").length }
//                 ].map((tab) => (
//                   <button
//                     key={tab.key}
//                     onClick={() => setActiveTab(tab.key as "all" | "read" | "unread")}
//                     className={`pb-3 px-1 relative flex items-center space-x-2 ${
//                       activeTab === tab.key
//                         ? "text-gray-900 border-b-2 border-gray-900"
//                         : "text-gray-500 hover:text-gray-700"
//                     }`}
//                   >
//                     <span className="font-medium">{tab.label}</span>
//                     <span
//                       className={`text-xs px-2 py-0.5 rounded-full ${
//                         activeTab === tab.key ? "bg-red-500 text-white" : "bg-gray-100 text-gray-600"
//                       }`}
//                     >
//                       {tab.count}
//                     </span>
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Notifications List */}
//             {error ? (
//               <div className="text-center py-12 text-red-500">
//                 {error}
//               </div>
//             ) : isLoading ? (
//               <div className="flex justify-center items-center h-64">
//                 <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 {filteredNotifications.length > 0 ? (
//                   filteredNotifications.map((notification) => (
//                     <div
//                       key={notification._id}
//                       onClick={() => setSelectedNotification(notification)}
//                       className={`flex items-start space-x-4 p-4 rounded-lg transition-colors cursor-pointer ${
//                         selectedNotification?._id === notification._id
//                           ? "bg-blue-50 border-2 border-blue-200"
//                           : "bg-gray-50 hover:bg-gray-100"
//                       } ${notification.status === "unread" ? "border-l-4 border-l-blue-500" : ""}`}
//                     >
//                       {/* Icon */}
//                       <div className="flex-shrink-0 mt-1">
//                         <div className={`p-2 rounded-lg ${notification.isStarred ? "bg-yellow-100" : "bg-gray-200"}`}>
//                           {notification.icon === "star" ? (
//                             <Star className={`h-4 w-4 ${notification.isStarred ? "text-yellow-600" : "text-gray-600"}`} />
//                           ) : (
//                             <FileText className="h-4 w-4 text-gray-600" />
//                           )}
//                         </div>
//                       </div>

//                       {/* Content */}
//                       <div className="flex-1 min-w-0">
//                         {notification.name && <p className="text-md font-medium text-gray-900 mb-1">{notification.name}</p>}
//                         <p className="text-sm text-gray-700 leading-relaxed">{notification.message}</p>
//                         <div className="flex items-center mt-2 space-x-2">
//                           <Clock className="h-3 w-3 text-gray-400" />
//                           <span className="text-xs text-gray-500">{notification.timestamp}</span>
//                         </div>
//                       </div>

//                       {/* Avatar */}
//                       <div className="flex-shrink-0">
//                         <div className="h-7 w-7 rounded-lg bg-[#006666] flex items-center justify-center">
//                           <User className="w-4 h-4 text-white" />
//                         </div>
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <div className="text-center py-12">
//                     <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
//                     <h3 className="text-lg font-medium text-gray-900 mb-2">
//                       {searchQuery ? "No matching notifications" : "No notifications yet"}
//                     </h3>
//                     <p className="text-gray-500">
//                       {searchQuery ? "Try different search terms" : "You'll see notifications here when you get them"}
//                     </p>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Details Panel */}
//         {selectedNotification && (
//           <div className="hidden md:block md:w-1/2 bg-white border-l border-gray-200 p-6 fixed right-0 top-0 h-full overflow-y-auto">
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-lg font-semibold text-gray-900">Notification Details</h2>
//               <button 
//                 onClick={() => setSelectedNotification(null)}
//                 className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//               >
//                 <X className="h-5 w-5 text-gray-500" />
//               </button>
//             </div>

//             <div className="space-y-5">
//               {/* Notification details content... */}
//               {/* (Keep your existing details panel JSX here) */}
//               <div className="space-y-5">
//               {/* Icon and Type */}
//               <div className="flex items-center space-x-4">
//                 <div className={`p-2 rounded-lg ${selectedNotification.isStarred ? "bg-yellow-100" : "bg-gray-200"}`}>
//                   {selectedNotification.icon === "star" ? (
//                     <Star
//                       className={`h-5 w-5 ${selectedNotification.isStarred ? "text-yellow-600" : "text-gray-600"}`}
//                     />
//                   ) : (
//                     <FileText className="h-5 w-5 text-gray-600" />
//                   )}
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500 uppercase tracking-wide">{selectedNotification.type}</p>
//                   <p className="text-lg font-medium text-gray-900">
//                     {selectedNotification.isStarred ? "Important" : "Regular"} Notification
//                   </p>
//                 </div>
//               </div>

//               {/* From */}
//               {selectedNotification.name && (
//                 <div>
//                   <h3 className="text-sm font-medium text-gray-500 mb-2">From</h3>
//                   <div className="flex items-center space-x-3">
//                     <div className="h-8 w-8 rounded-lg bg-[#006666] flex items-center justify-center">
//                       <User className="h-5 w-5 text-white" />
//                     </div>
//                     <div>
//                       <p className="text-sm font-medium text-gray-900">{selectedNotification.name}</p>
//                       <p className="text-xs text-gray-500">{selectedNotification.type}</p>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Message */}
//               <div>
//                 <h3 className="text-sm font-medium text-gray-500 mb-2">Message</h3>
//                 <p className="text-sm text-gray-900 leading-relaxed bg-gray-50 p-4 rounded-lg">
//                   {selectedNotification.message}
//                 </p>
//               </div>

//               {/* Timestamp */}
//               <div>
//                 <h3 className="text-sm font-medium text-gray-500 mb-2">Time</h3>
//                 <div className="flex items-center space-x-2">
//                   <Clock className="h-4 w-4 text-gray-400" />
//                   <span className="text-sm text-gray-700">{selectedNotification.timestamp}</span>
//                 </div>
//               </div>

//               {/* Actions */}
//               <div className="pt-4 border-t border-gray-200">
//                 <h3 className="text-sm font-medium text-gray-500 mb-3">Actions</h3>
//                 <div className="space-y-2">
//                   {selectedNotification.status === "unread" && (
//                     <button
//                       onClick={() => handleMarkAsRead(selectedNotification)}
//                       className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
//                     >
//                       Mark as Read
//                     </button>
//                   )}
//                   <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
//                     {selectedNotification.isStarred ? "Remove Star" : "Add Star"}
//                   </button>
//                   <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors">
//                     Delete Notification
//                   </button>
//                 </div>
//               </div>
//             </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }
