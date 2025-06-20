import type React from "react"
import type { WorkModeData } from "../../components/Employee/Employee"
import { FONTS } from "../../constants/uiConstants"

interface WorkModeStatsProps {
  workModeData: WorkModeData[]
}

export const WorkModeStats: React.FC<WorkModeStatsProps> = ({ workModeData }) => {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

  return (
    <div className="bg-[#eff4f5] p-4 rounded shadow border">
      <h3 className="text-lg font-semibold !text-gray-700 mb-4" style={{...FONTS.statusCardHeader}}>Work Mode Stats</h3>
      {workModeData.map((mode, index) => (
        <div key={mode.name} className="flex justify-between items-center mb-2">
          <span className="text-sm !text-gray-400" style={{...FONTS.statusCardDescription}}>{mode.name}</span>
          <div className="w-24 bg-gray-200 rounded-full h-2 relative">
            <div
              className="h-2 rounded-full"
              style={{
                width: `${(mode.value / 10) * 100}%`,
                backgroundColor: COLORS[index],
              }}
            />
          </div>
          <span className="text-sm font-semibold ml-2">{mode.value}</span>
        </div>
      ))}
    </div>
  )
}
