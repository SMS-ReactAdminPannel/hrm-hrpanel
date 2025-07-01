import { useState, useCallback, useMemo, useEffect } from "react"
import { FONTS } from "../../../constants/uiConstants"
import Reports from "../Reports/Reports"
import { getAllAppraisals } from "../../../features/Appraisal/service"
import Dashboard from "../../../components/Appraisal/Dashboard"
import AppraisalView from "../../../components/Appraisal/AppraisalView"
import AppraisalModal from "../../../components/Appraisal/AppraisalModel"
// import SearchInput from "../../../components/Appraisal/SearchInput"
import { Search, Plus,ChevronDown,ChevronUp  } from "lucide-react"
import { getAllDepartments } from "../../../features/Department/service"
import { useNavigate } from "react-router-dom"

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

interface HRMAppraisalSystem{
   onSearchChange: (value: string) => void
   searchTerm: string,
   
}
type TabType = "dashboard" | "appraisal" | "reports";


   // appraisals,
 const HRMAppraisalSystem = ({
  searchTerm,
  onSearchChange,
  
}: HRMAppraisalSystem) => {
  const [activeTab, setActiveTab] = useState<TabType>("dashboard")
  const [selectedEmployee, setSelectedEmployee] = useState<any | null>(null)
  const [showAppraisalModal, setShowAppraisalModal] = useState(false)
  const [modalMode, setModalMode] = useState<"select" | "view" | "create">("select")
  const [modalEmployee, setModalEmployee] = useState<Employee | null>(null)

  

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
      const raw = response.data?.data;
const dataArray = Array.isArray(raw)
  ? raw
  : Array.isArray(raw?.appraisals)
    ? raw.appraisals
    : [];

console.log("appraisal arrayed data", dataArray);

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
  // department filter
  const [departments, setDepartments] = useState<string[]>([]);
const [selectedDepartment, setSelectedDepartment] = useState("");
const [isDepartmentDropdownOpen, setIsDepartmentDropdownOpen] = useState(false); //button


useEffect(() => {
  const fetchDepartments = async () => {
    try {
      const response = await getAllDepartments();
      console.log("DEPARTMENT RAW DATA:", response.data);
      const deptArray = Array.isArray(response.data) ? response.data : [];
      console.log("DEPT ARRAY LENGTH:", deptArray.length);
      const deptNames = deptArray.map((dept: any, i: number) => {
        const name = dept.name;
        if (!name) console.warn(`❌ Department[${i}] missing 'name':`, dept);
        return name;
      }).filter(Boolean);
      console.log("Mapped Department Names:", deptNames);
      setDepartments(deptNames);
    } catch (err) {
      console.error("Failed to load departments", err);
    }
  };

  fetchDepartments();
}, []);
const filteredAppraisals = useMemo(() => {
  if (!selectedDepartment) return appraisals;
  return appraisals.filter(
    (a) =>
      a.department?.toLowerCase() === selectedDepartment.toLowerCase()
  );
}, [appraisals, selectedDepartment]);
const navigate = useNavigate();
const navigateToNewAppraisal = () => {
  navigate("/appraisals/create");
};


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
    onSearchChange(value)
  }, [onSearchChange])

  const handleViewEmployee = useCallback((employee: any) => {
    setSelectedEmployee(employee)
    setActiveTab("appraisal")
  }, [])

const handleNewAppraisal = () => {
  navigate("/appraisals/create"); 
};

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
//new appraisal

  
  return (
    <>
      <div className="max-w-full mx-auto full h-screen">
      <header className="">
       <div className="border-gray-200 py-2 -mb-5">
  <div className="flex items-center justify-between flex-wrap gap-4">
    {/* Left Side: Title + Controls */}
    <div className="flex items-center lg:gap-10 sm:gap-4 flex-wrap">
      {/* Title */}
      <div>
        <h1 style={FONTS.header}>Appraisal</h1>
      </div>

      {/* Controls */}
      <div className="flex lg:gap-3 sm:gap-2 md:h-8 flex-wrap">
        {/* New Appraisal Button */}
       <button
    onClick={handleNewAppraisal}
  className="text-white px-3 md:px-4 py-1 rounded-lg font-medium text-sm md:text-base transition-colors duration-200"
  style={{ backgroundColor: "#5e59a9", ...FONTS.button }}
  onMouseEnter={(e) =>
    (e.currentTarget.style.backgroundColor = "rgba(94, 89, 169, 0.9)")
  }
  onMouseLeave={(e) =>
    (e.currentTarget.style.backgroundColor = "#5e59a9")
  }
>
  <div className="flex items-center gap-1">
    <Plus className="w-4 h-4" />
    New Appraisal
  </div>
</button>


        {/* Search Input */}
        <div className="flex relative border border-gray-300 rounded-md md:w-80 backdrop-blur-xl bg-white/10">
          <input
            type="text"
            placeholder="Search by employee name"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pr-12 pl-4 py-1 bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-lg text-white placeholder-gray-300"
            style={FONTS.paragraph}
          />
          <Search className="text-gray-300 absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4" />
        </div>

        {/* Department Filter */}
        <div className="relative" style={FONTS.paragraph}>
          <button
            className={`flex items-center px-3 py-2 border rounded-md text-sm md:text-base transition-colors duration-200 h-8 w-42 ${
              isDepartmentDropdownOpen
                ? "bg-[#5e59a9]/10 text-white"
                : "bg-transparent backdrop-blur-xl bg-white/10 text-white border-gray-300"
            }`}
            onClick={() => setIsDepartmentDropdownOpen(!isDepartmentDropdownOpen)}
          >
            {selectedDepartment || "All Departments"}
            {isDepartmentDropdownOpen ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>

          {isDepartmentDropdownOpen && (
            <div
              className="absolute z-20 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg"
              style={FONTS.statusCardDescription}
            >
              <button
                className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                  selectedDepartment === ""
                    ? "bg-[#5e59a9]/10 text-[#5e59a9] font-medium"
                    : "text-gray-700"
                }`}
                onClick={() => {
                  setSelectedDepartment("");
                  setIsDepartmentDropdownOpen(false);
                }}
              >
                All Departments
              </button>
              {departments.map((dept, index) => (
                <button
                  key={index}
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                    selectedDepartment === dept
                      ? "bg-[#5e59a9]/10 text-[#5e59a9] font-medium"
                      : "text-gray-700" 
                  }`}
                  onClick={() => {
                    setSelectedDepartment(dept);
                    setIsDepartmentDropdownOpen(false);
                  }}
                >
                  {dept}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>

    {/* Right Side: Reports Button */}
    {activeTab !== "reports" && (
      <button
        onClick={() => setActiveTab("reports")}
        className="text-white px-3 py-1 rounded-lg font-medium text-sm md:text-base transition-colors duration-200"
        style={{ backgroundColor: "#5e59a9", ...FONTS.button }}
      >
        Reports
      </button>
    )}
  </div>
</div>

      </header>  
      <main className="max-w-full py-8">
        {activeTab === "dashboard" && (
          <Dashboard
            appraisals={filteredAppraisals}
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
      
  
    </>
  )
}

export default HRMAppraisalSystem;

