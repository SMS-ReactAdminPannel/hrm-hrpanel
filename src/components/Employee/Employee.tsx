export type Department = "Engineering" | "Marketing" | "HR" | "Finance" | "Operations"
export type SubDepartment = {
  [key in Department]: string[]
}

export const SUB_DEPARTMENTS: SubDepartment = {
  "Engineering": ["Frontend", "Backend", "DevOps", "QA", "Mobile"],
  "Marketing": ["Digital", "Content", "SEO", "Social Media"],
  "HR": ["Recruitment", "Training", "Compensation", "Employee Relations"],
  "Finance": ["Accounting", "Tax", "Audit", "Treasury"],
  "Operations": ["Logistics", "Facilities", "Supply Chain"]
}

export type JobTitle = "Manager" | "Developer" | "Designer" | "Analyst" | "Specialist"
export type EmploymentType = "Full-time" | "Part-time" | "Contract" | "Intern"

export interface Employee {
  id: string
  name: string
  email: string
  contactNumber: string
  department: Department
  
  jobTitle: JobTitle
  hireDate: string
  employmentType: EmploymentType
  subDepartment: string
}

export interface WorkModeData {
  name: string
  value: number
}