"use client"

import type React from "react"

import { useState, useRef } from "react"
import { X } from "lucide-react"
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
  const colors = [ '#006666'];
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
        <div className="bg-white rounded-lg max-h-[90vh] w-full overflow-hidden">
          <div className="flex items-center justify-between border-b">
            <h3 className="text-lg font-semibold">{fileName}</h3>
            <button onClick={closeFileViewer} className="px-4 py-2 hover:bg-gray-100 rounded-">
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

  return (
    <div className="mx-auto space-y-6 min-h-screen">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 ml-1" >On Boarding</h1>
      </div>

      {/* Tabs */}
      <div className=" rounded-lg shadow-sm bg-white border border-gray-200">
        <div className="border-gray-200">
          <nav className="flex space-x-8 bg-gray-100 px-6" aria-label="Tabs" >
            {[
              { id: "welcome", name: "Welcome"},
              { id: "documents", name: "Documents"},
              { id: "profile", name: "Profile"},
              { id: "tasks", name: "Tasks" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 rounded-md font-medium text-sm transition-colors duration-200 ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
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
                
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Your New Role!</h2>
                <p className="text-gray-600">
                  {"We're excited to have you join our team as a Senior Software Engineer"}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                   
                    Your Team
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                        SM
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Sarah Miller</p>
                        <p className="text-sm text-gray-500">Engineering Manager</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
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
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    
                    First Week Schedule
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span>Day 1: Orientation & Setup</span>
                      <span className="px-3 py-1 text-white rounded text-xs font-medium" style={{background:'#006666'}}>9:00 AM</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span>Day 2: Team Introductions</span>
                      <span className="px-3 py-1 text-white rounded text-xs font-medium" style={{background:'#006666'}}>10:00 AM</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
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
                <h2 className="text-xl font-bold text-gray-900 mb-2">Required Documents</h2>
                <p className="text-gray-600" >Please upload the following documents to complete your onboarding</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📄</span>
                    <div>
                      <p className="font-medium text-gray-900">Form I-9 (Employment Eligibility)</p>
                      <p className="text-sm text-gray-500">Required for all employees</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      ref={fileInputRefs.i9Form}
                      className="block w-52 text-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
                      id="i9Form"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                      onChange={(e) => handleFileChange("i9Form", e)}
                      style={{background: '#006666', color: '#333'}}
                    />
                    {uploadedFiles.i9Form.file && (
                      <button
                        onClick={() => handleViewFile("i9Form")}
                       className="px-4 py-2 text-white text-xs rounded-md transition-colors"
                        style={{background: '#006666'}} >
                        View
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📄</span>
                    <div>
                      <p className="font-medium text-gray-900">W-4 Tax Form</p>
                      <p className="text-sm text-gray-500">Federal tax withholding</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      ref={fileInputRefs.w4Form}
                      className="block w-52 text-white text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
                      id="w4Form"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                      onChange={(e) => handleFileChange("w4Form", e)}
                       style={{background: '#006666', color: '#333'}}
                    />
                    {uploadedFiles.w4Form.file && (
                      <button
                        onClick={() => handleViewFile("w4Form")}
                       className="px-4 py-2 text-white text-xs rounded-md transition-colors"
                        style={{background: '#006666'}}             >
                        View
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📄</span>
                    <div>
                      <p className="font-medium text-gray-900">Direct Deposit Form</p>
                      <p className="text-sm text-gray-500">Banking information for payroll</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      ref={fileInputRefs.directDeposit}
                      className="block w-52 text-white text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
                      id="directDeposit"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                      onChange={(e) => handleFileChange("directDeposit", e)}
                       style={{background: '#006666', color: '#333'}}
                    />
                    {uploadedFiles.directDeposit.file && (
                      <button
                        onClick={() => handleViewFile("directDeposit")}
                        className="px-4 py-2 text-white text-xs rounded-md transition-colors"
                        style={{background: '#006666'}}
                      >
                        View
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Complete Your Profile</h2>
                <p className="text-black" >Help us get to know you better</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
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

               <div className="space-y-4">
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
                <button className="px-4 py-2 text-white rounded-md bg-[#006666] transition-colors">Save Profile</button>
              </div>
            </div>
          )}

          {/* Tasks Tab */}
          {activeTab === "tasks" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Onboarding Checklist</h2>
                <p className="text-black">Complete these tasks during your first few weeks</p>
              </div>

              <div className="space-y-4">
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
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded "
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
