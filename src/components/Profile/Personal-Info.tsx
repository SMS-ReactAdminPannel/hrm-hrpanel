import type React from "react"
import { useState } from "react"
import { User, Phone, Mail, MapPin, Calendar, CameraIcon, Pencil } from "lucide-react"
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

interface PersonalInfoProps {
  data: PersonalInfo
  onUpdate?: (data: PersonalInfo) => void
}

export const PersonalInfoComponent: React.FC<PersonalInfoProps> = ({ data, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [profileImagePreview, setProfileImagePreview] = useState<string>(data.profileImage)
  const [formData, setFormData] = useState({
    name: data.name,
    position: data.position,
    empolyeeID:data.employeeId,
    joinDate:data.joinDate,
    phone: data.phone,
    email: data.email,
    birthday: data.birthday,
    blood: data.blood,
    gender: data.gender,
    address: data.address,
    family: data.address,
    marriedStatus: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Personal info updated:", formData)
    setIsEditing(false)
    if (onUpdate) {
      onUpdate({
        ...data,
        ...formData,
        profileImage: profileImagePreview,
      })
    }
  }

  return (
    <div className="flex flex-2 flex-col rounded-xl bg-white max-w-[60%] h-full p-2 shadow-2xl border border-[#006666]/20  transition-all duration-300 group">
      {isEditing && (
        <div className=" flex p-2  -mb-3">
          <p className="text-red-800 text-sm ">Edit Mode Active - Make your changes and click Save</p>
        </div>
      )}

      <div className="flex items-center gap-3   relative ">
        <div className="flex gap-1 items-center justify-center ">
          <div className="p-3 -mr-2 !text-gray-700   ">
            <User size={24} />
          </div>
          <div>
            <h2 className="text-xl !text-gray-700  " style={{ ...FONTS.header }}>
              Personal Information
            </h2>
          </div>
        </div>
        <div className="absolute right-1  cursor-pointer m-1">
          <button
            className=" !text-gray-700 p-1 hover:text-blue-200   rounded-lg cursor-pointer"
            onClick={() => setIsEditing(!isEditing)}
            style={{ ...FONTS.button }}
          >
            <Pencil size={16} className="!text-gray-700 " />
          </button>
        </div>
      </div>
      <hr className="border-gray-900 mb-5" />
      {/* profile image and name section */}
      <div className="flex items-center space-x-6 mb-8">
        <div className="relative group">
          <img
            src={profileImagePreview || "/placeholder.svg"}
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover shadow-lg"
          />
          {isEditing && (
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <label className="cursor-pointer bottom-1 absolute right-1 text-white text-xs font-semibold bg-blue-500 hover:bg-blue-600 rounded-full p-2 transition-colors duration-200">
                <CameraIcon size={16} />
                <input type="file" accept="image/*" onChange={handleProfileImageChange} className="hidden" />
              </label>
            </div>
          )}
        </div>
        <div className="flex-2">
          {isEditing ? (
            <>
              <input
                name="name"
                type="text"
                className="text-2xl font-bold text-slate-800 bg-transparent border-b border-gray-300 outline-none w-full mb-2"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter name"
              />
              <input
                name="position"
                type="text"
                className="text-[#000000]/100 font-semibold bg-transparent border-b border-gray-300 outline-none w-full mb-2"
                value={formData.position}
                onChange={handleInputChange}
                placeholder="Enter position"
              />
              <input
                name="name"
                type="text"
                className="text-2xl font-bold text-slate-800 bg-transparent border-b border-gray-300 outline-none w-full mb-2"
                value={formData.empolyeeID}
                onChange={handleInputChange}
                placeholder="Enter name"
              />
              <input
                name="position"
                type="text"
                className=" font-semibold bg-transparent border-b border-gray-300 outline-none w-full mb-2"
                value={formData.joinDate}
                onChange={handleInputChange}
                placeholder="Enter position"
              />
            </>
          ) : (
            <>
              <h3 className="text-2xl font-bold text-slate-800">{data.name}</h3>
              <p className=" font-semibold">{data.position}</p>
              <p className="text-sm font-medium mt-1">
            Employee ID: <span className=" font-bold">{data.employeeId}</span>
          </p>
          <p className="text-sm text-slate-900">Date of Join: {data.joinDate}</p>
            </>
          )}
          
        </div>
      </div>

      {/* other sections */}

      <form onSubmit={handleSubmit}>
        <div className="">
          <div className="grid-cols-2 grid md:grid-cols-1">
            <div className="flex flex-col items-start  p-3    transition-colors duration-200">
              <div className="flex flex-row gap-2 item-center justify-center  ">
                <Phone size={16} className=" mt-1 " />
              <strong className="!text-gray-800 font-semibold" style={{ ...FONTS.cardSubHeader, fontWeight: 600 }}>Phone</strong>
              <span>:</span>
              <span className="">
                <input
                  name="phone"
                  type="tel"
                  className="placeholder-black bg-transparent rounded-xl   outline-none w-full !text-gray-900 text-md" style={{ ...FONTS.subParagraph}}
                  value={formData.phone}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </span>
              </div>
              
            </div>
            <div className="flex flex-col items-start  p-3   transition-colors duration-200">
              <div className="flex flex-row gap-2 item-center justify-center">
                <Mail size={16} className="] mt-1" />
              <strong className="!text-gray-800 font-semibold" style={{ ...FONTS.cardSubHeader, fontWeight: 600 }}>Email</strong>
              <span>:</span>
              <span>
                  <input
                  name="email"
                  type="email"
                  className="placeholder-black bg-transparent rounded-xl  outline-none w-full !text-gray-900 text-md" style={{ ...FONTS.subParagraph}}
                  value={formData.email}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </span>
              </div>
             
            </div>
            <div className="flex flex-col  items-start  p-3   transition-colors duration-200">
              <div className="flex flex-row gap-2 item-center justify-center">
                <Calendar size={16} className=" mt-1" />
              <strong className="!text-gray-800 font-semibold" style={{ ...FONTS.cardSubHeader, fontWeight: 600 }}>Birthday</strong>
              <span>:</span>
              <span>
                
                <input
                  name="birthday"
                  type="text"
                  className="bg-transparent rounded-xl  outline-none w-full !text-gray-900 text-md" style={{ ...FONTS.subParagraph}}
                  value={formData.birthday}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </span>
              </div>
            
            </div>
            <div className="flex flex-col  items-start  p-3    transition-colors duration-200">
              <div className="flex flex-row gap-2 item-center justify-center">
                <Phone size={16} className=" mt-1" />
              <strong className="!text-gray-800 font-semibold" style={{ ...FONTS.cardSubHeader, fontWeight: 600 }}>Blood</strong>
              <span>:</span>
              <span>
                <input
                  name="blood"
                  type="text"
                  className="placeholder-black bg-transparent  ml-2 outline-none w-full !text-gray-900 text-md " style={{ ...FONTS.subParagraph}}
                  value={formData.blood}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </span>
              </div>
             
            </div>
            <div className="flex flex-col  items-start  p-3    transition-colors duration-200">
             <div className="flex flex-row gap-2 item-center justify-center">
               <User size={16} className=" mt-1" />
              <strong className="!text-gray-800 font-semibold" style={{ ...FONTS.cardSubHeader, fontWeight: 600 }}>Gender</strong>
              <span>:</span>
              <span>
                <select
                  name="gender"
                  className=" bg-transparent rounded-xl !text-gray-900 text-md" style={{ ...FONTS.subParagraph}}
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
            <div className="flex flex-col  items-start  p-3    transition-colors duration-200">
              <div className="flex flex-row gap-2 item-center justify-center">
                <MapPin size={16} className=" mt-1" />
              <strong className="!text-gray-800 font-semibold" style={{ ...FONTS.cardSubHeader, fontWeight: 600 }}>Address</strong>
              <span>:</span>
              <span>
                <input
                  name="address"
                  type="text"
                  className="block w-full  bg-transparent rounded-xl placeholder-black !text-gray-900 text-md" style={{ ...FONTS.subParagraph}}
                  value={formData.address}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </span>
              </div>
             
            </div>
            <div className="flex flex-col  items-start  p-3    transition-colors duration-200">
              <div className="flex flex-row gap-2 item-center justify-center">
                <MapPin size={16} className=" mt-1" />
              <strong className="!text-gray-800 font-semibold" style={{ ...FONTS.cardSubHeader, fontWeight: 600 }}>Family</strong>
              <span>:</span>
              <span>
                <input
                  name="family"
                  type="text"
                  className="block w-full  bg-transparent rounded-xl placeholder-black !text-gray-900 text-md" style={{ ...FONTS.subParagraph}}
                  value={formData.family}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </span>
              </div>
              
            </div>
            <div className="flex flex-col  items-start  p-3    transition-colors duration-200">
              <div className="flex flex-row gap-2 item-center justify-center">
                <User size={16} className=" mt-1" />
              <strong className="!text-gray-800 font-semibold" style={{ ...FONTS.cardSubHeader, fontWeight: 600 }}>Married Status</strong>
              <span>:</span> 
              <span>
                
                <select
                  name="marriedStatus"
                  className="ml-2 bg-transparent rounded-xl !text-gray-900 text-md" style={{ ...FONTS.subParagraph}}
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
        </div>

        {isEditing && (
          <div className="mt-3 flex justify-end gap-3 p-1  ">
            <button
              onClick={() => setIsEditing(false)}
              type="button"
              className="px-2 py-1 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200 font-semibold"
              style={{ ...FONTS.button }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-2 py-1 bg-gradient-to-r from-[#006666] to-[#008080] text-white rounded-lg hover:from-[#008080] hover:to-[#006666] transition-all duration-200  shadow-lg transform hover:scale-105"
              style={{ ...FONTS.button }}
            >
              Save Changes
            </button>
          </div>
        )}
      </form>
    </div>
  )
}










