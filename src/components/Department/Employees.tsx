import { useParams, useNavigate } from "react-router-dom"
import { useState } from "react"
import { ArrowLeft, Briefcase, Plus, Trash2, Users } from "lucide-react"



type Employee = {
  id: string
  name: string
  role: string
}

type Department = {
  requiredRoles: any
  id: string
  name: string
  description: string
  employees: Employee[]
}

const EmployeesPage = () => {
  const { departmentId } = useParams<{ departmentId: string }>()
  const navigate = useNavigate()

  const departments: Record<string, {
    id: string
    name: string
    description: string
    subDescription: string
    image: string
    employeeCount: number
    requiredRoles: string[]
    employees: { id: string, name: string, role: string }[]
  }> = {
    hr: {
      id: "hr",
      name: "Human Resources",
      description: "Managing talent and organizational culture",
      subDescription: "Recruitment, employee relations, and HR policies",
      image: "/placeholder.svg",
      employeeCount: 2,
      requiredRoles: ["HR Manager", "Recruiter", "Training Specialist"],
      employees: [
        { id: "1", name: "Alice", role: "HR Manager" },
        { id: "2", name: "Bob", role: "Recruiter" },
      ],
    },
    engineering: {
      id: "engineering",
      name: "Engineering",
      description: "Building innovative technology solutions",
      subDescription: "Software development, architecture, and technical leadership",
      image: "/placeholder.svg",
      employeeCount: 3,
      requiredRoles: [
        "Frontend Developer",
        "Backend Developer",
        "DevOps Engineer",
        "QA Engineer",
        "UI/UX Designer"
      ],
      employees: [
        { id: "1", name: "Charlie", role: "Frontend Developer" },
        { id: "2", name: "David", role: "Backend Developer" },
        { id: "3", name: "Eva", role: "DevOps Engineer" },
      ],
    },
    sales: {
      id: "sales",
      name: "Sales",
      description: "Driving revenue and customer relationships",
      subDescription: "Business development, client management, and growth strategies",
      image: "/placeholder.svg",
      employeeCount: 0,
      requiredRoles: ["Sales Executive", "Account Manager", "Sales Analyst"],
      employees: [],
    },
    marketing: {
      id: "marketing",
      name: "Marketing",
      description: "Promoting brand and driving user acquisition",
      subDescription: "Content, campaigns, and market research",
      image: "/placeholder.svg?height=200&width=300",
      employeeCount: 2,
      requiredRoles: ["Content Strategist", "SEO Specialist", "Marketing Manager"],
      employees: [
        { id: "1", name: "Fiona", role: "Content Strategist" },
        { id: "2", name: "George", role: "SEO Specialist" },
      ],
    },
    finance: {
      id: "finance",
      name: "Finance",
      description: "Managing budgets and financial planning",
      subDescription: "Accounting, payroll, and forecasting",
      image: "/placeholder.svg?height=200&width=300",
      employeeCount: 1,
      requiredRoles: ["Finance Manager", "Accountant", "Payroll Specialist"],
      employees: [
        { id: "1", name: "Helen", role: "Finance Manager" },
      ],
    },
    "customer-support": {
      id: "customer-support",
      name: "Customer Support",
      description: "Assisting users and resolving queries",
      subDescription: "Support tickets, live chat, and helpdesk",
      image: "/placeholder.svg?height=200&width=300",
      employeeCount: 3,
      requiredRoles: ["Support Agent", "Team Lead", "Technical Support"],
      employees: [
        { id: "1", name: "Ian", role: "Support Agent" },
        { id: "2", name: "Jane", role: "Support Agent" },
        { id: "3", name: "Kevin", role: "Team Lead" },
      ],
    }
  }

  const [department, setDepartment] = useState<Department>(
    departments[departmentId || "hr"] || departments.hr
  )
  const [newEmployee, setNewEmployee] = useState({ name: "", role: "" })

  const filledRoles = department.employees.map(emp => emp.role);
const vacantRoles = department.requiredRoles?.filter((role: string) => !filledRoles.includes(role)) || [];

  const handleAddEmployee = () => {
    if (newEmployee.name.trim() && newEmployee.role.trim()) {
      const employee: Employee = {
        id: Date.now().toString(),
        name: newEmployee.name.trim(),
        role: newEmployee.role.trim(),
      }
      setDepartment((prev) => ({
        ...prev,
        employees: [...prev.employees, employee],
      }))
      setNewEmployee({ name: "", role: "" })
    }
  }

  const handleDeleteEmployee = (employeeId: string) => {
    setDepartment((prev) => ({
      ...prev,
      employees: prev.employees.filter((emp) => emp.id !== employeeId),
    }))
  }

  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          <button
            onClick={() => navigate("/departments")}
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-white/30 bg-white/20 px-4 py-2.5 text-white backdrop-blur-sm transition hover:bg-white/30"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Departments
          </button>
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              {department.name}
            </h1>
            <p className="text-base text-white/80 sm:text-lg">{department.description}</p>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white/55 shadow-2xl">
          <div className="border-b border-slate-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
            <h2 className="flex items-center gap-3 text-2xl font-bold text-slate-800">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              {department.name} Overview
            </h2>
          </div>

          <div className="p-6">
<div className="mb-6 grid grid-cols-3 gap-4 sm:grid-cols-2 md:grid-cols-3">
  <div className="rounded-xl bg-blue-100 p-4 shadow">
    <h4 className="text-xl font-medium text-blue-700">Total Employees</h4>
    <p className="text-2xl font-bold text-blue-800">{department.employees.length}</p>
  </div>
  <div className="rounded-xl bg-indigo-100 p-4 shadow">
    <h4 className="text-xl font-medium text-indigo-700">Active Roles</h4>
    <p className="text-2xl font-bold text-indigo-800">{[...new Set(department.employees.map(e => e.role))].length}</p>
  </div>
  <div className="rounded-xl bg-indigo-200 border p-4 shadow-sm">
    <div className="flex items-center gap-3">
      {/* <Briefcase className="text-red-500" /> */}
      <div>
        <p className="text-xl text-indigo-600">Vacant Roles</p>
        <p className="text-xl font-bold text-slate-800">{vacantRoles.length}</p>
      </div>
    </div>
  </div>
</div>

            {/* <div className="flex justify-center">
              <div className="mb-6 w-full max-w-md rounded-xl bg-slate-50 p-4 sm:p-6 shadow-md">
                <h3 className="mb-4 text-lg font-semibold text-slate-800">Add New Employee</h3>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    type="text"
                    placeholder="Employee Name"
                    value={newEmployee.name}
                    onChange={(e) =>
                      setNewEmployee((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="flex-1 rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500/20"
                  />
                  <input
                    type="text"
                    placeholder="Role"
                    value={newEmployee.role}
                    onChange={(e) =>
                      setNewEmployee((prev) => ({ ...prev, role: e.target.value }))
                    }
                    className="flex-1 rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500/20"
                  />
                  <button
  onClick={handleAddEmployee}
  className="flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-6 py-2.5 text-white hover:bg-blue-700"
>
  <Plus className="h-4 w-4" />
  Add
</button>
                </div>
              </div>
            </div> */}

            <div className="overflow-hidden rounded-xl border border-slate-200">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-100">
                      <th className="px-4 py-4 text-left text-sm font-semibold text-slate-700 sm:px-6">EMP ID</th>
                      <th className="px-4 py-4 text-left text-sm font-semibold text-slate-700 sm:px-6">EMPLOYEE</th>
                      <th className="px-4 py-4 text-left text-sm font-semibold text-slate-700 sm:px-6">ROLE</th>
                      <th className="px-4 py-4 text-left text-sm font-semibold text-slate-700 sm:px-6">ACTION</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {department.employees.length > 0 ? (
                      department.employees.map((employee, index) => (
                        <tr key={employee.id} className="transition hover:bg-slate-50">
                          <td className="px-4 py-4 text-sm font-medium text-slate-900">{index + 1}</td>
                          <td className="px-4 py-4 text-sm text-slate-700">{employee.name}</td>
                          <td className="px-4 py-4 text-sm text-slate-700">{employee.role}</td>
                          <td className="px-4 py-4">
                            <button
                              onClick={() => handleDeleteEmployee(employee.id)}
                              className="h-8 w-8 flex items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="px-4 py-12 text-center">
                          <div className="flex flex-col items-center space-y-3">
                            <div className="h-16 w-16 flex items-center justify-center rounded-full bg-slate-100">
                              <Users className="h-8 w-8 text-slate-400" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-slate-900">No employees added yet</p>
                              <p className="text-sm text-slate-500">Use the form above to add employees</p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeesPage;