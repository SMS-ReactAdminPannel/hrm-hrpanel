
// import type React from "react";
// import { useState } from "react";
// import { FileText, Pencil } from "lucide-react";
// import { FONTS } from "../../constants/uiConstants";

// interface PassportInfo {
//   number: string;
//   nationality: string;
//   state: string;
//   issueDate: string;
//   expiryDate: string;
// }

// interface PassportInfoProps {
//   data: PassportInfo;
//   onUpdate?: (data: PassportInfo) => void;
// }

// export const PassportInfoComponent: React.FC<PassportInfoProps> = ({
//   data,
//   onUpdate,
// }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     passportNumber: data.number,
//     passportNationality: data.nationality,
//     passportState: data.state,
//     passportIssueDate: data.issueDate,
//     passportExpiryDate: data.expiryDate,
//   });

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log("Passport info updated:", formData);
//     setIsEditing(false);
//     if (onUpdate) {
//       const updatedData: PassportInfo = {
//         number: formData.passportNumber,
//         nationality: formData.passportNationality,
//         state: formData.passportState,
//         issueDate: formData.passportIssueDate,
//         expiryDate: formData.passportExpiryDate,
//       };
//       onUpdate(updatedData);
//     }
//   };

//   return (
//     <div className="flex flex-1 flex-col rounded-xl h-full bg-white px-2 py-2 shadow-2xl border border-[#006666]/20 p-1">
//       {isEditing && (
//         <div className="mb-2 p-1">
//           <p className="text-red-800 text-xs">
//             Edit Mode Active - Make your changes and click Save
//           </p>
//         </div>
//       )}

//       <div className="flex items-center gap-3 relative justify-between p-1 mt-2 mb-2">
//         <div className="flex gap-1 items-center mb-2">
//           <div className="transition-transform duration-300">
//             <FileText size={24} />
//           </div>
//           <h2 className="text-sm ml-1 !text-[#000000]" style={{ ...FONTS.header }}>
//             Passport Info
//           </h2>
//         </div>
//         <button
//           className="p-1 hover:text-blue-200 rounded-lg cursor-pointer bg-gray-600 hover:bg-gray-700 text-white text-xs transition-colors duration-200 flex items-center gap-1"
//           onClick={() => setIsEditing(!isEditing)}
//         >
//           <Pencil size={16} />
//         </button>
//       </div>

//       <hr className="border-gray-900 mb-6 mt-2" />

//       <form onSubmit={handleSubmit}>
//         <div className="flex flex-col text-sm p-1 bg-gradient-to-r from-red-600 to-gray-900 ">
//           <div className="flex items-center py-2 px-3 hover:bg-gray-300 ">
//             <strong className="!text-gray-800 font-semibold" style={{ ...FONTS.cardSubHeader, fontWeight: 600 }}>Passport Number</strong>
//             <span className="ml-1">:</span>
//             <input
//               name="passportNumber"
//               type="text"
//               className="placeholder-black bg-transparent rounded-xl ml-2 outline-none flex-1"
//               value={formData.passportNumber}
//               onChange={handleInputChange}
//               readOnly={!isEditing}
//             />
//           </div>

//           <div className="flex items-center py-2 px-3 hover:bg-gray-300">
//             <strong className="!text-gray-800 font-semibold" style={{ ...FONTS.cardSubHeader, fontWeight: 600 }}>Nationality</strong>
//             <span className="ml-1">:</span>
//             <input
//               name="passportNationality"
//               type="text"
//               className="placeholder-black bg-transparent rounded-xl ml-2 outline-none flex-1"
//               value={formData.passportNationality}
//               onChange={handleInputChange}
//               readOnly={!isEditing}
//             />
//           </div>

//           <div className="flex items-center py-2 px-3 hover:bg-gray-300">
//             <strong className="!text-gray-800 font-semibold" style={{ ...FONTS.cardSubHeader, fontWeight: 600 }}>State</strong>
//             <span className="ml-1">:</span>
//             <input
//               name="passportState"
//               type="text"
//               className="placeholder-black bg-transparent rounded-xl ml-2 outline-none flex-1"
//               value={formData.passportState}
//               onChange={handleInputChange}
//               readOnly={!isEditing}
//             />
//           </div>

//           <div className="flex items-center py-2 px-3 hover:bg-gray-300">
//             <strong className="!text-gray-800 font-semibold" style={{ ...FONTS.cardSubHeader, fontWeight: 600 }}>Issue Date</strong>
//             <span className="ml-1">:</span>
//             <input
//               name="passportIssueDate"
//               type="text"
//               className="placeholder-black bg-transparent rounded-xl ml-2 outline-none flex-1"
//               value={formData.passportIssueDate}
//               onChange={handleInputChange}
//               readOnly={!isEditing}
//             />
//           </div>

//           <div className="flex items-center py-2 px-3 hover:bg-gray-300 ">
//             <strong className="!text-gray-800 font-semibold" style={{ ...FONTS.cardSubHeader, fontWeight: 600 }}>Expiry Date</strong>
//             <span className="ml-1">:</span>
//             <input
//               name="passportExpiryDate"
//               type="text"
//               className="placeholder-black bg-transparent rounded-xl ml-2 outline-none flex-1"
//               value={formData.passportExpiryDate}
//               onChange={handleInputChange}
//               readOnly={!isEditing}
//             />
//           </div>
//         </div>

//         {isEditing && (
//           <div className="mt-3 flex justify-end gap-3 p-1">
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
//               className="px-2 py-1 bg-gradient-to-r from-[#006666] to-[#008080] text-white rounded-lg hover:from-[#008080] hover:to-[#006666] transition-all duration-200 font-semibold shadow-lg transform hover:scale-105"
//               style={{ ...FONTS.button }}
//             >
//               Save Changes
//             </button>
//           </div>
//         )}
//       </form>
//     </div>
//   );
// };

import type React from "react";
import { useState } from "react";
import { FileText, Pencil } from "lucide-react";
import { FONTS } from "../../constants/uiConstants";

interface PassportInfo {
  number: string;
  nationality: string;
  state: string;
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
    passportState: data.state,
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
        state: formData.passportState,
        issueDate: formData.passportIssueDate,
        expiryDate: formData.passportExpiryDate,
      };
      onUpdate(updatedData);
    }
  };

  return (
    // <div className="flex flex-1 flex-col rounded-xl h-full bg-white px-2 py-4 shadow-2xl border border-[#006666]/20">
    //   {isEditing && (
    //     <div className="mb-2 p-1">
    //       <p className="text-red-800 text-xs">
    //         Edit Mode Active - Make your changes and click Save
    //       </p>
    //     </div>
    //   )}

    //   <div className="flex items-center gap-3 mb-2 relative justify-between">
    //     <div className="flex gap-1">
    //       <div className="transition-transform duration-300">
    //         <FileText size={24} />
    //       </div>
    //       <div>
    //         <h2 className="text-sm ml-1 flex mt-[3px] !text-[#000000]" style={{...FONTS.header}}>
    //           Passport Info
    //         </h2>
    //       </div>
    //     </div>
    //     <button
    //       className="p-1 hover:text-blue-200 rounded-lg cursor-pointer"
    //       onClick={() => setIsEditing(!isEditing)}
    //     >
    //       <Pencil size={16} />
    //     </button>
    //   </div>

    //   <hr className="border-gray-900 mb-6 mt-2" />

    //   <form onSubmit={handleSubmit}>
    //     <div className="text-sm">
    //       <div className="flex items-center py-2 px-3">
    //         <strong className="!text-gray-800 font-semibold" style={{ ...FONTS.cardSubHeader, fontWeight: 600 }}>Passport Number</strong>
    //         <span className="ml-1">:</span>
    //         <input
    //           name="passportNumber"
    //           type="text"
    //           className="placeholder-black bg-transparent rounded-xl ml-2 outline-none flex-1"
    //           value={formData.passportNumber}
    //           onChange={handleInputChange}
    //           readOnly={!isEditing}
    //         />
    //       </div>

    //       <div className="flex items-center py-2 px-3">
    //         <strong className="!text-gray-800 font-semibold" style={{ ...FONTS.cardSubHeader, fontWeight: 600 }}>Nationality</strong>
    //         <span className="ml-1">:</span>
    //         <input
    //           name="passportNationality"
    //           type="text"
    //           className="placeholder-black bg-transparent ml-2 outline-none flex-1"
    //           value={formData.passportNationality}
    //           onChange={handleInputChange}
    //           readOnly={!isEditing}
    //         />
    //       </div>

    //       <div className="flex items-center py-2 px-3">
    //         <strong className="!text-gray-800 font-semibold" style={{ ...FONTS.cardSubHeader, fontWeight: 600 }}>State</strong>
    //         <span className="ml-1">:</span>
    //         <input
    //           name="passportState"
    //           type="text"
    //           className="placeholder-black bg-transparent ml-2 outline-none flex-1"
    //           value={formData.passportState}
    //           onChange={handleInputChange}
    //           readOnly={!isEditing}
    //         />
    //       </div>

    //       <div className="flex items-center py-2 px-3">
    //         <strong className="!text-gray-800 font-semibold" style={{ ...FONTS.cardSubHeader, fontWeight: 600 }}>Issue Date</strong>
    //         <span className="ml-1">:</span>
    //         <input
    //           name="passportIssueDate"
    //           type="text"
    //           className="placeholder-black bg-transparent ml-2 outline-none flex-1"
    //           value={formData.passportIssueDate}
    //           onChange={handleInputChange}
    //           readOnly={!isEditing}
    //         />
    //       </div>

    //       <div className="flex items-center px-3 py-2">
    //         <strong className="!text-gray-800 font-semibold" style={{ ...FONTS.cardSubHeader, fontWeight: 600 }}>Expiry Date</strong>
    //         <span className="ml-1">:</span>
    //         <input
    //           name="passportExpiryDate"
    //           type="text"
    //           className="placeholder-black bg-transparent ml-2 outline-none flex-1"
    //           value={formData.passportExpiryDate}
    //           onChange={handleInputChange}
    //           readOnly={!isEditing}
    //         />
    //       </div>
    //     </div>

    //     {isEditing && (
    //       <div className="mt-3 flex justify-end gap-3 p-1">
    //         <button
    //           onClick={() => setIsEditing(false)}
    //           type="button"
    //           className="px-2 py-1 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200 font-semibold"
    //           style={{ ...FONTS.button }}
    //         >
    //           Cancel
    //         </button>
    //         <button
    //           type="submit"
    //           className="px-2 py-1 bg-gradient-to-r from-[#006666] to-[#008080] text-white rounded-lg hover:from-[#008080] hover:to-[#006666] transition-all duration-200 font-semibold shadow-lg transform hover:scale-105"
    //           style={{ ...FONTS.button }}
    //         >
    //           Save Changes
    //         </button>
    //       </div>
    //     )}
    //   </form>
    // </div>
    <div className="flex flex-1 flex-col rounded-xl bg-white p-4 shadow-lg border border-gray-200">
  {isEditing && (
    <div className="mb-4 p-2 bg-yellow-50 rounded-lg border border-yellow-200">
      <p className="text-yellow-800 text-xs font-medium">
        Edit Mode Active - Make your changes and click Save
      </p>
    </div>
  )}

  <div className="flex items-center justify-between mb-4">
    <div className="flex items-center space-x-3">
      <div className="p-2 bg-teal-50 rounded-full text-teal-600">
        <FileText size={20} />
      </div>
      <h2 className="text-lg font-semibold text-gray-800">Passport Info</h2>
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
        <label className="text-sm font-medium text-gray-600">Passport Number</label>
        <input
          name="passportNumber"
          type="text"
          className={`col-span-2 p-2 rounded-md border ${
            isEditing ? "bg-white border-gray-300" : "bg-gray-50 border-transparent"
          } text-gray-800 focus:ring-2 focus:ring-teal-200 focus:outline-none`}
          value={formData.passportNumber}
          onChange={handleInputChange}
          readOnly={!isEditing}
        />
      </div>

      <div className="grid grid-cols-3 items-center gap-4">
        <label className="text-sm font-medium text-gray-600">Nationality</label>
        <input
          name="passportNationality"
          type="text"
          className={`col-span-2 p-2 rounded-md border ${
            isEditing ? "bg-white border-gray-300" : "bg-gray-50 border-transparent"
          } text-gray-800 focus:ring-2 focus:ring-teal-200 focus:outline-none`}
          value={formData.passportNationality}
          onChange={handleInputChange}
          readOnly={!isEditing}
        />
      </div>

      <div className="grid grid-cols-3 items-center gap-4">
        <label className="text-sm font-medium text-gray-600">State</label>
        <input
          name="passportState"
          type="text"
          className={`col-span-2 p-2 rounded-md border ${
            isEditing ? "bg-white border-gray-300" : "bg-gray-50 border-transparent"
          } text-gray-800 focus:ring-2 focus:ring-teal-200 focus:outline-none`}
          value={formData.passportState}
          onChange={handleInputChange}
          readOnly={!isEditing}
        />
      </div>

      <div className="grid grid-cols-3 items-center gap-4">
        <label className="text-sm font-medium text-gray-600">Issue Date</label>
        <input
          name="passportIssueDate"
          type="text"
          className={`col-span-2 p-2 rounded-md border ${
            isEditing ? "bg-white border-gray-300" : "bg-gray-50 border-transparent"
          } text-gray-800 focus:ring-2 focus:ring-teal-200 focus:outline-none`}
          value={formData.passportIssueDate}
          onChange={handleInputChange}
          readOnly={!isEditing}
        />
      </div>

      <div className="grid grid-cols-3 items-center gap-4">
        <label className="text-sm font-medium text-gray-600">Expiry Date</label>
        <input
          name="passportExpiryDate"
          type="text"
          className={`col-span-2 p-2 rounded-md border ${
            isEditing ? "bg-white border-gray-300" : "bg-gray-50 border-transparent"
          } text-gray-800 focus:ring-2 focus:ring-teal-200 focus:outline-none`}
          value={formData.passportExpiryDate}
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