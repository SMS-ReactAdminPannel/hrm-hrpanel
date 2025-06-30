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
  email?: string;
  joiningDate?: string;
  manager?: string;

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
      <button onClick={onBack} className="flex items-center gap-2 text-white mb-4">
        <ArrowLeft className="w-5 h-5" />
        <span>Back</span>
      </button>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8 space-y-8 max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow border border-gray-200 p-6 space-y-6">
          {/* Employee Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">{selectedEmployee.Employee}</h2>
              <p className="text-sm text-gray-600">
                {selectedEmployee.Position} • {selectedEmployee.department}
              </p>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className={`px-3 py-1 rounded-full font-medium ${getStatusColor(selectedEmployee.Status)}`}>
                {selectedEmployee.Status}
              </span>
              <span className="text-gray-500">
                Project Period: <span className="font-medium">{selectedEmployee.ProjectPeriod}</span>
              </span>
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* Additional Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-sm text-gray-700">
            <div>
              <span className="font-medium text-gray-600">Employee ID:</span>
              <p className="mt-1 text-gray-900">{selectedEmployee._id}</p>
            </div>
            <div>
              <span className="font-medium text-gray-600">Email:</span>
              <p className="mt-1 text-gray-900">
                {selectedEmployee.email || `${selectedEmployee.Employee.toLowerCase().replace(" ", ".")}@gmail.com`}
              </p>
            </div>
            <div>
              <span className="font-medium text-gray-600">Date of Joining:</span>
              <p className="mt-1 text-gray-900">{selectedEmployee.joiningDate || "25 July 2024"}</p>
            </div>
            <div>
              <span className="font-medium text-gray-600">Reporting Manager:</span>
              <p className="mt-1 text-gray-900">{selectedEmployee.manager || "John Doe"}</p>
            </div>
            <div>
              <span className="font-medium text-gray-600">Employee Rating:</span>
              <p className="mt-1 flex items-center gap-1 text-gray-900">
                <StarRating rating={selectedEmployee.Rating} readonly />
                <span className="text-gray-600">({selectedEmployee.Rating}/5)</span>
              </p>
            </div>
          </div>
        </div>

        {/* Performance Evaluation */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800">Performance Evaluation</h3>

          {appraisalCriteria.map((criteria) => (
            <div
              key={criteria.id}
              className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="text-lg font-medium text-gray-900">{criteria.category}</h4>
                  <p className="text-sm text-gray-600 mt-1">{criteria.description}</p>
                </div>
                <span className="text-xs bg-gray-100 border border-gray-300 text-gray-700 px-2 py-1 rounded-md">
                  Weight: {criteria.weight}%
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                  <div className="flex items-center gap-2">
                    <StarRating rating={criteria.rating} readonly />
                    <span className="text-sm text-gray-600">({criteria.rating}/5)</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Comments</label>
                  <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-800 border border-gray-300">
                    {criteria.comments || <em className="text-gray-400">No comments provided</em>}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Overall Rating */}
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
