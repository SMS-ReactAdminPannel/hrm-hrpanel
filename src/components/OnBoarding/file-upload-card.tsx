"use client"

import type React from "react"
import { Upload, FileText, File, Check, Clock, AlertTriangle, Eye, Download } from "lucide-react"
import type { FileData, FileInputRefs } from "./use-onboarding-state"

interface FileUploadCardProps {
  documentType: string
  title: string
  description: string
  category: string
  priority: string
  dueDate: string
  uploadedFiles: { [key: string]: FileData }
  fileInputRefs: FileInputRefs
  onFileChange: (documentType: string, file: File | null, url: string | null) => void
  onViewFile: (file: File, url: string) => void
  icon?: React.ReactNode
}

export function FileUploadCard({
  documentType,
  title,
  description,
  category,
  priority,
  dueDate,
  uploadedFiles,
  fileInputRefs,
  onFileChange,
  onViewFile,
  icon = <FileText className="w-6 h-6" />,
}: FileUploadCardProps) {
  const fileData = uploadedFiles[documentType]
  const inputRef = fileInputRefs[documentType as keyof FileInputRefs]
  const isUploaded = fileData.file !== null

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    let url = null

    if (file) {
      url = URL.createObjectURL(file)
    }

    onFileChange(documentType, file, url)
  }

  const handleViewFile = () => {
    if (fileData.file && fileData.url) {
      onViewFile(fileData.file, fileData.url)
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-700 border-red-200"
      case "Medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-200"
      case "Low":
        return "bg-green-100 text-green-700 border-green-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Legal":
        return "bg-purple-100 text-purple-700"
      case "Finance":
        return "bg-blue-100 text-blue-700"
      case "Technology":
        return "bg-indigo-100 text-indigo-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div
      className={`border-2 rounded-xl overflow-hidden transition-all duration-200 hover:shadow-lg ${
        isUploaded ? "border-green-200 bg-green-50/30" : "border-gray-200 bg-white hover:border-[#006666]/30"
      }`}
    >
      {/* Header */}
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-xl ${isUploaded ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-600"}`}>
            {isUploaded ? <Check className="w-6 h-6" /> : icon}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
                <p className="text-sm text-gray-600 mb-3">{description}</p>

                {/* Tags */}
                <div className="flex items-center gap-2 mb-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(category)}`}>
                    {category}
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(priority)}`}>
                    {priority} Priority
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    Due: {dueDate}
                  </span>
                </div>
              </div>

              {/* Status Indicator */}
              <div className="flex-shrink-0">
                {isUploaded ? (
                  <div className="flex items-center gap-1 text-green-600 bg-green-100 px-3 py-1 rounded-full text-sm font-medium">
                    <Check className="w-4 h-4" />
                    Uploaded
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-amber-600 bg-amber-100 px-3 py-1 rounded-full text-sm font-medium">
                    <AlertTriangle className="w-4 h-4" />
                    Required
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              {isUploaded ? (
                <>
                  <button
                    onClick={handleViewFile}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    <Eye className="w-4 h-4" />
                    View File
                  </button>
                  <button
                    onClick={() => inputRef.current?.click()}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                  >
                    <Upload className="w-4 h-4" />
                    Replace
                  </button>
                </>
              ) : (
                <button
                  onClick={() => inputRef.current?.click()}
                  className="flex items-center gap-2 px-6 py-3 bg-[#006666] text-white rounded-lg hover:bg-[#005555] transition-colors font-medium"
                >
                  <Upload className="w-4 h-4" />
                  Upload Document
                </button>
              )}
            </div>

            <input
              ref={inputRef}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>
      </div>

      {/* File Info Footer */}
      {isUploaded && fileData.file && (
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <File className="w-4 h-4 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-900 truncate max-w-xs">{fileData.file.name}</p>
                <p className="text-xs text-gray-500">{(fileData.file.size / 1024).toFixed(1)} KB • Uploaded just now</p>
              </div>
            </div>
            {fileData.url && (
              <a
                href={fileData.url}
                download={fileData.file.name}
                className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-800 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
