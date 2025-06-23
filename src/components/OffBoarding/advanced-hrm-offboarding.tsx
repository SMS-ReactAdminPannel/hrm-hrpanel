"use client"

import type React from "react"
import { useState } from "react"
import { Home, FileText, BarChart3, Search } from "lucide-react"
import type { OffboardingRequest, ChecklistItemState, Filters } from "./types"
import { offboardingRequests } from "./constants"
import { DashboardStats } from "./dashboard-stats"
import { RecentRequests } from "./recent-request"
import { ExitReasonsAnalysis } from "./exit-reasons-analysis"
// import { SearchFilter } from "./search-filter"
import { FileViewer } from "./file-viewer"
import { EmployeeDetails } from "./employee-details"

const AdvancedHRMOffboardings = () => {
  const [activeTab, setActiveTab] = useState<"dashboard" | "requests" | "analytics">("dashboard")
  const [selectedEmployee, setSelectedEmployee] = useState<OffboardingRequest | null>(null)
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
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState<Filters>({
    status: "All",
    department: "All",
    exitType: "All",
  })

  const tabs: { id: "dashboard" | "requests"; label: string; icon: React.ElementType }[] = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "requests", label: "Exit Requests", icon: FileText },
    
  ]

  // Filter and search logic
  const filteredRequests = offboardingRequests.filter((request) => {
    if (
      searchQuery &&
      !request.employee.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !request.employee.id.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !request.employee.department.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !request.employee.position.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    if (filters.status !== "All" && request.exitDetails.status !== filters.status) {
      return false
    }

    if (filters.department !== "All" && request.employee.department !== filters.department) {
      return false
    }

    if (filters.exitType !== "All" && request.exitDetails.type !== filters.exitType) {
      return false
    }

    return true
  })

  const openFileViewer = (employeeId: number, categoryIdx: number, itemIdx: number) => {
    const itemState = getItemState(employeeId, categoryIdx, itemIdx)
    if (itemState.file && itemState.fileUrl) {
      const fileType = itemState.file.type

      if (fileType.startsWith("image/") || fileType === "application/pdf") {
        setFileViewerModal({
          isOpen: true,
          file: itemState.file,
          fileUrl: itemState.fileUrl,
        })
      } else {
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

  const updateChecklistItem = (
    employeeId: number,
    categoryIdx: number,
    itemIdx: number,
    updates: Partial<ChecklistItemState>,
  ) => {
    setChecklistItemsState((prev) => ({
      ...prev,
      [employeeId]: {
        ...prev[employeeId],
        [categoryIdx]: {
          ...prev[employeeId]?.[categoryIdx],
          [itemIdx]: {
            ...prev[employeeId]?.[categoryIdx]?.[itemIdx],
            ...updates,
          },
        },
      },
    }))
  }

  const renderDashboard = () => (
    <div className="space-y-6">
      <DashboardStats />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RecentRequests requests={filteredRequests} onSelectEmployee={setSelectedEmployee} />
      </div>
      <ExitReasonsAnalysis />
    </div>
  )

  const renderRequestsList = () => (
    <div className="bg-white rounded-lg border shadow-sm">
      <div className="p-6 border-b">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">All Exit Requests</h3>
          <div className="text-sm text-gray-500">
            Showing {filteredRequests.length} of {offboardingRequests.length} requests
          </div>
        </div>
      </div>
      <div className="p-6">
        {filteredRequests.length === 0 ? (
          <div className="text-center py-12">
            <Search className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h4 className="text-lg font-medium text-gray-600">No matching requests found</h4>
            <p className="text-gray-500 mt-1">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredRequests.map((req) => (
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
        )}
      </div>
    </div>
  )

  return (
    <div>
      <h1 className="text-2xl font-bold text-white py-4 pb-8">HRM Offboarding System</h1>
    <div className="min-h-screen rounded-lg "> 
      {/* Header */}
      {/* Navigation Tabs */}
      <div className="text-black px-7 rounded-md">
        <div className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center rounded-md space-x-2 py-4 border-b-2 ${
                activeTab === tab.id
                  ? "border-white text-white "
                  : "border-transparent text-black hover:text-gray-800"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-5">
        {activeTab === "dashboard" && renderDashboard()}
        {activeTab === "requests" &&
          (selectedEmployee ? (
            <EmployeeDetails
              employee={selectedEmployee}
              onBack={() => setSelectedEmployee(null)}
              checklistItemsState={checklistItemsState}
              onChecklistUpdate={updateChecklistItem}
              onFileViewer={openFileViewer}
            />
          ) : (
            renderRequestsList()
          ))}
      </div>

      {/* File Viewer Modal */}
      <FileViewer
        isOpen={fileViewerModal.isOpen}
        file={fileViewerModal.file}
        fileUrl={fileViewerModal.fileUrl}
        onClose={closeFileViewer}
      />
    </div>
    </div>
    
  )
}

export default AdvancedHRMOffboardings
