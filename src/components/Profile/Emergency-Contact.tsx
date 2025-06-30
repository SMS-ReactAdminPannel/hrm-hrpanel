import type React from "react";
import { useState } from "react";
import { Pencil, Users } from "lucide-react";
import { FONTS } from "../../constants/uiConstants";

interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  email: string;
  address: string;
}

interface EmergencyInfo {
  primary: EmergencyContact;
  secondary: EmergencyContact;
}

interface EmergencyContactProps {
  data: EmergencyInfo;
  onUpdate?: (data: EmergencyInfo) => void;
}

export const EmergencyContactComponent: React.FC<EmergencyContactProps> = ({
  data,
  onUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
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
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Emergency contact updated:", formData);
    setIsEditing(false);
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
      };
      onUpdate(updatedData);
    }
  };

  return (
    <div className="flex flex-1 flex-col rounded-xl bg-white 
     p-4 shadow-2xl border border-[#006666]/20 hover:shadow-3xl  transition-all duration-300 group">
      {isEditing && (
        <div className="">
          <p className="text-red-800 text-xs">
            Edit Mode Active - Make your changes and click Save
          </p>
        </div>
      )}

      <div className="flex items-center justify-between mb-2 relative ">
        <div className="flex items-center gap-1 justify-center ">
          <div className="  transition-transform duration-300">
            <Users size={24} />
          </div>
          <div>
            <h2 className="text-lg !text-[#000000]/90"
            style={{...FONTS.header2}}>
            Emergency Contact
          </h2>
          </div>
        </div>
        <div className=" cursor-pointer   ">
          <button
            className="  hover:text-blue-200  rounded-lg cursor-pointer"
            onClick={() => setIsEditing(!isEditing)}
          >
            <Pencil size={16} />
          </button>
        </div>
      </div>
      <hr className="border-gray-900 mb-5" />

      <form onSubmit={handleSubmit}>
        <div className="mb-3   rounded-xl hover:shadow-md transition-shadow duration-200">
          <p className=" font-bold  !text-gray-900 mb-1"
          style={{...FONTS.cardheader}}>Primary Contact</p>
          <hr className="border-gray-900 mb-5 w-[44%] border-1" />
          <div className="text-sm  grid grid-cols-2 gap-3 ">
            <p className="flex items-center">
              <strong style={{...FONTS.statusCardHeader}} className="!text-gray-800 mr-2">Name:</strong>
              <input
                name="primaryName"
                type="text"
                className="placeholder-black bg-transparent rounded-xl outline-none w-full"
                value={formData.primaryName}
                onChange={handleInputChange}
                readOnly={!isEditing}
              />
            </p>
            <p className="flex items-center">
              <strong style={{...FONTS.statusCardHeader}}className="!text-gray-800">Relationship:</strong>
              <input
                name="primaryRelationship"
                type="text"
                className="placeholder-black bg-transparent rounded-xl ml-2 outline-none w-full"
                value={formData.primaryRelationship}
                onChange={handleInputChange}
                readOnly={!isEditing}
              />
            </p>
            <p className="flex items-center" >
              <strong style={{...FONTS.statusCardHeader}}className="!text-gray-800">Phone:</strong>
              <input
                name="primaryPhone"
                type="tel"
                className="placeholder-black bg-transparent rounded-xl ml-2 outline-none w-full"
                value={formData.primaryPhone}
                onChange={handleInputChange}
                readOnly={!isEditing}
              />
            </p>
            <p className="flex items-center">
              <strong style={{...FONTS.statusCardHeader}}className="!text-gray-800">Email:</strong>
              <input
                name="primaryEmail"
                type="email"
                className="placeholder-black bg-transparent rounded-xl ml-2 outline-none w-full"
                value={formData.primaryEmail}
                onChange={handleInputChange}
                readOnly={!isEditing}
              />
            </p>
            <p className="flex items-center">
              <strong style={{...FONTS.statusCardHeader}}className="!text-gray-800">Address:</strong>
              <input
                name="primaryAddress"
                type="text"
                className="placeholder-black bg-transparent rounded-xl ml-2 outline-none w-full"
                value={formData.primaryAddress}
                onChange={handleInputChange}
                readOnly={!isEditing}
              />
            </p>
          </div>
        </div>

        <div className=" rounded-xl hover:shadow-md transition-shadow duration-200">
          <p className="font-bold  !text-gray-900 mb-2"
          style={{...FONTS.cardheader}}>Secondary Contact</p>
          <hr className="border-gray-900 mb-5 w-[51%] border-1" />
          <div className="text-sm grid grid-cols-2 gap-5">
            <p className="flex items-center">
              <strong style={{...FONTS.statusCardHeader}}className="!text-gray-800">Name:</strong>
              <input
                name="secondaryName"
                type="text"
                className="placeholder-black bg-transparent rounded-xl ml-2 outline-none w-full "
                value={formData.secondaryName}
                onChange={handleInputChange}
                readOnly={!isEditing}
                // style={{...FONTS.paragraph}}
              />
            </p>
            <p className="flex items-center">
              <strong style={{...FONTS.statusCardHeader}}className="!text-gray-800">Relationship:</strong>
              <input
                name="secondaryRelationship"
                type="text"
                className="placeholder-black bg-transparent rounded-xl ml-2 outline-none w-full"
                value={formData.secondaryRelationship}
                onChange={handleInputChange}
                readOnly={!isEditing}
              />
            </p>
            <p className="flex items-center">
              <strong style={{...FONTS.statusCardHeader}}className="!text-gray-800">Phone:</strong>
              <input
                name="secondaryPhone"
                type="tel"
                className="placeholder-black bg-transparent rounded-xl ml-2 outline-none w-full"
                value={formData.secondaryPhone}
                onChange={handleInputChange}
                readOnly={!isEditing}
              />
            </p>
            <p className="flex items-center">
              <strong style={{...FONTS.statusCardHeader}}className="!text-gray-800">Email:</strong>
              <input
                name="secondaryEmail"
                type="email"
                className="placeholder-black bg-transparent rounded-xl ml-2 outline-none w-full"
                value={formData.secondaryEmail}
                onChange={handleInputChange}
                readOnly={!isEditing}
              />
            </p>
            <p className="flex items-center">
              <strong style={{...FONTS.statusCardHeader}}className="!text-gray-800">Address:</strong>
              <input
                name="secondaryAddress"
                type="text"
                className="placeholder-black bg-transparent rounded-xl ml-2 outline-none w-full"
                value={formData.secondaryAddress}
                onChange={handleInputChange}
                readOnly={!isEditing}
              />
            </p>
          </div>
        </div>

        {isEditing && (
          <div className="mt-3 flex justify-end gap-3 p-1">
            <button
              onClick={() => setIsEditing(false)}
              type="button"
              className="px-2 py-1 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200 font-semibold"
              style={{...FONTS.button}}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-2 py-1 bg-gradient-to-r from-[#006666] to-[#008080] text-white rounded-lg hover:from-[#008080] hover:to-[#006666] transition-all duration-200 font-semibold shadow-lg transform hover:scale-105"
            style={{...FONTS.button}}
            >
              Save Changes
            </button>
          </div>
        )}
      </form>
    </div>
  );
};
