"use client"

import type React from "react"
import { useState, useEffect, memo, useRef } from "react"
import {Edit3,Save,X,User,Phone,Mail,MapPin,Calendar,Users,GraduationCap,Briefcase,CreditCard,FileText,ChevronDown,Check,Upload,Download,Plus,Trash2,} from "lucide-react"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

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

interface SocialInfo {
  linkedin: string
  twitter: string
  facebook: string
  instagram: string
  whatsapp: string
}

interface ProfileData {
  personal: PersonalInfo
  emergency: EmergencyInfo
  education: EducationItem[]
  experience: string[]
  bank: BankInfo
  passport: PassportInfo
  social: SocialInfo
}

type SectionType = "personal" | "emergency" | "education" | "experience" | "bank" | "passport" | "social" | null

interface CustomSelectProps {
  value: string
  onChange: (value: string) => void
  options: { value: string; label: string }[]
  placeholder: string
  label?: string
}

const CustomSelect: React.FC<CustomSelectProps> = memo(({ value, onChange, options, placeholder, label }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="space-y-2">
      {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-3 border border-[#006666]/30 rounded-xl focus:ring-2 focus:ring-[#006666] focus:border-transparent bg-white text-left flex items-center justify-between"
        >
          <span className={value ? "text-gray-900" : "text-gray-500"}>
            {value ? options.find((opt) => opt.value === value)?.label : placeholder}
          </span>
          <ChevronDown size={16} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-[#006666]/30 rounded-xl shadow-lg">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value)
                  setIsOpen(false)
                }}
                className="w-full p-3 text-left hover:bg-[#006666]/10 flex items-center justify-between first:rounded-t-xl last:rounded-b-xl"
              >
                <span>{option.label}</span>
                {value === option.value && <Check size={16} className="text-[#006666]" />}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
})

CustomSelect.displayName = "CustomSelect"

const EditModal = memo<{
  isOpen: boolean
  section: SectionType
  data: any
  onSave: (data: any) => void
  onCancel: () => void
  onChange: (data: any) => void
}>(({ isOpen, section, data, onSave, onCancel, onChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  if (!isOpen || !section) return null

  const genderOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Other", label: "Other" },
  ]

  const getSectionTitle = (section: SectionType) => {
    switch (section) {
      case "personal":
        return "Personal Information"
      case "emergency":
        return "Emergency Contacts"
      case "education":
        return "Education"
      case "experience":
        return "Experience"
      case "bank":
        return "Bank Account"
      case "passport":
        return "Passport Information"
      case "social":
        return "Social Profiles"
      default:
        return "Edit"
    }
  }

  const handleInputChange = (field: string, value: string, subField?: string) => {
    if (subField) {
      onChange({
        ...data,
        [field]: {
          ...data[field],
          [subField]: value,
        },
      })
    } else {
      onChange({
        ...data,
        [field]: value,
      })
    }
  }

  const handleArrayChange = (index: number, value: string) => {
    const newArray = [...data]
    newArray[index] = value
    onChange(newArray)
  }

  const handleEducationChange = (index: number, field: string, value: string) => {
    const newArray = [...data]
    newArray[index] = {
      ...newArray[index],
      [field]: value,
    }
    onChange(newArray)
  }

  const addArrayItem = () => {
    if (section === "education") {
      onChange([...data, { instituteName: "", degree: "", startDate: "", endDate: "" }])
    } else {
      onChange([...data, ""])
    }
  }

  const removeArrayItem = (index: number) => {
    onChange(data.filter((_: any, i: number) => i !== index))
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        handleInputChange("profileImage", result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleImageDownload = () => {
    if (data.profileImage) {
      const link = document.createElement("a")
      link.href = data.profileImage
      link.download = "profile-image.jpg"
      link.click()
    }
  }

  const renderEditContent = () => {
    switch (section) {
      case "personal":
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-6 mb-6">
              <div className="relative group">
                <img
                  src={
                    data.profileImage || "https://pbs.twimg.com/profile_images/685700874434314240/80T5j3HF_400x400.jpg"
                  }
                  alt="Profile"
                  className="w-28 h-28 rounded-full object-cover border-4 border-[#006666]/30 shadow-lg"
                />
                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                      title="Upload Image"
                    >
                      <Upload size={16} className="text-white" />
                    </button>
                    <button
                      type="button"
                      onClick={handleImageDownload}
                      className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                      title="Download Image"
                    >
                      <Download size={16} className="text-white" />
                    </button>
                  </div>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
              <div className="flex-1 space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={data.name || ""}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="w-full p-3 border border-[#006666]/30 rounded-xl focus:ring-2 focus:ring-[#006666] focus:border-transparent text-lg font-semibold"
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                  <input
                    type="text"
                    value={data.position || ""}
                    onChange={(e) => handleInputChange("position", e.target.value)}
                    className="w-full p-3 border border-[#006666]/30 rounded-xl focus:ring-2 focus:ring-[#006666] focus:border-transparent"
                    placeholder="Enter job position"
                  />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Employee ID</label>
                <input
                  type="text"
                  value={data.employeeId || ""}
                  onChange={(e) => handleInputChange("employeeId", e.target.value)}
                  className="w-full p-3 border border-[#006666]/30 rounded-xl focus:ring-2 focus:ring-[#006666] focus:border-transparent"
                  placeholder="Enter employee ID"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Join Date</label>
                <input
                  type="text"
                  value={data.joinDate || ""}
                  onChange={(e) => handleInputChange("joinDate", e.target.value)}
                  className="w-full p-3 border border-[#006666]/30 rounded-xl focus:ring-2 focus:ring-[#006666] focus:border-transparent"
                  placeholder="Enter join date"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={data.phone || ""}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="w-full p-3 border border-[#006666]/30 rounded-xl focus:ring-2 focus:ring-[#006666] focus:border-transparent"
                  placeholder="Enter phone number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={data.email || ""}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-full p-3 border border-[#006666]/30 rounded-xl focus:ring-2 focus:ring-[#006666] focus:border-transparent"
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Birthday</label>
                <input
                  type="text"
                  value={data.birthday || ""}
                  onChange={(e) => handleInputChange("birthday", e.target.value)}
                  className="w-full p-3 border border-[#006666]/30 rounded-xl focus:ring-2 focus:ring-[#006666] focus:border-transparent"
                  placeholder="Enter birthday"
                />
              </div>
              <div>
                <CustomSelect
                  value={data.gender || ""}
                  onChange={(value) => handleInputChange("gender", value)}
                  options={genderOptions}
                  placeholder="Select Gender"
                  label="Gender"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <textarea
                value={data.address || ""}
                onChange={(e) => handleInputChange("address", e.target.value)}
                className="w-full p-3 border border-[#006666]/30 rounded-xl focus:ring-2 focus:ring-[#006666] focus:border-transparent"
                placeholder="Enter full address"
                rows={3}
              />
            </div>
          </div>
        )

      case "emergency":
        return (
          <div className="space-y-6">
            <div className="p-6 bg-[#006666]/10 rounded-xl border border-[#006666]/20">
              <h3 className="font-bold text-[#006666] mb-4 text-lg">Primary Contact</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={data.primary?.name || ""}
                    onChange={(e) => handleInputChange("primary", e.target.value, "name")}
                    className="w-full p-3 border border-[#006666]/30 rounded-lg focus:ring-2 focus:ring-[#006666]"
                    placeholder="Enter contact name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Relationship</label>
                  <input
                    type="text"
                    value={data.primary?.relationship || ""}
                    onChange={(e) => handleInputChange("primary", e.target.value, "relationship")}
                    className="w-full p-3 border border-[#006666]/30 rounded-lg focus:ring-2 focus:ring-[#006666]"
                    placeholder="Enter relationship"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={data.primary?.phone || ""}
                    onChange={(e) => handleInputChange("primary", e.target.value, "phone")}
                    className="w-full p-3 border border-[#006666]/30 rounded-lg focus:ring-2 focus:ring-[#006666]"
                    placeholder="Enter phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={data.primary?.email || ""}
                    onChange={(e) => handleInputChange("primary", e.target.value, "email")}
                    className="w-full p-3 border border-[#006666]/30 rounded-lg focus:ring-2 focus:ring-[#006666]"
                    placeholder="Enter email address"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input
                  type="text"
                  value={data.primary?.address || ""}
                  onChange={(e) => handleInputChange("primary", e.target.value, "address")}
                  className="w-full p-3 border border-[#006666]/30 rounded-lg focus:ring-2 focus:ring-[#006666]"
                  placeholder="Enter full address"
                />
              </div>
            </div>

            <div className="p-6 bg-[#006666]/10 rounded-xl border border-[#006666]/20">
              <h3 className="font-bold text-[#006666] mb-4 text-lg">Secondary Contact</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={data.secondary?.name || ""}
                    onChange={(e) => handleInputChange("secondary", e.target.value, "name")}
                    className="w-full p-3 border border-[#006666]/30 rounded-lg focus:ring-2 focus:ring-[#006666]"
                    placeholder="Enter contact name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Relationship</label>
                  <input
                    type="text"
                    value={data.secondary?.relationship || ""}
                    onChange={(e) => handleInputChange("secondary", e.target.value, "relationship")}
                    className="w-full p-3 border border-[#006666]/30 rounded-lg focus:ring-2 focus:ring-[#006666]"
                    placeholder="Enter relationship"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={data.secondary?.phone || ""}
                    onChange={(e) => handleInputChange("secondary", e.target.value, "phone")}
                    className="w-full p-3 border border-[#006666]/30 rounded-lg focus:ring-2 focus:ring-[#006666]"
                    placeholder="Enter phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={data.secondary?.email || ""}
                    onChange={(e) => handleInputChange("secondary", e.target.value, "email")}
                    className="w-full p-3 border border-[#006666]/30 rounded-lg focus:ring-2 focus:ring-[#006666]"
                    placeholder="Enter email address"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input
                  type="text"
                  value={data.secondary?.address || ""}
                  onChange={(e) => handleInputChange("secondary", e.target.value, "address")}
                  className="w-full p-3 border border-[#006666]/30 rounded-lg focus:ring-2 focus:ring-[#006666]"
                  placeholder="Enter full address"
                />
              </div>
            </div>
          </div>
        )

      case "education":
        return (
          <div className="space-y-4">
            {data.map((item: EducationItem, index: number) => (
              <div key={index} className="p-6 bg-[#006666]/10 rounded-xl border border-[#006666]/20">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold text-[#006666]">Education {index + 1}</h4>
                  <button
                    onClick={() => removeArrayItem(index)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Remove Education"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Institute Name</label>
                    <input
                      type="text"
                      value={item.instituteName || ""}
                      onChange={(e) => handleEducationChange(index, "instituteName", e.target.value)}
                      className="w-full p-3 border border-[#006666]/30 rounded-lg focus:ring-2 focus:ring-[#006666]"
                      placeholder="Enter institute name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
                    <input
                      type="text"
                      value={item.degree || ""}
                      onChange={(e) => handleEducationChange(index, "degree", e.target.value)}
                      className="w-full p-3 border border-[#006666]/30 rounded-lg focus:ring-2 focus:ring-[#006666]"
                      placeholder="Enter degree"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                    <input
                      type="text"
                      value={item.startDate || ""}
                      onChange={(e) => handleEducationChange(index, "startDate", e.target.value)}
                      className="w-full p-3 border border-[#006666]/30 rounded-lg focus:ring-2 focus:ring-[#006666]"
                      placeholder="Enter start date"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                    <input
                      type="text"
                      value={item.endDate || ""}
                      onChange={(e) => handleEducationChange(index, "endDate", e.target.value)}
                      className="w-full p-3 border border-[#006666]/30 rounded-lg focus:ring-2 focus:ring-[#006666]"
                      placeholder="Enter end date"
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={addArrayItem}
              className="w-full p-4 border-2 border-dashed border-[#006666]/50 rounded-xl text-[#006666] hover:bg-[#006666]/10 transition-colors flex items-center justify-center gap-2"
            >
              <Plus size={20} />
              Add Education
            </button>
          </div>
        )

      case "experience":
        return (
          <div className="space-y-4">
            {data.map((item: string, index: number) => (
              <div key={index} className="p-4 bg-[#006666]/10 rounded-xl border border-[#006666]/20">
                <div className="flex justify-between items-start gap-3">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Experience {index + 1}</label>
                    <textarea
                      value={item}
                      onChange={(e) => handleArrayChange(index, e.target.value)}
                      className="w-full p-3 border border-[#006666]/30 rounded-lg focus:ring-2 focus:ring-[#006666]"
                      rows={3}
                      placeholder="Enter experience details..."
                    />
                  </div>
                  <button
                    onClick={() => removeArrayItem(index)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors mt-6"
                    title="Remove Experience"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
            <button
              onClick={addArrayItem}
              className="w-full p-4 border-2 border-dashed border-[#006666]/50 rounded-xl text-[#006666] hover:bg-[#006666]/10 transition-colors flex items-center justify-center gap-2"
            >
              <Plus size={20} />
              Add Experience
            </button>
          </div>
        )

      case "bank":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Account Holder Name</label>
              <input
                type="text"
                value={data.holderName || ""}
                onChange={(e) => handleInputChange("holderName", e.target.value)}
                className="w-full p-3 border border-[#006666]/30 rounded-xl focus:ring-2 focus:ring-[#006666]"
                placeholder="Enter account holder name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
              <input
                type="text"
                value={data.accountNumber || ""}
                onChange={(e) => handleInputChange("accountNumber", e.target.value)}
                className="w-full p-3 border border-[#006666]/30 rounded-xl focus:ring-2 focus:ring-[#006666]"
                placeholder="Enter account number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
              <input
                type="text"
                value={data.bankName || ""}
                onChange={(e) => handleInputChange("bankName", e.target.value)}
                className="w-full p-3 border border-[#006666]/30 rounded-xl focus:ring-2 focus:ring-[#006666]"
                placeholder="Enter bank name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Branch Name</label>
              <input
                type="text"
                value={data.branchName || ""}
                onChange={(e) => handleInputChange("branchName", e.target.value)}
                className="w-full p-3 border border-[#006666]/30 rounded-xl focus:ring-2 focus:ring-[#006666]"
                placeholder="Enter branch name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">SWIFT Code</label>
              <input
                type="text"
                value={data.swiftCode || ""}
                onChange={(e) => handleInputChange("swiftCode", e.target.value)}
                className="w-full p-3 border border-[#006666]/30 rounded-xl focus:ring-2 focus:ring-[#006666]"
                placeholder="Enter SWIFT code"
              />
            </div>
          </div>
        )

      case "passport":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Passport Number</label>
              <input
                type="text"
                value={data.number || ""}
                onChange={(e) => handleInputChange("number", e.target.value)}
                className="w-full p-3 border border-[#006666]/30 rounded-xl focus:ring-2 focus:ring-[#006666]"
                placeholder="Enter passport number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
              <input
                type="text"
                value={data.nationality || ""}
                onChange={(e) => handleInputChange("nationality", e.target.value)}
                className="w-full p-3 border border-[#006666]/30 rounded-xl focus:ring-2 focus:ring-[#006666]"
                placeholder="Enter nationality"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Issue Date</label>
              <input
                type="text"
                value={data.issueDate || ""}
                onChange={(e) => handleInputChange("issueDate", e.target.value)}
                className="w-full p-3 border border-[#006666]/30 rounded-xl focus:ring-2 focus:ring-[#006666]"
                placeholder="Enter issue date"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
              <input
                type="text"
                value={data.expiryDate || ""}
                onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                className="w-full p-3 border border-[#006666]/30 rounded-xl focus:ring-2 focus:ring-[#006666]"
                placeholder="Enter expiry date"
              />
            </div>
           
          </div>
        )

      case "social":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn Profile</label>
              <input
                type="text"
                value={data.linkedin || ""}
                onChange={(e) => handleInputChange("linkedin", e.target.value)}
                className="w-full p-3 border border-[#006666]/30 rounded-xl focus:ring-2 focus:ring-[#006666]"
                placeholder="Enter LinkedIn profile"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Twitter Handle</label>
              <input
                type="text"
                value={data.twitter || ""}
                onChange={(e) => handleInputChange("twitter", e.target.value)}
                className="w-full p-3 border border-[#006666]/30 rounded-xl focus:ring-2 focus:ring-[#006666]"
                placeholder="Enter Twitter handle"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Facebook Profile</label>
              <input
                type="text"
                value={data.facebook || ""}
                onChange={(e) => handleInputChange("facebook", e.target.value)}
                className="w-full p-3 border border-[#006666]/30 rounded-xl focus:ring-2 focus:ring-[#006666]"
                placeholder="Enter Facebook profile"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Instagram Handle</label>
              <input
                type="text"
                value={data.instagram || ""}
                onChange={(e) => handleInputChange("instagram", e.target.value)}
                className="w-full p-3 border border-[#006666]/30 rounded-xl focus:ring-2 focus:ring-[#006666]"
                placeholder="Enter Instagram handle"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Number</label>
              <input
                type="text"
                value={data.whatsapp || ""}
                onChange={(e) => handleInputChange("whatsapp", e.target.value)}
                className="w-full p-3 border border-[#006666]/30 rounded-xl focus:ring-2 focus:ring-[#006666]"
                placeholder="Enter WhatsApp number"
              />
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl border border-[#006666]/20 w-full max-w-4xl max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#006666] to-[#008080] p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Edit3 size={24} />
              <h2 className="text-2xl font-bold">Edit {getSectionTitle(section)}</h2>
            </div>
            <button onClick={onCancel} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">{renderEditContent()}</div>

        {/* Modal Footer */}
        <div className="bg-gray-50 p-6 border-t border-gray-200 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(data)}
            className="px-6 py-3 bg-[#006666] text-white rounded-xl hover:bg-[#004d4d] transition-colors flex items-center gap-2 font-medium"
          >
            <Save size={18} />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
})

EditModal.displayName = "EditModal"

const Profile: React.FC = () => {
  const [editingSection, setEditingSection] = useState<SectionType>(null)
  const [profileData, setProfileData] = useState<ProfileData>({
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
    social: {
      linkedin: "Ethan Mitchell",
      twitter: "Ethan Mitchell",
      facebook: "Ethan Mitchell",
      instagram: "Ethan Mitchell",
      whatsapp: "123456789",
    },
  })

  const [tempData, setTempData] = useState<any>({})
  const [showEditModal, setShowEditModal] = useState(false)

  const handleEdit = (section: SectionType) => {
    if (section) {
      setEditingSection(section)
  
      if (section === "education" || section === "experience") {
        setTempData([...profileData[section]])
      } else {
        setTempData({ ...profileData[section] })
      }
      setShowEditModal(true)
    }
  }

  const handleSave = (data: any) => {
    if (editingSection) {
      setProfileData((prev) => ({
        ...prev,
        [editingSection]: data,
      }))
      setEditingSection(null)
      setTempData({})
      setShowEditModal(false)

    
      toast.success(
        `${editingSection.charAt(0).toUpperCase() + editingSection.slice(1)} information updated successfully!`,
        {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          style: {
            backgroundColor: "#006666",
            color: "white",
          },
        },
      )
    }
  }

  const handleCancel = () => {
    setEditingSection(null)
    setTempData({})
    setShowEditModal(false)
  }

  const handleDataChange = (newData: any) => {
    setTempData(newData)
  }

  const EditButton: React.FC<{ section: SectionType; className?: string }> = memo(({ section, className = "" }) => (
    <button
      onClick={() => handleEdit(section)}
      className={`p-2 text-[#006666] hover:text-[#004d4d] hover:bg-[#006666]/10 rounded-lg transition-all duration-200 ${className}`}
      title="Edit"
    >
      <Edit3 size={18} />
    </button>
  ))

  EditButton.displayName = "EditButton"

  // Close modal with Escape key
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && showEditModal) {
        handleCancel()
      }
    }

    window.addEventListener("keydown", handleEscKey)
    return () => {
      window.removeEventListener("keydown", handleEscKey)
    }
  }, [showEditModal])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-[#006666]/5 to-[#006666]/10 p-6">
      <ToastContainer />
      <div className="max-w-7xl mx-auto">
        {/* Animated Header */}
        <div className="mb-12 text-left">
          <div className="">
            <h1 className="text-4xl font-black leading-tight bg-gradient-to-r from-[#006666] via-[#008080] to-[#006666] bg-clip-text text-transparent mb-4">
  Profile Management
</h1>

            <p className="text-xl text-slate-600 font-medium">Manage and edit your personal information with style</p>
            <div className="mt-4 w-24 h-1 bg-gradient-to-r from-[#006666] to-[#008080] "></div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2  backdrop-blur-lg p-8 rounded shadow-2xl border border-[#006666]/20 hover:shadow-3xl hover:scale-[1.02] transition-all duration-300 group">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-[#006666] to-[#008080] rounded-xl text-white group-hover:scale-110 transition-transform duration-300">
                  <User size={24} />
                </div>
                <h2 className="text-3xl font-bold text-[#006666]">Personal Information</h2>
              </div>
              <EditButton section="personal" />
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
                {/* <button className="mt-4 px-6 py-2 text-white bg-gradient-to-r from-[#006666] to-[#008080] rounded-xl hover:from-[#004d4d] hover:to-[#006666] text-sm font-semibold shadow-lg transform hover:scale-105 transition-all duration-200">
                  Send Message
                </button> */}
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
          <div className="bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-[#006666]/20 hover:shadow-3xl hover:scale-[1.02] transition-all duration-300 group">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-[#006666] to-[#008080] rounded-xl text-white group-hover:scale-110 transition-transform duration-300">
                  <Users size={24} />
                </div>
                <h2 className="text-2xl font-bold text-[#006666]">Emergency Contact</h2>
              </div>
              <EditButton section="emergency" />
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
          <div className="bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-[#006666]/20 hover:shadow-3xl hover:scale-[1.02] transition-all duration-300 group">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-[#006666] to-[#008080] rounded-xl text-white group-hover:scale-110 transition-transform duration-300">
                  <GraduationCap size={24} />
                </div>
                <h2 className="text-2xl font-bold text-[#006666]">Education</h2>
              </div>
              <EditButton section="education" />
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

          <div className="bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-[#006666]/20 hover:shadow-3xl hover:scale-[1.02] transition-all duration-300 group">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-[#006666] to-[#008080] rounded-xl text-white group-hover:scale-110 transition-transform duration-300">
                  <Briefcase size={24} />
                </div>
                <h2 className="text-2xl font-bold text-[#006666]">Experience</h2>
              </div>
              <EditButton section="experience" />
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

        {/* Bank, Passport, Social Info */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Bank Account */}
          <div className="bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-[#006666]/20 hover:shadow-3xl hover:scale-[1.02] transition-all duration-300 group">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-[#006666] to-[#008080] rounded-xl text-white group-hover:scale-110 transition-transform duration-300">
                  <CreditCard size={24} />
                </div>
                <h2 className="text-xl font-bold text-[#006666]">Bank Account</h2>
              </div>
              <EditButton section="bank" />
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
          <div className="bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-[#006666]/20 hover:shadow-3xl hover:scale-[1.02] transition-all duration-300 group">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-[#006666] to-[#008080] rounded-xl text-white group-hover:scale-110 transition-transform duration-300">
                  <FileText size={24} />
                </div>
                <h2 className="text-xl font-bold text-[#006666]">Passport Info</h2>
              </div>
              <EditButton section="passport" />
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

          {/* Social Profile */}
          {/* <div className="bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-[#006666]/20 hover:shadow-3xl hover:scale-[1.02] transition-all duration-300 group">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-[#006666] to-[#008080] rounded-xl text-white group-hover:scale-110 transition-transform duration-300">
                  <Globe size={24} />
                </div>
                <h2 className="text-xl font-bold text-[#006666]">Social Profile</h2>
              </div>
              <EditButton section="social" />
            </div>

            <div className="text-sm space-y-3">
              {Object.entries({
                LinkedIn: profileData.social.linkedin,
                Twitter: profileData.social.twitter,
                Facebook: profileData.social.facebook,
                Instagram: profileData.social.instagram,
                WhatsApp: profileData.social.whatsapp,
              }).map(([key, value]) => (
                <div
                  key={key}
                  className="p-3 bg-gradient-to-r from-[#006666]/10 to-[#008080]/10 rounded-xl border border-[#006666]/20 hover:bg-[#006666]/20 transition-colors duration-200"
                >
                  <strong className="text-[#006666]">{key}:</strong> <span className="text-slate-700">{value}</span>
                </div>
              ))}
            </div>
          </div> */}
        </div>

        {/* Edit Modal */}
        <EditModal
          isOpen={showEditModal}
          section={editingSection}
          data={tempData}
          onSave={handleSave}
          onCancel={handleCancel}
          onChange={handleDataChange}
        />
      </div>
    </div>
  )
}

export default Profile
