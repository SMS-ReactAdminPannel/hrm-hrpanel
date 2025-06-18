export interface Department {
  id: string;
  title: "Engineering" | "Marketing" | "HR" | "Finance" | "Operations";
}
export interface JobTitle  {
  id: string;
  department: "Manager" | "Developer" | "Designer" | "Analyst" | "Specialist";
}
export interface EmploymentType {
  id: string;
  title: "Full-time" | "Part-time" | "Contract" | "Intern"
}



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

export interface Employeenew {
  id: string
  name: string
  email: string
  department: Department
  jobTitle: JobTitle
  employmentType: EmploymentType
}

