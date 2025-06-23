import type React from "react"
import { FONTS } from "../../components/TraningManagement/Fonts"

interface StatCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  trend?: string
  color: string
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend, color }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 px-4 py-2 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p
          className="text-sm"
          style={{
            fontFamily: FONTS.paragraph.fontFamily,
            fontSize: FONTS.paragraph.fontSize,
            fontWeight: FONTS.paragraph.fontWeight,
          }}
        >
          {title}
        </p>
        <p
          className="font-bold mt-1"
          style={{
            fontFamily: FONTS.header.fontFamily,
            fontSize: FONTS.header.fontSize,
            fontWeight: FONTS.header.fontWeight,
          }}
        >
          {value}
        </p>
        {trend && (
          <p
            className={`text-sm mt-1 ${color}`}
            style={{
              fontFamily: FONTS.paragraph.fontFamily,
              fontSize: FONTS.paragraph.fontSize,
              fontWeight: FONTS.paragraph.fontWeight,
            }}
          >
            {trend}
          </p>
        )}
      </div>
      <div className={`p-3 rounded-lg ${color.replace("text-", "bg-").replace("-600", "-100")}`}>{icon}</div>
    </div>
  </div>
)
