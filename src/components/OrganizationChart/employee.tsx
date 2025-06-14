export interface Employee {
  id: string
  name: string
  position: string
  department: string
  email: string
  phone: string
  managerId: string | null
  avatar: string
}

export interface EmployeeFormData {
  name: string
  position: string
  department: string
  email: string
  phone: string
  managerId: string | null
}

export interface EmployeeNode extends Employee {
  children: EmployeeNode[]
}