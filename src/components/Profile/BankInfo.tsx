import type React from "react";
import { useState } from "react";
import { CreditCard, Pencil } from "lucide-react";
import { FONTS } from "../../constants/uiConstants";

interface BankInfo {
  holderName: string;
  accountNumber: string;
  bankName: string;
  branchName: string;
  swiftCode: string;
}

interface BankInfoProps {
  data: BankInfo;
  onUpdate?: (data: BankInfo) => void;
}

export const BankInfoComponent: React.FC<BankInfoProps> = ({
  data,
  onUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    bankHolderName: data.holderName,
    bankAccountNumber: data.accountNumber,
    bankName: data.bankName,
    bankBranchName: data.branchName,
    bankSwiftCode: data.swiftCode,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Bank info updated:", formData);
    setIsEditing(false);
    if (onUpdate) {
      const updatedData: BankInfo = {
        holderName: formData.bankHolderName,
        accountNumber: formData.bankAccountNumber,
        bankName: formData.bankName,
        branchName: formData.bankBranchName,
        swiftCode: formData.bankSwiftCode,
      };
      onUpdate(updatedData);
    }
  };

  return (
    <div className="flex flex-1 flex-col rounded-xl bg-white p-4 shadow-2xl border border-[#006666]/20 hover:shadow-3xl hover:scale-[1.02] transition-all duration-300 group">
      {isEditing && (
        <div className="mb-2 p-1">
          <p className="text-red-800 text-xs">
            Edit Mode Active - Make your changes and click Save
          </p>
        </div>
      )}

      <div className="flex items-center gap-3 mb-6 relative justify-between">
        <div className="flex gap-1 ">
          <div className=" group-hover:scale-110 transition-transform duration-300">
            <CreditCard size={24} />
          </div>
          <div><h2 className=" text-sm flex mt-[3px] !text-[#000000] "
          style={{...FONTS.cardheader}}>Bank Account</h2></div>
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
          <div className="p-3 border rounded-xl border-gray-500">
            <strong style={{...FONTS.cardSubHeader}} className="!text-gray-800">Account Holder:</strong>
            <input
              name="bankHolderName"
              type="text"
              className="placeholder-black  bg-transparent rounded-xl ml-2 outline-none w-full"
              value={formData.bankHolderName}
              onChange={handleInputChange}
              readOnly={!isEditing}
            />
          </div>
          <div className="p-3 border rounded-xl border-gray-500">
            <strong style={{...FONTS.cardSubHeader}} className="!text-gray-800">Account Number:</strong>
            <input
              name="bankAccountNumber"
              type="text"
              className="placeholder-black  bg-transparent  ml-2 outline-none w-full"
              value={formData.bankAccountNumber}
              onChange={handleInputChange}
              readOnly={!isEditing}
            />
          </div>
          <div className="p-3 border rounded-xl border-gray-500">
            <strong style={{...FONTS.cardSubHeader}} className="!text-gray-800">Bank Name:</strong>
            <input
              name="bankName"
              type="text"
              className="placeholder-black  bg-transparent ml-2 outline-none w-full"
              value={formData.bankName}
              onChange={handleInputChange}
              readOnly={!isEditing}
            />
          </div>
          <div className="p-3 border rounded-xl border-gray-500">
            <strong style={{...FONTS.cardSubHeader}} className="!text-gray-800">Branch Name:</strong>
            <input
              name="bankBranchName"
              type="text"
              className="placeholder-black  bg-transparent  ml-2 outline-none w-full"
              value={formData.bankBranchName}
              onChange={handleInputChange}
              readOnly={!isEditing}
            />
          </div>
          <div className="p-3 border rounded-xl border-gray-500">
            <strong style={{...FONTS.cardSubHeader}} className="!text-gray-800" >SWIFT Code:</strong>
            <input
              name="bankSwiftCode"
              type="text"
              className="placeholder-black  bg-transparent ml-2 outline-none w-full "
              value={formData.bankSwiftCode}
              onChange={handleInputChange}
              readOnly={!isEditing}
            />
          </div>
        </div>

        {isEditing && (
          <div className="mt-3 flex justify-end gap-3 p-1 ">
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
