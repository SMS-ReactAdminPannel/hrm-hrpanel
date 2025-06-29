import type React from "react"
import { FONTS } from "../../constants/uiConstants"

interface EmployeeStatsCardProps {
  title: string
  value: number
  subtitle: string
  icon: React.ReactNode
  bgColor: string
  textColor: string
}

export const EmployeeStatsCard: React.FC<EmployeeStatsCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  bgColor,
  textColor,
}) => {
  return (
    <div className="bg-[#eff4f5] w-full max-w-md rounded-lg p-4 h-[90%]  shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium !text-gray-700 mb-1" style={{...FONTS.statusCardHeader}}>{title} </p>
          <p className={`text-5xl font-semibold ${textColor} mt-3`}>{value}</p>
          <p className="text-xs !text-gray-400 mt-5" style={{...FONTS.statusCardDescription}}>{subtitle}</p>
        </div>
        <div className={`p-3 rounded-lg ${bgColor}`}>{icon}</div>
      </div>
    </div>
  )
}
