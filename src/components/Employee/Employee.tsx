export type Department = "Engineering" | "Marketing" | "HR" | "Finance" | "Operations"
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
}

export interface WorkModeData {
  name: string
  value: number
}
