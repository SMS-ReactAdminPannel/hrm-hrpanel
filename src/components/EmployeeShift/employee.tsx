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
  category: string
  jobRole: string;
}
