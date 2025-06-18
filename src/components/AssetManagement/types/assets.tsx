export interface Asset {
  id: string
  name: string
  assignedTo: string
  category: string
  serialNumber: string
  status: "active" | "maintenance" | "returned"
  dateAdded: string
}

export interface Employee {
  id: string
  name: string
  email: string
  department: string
  position: string
  phone: string
  startDate: string
  manager: string
}
