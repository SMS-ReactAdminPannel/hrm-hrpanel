"use client"

import { X, FileText } from "lucide-react"

interface FileViewerProps {
  isOpen: boolean
  file: File | null
  fileUrl: string | null
  onClose: () => void
}

export const FileViewer = ({ isOpen, file, fileUrl, onClose }: FileViewerProps) => {
  if (!isOpen || !file || !fileUrl) return null

  const fileType = file.type
  const fileName = file.name

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold">{fileName}</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-md">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4 max-h-[calc(90vh-120px)] overflow-auto">
          {fileType.startsWith("image/") ? (
            <img src={fileUrl || "/placeholder.svg"} alt={fileName} className="max-w-full h-auto mx-auto" />
          ) : fileType === "application/pdf" ? (
            <iframe src={fileUrl} className="w-full h-[600px] border-0" title={fileName} />
          ) : fileType.startsWith("text/") ? (
            <div className="bg-gray-50 p-4 rounded border font-mono text-sm">
              <p>Text file preview not available. Click download to view content.</p>
            </div>
          ) : (
            <div className="text-center py-8">
              <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 mb-4">Preview not available for this file type</p>
              <a
                href={fileUrl}
                download={fileName}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Download File
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
