
import type React from "react"
import { FONTS } from "../../constants/uiConstants"

import { useState } from "react"
import {
  User,
  Calendar,
  FileText,
  CheckCircle,
  Clock,
  Plus,
  Search,
  Filter,
  Download,
  Mail,
  Phone,
  Building,
  Users,
  MessageSquare,
  Eye,
  ChevronDown,
  ChevronRight,
  Home,
  X,
} from "lucide-react"

interface Employee {
  name: string
  id: string
  department: string
  position: string
  manager: string
  email: string
  phone: string
  hireDate: string
  avatar: string
}

interface ExitDetails {
  type: string
  reason: string
  lastWorkingDay: string
  noticePeriod: number
  submittedDate: string
  status: string
}

interface Progress {
  completed: number
  total: number
  percentage: number
}

interface OffboardingRequest {
  id: number
  employee: Employee
  exitDetails: ExitDetails
  progress: Progress
  priority: string
  assignedHR: string
}

interface ChecklistItemState {
  checked: boolean
  file: File | null
  showFile: boolean
  fileUrl?: string
}

const AdvancedHRMOffboarding = () => {
  const [activeTab, setActiveTab] = useState<"dashboard" | "requests" | "analytics">("dashboard")
  const [selectedEmployee, setSelectedEmployee] = useState<OffboardingRequest | null>(null)
  const [showNewRequestModal, setShowNewRequestModal] = useState(false)
  const [expandedChecklist, setExpandedChecklist] = useState<{ [key: number]: boolean }>({})
  const [checklistItemsState, setChecklistItemsState] = useState<{
    [employeeId: number]: {
      [categoryIdx: number]: {
        [itemIdx: number]: ChecklistItemState
      }
    }
  }>({})
  const [fileViewerModal, setFileViewerModal] = useState<{
    isOpen: boolean
    file: File | null
    fileUrl: string | null
  }>({ isOpen: false, file: null, fileUrl: null })

  type ChecklistCategory = { category: string; items: string[] }
  type ChecklistTemplates = { [key: string]: ChecklistCategory[] }

  // Sample data
  const offboardingRequests = [
    {
      id: 1,
      employee: {
        name: "John Doe",
        id: "EMP001",
        department: "Engineering",
        position: "Senior Developer",
        manager: "Jane Smith",
        email: "john.doe@company.com",
        phone: "+1-555-0123",
        hireDate: "2020-03-15",
        avatar: "👨‍💻",
      },
      exitDetails: {
        type: "Resignation",
        reason: "Career Growth",
        lastWorkingDay: "2024-07-15",
        noticePeriod: 30,
        submittedDate: "2024-06-15",
        status: "In Progress",
      },
      progress: {
        completed: 12,
        total: 18,
        percentage: 67,
      },
      priority: "High",
      assignedHR: "Sarah Johnson",
    },
    {
      id: 2,
      employee: {
        name: "Alice Johnson",
        id: "EMP002",
        department: "Marketing",
        position: "Marketing Manager",
        manager: "Mike Brown",
        email: "alice.johnson@company.com",
        phone: "+1-555-0124",
        hireDate: "2019-08-20",
        avatar: "👩‍💼",
      },
      exitDetails: {
        type: "Termination",
        reason: "Performance",
        lastWorkingDay: "2024-06-30",
        noticePeriod: 0,
        submittedDate: "2024-06-28",
        status: "Completed",
      },
      progress: {
        completed: 18,
        total: 18,
        percentage: 100,
      },
      priority: "Medium",
      assignedHR: "David Wilson",
    },
  ]

  const checklistTemplates: ChecklistTemplates = {
    Resignation: [
      {
        category: "Documentation",
        items: [
          "Exit interview scheduled",
          "Resignation letter received",
          "Handover document created",
          "Knowledge transfer completed",
        ],
      },
      {
        category: "IT & Security",
        items: [
          "Laptop/equipment returned",
          "Access cards deactivated",
          "Software licenses revoked",
          "Email access disabled",
          "VPN access removed",
        ],
      },
      {
        category: "HR & Payroll",
        items: [
          "Final salary calculated",
          "Benefits termination processed",
          "PF/Gratuity settlement",
          "Experience certificate issued",
          "Tax documents provided",
        ],
      },
      {
        category: "Administrative",
        items: ["Office keys returned", "Parking pass cancelled", "Library books returned", "Company property audit"],
      },
    ],
    Termination: [
      {
        category: "Documentation",
        items: ["Termination letter issued", "Handover document created", "Knowledge transfer completed"],
      },
      {
        category: "IT & Security",
        items: [
          "Laptop/equipment returned",
          "Access cards deactivated",
          "Software licenses revoked",
          "Email access disabled",
        ],
      },
      {
        category: "HR & Payroll",
        items: ["Final salary calculated", "Benefits termination processed", "PF/Gratuity settlement"],
      },
      { category: "Administrative", items: ["Office keys returned", "Parking pass cancelled"] },
    ],
  }

  const tabs: { id: "dashboard" | "requests" | "analytics"; label: string; icon: React.ElementType }[] = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "requests", label: "Exit Requests", icon: FileText },
    { id: "analytics", label: "Analytics", icon: MessageSquare },
  ]

  const exitAnalytics = {
    thisMonth: {
      total: 8,
      voluntary: 6,
      involuntary: 2,
      avgNoticePeriod: 25,
    },
    topReasons: [
      { reason: "Career Growth", count: 12, percentage: 35 },
      { reason: "Better Compensation", count: 8, percentage: 24 },
      { reason: "Work-Life Balance", count: 6, percentage: 18 },
      { reason: "Relocation", count: 4, percentage: 12 },
      { reason: "Performance", count: 4, percentage: 12 },
    ],
    departmentTrends: [
      { dept: "Engineering", exits: 15, retention: 85 },
      { dept: "Sales", exits: 12, retention: 78 },
      { dept: "Marketing", exits: 8, retention: 82 },
      { dept: "HR", exits: 3, retention: 95 },
    ],
  }

  const handleFileChange = (
    employeeId: number,
    categoryIdx: number,
    itemIdx: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0] || null
    let fileUrl = ""

    if (file) {
      fileUrl = URL.createObjectURL(file)
    }

    setChecklistItemsState((prev) => ({
      ...prev,
      [employeeId]: {
        ...prev[employeeId],
        [categoryIdx]: {
          ...prev[employeeId]?.[categoryIdx],
          [itemIdx]: {
            ...prev[employeeId]?.[categoryIdx]?.[itemIdx],
            file,
            fileUrl,
            checked: !!file,
          },
        },
      },
    }))
  }

  const openFileViewer = (employeeId: number, categoryIdx: number, itemIdx: number) => {
    const itemState = getItemState(employeeId, categoryIdx, itemIdx)
    if (itemState.file && itemState.fileUrl) {
      // For different file types, handle differently
      const fileType = itemState.file.type

      if (fileType.startsWith("image/") || fileType === "application/pdf") {
        // Open images and PDFs in modal
        setFileViewerModal({
          isOpen: true,
          file: itemState.file,
          fileUrl: itemState.fileUrl,
        })
      } else {
        // For other file types, open in new tab or download
        const link = document.createElement("a")
        link.href = itemState.fileUrl
        link.target = "_blank"
        link.download = itemState.file.name
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }
    }
  }

  const closeFileViewer = () => {
    setFileViewerModal({ isOpen: false, file: null, fileUrl: null })
  }

  const toggleCheckbox = (employeeId: number, categoryIdx: number, itemIdx: number) => {
    setChecklistItemsState((prev) => ({
      ...prev,
      [employeeId]: {
        ...prev[employeeId],
        [categoryIdx]: {
          ...prev[employeeId]?.[categoryIdx],
          [itemIdx]: {
            ...prev[employeeId]?.[categoryIdx]?.[itemIdx],
            checked: !prev[employeeId]?.[categoryIdx]?.[itemIdx]?.checked,
          },
        },
      },
    }))
  }

  const getItemState = (employeeId: number, categoryIdx: number, itemIdx: number): ChecklistItemState => {
    return (
      checklistItemsState[employeeId]?.[categoryIdx]?.[itemIdx] || {
        checked: false,
        file: null,
        showFile: false,
        fileUrl: "",
      }
    )
  }

  const renderFileViewer = () => {
    if (!fileViewerModal.isOpen || !fileViewerModal.file || !fileViewerModal.fileUrl) return null

    const fileType = fileViewerModal.file.type
    const fileName = fileViewerModal.file.name

    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4" >
        <div className="rounded-lg max-h-[90vh]  overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-lg font-semibold">{fileName}</h3>
            <button onClick={closeFileViewer} className="px-4 py-2 hover:bg-gray-100 rounded-md">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-4 max-h-[calc(90vh-120px)] overflow-auto">
            {fileType.startsWith("image/") ? (
              <img
                src={fileViewerModal.fileUrl || "/placeholder.svg"}
                alt={fileName}
                className="max-w-full h-auto mx-auto"
              />
            ) : fileType === "application/pdf" ? (
              <iframe src={fileViewerModal.fileUrl} className="w-full h-[600px] border-0" title={fileName} />
            ) : fileType.startsWith("text/") ? (
              <div className="bg-gray-50 p-4 rounded border font-mono text-sm">
                <p>Text file preview not available. Click download to view content.</p>
              </div>
            ) : (
              <div className="text-center py-8">
                <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 mb-4">Preview not available for this file type</p>
                <a
                  href={fileViewerModal.fileUrl}
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

  const renderDashboard = () => (
    <div className="space-y-6" >
      {/* Stats Cards */}
      <div className="grid grid-cols-4 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Exits</p>
              <p className="text-3xl font-bold text-blue-600">12</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">This Month</p>
              <p className="text-3xl font-bold text-orange-600">{exitAnalytics.thisMonth.total}</p>
            </div>
            <Calendar className="w-8 h-8 text-orange-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Notice Period</p>
              <p className="text-3xl font-bold text-green-600">{exitAnalytics.thisMonth.avgNoticePeriod}d</p>
            </div>
            <Clock className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-3xl font-bold text-purple-600">45</p>
            </div>
            <CheckCircle className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ">
        <div className="lg:col-span-2 bg-white p-6 rounded-lg border shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold" >Recent Exit Requests</h3>
            <button
              onClick={() => setShowNewRequestModal(true)}
              className=" bg-[#006666] text-white px-4 py-2 rounded-md flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Request
            </button>
          </div>
          <div className="space-y-4">
            {offboardingRequests.slice(0, 3).map((req) => (
              <div
                key={req.id}
                className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                onClick={() => setSelectedEmployee(req)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl">{req.employee.avatar}</div>
                    <div>
                      <h4 className="font-medium">{req.employee.name}</h4>
                      <p className="text-sm text-gray-500">
                        {req.employee.department} • {req.exitDetails.type}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${req.progress.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">{req.progress.percentage}%</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Due: {req.exitDetails.lastWorkingDay}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full md:w-auto">
         <div className="bg-white p-6 rounded-lg border shadow-sm  ">
          <h3 className="text-lg font-semibold mb-4" >Exit Reasons</h3>
          <div className=" space-y-4" >
            {exitAnalytics.topReasons.slice(0, 4).map((reason, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <span className="text-sm">{reason.reason}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-12 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${reason.percentage}%` }}></div>
                  </div>
                  <span className="text-xs text-gray-500">{reason.count}</span>
                </div>
              </div>
            ))}
          </div>
         </div>
        </div>

      </div>
    </div>
  )

  const renderEmployeeDetails = () => {
    if (!selectedEmployee) return null

    const checklist = checklistTemplates[selectedEmployee.exitDetails.type] || []

    return (
      <div className="space-y-6" style={{fontFamily:FONTS.paragraph.fontFamily, fontSize:FONTS.paragraph.fontSize}}>
        {/* Employee Header */}
        <div className=" p-6 rounded-lg border shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-6">
              <div className="text-6xl">{selectedEmployee.employee.avatar}</div>
              <div>
                <h2 className="text-2xl font-bold">{selectedEmployee.employee.name}</h2>
                <p className="text-lg text-gray-600">{selectedEmployee.employee.position}</p>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                  <span className="flex items-center">
                    <Building className="w-4 h-4 mr-1" />
                    {selectedEmployee.employee.department}
                  </span>
                  <span className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    ID: {selectedEmployee.employee.id}
                  </span>
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    Hired: {selectedEmployee.employee.hireDate}
                  </span>
                </div>
              </div>
            </div>  
            <div className="text-right">
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedEmployee.exitDetails.status === "Completed"
                    ? "bg-green-100 text-green-800"
                    : selectedEmployee.exitDetails.status === "In Progress"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {selectedEmployee.exitDetails.status}
              </span>
              <p className="text-sm text-gray-500 mt-2">Priority: {selectedEmployee.priority}</p>
            </div>
          </div>
        </div>

        {/* Exit Details & Progress */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <h3 className="text-lg font-semibold mb-4" >Exit Information</h3>
            <div className="space-y-3">
              <div>
                <span className="text-sm text-gray-500">Exit Type:</span>
                <p className="font-medium">{selectedEmployee.exitDetails.type}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Reason:</span>
                <p className="font-medium">{selectedEmployee.exitDetails.reason}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Last Working Day:</span>
                <p className="font-medium">{selectedEmployee.exitDetails.lastWorkingDay}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Notice Period:</span>
                <p className="font-medium">{selectedEmployee.exitDetails.noticePeriod} days</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <h3 className="text-lg font-semibold mb-4" >Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-sm">{selectedEmployee.employee.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-sm">{selectedEmployee.employee.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4 text-gray-400" />
                <span className="text-sm">Manager: {selectedEmployee.employee.manager}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-gray-400" />
                <span className="text-sm">HR: {selectedEmployee.assignedHR}</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <h3 className="text-lg font-semibold mb-4" >Progress Overview</h3>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{selectedEmployee.progress.percentage}%</div>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                <div
                  className="bg-blue-600 h-3 rounded-full"
                  style={{ width: `${selectedEmployee.progress.percentage}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600">
                {selectedEmployee.progress.completed} of {selectedEmployee.progress.total} tasks completed
              </p>
            </div>
          </div>
        </div>

        {/* Offboarding Checklist */}
        <div className=" rounded-lg border shadow-sm">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold" >Offboarding Checklist</h3>
          </div>
          <div className="p-6">
            {checklist.map((category, categoryIdx) => (
              <div key={categoryIdx} className="mb-6 last:mb-0">
                <button
                  onClick={() =>
                    setExpandedChecklist({
                      ...expandedChecklist,
                      [categoryIdx]: !expandedChecklist[categoryIdx],
                    })
                  }
                  className="flex items-center space-x-2 w-full text-left px-4 py-2 bg-gray-50 rounded-md hover:bg-gray-100"
                >
                  {expandedChecklist[categoryIdx] ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                  <span className="font-medium">{category.category}</span>
                  <span className="text-sm text-gray-500">({category.items.length} items)</span>
                </button>

                {expandedChecklist[categoryIdx] && (
                  <div className="mt-3 space-y-2 ml-6">
                    {category.items.map((item, itemIdx) => {
                      const itemState = getItemState(selectedEmployee.id, categoryIdx, itemIdx)

                      return (
                        <div key={itemIdx} className="flex items-center p-2 hover:bg-gray-50 rounded relative">
                          <input
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 rounded"
                            checked={itemState.checked}
                            onChange={() => toggleCheckbox(selectedEmployee.id, categoryIdx, itemIdx)}
                          />
                          <span className="text-sm ml-3 flex-1">{item}</span>
                          <div className="ml-auto flex items-center space-x-2">
                            <input
                              className="block w-32 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
                              accept=".pdf,.txt,.doc,.docx,.jpg,.jpeg,.png,.gif"
                              id={`file-upload-${selectedEmployee.id}-${categoryIdx}-${itemIdx}`}
                              type="file"
                              onChange={(e) => handleFileChange(selectedEmployee.id, categoryIdx, itemIdx, e)}
                            />
                            {itemState.file && (
                              <button
                                type="button"
                                onClick={() => openFileViewer(selectedEmployee.id, categoryIdx, itemIdx)}
                                className="text-xs bg-[#006666] text-white px-4 py-2 rounded-md flex items-center"
                              >
                                <Eye className="w-3 h-3 mr-1" />
                                View
                              </button>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between">
          <button
            onClick={() => setSelectedEmployee(null)}
            className="px-4 py-2 border border-gray-300 text-white rounded-md bg-[#006666]"
          >
            Back to List
          </button>
          <div className="space-x-3">
            <button className="px-4 py-2 bg-[#006666] text-white rounded-md">Generate Reports</button>
          </div>
        </div>
      </div>
    )
  }

  const renderAnalytics = () => (
    <div className="space-y-6">
      
        <div className="space-y-4 grid grid-cols-4 gap-8 ">
          {exitAnalytics.departmentTrends.map((dept, idx) => (
            <div key={idx} className="min-h-[96px] bg-gray-50 mt-4 rounded-lg">
              <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="flex items-center justify-between">
            <div className="">
                <h4 className="font-medium" >{dept.dept}</h4>
                <p className="text-sm text-gray-600">{dept.exits} exits this year</p>
              </div>
           
              <div className="text-right">
                <div className="text-lg font-semibold text-green-600">{dept.retention}%</div>
                <p className="text-sm text-gray-500">Retention Rate</p>
              </div>
          </div>
        </div>     
            </div>
          ))}
       
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4" >Monthly Exit Trends</h3>
          <div className="h-48 flex items-end justify-between space-x-2">
            {[12, 8, 15, 6, 9, 11, 8, 14, 7, 10, 12, 8].map((height, idx) => (
              <div key={idx} className="flex-1 bg-blue-200 rounded-t" style={{ height: `${height * 8}px` }}>
                <div className="text-xs text-center mt-1">{height}</div>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>Jan</span>
            <span>Dec</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4" >Exit Interview Insights</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Interviews Completed</span>
              <span className="font-semibold">78%</span>
            </div>
            <div className="flex justify-between">
              <span>Would Recommend Company</span>
              <span className="font-semibold text-green-600">85%</span>
            </div>
            <div className="flex justify-between">
              <span>Average Rating</span>
              <span className="font-semibold">4.2/5</span>
            </div>
            <div className="flex justify-between">
              <span>Boomerang Hires</span>
              <span className="font-semibold">12</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className=" px-7 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">HRM Offboarding System</h1>
          <div className="flex items-center  space-x-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <input type="text" placeholder="Search employees..." className="pl-10 pr-4 py-2 border rounded-lg w-64" />
            </div>
            <button className="px-4 py-2.5 bg-white rounded-md">
              <Filter className="w-5 h-5  text-gray-500" />
            </button>
           
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="px-7">
        <div className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center rounded-md space-x-2 py-4 border-b-2 ${
                activeTab === tab.id
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-gray-800"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="py-4" >
        {activeTab === "dashboard" && renderDashboard()}
        {activeTab === "requests" &&
          (selectedEmployee ? (
            renderEmployeeDetails()
          ) : (
            <div className="bg-white rounded-lg border shadow-sm" >
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold" >All Exit Requests</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {offboardingRequests.map((req) => (
                    <div
                      key={req.id}
                      className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                      onClick={() => setSelectedEmployee(req)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="text-3xl">{req.employee.avatar}</div>
                          <div>
                            <h4 className="font-medium text-lg">{req.employee.name}</h4>
                            <p className="text-gray-500">
                              {req.employee.department} • {req.employee.position}
                            </p>
                            <p className="text-sm text-gray-400">
                              Exit Type: {req.exitDetails.type} | Last Day: {req.exitDetails.lastWorkingDay}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span
                            className={`px-3 py-1 rounded-full text-sm ${
                              req.exitDetails.status === "Completed"
                                ? "bg-green-100 text-green-800"
                                : req.exitDetails.status === "In Progress"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {req.exitDetails.status}
                          </span>
                          <div className="flex items-center space-x-2 mt-2">
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${req.progress.percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-600">{req.progress.percentage}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        {activeTab === "analytics"  && renderAnalytics()}
      </div>

      {/* File Viewer Modal */}
      {renderFileViewer()}
    </div>
  )
}

export default AdvancedHRMOffboarding
