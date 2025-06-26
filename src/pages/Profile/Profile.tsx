
import type React from "react"
import {User,Phone,Mail,MapPin,Calendar,Users,GraduationCap,Briefcase,CreditCard,FileText} from "lucide-react"
import { useState } from "react"

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
  issueDate: string
  expiryDate: string
}


interface ProfileData {
  personal: PersonalInfo
  emergency: EmergencyInfo
  education: EducationItem[]
  experience: string[]
  certificate: string[]
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
      blood: "A+",
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
      {
        instituteName: "National Public School",
        degree: "Computer Science",
        startDate: "1998",
        endDate: "2000",
      }
    ],
    experience: [
      "TCS, India – Head of Review Team (2020 - Present)",
      "CTS, India – Software Developer (2016 - 2018)",
      "Facebook , India – Junior Software Developer (2011 - 2016)",
    ],
    certificate: [
      "Meta, Certified React developer course completed",
      "Google, Web Development course completed",
      "Coursera , completed full stack development (9 months)",
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

  const [isEditing, setIsEditing] = useState(false);
  // Update your formData state to include all editable fields
  const [formData, setFormData] = useState({
    // Personal Info
    phone: profileData.personal.phone,
    email: profileData.personal.email,
    birthday: profileData.personal.birthday,
    blood: profileData.personal.blood,
    gender: profileData.personal.gender,
    address: profileData.personal.address,
    family: profileData.personal.address, 
    marriedStatus: '',
    
    // Emergency Contacts
    primaryName: profileData.emergency.primary.name,
    primaryRelationship: profileData.emergency.primary.relationship,
    primaryPhone: profileData.emergency.primary.phone,
    primaryEmail: profileData.emergency.primary.email,
    primaryAddress: profileData.emergency.primary.address,
    
    secondaryName: profileData.emergency.secondary.name,
    secondaryRelationship: profileData.emergency.secondary.relationship,
    secondaryPhone: profileData.emergency.secondary.phone,
    secondaryEmail: profileData.emergency.secondary.email,
    secondaryAddress: profileData.emergency.secondary.address,
    
    // Education (using array to handle multiple entries)
    education: profileData.education.map(edu => ({
      instituteName: edu.instituteName,
      degree: edu.degree,
      startDate: edu.startDate,
      endDate: edu.endDate
    })),
    
    // Experience (array of strings)
    experience: [...profileData.experience],
    
    // Bank Info
    bankHolderName: profileData.bank.holderName,
    bankAccountNumber: profileData.bank.accountNumber,
    bankName: profileData.bank.bankName,
    bankBranchName: profileData.bank.branchName,
    bankSwiftCode: profileData.bank.swiftCode,
    
    // Passport Info
    passportNumber: profileData.passport.number,
    passportNationality: profileData.passport.nationality,
    passportIssueDate: profileData.passport.issueDate,
    passportExpiryDate: profileData.passport.expiryDate,
    
    // Certificates (array of strings)
    certificates: [...profileData.certificate]
  });
  
  // Enhanced handleInputChange to handle different input types
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // For array fields (education, experience, certificates)
  const handleArrayFieldChange = (field: string, index: number, key: string, value: string) => {
    setFormData(prev => {
      const newArray = [...prev[field]];
      if (key) {
        // For objects in array (like education)
        newArray[index] = { ...newArray[index], [key]: value };
      } else {
        // For simple strings in array (like experience)
        newArray[index] = value;
      }
      return { ...prev, [field]: newArray };
    });
  };
  
  // Enhanced submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the updated data to your backend
    console.log('Form submitted:', formData);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-[#006666]/5 to-[#006666]/10 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-left">
          <h1 className="text-4xl font-black  leading-tight bg-gradient-to-r from-[#006666] via-[#008080] to-[#006666] bg-clip-text text-transparent mb-4">
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

      <div>      

      <form onSubmit={handleSubmit}>
      <div className="grid md:grid-cols-2 gap-6 text-sm">
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-[#006666]/10 rounded-xl hover:bg-[#006666]/20 transition-colors duration-200">
            <Phone size={16} className="text-[#006666]" />
            <span>
              <strong>Phone:</strong> 
              <input
                name="phone"
                type="tel"
                className="placeholder-black bg-[#006666]/10 rounded-xl hover:bg-[#006666]/20 ml-2 outline-none"
                value={formData.phone}
                onChange={handleInputChange}
                readOnly={!isEditing}
              />
            </span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-[#008080]/10 rounded-xl hover:bg-[#008080]/20 transition-colors duration-200">
            <Mail size={16} className="text-[#008080]" />
            <span>
              <strong>Email:</strong> 
              <input
                name="email"
                type="email"
                className="placeholder-black bg-[#006666]/10 rounded-xl hover:bg-[#006666]/20 ml-2 outline-none"
                value={formData.email}
                onChange={handleInputChange}
                readOnly={!isEditing}
              />
            </span>
          </div>  
          <div className="flex items-center gap-3 p-3 bg-[#006666]/10 rounded-xl hover:bg-[#006666]/20 transition-colors duration-200">
            <Calendar size={16} className="text-[#006666]" />
            <span>
              <strong>Birthday:</strong> 
              <input
                name="birthday"
                type="text" // Changed from date to text to match your data format
                className="bg-[#006666]/10 rounded-xl hover:bg-[#006666]/20 ml-2 outline-none"
                value={formData.birthday}
                onChange={handleInputChange}
                readOnly={!isEditing}
              />
            </span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-[#006666]/10 rounded-xl hover:bg-[#006666]/20 transition-colors duration-200">
            <Phone size={16} className="text-[#006666]" />
            <span>
              <strong>Blood:</strong> 
              <input
                name="blood"
                type="text"
                className="placeholder-black placeholder-text-xs bg-[#006666]/10 rounded-xl hover:bg-[#006666]/20 ml-2 outline-none"
                value={formData.blood}
                onChange={handleInputChange}
                readOnly={!isEditing}
              />
            </span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-[#006666]/10 rounded-xl hover:bg-[#006666]/20 transition-colors duration-200">
            <User size={16} className="text-[#006666]" />
            <span>
              <strong>Gender:</strong> 
              <select
                name="gender"
                className="ml-2 bg-[#006666]/10 rounded-xl hover:bg-[#006666]/20"
                value={formData.gender}
                onChange={handleInputChange}
                disabled={!isEditing}
              >
                <option value="">Choose Your gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </select>
            </span>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 bg-[#008080]/10 rounded-xl hover:bg-[#008080]/20 transition-colors duration-200">
            <MapPin size={16} className="text-[#008080] mt-0.5" />
            <span>
              <strong>Address:</strong> 
              <input
                name="address"
                type="text"
                className="block w-full p-4 bg-[#008080]/10 rounded-xl hover:bg-[#008080]/20 transition-colors duration-200 placeholder-black"
                value={formData.address}
                onChange={handleInputChange}
                readOnly={!isEditing}
              />
            </span>
          </div>
          <div className="flex items-start gap-3 p-3 bg-[#008080]/10 rounded-xl hover:bg-[#008080]/20 transition-colors duration-200">
            <MapPin size={16} className="text-[#008080] mt-0.5" />
            <span>
              <strong>Family:</strong> 
              <input
                name="family"
                type="text"
                className="block w-full p-4 bg-[#008080]/10 rounded-xl hover:bg-[#008080]/20 transition-colors duration-200 placeholder-black"
                value={formData.family}
                onChange={handleInputChange}
                readOnly={!isEditing}
              />
            </span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-[#006666]/10 rounded-xl hover:bg-[#006666]/20 transition-colors duration-200">
            <User size={16} className="text-[#006666]" />
            <span>
              <strong>Married Status:</strong> 
              <select
                name="marriedStatus"
                className="ml-2 bg-[#006666]/10 rounded-xl hover:bg-[#006666]/20"
                value={formData.marriedStatus}
                onChange={handleInputChange}
                disabled={!isEditing}
              >
                <option value="">Choose</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
              </select>
            </span>
          </div>
          </div>
      </div>
      <label htmlFor="dropzone-file" className=" relative top-[15px] right-[350px] cursor-pointer">
            <div className="flex justify-center">
              <div className="relative group">
               
                <div className="absolute top-4 left-16 py-1 px-4 w-32  bg-[#006666] rounded-xl border border-[#006666]/20 text-center transition-all duration-300 group-hover:from-[#006666]/20 group-hover:to-[#008080]/20 group-hover:shadow-md">
                  <span className=" text-white">Upload File</span>
                </div>

              </div>
            </div>
            <input id="dropzone-file" type="file" className="hidden" disabled={!isEditing} accept=".pdf,.doc,.docx" />
          </label>
    </form>
     
     <div className="mt-6 flex justify-end">
        {isEditing ? (
          <button
            onClick={handleSubmit}
            type="submit"
            className="px-4 py-2 bg-[#006666] text-white rounded-lg hover:bg-[#008080] transition-colors duration-200"
          >
            Save Changes
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-[#006666] text-white rounded-lg hover:bg-[#008080] transition-colors duration-200"
          >
            Edit 
          </button>
        )}
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
                  <strong>Name:</strong> 
                  <span>
                     <input
                        name="blood"
                        type="text"
                        className="placeholder-black placeholder-text-xs bg-[#006666]/10 rounded-xl hover:bg-[#006666]/20 ml-2 outline-none"
                        value={profileData.emergency.primary.name}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                      />
                    
                    </span>
                </p>  
                <p>
                  <strong>Relationship:</strong> 
                  <span>
                  <input
                        name="primary-relation"
                        type="text"
                        className="placeholder-black placeholder-text-xs bg-[#006666]/10 rounded-xl hover:bg-[#006666]/20 ml-2 outline-none"
                        value={profileData.emergency.primary.relationship}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                      />
                  </span>
                </p>
                <p>
                  <strong>Phone:</strong>
                  <span>
                  <input
                        name="primanry-ph"
                        type="number"
                        className="placeholder-black placeholder-text-xs bg-[#006666]/10 rounded-xl hover:bg-[#006666]/20 ml-2 outline-none"
                        value={profileData.emergency.primary.phone}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                      />
                  </span> 
                </p>
                <p>
                  <strong>Email:</strong>
                  <span>
                  <input
                        name="e-mail"
                        type="email"
                        className="placeholder-black placeholder-text-xs bg-[#006666]/10 rounded-xl hover:bg-[#006666]/20 ml-2 outline-none"
                        value={profileData.emergency.primary.email}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                      />
                  </span> 
                </p>
                <p>
                  
                  <strong>Address:</strong>
                  <span>
                  <input
                        name="primary_address"
                        type="text"
                        className="placeholder-black placeholder-text-xs bg-[#006666]/10 rounded-xl hover:bg-[#006666]/20 ml-2 outline-none"
                        value={profileData.emergency.primary.address}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                      />
                  </span> 
                </p>
              </div>
            </div>
            <div className="p-4 bg-gradient-to-r from-[#006666]/10 to-[#008080]/10 rounded-xl border border-[#006666]/20 hover:shadow-md transition-shadow duration-200">
              <p className="font-bold text-[#006666] mb-3">Secondary Contact</p>
              <div className="text-sm space-y-1">
                <p>
                  <strong>Name:</strong>
                  <span>
                  <input
                        name="secondary-name"
                        type="text"
                        className="placeholder-black placeholder-text-xs bg-[#006666]/10 rounded-xl hover:bg-[#006666]/20 ml-2 outline-none"
                        value={profileData.emergency.secondary.name}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                      />
                  </span> 
                </p>
                <p>
                  <strong>Relationship:</strong> 
                  <span>
                  <input
                        name="secondary-relation"
                        type="text"
                        className="placeholder-black placeholder-text-xs bg-[#006666]/10 rounded-xl hover:bg-[#006666]/20 ml-2 outline-none"
                        value={profileData.emergency.secondary.relationship}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                      />
                  </span>
                </p>
                <p>
                  <strong>Phone:</strong> 
                  <span>
                  <input
                        name="secondary-ph"
                        type="phone"
                        className="placeholder-black placeholder-text-xs bg-[#006666]/10 rounded-xl hover:bg-[#006666]/20 ml-2 outline-none"
                        value={profileData.emergency.secondary.phone}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                      />
                  </span>
                </p>
                <p>
                  <strong>Email:</strong>
                  <span>
                  <input
                        name="secondary-email"
                        type="email"
                        className="placeholder-black placeholder-text-xs bg-[#006666]/10 rounded-xl hover:bg-[#006666]/20 ml-2 outline-none"
                        value={profileData.emergency.secondary.email}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                      />
                  </span> 
                </p>
                <p>
                  <strong>Address:</strong>
                  <span>
                  <input
                        name="secondary-address"
                        type="text"
                        className="placeholder-black placeholder-text-xs bg-[#006666]/10 rounded-xl hover:bg-[#006666]/20 ml-2 outline-none"
                        value={profileData.emergency.secondary.address}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                      />
                  </span>
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
                  <input type="file" accept="pdf/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              </div>
              <h2 className="text-2xl font-bold text-[#006666]">Education</h2>
            </div>

            <div className="space-y-4 h-64 overflow-y-auto scrollbar-hide" >
              {profileData.education.map((item: EducationItem, index: number) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-r from-[#006666]/10 to-[#008080]/10 rounded-xl border border-[#006666]/20 hover:shadow-md transition-shadow duration-200"
                >
                  
                  <input
                        name="institute-name"
                        type="text"
                        className="font-semibold bg-transparent w-64 text-[#006666] placeholder-text-lg mb-2 "
                        value={item.instituteName}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                      />
                    
                  <input
                        name="degree"
                        type="text"
                        className="font-semibold bg-transparent w-64 text-slate-700 placeholder-text-md mb-1 "
                        value={item.degree}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                      />
                    
                  <div className="flex flex-row space-x-1  mb-2">
                    
                      <input
                        name="degree"
                        type="text"
                        className=" bg-transparent w-64 text-slate-600 placeholder-text-xs mb-1 "
                        value={item.startDate} 
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                      />
                      
                     
                      <input
                        name="degree"
                        type="text"
                        className=" bg-transparent w-32  text-slate-600 placeholder-text-xs mb-1 "
                        value={item.endDate}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                      />
                   
                  </div>
                  
                </div>
              ))}
            </div>
            
            
            
          </div>

          <div className=" backdrop-blur-lg p-8  shadow-2xl border border-[#006666]/20 hover:shadow-3xl hover:scale-[1.02] transition-all duration-300 group">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-[#006666] to-[#008080] rounded-xl text-white group-hover:scale-110 transition-transform duration-300">
                <Briefcase size={24} />
             
              <input type="file" accept="pdf/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
      
              </div>
              <h2 className="text-2xl font-bold text-[#006666]">Experience</h2>
            </div>
          
            <div className="space-y-4">
              {profileData.experience.map((item: string, index: number) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-r from-[#006666]/10 to-[#008080]/10 rounded-xl border border-[#006666]/20 hover:shadow-md transition-shadow duration-200"
                >
                  <p className="text-sm font-medium text-slate-700"><input
                        name="degree"
                        type="text"
                        className="font-semibold bg-transparent active:border-transparent w-[400px] text-slate-700 placeholder-text-md mb-1 "
                        value={item}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                      /></p>
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
                <input type="file" accept="pdf/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
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
                  <strong className="text-[#006666]">{key}:</strong> 
                  <span>
                  <input
                        name="secondary-address"
                        type="text"
                        className="placeholder-black placeholder-text-xs bg-transparent rounded-xl hover:bg-transparent  outline-none"
                        value={value}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                      />
                  </span>
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
                  <strong className="text-[#006666]">{key}:</strong> 
                  <span>
                  <input
                        name="passport-info"
                        type="text"
                        className="placeholder-black placeholder-text-xs bg-transparent rounded-xl hover:bg-transparent  outline-none"
                        value={value}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                      />
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Certificate Section */}
          <div className=" backdrop-blur-lg p-8  shadow-2xl border border-[#006666]/20 hover:shadow-3xl hover:scale-[1.02] transition-all duration-300 group">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-[#006666] to-[#008080] rounded-xl text-white group-hover:scale-110 transition-transform duration-300">
                <Briefcase size={24} />
             
              <input type="file" accept="pdf/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
      
              </div>
              <h2 className="text-2xl font-bold text-[#006666]">Certificates</h2>
            </div>

            <div className="space-y-4">
              {profileData.certificate.map((item: string, index: number) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-r from-[#006666]/10 to-[#008080]/10 rounded-xl border border-[#006666]/20 hover:shadow-md transition-shadow duration-200"
                >
                  
                  <p className="text-sm font-medium text-slate-700 w-full">
                    <span>
                  <textarea
                        name="passport-info"
                        className="placeholder-black scrollbar-hide w-auto h-auto placeholder-text-xs bg-transparent rounded-xl hover:bg-transparent  outline-none"
                        value={item}
                        rows={2}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                      />
                  </span>
                  </p>
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
