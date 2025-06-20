export interface TrainingProgram {
  id: string
  title: string
  category: string
  duration: string
  enrolled: number
  completed: number
  rating: number
  status: "active" | "draft" | "completed"
  startDate: string
  instructor: string
}

export interface Employee {
  id: string
  name: string
  department: string
  position: string
  trainingProgress: number
  completedCourses: number
  avatar: string
  status: "active" | "pending" | "overdue"
  enrolledPrograms: string[]
  programProgress: { [programId: string]: number }
  enrollmentDate: { [programId: string]: string }
}

export interface DashboardStats {
  totalEmployees: number
  activePrograms: number
  completionRate: number
  averageRating: number
}

export interface NewProgramFormData {
  title: string
  category: string
  duration: string
  instructor: string
  startDate: string
}
