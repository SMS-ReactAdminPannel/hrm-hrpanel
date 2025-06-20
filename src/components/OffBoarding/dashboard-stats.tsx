import { Users, Calendar, Clock, CheckCircle } from "lucide-react"
import { exitAnalytics } from "./constants"
import {FONTS} from "../../constants/uiConstants"
export const DashboardStats = () => {
  return (
    <div className="grid grid-cols-4 md:grid-cols-4 gap-6">
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm !text-gray-600"   style={{...FONTS.paragraph}} >Active Exits</p>
            <p className="text-4xl !font-bold !text-blue-600"  style={{...FONTS.header}}>12</p>
          </div>
          <Users className="w-8 h-8 text-blue-600" />
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm !text-gray-600"  style={{...FONTS.paragraph}}>This Month</p>
            <p className="text-4xl !font-bold !text-orange-600"  style={{...FONTS.header}}>{exitAnalytics.thisMonth.total}</p>
          </div>
          <Calendar className="w-8 h-8 !text-orange-600" />
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm !text-gray-600"  style={{...FONTS.paragraph}}>Avg Notice Period</p>
            <p className="text-3xl !font-bold !text-green-600"  style={{...FONTS.header}}>{exitAnalytics.thisMonth.avgNoticePeriod}d</p>
          </div>
          <Clock className="w-8 h-8 text-green-600" />
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm !text-gray-600"  style={{...FONTS.paragraph}}>Completed</p>
            <p className="text-4xl !font-bold !text-purple-600"  style={{...FONTS.header}}>45</p>
          </div>
          <CheckCircle className="w-8 h-8 text-purple-600" />
        </div>
      </div>
    </div>
  )
}
