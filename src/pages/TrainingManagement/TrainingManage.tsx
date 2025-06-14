import type React from "react"
import { useState, useCallback, useMemo, memo } from "react"
import {
  Users,
  BookOpen,
  TrendingUp,
  Award,
  CheckCircle,
  AlertCircle,
  Search,
  Filter,
  Plus,
  BarChart3,
  PieChart,
  ArrowLeft,
  Calendar,
  Clock,
  X,
  Target,
  UserCheck,
  Activity,
} from "lucide-react"
import { FONTS } from "../../constants/uiConstants"

// TypeScript interfaces
interface TrainingProgram {
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

interface Employee {
  id: string
  name: string
  department: string
  position: string
  trainingProgress: number
  completedCourses: number
  avatar: string
  status: "active" | "pending" | "overdue"
  enrolledPrograms: string[] // Array of program IDs
  programProgress: { [programId: string]: number } // Progress per program
  enrollmentDate: { [programId: string]: string } // Enrollment date per program
}

interface DashboardStats {
  totalEmployees: number
  activePrograms: number
  completionRate: number
  averageRating: number
}

interface NewProgramFormData {
  title: string
  category: string
  duration: string
  instructor: string
  startDate: string
}

interface NewProgramFormProps {
  onClose: () => void
  onSubmit: (formData: NewProgramFormData) => void
  categories: string[]
}

// Memoized form component defined outside the main component
const NewProgramForm = memo(({ onClose, onSubmit, categories }: NewProgramFormProps) => {
  const [formData, setFormData] = useState<NewProgramFormData>({
    title: "",
    category: "Leadership",
    duration: "",
    instructor: "",
    startDate: new Date().toISOString().split("T")[0],
  })

  const handleTitleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, title: e.target.value }))
  }, [])

  const handleCategoryChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, category: e.target.value }))
  }, [])

  const handleDurationChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, duration: e.target.value }))
  }, [])

  const handleInstructorChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, instructor: e.target.value }))
  }, [])

  const handleStartDateChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, startDate: e.target.value }))
  }, [])

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (!formData.title.trim() || !formData.duration.trim() || !formData.instructor.trim()) {
        alert("Please fill in all required fields")
        return
      }
      onSubmit(formData)
    },
    [formData, onSubmit],
  )

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className=" rounded-xl bg-white p-10  backdrop-filter backdrop-blur bg-opacity-10 backdrop-saturate-100">
        <div className="flex justify-between items-center mb-6 ">
          <h2 className="text-xl font-semibold text-white"


            style={{
              fontFamily: FONTS.header.fontFamily,
              fontSize: FONTS.header.fontSize,
              fontWeight: FONTS.header.fontWeight,
            }}
          >

            Create New Program</h2>
          <button onClick={onClose} className="text-white transition-colors"
            style={{
              fontFamily: FONTS.paragraph.fontFamily,

              fontWeight: FONTS.paragraph.fontWeight,
            }}
          >
            <X className="w-5 h-5 ml-8 text-white" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="bd-white block text-sm font-medium text-white mb-1"
              style={{
                fontFamily: FONTS.paragraph.fontFamily,
                fontSize: FONTS.paragraph.fontSize,
                fontWeight: FONTS.paragraph.fontWeight,
              }}
            >
              Program Title *
            </label>

            <input
              id="title"
              type="text"
              value={formData.title}
              onChange={handleTitleChange}
              placeholder="Enter program title"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4c469f] focus:border-transparent"
              required
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-white mb-1"
              style={{
                fontFamily: FONTS.paragraph.fontFamily,
                fontSize: FONTS.paragraph.fontSize,
                fontWeight: FONTS.paragraph.fontWeight,
              }}
            >
              Category
            </label>

            <select
              id="category"
              value={formData.category}
              onChange={handleCategoryChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4c469f] focus:border-transparent"
              style={{
                fontFamily: FONTS.paragraph.fontFamily,

                fontWeight: FONTS.paragraph.fontWeight,
              }}

            >
              {categories
                .filter((cat) => cat !== "all")
                .map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="duration"
              className="block text-sm font-medium text-white mb-1"
              style={{
                fontFamily: FONTS.paragraph.fontFamily,
                fontSize: FONTS.paragraph.fontSize,
                fontWeight: FONTS.paragraph.fontWeight,
              }}
            >
              Duration *
            </label>

            <input
              id="duration"
              type="text"
              value={formData.duration}
              onChange={handleDurationChange}
              placeholder="e.g., 4 weeks, 2 months"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4c469f] focus:border-transparent"
              style={{
                fontFamily: FONTS.paragraph.fontFamily,

                fontWeight: FONTS.paragraph.fontWeight,
              }}
              required
            />
          </div>

          <div>
            <label
              htmlFor="instructor"
              className="block text-sm font-medium text-white mb-1"
              style={{
                fontFamily: FONTS.paragraph.fontFamily,
                fontSize: FONTS.paragraph.fontSize,
                fontWeight: FONTS.paragraph.fontWeight,
              }}
            >
              Instructor *
            </label>

            <input
              id="instructor"
              type="text"
              value={formData.instructor}
              onChange={handleInstructorChange}
              placeholder="Enter instructor name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4c469f] focus:border-transparent"
              style={{
                fontFamily: FONTS.paragraph.fontFamily,

                fontWeight: FONTS.paragraph.fontWeight,
              }}

              required
            />
          </div>

          <div>
            <label
              htmlFor="startDate"
              className="block text-sm font-medium text-white mb-1"
              style={{
                fontFamily: FONTS.paragraph.fontFamily,
                fontSize: FONTS.paragraph.fontSize,
                fontWeight: FONTS.paragraph.fontWeight,
              }}
            >
              Start Date
            </label>

            <input
              id="startDate"
              type="date"
              value={formData.startDate}
              onChange={handleStartDateChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4c469f] focus:border-transparent"
              style={{
                fontFamily: FONTS.paragraph.fontFamily,

                fontWeight: FONTS.paragraph.fontWeight,
              }}

            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 md:px-6 md:py-2.5 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors"
              style={{
                fontFamily: FONTS.paragraph.fontFamily,
                fontWeight: FONTS.paragraph.fontWeight,
              }}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 px-4 py-2 md:px-6 md:py-2.5 bg-[#4c469f] text-white rounded-lg transition-colors hover:bg-[#3b3880]"
              style={{
                fontFamily: FONTS.paragraph.fontFamily,
                fontWeight: FONTS.paragraph.fontWeight,
              }}
            >
              Create Program
            </button>

          </div>
        </form>
      </div>
    </div>
  )
})

// Add display name for debugging
NewProgramForm.displayName = "NewProgramForm"

const HRMTrainingDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("overview")
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedProgram, setSelectedProgram] = useState<TrainingProgram | null>(null)
  const [showNewProgramForm, setShowNewProgramForm] = useState<boolean>(false)

  // Mock data
  const [stats, setStats] = useState<DashboardStats>({
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

  const categories = ["all", "Leadership", "Technical", "Marketing", "Soft Skills", "Compliance"]

  // Memoized callbacks to prevent unnecessary re-renders
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }, [])

  const handleCategoryChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value)
  }, [])

  const handleShowNewProgramForm = useCallback(() => {
    setShowNewProgramForm(true)
  }, [])

  const handleCloseNewProgramForm = useCallback(() => {
    setShowNewProgramForm(false)
  }, [])

  const handleCreateProgram = useCallback(
    (formData: NewProgramFormData) => {
      const newProgram: TrainingProgram = {
        id: (trainingPrograms.length + 1).toString(),
        title: formData.title.trim(),
        category: formData.category,
        duration: formData.duration.trim(),
        enrolled: 0,
        completed: 0,
        rating: 0,
        status: "draft",
        startDate: formData.startDate,
        instructor: formData.instructor.trim(),
      }

      setTrainingPrograms((prev) => [...prev, newProgram])
      setStats((prev) => ({
        ...prev,
        activePrograms: prev.activePrograms + 1,
      }))

      handleCloseNewProgramForm()
    },
    [trainingPrograms.length, handleCloseNewProgramForm],
  )

  const handleProgramClick = useCallback((program: TrainingProgram) => {
    setSelectedProgram(program)
    setActiveTab("employees")
  }, [])

  const handleBackToPrograms = useCallback(() => {
    setSelectedProgram(null)
    setActiveTab("programs")
  }, [])

  // Memoized filtered programs to prevent recalculation on every render
  const filteredPrograms = useMemo(() => {
    return trainingPrograms.filter((program) => {
      const matchesSearch =
        program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        program.instructor.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "all" || program.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [trainingPrograms, searchTerm, selectedCategory])

  // Filter employees based on selected program
  const getEmployeesForProgram = useCallback(
    (programId: string) => {
      return employees.filter((employee) => employee.enrolledPrograms.includes(programId))
    },
    [employees],
  )

  const displayedEmployees = useMemo(() => {
    return selectedProgram ? getEmployeesForProgram(selectedProgram.id) : employees
  }, [selectedProgram, getEmployeesForProgram, employees])

  // Calculate progress metrics
  const progressMetrics = useMemo(() => {
    if (!selectedProgram) return null

    const programEmployees = getEmployeesForProgram(selectedProgram.id)
    const totalProgress = programEmployees.reduce((sum, emp) => sum + (emp.programProgress[selectedProgram.id] || 0), 0)
    const averageProgress = programEmployees.length > 0 ? totalProgress / programEmployees.length : 0
    const completedCount = programEmployees.filter((emp) => emp.programProgress[selectedProgram.id] === 100).length
    const inProgressCount = programEmployees.filter(
      (emp) => emp.programProgress[selectedProgram.id] > 0 && emp.programProgress[selectedProgram.id] < 100,
    ).length
    const notStartedCount = programEmployees.filter((emp) => !emp.programProgress[selectedProgram.id]).length

    return {
      averageProgress: Math.round(averageProgress),
      completedCount,
      inProgressCount,
      notStartedCount,
      totalParticipants: programEmployees.length,
    }
  }, [selectedProgram, getEmployeesForProgram])

  const StatCard: React.FC<{
    title: string
    value: string | number
    icon: React.ReactNode
    trend?: string
    color: string
  }> = ({ title, value, icon, trend, color }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 px-4 py-2 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>

          <p
            className="text-sm "
            style={{
              fontFamily: FONTS.paragraph.fontFamily,
              fontSize: FONTS.paragraph.fontSize,
              fontWeight: FONTS.paragraph.fontWeight,
            }}
          >
            {title}
          </p>

          <p className=" font-bold  mt-1"
            style={{
              fontFamily: FONTS.header.fontFamily,
              fontSize: FONTS.header.fontSize,
              fontWeight: FONTS.header.fontWeight,
            }}

          >{value}
          </p>

          {trend && (
            <p
              className={`text-sm mt-1 ${color}`}
              style={{
                fontFamily: FONTS.paragraph.fontFamily,
                fontSize: FONTS.paragraph.fontSize,
                fontWeight: FONTS.paragraph.fontWeight,
              }}
            >
              {trend}
            </p>
          )}

        </div>
        <div className={`p-3 rounded-lg ${color.replace("text-", "bg-").replace("-600", "-100")}`}>{icon}</div>
      </div>
    </div>
  )

  const ProgressCard: React.FC<{
    title: string
    value: string | number
    icon: React.ReactNode
    color: string
    description?: string
  }> = ({ title, value, icon, color, description }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {description && <p className="text-sm mt-1 text-gray-500">{description}</p>}
        </div>
        <div className={`p-3 rounded-lg ${color.replace("text-", "bg-").replace("-600", "-100")}`}>{icon}</div>
      </div>
    </div>
  )

  // const ParticipantCard: React.FC<{ employee: Employee }> = ({ employee }) => {
  //   const progress = selectedProgram ? employee.programProgress[selectedProgram.id] || 0 : employee.trainingProgress
  //   const enrollmentDate = selectedProgram ? employee.enrollmentDate[selectedProgram.id] : null

  //   return (
  //     <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
  //       <div className="flex items-center justify-between">
  //         <div className="flex-1">
  //           <div className="flex items-center space-x-3 mb-2">
  //             <div className="w-8 h-8 bg-[#4c469f] rounded-full flex items-center justify-center text-white text-xs font-medium">
  //               {employee.avatar}
  //             </div>
  //             <div>
  //               <p className="text-sm font-medium text-gray-900">{employee.name}</p>
  //               <p className="text-xs text-gray-600">{employee.position}</p>
  //             </div>
  //           </div>
  //           <div className="space-y-1">
  //             <div className="flex justify-between items-center">
  //               <span className="text-xs text-gray-600">Progress</span>
  //               <span className="text-sm font-bold text-gray-900">{progress}%</span>
  //             </div>
  //             <div className="w-full bg-gray-200 rounded-full h-2">
  //               <div
  //                 className={`h-2 rounded-full transition-all duration-300 ${progress === 100 ? "bg-green-600" : progress > 50 ? "bg-blue-600" : "bg-yellow-600"
  //                   }`}
  //                 style={{ width: `${progress}%` }}
  //               ></div>
  //             </div>
  //             {enrollmentDate && (
  //               <p className="text-xs text-gray-500 mt-1">Enrolled: {new Date(enrollmentDate).toLocaleDateString()}</p>
  //             )}
  //           </div>
  //         </div>
  //         <div className="ml-4">
  //           <span
  //             className={`px-3 py-1 rounded-full text-xs font-medium ${progress === 100
  //                 ? "bg-green-100 text-green-800"
  //                 : progress > 50
  //                   ? "bg-blue-100 text-blue-800"
  //                   : progress > 0
  //                     ? "bg-yellow-100 text-yellow-800"
  //                     : "bg-gray-100 text-gray-800"
  //               }`}
  //           >
  //             {progress === 100 ? "Completed" : progress > 0 ? "In Progress" : "Not Started"}
  //           </span>
  //         </div>
  //       </div>
  //     </div>
  //   )
  // }

  const ProgramCard: React.FC<{ program: TrainingProgram }> = ({ program }) => (
    <div
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow cursor-pointer hover:border-blue-300"
      onClick={() => handleProgramClick(program)}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{program.title}</h3>
          <p className="text-sm text-gray-600">
            {program.category} • {program.duration}
          </p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${program.status === "active"
              ? "bg-green-100 text-green-800"
              : program.status === "draft"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-gray-100 text-gray-800"
            }`}
        >
          {program.status}
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Participants</span>
          <span className="text-sm font-medium text-[#4c469f]">{program.enrolled} enrolled</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Progress</span>
          <span className="text-sm font-medium">
            {program.completed}/{program.enrolled} completed
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-[#4c469f] h-2 rounded-full transition-all duration-300"
            style={{ width: `${program.enrolled > 0 ? (program.completed / program.enrolled) * 100 : 0}%` }}
          ></div>
        </div>

        <div className="flex justify-between items-center pt-2">
          <div className="flex items-center space-x-1">
            <Award className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-medium">{program.rating}</span>
          </div>
          <p className="text-sm text-gray-600">by {program.instructor}</p>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-gray-100">
        <p className="text-xs text-blue-600 font-medium">Click to view participants →</p>
      </div>
    </div>
  )

  const EmployeeRow: React.FC<{ employee: Employee }> = ({ employee }) => {
    const programProgress = selectedProgram
      ? employee.programProgress[selectedProgram.id] || 0
      : employee.trainingProgress

    const enrollmentDate = selectedProgram ? employee.enrollmentDate[selectedProgram.id] : null

    return (
      <tr className=" bg-white transition-colors text-gray-900">
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 ">{employee.id}</td>
        <td className="px-4 py-4 whitespace-nowrap">
          <div className="flex items-center ">
            <div className="w-8 h-8 bg-[#4c469f] rounded-full flex items-center justify-center text-white text-sm font-medium">
              {employee.avatar}
            </div>
            <div className="ml-3">
              <p className="text-xm font-medium text-gray-900 ">{employee.name}</p>
              <p className="text-xm text-gray-900">{employee.position}</p>
            </div>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.department}</td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <div className="w-full bg-gray-200 rounded-full h-2 mr-3">
              <div
                className={`h-2 rounded-full ${programProgress === 100 ? "bg-green-600" : "bg-blue-600"}`}
                style={{ width: `${programProgress}%` }}
              ></div>
            </div>
            <span className="text-lg text-gray-900">{programProgress}%</span>
          </div>
        </td>
        {selectedProgram && (
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            {enrollmentDate ? new Date(enrollmentDate).toLocaleDateString() : "N/A"}
          </td>
        )}
        {!selectedProgram && (
          <td className="px-20 py-4 whitespace-nowrap text-lg text-gray-900">{employee.completedCourses}</td>
        )}
        <td className="px-6 py-4 whitespace-nowrap">
          <span
            className={`px-2 py-1 rounded-full text-lg font-medium ${programProgress === 100
                ? "bg-green-100 text-green-800"
              : employee.status === "active"
                  ? //"bg-blue-100 text-blue-800"
                  'bg-blue-400 text-white'
                  : employee.status === "pending"
                    ? "bg-yellow-500 text-white"
                  : employee.status === "overdue"
                    ? "bg-red-800 text-white"
                    : ""
              }`}
          >
            {programProgress === 100 ? "Completed" : employee.status}
          </span>
        </td>
      </tr>
    )
  }

  return (
    <div className="min-h-screen ">
      {/* Header */}
      <header className="   border-gray-200">
        <div className="max-w-full px-3">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className=" font-bold text-white" style={{ fontFamily: FONTS.header.fontFamily, fontSize: FONTS.header.fontSize, fontWeight: FONTS.header.fontWeight }}>Training</h1>
              {/* {selectedProgram && (
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <span>→</span>
                  <span className="font-medium">{selectedProgram.title}</span>
                </div>
              )} */}
            </div>
            <div className="flex items-center space-x-4"></div>
          </div>
        </div>
      </header>

      {/* navigation */}


      <nav className="shadow-sm">
        <div className="max-w-full px-3 py-3">
          <div
            className="flex space-x-4"
            style={{
              fontFamily: FONTS.paragraph.fontFamily,
              fontSize: FONTS.paragraph.fontSize,
            }}
          >
            {[
              { id: "overview", label: "Overview", icon: BarChart3 },
              { id: "programs", label: "Programs", icon: BookOpen },
              { id: "employees", label: "Employees", icon: Users },
              { id: "analytics", label: "Analytics", icon: PieChart },
            ].map((tab) => (
                  <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors font-medium 
                ${activeTab === tab.id
                  ? "bg-[#4c469f] text-white"
                  : "bg-[#dedcf5] text-black"
                }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
            ))}
          </div>
        </div>
      </nav>




      {/* Main Content */}
      <main className="max-w-full py-8">
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-6 ">

              <StatCard
                title="Total Employees"
                value={stats.totalEmployees.toLocaleString()}
                icon={<Users className="w-6 h-6 text-blue-600" />}
                trend="+12% from last month"
                color="text-green-600"
              />
              <StatCard
                title="Active Programs"
                value={stats.activePrograms}
                icon={<BookOpen className="w-6 h-6 text-green-600" />}
                trend="+3 new this week"
                color="text-green-600"
              />
              <StatCard
                title="Completion Rate"
                value={`${stats.completionRate}%`}
                icon={<TrendingUp className="w-6 h-6 text-purple-600" />}
                trend="+5.2% improvement"
                color="text-green-600"
              />
              <StatCard
                title="Average Rating"
                value={stats.averageRating}
                icon={<Award className="w-6 h-6 text-yellow-600" />}
                trend="Excellent feedback"
                color="text-green-600"
              />
            </div>

            {/* Recent Activity */}
            <div className="bg-black  rounded-xl shadow-sm border border-gray-100 p-6 backdrop-filter   bg-opacity-10 backdrop-saturate-190 backdrop-contrast-50 ">
              <h2
                className="text-lg lg:text-xl font-semibold text-white mb-4"
                style={{
                  fontFamily: FONTS.header.fontFamily,
                  fontSize: FONTS.header.fontSize,
                  fontWeight: FONTS.header.fontWeight,
                }}
              >
                Recent Activity
              </h2>

              <div className="space-y-3 md:space-y-4 lg:space-y-5  text-black"
                style={{
                  fontFamily: FONTS.paragraph.fontFamily,

                  fontWeight: FONTS.paragraph.fontWeight,
                }}
              >

                {[
                  {
                    action: "New employee enrolled",
                    program: "Leadership Development Program",
                    time: "2 hours ago",
                    icon: CheckCircle,
                    color: "text-green-600",
                  },
                  {
                    action: "Training completed",
                    program: "Digital Marketing Fundamentals",
                    time: "4 hours ago",
                    icon: Award,
                    color: "text-blue-600",
                  },
                  {
                    action: "Deadline approaching",
                    program: "Data Analytics with Python",
                    time: "1 day ago",
                    icon: AlertCircle,
                    color: "text-yellow-600",
                  },
                  {
                    action: "New program created",
                    program: "Customer Service Excellence",
                    time: "2 days ago",
                    icon: Plus,
                    color: "text-purple-600",
                  },
                ].map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 rounded-lg  hover:bg-[#ededf5] transition-colors
                    bg-white hover:scale-101"
                  >
                    <activity.icon className={`w-5 h-5 ${activity.color}`} />
                    <div className="flex-1">
                      <p className="text-xl font-medium text-gray-900 ">{activity.action}</p>
                      <p className="text-sm text-gray-600">{activity.program}</p>
                    </div>
                    <span className="text-sm text-gray-500">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "programs" && (
          <div className="space-y-6"
            style={{
              fontFamily: FONTS.paragraph.fontFamily,


            }}
          >
            {/* Search and Filter */}
            <div className="flex flex-row sm:flex-row md:flex-row gap-4 ">
              <div className="flex-1 relative ">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2  w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search programs..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-100 md:w-96 pl-10 pr-4 py-2  rounded-lg 
                  focus:outline-none focus:ring-2 focus:ring-[#4c469f] focus:border-transparent bg-gray-100 placeholder:text-gray-500 "
                />
              </div>
              <div className="flex items-center space-x-2"
                style={{
                  fontFamily: FONTS.paragraph.fontFamily,

                  fontWeight: FONTS.paragraph.fontWeight,
                }}
              >
                {/* BOTH FILTER SYMBOL AND ALL CATEGORY */}
                <div className="flex items-center gap-2">
                  <Filter className="w-[20%] h-8 text-black   " />

                  <select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    className="w-full md:w-60  rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4c469] focus:border-transparent"
                    style={{
                      fontFamily: FONTS.paragraph.fontFamily,
                      fontWeight: FONTS.paragraph.fontWeight,
                    }}
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category === "all" ? "All Categories" : category}
                      </option>
                    ))}
                  </select>
                </div>

              </div>
              {/* NEW PROGRAM BUTTON */}
              <button
                onClick={handleShowNewProgramForm}
                className="flex items-center space-x-2 bg-[#4c469f] text-white px-4 md:px-6 py-2 md:py-2.5 rounded-lg transition-colors"
               
                style={{
                  fontFamily: FONTS.paragraph.fontFamily,
                  fontWeight: FONTS.paragraph.fontWeight,
                }}
              >
                <Plus className="w-4 h-4" />
                <span className="text-sm md:text-base">New Program</span>
              </button>

            </div>

            {/* Programs Grid */}
            <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-6"
              style={{
                fontFamily: FONTS.paragraph.fontFamily,

                fontWeight: FONTS.paragraph.fontWeight,
              }}
            >
              {filteredPrograms.map((program) => (
                <ProgramCard key={program.id} program={program} />
              ))}
            </div>
          </div>
        )}

        {activeTab === "employees" && (
          <div className="space-y-6">
            {selectedProgram && (
              <>
                {/* Program Header */}
                <div className=" rounded-xl shadow-sm  border-gray-100 p-6"
                  style={{
                    fontFamily: FONTS.paragraph.fontFamily,

                    fontWeight: FONTS.paragraph.fontWeight,
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={handleBackToPrograms}
                        className=" flex items-center space-x-2 text-white transition-colors"
                        style={{
                          fontFamily: FONTS.paragraph.fontFamily,

                          fontWeight: FONTS.paragraph.fontWeight,
                        }}

                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to Programs</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 md:grid-cols-4 gap-4"
                    style={{
                      fontFamily: FONTS.paragraph.fontFamily,

                      fontWeight: FONTS.paragraph.fontWeight,
                    }}
                  >
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <BookOpen className="w-5 h-5 text-blue-600" />
                        <h3 className="font-semibold text-gray-900">{selectedProgram.title}</h3>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{selectedProgram.category}</p>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Users className="w-5 h-5 text-green-600" />
                        <span className="font-semibold text-gray-900">
                          {getEmployeesForProgram(selectedProgram.id).length}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600"
                        style={{
                          fontFamily: FONTS.paragraph.fontFamily,

                          fontWeight: FONTS.paragraph.fontWeight,
                        }}
                      >Enrolled Participants</p>
                    </div>

                    <div className="bg-purple-50 p-4 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-5 h-5 text-purple-600" />
                        <span className="font-semibold text-gray-900">{selectedProgram.duration}</span>
                      </div>
                      <p className="text-sm text-gray-600"
                        style={{
                          fontFamily: FONTS.paragraph.fontFamily,

                          fontWeight: FONTS.paragraph.fontWeight,
                        }}
                      >Duration</p>
                    </div>

                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-5 h-5 text-yellow-600" />
                        <span className="font-semibold text-gray-900">
                          {new Date(selectedProgram.startDate).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600"
                        style={{
                          fontFamily: FONTS.paragraph.fontFamily,

                          fontWeight: FONTS.paragraph.fontWeight,
                        }}
                      >Start Date</p>
                    </div>
                  </div>
                </div>



              </>
            )}


            <div className=" rounded-xl shadow-sm  ">
              <div className=" py-4 lg:px-[2%] lg:py-6  rounded-xl">
                <h2
                  className="text-lg lg:text-xl font-bold text-white "
                  style={{
                          fontFamily: FONTS.header2.fontFamily,
                          fontWeight: FONTS.header2.fontWeight,
                          fontSize: FONTS.header2.fontSize

                  }}
                >
                  {selectedProgram
                    ? `Participants in ${selectedProgram.title}`
                    : "Employee Training Progress"}
                </h2>
                {/* {selectedProgram && (
                  <p className="text-sm lg:text-base text-gray-600 mt-1 "
                    style={{
                      fontFamily: FONTS.paragraph.fontFamily,
                      fontWeight: FONTS.paragraph.fontWeight,
            }}
                  >
                    Showing {getEmployeesForProgram(selectedProgram.id).length} enrolled participants
                  </p>
                )} */}
              </div>

              <div className="overflow-x-auto rounded-lg">
                <table className="min-w-full ">
                  <thead className="bg-[#5e59a9]">
                    <tr>
                      {[
                        "Employee ID",
                        "Employee",
                        "Department",
                        selectedProgram ? "Program Progress" : "Overall Progress",
                        selectedProgram ? "Enrollment Date" : "Completed Courses",
                        "Status",
                      ].map((heading, idx) => (
                        <th
                          key={idx}
                          className="px-6 py-3 text-left text-sm  lg:text-sm font-medium text-white
                           tracking-wider "
                          style={{
                            fontFamily: FONTS.paragraph.fontFamily,
                            fontWeight: FONTS.paragraph.fontWeight,
                            fontSize:FONTS.paragraph.fontSize                         }}
                        >
                          {heading}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody
                    className=" divide-y divide-gray-200 text-sm lg:text-base"
                    style={{
                      fontFamily: FONTS.paragraph.fontFamily,
                      fontWeight: FONTS.paragraph.fontWeight,
                      marginBottom : '10px', 
                    }}
                  >
                    {displayedEmployees.map((employee) => (
                      <EmployeeRow key={employee.id} employee={employee} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {activeTab === "analytics" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4"
                  style={{
                    fontFamily: FONTS.paragraph.fontFamily,

                    fontWeight: FONTS.paragraph.fontWeight,
                  }}
                >Training Completion Trends</h3>
                <div className="h-64 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <BarChart3 className="w-12 h-12 mx-auto mb-2 text-gray-300"
                      style={{
                        fontFamily: FONTS.paragraph.fontFamily,

                        fontWeight: FONTS.paragraph.fontWeight,
                      }}
                    />
                    <p
                      style={{
                        fontFamily: FONTS.paragraph.fontFamily,

                        fontWeight: FONTS.paragraph.fontWeight,
                      }}
                    >Chart visualization would be implemented here</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4"
                  style={{
                    fontFamily: FONTS.paragraph.fontFamily,

                    fontWeight: FONTS.paragraph.fontWeight,
                  }}
                >Program Distribution</h3>
                <div className="h-64 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <PieChart className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                    <p
                      style={{
                        fontFamily: FONTS.paragraph.fontFamily,

                        fontWeight: FONTS.paragraph.fontWeight,
                      }}
                    >Pie chart visualization would be implemented here</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Render form only when needed */}
      {showNewProgramForm && (
        <NewProgramForm onClose={handleCloseNewProgramForm} onSubmit={handleCreateProgram} categories={categories} />
      )}
    </div>
  )
}

export default HRMTrainingDashboard
