"use client"
import { TeamOverview } from "./team-overview"
import { DocumentsSection } from "./documents-section"
import { ProfileSection } from "./profile-section"
import { TasksSection } from "./tasks-section"
import { FileViewerModal } from "./file-viewer-modal"
import { EmployeeModal } from "./employee-modal"
import { useOnboardingState } from "./use-onboarding-state"
// import { FONT } from "../LeaveTypes/types"
import {FONTS} from "../../constants/uiConstants"
export default function OnboardingTemplates() {
  const {
    activeTab,
    setActiveTab,
    completedTasks,
    setCompletedTasks,
    uploadedFiles,
    setUploadedFiles,
    fileViewerModal,
    setFileViewerModal,
    employeeModal,
    setEmployeeModal,
    viewingEmployeeDocs,
    setViewingEmployeeDocs,
    onboardingTasks,
    teamMembers,
    fileInputRefs,
  } = useOnboardingState()

  return (
    <div className="mx-auto space-y-6 min-h-screen pb-12">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold !text-white tracking-tight text-gray-900 ml-1">On Boarding</h1>
      </div>

      <div className="rounded-lg shadow-sm bg-white border pb-10 border-gray-200">
        <div className="p-6 pb-0">
          {activeTab === "welcome" && (
            <TeamOverview
              teamMembers={teamMembers}
              onViewEmployee={(employee) => setEmployeeModal({ isOpen: true, employee })}
              onNavigateToDocuments={() => setActiveTab("documents")}
            />
          )}

          {activeTab === "documents" && (
            <DocumentsSection
              uploadedFiles={uploadedFiles}
              fileInputRefs={fileInputRefs}
              viewingEmployeeDocs={viewingEmployeeDocs}
              onFileChange={(documentType, file, url) => setUploadedFiles((prev) => ({ ...prev, [documentType]: { file, url } }))}
              onViewFile={(file, url) => setFileViewerModal({ isOpen: true, file, url })}
              onNavigateToTasks={() => setActiveTab("tasks")}
              onNavigateToWelcome={() => setActiveTab("welcome")}
              onBackToAll={() => setViewingEmployeeDocs(null)}            />
          )}

          {activeTab === "profile" && <ProfileSection />}

          {activeTab === "tasks" && (
            <TasksSection
              tasks={onboardingTasks}
              completedTasks={completedTasks}
              onToggleTask={(taskId) =>
                setCompletedTasks((prev) =>
                  prev.includes(taskId) ? prev.filter((id) => id !== taskId) : [...prev, taskId],
                )
              }
              onNavigateToDocuments={() => setActiveTab("documents")}
            />
          )}
        </div>
      </div>

      <FileViewerModal
        isOpen={fileViewerModal.isOpen}
        file={fileViewerModal.file}
        url={fileViewerModal.url}
        onClose={() => setFileViewerModal({ isOpen: false, file: null, url: null })}
      />

      <EmployeeModal
        isOpen={employeeModal.isOpen}
        employee={employeeModal.employee}
        onClose={() => setEmployeeModal({ isOpen: false, employee: null })}
        onViewDocs={(employeeName) => {
          setViewingEmployeeDocs(employeeName)
          setActiveTab("documents")
          setEmployeeModal({ isOpen: false, employee: null })
        }}
      />
    </div>
  )
}
