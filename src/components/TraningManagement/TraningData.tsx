import { useState } from "react"
import type { TrainingProgram, Employee, DashboardStats } from "../../components/TraningManagement/Traning"

export const useTrainingData = () => {
  const [stats] = useState<DashboardStats>({
    totalEmployees: 1247,
    activePrograms: 24,
    completionRate: 87.5,
    averageRating: 4.6,
  })

  const [trainingPrograms, setTrainingPrograms] = useState<TrainingProgram[]>([
    {
      id: "1",
      title: "Leadership Development Program",
      category: "Leadership",
      duration: "8 weeks",
      enrolled: 45,
      completed: 32,
      rating: 4.8,
      status: "active",
      startDate: "2024-01-15",
      instructor: "Sarah Johnson",
    },
    {
      id: "2",
      title: "Digital Marketing Fundamentals",
      category: "Marketing",
      duration: "4 weeks",
      enrolled: 78,
      completed: 65,
      rating: 4.5,
      status: "active",
      startDate: "2024-02-01",
      instructor: "Mike Chen",
    },
    {
      id: "3",
      title: "Data Analytics with Python",
      category: "Technical",
      duration: "12 weeks",
      enrolled: 32,
      completed: 28,
      rating: 4.9,
      status: "active",
      startDate: "2024-01-08",
      instructor: "Dr. Amanda Rodriguez",
    },
    {
      id: "4",
      title: "Effective Communication Skills",
      category: "Soft Skills",
      duration: "3 weeks",
      enrolled: 124,
      completed: 98,
      rating: 4.3,
      status: "completed",
      startDate: "2023-12-10",
      instructor: "James Wilson",
    },
  ])

  const [employees] = useState<Employee[]>([
    {
      id: "EMP-001",
      name: "Alex Thompson",
      department: "Engineering",
      position: "Senior Developer",
      trainingProgress: 85,
      completedCourses: 12,
      avatar: "AT",
      status: "active",
      enrolledPrograms: ["1", "3"],
      programProgress: { "1": 90, "3": 75 },
      enrollmentDate: { "1": "2024-01-20", "3": "2024-01-15" },
    },
    {
      id: "EMP-002",
      name: "Maria Garcia",
      department: "Marketing",
      position: "Marketing Manager",
      trainingProgress: 92,
      completedCourses: 15,
      avatar: "MG",
      status: "active",
      enrolledPrograms: ["1", "2"],
      programProgress: { "1": 100, "2": 85 },
      enrollmentDate: { "1": "2024-01-18", "2": "2024-02-05" },
    },
    {
      id: "EMP-003",
      name: "David Kim",
      department: "Sales",
      position: "Sales Representative",
      trainingProgress: 45,
      completedCourses: 6,
      avatar: "DK",
      status: "pending",
      enrolledPrograms: ["2", "4"],
      programProgress: { "2": 30, "4": 60 },
      enrollmentDate: { "2": "2024-02-10", "4": "2023-12-15" },
    },
    {
      id: "EMP-004",
      name: "Emily Davis",
      department: "HR",
      position: "HR Specialist",
      trainingProgress: 78,
      completedCourses: 9,
      avatar: "ED",
      status: "overdue",
      enrolledPrograms: ["1", "4"],
      programProgress: { "1": 65, "4": 100 },
      enrollmentDate: { "1": "2024-01-25", "4": "2023-12-12" },
    },
    {
      id: "EMP-005",
      name: "John Wilson",
      department: "Engineering",
      position: "Software Engineer",
      trainingProgress: 70,
      completedCourses: 8,
      avatar: "JW",
      status: "active",
      enrolledPrograms: ["1", "3"],
      programProgress: { "1": 80, "3": 60 },
      enrollmentDate: { "1": "2024-01-22", "3": "2024-01-20" },
    },
    {
      id: "EMP-006",
      name: "Sarah Brown",
      department: "Marketing",
      position: "Content Specialist",
      trainingProgress: 88,
      completedCourses: 11,
      avatar: "SB",
      status: "active",
      enrolledPrograms: ["2"],
      programProgress: { "2": 95 },
      enrollmentDate: { "2": "2024-02-03" },
    },
  ])

  return {
    stats,
    trainingPrograms,
    setTrainingPrograms,
    employees,
  }
}
