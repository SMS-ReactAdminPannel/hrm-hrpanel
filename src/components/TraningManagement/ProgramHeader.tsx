import type React from "react"
import { ArrowLeft, BookOpen, Users, Clock, Calendar } from "lucide-react"
import {FONTS} from "../../constants/uiConstants"



interface ProgramHeaderProps {
  program: TrainingProgram
  participantCount: number
  onBack: () => void
}

export const ProgramHeader: React.FC<ProgramHeaderProps> = ({ program, participantCount, onBack }) => (
  <div className="rounded-xl shadow-sm border-gray-100 p-6">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-4">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
          style={{...FONTS.button}}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Programs</span>
        </button>
      </div>
    </div>

    <div className="grid grid-cols-4 md:grid-cols-4 gap-4">
      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="flex items-center space-x-2">
          <BookOpen className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold !text-gray-900" style={{...FONTS.cardSubHeader}}>{program.title}</h3>
        </div>
        <p className="text-sm !text-gray-600 mt-1"style={{...FONTS.cardSubHeader}}>{program.category}</p>
      </div>

      <div className="bg-green-50 p-4 rounded-lg">
        <div className="flex items-center space-x-2">
          <Users className="w-5 h-5 text-green-600" />
          <span className="font-semibold !text-gray-900" style={{...FONTS.cardSubHeader}}>{participantCount}</span>
        </div>
        <p className="text-sm !text-gray-600 mt-2"style={{...FONTS.cardSubHeader}}>
          Enrolled Participants
        </p>
      </div>

      <div className="bg-purple-50 p-4 rounded-lg">
        <div className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-purple-600" />
          <span className="font-semibold !text-gray-900" style={{...FONTS.cardSubHeader}}>{program.duration}</span>
        </div>
        <p className="text-sm !text-gray-600 mt-2" style={{...FONTS.cardSubHeader}}>
          Duration
        </p>
      </div>

      <div className="bg-yellow-50 p-4 rounded-lg">
        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-yellow-600" />
          <span className="font-semibold !text-gray-900" style={{...FONTS.cardSubHeader}}>{new Date(program.startDate).toLocaleDateString()}</span>
        </div>
        <p className="text-sm !text-gray-600 mt-2" style={{...FONTS.cardSubHeader}}>
          Start Date
        </p>
      </div>
    </div>
  </div>
)
