import type React from "react"
import { useState, useCallback, useMemo } from "react"
import type { TrainingProgram, NewProgramFormData } from "../../components/TraningManagement/Traning"
import { useTrainingData } from "../../components/TraningManagement/TraningData"
import { SearchFilterBar } from "../../components/TraningManagement/SearchFilter"
import { ProgramCard } from "../../components/TraningManagement/ProgramCard"
import { ProgramHeader } from "../../components/TraningManagement/ProgramHeader"
import { EmployeeTable } from "../../components/TraningManagement/EmployeeTable"
import { NewProgramForm } from "../../components/TraningManagement/Form"
import { FONTS } from "../../constants/uiConstants"

const TrainingDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("programs")
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedProgram, setSelectedProgram] = useState<TrainingProgram | null>(null)
  const [showNewProgramForm, setShowNewProgramForm] = useState<boolean>(false)

  const { stats, trainingPrograms, setTrainingPrograms, employees } = useTrainingData()
  const categories = ["all", "Leadership", "Technical", "Marketing", "Soft Skills", "Compliance"]

  // Event handlers
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
      handleCloseNewProgramForm()
    },
    [trainingPrograms.length, handleCloseNewProgramForm, setTrainingPrograms],
  )

  const handleProgramClick = useCallback((program: TrainingProgram) => {
    setSelectedProgram(program)
    setActiveTab("employees")
  }, [])

  const handleBackToPrograms = useCallback(() => {
    setSelectedProgram(null)
    setActiveTab("programs")
  }, [])

  // Computed values
  const filteredPrograms = useMemo(() => {
    return trainingPrograms.filter((program) => {
      const matchesSearch =
        program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        program.instructor.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "all" || program.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [trainingPrograms, searchTerm, selectedCategory])

  const getEmployeesForProgram = useCallback(
    (programId: string) => {
      return employees.filter((employee) => employee.enrolledPrograms.includes(programId))
    },
    [employees],
  )

  const displayedEmployees = useMemo(() => {
    return selectedProgram ? getEmployeesForProgram(selectedProgram.id) : employees
  }, [selectedProgram, getEmployeesForProgram, employees])

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-gray-200">
        <div className="max-w-full px-3">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1
                className="font-bold !text-black"
                style={{...FONTS.header}}
              >
                Training Management
              </h1>
              {selectedProgram && (
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <span>→</span>
                  <span className="font-medium">{selectedProgram.title}</span>
                </div>
              )} 
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-full py-8">
        {activeTab === "programs" && (
          <div className="space-y-8">
            <SearchFilterBar
              searchTerm={searchTerm}
              selectedCategory={selectedCategory}
              categories={categories}
              onSearchChange={handleSearchChange}
              onCategoryChange={handleCategoryChange}
              onNewProgram={handleShowNewProgramForm}
            />

            <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-6" style={FONTS.paragraph}>
              {filteredPrograms.map((program) => (
                <ProgramCard key={program.id} program={program} onClick={handleProgramClick} />
              ))}
            </div>
          </div>
        )}

        {activeTab === "employees" && (
          <div className="space-y-6">
            {selectedProgram && (
              <ProgramHeader
                program={selectedProgram}
                participantCount={getEmployeesForProgram(selectedProgram.id).length}
                onBack={handleBackToPrograms}
              />
            )}

            <EmployeeTable employees={displayedEmployees} selectedProgram={selectedProgram} />
          </div>
        )}
      </main>

      {showNewProgramForm && (
        <NewProgramForm onClose={handleCloseNewProgramForm} onSubmit={handleCreateProgram} categories={categories} />
      )}
    </div>
  )
}

export default TrainingDashboard

