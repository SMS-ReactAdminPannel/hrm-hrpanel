import type { Employee } from "./employee"
import { EmployeeCard } from "./employee-card"

interface OrgChartProps {
  employees: Employee[]
  onEdit: (employee: Employee) => void
  onDelete: (employeeId: string) => void
}

type EmployeeWithChildren = Employee & { children: EmployeeWithChildren[] }

export function OrgChart({ employees, onEdit, onDelete }: OrgChartProps) {
  // Build hierarchy
  const buildHierarchy = (employees: Employee[]): EmployeeWithChildren[] => {
    const employeeMap = new Map(employees.map((emp) => [emp.id, { ...emp, children: [] as EmployeeWithChildren[] }]))
    const roots: EmployeeWithChildren[] = []

    employees.forEach((emp) => {
      const employee = employeeMap.get(emp.id)!
      if (emp.managerId) {
        const manager = employeeMap.get(emp.managerId)
        if (manager) {
          manager.children.push(employee)
        }
      } else {
        roots.push(employee)
      }
    })

    return roots
  }

  const hierarchy = buildHierarchy(employees)

  const renderEmployee = (employee: EmployeeWithChildren, level = 0) => {
    const hasChildren = employee.children.length > 0

    return (
      <div key={employee.id} className="flex flex-col items-center">
        {/* Employee Card */}
        <div className="relative">
          <EmployeeCard employee={employee} onEdit={() => onEdit(employee)} onDelete={() => onDelete(employee.id)} />

          {/* Vertical line down from employee (if has children) */}
          {hasChildren && (
            <div className="absolute left-1/2 transform -translate-x-1/2 top-full w-1 h-8 bg-blue-700 bg-gradient-to-b from-blue-500 to-blue-600 shadow-lg"></div>
          )}
        </div>

        {/* Children Container */}
        {hasChildren && (
          <div className="relative mt-8">
            {/* Horizontal line connecting all children */}
            {employee.children.length > 1 && (
              <div className="absolute top-0 left-0 right-0 h-1  bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 shadow-lg transform -translate-y-4"></div>
            )}

            {/* Children Grid */}
            <div className="flex gap-12 items-start">
              {employee.children.map((child, index) => (
                <div key={child.id} className="relative">
                  {/* Vertical line up to horizontal connector */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 -top-4 w-1 h-4 bg-gradient-to-b from-blue-500 to-blue-600 shadow-lg"></div>

                  {/* Render child and their subtree */}
                  {renderEmployee(child, level + 1)}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="p-8 overflow-auto">
      <div className="flex flex-col items-center space-y-12">{hierarchy.map((root) => renderEmployee(root))}</div>
    </div>
  )
}
