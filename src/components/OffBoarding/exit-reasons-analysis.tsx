import { exitAnalytics } from "./constants"
import {FONTS} from "../../constants/uiConstants"
export const ExitReasonsAnalysis = () => {
  return (
    <div className="bg-white p-6 rounded-lg border shadow-sm">
      <h3 className="text-lg !font-semibold !text-gray-900 mb-4" style={{...FONTS.cardSubHeader}}>Exit Reasons Analysis</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {exitAnalytics.topReasons.map((reason, idx) => (
          <div key={idx} className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium !text-gray-800" style={{...FONTS.paragraph}}>{reason.reason}</span>
              <span className="!text-sm !bg-blue-100 !text-blue-800 px-2 py-1 rounded" style={{...FONTS.paragraph}}>{reason.count}</span>
            </div>
            <div className="w-full !bg-gray-200 rounded-full h-2">
              <div className="!bg-blue-600 h-2 rounded-full" style={{ width: `${reason.percentage}%` }}></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span className="!text-gray-500"style={{...FONTS.paragraph}}>{reason.percentage}% of exits</span>
              <span className="!text-gray-500"style={{...FONTS.description}}>#{idx + 1} reason</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
