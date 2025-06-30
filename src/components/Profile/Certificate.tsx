import type React from "react"
import { useState } from "react"
import { Briefcase,FileText, Plus, Eye, X, Pencil, } from "lucide-react"
import {FONTS} from "../../constants/uiConstants"

const FONTSS = {
  body: { fontFamily: "'Koh Santepheap', sans-serif",
    fontWeight: 300,
    fontSize: "16px",
    color: "black", },
}

interface CertificateItem {
  id: string
  description: string
  file?: File
  createdAt: Date
  isEditing: boolean
}

interface CertificatesProps {
  data: string[]
  onUpdate?: (data: string[]) => void
}

export const CertificatesComponent: React.FC<CertificatesProps> = ({ data, onUpdate }) => {
  const [certificates, setCertificates] = useState<CertificateItem[]>(
    data.map((desc, index) => ({
      id: `cert-${index}`,
      description: desc,
      createdAt: new Date(),
      isEditing: false,
    })),
  )
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateItem | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleDescriptionChange = (id: string, value: string) => {
    setCertificates((prev) => prev.map((cert) => (cert.id === id ? { ...cert, description: value } : cert)))
  }

  const addCertificate = () => {
    const newCert: CertificateItem = {
      id: `cert-${Date.now()}`,
      description: "",
      createdAt: new Date(),
      isEditing: true, // New certificates start in edit mode
    }
    setCertificates((prev) => [...prev, newCert])
  }

  const removeCertificate = (id: string) => {
    setCertificates((prev) => prev.filter((cert) => cert.id !== id))
  }

  const toggleEdit = (id: string) => {
    setCertificates((prev) => prev.map((cert) => (cert.id === id ? { ...cert, isEditing: !cert.isEditing } : cert)))
  }

  const saveCertificate = (id: string) => {
    setCertificates((prev) => prev.map((cert) => (cert.id === id ? { ...cert, isEditing: false } : cert)))

    // Update parent component
    if (onUpdate) {
      const updatedData = certificates.map((cert) => cert.description)
      onUpdate(updatedData)
    }
  }

  const handleFileUpload = (id: string, file: File) => {
    setCertificates((prev) => prev.map((cert) => (cert.id === id ? { ...cert, file } : cert)))
  }

  const openCertificateModal = (certificate: CertificateItem) => {
    setSelectedCertificate(certificate)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedCertificate(null)
  }

  const downloadFile = (file: File, filename: string) => {
    const url = URL.createObjectURL(file)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

  const viewFile = (file: File) => {
    const url = URL.createObjectURL(file)
    window.open(url, "_blank")
  }

  const hasEditingCertificates = certificates.some((cert) => cert.isEditing)

  return (
    <>
      <div className="flex flex-1 flex-col rounded-xl bg-white p-4 shadow-2xl border border-[#006666]/20 hover:shadow-3xl hover:scale-[1.02] transition-all duration-300 group">
        {hasEditingCertificates && (
          <div className="">
            <p className="!text-red-800 !text-xs" style={{ ...FONTSS.body }}>
              You have certificates in edit mode - Save or cancel to finish editing
            </p>
          </div>
        )}

        <div className="flex items-center gap-3 mb-6 relative justify-between">
          <div className="flex gap-3 items-center">
            <div className=" group-hover:scale-110 transition-transform duration-300">
              <Briefcase size={24} />
            </div>
            <h2 className="!text-[#000000]"  style={{ ...FONTS.cardheader }}>
              Certificates
            </h2>
          </div>

          <div className="flex gap-2 items-center">
            <button
              onClick={addCertificate}
              className="px-3 py-1 hover:text-blue-300 !text-[#000000] rounded-lg text-sm flex items-center gap-1"
              style={{ ...FONTS.button }}
            >
              <Plus size={16} />
             
            </button>
          </div>
        </div>

        <div className="space-y-3 overflow-auto h-[60vh] scrollbar-hide ">
          {certificates.length === 0 ? (
            <div className="text-center py-8 text-slate-400">
              <Briefcase size={48} className="mx-auto mb-4 opacity-50" />
              <p style={{ ...FONTSS.body }}>No certificates added yet</p>
              <p className="text-sm" style={{ ...FONTSS.body }}>
                Click "Add Certificate" to get started
              </p>
            </div>
          ) : (
            certificates.map((certificate) => (
              <div
                key={certificate.id}
                className={`p-2 border rounded-xl transition-all duration-200 relative ${
                  certificate.isEditing
                    ? "border-blue-400 bg-blue-50/10 shadow-lg"
                    : "border-gray-500 bg-white/5 hover:shadow-md"
                } backdrop-blur-sm`}
              >
                

                <div className="flex flex-col gap-3 ">
                  <div className="flex items-start gap-3 ">
                    <div className="flex-1">
                      <textarea
                        className={`w-full rounded-lg outline-none resize-none placeholder-gray-400 p-2 transition-all duration-200 scrollbar-hide ${
                          certificate.isEditing
                            ? "bg-white text-gray-800 border-2 border-blue-300 focus:ring-2 focus:ring-blue-500"
                            : "bg-transparent  border-none cursor-pointer hover:bg-white/5"
                        }`}
                        style={{ ...FONTSS.body }}
                        value={certificate.description}
                        rows={2}
                        onChange={(e) => handleDescriptionChange(certificate.id, e.target.value)}
                        readOnly={!certificate.isEditing}
                        placeholder="Enter certificate description..."
                        onClick={() => !certificate.isEditing && toggleEdit(certificate.id)}
                      />
                    </div>

                    <div className="grid grid-rows-2 items-center gap-2 ">
                      {!certificate.isEditing && certificate.file && (
                        <button
                          type="button"
                          onClick={() => openCertificateModal(certificate)}
                          className="px-2 py-1 bg-[#006666] hover:bg-[#008080] text-white rounded-lg text-sm transition-colors duration-200 flex items-center gap-1"
                        >
                        <Eye size={14} />
                          
                        </button>
                      )}

                      {certificate.isEditing ? (
                        <button
                          onClick={() => saveCertificate(certificate.id)}
                          className="px-2 py-1 flex bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm transition-colors duration-200 flex items-center gap-1"
                          style={{ ...FONTS.button }}
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          onClick={() => toggleEdit(certificate.id)}
                          className="px-2 py-1 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm transition-colors duration-200 flex items-center gap-1"
                          style={{ ...FONTS.button }}
                        >
                          <Pencil size={14} />
                         
                        </button>
                      )}
                    </div>
                  </div>

                  {certificate.isEditing && (
                    <div className="flex items-center gap-2 p-2 bg-white/10 rounded-lg">
                      <label className="cursor-pointer bg-[#006666] text-white px-3 py-1 rounded-lg text-sm hover:bg-[#008080] transition-colors duration-200">
                        {certificate.file ? "Change File" : "Upload File"}
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) handleFileUpload(certificate.id, file)
                          }}
                          className="hidden"
                        />
                      </label>
                      {certificate.file && (
                        <span className="text-sm text-green-400 font-semibold">{certificate.file.name}</span>
                      )}
                    </div>
                  )}

                 <div className=" flex justify-end border-t border-gray-600 gap-3">
                     {certificate.isEditing && (
                    <div className=" gap-2 pt-2 ">
                      <button
                        onClick={() => toggleEdit(certificate.id)}
                        className="px-3 py-1 bg-gray-500 hover:bg-gray-600 text-white rounded-lg text-sm transition-colors duration-200"
                        style={{ ...FONTS.button }}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                  {certificate.isEditing && certificates.length > 1 && (
                    <div className="gap-2 pt-2 ">
                        <button
                    type="button"
                    onClick={() => removeCertificate(certificate.id)}
                    className=" px-3 py-1 bg-red-500 hover:bg-red-600 rounded-lg text-sm
                    flex items-center justify-center transition-colors duration-200 text-white"
                  >
                    Delete
                  </button>
                    </div>
                 
                )}
                 </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Certificate View Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <FileText size={20} />
                Certificate Details
              </h2>
              <button onClick={closeModal} className="p-1 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
              {selectedCertificate && (
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold mb-2">Description</h3>
                    <p className="text-gray-700">{selectedCertificate.description || "No description provided"}</p>
                  </div>

                  {selectedCertificate.file && (
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h3 className="font-semibold mb-3">Attached File</h3>
                      <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <FileText size={20} className="text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">{selectedCertificate.file.name}</p>
                            <p className="text-sm text-gray-500">
                              Size: {(selectedCertificate.file.size / 1024).toFixed(1)} KB
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => viewFile(selectedCertificate.file!)}
                            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors duration-200 flex items-center gap-1"
                          >
                            <Eye size={16} />
                            View
                          </button>
                          <button
                            onClick={() => downloadFile(selectedCertificate.file!, selectedCertificate.file!.name)}
                            className="px-3 py-1 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg text-sm transition-colors duration-200"
                          >
                            Download
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="text-xs text-gray-500">
                    Created: {selectedCertificate.createdAt.toLocaleDateString()}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
