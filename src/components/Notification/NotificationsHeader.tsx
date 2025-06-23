import { Search } from "lucide-react"

type Props = {
  tabs: { key: string; label: string; count: number }[]
  activeTab: string
  setActiveTab: (key: string) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  notificationsData: any
}

const NotificationsHeader: React.FC<Props> = ({
  tabs,
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  notificationsData,
}) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold text-gray-900">
          {notificationsData.all.length} Notifications
        </h1>

        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search.."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 bg-white/70 border border-gray-300 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-transparent transition-all duration-200 w-full"
          />
        </div>
      </div>

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
  )
}

export default NotificationsHeader
