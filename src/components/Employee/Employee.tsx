
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

export interface Department {
  title: "Engineering" | "Marketing" | "HR" | "Finance" | "Operations";
}
export interface JobTitle {
  department: "Manager" | "Developer" | "Designer" | "Analyst" | "Specialist";
}
export interface EmploymentType {
  title: "Full-time" | "Part-time" | "Contract" | "Intern";
}

export interface PersonalInfo {
  name: string;
  position: string;
  employeeId: string;
  joinDate: string;
  phone: string;
  email: string;
  birthday: string;
  address: string;
  gender: string;
  profileImage: File | null;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  email: string;
  address: string;
}

export interface EmergencyInfo {
  primary: EmergencyContact;
  secondary: EmergencyContact;
}

export interface EducationItem {
  instituteName: string;
  degree: string;
  startDate: string;
  endDate: string;
}

export interface BankInfo {
  holderName: string;
  accountNumber: string;
  bankName: string;
  branchName: string;
  swiftCode: string;
}

export interface PassportInfo {
  number: string;
  nationality: string;
  issueDate: string;
  expiryDate: string;
}

export interface ProfileData {
  personal: PersonalInfo;
  emergency: EmergencyInfo;
  education: EducationItem[];
  experience: string[];
  bank: BankInfo;
  passport: PassportInfo;
  department: Department["title"];
  jobTitle: JobTitle["department"];
  employmentType: EmploymentType["title"];
}
