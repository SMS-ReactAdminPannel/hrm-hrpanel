"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { ArrowLeft, Plus, Trash2, Users } from "lucide-react"

type Employee = {
  id: string
  name: string
  role: string
}

type Department = {
  id: string
  name: string
  description: string
  employees: Employee[]
}

const EmployeesPage = () => {
  const router = useRouter()
  const params = useParams()
  const departmentId = params.departmentId as string

  // Mock data - in a real app, this would come from your data source
  const [department, setDepartment] = useState<Department>(() => {
    const departments = {
      hr: {
        id: "hr",
        name: "Human Resources",
        description: "Managing talent and organizational culture",
        employees: [
          { id: "1", name: "Alice", role: "HR Manager" },
          { id: "2", name: "Bob", role: "Recruiter" },
        ],
      },
      engineering: {
        id: "engineering",
        name: "Engineering",
        description: "Building innovative technology solutions",
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
        employees: [],
      },
    }
    return departments[departmentId as keyof typeof departments] || departments.hr
  })

  const [newEmployee, setNewEmployee] = useState({ name: "", role: "" })

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

  const handleBack = () => {
    router.push("/departments")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl">
        {/* Header Section */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          <button
            onClick={handleBack}
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-white/30 bg-white/20 px-4 py-2.5 text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Departments
          </button>
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">{department.name}</h1>
            <p className="text-base text-white/80 sm:text-lg">{department.description}</p>
          </div>
        </div>

        {/* Department Overview Card */}
        <div className="overflow-hidden rounded-2xl bg-white/95 shadow-2xl backdrop-blur-sm">
          {/* Card Header */}
          <div className="border-b border-slate-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
            <h2 className="flex items-center gap-3 text-2xl font-bold text-slate-800 sm:text-3xl">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              {department.name} Overview
            </h2>
          </div>

          {/* Card Body */}
          <div className="p-6">
            {/* Stats */}
            <div className="mb-6 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 p-4">
              <p className="text-slate-600">
                Total Employees: <span className="text-2xl font-bold text-blue-600">{department.employees.length}</span>
              </p>
            </div>

            {/* Add Employee Form */}
            <div className="mb-6 rounded-xl bg-slate-50 p-4 sm:p-6">
              <h3 className="mb-4 text-lg font-semibold text-slate-800">Add New Employee</h3>
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="text"
                  placeholder="Employee Name"
                  value={newEmployee.name}
                  onChange={(e) => setNewEmployee((prev) => ({ ...prev, name: e.target.value }))}
                  className="flex-1 rounded-lg border border-slate-300 px-4 py-2.5 text-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
                <input
                  type="text"
                  placeholder="Role"
                  value={newEmployee.role}
                  onChange={(e) => setNewEmployee((prev) => ({ ...prev, role: e.target.value }))}
                  className="flex-1 rounded-lg border border-slate-300 px-4 py-2.5 text-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
                <button
                  onClick={handleAddEmployee}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-auto"
                >
                  <Plus className="h-4 w-4" />
                  Add
                </button>
              </div>
            </div>

            {/* Employees Table */}
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
                        <tr key={employee.id} className="transition-colors hover:bg-slate-50">
                          <td className="px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">{index + 1}</td>
                          <td className="px-4 py-4 text-sm text-slate-700 sm:px-6">{employee.name}</td>
                          <td className="px-4 py-4 text-sm text-slate-700 sm:px-6">{employee.role}</td>
                          <td className="px-4 py-4 sm:px-6">
                            <button
                              onClick={() => handleDeleteEmployee(employee.id)}
                              className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white transition-all duration-200 hover:bg-red-600 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="px-4 py-12 text-center sm:px-6">
                          <div className="flex flex-col items-center justify-center space-y-3">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                              <Users className="h-8 w-8 text-slate-400" />
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm font-medium text-slate-900">No employees added yet</p>
                              <p className="text-sm text-slate-500">
                                Use the form above to add employees to this department
                              </p>
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

export default EmployeesPage
