import { useMemo } from "react"
import type { Employee, EmployeeNode } from "./employe_interface"
import { EmployeeCard } from "./employee-card"
import { Building2 } from "lucide-react"

interface OrgChartProps {
  employees: Employee[]
  onEdit: (employee: Employee) => void
  onDelete: (employeeId: string) => void
}

export function OrgChart({ employees, onEdit, onDelete }: OrgChartProps) {
  const organizationTree = useMemo(() => {
    const buildTree = (managerId: string | null): EmployeeNode[] => {
      return employees
        .filter((emp) => emp.managerId === managerId)
        .map((emp) => ({
          ...emp,
          children: buildTree(emp.id),
        }))
        .sort((a, b) => a.name.localeCompare(b.name))
    }

    return buildTree(null)
  }, [employees])

  const renderNode = (node: EmployeeNode, level = 0) => {
    return (
      <div key={node.id} className="flex flex-col items-center animate-fadeIn">
        <EmployeeCard employee={node} onEdit={onEdit} onDelete={onDelete} level={level} />

        {node.children.length > 0 && (
          <div className="relative mt-10">
            <div className="absolute top-0 left-1/2 w-1 h-10 bg-gray-400 transform -translate-x-1/2 -translate-y-10 rounded-full"></div>

            
            {node.children.length > 1 && (
              <div className="absolute top-10 left-0 right-0 h-1 bg-gray-400 transform -translate-y-10 rounded-full"></div>
            )}

            <div className="flex justify-center gap-16 pt-10">
              {node.children.map((child, index) => (
                <div key={child.id} className="relative">
                  <div className="absolute top-0 left-1/2 w-1 h-10 bg-gray-400 transform -translate-x-1/2 -translate-y-10 rounded-full"></div>
                  {renderNode(child, level + 1)}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  if (organizationTree.length === 0) {
    return (
      <div className="text-center py-20">
        {/* Empty State Icon */}
        <div className="w-32 h-32 bg-gray-300 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg">
          <Building2 className="w-16 h-16 text-white" />
        </div>

        {/* Empty State Text */}
        <h3 className="text-2xl font-black text-gray-800 mb-4">No employees found</h3>
        <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
          Get started by adding your first employee to build your organization chart
        </p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto overflow-y-visible">
      <div className="min-w-max py-8">{organizationTree.map((node) => renderNode(node))}</div>
    </div>
  )
}
