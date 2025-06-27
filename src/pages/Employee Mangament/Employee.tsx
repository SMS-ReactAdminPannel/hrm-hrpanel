import { useState } from "react"
import { Users, Clock, UserX } from "lucide-react"
import type { Employee, Department, WorkModeData,  } from "../../components/Employee/Employee"
import { EmployeeStatsCard } from "../../components/Employee/EmployeeCards"
import { WorkModeStats } from "../../components/Employee/WorkModeStats"
import { SearchFilterBar } from "../../components/Employee/SearchFilter"
import { EmployeeTable } from "../../components/Employee/EmployeeTable"
import { AddEmployeeModal } from "../../components/Employee/EmployeeModel"
import { Pagination } from "../../components/Employee/Pagination"
import {FONTS} from "../../constants/uiConstants"


const EmployeeManagement = () => {
  const initialEmployees: Employee[] = [
    {
      id: "EMP001",
      name: "Sowmiya",
      email: "sowmiya.doe@example.com",
      contactNumber: "7262768293",
      department: "Engineering",
      jobTitle: "Developer",
      hireDate: "2020-05-15",
      employmentType: "Full-time",
    },
    {
      id: "EMP002",
      name: "Suruthi",
      email: "suruthi.smith@example.com",
      contactNumber: "5552345678",
      department: "Marketing",
      jobTitle: "Manager",
      hireDate: "2019-08-22",
      employmentType: "Full-time",
    },
    {
      id: "EMP003",
      name: "Wikki",
      email: "wikki.j@example.com",
      contactNumber: "5553456789",
      department: "HR",
      jobTitle: "Specialist",
      hireDate: "2021-01-10",
      employmentType: "Part-time",
    },
    {
      id: "EMP004",
      name: "Siva Shankar",
      email: "siva.d@example.com",
      contactNumber: "5554567890",
      department: "Finance",
      jobTitle: "Analyst",
      hireDate: "2020-11-05",
      employmentType: "Full-time",
    },
    {
      id: "EMP005",
      name: "Surya",
      email: "surya.b@example.com",
      contactNumber: "5555678901",
      department: "Operations",
      jobTitle: "Manager",
      hireDate: "2018-03-18",
      employmentType: "Full-time",
    },
    {
      id: "EMP006",
      name: "Rajesh",
      email: "rajesh.w@example.com",
      contactNumber: "5556789012",
      department: "Engineering",
      jobTitle: "Designer",
      hireDate: "2022-04-01",
      employmentType: "Contract",
    },
    {
      id: "EMP007",
      name: "Muthu Vel",
      email: "muthu.l@example.com",
      contactNumber: "5557890123",
      department: "Finance",
      jobTitle: "Analyst",
      hireDate: "2017-12-12",
      employmentType: "Full-time",
    },
    {
      id: "EMP008",
      name: "Vetri Vel",
      email: "vetri.t@example.com",
      contactNumber: "5558901234",
      department: "HR",
      jobTitle: "Manager",
      hireDate: "2016-07-19",
      employmentType: "Full-time",
    },
    {
      id: "EMP009",
      name: "James White",
      email: "james.w@example.com",
      contactNumber: "5559012345",
      department: "Marketing",
      jobTitle: "Designer",
      hireDate: "2023-01-10",
      employmentType: "Intern",
    },
    {
      id: "EMP010",
      name: "Susan Harris",
      email: "susan.h@example.com",
      contactNumber: "5550123456",
      department: "Engineering",
      jobTitle: "Developer",
      hireDate: "2022-10-05",
      employmentType: "Full-time",
    },
  ]

  const [employees, setEmployees] = useState<Employee[]>(initialEmployees)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortConfig, setSortConfig] = useState<{ key: keyof Employee; direction: "ascending" | "descending" } | null>(
    null,
  )
  const [currentPage, setCurrentPage] = useState(1)
  const [filterOpen, setFilterOpen] = useState(false)
  const [selectedDepartment, setSelectedDepartment] = useState<Department | "">("")
  const [showAddForm, setShowAddForm] = useState(false)
  

  const itemsPerPage = 10

  const workModeData: WorkModeData[] = [
    { name: "Remote", value: 4 },
    { name: "Hybrid", value: 3 },
    { name: "On-site", value: 3 },
  ]

  const requestSort = (key: keyof Employee) => {
    let direction: "ascending" | "descending" = "ascending"
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }
    setSortConfig({ key, direction })
  }

  const getSortedAndFilteredEmployees = () => {
    const filtered = employees.filter((employee) => {
      const matchesSearch = Object.values(employee).some(
        (value) => typeof value === "string" && value.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      const matchesDepartment = selectedDepartment ? employee.department ===selectedDepartment : true
      return matchesSearch && matchesDepartment
    })

    if (sortConfig !== null) {
      filtered.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "ascending" ? -1 : 1
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "ascending" ? 1 : -1
        return 0
      })
    }

    return filtered
  }

  const filteredEmployees = getSortedAndFilteredEmployees()
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage)
  const paginatedEmployees = filteredEmployees.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const getNewEmployeesCount = () => {
    return employees.filter((emp) => {
      const hireDate = new Date(emp.hireDate)
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
      return hireDate >= thirtyDaysAgo
    }).length
  }

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }

  const handleDepartmentChange = (department: Department | "") => {
    setSelectedDepartment(department)
    setCurrentPage(1)
    setFilterOpen(false)
  }

  const handleAddEmployee = (newEmployee: Employee) => {
    setEmployees([...employees, newEmployee])
  }
  
  
  

  const handleDeleteEmployee = (employeeId: string) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      setEmployees(employees.filter((emp) => emp.id !== employeeId))
    }
  }

  
 

  return (
    <div className="container mx-auto px-4 py-2">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white"
        style={{...FONTS.header}}>Employee Management</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-[#4c469f] hover:!bg-white-700 text-white px-4 py-2 rounded-md shadow-md"
          style={{...FONTS.button}}
        >
          + Add Employee
        </button>
      </div>
      {}

      {/* Statistics Cards */}
      <div className="grid grid-cols-4 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-5">
        <EmployeeStatsCard
          title="Total Employees"
          value={employees.length}
          subtitle="Across all departments"
          icon={<Users className="w-6 h-6 text-indigo-600" />}
          bgColor="bg-indigo-50"
          textColor="text-indigo-600"
        />

        <EmployeeStatsCard
          title="New Employees"
          value={getNewEmployeesCount()}
          subtitle="Last 30 days"
          icon={<Clock className="w-6 h-6 text-emerald-600" />}
          bgColor="bg-emerald-50"
          textColor="text-emerald-600"
        />

        <EmployeeStatsCard
          title="Resigned Employees"
          value={0}
          subtitle="This quarter"
          icon={<UserX className="w-6 h-6 text-amber-600" />}
          bgColor="bg-amber-50"
          textColor="text-amber-600"
        />

        <WorkModeStats workModeData={workModeData} />
      </div>

      {/* Search and Filter */}
      <SearchFilterBar
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        filterOpen={filterOpen}
        onFilterToggle={() => setFilterOpen(!filterOpen)}
        selectedDepartment={selectedDepartment}
        onDepartmentChange={handleDepartmentChange}
      />

      {/* Employee Table */}
      <EmployeeTable
        employees={paginatedEmployees}
        sortConfig={sortConfig}
        onSort={requestSort}
        onEdit={EmployeeTable}
        onDelete={handleDeleteEmployee}
      />

      {/* Pagination */}
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />

      {/* Add Employee Modal */}
      <AddEmployeeModal isOpen={showAddForm} onClose={() => setShowAddForm(false)} onAdd={handleAddEmployee} />

      

    </div>
  )
}

export default EmployeeManagement

