import type React from "react"
import { X, ArrowLeft, Plus, Check } from "lucide-react"
import StarRating from "../../components/Appraisal/StarRating"
import TextArea from "../../components/Appraisal/TextArea"

interface Employee {
  id: string
  name: string
  position: string
  department: string
  rating: number
  lastAppraisal: string
  nextAppraisal: string
  status: "pending" | "in-progress" | "completed"
}

interface AppraisalCriteria {
  id: string
  category: string
  description: string
  weight: number
  rating: number
  comments: string
}


interface AppraisalModalProps {
  showModal: boolean
  modalMode: "select" | "view" | "create"
  modalEmployee: Employee | null
  employees: Employee[]
  newAppraisalData: {
    employeeId: string
    criteria: AppraisalCriteria[]
  }
  modalAppraisalData: AppraisalCriteria[]
  modalOverallRating: number
  newAppraisalOverallRating: number
  onClose: () => void
  onSelectEmployee: (employee: Employee) => void
  onBackToSelect: () => void
  onCreateMode: () => void
  onEmployeeChange: (employeeId: string) => void
  onRatingChange: (criterionId: string) => (rating: number) => void
  onCommentsChange: (criterionId: string) => (value: string) => void
  onSubmit: () => void
  getStatusColor: (status: string) => string
}

const AppraisalModal: React.FC<AppraisalModalProps> = ({
  showModal,
  modalMode,
  modalEmployee,
  employees,
  newAppraisalData,
  modalAppraisalData,
  modalOverallRating,
  newAppraisalOverallRating,
  onClose,
  onSelectEmployee,
  onBackToSelect,
  onCreateMode,
  onEmployeeChange,
  onRatingChange,
  onCommentsChange,
  onSubmit,
  getStatusColor,
}) => {
  if (!showModal) return null

  return (
    
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      
      <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-900">
            {modalMode === "select" && "Select Employee"}
            {modalMode === "view" && modalEmployee && `Appraisal for ${modalEmployee.name}`}
            {modalMode === "create" && "Create New Appraisal"}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {modalMode === "select" && (
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Select Employee</h4>
              <div className="space-y-3">
                {employees.map((employee) => (
                  <div
                    key={employee.id}
                    className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                    onClick={() => onSelectEmployee(employee)}
                  >
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{employee.name}</div>
                      <div className="text-sm text-gray-500">
                        {employee.position} • {employee.department}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1">
                        <StarRating rating={employee.rating} readonly />
                        <span className="text-sm text-gray-600 ml-2">({employee.rating})</span>
                      </div>
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full mt-1 ${getStatusColor(employee.status)}`}
                      >
                        {employee.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="pt-4">
                <button
                  onClick={onCreateMode}
                  className="bg-[#006666] text-white px-4 py-2 rounded-md hover:bg-[#005555] transition-colors flex items-center gap-2 w-full justify-center"
                >
                  <Plus className="w-4 h-4" />
                  Create New Appraisal
                </button>
              </div>
            </div>
          )}

          {modalMode === "view" && modalEmployee && (
            <div className="space-y-8">
              <div className="flex items-center gap-4 mb-6">
                <button onClick={onBackToSelect} className="text-[#006666] hover:text-[#005555]">
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{modalEmployee.name}</h2>
                  <p className="text-gray-600">
                    {modalEmployee.position} • {modalEmployee.department}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(modalEmployee.status)}`}
                    >
                      {modalEmployee.status}
                    </span>
                    <span className="text-sm text-gray-500">Last Appraisal: {modalEmployee.lastAppraisal}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <h3 className="text-lg font-semibold text-gray-900">Performance Evaluation</h3>

                {modalAppraisalData.map((criteria) => (
                  <div key={criteria.id} className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-medium text-gray-900">{criteria.category}</h4>
                        <p className="text-sm text-gray-600 mt-1">{criteria.description}</p>
                      </div>
                      <span className="text-sm text-gray-500 bg-white px-2 py-1 rounded border">
                        {criteria.weight}%
                      </span>
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
                      <div className="text-4xl font-bold text-white">{modalOverallRating.toFixed(1)}</div>
                      <div className="mt-2">
                        <StarRating rating={Math.round(modalOverallRating)} readonly />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
                    onClick={onClose}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

          {modalMode === "create" && (
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Employee</label>
                  <div className="relative">
                    <select
                      value={newAppraisalData.employeeId}
                      onChange={(e) => onEmployeeChange(e.target.value)}
                      className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-[#006666] focus:border-[#006666]"
                    >
                      <option value="">Select an employee</option>
                      {employees.map((employee) => (
                        <option key={employee.id} value={employee.id}>
                          {employee.name} ({employee.position})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {newAppraisalData.employeeId && (
                  <div className="space-y-6">
                    {newAppraisalData.criteria.map((criterion) => (
                      <div key={criterion.id} className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="font-medium text-gray-900">{criterion.category}</h4>
                            <p className="text-sm text-gray-600 mt-1">{criterion.description}</p>
                          </div>
                          <span className="text-sm text-gray-500 bg-white px-2 py-1 rounded border">
                            {criterion.weight}%
                          </span>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                            <div className="flex items-center gap-2">
                              <StarRating rating={criterion.rating} onChange={onRatingChange(criterion.id)} />
                              <span className="text-sm text-gray-600">({criterion.rating}/5)</span>
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Comments</label>
                            <TextArea
                              id={`comments-${criterion.id}`}
                              value={criterion.comments}
                              onChange={onCommentsChange(criterion.id)}
                              placeholder="Enter your comments here..."
                              rows={3}
                            />
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
                          <div className="text-4xl font-bold text-white">{newAppraisalOverallRating.toFixed(1)}</div>
                          <div className="mt-2">
                            <StarRating rating={Math.round(newAppraisalOverallRating)} readonly />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                      <button
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
                        onClick={onClose}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={onSubmit}
                        disabled={!newAppraisalData.employeeId}
                        className="bg-[#006666] text-white px-4 py-2 rounded-md hover:bg-[#005555] transition-colors disabled:opacity-50 flex items-center gap-2"
                      >
                        <Check className="w-5 h-5" />
                        Submit Appraisal
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AppraisalModal
