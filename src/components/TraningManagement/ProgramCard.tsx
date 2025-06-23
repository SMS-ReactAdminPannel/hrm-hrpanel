import type React from "react"
import { Award } from "lucide-react"
import type { TrainingProgram } from "../../components/TraningManagement/Traning"
import {FONTS} from "../../constants/uiConstants"

interface ProgramCardProps {
  program: TrainingProgram
  onClick: (program: TrainingProgram) => void
}

export const ProgramCard: React.FC<ProgramCardProps> = ({ program, onClick }) => (
  <div
    className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow cursor-pointer hover:border-blue-300"
    onClick={() => onClick(program)}
  >
    <div className="flex justify-between items-start mb-4">
      <div>
        <h3 className="text-lg font-semibold !text-gray-900" style={{...FONTS.cardheader}}>{program.title}</h3>
        <p className="text-sm !text-gray-600" style={{...FONTS.paragraph}}>
          {program.category} • {program.duration}
        </p>
      </div>
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${
          program.status === "active"
            ? "bg-green-100 text-green-800"
            : program.status === "draft"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-gray-100 text-gray-800"
        }`}
      >
        {program.status}
      </span>
    </div>

    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-sm !text-gray-600" style={{...FONTS.statusCardHeader}}>Participants</span>
        <span className="text-sm font-medium text-[#006666]">{program.enrolled} enrolled</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm  !text-gray-600" style={{...FONTS.statusCardHeader}}>Progress</span>
        <span className="text-sm font-medium">
          {program.completed}/{program.enrolled} completed
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-[#006666] h-2 rounded-full transition-all duration-300 !text-gray-600" style={{...FONTS.statusCardHeader}}
          style={{ width: `${program.enrolled > 0 ? (program.completed / program.enrolled) * 100 : 0}%` }}
        ></div>
      </div>

      <div className="flex justify-between items-center pt-2">
        <div className="flex items-center space-x-1">
          <Award className="w-4 h-4 text-yellow-500" />
          <span className="text-sm font-medium">{program.rating}</span>
        </div>
        <p className="text-sm !text-gray-600" style={{...FONTS.paragraph}}>by {program.instructor}</p>
      </div>
    </div>

    <div className="mt-4 pt-3 border-t border-gray-100">
      <p className="text-xs text-blue-600 font-medium">Click to view participants →</p>
    </div>
  </div>
)
