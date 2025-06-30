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
    <div className="flex flex-1 flex-col rounded-xl h-full
    bg-white px-2 py-4 shadow-2xl border border-[#006666]/20 ">
      {isEditing && (
        <div className="mb-2 p-1">
          <p className="text-red-800 text-xs">
            Edit Mode Active - Make your changes and click Save
          </p>
        </div>
      )}

      <div className="flex items-center gap-3 mb-2 relative justify-between">
        <div className="flex gap-1 ">
          <div className="  transition-transform duration-300">
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
      <hr className="border-gray-900 mb-6 mt-2" />
      <form onSubmit={handleSubmit}>
        <div className="text-sm ">
          <div className="flex items-center py-2 px-3">
        <strong className="!text-gray-800 font-semibold" style={{ ...FONTS.cardSubHeader, fontWeight: 600 }}>Account Holder</strong>
        <span className="ml-1">:</span>
        <input
          name="bankHolderName"
          type="text"
          className="placeholder-black bg-transparent rounded-xl ml-2 outline-none flex-1"
          value={formData.bankHolderName}
          onChange={handleInputChange}
          readOnly={!isEditing}
        />
          </div>
          <div className="flex items-center py-2  px-3">
        <strong className="!text-gray-800 font-semibold" style={{ ...FONTS.cardSubHeader, fontWeight: 600 }}>Account Number</strong>
        <span className="ml-1">:</span>
        <input
          name="bankAccountNumber"
          type="text"
          className="placeholder-black bg-transparent ml-2 outline-none flex-1"
          value={formData.bankAccountNumber}
          onChange={handleInputChange}
          readOnly={!isEditing}
        />
          </div>
          <div className="flex items-center py-2  px-3">
        <strong className="!text-gray-800 font-semibold" style={{ ...FONTS.cardSubHeader, fontWeight: 600 }}>Bank Name</strong>
        <span className="ml-1">:</span>
        <input
          name="bankName"
          type="text"
          className="placeholder-black bg-transparent ml-2 outline-none flex-1"
          value={formData.bankName}
          onChange={handleInputChange}
          readOnly={!isEditing}
        />
          </div>
          <div className="flex items-center py-2  px-3">
        <strong className="!text-gray-800 font-semibold" style={{ ...FONTS.cardSubHeader, fontWeight: 600 }}>Branch Name
        <span className="ml-1">:</span>
        </strong>
        <input
          name="bankBranchName"
          type="text"
          className="placeholder-black bg-transparent ml-2 outline-none flex-1"
          value={formData.bankBranchName}
          onChange={handleInputChange}
          readOnly={!isEditing}
        />
          </div>
          <div className="flex items-center  px-3 py-2">
        <strong className="!text-gray-800 font-semibold" style={{ ...FONTS.cardSubHeader, fontWeight: 600 }}>SWIFT Code</strong>
        <span className="ml-1">:</span>
        <input
          name="bankSwiftCode"
          type="text"
          className="placeholder-black bg-transparent ml-2 outline-none flex-1"
          value={formData.bankSwiftCode}
          onChange={handleInputChange}
          readOnly={!isEditing}
        />
          </div>
        </div>

        {isEditing && (
          <div className="mt-3 flex justify-end gap-3 p-1">
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
          className="px-2 py-1 bg-gradient-to-r from-[#006666] to-[#008080] text-white rounded-lg hover:from-[#008080] hover:to-[#006666] transition-all duration-200 font-semibold shadow-lg transform hover:scale-105"
          style={{ ...FONTS.button }}
        >
          Save Changes
        </button>
          </div>
        )}
      </form>
    </div>
  );
};
