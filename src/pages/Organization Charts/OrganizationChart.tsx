// "use client"

import { useState } from "react"
import type { Employee, EmployeeFormData } from "../../components/OrganizationChart/employee"
import { OrgChart } from "../../components/OrganizationChart/org-chart"
import { EmployeeForm } from "../../components/OrganizationChart/employee-form"
import { Modal } from "../../components/OrganizationChart/modal"
import { Plus, Users } from "lucide-react"

// Sample initial data
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

  const handleAddEmployee = (employeeData: EmployeeFormData) => {
    const newEmployee: Employee = {
      ...employeeData,
      id: Date.now().toString(),
      avatar: "/placeholder.svg?height=64&width=64",
    }
    setEmployees([...employees, newEmployee])
    setIsFormOpen(false)
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
  }

  const openEditForm = (employee: Employee) => {
    setEditingEmployee(employee)
    setIsFormOpen(true)
  }

  const openAddForm = () => {
    setEditingEmployee(null)
    setIsFormOpen(true)
  }

  const closeForm = () => {
    setEditingEmployee(null)
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
          if (level > 10) break // Prevent infinite loop
        }
        return level
      }),
    ) + 1

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header Card */}
        <div className="mb-8 rounded-2xl shadow-2xl border-0 backdrop-blur-lg overflow-hidden">
          {/* Header Section with Gradient */}
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-8">
            <div className="flex items-center justify-between">
              {/* Title Section */}
              <div className="flex items-center space-x-6">
                <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm shadow-lg">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-black tracking-tight mb-2">Organization Chart</h1>
                  <p className="text-blue-100 text-lg font-medium">Manage your company structure</p>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={openAddForm}
                className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-xl font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-3"
              >
                <Plus className="w-5 h-5" />
                <span>Add Employee</span>
              </button>
            </div>
          </div>

          {/* Stats Section */}
          <div className="p-8 bg-gradient-to-r from-white to-gray-50">
            <div className="flex items-center justify-between">
              {/* Statistics */}
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

              {/* Department Tags */}
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
        </div>

        {/* Main Chart Container */}
        <div className="rounded-2xl shadow-2xl border-0 bg-white/90 backdrop-blur-lg overflow-hidden">
          <div className="p-12">
            <OrgChart employees={employees} onEdit={openEditForm} onDelete={handleDeleteEmployee} />
          </div>
        </div>

        {/* Modal */}
        <Modal isOpen={isFormOpen} onClose={closeForm} title={editingEmployee ? "Edit Employee" : "Add New Employee"}>
          <EmployeeForm
            employee={editingEmployee}
            employees={employees}
            onSubmit={editingEmployee ? handleEditEmployee : handleAddEmployee}
            onCancel={closeForm}
          />
        </Modal>
      </div>
    </div>
  )
}
// import React, { useState } from 'react';
// import { Tree, TreeNode } from 'react-organizational-chart';
// import { PlusIcon, UserIcon, UsersIcon, ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
// import type { JSX } from 'react/jsx-runtime';

// type PositionType = 'manager' | 'team-lead' | 'member' | 'other';

// interface Employee {
//   id: string;
//   name: string;
//   position: string;
//   type: 'employee';
//   positionType: PositionType;
// }

// interface Department {
//   id: string;
//   name: string;
//   type: 'department' | 'team';
//   children: (Department | Employee)[];
//   expanded?: boolean;
// }

// const initialData: Department = {
//   id: '1',
//   name: 'SQLS SENSATION',
//   type: 'department',
//   expanded: true,
//   children: [
//     {
//       id: '2',
//       name: 'Development Department',
//       type: 'department',
//       expanded: false,
//       children: [
//         {
//           id: 'e1',
//           name: 'Rajesh Kumar',
//           position: 'Development Manager',
//           type: 'employee',
//           positionType: 'manager'
//         },
//         {
//           id: '3',
//           name: 'Frontend Team',
//           type: 'team',
//           expanded: false,
//           children: [
//             {
//               id: 'e2',
//               name: 'Priya Sharma',
//               position: 'Frontend TL',
//               type: 'employee',
//               positionType: 'team-lead'
//             },
//             {
//               id: 'e3',
//               name: 'Amit Patel',
//               position: 'React Developer',
//               type: 'employee',
//               positionType: 'member'
//             },
//             {
//               id: 'e4',
//               name: 'Neha Gupta',
//               position: 'UI Developer',
//               type: 'employee',
//               positionType: 'member'
//             }
//           ]
//         },
//         {
//           id: '4',
//           name: 'Backend Team',
//           type: 'team',
//           expanded: false,
//           children: [
//             {
//               id: 'e5',
//               name: 'Sanjay Verma',
//               position: 'Backend TL',
//               type: 'employee',
//               positionType: 'team-lead'
//             },
//             {
//               id: 'e6',
//               name: 'Deepak Singh',
//               position: 'Node.js Developer',
//               type: 'employee',
//               positionType: 'member'
//             }
//           ]
//         }
//       ]
//     },
//     {
//       id: '5',
//       name: 'Sales Department',
//       type: 'department',
//       expanded: false,
//       children: [
//         {
//           id: 'e7',
//           name: 'Anjali Mehta',
//           position: 'Sales Manager',
//           type: 'employee',
//           positionType: 'manager'
//         },
//         {
//           id: '6',
//           name: 'North Region',
//           type: 'team',
//           expanded: false,
//           children: [
//             {
//               id: 'e8',
//               name: 'Vikram Joshi',
//               position: 'Regional TL',
//               type: 'employee',
//               positionType: 'team-lead'
//             },
//             {
//               id: 'e9',
//               name: 'Rahul Nair',
//               position: 'Sales Executive',
//               type: 'employee',
//               positionType: 'member'
//             }
//           ]
//         }
//       ]
//     }
//   ]
// };

// const positionStyles: Record<PositionType, string> = {
//   'manager': 'bg-blue-100 border-blue-300 text-blue-800',
//   'team-lead': 'bg-green-100 border-green-300 text-green-800',
//   'member': 'bg-purple-100 border-purple-300 text-purple-800',
//   'other': 'bg-gray-100 border-gray-300 text-gray-800'
// };

// const positionIcons: Record<PositionType, JSX.Element> = {
//   'manager': <UsersIcon className="h-5 w-5 text-blue-600 mr-2" />,
//   'team-lead': <UserIcon className="h-5 w-5 text-green-600 mr-2" />,
//   'member': <UserIcon className="h-5 w-5 text-purple-600 mr-2" />,
//   'other': <UserIcon className="h-5 w-5 text-gray-600 mr-2" />
// };

// const DepartmentNode: React.FC<{
//   data: Department;
//   onAdd: (parentId: string, node: Department | Employee) => void;
//   onToggleExpand: (id: string) => void;
// }> = ({ data, onAdd, onToggleExpand }) => {
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false);

//   const handleAdd = (newNode: { name: string; type: 'department' | 'team' | 'employee'; position?: string; positionType?: PositionType }) => {
//     if (newNode.type === 'employee') {
//       onAdd(data.id, {
//         id: `e${Math.floor(Math.random() * 10000)}`,
//         name: newNode.name,
//         position: newNode.position || '',
//         type: 'employee',
//         positionType: newNode.positionType || 'other'
//       });
//     } else {
//       onAdd(data.id, {
//         id: `${Math.floor(Math.random() * 10000)}`,
//         name: newNode.name,
//         type: newNode.type,
//         children: [],
//         expanded: false
//       });
//     }
//   };

//   const toggleExpand = () => {
//     onToggleExpand(data.id);
//   };

//   return (
//     <>
//       <div className={`bg-white border rounded-lg p-3 shadow-sm flex flex-col items-center relative group ${data.type === 'department' ? 'border-blue-200' : 'border-green-200'}`}>
//         <div className="flex items-center mb-1 w-full">
//           {data.children.length > 0 && (
//             <button onClick={toggleExpand} className="mr-2 text-gray-500 hover:text-gray-700">
//               {data.expanded ? (
//                 <ChevronDownIcon className="h-4 w-4" />
//               ) : (
//                 <ChevronRightIcon className="h-4 w-4" />
//               )}
//             </button>
//           )}
//           <div className="flex items-center flex-grow">
//             {data.type === 'department' ? (
//               <UsersIcon className="h-5 w-5 text-blue-600 mr-2" />
//             ) : (
//               <UserIcon className="h-5 w-5 text-green-600 mr-2" />
//             )}
//             <h3 className="font-semibold text-gray-800">{data.name}</h3>
//           </div>
//           <button
//             onClick={() => setIsAddModalOpen(true)}
//             className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
//             title="Add"
//           >
//             <PlusIcon className="h-4 w-4" />
//           </button>
//         </div>
//         <p className="text-xs text-gray-500 self-start ml-7">
//           {data.type === 'department' ? 'Department' : 'Team'} • {data.children.length} members
//         </p>
//       </div>

//       {isAddModalOpen && (
//         <AddNodeModal
//           isOpen={isAddModalOpen}
//           onClose={() => setIsAddModalOpen(false)}
//           onSubmit={handleAdd}
//           parentType={data.type}
//         />
//       )}

//       {data.expanded && data.children.map((child) => (
//         <TreeNode
//           key={child.id}
//           label={
//             child.type === 'employee' ? (
//               <EmployeeNode data={child} />
//             ) : (
//               <DepartmentNode
//                 data={child}
//                 onAdd={onAdd}
//                 onToggleExpand={onToggleExpand}
//               />
//             )
//           }
//         />
//       ))}
//     </>
//   );
// };

// const EmployeeNode: React.FC<{ data: Employee }> = ({ data }) => {
//   return (
//     <div className={`border rounded-lg p-3 shadow-sm flex flex-col items-center ${positionStyles[data.positionType]}`}>
//       <div className="flex items-center mb-1">
//         {positionIcons[data.positionType]}
//         <h3 className="font-medium">{data.name}</h3>
//       </div>
//       <p className="text-xs">{data.position}</p>
//     </div>
//   );
// };

// const AddNodeModal: React.FC<{
//   isOpen: boolean;
//   onClose: () => void;
//   onSubmit: (data: { name: string; type: 'department' | 'team' | 'employee'; position?: string; positionType?: PositionType }) => void;
//   parentType?: 'department' | 'team';
// }> = ({ isOpen, onClose, onSubmit, parentType }) => {
//   const [name, setName] = useState('');
//   const [type, setType] = useState<'department' | 'team' | 'employee'>('employee');
//   const [position, setPosition] = useState('');
//   const [positionType, setPositionType] = useState<PositionType>('other');

//   if (!isOpen) return null;

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSubmit({ name, type, position: type === 'employee' ? position : undefined, positionType });
//     setName('');
//     setPosition('');
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//         <h2 className="text-xl font-bold mb-4">Add New {type.charAt(0).toUpperCase() + type.slice(1)}</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
//             <input
//               type="text"
//               className="w-full p-2 border border-gray-300 rounded"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//           </div>

//           {parentType && (
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
//               <select
//                 className="w-full p-2 border border-gray-300 rounded"
//                 value={type}
//                 onChange={(e) => setType(e.target.value as 'department' | 'team' | 'employee')}
//               >
//                 {parentType === 'department' && (
//                   <>
//                     <option value="department">Sub-department</option>
//                     <option value="team">Team</option>
//                   </>
//                 )}
//                 <option value="employee">Employee</option>
//               </select>
//             </div>
//           )}

//           {type === 'employee' && (
//             <>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
//                 <input
//                   type="text"
//                   className="w-full p-2 border border-gray-300 rounded"
//                   value={position}
//                   onChange={(e) => setPosition(e.target.value)}
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Position Type</label>
//                 <select
//                   className="w-full p-2 border border-gray-300 rounded"
//                   value={positionType}
//                   onChange={(e) => setPositionType(e.target.value as PositionType)}
//                 >
//                   <option value="manager">Manager</option>
//                   <option value="team-lead">Team Lead</option>
//                   <option value="member">Team Member</option>
//                   <option value="other">Other</option>
//                 </select>
//               </div>
//             </>
//           )}

//           <div className="flex justify-end space-x-2">
//             <button
//               type="button"
//               className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
//               onClick={onClose}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//             >
//               Add
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// const OrganizationChart: React.FC = () => {
//   const [data, setData] = useState<Department>(initialData);

//   const handleAddNode = (parentId: string, newNode: Department | Employee) => {
//     const updateTree = (node: Department): Department => {
//       if (node.id === parentId) {
//         return {
//           ...node,
//           children: [...node.children, newNode],
//         };
//       }

//       return {
//         ...node,
//         children: node.children.map((child) =>
//           child.type !== 'employee' ? updateTree(child as Department) : child
//         ),
//       };
//     };

//     setData(updateTree(data));
//   };

//   const handleToggleExpand = (id: string) => {
//     const updateTree = (node: Department): Department => {
//       if (node.id === id) {
//         return {
//           ...node,
//           expanded: !node.expanded,
//         };
//       }

//       return {
//         ...node,
//         children: node.children.map((child) =>
//           child.type !== 'employee' ? updateTree(child as Department) : child
//         ),
//       };
//     };

//     setData(updateTree(data));
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-2xl font-bold text-gray-800 mb-6">Company Organizational Chart</h1>
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <Tree
//             lineWidth="2px"
//             lineColor="#93c5fd"
//             lineBorderRadius="10px"
//             label={
//               <div className="bg-white border border-blue-300 rounded-lg p-4 shadow-md flex flex-col items-center">
//                 <div className="flex items-center mb-2">
//                   <UsersIcon className="h-6 w-6 text-blue-600 mr-2" />
//                   <h2 className="text-xl font-bold text-gray-800">{data.name}</h2>
//                 </div>
//                 <p className="text-sm text-gray-500">Root Organization</p>
//               </div>
//             }
//           >
//             {data.children.map((child) =>
//               child.type === 'employee' ? (
//                 <TreeNode key={child.id} label={<EmployeeNode data={child} />} />
//               ) : (
//                 <TreeNode
//                   key={child.id}
//                   label={
//                     <DepartmentNode
//                       data={child as Department}
//                       onAdd={handleAddNode}
//                       onToggleExpand={handleToggleExpand}
//                     />
//                   }
//                 />
//               )
//             )}
//           </Tree>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrganizationChart;