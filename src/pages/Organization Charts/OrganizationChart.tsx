import { useState } from "react"
import type { Employee, EmployeeFormData } from "../../components/OrganizationChart/employee"
import { OrgChart } from "../../components/OrganizationChart/org-chart"
import { EmployeeForm } from "../../components/OrganizationChart/employee-form"
import { Modal } from "../../components/OrganizationChart/modal"
import { Plus, Users } from "lucide-react"
import { FONTS } from "../../constants/uiConstants"

const initialEmployees: Employee[] = [
  {
    id: "1",
    name: "John Smith",
    position: "Chief Executive Officer",
    department: "Executive",
    email: "john.smith@company.com",
    phone: "+1 (555) 123-4567",
    managerId: null,
    avatar: "/placeholder.svg?height=64&width=64",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    position: "Chief Technology Officer",
    department: "Technology",
    email: "sarah.johnson@company.com",
    phone: "+1 (555) 234-5678",
    managerId: "1",
    avatar: "/placeholder.svg?height=64&width=64",
  },
  {
    id: "3",
    name: "Mike Davis",
    position: "Chief Financial Officer",
    department: "Finance",
    email: "mike.davis@company.com",
    phone: "+1 (555) 345-6789",
    managerId: "1",
    avatar: "/placeholder.svg?height=64&width=64",
  },
  {
    id: "4",
    name: "Emily Chen",
    position: "Senior Software Engineer",
    department: "Technology",
    email: "emily.chen@company.com",
    phone: "+1 (555) 456-7890",
    managerId: "2",
    avatar: "/placeholder.svg?height=64&width=64",
  },
  {
    id: "5",
    name: "David Wilson",
    position: "Product Manager",
    department: "Product",
    email: "david.wilson@company.com",
    phone: "+1 (555) 567-8901",
    managerId: "2",
    avatar: "/placeholder.svg?height=64&width=64",
  },
  {
    id: "6",
    name: "Lisa Rodriguez",
    position: "Marketing Director",
    department: "Marketing",
    email: "lisa.rodriguez@company.com",
    phone: "+1 (555) 678-9012",
    managerId: "1",
    avatar: "/placeholder.svg?height=64&width=64",
  },
  {
    id: "7",
    name: "James Brown",
    position: "Senior Developer",
    department: "Technology",
    email: "james.brown@company.com",
    phone: "+1 (555) 789-0123",
    managerId: "2",
    avatar: "/placeholder.svg?height=64&width=64",
  },
  {
    id: "8",
    name: "Anna Taylor",
    position: "Financial Analyst",
    department: "Finance",
    email: "anna.taylor@company.com",
    phone: "+1 (555) 890-1234",
    managerId: "3",
    avatar: "/placeholder.svg?height=64&width=64",
  },
]

export default function OrganizationChart() {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees)
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)

  const handleAddEmployee = (employeeData: EmployeeFormData) => {
    const newEmployee: Employee = {
      ...employeeData,
      id: Date.now().toString(),
      avatar: "/placeholder.svg?height=64&width=64",
    }
    setEmployees([...employees, newEmployee])
    setIsFormOpen(false)
  }

  const handleEditEmployee = (employeeData: EmployeeFormData) => {
    if (!editingEmployee) return
    const updatedEmployee: Employee = {
      ...editingEmployee,
      ...employeeData,
    }
    setEmployees(employees.map((emp) => (emp.id === editingEmployee.id ? updatedEmployee : emp)))
    setEditingEmployee(null)
    setIsFormOpen(false)
  }

  const handleDeleteEmployee = (employeeId: string) => {
    const employeeToDelete = employees.find((emp) => emp.id === employeeId)
    if (!employeeToDelete) return

    const updatedEmployees = employees
      .filter((emp) => emp.id !== employeeId)
      .map((emp) =>
        emp.managerId === employeeId ? { ...emp, managerId: employeeToDelete.managerId } : emp
      )

    setEmployees(updatedEmployees)
  }

  const openEditForm = (employee: Employee) => {
    setEditingEmployee(employee)
    setIsFormOpen(true)
  }

  const openAddForm = () => {
    setEditingEmployee(null)
    setIsFormOpen(true)
  }

  const closeForm = () => {
    setEditingEmployee(null)
    setIsFormOpen(false)
  }

  const departmentCount = Array.from(new Set(employees.map((emp) => emp.department))).length

  const levelCount =
    Math.max(
      ...employees.map((emp) => {
        let level = 0
        let currentEmp = emp
        while (currentEmp.managerId) {
          level++
          currentEmp = employees.find((e) => e.id === currentEmp.managerId) || currentEmp
          if (level > 10) break
        }
        return level
      })
    ) + 1

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-7xl">

        {/* Header: Title + Add Button */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            {/* <div className="p-4 bg-blue-600 text-white rounded-2xl shadow-lg">
              <Users className="w-8 h-8" />
            </div> */}
            <div>
              <h1 className=" mb-1" style={FONTS.header}>Organization Chart</h1>
              <p className="" style={FONTS.paragraph}>Manage your company structure</p>
            </div>
          </div>
          <button
            onClick={openAddForm}
            className="bg-[#006666] text-white px-4 py-2 rounded-md font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Employee</span>
          </button>
        </div>

        {/* Stats Section */}
        <div className="mb-2 rounded-2xl shadow-2xl  backdrop-blur-md p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-12">
              <div className="text-center">
                <div className="text-4xl font-black text-gray-800 mb-1">{employees.length}</div>
                <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Employees</div>
              </div>
              <div className="w-px h-16 bg-gradient-to-b from-gray-200 to-gray-400"></div>
              <div className="text-center">
                <div className="text-4xl font-black text-blue-600 mb-1">{departmentCount}</div>
                <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Departments</div>
              </div>
              <div className="w-px h-16 bg-gradient-to-b from-gray-200 to-gray-400"></div>
              <div className="text-center">
                <div className="text-4xl font-black text-emerald-600 mb-1">{levelCount}</div>
                <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Levels</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              {Array.from(new Set(employees.map((emp) => emp.department)))
                .slice(0, 4)
                .map((dept, index) => {
                  const colors = [
                    "bg-blue-100 text-blue-800",
                    "bg-emerald-100 text-emerald-800",
                    "bg-purple-100 text-purple-800",
                    "bg-amber-100 text-amber-800",
                  ]
                  return (
                    <span
                      key={dept}
                      className={`px-4 py-2 ${colors[index]} rounded-full text-sm font-bold`}
                    >
                      {dept}
                    </span>
                  )
                })}
            </div>
          </div>
        </div>

        {/* Org Chart */}
        <div className="rounded-2xl shadow-2xl border-0  backdrop-blur-lg overflow-hidden">
          <div className="p-12">
            <OrgChart
              employees={employees}
              onEdit={openEditForm}
              onDelete={handleDeleteEmployee}
            />
          </div>
        </div>

        {/* Modal */}
        <Modal
          isOpen={isFormOpen}
          onClose={closeForm}
          title={editingEmployee ? "Edit Employee" : "Add New Employee"}
        >
          <EmployeeForm
            employee={editingEmployee}
            employees={employees}
            onSubmit={editingEmployee ? handleEditEmployee : handleAddEmployee}
            onCancel={closeForm}
          />
        </Modal>
      </div>
    </div>
  )
}
