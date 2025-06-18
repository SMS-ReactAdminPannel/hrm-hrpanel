import type React from "react"
import type { WorkModeData } from "../../components/Employee/Employee"

interface WorkModeStatsProps {
  workModeData: WorkModeData[]
}

export const WorkModeStats: React.FC<WorkModeStatsProps> = ({ workModeData }) => {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

  return (
    <div className="bg-[#eff4f5] w-full h-[90%] max-w-md rounded-lg p-3  shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 mx-auto">
      <h3 className="text-sm font-semibold text-gray-500 mb-3.5">Work Mode Stats</h3>
      {workModeData.map((mode, index) => (
        <div key={mode.name} className="flex justify-between items-center space-y-1  ">
          <span className="text-sm  ">{mode.name}</span>
          <div className="w-24 bg-gray-200 rounded-full h-2 relative ">
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
