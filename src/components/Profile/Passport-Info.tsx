import type React from "react";
import { useState } from "react";
import { FileText, Pencil } from "lucide-react";
import { FONTS } from "../../constants/uiConstants";

interface PassportInfo {
  number: string;
  nationality: string;
  issueDate: string;
  expiryDate: string;
}

interface PassportInfoProps {
  data: PassportInfo;
  onUpdate?: (data: PassportInfo) => void;
}

export const PassportInfoComponent: React.FC<PassportInfoProps> = ({
  data,
  onUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    passportNumber: data.number,
    passportNationality: data.nationality,
    passportIssueDate: data.issueDate,
    passportExpiryDate: data.expiryDate,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Passport info updated:", formData);
    setIsEditing(false);
    if (onUpdate) {
      const updatedData: PassportInfo = {
        number: formData.passportNumber,
        nationality: formData.passportNationality,
        issueDate: formData.passportIssueDate,
        expiryDate: formData.passportExpiryDate,
      };
      onUpdate(updatedData);
    }
  };

  return (
    <div className="flex flex-1 flex-col rounded-xl bg-white p-4 shadow-2xl border border-[#006666]/20 hover:shadow-3xl hover:scale-[1.02] transition-all duration-300 group">
      {isEditing && (
        <div className="mb-2  ">
          <p className="text-red-800 text-xs">
            Edit Mode Active - Make your changes and click Save
          </p>
        </div>
      )}

      <div className="flex items-center gap-3 mb-6 relative justify-between">
        <div className="flex gap-1 items-center justify-center ">
          <div className=" group-hover:scale-110 transition-transform duration-300">
            <FileText size={24} />
          </div>
          <h2 className=" !text-[#000000] "
          style={{...FONTS.cardheader}}>Passport Info</h2>
        </div>
        <button
          className=" p-1 hover:text-blue-200 rounded-lg cursor-pointer"
          onClick={() => setIsEditing(!isEditing)}
        >
          <Pencil size={16} />
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="text-sm space-y-2">
          <div className="p-3 border border-gray-500 rounded-xl hover:bg-[#006666]/20 transition-colors duration-200">
            <strong style={{...FONTS.cardSubHeader}} className="!text-gray-800">Passport Number:</strong>
            <input
              name="passportNumber"
              type="text"
              className="placeholder-black bg-transparent rounded-xl ml-2  outline-none w-full"
              value={formData.passportNumber}
              onChange={handleInputChange}
              readOnly={!isEditing}
            />
          </div>
          <div className="p-3 border border-gray-500 rounded-xl hover:bg-[#006666]/20 transition-colors duration-200">
            <strong style={{...FONTS.cardSubHeader}} className="!text-gray-800">Nationality:</strong>
            <input
              name="passportNationality"
              type="text"
              className="placeholder-black bg-transparent rounded-xl ml-2  outline-none w-full"
              value={formData.passportNationality}
              onChange={handleInputChange}
              readOnly={!isEditing}
            />
          </div>
          <div className="p-3 border border-gray-500 rounded-xl hover:bg-[#006666]/20 transition-colors duration-200">
            <strong style={{...FONTS.cardSubHeader}} className="!text-gray-800">Issue Date:</strong>
            <input
              name="passportIssueDate"
              type="text"
              className="placeholder-black bg-transparent rounded-xl ml-2  outline-none w-full"
              value={formData.passportIssueDate}
              onChange={handleInputChange}
              readOnly={!isEditing}
            />
          </div>
          <div className="p-3 border border-gray-500 rounded-xl hover:bg-[#006666]/20 transition-colors duration-200">
            <strong style={{...FONTS.cardSubHeader}} className="!text-gray-800">Expiry Date:</strong>
            <input
              name="passportExpiryDate"
              type="text"
              className="placeholder-black bg-transparent rounded-xl ml-2  outline-none w-full"
              value={formData.passportExpiryDate}
              onChange={handleInputChange}
              readOnly={!isEditing}
            />
          </div>
        </div>

        {isEditing && (
          <div className="mt-3 flex justify-end gap-2 p-1  ">
            <button
              onClick={() => setIsEditing(false)}
              type="button"
              className="px-1 py-1 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200 font-semibold"
              style={{...FONTS.button}}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-1 py-1 bg-gradient-to-r from-[#006666] to-[#008080] text-white rounded-lg hover:from-[#008080] hover:to-[#006666] transition-all duration-200 font-semibold shadow-lg transform hover:scale-105"
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
