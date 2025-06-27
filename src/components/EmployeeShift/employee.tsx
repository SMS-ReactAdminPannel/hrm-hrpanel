export interface Employee {
  id: string
  name: string
  employeeId: string
  title: string
  basedOn: string
  rotate: string
  startDate: string
  currentShift: string
  nextShift: string
  nextSwitch: string
  department: string
  subDepartment:string
  jobRole: string
  reportingManager: string
  avatar?: string
}

export interface FormData {
  employee: string
  title: string
  basedOn: string
  rotate: string
  startDate: string
  currentShift: string
  nextShift: string
  department?: string
  subDepartment?:string
  category?: string      
  jobRole?: string        
}
