import type React from "react"
import { useState } from "react"
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
} from "lucide-react"

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
}

interface DashboardStats {
  totalEmployees: number
  activePrograms: number
  completionRate: number
  averageRating: number
}

const HRMTrainingDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("overview")
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

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
    },
  ])

  const categories = ["all", "Leadership", "Technical", "Marketing", "Soft Skills", "Compliance"]

  // Sample program templates for new programs
  const programTemplates = [
    {
      title: "Project Management Essentials",
      category: "Leadership",
      duration: "6 weeks",
      instructor: "John Smith",
    },
    {
      title: "Advanced Excel Training",
      category: "Technical",
      duration: "4 weeks",
      instructor: "Lisa Brown",
    },
    {
      title: "Customer Service Excellence",
      category: "Soft Skills",
      duration: "3 weeks",
      instructor: "Robert Davis",
    },
    {
      title: "Social Media Marketing",
      category: "Marketing",
      duration: "5 weeks",
      instructor: "Emma Wilson",
    },
    {
      title: "Cybersecurity Awareness",
      category: "Technical",
      duration: "2 weeks",
      instructor: "Michael Johnson",
    },
  ]

  const addNewProgram = () => {
    // Get a random template
    const randomTemplate = programTemplates[Math.floor(Math.random() * programTemplates.length)]

    // Generate random participant count
    const randomEnrolled = Math.floor(Math.random() * 100) + 10 // 10-110 participants
    const randomCompleted = Math.floor(Math.random() * randomEnrolled) // Some completed

    const newProgram: TrainingProgram = {
      id: (trainingPrograms.length + 1).toString(),
      title: randomTemplate.title,
      category: randomTemplate.category,
      duration: randomTemplate.duration,
      enrolled: randomEnrolled,
      completed: randomCompleted,
      rating: Math.round((Math.random() * 2 + 3) * 10) / 10, // 3.0-5.0 rating
      status: "draft",
      startDate: new Date().toISOString().split("T")[0],
      instructor: randomTemplate.instructor,
    }

    setTrainingPrograms((prev) => [...prev, newProgram])

    // Update stats
    setStats((prev) => ({
      ...prev,
      activePrograms: prev.activePrograms + 1,
    }))
  }

  const filteredPrograms = trainingPrograms.filter((program) => {
    const matchesSearch =
      program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || program.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const StatCard: React.FC<{
    title: string
    value: string | number
    icon: React.ReactNode
    trend?: string
    color: string
  }> = ({ title, value, icon, trend, color }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {trend && <p className={`text-sm mt-1 ${color}`}>{trend}</p>}
        </div>
        <div className={`p-3 rounded-lg ${color.replace("text-", "bg-").replace("-600", "-100")}`}>{icon}</div>
      </div>
    </div>
  )

  const ProgramCard: React.FC<{ program: TrainingProgram }> = ({ program }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{program.title}</h3>
          <p className="text-sm text-gray-600">
            {program.category} • {program.duration}
          </p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            program.status === "active"
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
          <span className="text-sm font-medium text-[#006666]">{program.enrolled} enrolled</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Progress</span>
          <span className="text-sm font-medium">
            {program.completed}/{program.enrolled} completed
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-[#006666] h-2 rounded-full transition-all duration-300"
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
    </div>
  )

  const EmployeeRow: React.FC<{ employee: Employee }> = ({ employee }) => (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{employee.id}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-[#006666] rounded-full flex items-center justify-center text-white text-sm font-medium">
            {employee.avatar}
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">{employee.name}</p>
            <p className="text-sm text-gray-500">{employee.position}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.department}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="w-full bg-gray-200 rounded-full h-2 mr-3">
            <div className="bg-green-600 h-2 rounded-full" style={{ width: `${employee.trainingProgress}%` }}></div>
          </div>
          <span className="text-sm text-gray-900">{employee.trainingProgress}%</span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.completedCourses}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            employee.status === "active"
              ? "bg-green-100 text-green-800"
              : employee.status === "pending"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
          }`}
        >
          {employee.status}
        </span>
      </td>
    </tr>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">Training Management</h1>
            </div>
            <div className="flex items-center space-x-4"></div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: "overview", label: "Overview", icon: BarChart3 },
              { id: "programs", label: "Programs", icon: BookOpen },
              { id: "employees", label: "Employees", icon: Users },
              { id: "analytics", label: "Analytics", icon: PieChart },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-3 py-4 border-b-2 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-4 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
              <div className="space-y-4">
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
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <activity.icon className={`w-5 h-5 ${activity.color}`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-600">{activity.program}</p>
                    </div>
                    <span className="text-xs text-gray-500">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "programs" && (
          <div className="space-y-6">
            {/* Search and Filter */}
            <div className="flex flex-row sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search programs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-100 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={addNewProgram}
                className="flex items-center space-x-2 bg-[#006666] text-white px-4 py-2 rounded-lg hover:[#006666] transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>New Program</span>
              </button>
            </div>

            {/* Programs Grid */}
            <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPrograms.map((program) => (
                <ProgramCard key={program.id} program={program} />
              ))}
            </div>
          </div>
        )}

        {activeTab === "employees" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Employee Training Progress</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Employee ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Employee
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Department
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Progress
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Completed
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {employees.map((employee) => (
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
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Training Completion Trends</h3>
                <div className="h-64 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <BarChart3 className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                    <p>Chart visualization would be implemented here</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Program Distribution</h3>
                <div className="h-64 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <PieChart className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                    <p>Pie chart visualization would be implemented here</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default HRMTrainingDashboard
