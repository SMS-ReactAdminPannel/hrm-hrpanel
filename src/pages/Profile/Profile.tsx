import type React from "react"
import { PersonalInfoComponent } from "../../components/Profile/Personal-Info"
import { EmergencyContactComponent } from "../../components/Profile/Emergency-Contact"
import { EducationComponent } from "../../components/Profile/Eduction"
import { ExperienceComponent } from "../../components/Profile/Experance"
import { BankInfoComponent } from "../../components/Profile/BankInfo"
import { PassportInfoComponent } from "../../components/Profile/Passport-Info"
import { CertificatesComponent } from "../../components/Profile/Certificate"
import { FONTS } from "../../constants/uiConstants"

interface PersonalInfo {
  name: string
  position: string
  employeeId: string
  joinDate: string
  phone: string
  email: string
  blood: string
  birthday: string
  address: string
  gender: string
  profileImage: string
}

interface EmergencyContact {
  name: string
  relationship: string
  phone: string
  email: string
  address: string
}

interface EmergencyInfo {
  primary: EmergencyContact
  secondary: EmergencyContact
}

interface EducationItem {
  instituteName: string
  degree: string
  startDate: string
  endDate: string
}

interface BankInfo {
  holderName: string
  accountNumber: string
  bankName: string
  branchName: string
  swiftCode: string
}

interface PassportInfo {
  number: string
  nationality: string
  state:string
  issueDate: string
  expiryDate: string
}

const Profile: React.FC = () => { 
  const personalData: PersonalInfo = {
    name: "Vijay",
    position: "UI/UX Design Team - Web Designer",
    employeeId: "MD-0001",
    joinDate: "05 Jan 2024",
    phone: "+1 (800) 642 7676",
    blood: "A+",
    email: "vijay@example.com",
    birthday: "28 December 1992",
    address: "102, ECR, Panaiyur, India",
    gender: "Male",
    profileImage: "https://pbs.twimg.com/profile_images/685700874434314240/80T5j3HF_400x400.jpg",
  }

  const emergencyData: EmergencyInfo = {
    primary: {
      name: "Chandrasekar",
      relationship: "Father",
      phone: "9876543210",
      email: "chandrasekar@example.com",
      address: "120, India",
    },
    secondary: {
      name: "Ganga",
      relationship: "Mother",
      phone: "9876543211",
      email: "ganga@example.com",
      address: "102, India",
    },
  }

  const educationData: EducationItem[] = [
    {
      instituteName: "Loyola College of Arts and Science",
      degree: "MSc In Computer Science",
      startDate: "2000",
      endDate: "2003",
    },
    {
      instituteName: "Loyola College of Arts and Science",
      degree: "BSc In Computer Science",
      startDate: "1997",
      endDate: "2000",
    },
    {
      instituteName: "National Public School",
      degree: "Computer Science",
      startDate: "1998",
      endDate: "2000",
    },
  ]

  const experienceData: string[] = [
    "TCS, India – Head of Review Team (2020 - Present)",
    "CTS, India – Software Developer (2016 - 2018)",
    "Facebook , India – Junior Software Developer (2011 - 2016)",
  ]

  const certificateData: string[] = [
    "Meta, Certified React developer course completed",
    "Google, Web Development course completed",
    "Coursera , completed full stack development (9 months)",
  ]

  const bankData: BankInfo = {
    holderName: "Vijay",
    accountNumber: "123456789",
    bankName: "ABC Bank",
    branchName: "XYZ Branch",
    swiftCode: "ABCXYZ123",
  }

  const passportData: PassportInfo = {
    number: "A1234567",
    nationality: "Indian",
    state:"Tamil Nadu",
    issueDate: "01 Jan 2010",
    expiryDate: "01 Jan 2025",
  }

  // Update handlers
  const handlePersonalUpdate = (data: PersonalInfo) => {
    console.log("Personal info updated:", data)
  }

  const handleEmergencyUpdate = (data: EmergencyInfo) => {
    console.log("Emergency contact updated:", data)
  }

  const handleEducationUpdate = (data: EducationItem[]) => {
    console.log("Education updated:", data)
  }

  const handleExperienceUpdate = (data: string[]) => {
    console.log("Experience updated:", data)
  }

  const handleBankUpdate = (data: BankInfo) => {
    console.log("Bank info updated:", data)
  }

  const handlePassportUpdate = (data: PassportInfo) => {
    console.log("Passport info updated:", data)
  }

  const handleCertificatesUpdate = (data: string[]) => {
    console.log("Certificates updated:", data)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-[#006666]/5 to-[#006666]/10 p-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-3">
        <div className="text-left">
          <h1 className="text-4xl font-bold leading-tight text-white bg-[#f5f5f5] bg-clip-text text-transparent mb-4" 
          style={{...FONTS.header}}>
            Employee Profile
          </h1>
        </div>

        {/* Personal Information & Emergency Contact */}
        <div className="flex flex-1 gap-4">
          <PersonalInfoComponent data={personalData} onUpdate={handlePersonalUpdate} />
          <EmergencyContactComponent data={emergencyData} onUpdate={handleEmergencyUpdate} />
        </div>

        {/* Education and Experience */}
        <div className="flex flex-1 gap-4">
          <EducationComponent data={educationData} onUpdate={handleEducationUpdate} />
          <ExperienceComponent data={experienceData} onUpdate={handleExperienceUpdate} />
        </div>

        <div className="">
        <CertificatesComponent data={certificateData} onUpdate={handleCertificatesUpdate} />
        
        </div>

        {/* Bank & Passport Information & Certificate */}
        <div className="flex flex-1 gap-4">
          <BankInfoComponent data={bankData} onUpdate={handleBankUpdate} />
          <PassportInfoComponent data={passportData} onUpdate={handlePassportUpdate} />
         
        </div>
      </div>
    </div>
  )
}

export default Profile