


import type React from "react"
import { useState } from "react"
import { Pencil, Users } from "lucide-react"

// Mock FONTS constant since it's not provided
const FONTS = {
  header: { fontFamily: "Inter, sans-serif", fontWeight: 600 },
  button: { fontFamily: "Inter, sans-serif", fontWeight: 500 },
  cardheader: { fontFamily: "Inter, sans-serif", fontWeight: 600 },
  cardSubHeader: { fontFamily: "Inter, sans-serif", fontWeight: 500 },
  subParagraph: { fontFamily: "Inter, sans-serif", fontWeight: 400 },
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

interface EmergencyContactProps {
  data: EmergencyInfo
  onUpdate?: (data: EmergencyInfo) => void
}

export const EmergencyContactComponent: React.FC<EmergencyContactProps> = ({ data, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    primaryName: data.primary.name,
    primaryRelationship: data.primary.relationship,
    primaryPhone: data.primary.phone,
    primaryEmail: data.primary.email,
    primaryAddress: data.primary.address,
    secondaryName: data.secondary.name,
    secondaryRelationship: data.secondary.relationship,
    secondaryPhone: data.secondary.phone,
    secondaryEmail: data.secondary.email,
    secondaryAddress: data.secondary.address,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Emergency contact updated:", formData)
    setIsEditing(false)
    if (onUpdate) {
      const updatedData: EmergencyInfo = {
        primary: {
          name: formData.primaryName,
          relationship: formData.primaryRelationship,
          phone: formData.primaryPhone,
          email: formData.primaryEmail,
          address: formData.primaryAddress,
        },
        secondary: {
          name: formData.secondaryName,
          relationship: formData.secondaryRelationship,
          phone: formData.secondaryPhone,
          email: formData.secondaryEmail,
          address: formData.secondaryAddress,
        },
      }
      onUpdate(updatedData)
    }
  }

  return (
    <div className="flex flex-1 flex-col rounded-2xl bg-white py-4 shadow-2xl border border-[#006666]/10 hover:shadow-3xl transition-all duration-500 group backdrop-blur-sm">
      {isEditing && (
        <div className="p-1 -mb-1 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border-l-4 border-red-400 animate-pulse">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
            <p className="text-red-800 text-xs font-medium">Edit Mode Active - Make your changes and click Save</p>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-2 relative bg-gradient-to-r from-[#006666]/5 to-[#008080]/5 rounded-xl p-1">
        <div className="flex items-center gap-2 justify-center">
          <div className="p-1 bg-[#006666]/10 rounded-full transition-all duration-300 group-hover:bg-[#006666]/20">
            <Users size={20} className="text-[#006666] transition-transform duration-300 group-hover:scale-110" />
          </div>
          <div>
            <h2
              className="text-base !text-[#000000]/90 ml-1 bg-gradient-to-r from-[#006666] to-[#008080] bg-clip-text text-transparent font-bold"
              style={{ ...FONTS.header }}
            >
              Emergency Contact 
            </h2>
          </div>
        </div>

        <div className="cursor-pointer p-1">
          <button
            className="p-1 hover:text-white hover:bg-gradient-to-r hover:from-[#006666] hover:to-[#008080] rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
            onClick={() => setIsEditing(!isEditing)}
          >
            <Pencil size={14} className="text-gray-700 hover:text-white transition-colors duration-300" />
          </button>
        </div>
      </div>

      <hr className="border-gradient-to-r from-transparent via-gray-300 to-transparent mb-2 opacity-50" />

      <form onSubmit={handleSubmit}>
        <div className="mb-2 bg-gray-200 rounded-2xl p-1 border border-blue-100/50 shadow-inner hover:shadow-md transition-all duration-300">
          <p
            className="font-bold !text-gray-900 mb-2 text-base bg-gradient-to-r from-[#006666] to-[#008080] bg-clip-text text-transparent"
            style={{ ...FONTS.cardheader }}
          >
            Primary Contact 
          </p>
          <div className="text-sm grid grid-cols-2 gap-2">
            <p className="flex items-center p-1 hover:bg-white/50 rounded-xl transition-all duration-300 border border-transparent hover:border-blue-200/50">
              <strong
                className="!text-gray-800 font-semibold min-w-[60px] text-xs"
                style={{ ...FONTS.cardSubHeader, fontWeight: 600 }}
              >
                Name :
              </strong>
          
              <input
                name="primaryName"
                type="text"
                className="placeholder-gray-400 bg-transparent rounded-xl -ml-4 outline-none w-full !text-gray-900 text-sm focus:bg-white/50 transition-all duration-300 p-1 border border-transparent focus:border-[#006666]/30"
                style={{ ...FONTS.subParagraph }}
                value={formData.primaryName}
                onChange={handleInputChange}
                readOnly={!isEditing}
              />
            </p>
            <p className="flex items-center -ml-6 hover:bg-white/50 rounded-xl transition-all duration-300 border border-transparent hover:border-blue-200/50">
              <strong
                className="!text-gray-800 font-semibold min-w-[80px] text-xs"
                style={{ ...FONTS.cardSubHeader, fontWeight: 600 }}
              >
                Relationship :
              </strong>
              
              <input
                name="primaryRelationship"
                type="text"
                className="placeholder-gray-400 bg-transparent rounded-xl  outline-none w-full !text-gray-900 text-sm focus:bg-white/50 transition-all duration-300 p-1 border border-transparent focus:border-[#006666]/30"
                style={{ ...FONTS.subParagraph }}
                value={formData.primaryRelationship}
                onChange={handleInputChange}
                readOnly={!isEditing}
              />
            </p>
            <p className="flex items-center p-1 hover:bg-white/50 rounded-xl transition-all duration-300 border border-transparent hover:border-blue-200/50">
              <strong
                className="!text-gray-800 font-semibold min-w-[60px] text-xs"
                style={{ ...FONTS.cardSubHeader, fontWeight: 600 }}
              >
                Phone :
              </strong>
              
              <input
                name="primaryPhone"
                type="tel"
                className="placeholder-gray-400 -ml-3 bg-transparent rounded-xl ml-1 outline-none w-full !text-gray-900 text-sm focus:bg-white/50 transition-all duration-300 p-1 border border-transparent focus:border-[#006666]/30"
                style={{ ...FONTS.subParagraph }}
                value={formData.primaryPhone}
                onChange={handleInputChange}
                readOnly={!isEditing}
              />
            </p>
            <p className="flex items-center -ml-6 hover:bg-white/50 rounded-xl transition-all duration-300 border border-transparent hover:border-blue-200/50">
              <strong
                className="!text-gray-800 font-semibold min-w-[60px] text-xs"
                style={{ ...FONTS.cardSubHeader, fontWeight: 600 }}
              >
                Email :
              </strong>
              
              <input
                name="primaryEmail"
                type="email"
                className="placeholder-gray-400 -ml-4 bg-transparent rounded-xl ml-1 outline-none w-full !text-gray-900 text-sm focus:bg-white/50 transition-all duration-300 p-1 border border-transparent focus:border-[#006666]/30"
                style={{ ...FONTS.subParagraph }}
                value={formData.primaryEmail}
                onChange={handleInputChange}
                readOnly={!isEditing}
              />
            </p>
            <p className="flex items-center p-1 hover:bg-white/50 rounded-xl transition-all duration-300 border border-transparent hover:border-blue-200/50 col-span-2">
              <strong
                className="!text-gray-800 font-semibold min-w-[60px] text-xs"
                style={{ ...FONTS.cardSubHeader, fontWeight: 600 }}
              >
                Address :
              </strong>
               
              <input
                name="primaryAddress"
                type="text"
                className="placeholder-gray-400 -ml-1 bg-transparent rounded-xl ml-1 outline-none w-full !text-gray-900 text-sm focus:bg-white/50 transition-all duration-300 p-1 border border-transparent focus:border-[#006666]/30"
                style={{ ...FONTS.subParagraph }}
                value={formData.primaryAddress}
                onChange={handleInputChange}
                readOnly={!isEditing}
              />
            </p>
          </div>
        </div>

        <div className="bg-gray-200 rounded-2xl p-1 mt-6 border border-green-100/50 shadow-inner hover:shadow-md transition-all duration-300">
          <p
            className="font-bold !text-gray-900 mb-2 text-base bg-gradient-to-r from-[#006666] to-[#008080] bg-clip-text text-transparent"
            style={{ ...FONTS.cardheader }}
          >
            Secondary Contact
          </p>
          <div className="text-sm grid grid-cols-2 gap-2">
            <p className="flex items-center p-1 hover:bg-white/50 rounded-xl transition-all duration-300 border border-transparent hover:border-green-200/50">
              <strong
                className="!text-gray-800 font-semibold min-w-[60px] text-xs"
                style={{ ...FONTS.cardSubHeader, fontWeight: 600 }}
              >
                Name:
              </strong>
              <input
                name="secondaryName"
                type="text"
                className="placeholder-gray-400 -ml-5 bg-transparent rounded-xl ml-1 outline-none w-full !text-gray-900 text-sm focus:bg-white/50 transition-all duration-300 p-1 border border-transparent focus:border-[#006666]/30"
                style={{ ...FONTS.subParagraph }}
                value={formData.secondaryName}
                onChange={handleInputChange}
                readOnly={!isEditing}
              />
            </p>
            <p className="flex items-center -ml-6  hover:bg-white/50 rounded-xl transition-all duration-300 border border-transparent hover:border-green-200/50">
              <strong
                className="!text-gray-800 font-semibold min-w-[80px] text-xs"
                style={{ ...FONTS.cardSubHeader, fontWeight: 600 }}
              >
                Relationship:
              </strong>
              <input
                name="secondaryRelationship"
                type="text"
                className="placeholder-gray-400 -ml-1 bg-transparent rounded-xl ml-1 outline-none w-full !text-gray-900 text-sm focus:bg-white/50 transition-all duration-300 p-1 border border-transparent focus:border-[#006666]/30"
                style={{ ...FONTS.subParagraph }}
                value={formData.secondaryRelationship}
                onChange={handleInputChange}
                readOnly={!isEditing}
              />
            </p>
            <p className="flex items-center p-1 hover:bg-white/50 rounded-xl transition-all duration-300 border border-transparent hover:border-green-200/50">
              <strong
                className="!text-gray-800 font-semibold min-w-[60px] text-xs"
                style={{ ...FONTS.cardSubHeader, fontWeight: 600 }}
              >
                Phone:
              </strong>
              <input
                name="secondaryPhone"
                type="tel"
                className="placeholder-gray-400 -ml-4 bg-transparent rounded-xl  outline-none w-full !text-gray-900 text-sm focus:bg-white/50 transition-all duration-300 p-1 border border-transparent focus:border-[#006666]/30"
                style={{ ...FONTS.subParagraph }}
                value={formData.secondaryPhone}
                onChange={handleInputChange}
                readOnly={!isEditing}
              />
            </p>
            <p className="flex items-center -ml-6  hover:bg-white/50 rounded-xl transition-all duration-300 border border-transparent hover:border-green-200/50">
              <strong
                className="!text-gray-800 font-semibold min-w-[60px] text-xs"
                style={{ ...FONTS.cardSubHeader, fontWeight: 600 }}
              >
                Email:
              </strong>
              <input
                name="secondaryEmail"
                type="email"
                className="placeholder-gray-400 -ml-5 bg-transparent rounded-xl ml-1 outline-none w-full !text-gray-900 text-sm focus:bg-white/50 transition-all duration-300 p-1 border border-transparent focus:border-[#006666]/30"
                style={{ ...FONTS.subParagraph }}
                value={formData.secondaryEmail}
                onChange={handleInputChange}
                readOnly={!isEditing}
              />
            </p>
            <p className="flex items-center p-1 hover:bg-white/50 rounded-xl transition-all duration-300 border border-transparent hover:border-green-200/50 col-span-2">
              <strong
                className="!text-gray-800 font-semibold min-w-[60px] text-xs"
                style={{ ...FONTS.cardSubHeader, fontWeight: 600 }}
              >
                Address:
              </strong>
              <input
                name="secondaryAddress"
                type="text"
                className="placeholder-gray-400 -ml-2 bg-transparent rounded-xl ml-1 outline-none w-full !text-gray-900 text-sm focus:bg-white/50 transition-all duration-300 p-1 border border-transparent focus:border-[#006666]/30"
                style={{ ...FONTS.subParagraph }}
                value={formData.secondaryAddress}
                onChange={handleInputChange}
                readOnly={!isEditing}
              />
            </p>
          </div>
        </div>

        {isEditing && (
          <div className="mt-2 flex justify-end gap-2 p-1">
            <button
              onClick={() => setIsEditing(false)}
              type="button"
              className="px-4 py-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl hover:from-gray-600 hover:to-gray-700 transition-all duration-300 font-semibold shadow-lg transform hover:scale-105 hover:shadow-xl text-sm"
              style={{ ...FONTS.button }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-[#006666] to-[#008080] text-white rounded-xl hover:from-[#008080] hover:to-[#006666] transition-all duration-300 font-semibold shadow-lg transform hover:scale-105 hover:shadow-2xl text-sm"
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
