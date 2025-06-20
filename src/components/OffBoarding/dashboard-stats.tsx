import { Users, Calendar, Clock, CheckCircle } from "lucide-react"
import { exitAnalytics } from "./constants"

export const DashboardStats = () => {
  return (
    <div className="grid grid-cols-4 md:grid-cols-4 gap-6">
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Active Exits</p>
            <p className="text-3xl font-bold text-blue-600">12</p>
          </div>
          <Users className="w-8 h-8 text-blue-600" />
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">This Month</p>
            <p className="text-3xl font-bold text-orange-600">{exitAnalytics.thisMonth.total}</p>
          </div>
          <Calendar className="w-8 h-8 text-orange-600" />
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Avg Notice Period</p>
            <p className="text-3xl font-bold text-green-600">{exitAnalytics.thisMonth.avgNoticePeriod}d</p>
          </div>
          <Clock className="w-8 h-8 text-green-600" />
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Completed</p>
            <p className="text-3xl font-bold text-purple-600">45</p>
          </div>
          <CheckCircle className="w-8 h-8 text-purple-600" />
        </div>
      </div>
    </div>
  )
}
