"use client"

import { useEffect, useRef, useState } from "react"
import type { Employee, EmployeeFormData } from "../../components/OrganizationChart/employee"
import { OrgChart } from "../../components/OrganizationChart/org-chart"
import { EmployeeForm } from "../../components/OrganizationChart/employee-form"
import { Modal } from "../../components/OrganizationChart/modal"
import { Plus } from "lucide-react"
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
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set())
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const [addingChildTo, setAddingChildTo] = useState<Employee | null>(null)

  // Get visible employees based on expanded state
  const getVisibleEmployees = () => {
    const rootEmployee = employees.find((emp) => emp.managerId === null)
    if (!rootEmployee) return []

    const visibleEmployees = [rootEmployee]
    const directReports = employees.filter((emp) => emp.managerId === rootEmployee.id)
    visibleEmployees.push(...directReports)

    // Add children of expanded nodes
    expandedNodes.forEach((nodeId) => {
      const children = employees.filter((emp) => emp.managerId === nodeId)
      children.forEach((child) => {
        if (!visibleEmployees.find((emp) => emp.id === child.id)) {
          visibleEmployees.push(child)
        }
      })
    })

    return visibleEmployees
  }

  const toggleNodeExpansion = (nodeId: string) => {
    const newExpandedNodes = new Set(expandedNodes)
    if (newExpandedNodes.has(nodeId)) {
      newExpandedNodes.delete(nodeId)
    } else {
      newExpandedNodes.add(nodeId)
    }
    setExpandedNodes(newExpandedNodes)
  }

  const hasChildren = (employeeId: string) => {
    return employees.some((emp) => emp.managerId === employeeId)
  }

  const handleAddEmployee = (employeeData: EmployeeFormData) => {
    const newEmployee: Employee = {
      ...employeeData,
      id: Date.now().toString(),
      avatar: "/placeholder.svg?height=64&width=64",
    }
    setEmployees([...employees, newEmployee])
    setIsFormOpen(false)
    setAddingChildTo(null)
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
      .map((emp) => (emp.managerId === employeeId ? { ...emp, managerId: employeeToDelete.managerId } : emp))

    setEmployees(updatedEmployees)

    // Remove from expanded nodes if it was expanded
    const newExpandedNodes = new Set(expandedNodes)
    newExpandedNodes.delete(employeeId)
    setExpandedNodes(newExpandedNodes)
  }

  const openEditForm = (employee: Employee) => {
    setEditingEmployee(employee)
    setIsFormOpen(true)
  }

  const openAddForm = () => {
    setEditingEmployee(null)
    setIsFormOpen(true)
  }

  const openAddChildForm = (parentEmployee: Employee) => {
    setAddingChildTo(parentEmployee)
    setEditingEmployee(null)
    setIsFormOpen(true)
  }

  const closeForm = () => {
    setEditingEmployee(null)
    setAddingChildTo(null)
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
      }),
    ) + 1

  // Zooming with Ctrl + Scroll
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey && chartContainerRef.current) {
        e.preventDefault()
        const chart = document.getElementById("org-chart-wrapper") as HTMLElement
        const scale = Number.parseFloat(chart.dataset.scale || "1")
        const newScale = Math.min(Math.max(scale * (e.deltaY < 0 ? 1.1 : 0.9), 0.2), 3)
        chart.style.transform = `scale(${newScale})`
        chart.dataset.scale = newScale.toString()
      }
    }

    const container = chartContainerRef.current
    if (container) container.addEventListener("wheel", handleWheel, { passive: false })
    return () => container?.removeEventListener("wheel", handleWheel)
  }, [])

  // Drag to pan
  useEffect(() => {
    const container = chartContainerRef.current
    if (!container) return

    let isPanning = false
    let startX = 0
    let startY = 0
    let scrollLeft = 0
    let scrollTop = 0

    const mouseDownHandler = (e: MouseEvent) => {
      isPanning = true
      container.style.cursor = "grabbing"
      startX = e.pageX - container.offsetLeft
      startY = e.pageY - container.offsetTop
      scrollLeft = container.scrollLeft
      scrollTop = container.scrollTop
    }

    const mouseMoveHandler = (e: MouseEvent) => {
      if (!isPanning) return
      const x = e.pageX - container.offsetLeft
      const y = e.pageY - container.offsetTop
      container.scrollLeft = scrollLeft - (x - startX)
      container.scrollTop = scrollTop - (y - startY)
    }

    const stopPan = () => {
      isPanning = false
      container.style.cursor = "grab"
    }

    container.addEventListener("mousedown", mouseDownHandler)
    container.addEventListener("mousemove", mouseMoveHandler)
    container.addEventListener("mouseup", stopPan)
    container.addEventListener("mouseleave", stopPan)

    return () => {
      container.removeEventListener("mousedown", mouseDownHandler)
      container.removeEventListener("mousemove", mouseMoveHandler)
      container.removeEventListener("mouseup", stopPan)
      container.removeEventListener("mouseleave", stopPan)
    }
  }, [])

  // Auto-scroll to center
  useEffect(() => {
    const container = chartContainerRef.current
    if (container) {
      container.scrollLeft = (container.scrollWidth - container.clientWidth) / 2
      container.scrollTop = 0
    }
  }, [])

  const visibleEmployees = getVisibleEmployees()

  return (
    <div className="min-h-screen">
      <div className="container mx-auto py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="mb-1 text-3xl font-bold" style={{...FONTS.header}}>Organization Chart</h1>
            <p className="!text-gray-600" style={{...FONTS.paragraph}}>Manage your company structure</p>
          </div>
          <button
            onClick={openAddForm}
            className="bg-[#006666] text-white px-4 py-2 rounded-md font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Employee</span>
          </button>
        </div>

        {/* Stats */}
        <div className="mb-2 rounded-2xl shadow-2xl backdrop-blur-md p-8 bg-white">
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
                    <span key={dept} className={`px-4 py-2 ${colors[index]} rounded-full text-sm font-bold`}>
                      {dept}
                    </span>
                  )
                })}
            </div>
          </div>
        </div>

        {/* Org Chart Zoomable Container */}
        <div className="rounded-2xl shadow-2xl border-0 backdrop-blur-lg overflow-hidden bg-white">
          <div
            ref={chartContainerRef}
            className="p-2 overflow-auto"
            style={{ width: "100%", height: "600px", cursor: "grab" }}
          >
            <div id="org-chart-wrapper" className="inline-block" style={{ transformOrigin: "top left" }} data-scale="1">
              <OrgChart
                employees={visibleEmployees}
                allEmployees={employees}
                expandedNodes={expandedNodes}
                onToggleExpansion={toggleNodeExpansion}
                hasChildren={hasChildren}
                onEdit={openEditForm}
                onDelete={handleDeleteEmployee}
                onAddChild={openAddChildForm}
              />
            </div>
          </div>
        </div>

        {/* Modal Form */}
        <Modal
          isOpen={isFormOpen}
          onClose={closeForm}
          title={
            editingEmployee
              ? "Edit Employee"
              : addingChildTo
                ? `Add Employee under ${addingChildTo.name}`
                : "Add New Employee"
          }
        >
          <EmployeeForm
            employee={editingEmployee}
            employees={employees}
            parentEmployee={addingChildTo}
            onSubmit={editingEmployee ? handleEditEmployee : handleAddEmployee}
            onCancel={closeForm}
          />
        </Modal>
      </div>
    </div>
  )
}
