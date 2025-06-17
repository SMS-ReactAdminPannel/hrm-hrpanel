import type React from "react"
import { ArrowLeft } from "lucide-react"
import StarRating from "../../components/Appraisal/StarRating"

interface Employee {
  _id: string
  Employee: string
  Position: string
  Rating: number
  Status: string
  department: string
  ProjectPeriod: string
}

interface AppraisalCriteria {
  id: string
  category: string
  description: string
  weight: number
  rating: number
  comments: string
}

interface AppraisalViewProps {
  selectedEmployee: Employee | null
  appraisalCriteria: AppraisalCriteria[]
  overallRating: number
  onBack: () => void
  getStatusColor: (status: string) => string
}

const AppraisalView: React.FC<AppraisalViewProps> = ({
  selectedEmployee,
  appraisalCriteria,
  overallRating,
  onBack,
  getStatusColor,
}) => {
  if (!selectedEmployee) return null

  return (
    <div className="space-y-6">
      <button onClick={onBack} className="flex items-center gap-2 text-[#006666] hover:text-[#005555] mb-4">
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Dashboard</span>
      </button>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">{selectedEmployee.Employee}</h2>
          <p className="text-gray-600">
            {selectedEmployee.Position} • {selectedEmployee.department}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <span
              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-md ${getStatusColor(selectedEmployee.Status)}`}
            >
              {selectedEmployee.Status}
            </span>
            <span className="text-sm text-gray-500">Project Period: {selectedEmployee.ProjectPeriod}</span>
          </div>
        </div>

        <div className="space-y-8">
          <h3 className="text-lg font-semibold text-gray-900">Performance Evaluation</h3>

          {appraisalCriteria.map((criteria) => (
            <div key={criteria.id} className="border border-gray-200 rounded-lg p-6 bg-gray-50">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-medium text-gray-900">{criteria.category}</h4>
                  <p className="text-sm text-gray-600 mt-1">{criteria.description}</p>
                </div>
                <span className="text-sm text-gray-500 bg-white px-2 py-1 rounded border">{criteria.weight}%</span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                  <div className="flex items-center gap-2">
                    <StarRating rating={criteria.rating} readonly />
                    <span className="text-sm text-gray-600">({criteria.rating}/5)</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Comments</label>
                  <div className="bg-white p-3 border border-gray-300 rounded-lg text-sm text-gray-700">
                    {criteria.comments || "No comments provided"}
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="bg-gradient-to-r from-[#006666] to-[#008080] rounded-lg p-6 text-white">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold text-white text-lg">Overall Rating</h4>
                <p className="text-green-100">Weighted average based on criteria</p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-white">{overallRating.toFixed(1)}</div>
                <div className="mt-2">
                  <StarRating rating={Math.round(overallRating)} readonly />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppraisalView
