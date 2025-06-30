import type React from "react"
import { ArrowLeft, BookOpen, Users, Clock, Calendar } from "lucide-react"
import { FONTS } from "../../constants/uiConstants"
import type { TrainingProgram } from "../../components/TraningManagement/Traning"

interface ProgramHeaderProps {
  program: TrainingProgram
  participantCount: number
  onBack: () => void
}

export const ProgramHeader: React.FC<ProgramHeaderProps> = ({ program, participantCount, onBack }) => (
  <div className="rounded-xl shadow-sm border-gray-100 p-6">
    <div className="flex items-center justify-between mb-4">
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
        style={{ ...FONTS.button }}
      >
        <ArrowLeft className="w-6 h-6" />
      </button>
    </div>

    <div className="grid grid-cols-4 md:grid-cols-4 gap-4">
      {/* Program Title */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="flex items-center space-x-2">
          <h3 className="font-semibold !text-gray-900" style={{ ...FONTS.cardSubHeader }}>
            {program.title}
          </h3>
          <BookOpen className="w-8 h-8 text-blue-600" />
        </div>
        <p className="text-sm !text-gray-600 mt-1" style={{ ...FONTS.cardSubHeader }}>
          {program.category}
        </p>
      </div>

      {/* Enrolled Participants */}
      <div className="bg-green-50 p-4 rounded-lg relative h-24">
        <Users className="w-5 h-5 text-green-600 absolute top-3 right-3" />
        <p className="text-sm !text-gray-600" style={{ ...FONTS.cardSubHeader }}>
          Enrolled Participants
        </p>
        <span
          className="absolute bottom-3 left-4 font-semibold !text-gray-900"
          style={{ ...FONTS.cardSubHeader }}
        >
          {participantCount}
        </span>
      </div>

      {/* Duration */}
      <div className="bg-purple-50 p-4 rounded-lg relative h-24">
        <Clock className="w-5 h-5 text-purple-600 absolute top-3 right-3" />
        <p className="text-sm !text-gray-600" style={{ ...FONTS.cardSubHeader }}>
          Duration
        </p>
        <span
          className="absolute bottom-3 left-4 font-semibold !text-gray-900"
          style={{ ...FONTS.cardSubHeader }}
        >
          {program.duration}
        </span>
      </div>

      {/* Start Date */}
      <div className="bg-yellow-50 p-4 rounded-lg relative h-24">
        <Calendar className="w-5 h-5 text-yellow-600 absolute top-3 right-3" />
        <p className="text-sm !text-gray-600" style={{ ...FONTS.cardSubHeader }}>
          Start Date
        </p>
        <span
          className="absolute bottom-3 left-4 font-semibold !text-gray-900"
          style={{ ...FONTS.cardSubHeader }}
        >
          {new Date(program.startDate).toLocaleDateString()}
        </span>
      </div>
    </div>
  </div>
)
