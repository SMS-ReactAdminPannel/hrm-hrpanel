"use client"

import type React from "react"
import { EmployeeCard } from "./employee-card"
import type { Employee } from "./employee"
import { ChevronDown, ChevronUp } from "lucide-react"

interface OrgChartProps {
  employees: Employee[]
  allEmployees: Employee[]
  expandedNodes: Set<string>
  onToggleExpansion: (nodeId: string) => void
  hasChildren: (employeeId: string) => boolean
  onEdit: (employee: Employee) => void
  onDelete: (employeeId: string) => void
  onAddChild: (employee: Employee) => void
}

export function OrgChart({
  employees,
  allEmployees,
  expandedNodes,
  onToggleExpansion,
  hasChildren,
  onEdit,
  onDelete,
  onAddChild,
}: OrgChartProps) {
  const buildHierarchy = (parentId: string | null): Employee[] => {
    return employees.filter((emp) => emp.managerId === parentId).sort((a, b) => a.name.localeCompare(b.name))
  }

  const renderEmployee = (employee: Employee, level = 0): React.ReactNode => {
    const children = buildHierarchy(employee.id)
    const hasChildrenInAll = hasChildren(employee.id)
    const isExpanded = expandedNodes.has(employee.id)

    return (
      <div key={employee.id} className="flex flex-col items-center">
        <div className="relative">
          <EmployeeCard
            employee={employee}
            onEdit={() => onEdit(employee)}
            onDelete={() => onDelete(employee.id)}
            onAddChild={() => onAddChild(employee)}
          />

          {/* Expansion Arrow */}
          {hasChildrenInAll && (
            <button
              onClick={() => onToggleExpansion(employee.id)}
              className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-white border-2 border-gray-300 rounded-full p-1 hover:bg-gray-50 transition-colors shadow-sm z-10"
              title={isExpanded ? "Collapse" : "Expand"}
            >
              {isExpanded ? (
                <ChevronUp className="w-4 h-4 text-gray-600" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-600" />
              )}
            </button>
          )}
        </div>

        {/* Connection Line */}
        {children.length > 0 && <div className="w-px h-8 bg-gray-700 mt-3"></div>}

        {/* Children */}
        {children.length > 0 && (
          <div className="flex flex-col items-center">
            {/* Horizontal line */}
            <div className="w-full h-px bg-gray-700 relative">
              {children.length > 1 && <div className="absolute left-0 right-0 h-px bg-gray-700"></div>}
            </div>

            {/* Children container */}
            <div className="flex gap-8 mt-8">
              {children.map((child) => (
                <div key={child.id} className="flex flex-col items-center">
                  {/* Vertical line to child */}
                  <div className="w-px h-8 bg-gray-700 -mt-8"></div>
                  {renderEmployee(child, level + 1)}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  const rootEmployee = employees.find((emp) => emp.managerId === null)

  if (!rootEmployee) {
    return <div className="flex items-center justify-center h-64 text-gray-500">No employees found</div>
  }

  return <div className="p-8 min-w-max">{renderEmployee(rootEmployee)}</div>
}
