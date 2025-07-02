
import type React from "react";
import { useState } from "react";
import { CreditCard, Pencil } from "lucide-react";
// import { FONTS } from "../../constants/uiConstants";

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
    <div className="flex flex-1 flex-col rounded-xl bg-white p-4 shadow-lg border border-gray-200">
      {isEditing && (
        <div className="mb-4 p-2 bg-yellow-50 rounded-lg border border-yellow-200">
          <p className="text-yellow-800 text-xs font-medium">
            Edit Mode Active - Make your changes and click Save
          </p>
        </div>
      )}

      <div className="flex items-center justify-between mb-4  bg-[#006666]/10 rounded-full transition-all duration-300 ">
        <div className="flex items-center space-x-3  ">
          <div className="p-2 bg-teal-50 rounded-full text-teal-600
           bg-[#006666]/10 rounded-full transition-all duration-300 ">
            <CreditCard size={30} />
          </div>
          <h2 className="text-lg font-semibold text-gray-800">Bank Account</h2>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="p-2 text-gray-600 hover:text-teal-600 hover:bg-gray-50 rounded-full transition-colors"
        >
          <Pencil size={16} />
        </button>
      </div>

      <hr className="border-gray-100 mb-4" />

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div className="grid grid-cols-3 items-center gap-4">
            <label className="text-sm font-medium text-gray-600">Account Holder</label>
            <input
              name="bankHolderName"
              type="text"
              className={`col-span-2 p-2 rounded-md border ${
                isEditing ? "bg-white border-gray-300" : "bg-gray-100 border-transparent"
              } text-gray-800 focus:ring-2 focus:ring-teal-200 focus:outline-none`}
              value={formData.bankHolderName}
              onChange={handleInputChange}
              readOnly={!isEditing}
            />
          </div>

          <div className="grid grid-cols-3 items-center gap-4">
            <label className="text-sm font-medium text-gray-600">Account Number</label>
            <input
              name="bankAccountNumber"
              type="text"
              className={`col-span-2 p-2 rounded-md border ${
                isEditing ? "bg-white border-gray-300" : "bg-gray-100 border-transparent"
              } text-gray-800 focus:ring-2 focus:ring-teal-200 focus:outline-none`}
              value={formData.bankAccountNumber}
              onChange={handleInputChange}
              readOnly={!isEditing}
            />
          </div>

          <div className="grid grid-cols-3 items-center gap-4">
            <label className="text-sm font-medium text-gray-600">Bank Name</label>
            <input
              name="bankName"
              type="text"
              className={`col-span-2 p-2 rounded-md border ${
                isEditing ? "bg-white border-gray-300" : "bg-gray-100 border-transparent"
              } text-gray-800 focus:ring-2 focus:ring-teal-200 focus:outline-none`}
              value={formData.bankName}
              onChange={handleInputChange}
              readOnly={!isEditing}
            />
          </div>

          <div className="grid grid-cols-3 items-center gap-4">
            <label className="text-sm font-medium text-gray-600">Branch Name</label>
            <input
              name="bankBranchName"
              type="text"
              className={`col-span-2 p-2 rounded-md border ${
                isEditing ? "bg-white border-gray-300" : "bg-gray-100 border-transparent"
              } text-gray-800 focus:ring-2 focus:ring-teal-200 focus:outline-none`}
              value={formData.bankBranchName}
              onChange={handleInputChange}
              readOnly={!isEditing}
            />
          </div>

          <div className="grid grid-cols-3 items-center gap-4">
            <label className="text-sm font-medium text-gray-600">SWIFT Code</label>
            <input
              name="bankSwiftCode"
              type="text"
              className={`col-span-2 p-2 rounded-md border ${
                isEditing ? "bg-white border-gray-300" : "bg-gray-100 border-transparent"
              } text-gray-800 focus:ring-2 focus:ring-teal-200 focus:outline-none`}
              value={formData.bankSwiftCode}
              onChange={handleInputChange}
              readOnly={!isEditing}
            />
          </div>
        </div>

        {isEditing && (
          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={() => setIsEditing(false)}
              type="button"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-md hover:bg-teal-700 transition-colors shadow-sm"
            >
              Save Changes
            </button>
          </div>
        )}
      </form>
    </div>
  );
};