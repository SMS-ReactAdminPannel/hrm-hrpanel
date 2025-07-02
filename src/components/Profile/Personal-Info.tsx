// import type React from "react"
// import { useState } from "react"
// import { User, Phone, Mail, MapPin, Calendar, CameraIcon, Pencil } from "lucide-react"
// import { FONTS } from "../../constants/uiConstants"

// interface PersonalInfo {
//   name: string
//   position: string
//   employeeId: string
//   joinDate: string
//   phone: string
//   email: string
//   blood: string
//   birthday: string
//   address: string
//   gender: string
//   profileImage: string
// }

// interface PersonalInfoProps {
//   data: PersonalInfo
//   onUpdate?: (data: PersonalInfo) => void
// }

// export const PersonalInfoComponent: React.FC<PersonalInfoProps> = ({ data, onUpdate }) => {
//   const [isEditing, setIsEditing] = useState(false)
//   const [profileImagePreview, setProfileImagePreview] = useState<string>(data.profileImage)
//   const [formData, setFormData] = useState({
//     name: data.name,
//     position: data.position,
//     empolyeeID:data.employeeId,
//     joinDate:data.joinDate,
//     phone: data.phone,
//     email: data.email,
//     birthday: data.birthday,
//     blood: data.blood,
//     gender: data.gender,
//     address: data.address,
//     family: data.address,
//     marriedStatus: "",
//   })

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (file) {
//       const reader = new FileReader()
//       reader.onload = (e) => {
//         setProfileImagePreview(e.target?.result as string)
//       }
//       reader.readAsDataURL(file)
//     }
//   }

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     console.log("Personal info updated:", formData)
//     setIsEditing(false)
//     if (onUpdate) {
//       onUpdate({
//         ...data,
//         ...formData,
//         profileImage: profileImagePreview,
//       })
//     }
//   }

//   return (
//     <div className="flex flex-2 flex-col rounded-xl bg-white max-w-[60%] h-full p-2 shadow-2xl border border-[#006666]/20  transition-all duration-300 group">
//       {isEditing && (
//         <div className=" flex p-2  -mb-3">
//           <p className="text-red-800 text-sm ">Edit Mode Active - Make your changes and click Save</p>
//         </div>
//       )}

//       <div className="flex items-center gap-3   relative ">
//         <div className="flex gap-1 items-center justify-center ">
//           <div className="p-3 -mr-2 !text-gray-700   ">
//             <User size={24} />
//           </div>
//           <div>
//             <h2 className="text-xl !text-gray-700  " style={{ ...FONTS.header }}>
//               Personal Information
//             </h2>
//           </div>
//         </div>
//         <div className="absolute right-1  cursor-pointer m-1">
//           <button
//             className=" !text-gray-700 p-1 hover:text-blue-200   rounded-lg cursor-pointer"
//             onClick={() => setIsEditing(!isEditing)}
//             style={{ ...FONTS.button }}
//           >
//             <Pencil size={16} className="!text-gray-700 " />
//           </button>
//         </div>
//       </div>
//       <hr className="border-gray-900 mb-5" />
//       {/* profile image and name section */}
//       <div className="flex items-center space-x-6 mb-8">
//         <div className="relative group">
//           <img
//             src={profileImagePreview || "/placeholder.svg"}
//             alt="Profile"
//             className="w-28 h-28 rounded-full object-cover shadow-lg"
//           />
//           {isEditing && (
//             <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
//               <label className="cursor-pointer bottom-1 absolute right-1 text-white text-xs font-semibold bg-blue-500 hover:bg-blue-600 rounded-full p-2 transition-colors duration-200">
//                 <CameraIcon size={16} />
//                 <input type="file" accept="image/*" onChange={handleProfileImageChange} className="hidden" />
//               </label>
//             </div>
//           )}
//         </div>
//         <div className="flex-2">
//           {isEditing ? (
//             <>
//               <input
//                 name="name"
//                 type="text"
//                 className="text-2xl font-bold text-slate-800 bg-transparent border-b border-gray-300 outline-none w-full mb-2"
//                 value={formData.name}
//                 onChange={handleInputChange}
//                 placeholder="Enter name"
//               />
//               <input
//                 name="position"
//                 type="text"
//                 className="text-[#000000]/100 font-semibold bg-transparent border-b border-gray-300 outline-none w-full mb-2"
//                 value={formData.position}
//                 onChange={handleInputChange}
//                 placeholder="Enter position"
//               />
//               <input
//                 name="name"
//                 type="text"
//                 className="text-2xl font-bold text-slate-800 bg-transparent border-b border-gray-300 outline-none w-full mb-2"
//                 value={formData.empolyeeID}
//                 onChange={handleInputChange}
//                 placeholder="Enter name"
//               />
//               <input
//                 name="position"
//                 type="text"
//                 className=" font-semibold bg-transparent border-b border-gray-300 outline-none w-full mb-2"
//                 value={formData.joinDate}
//                 onChange={handleInputChange}
//                 placeholder="Enter position"
//               />
//             </>
//           ) : (
//             <>
//               <h3 className="text-2xl font-bold text-slate-800">{data.name}</h3>
//               <p className=" font-semibold">{data.position}</p>
//               <p className="text-sm font-medium mt-1">
//             Employee ID: <span className=" font-bold">{data.employeeId}</span>
//           </p>
//           <p className="text-sm text-slate-900">Date of Join: {data.joinDate}</p>
//             </>
//           )}
          
//         </div>
//       </div>

//       {/* other sections */}

//       <form onSubmit={handleSubmit}>
//         <div className="">
//           <div className="grid-cols-2 grid md:grid-cols-1">
//             <div className="flex flex-col items-start  p-3    transition-colors duration-200">
//               <div className="flex flex-row gap-2 item-center justify-center  ">
//                 <Phone size={16} className=" mt-1 " />
//               <strong className="!text-gray-800 font-semibold" style={{ ...FONTS.cardSubHeader, fontWeight: 600 }}>Phone</strong>
//               <span>:</span>
//               <span className="">
//                 <input
//                   name="phone"
//                   type="tel"
//                   className="placeholder-black bg-transparent rounded-xl   outline-none w-full !text-gray-900 text-md" style={{ ...FONTS.subParagraph}}
//                   value={formData.phone}
//                   onChange={handleInputChange}
//                   readOnly={!isEditing}
//                 />
//               </span>
//               </div>
              
//             </div>
//             <div className="flex flex-col items-start  p-3   transition-colors duration-200">
//               <div className="flex flex-row gap-2 item-center justify-center">
//                 <Mail size={16} className="] mt-1" />
//               <strong className="!text-gray-800 font-semibold" style={{ ...FONTS.cardSubHeader, fontWeight: 600 }}>Email</strong>
//               <span>:</span>
//               <span>
//                   <input
//                   name="email"
//                   type="email"
//                   className="placeholder-black bg-transparent rounded-xl  outline-none w-full !text-gray-900 text-md" style={{ ...FONTS.subParagraph}}
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   readOnly={!isEditing}
//                 />
//               </span>
//               </div>
             
//             </div>
//             <div className="flex flex-col  items-start  p-3   transition-colors duration-200">
//               <div className="flex flex-row gap-2 item-center justify-center">
//                 <Calendar size={16} className=" mt-1" />
//               <strong className="!text-gray-800 font-semibold" style={{ ...FONTS.cardSubHeader, fontWeight: 600 }}>Birthday</strong>
//               <span>:</span>
//               <span>
                
//                 <input
//                   name="birthday"
//                   type="text"
//                   className="bg-transparent rounded-xl  outline-none w-full !text-gray-900 text-md" style={{ ...FONTS.subParagraph}}
//                   value={formData.birthday}
//                   onChange={handleInputChange}
//                   readOnly={!isEditing}
//                 />
//               </span>
//               </div>
            
//             </div>
//             <div className="flex flex-col  items-start  p-3    transition-colors duration-200">
//               <div className="flex flex-row gap-2 item-center justify-center">
//                 <Phone size={16} className=" mt-1" />
//               <strong className="!text-gray-800 font-semibold" style={{ ...FONTS.cardSubHeader, fontWeight: 600 }}>Blood</strong>
//               <span>:</span>
//               <span>
//                 <input
//                   name="blood"
//                   type="text"
//                   className="placeholder-black bg-transparent  ml-2 outline-none w-full !text-gray-900 text-md " style={{ ...FONTS.subParagraph}}
//                   value={formData.blood}
//                   onChange={handleInputChange}
//                   readOnly={!isEditing}
//                 />
//               </span>
//               </div>
             
//             </div>
//             <div className="flex flex-col  items-start  p-3    transition-colors duration-200">
//              <div className="flex flex-row gap-2 item-center justify-center">
//                <User size={16} className=" mt-1" />
//               <strong className="!text-gray-800 font-semibold" style={{ ...FONTS.cardSubHeader, fontWeight: 600 }}>Gender</strong>
//               <span>:</span>
//               <span>
//                 <select
//                   name="gender"
//                   className=" bg-transparent rounded-xl !text-gray-900 text-md" style={{ ...FONTS.subParagraph}}
//                   value={formData.gender}
//                   onChange={handleInputChange}
//                   disabled={!isEditing}
//                 >
//                   <option value="">Choose Your gender</option>
//                   <option value="Male">Male</option>
//                   <option value="Female">Female</option>
//                   <option value="Others">Others</option>
//                 </select>
//               </span>
//              </div>
            
//             </div>
//             <div className="flex flex-col  items-start  p-3    transition-colors duration-200">
//               <div className="flex flex-row gap-2 item-center justify-center">
//                 <MapPin size={16} className=" mt-1" />
//               <strong className="!text-gray-800 font-semibold" style={{ ...FONTS.cardSubHeader, fontWeight: 600 }}>Address</strong>
//               <span>:</span>
//               <span>
//                 <input
//                   name="address"
//                   type="text"
//                   className="block w-full  bg-transparent rounded-xl placeholder-black !text-gray-900 text-md" style={{ ...FONTS.subParagraph}}
//                   value={formData.address}
//                   onChange={handleInputChange}
//                   readOnly={!isEditing}
//                 />
//               </span>
//               </div>
             
//             </div>
//             <div className="flex flex-col  items-start  p-3    transition-colors duration-200">
//               <div className="flex flex-row gap-2 item-center justify-center">
//                 <MapPin size={16} className=" mt-1" />
//               <strong className="!text-gray-800 font-semibold" style={{ ...FONTS.cardSubHeader, fontWeight: 600 }}>Family</strong>
//               <span>:</span>
//               <span>
//                 <input
//                   name="family"
//                   type="text"
//                   className="block w-full  bg-transparent rounded-xl placeholder-black !text-gray-900 text-md" style={{ ...FONTS.subParagraph}}
//                   value={formData.family}
//                   onChange={handleInputChange}
//                   readOnly={!isEditing}
//                 />
//               </span>
//               </div>
              
//             </div>
//             <div className="flex flex-col  items-start  p-3    transition-colors duration-200">
//               <div className="flex flex-row gap-2 item-center justify-center">
//                 <User size={16} className=" mt-1" />
//               <strong className="!text-gray-800 font-semibold" style={{ ...FONTS.cardSubHeader, fontWeight: 600 }}>Married Status</strong>
//               <span>:</span> 
//               <span>
                
//                 <select
//                   name="marriedStatus"
//                   className="ml-2 bg-transparent rounded-xl !text-gray-900 text-md" style={{ ...FONTS.subParagraph}}
//                   value={formData.marriedStatus}
//                   onChange={handleInputChange}
//                   disabled={!isEditing}
//                 >
//                   <option value="">Choose</option>
//                   <option value="Single">Single</option>
//                   <option value="Married">Married</option>
//                 </select>
//               </span>
//               </div>
             
//             </div>
//           </div>
//         </div>

//         {isEditing && (
//           <div className="mt-3 flex justify-end gap-3 p-1  ">
//             <button
//               onClick={() => setIsEditing(false)}
//               type="button"
//               className="px-2 py-1 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200 font-semibold"
//               style={{ ...FONTS.button }}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-2 py-1 bg-gradient-to-r from-[#006666] to-[#008080] text-white rounded-lg hover:from-[#008080] hover:to-[#006666] transition-all duration-200  shadow-lg transform hover:scale-105"
//               style={{ ...FONTS.button }}
//             >
//               Save Changes
//             </button>
//           </div>
//         )}
//       </form>
//     </div>
//   )
// }

"use client"

import type React from "react"
import { useState } from "react"
import { User, Phone, Mail, MapPin, Calendar, CameraIcon, Pencil } from "lucide-react"

// Mock FONTS constant since it's not provided
const FONTS = {
  header: { fontFamily: "Inter, sans-serif", fontWeight: 600 },
  button: { fontFamily: "Inter, sans-serif", fontWeight: 500 },
  cardSubHeader: { fontFamily: "Inter, sans-serif", fontWeight: 500 },
  subParagraph: { fontFamily: "Inter, sans-serif", fontWeight: 400 },
}

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
    empolyeeID: data.employeeId,
    joinDate: data.joinDate,
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
    <div className="flex flex-2 flex-col rounded-2xl bg-white max-w-[60%] h-full  shadow-2xl border border-[#006666]/10 transition-all duration-500 ">
      {isEditing && (
        <div className="flex p-3 -mb-3 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border-l-4 border-red-400 animate-pulse">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
            <p className="text-red-800 text-sm font-medium">Edit Mode Active - Make your changes and click Save</p>
          </div>
        </div>
      )}

      <div className="flex items-center gap-4 relative bg-gradient-to-r from-[#006666]/5 to-[#008080]/5 rounded-xl p-4 mb-2">
        <div className="flex gap-2 items-center justify-center">
          <div className="p-3 -mr-2 !text-gray-700 bg-[#006666]/10 rounded-full transition-all duration-300 group-hover:bg-[#006666]/20">
            <User size={24} className="transition-transform duration-300 group-hover:scale-110" />
          </div>
          <div>
            <h2
              className="text-xl !text-gray-700 bg-gradient-to-r from-[#006666] to-[#008080] bg-clip-text text-transparent font-bold ml-3"
              style={{ ...FONTS.header }}
            >
              Personal Information
            </h2>
          </div>
        </div>
        <div className="absolute right-2 cursor-pointer m-1">
          <button
            className="!text-gray-700 p-2 hover:text-white hover:bg-gradient-to-r hover:from-[#006666] hover:to-[#008080] rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
            onClick={() => setIsEditing(!isEditing)}
            style={{ ...FONTS.button }}
          >
            <Pencil size={16} className="!text-gray-700 hover:!text-white transition-colors duration-300" />
          </button>
        </div>
      </div>

      {/* <hr className="border-gradient-to-r from-transparent via-gray-300 to-transparent mb-6 opacity-50" /> */}

      {/* profile image and name section */}
      <div className="flex items-center space-x-8 mb-10 bg-gradient-to-r from-gray-50/50 to-white/50 rounded-2xl p-6 border border-gray-100/50 shadow-inner">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#006666] to-[#008080] rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
          <img
            src={profileImagePreview || "/placeholder.svg?height=112&width=112"}
            alt="Profile"
            className="relative w-28 h-28 rounded-full object-cover shadow-2xl ring-4 ring-white transition-all duration-300 group-hover:scale-105"
          />
          {isEditing && (
            <div className="absolute inset-0 bg-black bg-opacity-60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
              <label className="cursor-pointer bottom-2 absolute right-2 text-white text-xs font-semibold bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-full p-3 transition-all duration-300 transform hover:scale-110 shadow-lg">
                <CameraIcon size={16} />
                <input type="file" accept="image/*" onChange={handleProfileImageChange} className="hidden" />
              </label>
            </div>
          )}
        </div>

        <div className="flex-2">
          {isEditing ? (
            <div className="space-y-3">
              <input
                name="name"
                type="text"
                className="text-2xl font-bold text-slate-800 bg-transparent border-b-2 border-gray-300 focus:border-[#006666] outline-none w-full pb-2 transition-all duration-300"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter name"
              />
              <input
                name="position"
                type="text"
                className="text-[#000000]/100 font-semibold bg-transparent border-b-2 border-gray-300 focus:border-[#006666] outline-none w-full pb-2 transition-all duration-300"
                value={formData.position}
                onChange={handleInputChange}
                placeholder="Enter position"
              />
              <input
                name="name"
                type="text"
                className="text-lg font-medium text-slate-700 bg-transparent border-b-2 border-gray-300 focus:border-[#006666] outline-none w-full pb-2 transition-all duration-300"
                value={formData.empolyeeID}
                onChange={handleInputChange}
                placeholder="Enter employee ID"
              />
              <input
                name="position"
                type="text"
                className="font-medium text-slate-600 bg-transparent border-b-2 border-gray-300 focus:border-[#006666] outline-none w-full pb-2 transition-all duration-300"
                value={formData.joinDate}
                onChange={handleInputChange}
                placeholder="Enter join date"
              />
            </div>
          ) : (
            <div className="space-y-2">
              <h3 className="text-3xl font-bold text-slate-800 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                {data.name}
              </h3>
              <p className="text-lg font-semibold text-[#006666]">{data.position}</p>
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium bg-gradient-to-r from-[#006666] to-[#008080] bg-clip-text text-transparent">
                  Employee ID: <span className="font-bold text-slate-700">{data.employeeId}</span>
                </p>
                <p className="text-sm text-slate-600 font-medium">
                  Date of Join: <span className="text-slate-800">{data.joinDate}</span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* other sections */}
      <form onSubmit={handleSubmit}>
        <div className="bg-gradient-to-br from-gray-50/30 to-white/50 rounded-2xl  border border-gray-100/50 shadow-inner">
          <div className="grid-cols-2 grid md:grid-cols-1 gap-2">
            <div className="flex flex-col items-start  hover:bg-white/50 rounded-xl transition-all duration-300 border border-transparent hover:border-gray-200/50 hover:shadow-sm">
              <div className="flex flex-row gap-3 items-center justify-center w-full">
                <div className="p-2  rounded-lg">
                  <Phone size={16} className="text-[#006666]" />
                </div>
                <strong
                  className="!text-gray-800 font-semibold min-w-[80px]"
                  style={{ ...FONTS.cardSubHeader, fontWeight: 600 }}
                >
                  Phone :
                </strong>
                {/* <span className="text-gray-600">:</span> */}
                <span className="flex-1">
                  <input
                    name="phone"
                    type="tel"
                    className="placeholder-gray-400 bg-transparent 
                    rounded-xl outline-none w-full !text-gray-900 
                    text-md focus:bg-white/50 transition-all duration-300 -ml-7 border border-transparent focus:border-[#006666]/30"
                    style={{ ...FONTS.subParagraph }}
                    value={formData.phone}
                    onChange={handleInputChange}
                    readOnly={!isEditing}
                  />
                </span>
              </div>
            </div>

            <div className="flex flex-col items-start  hover:bg-white/50 rounded-xl transition-all duration-300 border border-transparent hover:border-gray-200/50 hover:shadow-sm">
              <div className="flex flex-row gap-3 items-center justify-center w-full">
                <div className="  rounded-lg">
                  <Mail size={16} className="text-[#006666]" />
                </div>
                <strong
                  className="!text-gray-800 font-semibold min-w-[80px]"
                  style={{ ...FONTS.cardSubHeader, fontWeight: 600 }}
                >
                  Email :
                </strong>
              
                <span className="flex-1">
                  <input
                    name="email"
                    type="email"
                    className="placeholder-gray-400 bg-transparent rounded-xl outline-none w-full 
                    !text-gray-900 text-md focus:bg-white/50 transition-all duration-300 
                     border border-transparent focus:border-[#006666]/30 -ml-8"
                    style={{ ...FONTS.subParagraph }}
                    value={formData.email} 
                    onChange={handleInputChange}
                    readOnly={!isEditing}
                  />
                </span>
              </div>
            </div>

            <div className="flex flex-col items-start  hover:bg-white/50 rounded-xl transition-all duration-300 border border-transparent hover:border-gray-200/50 hover:shadow-sm">
              <div className="flex flex-row gap-3 items-center justify-center w-full">
                <div className="p-2 rounded-lg">
                  <Calendar size={16} className="text-[#006666]" />
                </div>
                <strong
                  className="!text-gray-800 font-semibold min-w-[80px]"
                  style={{ ...FONTS.cardSubHeader, fontWeight: 600 }}
                >
                  Birthday :
                </strong>
                
                <span className="flex-1">
                  <input
                    name="birthday"
                    type="text"
                    className="bg-transparent rounded-xl -ml-5 outline-none w-full !text-gray-900 text-md focus:bg-white/50 transition-all duration-300 p-2 border border-transparent focus:border-[#006666]/30"
                    style={{ ...FONTS.subParagraph }}
                    value={formData.birthday}
                    onChange={handleInputChange}
                    readOnly={!isEditing}
                  />
                </span>
              </div>
            </div>

            <div className="flex flex-col items-start  hover:bg-white/50 rounded-xl  transition-all duration-300 border border-transparent hover:border-gray-200/50 hover:shadow-sm">
              <div className="flex flex-row gap-3 items-center justify-center w-full">
                <div className="  rounded-lg">
                  <Phone size={16} className="text-[#006666]" />
                </div>
                <strong
                  className="!text-gray-800 font-semibold min-w-[80px]"
                  style={{ ...FONTS.cardSubHeader, fontWeight: 600 }}
                >
                  Blood :
                </strong>
               
                <span className="flex-1">
                  <input
                    name="blood"
                    type="text"
                    className="placeholder-gray-400 -ml-9 bg-transparent outline-none w-full !text-gray-900 text-md focus:bg-white/50 transition-all duration-300 p-2 border border-transparent focus:border-[#006666]/30 rounded-xl"
                    style={{ ...FONTS.subParagraph }}
                    value={formData.blood}
                    onChange={handleInputChange}
                    readOnly={!isEditing}
                  />
                </span>
              </div>
            </div>

            <div className="flex flex-col items-start  hover:bg-white/50 rounded-xl transition-all duration-300 border border-transparent hover:border-gray-200/50 hover:shadow-sm">
              <div className="flex flex-row gap-3 items-center justify-center w-full">
                <div className="p-2 rounded-lg">
                  <User size={16} className="text-[#006666]" />
                </div>
                <strong
                  className="!text-gray-800 font-semibold min-w-[80px]"
                  style={{ ...FONTS.cardSubHeader, fontWeight: 600 }}
                >
                  Gender :
                </strong>
                
                <span className="flex-1">
                  <select
                    name="gender"
                    className="bg-transparent rounded-xl -ml-8 !text-gray-900 text-md focus:bg-white/50 transition-all duration-300 p-2 border border-transparent focus:border-[#006666]/30 w-full outline-none"
                    style={{ ...FONTS.subParagraph }}
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

            <div className="flex flex-col items-start  hover:bg-white/50 rounded-xl transition-all duration-300 border border-transparent hover:border-gray-200/50 hover:shadow-sm">
              <div className="flex flex-row gap-3 items-center justify-center w-full">
                <div className=" rounded-lg">
                  <MapPin size={16} className="text-[#006666]" />
                </div>
                <strong
                  className="!text-gray-800 font-semibold min-w-[80px]"
                  style={{ ...FONTS.cardSubHeader, fontWeight: 600 }}
                >
                  Address :
                </strong>
                
                <span className="flex-1">
                  <input
                    name="address"
                    type="text"
                    className="block w-full bg-transparent -ml-6 rounded-xl placeholder-gray-400 !text-gray-900 text-md focus:bg-white/50 transition-all duration-300 p-2 border border-transparent focus:border-[#006666]/30 outline-none"
                    style={{ ...FONTS.subParagraph }}
                    value={formData.address}
                    onChange={handleInputChange}
                    readOnly={!isEditing}
                  />
                </span>
              </div>
            </div>

            <div className="flex flex-col items-start  hover:bg-white/50 rounded-xl transition-all duration-300 border border-transparent hover:border-gray-200/50 hover:shadow-sm">
              <div className="flex flex-row gap-3 items-center justify-center w-full">
                <div className="p-2  rounded-lg">
                  <MapPin size={16} className="text-[#006666]" />
                </div>
                <strong
                  className="!text-gray-800 font-semibold min-w-[80px]"
                  style={{ ...FONTS.cardSubHeader, fontWeight: 600 }}
                >
                  Family :
                </strong>
                
                <span className="flex-1">
                  <input
                    name="family"
                    type="text"
                    className="block w-full bg-transparent -ml-9 rounded-xl placeholder-gray-400 !text-gray-900 text-md focus:bg-white/50 transition-all duration-300 p-2 border border-transparent focus:border-[#006666]/30 outline-none"
                    style={{ ...FONTS.subParagraph }}
                    value={formData.family}
                    onChange={handleInputChange}
                    readOnly={!isEditing}
                  />
                </span>
              </div>
            </div>

            <div className="flex flex-col items-start  hover:bg-white/50 rounded-xl transition-all duration-300 border border-transparent hover:border-gray-200/50 hover:shadow-sm">
              <div className="flex flex-row gap-3 items-center justify-center w-full">
                <div className=" rounded-lg">
                  <User size={16} className="text-[#006666]" />
                </div>
                <strong
                  className="!text-gray-800 font-semibold min-w-[80px]"
                  style={{ ...FONTS.cardSubHeader, fontWeight: 600 }}
                >
                  Married Status
                </strong>
                <span className="text-gray-600">:</span>
                <span className="flex-1">
                  <select
                    name="marriedStatus"
                    className="bg-transparent rounded-xl !text-gray-900 text-md focus:bg-white/50 transition-all duration-300 p-2 border border-transparent focus:border-[#006666]/30 w-full outline-none"
                    style={{ ...FONTS.subParagraph }}
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
          <div className="mt-6 flex justify-end gap-4 p-2">
            <button
              onClick={() => setIsEditing(false)}
              type="button"
              className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-gray-700 rounded-xl hover:from-gray-600 hover:to-gray-700 transition-all duration-300 font-semibold shadow-lg transform  "
              style={{ ...FONTS.button }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-[#006666] to-[#008080] text-white rounded-xl hover:from-[#008080] hover:to-[#006666] transition-all duration-300 shadow-lg transform  font-semibold"
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










