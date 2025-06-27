import { useState, useCallback, useMemo, useEffect } from "react"
import { FONTS } from "../../../constants/uiConstants"
import Reports from "../Reports/Reports"
import { getAllAppraisals } from "../../../features/Appraisal/service"
import Dashboard from "../../../components/Appraisal/Dashboard"
import AppraisalView from "../../../components/Appraisal/AppraisalView"
import AppraisalModal from "../../../components/Appraisal/AppraisalModel"

interface Employee {
  id: string
  name: string
  position: string
  department: string
  rating: number
  lastAppraisal: string
  nextAppraisal: string
  status: "pending" | "in-progress" | "completed"
}

interface AppraisalCriteria {
  id: string
  category: string
  description: string
  weight: number
  rating: number
  comments: string
}

type TabType = "dashboard" | "appraisal" | "reports";

const HRMAppraisalSystem = () => {
  const [activeTab, setActiveTab] = useState<TabType>("dashboard")
  const [selectedEmployee, setSelectedEmployee] = useState<any | null>(null)
  const [showAppraisalModal, setShowAppraisalModal] = useState(false)
  const [modalMode, setModalMode] = useState<"select" | "view" | "create">("select")
  const [modalEmployee, setModalEmployee] = useState<Employee | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [newAppraisalData, setNewAppraisalData] = useState<{
    employeeId: string
    criteria: AppraisalCriteria[]
  }>({
    employeeId: "",
    criteria: [
      {
        id: "1",
        category: "Technical Skills",
        description: "Proficiency in required technologies and tools",
        weight: 25,
        rating: 0,
        comments: "",
      },
      {
        id: "2",
        category: "Communication",
        description: "Verbal and written communication effectiveness",
        weight: 20,
        rating: 0,
        comments: "",
      },
      {
        id: "3",
        category: "Teamwork",
        description: "Collaboration and team contribution",
        weight: 20,
        rating: 0,
        comments: "",
      },
      {
        id: "4",
        category: "Problem Solving",
        description: "Analytical thinking and solution-oriented approach",
        weight: 20,
        rating: 0,
        comments: "",
      },
      {
        id: "5",
        category: "Initiative",
        description: "Proactive approach and self-motivation",
        weight: 15,
        rating: 0,
        comments: "",
      },
    ],
  })
  const [appraisals, setAppraisals] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchAppraisals = async () => {
      setLoading(true)
      try {
        const response: any = await getAllAppraisals()
        const dataArray = Array.isArray(response.data?.data) ? response.data.data : []
        console.log("appraisal arrayed data", dataArray)
        const mapped = dataArray.map((item: any) => ({
          _id: item._id,
          Employee: item.Employee || item.name || "",
          Position: item.Position || item.position || "",
          Rating: item.Rating || item.rating || 0,
          Status: item.Status || item.status || "pending",
          department: item.department || "",
          ProjectPeriod: item.ProjectPeriod || "",
        }))
        setAppraisals(mapped)
      } catch (error) {
        console.error("Error fetching appraisals:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchAppraisals()
  }, [])

  // Static employee data for modal
  const employees = useMemo<Employee[]>(
    () => [
      {
        id: "1",
        name: "Siva Shankar",
        position: "Senior Developer",
        department: "Engineering",
        rating: 4.5,
        lastAppraisal: "2024-01-15",
        nextAppraisal: "2024-07-15",
        status: "completed",
      },
      {
        id: "2",
        name: "Surya",
        position: "Product Manager",
        department: "Product",
        rating: 4.2,
        lastAppraisal: "2024-02-20",
        nextAppraisal: "2024-08-20",
        status: "in-progress",
      },
      {
        id: "3",
        name: "Suruthi",
        position: "UX Designer",
        department: "Design",
        rating: 4.8,
        lastAppraisal: "2024-03-10",
        nextAppraisal: "2024-09-10",
        status: "pending",
      },
    ],
    [],
  )

  // Static appraisal data
  const appraisalDataMap = useMemo(
    () => ({
      "1": [
        {
          id: "1",
          category: "Technical Skills",
          description: "Proficiency in required technologies and tools",
          weight: 25,
          rating: 5,
          comments:
            "Excellent technical skills, always up-to-date with latest technologies. Demonstrates strong problem-solving abilities.",
        },
        {
          id: "2",
          category: "Communication",
          description: "Verbal and written communication effectiveness",
          weight: 20,
          rating: 4,
          comments: "Good communication skills. Could improve presentation skills for client meetings.",
        },
        {
          id: "3",
          category: "Teamwork",
          description: "Collaboration and team contribution",
          weight: 20,
          rating: 5,
          comments: "Outstanding team player. Mentors junior developers and contributes positively to team dynamics.",
        },
        {
          id: "4",
          category: "Problem Solving",
          description: "Analytical thinking and solution-oriented approach",
          weight: 20,
          rating: 4,
          comments: "Strong analytical skills. Consistently finds efficient solutions to complex problems.",
        },
        {
          id: "5",
          category: "Initiative",
          description: "Proactive approach and self-motivation",
          weight: 15,
          rating: 4,
          comments:
            "Shows good initiative in taking on challenging projects. Could be more proactive in suggesting process improvements.",
        },
      ],
    }),
    [],
  )

  const getAppraisalData = useCallback(
    (employeeId: string): AppraisalCriteria[] => {
      return appraisalDataMap[employeeId as keyof typeof appraisalDataMap] || []
    },
    [appraisalDataMap],
  )

  const calculateOverallRating = useCallback((criteria: AppraisalCriteria[]) => {
    const totalWeightedScore = criteria.reduce((sum, criterion) => sum + (criterion.rating * criterion.weight) / 100, 0)
    return totalWeightedScore
  }, [])

  const getStatusColor = useCallback((status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in-progress":
        return "bg-yellow-100 text-yellow-800"
      case "pending":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }, [])

  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value)
  }, [])

  const handleViewEmployee = useCallback((employee: any) => {
    setSelectedEmployee(employee)
    setActiveTab("appraisal")
  }, [])

  const handleNewAppraisal = useCallback(() => {
    setShowAppraisalModal(true)
    setModalMode("create")
  }, [])

  const handleCloseModal = useCallback(() => {
    setShowAppraisalModal(false)
    setModalEmployee(null)
    setModalMode("select")
  }, [])

  const handleSelectEmployee = useCallback((employee: Employee) => {
    setModalEmployee(employee)
    setModalMode("view")
  }, [])

  const handleBackToSelect = useCallback(() => {
    setModalEmployee(null)
    setModalMode("select")
  }, [])

  const handleCreateMode = useCallback(() => {
    setModalMode("create")
  }, [])

  const handleEmployeeChange = useCallback((employeeId: string) => {
    setNewAppraisalData((prev) => ({
      ...prev,
      employeeId,
    }))
  }, [])

  const handleCriteriaChange = useCallback((id: string, field: string, value: any) => {
    setNewAppraisalData((prev) => ({
      ...prev,
      criteria: prev.criteria.map((criterion) => (criterion.id === id ? { ...criterion, [field]: value } : criterion)),
    }))
  }, [])

  const handleRatingChange = useCallback(
    (criterionId: string) => {
      return (rating: number) => {
        handleCriteriaChange(criterionId, "rating", rating)
      }
    },
    [handleCriteriaChange],
  )

  const handleCommentsChange = useCallback(
    (criterionId: string) => {
      return (value: string) => {
        handleCriteriaChange(criterionId, "comments", value)
      }
    },
    [handleCriteriaChange],
  )

  const handleSubmitNewAppraisal = useCallback(() => {
    console.log("Submitting new appraisal:", {
      employeeId: newAppraisalData.employeeId,
      criteria: newAppraisalData.criteria,
      overallRating: calculateOverallRating(newAppraisalData.criteria),
    })

    alert("Appraisal submitted successfully!")

    setNewAppraisalData({
      employeeId: "",
      criteria: [
        {
          id: "1",
          category: "Technical Skills",
          description: "Proficiency in required technologies and tools",
          weight: 25,
          rating: 0,
          comments: "",
        },
        {
          id: "2",
          category: "Communication",
          description: "Verbal and written communication effectiveness",
          weight: 20,
          rating: 0,
          comments: "",
        },
        {
          id: "3",
          category: "Teamwork",
          description: "Collaboration and team contribution",
          weight: 20,
          rating: 0,
          comments: "",
        },
        {
          id: "4",
          category: "Problem Solving",
          description: "Analytical thinking and solution-oriented approach",
          weight: 20,
          rating: 0,
          comments: "",
        },
        {
          id: "5",
          category: "Initiative",
          description: "Proactive approach and self-motivation",
          weight: 15,
          rating: 0,
          comments: "",
        },
      ],
    })
    setShowAppraisalModal(false)
    setModalMode("select")
  }, [newAppraisalData, calculateOverallRating])

  const modalAppraisalData = modalEmployee ? getAppraisalData(modalEmployee.id) : []
  const modalOverallRating = modalEmployee ? calculateOverallRating(modalAppraisalData) : 0
  const newAppraisalOverallRating = calculateOverallRating(newAppraisalData.criteria)
  const selectedEmployeeAppraisalData = selectedEmployee ? getAppraisalData("1") : []
  const selectedEmployeeOverallRating = selectedEmployee ? calculateOverallRating(selectedEmployeeAppraisalData) : 0

  return (
    <div className="">
      {/* Header */}
      <header className="border-gray-200">
        <div className="max-w-full px-2">
          <div className="">
            <div className="flex justify-between items-center gap-3">
              {activeTab !== "reports" && (
                <h1 className="!text-black" style={{...FONTS.header}}>
                  Appraisal
                </h1>
              )}
              {activeTab !== "reports" && (
                <button
                  className="!text-white bg-[#006666] px-3 py-1 rounded-md"style={{...FONTS.paragraph}}
                  onClick={() => setActiveTab("reports")}
                >
                  Reports
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-full py-8">
        {activeTab === "dashboard" && (
          <Dashboard
            appraisals={appraisals}
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            onViewEmployee={handleViewEmployee}
            onNewAppraisal={handleNewAppraisal}
            getStatusColor={getStatusColor}
          />
        )}
        {activeTab === "appraisal" && (
          <AppraisalView
            selectedEmployee={selectedEmployee}
            appraisalCriteria={selectedEmployeeAppraisalData}
            overallRating={selectedEmployeeOverallRating}
            onBack={() => setActiveTab("dashboard")}
            getStatusColor={getStatusColor}
          />
        )}
        {activeTab === "reports" && <Reports setActiveTab={setActiveTab} />}
      </main>

      {/* Appraisal Modal */}
      <AppraisalModal
        showModal={showAppraisalModal}
        modalMode={modalMode}
        modalEmployee={modalEmployee}
        employees={employees}
        newAppraisalData={newAppraisalData}
        modalAppraisalData={modalAppraisalData}
        modalOverallRating={modalOverallRating}
        newAppraisalOverallRating={newAppraisalOverallRating}
        onClose={handleCloseModal}
        onSelectEmployee={handleSelectEmployee}
        onBackToSelect={handleBackToSelect}
        onCreateMode={handleCreateMode}
        onEmployeeChange={handleEmployeeChange}
        onRatingChange={handleRatingChange}
        onCommentsChange={handleCommentsChange}
        onSubmit={handleSubmitNewAppraisal}
        getStatusColor={getStatusColor}
      />
    </div>
  )
}

export default HRMAppraisalSystem

