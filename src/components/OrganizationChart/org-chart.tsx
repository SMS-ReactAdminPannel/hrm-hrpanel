import { useMemo, useState } from "react"
import type { Employee, EmployeeNode } from "./employee"
import { EmployeeCard } from "./employee-card"
import { Building2 } from "lucide-react"

interface OrgChartProps {
  employees: Employee[]
  onEdit: (employee: Employee) => void
  onDelete: (employeeId: string) => void
}

export function OrgChart({ employees, onEdit, onDelete }: OrgChartProps) {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set())
  const [activeSubBranch, setActiveSubBranch] = useState<string | null>(null)

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

  const findNodeById = (nodes: EmployeeNode[], id: string): EmployeeNode | null => {
    for (const node of nodes) {
      if (node.id === id) return node
      const found = findNodeById(node.children, id)
      if (found) return found
    }
    return null
  }

  const findAllNodes = (nodes: EmployeeNode[]): EmployeeNode[] => {
    const allNodes: EmployeeNode[] = []
    const traverse = (nodeList: EmployeeNode[]) => {
      for (const node of nodeList) {
        allNodes.push(node)
        traverse(node.children)
      }
    }
    traverse(nodes)
    return allNodes
  }

  const collapseNodeAndDescendants = (nodeId: string, expandedSet: Set<string>) => {
    expandedSet.delete(nodeId)
    const allNodes = findAllNodes(organizationTree)
    const node = allNodes.find(n => n.id === nodeId)
    if (node) {
      node.children.forEach(child => {
        collapseNodeAndDescendants(child.id, expandedSet)
      })
    }
  }

  const toggleNodeExpansion = (nodeId: string, parentId?: string) => {
    setExpandedNodes(prev => {
      const newExpanded = new Set(prev)
      
      if (newExpanded.has(nodeId)) {
        // Collapse this node and all its descendants
        collapseNodeAndDescendants(nodeId, newExpanded)
        if (activeSubBranch === nodeId) {
          setActiveSubBranch(null)
        }
      } else {
        // Find all siblings and collapse them
        const allNodes = findAllNodes(organizationTree)
        
        if (parentId) {
          // Find siblings under the same parent
          const parent = allNodes.find(n => n.id === parentId)
          if (parent) {
            parent.children.forEach(sibling => {
              if (sibling.id !== nodeId) {
                collapseNodeAndDescendants(sibling.id, newExpanded)
              }
            })
          }
        } else {
          // This is a root node - collapse all other root nodes
          organizationTree.forEach(rootNode => {
            if (rootNode.id !== nodeId) {
              collapseNodeAndDescendants(rootNode.id, newExpanded)
            }
          })
        }
        
        // Expand the clicked node
        newExpanded.add(nodeId)
        setActiveSubBranch(nodeId)
      }
      
      return newExpanded
    })
  }

  const renderNode = (node: EmployeeNode, level = 0, parentId?: string) => {
    const isExpanded = expandedNodes.has(node.id)
    const hasChildren = node.children.length > 0
    const showChildren = isExpanded && hasChildren
    return (
      <div key={node.id} className="flex flex-col items-center animate-fadeIn">
        <div 
          onClick={() => hasChildren && toggleNodeExpansion(node.id, parentId)}
          className={hasChildren ? "cursor-pointer" : ""}
        >
          <EmployeeCard 
            employee={node} 
            onEdit={onEdit} 
            onDelete={onDelete} 
            level={level}
            isExpanded={isExpanded}
            hasChildren={hasChildren}
          />
        </div>

        {showChildren && (
          <div className="relative mt-8">
            {/* Vertical line from parent to horizontal connector */}
            <div className="absolute top-0 left-1/2 w-0.5 h-8 bg-gray-400 transform -translate-x-1/2"></div>
            
            {/* Horizontal connector line (only if multiple children) */}
            {node.children.length > 1 && (
              <div 
                className="absolute top-8 h-0.5 bg-gray-400"
                style={{
                  left: `${(1 / node.children.length) * 50}%`,
                  right: `${(1 / node.children.length) * 50}%`,
                }}
              ></div>
            )}

            {/* Children container */}
            <div className="flex justify-center items-start gap-12 pt-8">
              {node.children.map((child, index) => (
                <div key={child.id} className="relative flex flex-col items-center">
                  {/* Vertical line from horizontal connector to child */}
                  <div className="absolute top-0 left-1/2 w-0.5 h-8 bg-gray-400 transform -translate-x-1/2 -translate-y-8"></div>
                  {renderNode(child, level + 1, node.id)}
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
      <div className="min-w-max py-8 px-8">
        {organizationTree.map((node) => renderNode(node, 0, undefined))}
      </div>
    </div>
  )
}