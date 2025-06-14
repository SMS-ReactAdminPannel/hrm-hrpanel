
import { useState, useMemo, useEffect } from "react"
import NotificationsHeader from "../../components/Notification/NotificationsHeader"
import NotificationItem from "../../components/Notification/NotificationItem"
import NotificationDetails from "../../components/Notification/NotificationDetails"
import EmptyState from "../../components/Notification/NotificationEmptyState"
import { ArrowLeft } from "lucide-react"
import type { Notification } from "../../types/Notification"
import {useNavigate } from "react-router-dom"
import { io } from "socket.io-client";


const SOCKET_SERVER_URL = "http://localhost:3002";

const NotificationsPage = () => {
  
  useEffect(() => {
    const socket = io(SOCKET_SERVER_URL);

    const dummyUserId = "123"; // Replace with actual logged-in user ID
    socket.emit('join-user-room', dummyUserId); // Join room

    socket.on('connect', () => {
      console.log(" Socket connected:", socket.id);
    });

    socket.on('new-notification', (notification: Notification) => {
      console.log(" New notification received", notification);
      setNotificationsData(prev => ({
        ...prev,
        all: [notification, ...prev.all],
        Unread: [notification, ...prev.Unread],
      }));
    });

    socket.on('notification-updated', (updatedNotification: Notification) => {
      console.log(" Notification updated", updatedNotification);
      setNotificationsData(prev => {
        const update = (list: Notification[]) =>
          list.map(n => n.id === updatedNotification.id ? updatedNotification : n);
        return {
          all: update(prev.all),
          Read: update(prev.Read),
          Unread: update(prev.Unread),
        };
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);


  const [notificationsData, setNotificationsData] = useState<{
    all: Notification[];
    Read: Notification[];
    Unread: Notification[];
  }>({
    all: [
      {
        id: "1",
        name: "Admin",
        message: "Welcome to the HRM system!",
        timestamp: "2025-06-13 10:00",
        icon: "file",
        isStarred: false,
        type: "Announcement",
      },
      {
        id: "2",
        name: "HR",
        message: "Your appraisal is pending approval.",
        timestamp: "2025-06-12 14:30",
        icon: "star",
        isStarred: true,
        type: "Alert",
      },
    ],
    Read: [],
    Unread: [],
  });

  const tabs = useMemo(() => [
    { key: "all", label: "All", count: notificationsData.all.length },
    { key: "Read", label: "Read", count: notificationsData.Read.length },
    { key: "Unread", label: "Unread", count: notificationsData.Unread.length },
  ], [notificationsData]);

  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);

  const filteredNotifications = useMemo(() => {
    const data = notificationsData[activeTab as keyof typeof notificationsData] || [];
    return data.filter((item) =>
      item.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [activeTab, searchQuery, notificationsData]);

  const handleNotificationClick = (notification: Notification) => setSelectedNotification(notification);
  const closeDetails = () => setSelectedNotification(null);

  const handleMarkAsRead = (notification: Notification) => {
    setNotificationsData((prev) => ({
      ...prev,
      Read: [...prev.Read, notification],
      Unread: prev.Unread.filter((n) => n.id !== notification.id),
    }));
    setSelectedNotification(null);
  };

  const handleToggleStarred = (notification: Notification) => {
    setNotificationsData((prev) => {
      const update = (list: Notification[]) =>
        list.map((n) =>
          n.id === notification.id ? { ...n, isStarred: !n.isStarred } : n
        );
      return {
        all: update(prev.all),
        Read: update(prev.Read),
        Unread: update(prev.Unread),
      };
    });
  };

  const handleDelete = (notification: Notification) => {
    setNotificationsData((prev) => ({
      all: prev.all.filter((n) => n.id !== notification.id),
      Read: prev.Read.filter((n) => n.id !== notification.id),
      Unread: prev.Unread.filter((n) => n.id !== notification.id),
    }));
    setSelectedNotification(null);
  };

  const navigate = useNavigate();
  const handleBack = () => navigate(-1);

  return (
    <div className="min-h-screen bg-gray-50 rounded-lg flex relative">
      <div className={`w-full md:w-1/2 transition-all duration-300 ${selectedNotification ? "blur-sm" : ""}`}>
        <div className="p-6 bg-white rounded-lg">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-600 mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">Back</span>
          </button>

          <NotificationsHeader
            tabs={tabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            notificationsData={notificationsData}
          />

          <div className="space-y-4">
            {filteredNotifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                selectedNotification={selectedNotification}
                onClick={() => handleNotificationClick(notification)}
              />
            ))}
          </div>

          {filteredNotifications.length === 0 && searchQuery && <EmptyState />}
        </div>
      </div>

      {selectedNotification && (
        <NotificationDetails
          notification={selectedNotification}
          onClose={closeDetails}
          onMarkAsRead={handleMarkAsRead}
          onToggleStarred={handleToggleStarred}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};


export default NotificationsPage