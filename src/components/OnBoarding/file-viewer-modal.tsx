"use client"

import { X } from "lucide-react"

interface FileViewerModalProps {
  isOpen: boolean
  file: File | null
  url: string | null
  onClose: () => void
}

export function FileViewerModal({ isOpen, file, url, onClose }: FileViewerModalProps) {
  if (!isOpen || !file || !url) return null

  const fileType = file.type
  const fileName = file.name

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-h-[90vh] w-full max-w-4xl overflow-hidden">
        <div className="flex items-center justify-between border-b p-4">
          <h3 className="text-lg font-semibold">{fileName}</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4 max-h-[calc(90vh-120px)] overflow-auto">
          {fileType.startsWith("image/") ? (
            <img src={url || "/placeholder.svg"} alt={fileName} className="max-w-full h-auto mx-auto" />
          ) : fileType === "application/pdf" ? (
            <iframe src={url} className="w-full h-[600px] border-0" title={fileName} />
          ) : fileType.startsWith("text/") ? (
            <div className="bg-gray-50 p-4 rounded border font-mono text-sm">
              <p>Text file preview not available. Click download to view content.</p>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto text-black mb-4">📄</div>
              <p className="text-gray-600 mb-4">Preview not available for this file type</p>
              <a
                href={url}
                download={fileName}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
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
