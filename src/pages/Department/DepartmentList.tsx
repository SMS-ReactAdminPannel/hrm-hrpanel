"use client"

import React, { useState, useEffect } from "react"
import { Plus, Users, Trash2, X } from "lucide-react"
import { useNavigate } from "react-router-dom"
import axios from "axios" 
import EmployeesPage from "../../components/Department/Employees"
import type { JSX } from "react/jsx-runtime"

type Employee = {
  id: string
  name: string
  role: string
}

type Department = {
  _id?: string
  id: string
  name: string
  description: string
  subDescription: string
  employeeCount: number
  employees: Employee[]
}

const DepartmentList: React.FC = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [newDeptName, setNewDeptName] = useState("")
  const [newDeptDescription, setNewDeptDescription] = useState("")
  const [newDeptSubDescription, setNewDeptSubDescription] = useState("")
  const [departments, setDepartments] = useState<Department[]>([])

  const navigate = useNavigate()

  const fetchDepartments = async () => {
    try {
      const res = await axios.get("http://localhost:3002/api/departments")
      setDepartments(res.data)
    } catch (error) {
      console.error("Failed to fetch departments:", error)
    }
  }

  useEffect(() => {
    fetchDepartments()
  }, [])

  const handleCreateDepartment = async () => {
    const trimmedName = newDeptName.trim()
    const trimmedDesc = newDeptDescription.trim()
    const trimmedSubDesc = newDeptSubDescription.trim()
  
    if (!trimmedName || !trimmedDesc || !trimmedSubDesc) {
      alert("All fields are required.")
      return
    }
  
    const newId = trimmedName.toLowerCase().replace(/\s+/g, "-")
  
    const payload = {
      id: newId,
      name: trimmedName,
      description: trimmedDesc,
      subDescription: trimmedSubDesc,
    }
  
    console.log("Creating department with:", payload) // Debug info
  
    try {
      const res = await axios.post("http://localhost:3002/api/departments/create", payload)
  
      const newDept: Department = res.data
      setDepartments([...departments, { ...newDept, employees: [], employeeCount: 0 }])
  
      setNewDeptName("")
      setNewDeptDescription("")
      setNewDeptSubDescription("")
      setIsCreateModalOpen(false)
    } catch (error: any) {
      if (error.response) {
        // Server responded with a status code outside 2xx
        console.error("Backend error:", error.response.data)
        alert(`Failed to create department: ${error.response.data.message || "Unknown error"}`)
      } else if (error.request) {
        // Request was made but no response received
        console.error("No response from server:", error.request)
        alert("No response from server.")
      } else {
        // Something else went wrong
        console.error("Error setting up request:", error.message)
        alert("Error creating department.")
      }
    }
  }
  

  const handleDeleteDepartment = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setDepartments(departments.filter((dept) => dept.id !== id))
  }

  // const handleCardClick = (EmployeesPage?: () => JSX.Element | null) => {
  //   navigate(`/employees`)
  // }   

  const handleCardClick = (dept: any) => {
    navigate("/employees", { state: { department: dept } });
  };
 
  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()


  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto">
        <div className="relative mb-8">
          <div className="text-left">
            <h1 className="text-4xl font-bold text-white">Departments</h1>
            <p className="text-white/80">Manage your organization's departments</p>
          </div>
          <div className="absolute top-0 right-0">
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-medium text-white shadow transition hover:bg-blue-700"
            >
              <Plus className="h-5 w-5" />
              Create Department
            </button>
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {departments.map((dept, index) => (
  <div
    key={dept.id ?? `${dept.name}-${index}`} // fallback key if id is missing
    role="button"
    tabIndex={0}
    onClick={() => handleCardClick(dept)}
    className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transform hover:scale-[1.01] transition duration-200 cursor-pointer"
  >
      <div className="relative bg-blue-100 p-6 flex justify-between items-start">
        <div className="bg-blue-500 text-white font-bold rounded-full w-12 h-12 flex items-center justify-center text-lg shadow">
          {getInitials(dept.name)}
        </div>
        <button
          onClick={(e) => handleDeleteDepartment(dept.id, e)}
          aria-label="Delete Department"
          className="bg-red-400 hover:bg-red-300 text-white rounded-full p-2 shadow"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-800 mb-1">{dept.name}</h3>
        <p className="text-slate-700 text-sm line-clamp-2">{dept.description}</p>
        <p className="text-slate-500 text-xs mt-1 line-clamp-1">{dept.subDescription}</p>
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
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md relative
          backdrop-filter backdrop-blur bg-opacity-10 backdrop-saturate-100 backdrop-contrast-100
          border border-white">
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
                className="px-4 py-2 text-sm bg-[#006666]  text-white rounded "
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
