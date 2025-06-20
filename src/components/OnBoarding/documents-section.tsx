"use client"

import { ChevronLeft, FileCheck, Clock, AlertCircle } from "lucide-react"
import { FileUploadCard } from "./file-upload-card"
import type { FileData, FileInputRefs } from "./use-onboarding-state"

interface DocumentsSectionProps {
  uploadedFiles: { [key: string]: FileData }
  fileInputRefs: FileInputRefs
  viewingEmployeeDocs: string | null
  onFileChange: (documentType: string, file: File | null, url: string | null) => void
  onViewFile: (file: File, url: string) => void
  onNavigateToTasks: () => void
  onNavigateToWelcome: () => void
  onBackToAll: () => void
}

export function DocumentsSection({
  uploadedFiles,
  fileInputRefs,
  viewingEmployeeDocs,
  onFileChange,
  onViewFile,
  onNavigateToTasks,
  onNavigateToWelcome,
  onBackToAll,
}: DocumentsSectionProps) {
  const totalDocuments = 3
  const completedDocuments = Object.values(uploadedFiles).filter((doc) => doc.file !== null).length
  const progressPercentage = (completedDocuments / totalDocuments) * 100

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#006666] to-[#008080] rounded-xl p-6 text-white">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">
              {viewingEmployeeDocs ? `${viewingEmployeeDocs}'s Documents` : "Required Documents"}
            </h2>
            <p className="text-blue-100">
              {viewingEmployeeDocs
                ? "View and manage this employee's documents"
                : "Please upload the following documents to complete your onboarding"}
            </p>
          </div>
          <div className="flex gap-3">
            {viewingEmployeeDocs && (
              <button
                onClick={onBackToAll}
                className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors flex items-center gap-2 backdrop-blur-sm"
              >
                <ChevronLeft className="w-4 h-4" />
                Back to All
              </button>
            )}
            <button
              onClick={onNavigateToTasks}
              className="px-4 py-2 bg-white text-[#006666] rounded-lg hover:bg-gray-100 transition-colors font-medium"
            >
              View Tasks
            </button>
            <button
              onClick={onNavigateToWelcome}
              className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors backdrop-blur-sm"
            >
              Go Back
            </button>
          </div>
        </div>

        {/* Progress Section */}
        {!viewingEmployeeDocs && (
          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Document Upload Progress</span>
              <span className="text-sm">
                {completedDocuments} of {totalDocuments} completed
              </span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div
                className="bg-white h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <FileCheck className="w-4 h-4" />
                <span>{completedDocuments} Completed</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{totalDocuments - completedDocuments} Pending</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Status Alert */}
      {!viewingEmployeeDocs && completedDocuments < totalDocuments && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
            <div>
              <h3 className="font-medium text-amber-800">Action Required</h3>
              <p className="text-sm text-amber-700 mt-1">
                You have {totalDocuments - completedDocuments} document
                {totalDocuments - completedDocuments !== 1 ? "s" : ""} remaining to complete your onboarding process.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Documents Grid */}
      <div className="grid gap-6">
        <FileUploadCard
          documentType="i9Form"
          title="Form I-9 (Employment Eligibility)"
          description="Required for all employees to verify work authorization"
          category="Legal"
          priority="High"
          dueDate="Day 1"
          uploadedFiles={uploadedFiles}
          fileInputRefs={fileInputRefs}
          onFileChange={onFileChange}
          onViewFile={onViewFile}
        />

        <FileUploadCard
          documentType="w4Form"
          title="W-4 Tax Form"
          description="Federal tax withholding information for payroll"
          category="Finance"
          priority="High"
          dueDate="Day 1"
          uploadedFiles={uploadedFiles}
          fileInputRefs={fileInputRefs}
          onFileChange={onFileChange}
          onViewFile={onViewFile}
        />

        <FileUploadCard
          documentType="directDeposit"
          title="Direct Deposit Form"
          description="Banking information for salary and benefits payments"
          category="Finance"
          priority="Medium"
          dueDate="Day 3"
          uploadedFiles={uploadedFiles}
          fileInputRefs={fileInputRefs}
          onFileChange={onFileChange}
          onViewFile={onViewFile}
        />
      </div>

      {/* Completion Message */}
      {!viewingEmployeeDocs && completedDocuments === totalDocuments && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileCheck className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-green-800 mb-2">All Documents Uploaded!</h3>
          <p className="text-green-700 mb-4">
            Great job! You've successfully uploaded all required documents. Your onboarding is almost complete.
          </p>
          <button
            onClick={onNavigateToTasks}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            Continue to Tasks
          </button>
        </div>
      )}
    </div>
  )
}
