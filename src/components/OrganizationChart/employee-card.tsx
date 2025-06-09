import { useState } from "react"
import type { Employee } from "./employee"
import { Dropdown, DropdownItem } from "./dropdown"
import { AlertDialog } from "./alert-dialogue"
import { MoreVertical, Edit, Trash2, Mail, Phone } from "lucide-react"

interface EmployeeCardProps {
  employee: Employee
  onEdit: (employee: Employee) => void
  onDelete: (employeeId: string) => void
  level: number
}

export function EmployeeCard({ employee, onEdit, onDelete, level }: EmployeeCardProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const handleDelete = () => {
    onDelete(employee.id)
    setShowDeleteDialog(false)
  }

  const getLevelStyles = (level: number) => {
    const styles = [
      {
        card: "border-blue-200 bg-blue-50",
        badge: "bg-blue-100 text-blue-800",
        avatar: "bg-blue-500",
      },
      {
        card: "border-emerald-200 bg-emerald-50",
        badge: "bg-emerald-100 text-emerald-800",
        avatar: "bg-emerald-500",
      },
      {
        card: "border-purple-200 bg-purple-50",
        badge: "bg-purple-100 text-purple-800",
        avatar: "bg-purple-500",
      },
      {
        card: "border-amber-200 bg-amber-50",
        badge: "bg-amber-100 text-amber-800",
        avatar: "bg-amber-500",
      },
      {
        card: "border-rose-200 bg-rose-50",
        badge: "bg-rose-100 text-rose-800",
        avatar: "bg-rose-500",
      },
    ]
    return styles[level % styles.length]
  }

  const levelStyles = getLevelStyles(level)

  return (
    <>
      <div
        className={`w-full max-w-xs rounded-xl border-2 ${levelStyles.card} shadow-md hover:shadow-lg transition-all duration-300 group overflow-hidden`}
      >
        <div className="p-4">
          {/* Header with Avatar */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3 min-w-0">
              {/* Avatar Container */}
              <div className="relative flex-shrink-0">
                <div
                  className={`w-12 h-12 rounded-xl ${levelStyles.avatar} shadow-md ring-2 ring-white flex items-center justify-center overflow-hidden`}
                >
                  <span className="text-white font-bold text-lg">
                    {employee.name.charAt(0)}
                  </span>
                </div>
                {/* Status Indicator */}
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-400 border-2 border-white rounded-full shadow-sm"></div>
              </div>

              {/* Name & Position */}
              <div className="min-w-0">
                <h3 className="text-lg font-bold text-gray-900 truncate">{employee.name}</h3>
                <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide truncate">
                  {employee.position}
                </p>
              </div>
            </div>

            {/* Actions Menu */}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0">
              <Dropdown
                trigger={
                  <button className="w-8 h-8 rounded-lg bg-white hover:bg-gray-50 shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center">
                    <MoreVertical className="w-3.5 h-3.5 text-gray-600" />
                  </button>
                }
              >
                <DropdownItem onClick={() => onEdit(employee)} className="hover:bg-blue-50 rounded-lg">
                  <Edit className="h-3.5 w-3.5 mr-2 text-blue-600" />
                  <span className="text-sm font-medium">Edit</span>
                </DropdownItem>
                <DropdownItem
                  onClick={() => setShowDeleteDialog(true)}
                  className="text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 className="h-3.5 w-3.5 mr-2" />
                  <span className="text-sm font-medium">Delete</span>
                </DropdownItem>
              </Dropdown>
            </div>
          </div>

          {/* Department Badge - Now perfectly aligned */}
          <div className="mb-3 -mx-1">
            <span
              className={`inline-block w-full px-3 py-1 rounded-lg ${levelStyles.badge} text-xs font-bold uppercase tracking-wider shadow-xs truncate`}
            >
              {employee.department}
            </span>
          </div>

          {/* Contact Information */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 p-2 bg-white rounded-lg border border-gray-200">
              <Mail className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
              <span className="text-xs font-medium text-gray-700 truncate">{employee.email}</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-white rounded-lg border border-gray-200">
              <Phone className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
              <span className="text-xs font-medium text-gray-700 truncate">{employee.phone}</span>
            </div>
          </div>
        </div>
      </div>

      <AlertDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDelete}
        title="Delete Employee"
        description={`Are you sure you want to delete ${employee.name}? This action cannot be undone and will reassign their direct reports to their manager.`}
        confirmText="Delete Employee"
        cancelText="Cancel"
      />
    </>
  )
}