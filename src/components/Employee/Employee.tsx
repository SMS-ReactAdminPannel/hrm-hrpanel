export interface Department {

  title: "Engineering" | "Marketing" | "HR" | "Finance" | "Operations";
}
export interface JobTitle  {
  
  department: "Manager" | "Developer" | "Designer" | "Analyst" | "Specialist";
}
export interface EmploymentType {
  
  title: "Full-time" | "Part-time" | "Contract" | "Intern";
}



export interface Employee {
  id: string
  name: string
  email: string
  contactNumber: string
  department: string
  jobTitle: string
  hireDate: string
  employmentType: string
}

export interface WorkModeData {
  name: string
  value: number
}

export interface Employeenew {
  id: string
  name: string
  email: string
  department: string
  jobTitle: string
  employmentType: string
}

