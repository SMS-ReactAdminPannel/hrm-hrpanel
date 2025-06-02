"use client"

import type React from "react"
import {User,Phone,Mail,MapPin,Calendar,Users,GraduationCap,Briefcase,CreditCard,FileText} from "lucide-react"

interface PersonalInfo {
  name: string
  position: string
  employeeId: string
  joinDate: string
  phone: string
  email: string
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
  issueDate: string
  expiryDate: string
}


interface ProfileData {
  personal: PersonalInfo
  emergency: EmergencyInfo
  education: EducationItem[]
  experience: string[]
  bank: BankInfo
  passport: PassportInfo
  
}

const Profile: React.FC = () => {
  const profileData: ProfileData = {
    personal: {
      name: "Vijay",
      position: "UI/UX Design Team - Web Designer",
      employeeId: "MD-0001",
      joinDate: "05 Jan 2024",
      phone: "+1 (800) 642 7676",
      email: "vijay@example.com",
      birthday: "28 December 1992",
      address: "102, ECR, Panaiyur, India",
      gender: "Male",
      profileImage: "https://pbs.twimg.com/profile_images/685700874434314240/80T5j3HF_400x400.jpg",
    },
    emergency: {
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
    },
    education: [
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
    ],
    experience: [
      "TCS, India – Head of Review Team (2020 - Present)",
      "CTS, India – Software Developer (2016 - 2018)",
      "Facebook , India – Junior Software Developer (2011 - 2016)",
    ],
    bank: {
      holderName: "Vijay",
      accountNumber: "123456789",
      bankName: "ABC Bank",
      branchName: "XYZ Branch",
      swiftCode: "ABCXYZ123",
    },
    passport: {
      number: "A1234567",
      nationality: "Indian",
      issueDate: "01 Jan 2010",
      expiryDate: "01 Jan 2025",
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-[#006666]/5 to-[#006666]/10 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-left">
          <h1 className="text-4xl font-black leading-tight bg-gradient-to-r from-[#006666] via-[#008080] to-[#006666] bg-clip-text text-transparent mb-4">
            Employee Profile
          </h1>
        </div>

        {/* Personal Information */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2  backdrop-blur-lg p-8  shadow-2xl border border-[#006666]/20 hover:shadow-3xl hover:scale-[1.02] transition-all duration-300 group">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-[#006666] to-[#008080] rounded-xl text-white group-hover:scale-110 transition-transform duration-300">
                <User size={24} />
              </div>
              <h2 className="text-3xl font-bold text-[#006666]">Personal Information</h2>
            </div>

            <div className="flex items-center space-x-6 mb-8">
              <div className="relative">
                <img
                  src={profileData.personal.profileImage || "/placeholder.svg"}
                  alt="Profile"
                  className="w-28 h-28 rounded-full object-cover border-4 border-[#006666]/30 shadow-lg"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-800">{profileData.personal.name}</h3>
                <p className="text-[#006666] font-semibold">{profileData.personal.position}</p>
                <p className="text-sm font-medium mt-1">
                  Employee ID: <span className="text-[#006666] font-bold">{profileData.personal.employeeId}</span>
                </p>
                <p className="text-sm text-slate-600">Date of Join: {profileData.personal.joinDate}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-[#006666]/10 rounded-xl hover:bg-[#006666]/20 transition-colors duration-200">
                  <Phone size={16} className="text-[#006666]" />
                  <span>
                    <strong>Phone:</strong> {profileData.personal.phone}
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-[#008080]/10 rounded-xl hover:bg-[#008080]/20 transition-colors duration-200">
                  <Mail size={16} className="text-[#008080]" />
                  <span>
                    <strong>Email:</strong> {profileData.personal.email}
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-[#006666]/10 rounded-xl hover:bg-[#006666]/20 transition-colors duration-200">
                  <Calendar size={16} className="text-[#006666]" />
                  <span>
                    <strong>Birthday:</strong> {profileData.personal.birthday}
                  </span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-[#008080]/10 rounded-xl hover:bg-[#008080]/20 transition-colors duration-200">
                  <MapPin size={16} className="text-[#008080] mt-0.5" />
                  <span>
                    <strong>Address:</strong> {profileData.personal.address}
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-[#006666]/10 rounded-xl hover:bg-[#006666]/20 transition-colors duration-200">
                  <User size={16} className="text-[#006666]" />
                  <span>
                    <strong>Gender:</strong> {profileData.personal.gender}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Emergency Contacts */}
          <div className=" backdrop-blur-lg p-8  shadow-2xl border border-[#006666]/20 hover:shadow-3xl hover:scale-[1.02] transition-all duration-300 group">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-[#006666] to-[#008080] rounded-xl text-white group-hover:scale-110 transition-transform duration-300">
                <Users size={24} />
              </div>
              <h2 className="text-2xl font-bold text-[#006666]">Emergency Contact</h2>
            </div>

            <div className="mb-6 p-4 bg-gradient-to-r from-[#006666]/10 to-[#008080]/10 rounded-xl border border-[#006666]/20 hover:shadow-md transition-shadow duration-200">
              <p className="font-bold text-[#006666] mb-3">Primary Contact</p>
              <div className="text-sm space-y-1">
                <p>
                  <strong>Name:</strong> {profileData.emergency.primary.name}
                </p>
                <p>
                  <strong>Relationship:</strong> {profileData.emergency.primary.relationship}
                </p>
                <p>
                  <strong>Phone:</strong> {profileData.emergency.primary.phone}
                </p>
                <p>
                  <strong>Email:</strong> {profileData.emergency.primary.email}
                </p>
                <p>
                  <strong>Address:</strong> {profileData.emergency.primary.address}
                </p>
              </div>
            </div>
            <div className="p-4 bg-gradient-to-r from-[#006666]/10 to-[#008080]/10 rounded-xl border border-[#006666]/20 hover:shadow-md transition-shadow duration-200">
              <p className="font-bold text-[#006666] mb-3">Secondary Contact</p>
              <div className="text-sm space-y-1">
                <p>
                  <strong>Name:</strong> {profileData.emergency.secondary.name}
                </p>
                <p>
                  <strong>Relationship:</strong> {profileData.emergency.secondary.relationship}
                </p>
                <p>
                  <strong>Phone:</strong> {profileData.emergency.secondary.phone}
                </p>
                <p>
                  <strong>Email:</strong> {profileData.emergency.secondary.email}
                </p>
                <p>
                  <strong>Address:</strong> {profileData.emergency.secondary.address}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Education and Experience */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div className=" backdrop-blur-lg p-8  shadow-2xl border border-[#006666]/20 hover:shadow-3xl hover:scale-[1.02] transition-all duration-300 group">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-[#006666] to-[#008080] rounded-xl text-white group-hover:scale-110 transition-transform duration-300">
                <GraduationCap size={24} />
              </div>
              <h2 className="text-2xl font-bold text-[#006666]">Education</h2>
            </div>

            <div className="space-y-4">
              {profileData.education.map((item: EducationItem, index: number) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-r from-[#006666]/10 to-[#008080]/10 rounded-xl border border-[#006666]/20 hover:shadow-md transition-shadow duration-200"
                >
                  <h4 className="font-semibold text-[#006666] mb-2">{item.instituteName}</h4>
                  <p className="text-sm font-medium text-slate-700 mb-1">{item.degree}</p>
                  <p className="text-xs text-slate-600">
                    {item.startDate} - {item.endDate}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className=" backdrop-blur-lg p-8  shadow-2xl border border-[#006666]/20 hover:shadow-3xl hover:scale-[1.02] transition-all duration-300 group">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-[#006666] to-[#008080] rounded-xl text-white group-hover:scale-110 transition-transform duration-300">
                <Briefcase size={24} />
              </div>
              <h2 className="text-2xl font-bold text-[#006666]">Experience</h2>
            </div>

            <div className="space-y-4">
              {profileData.experience.map((item: string, index: number) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-r from-[#006666]/10 to-[#008080]/10 rounded-xl border border-[#006666]/20 hover:shadow-md transition-shadow duration-200"
                >
                  <p className="text-sm font-medium text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Bank Account */}
          <div className=" backdrop-blur-lg p-8  shadow-2xl border border-[#006666]/20 hover:shadow-3xl hover:scale-[1.02] transition-all duration-300 group">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-[#006666] to-[#008080] rounded-xl text-white group-hover:scale-110 transition-transform duration-300">
                <CreditCard size={24} />
              </div>
              <h2 className="text-xl font-bold text-[#006666]">Bank Account</h2>
            </div>

            <div className="text-sm space-y-3">
              {Object.entries({
                "Account Holder": profileData.bank.holderName,
                "Account Number": profileData.bank.accountNumber,
                "Bank Name": profileData.bank.bankName,
                "Branch Name": profileData.bank.branchName,
                "SWIFT Code": profileData.bank.swiftCode,
              }).map(([key, value]) => (
                <div
                  key={key}
                  className="p-3 bg-gradient-to-r from-[#006666]/10 to-[#008080]/10 rounded-xl border border-[#006666]/20 hover:bg-[#006666]/20 transition-colors duration-200"
                >
                  <strong className="text-[#006666]">{key}:</strong> <span className="text-slate-700">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Passport Information */}
          <div className=" backdrop-blur-lg p-8  shadow-2xl border border-[#006666]/20 hover:shadow-3xl hover:scale-[1.02] transition-all duration-300 group">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-[#006666] to-[#008080] rounded-xl text-white group-hover:scale-110 transition-transform duration-300">
                <FileText size={24} />
              </div>
              <h2 className="text-xl font-bold text-[#006666]">Passport Info</h2>
            </div>

            <div className="text-sm space-y-3">
              {Object.entries({
                "Passport Number": profileData.passport.number,
                Nationality: profileData.passport.nationality,
                "Issue Date": profileData.passport.issueDate,
                "Expiry Date": profileData.passport.expiryDate,
              }).map(([key, value]) => (
                <div
                  key={key}
                  className="p-3 bg-gradient-to-r from-[#006666]/10 to-[#008080]/10 rounded-xl border border-[#006666]/20 hover:bg-[#006666]/20 transition-colors duration-200"
                >
                  <strong className="text-[#006666]">{key}:</strong> <span className="text-slate-700">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
