export interface Employee {
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

export interface ExitDetails {
  type: string
  reason: string
  lastWorkingDay: string
  noticePeriod: number
  submittedDate: string
  status: string
}

export interface Progress {
  completed: number
  total: number
  percentage: number
}

export interface OffboardingRequest {
  id: number
  employee: Employee
  exitDetails: ExitDetails
  progress: Progress
  priority: string
  assignedHR: string
}

export interface ChecklistItemState {
  checked: boolean
  file: File | null
  showFile: boolean
  fileUrl?: string
}

export type ChecklistCategory = { category: string; items: string[] }
export type ChecklistTemplates = { [key: string]: ChecklistCategory[] }

export interface ExitAnalytics {
  thisMonth: {
    total: number
    voluntary: number
    involuntary: number
    avgNoticePeriod: number
  }
  topReasons: Array<{
    reason: string
    count: number
    percentage: number
  }>
  departmentTrends: Array<{
    dept: string
    exits: number
    retention: number
  }>
  monthlyTrends: number[]
  exitInterviews: {
    completed: number
    wouldRecommend: number
    averageRating: number
    boomerangHires: number
  }
}

export interface Filters {
  status: string
  department: string
  exitType: string
}
