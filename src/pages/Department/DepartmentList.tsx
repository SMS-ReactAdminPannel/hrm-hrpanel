"use client"

import React, { useState } from "react"
import { Plus, Users, Trash2, X } from "lucide-react"

type Employee = {
  id: string
  name: string
  role: string
}

type Department = {
  id: string
  name: string
  description: string
  subDescription: string
  image: string
  employeeCount: number
  employees: Employee[]
}

const DepartmentList: React.FC = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [newDeptName, setNewDeptName] = useState("")
  const [newDeptDescription, setNewDeptDescription] = useState("")
  const [newDeptSubDescription, setNewDeptSubDescription] = useState("")
  const [departments, setDepartments] = useState<Department[]>([
    {
      id: "hr",
      name: "Human Resources",
      description: "Managing talent and organizational culture",
      subDescription: "Recruitment, employee relations, and HR policies",
      image: "/placeholder.svg",
      employeeCount: 2,
      employees: [
        { id: "1", name: "Alice", role: "HR Manager" },
        { id: "2", name: "Bob", role: "Recruiter" },
      ],
    },
    {
      id: "engineering",
      name: "Engineering",
      description: "Building innovative technology solutions",
      subDescription: "Software development, architecture, and technical leadership",
      image: "/placeholder.svg",
      employeeCount: 3,
      employees: [
        { id: "1", name: "Charlie", role: "Frontend Developer" },
        { id: "2", name: "David", role: "Backend Developer" },
        { id: "3", name: "Eva", role: "DevOps Engineer" },
      ],
    },
    {
      id: "sales",
      name: "Sales",
      description: "Driving revenue and customer relationships",
      subDescription: "Business development, client management, and growth strategies",
      image: "/placeholder.svg",
      employeeCount: 0,
      employees: [],
    },
    {
      id: "marketing",
      name: "Marketing",
      description: "Promoting brand and driving user acquisition",
      subDescription: "Content, campaigns, and market research",
      image: "/placeholder.svg?height=200&width=300",
      employeeCount: 2,
      employees: [
        { id: "1", name: "Fiona", role: "Content Strategist" },
        { id: "2", name: "George", role: "SEO Specialist" },
      ],
    },
    {
      id: "finance",
      name: "Finance",
      description: "Managing budgets and financial planning",
      subDescription: "Accounting, payroll, and forecasting",
      image: "/placeholder.svg?height=200&width=300",
      employeeCount: 1,
      employees: [
        { id: "1", name: "Helen", role: "Finance Manager" },
      ],
    },
    {
      id: "customer-support",
      name: "Customer Support",
      description: "Assisting users and resolving queries",
      subDescription: "Support tickets, live chat, and helpdesk",
      image: "/placeholder.svg?height=200&width=300",
      employeeCount: 3,
      employees: [
        { id: "1", name: "Ian", role: "Support Agent" },
        { id: "2", name: "Jane", role: "Support Agent" },
        { id: "3", name: "Kevin", role: "Team Lead" },
      ],
    },
  ])

  const handleCreateDepartment = () => {
    const trimmedName = newDeptName.trim()
    const trimmedDesc = newDeptDescription.trim()
    const trimmedSubDesc = newDeptSubDescription.trim()

    if (!trimmedName || !trimmedDesc || !trimmedSubDesc) {
      alert("All fields are required.")
      return
    }

    const newId = trimmedName.toLowerCase().replace(/\s+/g, "-")
    const exists = departments.some((dept) => dept.id === newId)

    if (exists) {
      alert("Department with this name already exists.")
      return
    }

    const newDept: Department = {
      id: newId,
      name: trimmedName,
      description: trimmedDesc,
      subDescription: trimmedSubDesc,
      image: "/placeholder.svg",
      employees: [],
      employeeCount: 0,
    }

    setDepartments([...departments, newDept])
    setNewDeptName("")
    setNewDeptDescription("")
    setNewDeptSubDescription("")
    setIsCreateModalOpen(false)
  }

  const handleDeleteDepartment = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setDepartments(departments.filter((dept) => dept.id !== id))
  }

  const handleCardClick = (departmentId: string) => {
    alert(`Navigate to: /departments/${departmentId}/employees`) // Replace with actual routing logic if needed
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
  {/* Heading Section */}
  <div>
    <h1 className="text-4xl font-bold text-white">Departments</h1>
    <p className="text-white/80">Manage your organization's departments</p>
  </div>

  {/* Create Button */}
  <button
    onClick={() => setIsCreateModalOpen(true)}
    className="ml-auto flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-medium text-white shadow transition hover:bg-blue-700"
  >
    <Plus className="h-5 w-5" />
    Create Department
  </button>
</div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {departments.map((dept) => (
            <div
              key={dept.id}
              onClick={() => handleCardClick(dept.id)}
              className="group bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition transform hover:scale-105 cursor-pointer"
            >
              <div className="relative">
                <img src={dept.image} alt={dept.name} className="w-full h-48 object-cover" />
                <div className="absolute right-3 top-3">
                  <button
                    onClick={(e) => handleDeleteDepartment(dept.id, e)}
                    className="bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-800 mb-2">{dept.name}</h3>
                <p className="text-slate-700 text-sm">{dept.description}</p>
                <p className="text-slate-500 text-sm mt-1">{dept.subDescription}</p>
                <div className="flex justify-between items-center mt-4 border-t pt-3">
                  <div className="flex items-center gap-2 text-blue-600">
                    <Users className="h-4 w-4" />
                    <span className="text-sm">
                      {dept.employees.length} Employee{dept.employees.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="text-xs bg-blue-100 text-blue-700 rounded-full px-3 py-1 font-medium">
                    Click to view
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {departments.length === 0 && (
          <div className="flex justify-center items-center h-64 text-white">
            <p>No departments yet. Click 'Create Department' to add one.</p>
          </div>
        )}
      </div>

      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md relative">
            <button
              onClick={() => setIsCreateModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X className="h-5 w-5" />
            </button>
            <h2 className="text-lg font-bold mb-4">Create Department</h2>
            <div className="space-y-4">
              <input
                type="text"
                value={newDeptName}
                onChange={(e) => setNewDeptName(e.target.value)}
                placeholder="Department Name"
                className="w-full border rounded px-4 py-2 text-sm"
              />
              <input
                type="text"
                value={newDeptDescription}
                onChange={(e) => setNewDeptDescription(e.target.value)}
                placeholder="Description"
                className="w-full border rounded px-4 py-2 text-sm"
              />
              <input
                type="text"
                value={newDeptSubDescription}
                onChange={(e) => setNewDeptSubDescription(e.target.value)}
                placeholder="Sub Description"
                className="w-full border rounded px-4 py-2 text-sm"
              />
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="px-4 py-2 text-sm bg-slate-100 rounded hover:bg-slate-200"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateDepartment}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DepartmentList