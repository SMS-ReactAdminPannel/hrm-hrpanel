import type React from "react"
import { useState } from "react"
import type { Employee, FormData } from "../../../components/EmployeeShift/employee"
import EmployeeShiftHeader from "../../../components/EmployeeShift/ShiftHeader"
import EmployeeShiftTable from "../../../components/EmployeeShift/ShiftTable"
import AssignShiftModal from "../../../components/EmployeeShift/ShiftModel"
import EditShiftModal from "../../../components/EmployeeShift/EditShiftModel"
import DeleteConfirmationModal from "../../../components/EmployeeShift/DeleteConfirmationModel"

const RotatingShiftAssign: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(null)
  const [employeeToEdit, setEmployeeToEdit] = useState<Employee | null>(null)
  const [groupBy, setGroupBy] = useState<string | null>(null)
  const [showGroupFilter, setShowGroupFilter] = useState(false)

  const [formData, setFormData] = useState<FormData>({
    employee: "",
    title: "",
    basedOn: "After",
    rotate: "",
    startDate: "",
    currentShift: "",
    nextShift: "",
  })

  const employees: Employee[] = [
    {
      id: "1",
      name: "Ruben Mani",
      employeeId: "(rub123)",
      title: "Morning to Night",
      department: "Production",
      jobRole: "Operator",
      reportingManager: "John Doe",
      basedOn: "After",
      rotate: "Rotate after 5 days",
      startDate: "May. 29, 2025",
      currentShift: "Night shift",
      nextShift: "Morning",
      nextSwitch: "Jun. 3, 2025",
    },
    {
      id: "2",
      name: "Bessie Williams",
      employeeId: "(NF10104)",
      title: "Night to Morning",
      department: "Maintenance",
      jobRole: "Technician",
      reportingManager: "Jane Smith",
      basedOn: "Weekend",
      rotate: "Weekly every monday",
      startDate: "Jun. 6, 2025",
      currentShift: "None",
      nextShift: "Night",
      nextSwitch: "Jun. 9, 2025",
    },
    {
      id: "3",
      name: "Gabriel Phillips",
      employeeId: "(PEP42)",
      title: "Morning to Night",
      department: "Production",
      jobRole: "Supervisor",
      reportingManager: "John Doe",
      basedOn: "After",
      rotate: "Rotate after 7 days",
      startDate: "May. 16, 2025",
      currentShift: "Regular Shift",
      nextShift: "Night",
      nextSwitch: "May. 23, 2025",
    },
    {
      id: "4",
      name: "Ganapathi Bobbili",
      employeeId: "(UB001aaaaaaa)",
      title: "Morning to Night",
      department: "Quality Control",
      jobRole: "Inspector",
      reportingManager: "Robert Johnson",
      basedOn: "Weekend",
      rotate: "Weekly every friday",
      startDate: "May. 11, 2025",
      currentShift: "Regular Shift",
      nextShift: "Morning",
      nextSwitch: "May. 16, 2025",
    },
    {
      id: "5",
      name: "Mangwana Benejeur",
      employeeId: "(95632)",
      title: "Night to Morning",
      department: "Production",
      jobRole: "Operator",
      reportingManager: "John Doe",
      basedOn: "Weekend",
      rotate: "Weekly every monday",
      startDate: "May. 7, 2025",
      currentShift: "Morning Shift",
      nextShift: "Night",
      nextSwitch: "May. 12, 2025",
    },
  ]

  const filteredEmployees = employees.filter((employee) => {
    if (searchTerm === "") {
      return true
    }
    return (
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    setIsAssignModalOpen(false)
    setFormData({
      employee: "",
      title: "",
      basedOn: "After",
      rotate: "",
      startDate: "",
      currentShift: "",
      nextShift: "",
    })
  }

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Edit submitted for:", employeeToEdit?.id, formData)
    setIsEditModalOpen(false)
  }

  const handleDelete = () => {
    console.log("Deleting employee:", employeeToDelete?.id)
    setIsDeleteModalOpen(false)
    setEmployeeToDelete(null)
  }

  const openEditModal = (employee: Employee) => {
    setEmployeeToEdit(employee)
    setFormData({
      employee: employee.name,
      title: employee.title,
      basedOn: employee.basedOn,
      rotate: employee.rotate,
      startDate: employee.startDate,
      currentShift: employee.currentShift,
      nextShift: employee.nextShift,
    })
    setIsEditModalOpen(true)
  }

  const openDeleteModal = (employee: Employee) => {
    setEmployeeToDelete(employee)
    setIsDeleteModalOpen(true)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <EmployeeShiftHeader
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        groupBy={groupBy}
        onGroupByChange={setGroupBy}
        showGroupFilter={showGroupFilter}
        onShowGroupFilterChange={setShowGroupFilter}
        onAssignClick={() => setIsAssignModalOpen(true)}
      />

      <EmployeeShiftTable
        employees={filteredEmployees}
        groupBy={groupBy}
        onEditEmployee={openEditModal}
        onDeleteEmployee={openDeleteModal}
      />

      <AssignShiftModal
        isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        formData={formData}
        onFormDataChange={setFormData}
        onSubmit={handleSubmit}
      />

      <EditShiftModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        employee={employeeToEdit}
        formData={formData}
        onFormDataChange={setFormData}
        onSubmit={handleEditSubmit}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        employee={employeeToDelete}
        onConfirm={handleDelete}
      />
    </div>
  )
}

export default RotatingShiftAssign

