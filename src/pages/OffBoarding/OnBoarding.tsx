"use client"

import type React from "react"

import { useState, useRef } from "react"
import { X, Upload, FileText, File, Check } from "lucide-react"
import { FONTS } from "../../constants/uiConstants"

export default function OnboardingTemplate() {
  const [activeTab, setActiveTab] = useState("welcome")
  const [completedTasks, setCompletedTasks] = useState<number[]>([])
  const [uploadedFiles, setUploadedFiles] = useState<{
    [key: string]: { file: File | null; url: string | null }
  }>({
    i9Form: { file: null, url: null },
    w4Form: { file: null, url: null },
    directDeposit: { file: null, url: null },
  })
  const [fileViewerModal, setFileViewerModal] = useState<{
    isOpen: boolean
    file: File | null
    url: string | null
  }>({
    isOpen: false,
    file: null,
    url: null,
  })

  const fileInputRefs = {
    i9Form: useRef<HTMLInputElement>(null),
    w4Form: useRef<HTMLInputElement>(null),
    directDeposit: useRef<HTMLInputElement>(null),
  }

  const onboardingTasks = [
    { id: 1, title: "Complete I-9 Form", category: "Legal", priority: "High", dueDate: "Day 1" },
    { id: 2, title: "Submit Tax Documents", category: "Finance", priority: "High", dueDate: "Day 1" },
    { id: 3, title: "IT Equipment Setup", category: "Technology", priority: "Medium", dueDate: "Day 2" },
    { id: 4, title: "Office Tour", category: "Orientation", priority: "Medium", dueDate: "Day 3" },
    { id: 5, title: "Meet Team Members", category: "Social", priority: "Low", dueDate: "Week 1" },
    { id: 6, title: "Complete Training Modules", category: "Training", priority: "High", dueDate: "Week 2" },
  ]

  const getRandomColor = () => {
    const colors = ['#006666'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const toggleTask = (taskId: number) => {
    setCompletedTasks((prev) => (prev.includes(taskId) ? prev.filter((id) => id !== taskId) : [...prev, taskId]))
  }

  const progress = (completedTasks.length / onboardingTasks.length) * 100

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800 border-red-200"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const handleFileChange = (documentType: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    let url = null

    if (file) {
      url = URL.createObjectURL(file)
    }

    setUploadedFiles((prev) => ({
      ...prev,
      [documentType]: { file, url },
    }))
  }

  const handleViewFile = (documentType: string) => {
    const fileData = uploadedFiles[documentType]
    if (fileData.file && fileData.url) {
      setFileViewerModal({
        isOpen: true,
        file: fileData.file,
        url: fileData.url,
      })
    }
  }

  const closeFileViewer = () => {
    setFileViewerModal({
      isOpen: false,
      file: null,
      url: null,
    })
  }

  const renderFileViewer = () => {
    if (!fileViewerModal.isOpen || !fileViewerModal.file || !fileViewerModal.url) return null

    const fileType = fileViewerModal.file.type
    const fileName = fileViewerModal.file.name

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-h-[90vh] w-full max-w-4xl overflow-hidden">
          <div className="flex items-center justify-between border-b p-4">
            <h3 className="text-lg font-semibold">{fileName}</h3>
            <button 
              onClick={closeFileViewer} 
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-4 max-h-[calc(90vh-120px)] overflow-auto">
            {fileType.startsWith("image/") ? (
              <img
                src={fileViewerModal.url || "/placeholder.svg"}
                alt={fileName}
                className="max-w-full h-auto mx-auto"
              />
            ) : fileType === "application/pdf" ? (
              <iframe src={fileViewerModal.url} className="w-full h-[600px] border-0" title={fileName} />
            ) : fileType.startsWith("text/") ? (
              <div className="bg-gray-50 p-4 rounded border font-mono text-sm">
                <p>Text file preview not available. Click download to view content.</p>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto text-black mb-4">📄</div>
                <p className="text-gray-600 mb-4">Preview not available for this file type</p>
                <a
                  href={fileViewerModal.url}
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

  const FileUploadCard = ({
    documentType,
    title,
    description,
    icon = <FileText className="w-5 h-5" />
  }: {
    documentType: string
    title: string
    description: string
    icon?: React.ReactNode
  }) => {
    const fileData = uploadedFiles[documentType]
    const inputRef = fileInputRefs[documentType as keyof typeof fileInputRefs]

    return (
      <div className="border border-gray-200 rounded-lg overflow-hidden transition-all hover:shadow-md">
        <div className="p-4">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-full bg-gray-100 text-gray-600">
              {icon}
            </div>
            <div className="flex-1 ">
              <h3 className="font-medium text-gray-900">{title}</h3>
              <p className="text-sm text-gray-500">{description}</p>
              
              {fileData.file ? (
                <div className="mt-3 flex items-center gap-2 ml-auto">
                  <span className="text-sm font-medium text-green-600 flex items-center gap-1">
                    <Check className="w-4 h-4" /> File uploaded
                  </span>
                  <button
                    onClick={() => handleViewFile(documentType)}
                    className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    View file
                  </button>
                  <button
                    onClick={() => inputRef.current?.click()}
                    className="text-sm text-gray-600 hover:text-gray-800 hover:underline"
                  >
                    Replace
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => inputRef.current?.click()}
                  className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-[#006666] text-white rounded-md hover:bg-[#005555] transition-colors ml-auto"
                >
                  <Upload className="w-4 h-4" />
                  Upload File
                </button>
              )}
              
              <input
                ref={inputRef}
                type="file"
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                onChange={(e) => handleFileChange(documentType, e)}
                className="hidden"
              />
            </div>
          </div>
        </div>
        
        {fileData.file && (
          <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <File className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700 truncate max-w-xs">
                  {fileData.file.name}
                </span>
              </div>
              <span className="text-xs text-gray-500">
                {(fileData.file.size / 1024).toFixed(1)} KB
              </span>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="mx-auto space-y-6 min-h-screen pb-12">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 ml-1"
          style={{
            fontSize: FONTS.header.fontSize,
            fontFamily: FONTS.header.fontFamily
          }}>On Boarding</h1>
      </div>

      {/* Tabs */}
      <div className="rounded-lg shadow-sm bg-white border pb-10 border-gray-200">
        <div className="border-gray-200 ">
          <nav className="flex space-x-8 bg-[#006666]  px-6" aria-label="Tabs">
            {[
              { id: "welcome", name: "Welcome" },
              { id: "documents", name: "Documents" },
              { id: "profile", name: "Profile" },
              { id: "tasks", name: "Tasks" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 rounded-md font-medium text-sm transition-colors duration-200 ${
                  activeTab === tab.id
                  ? "border-[#FCECDD] text-white"
                    : "border-transparent text-white hover:text-gray-700 hover:border-gray-300"
                }`}
                style={{
                  fontSize: FONTS.paragraph.fontSize,
                  fontFamily: FONTS.header.fontFamily
                }}
              >
                <span className="flex items-center gap-2">
                  {tab.name}
                </span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Welcome Tab */}
          {activeTab === "welcome" && (
            <div className="space-y-6">
              <div className="text-center p-5">
                <h2 className="text-2xl font-bold text-gray-900 mb-2"
                  style={{
                    fontSize: FONTS.header2.fontSize,
                    fontFamily: FONTS.header.fontFamily
                }}>Welcome to Your New Role!</h2>
                <p className="text-gray-600"
                  style={{
                    fontSize: FONTS.paragraph.fontSize,
                    fontFamily: FONTS.header.fontFamily
                }}>
                  {"We're excited to have you join our team as a Senior Software Engineer"}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2"
                    style={{
                      fontSize: FONTS.header3.fontSize,
                      fontFamily: FONTS.header.fontFamily
                  }}>
                    Your Team
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3  rounded-lg"
                      style={{
                        fontSize: FONTS.paragraph.fontSize,
                        fontFamily: FONTS.header.fontFamily
                    }}>
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                        SM
                      </div>
                      <div>
                        <p className="font-medium text-gray-900"
                        >Sarah Miller</p>
                        <p className="text-sm text-gray-500">Engineering Manager</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3  rounded-lg">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold">
                        JD
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">John Davis</p>
                        <p className="text-sm text-gray-500">Senior Developer</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2"
                    style={{
                      fontSize: FONTS.header3.fontSize,
                      fontFamily: FONTS.header.fontFamily
                  }}>
                    First Week Schedule
                  </h3>
                  <div className="space-y-2 text-sm"
                    style={{
                      fontSize: FONTS.paragraph.fontSize,
                      fontFamily: FONTS.header.fontFamily
                  }}>
                    <div className="flex justify-between items-center p-2  rounded">
                      <span>Day 1: Orientation & Setup</span>
                      <span className="px-3 py-1 text-white rounded text-xs font-medium" style={{background:'#006666'}}>9:00 AM</span>
                    </div>
                    <div className="flex justify-between items-center p-2  rounded">
                      <span>Day 2: Team Introductions</span>
                      <span className="px-3 py-1 text-white rounded text-xs font-medium" style={{background:'#006666'}}>10:00 AM</span>
                    </div>
                    <div className="flex justify-between items-center p-2  rounded">
                      <span>Day 3: Project Overview</span>
                      <span className="px-3 py-1 text-white rounded text-xs font-medium" style={{background:'#006666'}}>2:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Documents Tab */}
          {activeTab === "documents" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2"
                  style={{
                    fontSize: FONTS.header2.fontSize,
                    fontFamily: FONTS.header.fontFamily
                }}>Required Documents</h2>
                <p className="text-gray-600"
                  style={{
                    fontSize: FONTS.paragraph.fontSize,
                    fontFamily: FONTS.header.fontFamily
                }}>Please upload the following documents to complete your onboarding</p>
              </div>

              <div className="grid gap-4"
                style={{
                  fontSize: FONTS.paragraph.fontSize,
                  fontFamily: FONTS.header.fontFamily
              }}>
                <FileUploadCard
                  documentType="i9Form"
                  title="Form I-9 (Employment Eligibility)"
                  description="Required for all employees"
                />
                
                <FileUploadCard
                  documentType="w4Form"
                  title="W-4 Tax Form"
                  description="Federal tax withholding"
                />
                
                <FileUploadCard
                  documentType="directDeposit"
                  title="Direct Deposit Form"
                  description="Banking information for payroll"
                  icon={<File className="w-5 h-5" />}
                />
              </div>
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2"
                  style={{
                    fontSize: FONTS.header2.fontSize,
                    fontFamily: FONTS.header.fontFamily
                }}>Complete Your Profile</h2>
                <p className="text-black"
                  style={{
                    fontSize: FONTS.paragraph.fontSize,
                    fontFamily: FONTS.header.fontFamily
                }}>Help us get to know you better</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6"
                style={{
                  fontSize: FONTS.paragraph.fontSize,
                  fontFamily: FONTS.header.fontFamily
              }}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <div className="relative">
                      <input
                        id="phone"
                        type="tel"
                        placeholder="(555) 123-4567"
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Personal Email
                    </label>
                    <div className="relative">
                      <input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                      Home Address
                    </label>
                    <div className="relative">
                      <input
                        id="address"
                        type="text"
                        placeholder="123 Main St, City, State"
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="emergency" className="block text-sm font-medium text-gray-700">
                      Emergency Contact
                    </label>
                    <input
                      id="emergency"
                      type="text"
                      placeholder="Name and phone number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              <hr className="border-gray-200" />

              <div className="space-y-4"
                style={{
                  fontSize: FONTS.paragraph.fontSize,
                  fontFamily: FONTS.header.fontFamily
              }}>
                <h3 className="font-semibold text-gray-900">Preferences</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 border-gray-300 rounded"
                      style={{ accentColor: getRandomColor() }}
                    />
                    <span className="text-sm text-black">Subscribe to company newsletter</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 border-gray-300 rounded"
                      style={{ accentColor: getRandomColor() }}
                    />
                    <span className="text-sm text-black">Notify me about company events</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end">
                <button className="px-4 py-2 text-white rounded-md bg-[#006666] transition-colors"
                  style={{
                    fontSize: FONTS.paragraph.fontSize,
                    fontFamily: FONTS.header.fontFamily
                }}>Save Profile</button>
              </div>
            </div>
          )}

          {/* Tasks Tab */}
          {activeTab === "tasks" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2"
                  style={{
                    fontSize: FONTS.header2.fontSize,
                    fontFamily: FONTS.header.fontFamily
                }}>Onboarding Checklist</h2>
                <p className="text-black"
                  style={{
                    fontSize: FONTS.paragraph.fontSize,
                    fontFamily: FONTS.header.fontFamily
                }}>Complete these tasks during your first few weeks</p>
              </div>

              <div className="space-y-4"
                style={{
                  fontSize: FONTS.paragraph.fontSize,
                  fontFamily: FONTS.header.fontFamily
              }}>
                {onboardingTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={completedTasks.includes(task.id)}
                      onChange={() => toggleTask(task.id)}
                      style={{ accentColor: getRandomColor() }}
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p
                          className={`font-medium ${
                            completedTasks.includes(task.id) ? "line-through text-gray-500" : "text-gray-900"
                          }`}
                        >
                          {task.title}
                        </p>
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(task.priority)}`}
                        >
                          {task.priority}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{task.category}</span>
                        <span className="flex items-center gap-1">
                          Due: {task.dueDate}
                        </span>
                      </div>
                    </div>
                    {completedTasks.includes(task.id) && <span className="text-green-500 text-xl">✅</span>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* File Viewer Modal */}
      {renderFileViewer()}
    </div>
  )
}