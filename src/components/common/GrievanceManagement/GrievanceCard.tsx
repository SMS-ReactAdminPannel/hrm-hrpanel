// import React from "react";
// import type { Grievance } from "../../../pages/GrievanceManagement/GrievanceManagement";
// import { FONTS } from "../../../constants/uiConstants";

// type Props = {
//   grievance: Grievance;
// };

// export const GrievanceCard: React.FC<Props> = ({ grievance }) => {
//   const isSolved = grievance.status === "solved";

//   return (
//     <div className="bg-white h-26 shadow-md rounded-lg p-2 border-l-2 transition-all hover:shadow-xl cursor-pointer border-[#5e59a9]  ">
//       <div className="flex justify-between items-start">
//         <h3
//           className="text-lg font-semibold text-gray-800"
//           style={{
//             fontSize: FONTS.header3.fontSize,
//             fontFamily: FONTS.paragraph.fontFamily,
//           }}
//         >
//           {grievance.title}
//         </h3>

//         <span
//           className={`text-sm font-semibold px-3 py-1 rounded-full ${
//             isSolved
//               ? "bg-green-100 text-green-700 border border-green-300"
//               : "bg-yellow-100 text-yellow-700 border border-yellow-300"
//           }`}
//         >
//           {grievance.status.charAt(0).toUpperCase() + grievance.status.slice(1)}
//         </span>
//       </div>

//       <div>
//         <h4
//           className="text-sm font-medium text-gray-600 mb-1"
//           style={{
//             fontSize: FONTS.paragraph.fontSize,
//             fontFamily: FONTS.paragraph.fontFamily,
//           }}
//         >
//           Issue Description
//         </h4>
//         <p className="text-gray-700 whitespace-pre-line text-sm leading-relaxed">
//           {grievance.description}
//         </p>
//       </div>

//       <div
//         className="text-xs text-gray-500 border-t pt-2 mt-3"
//         style={{
//           fontSize: FONTS.paragraph.fontSize,
//           fontFamily: FONTS.paragraph.fontFamily,
//         }}
//       >

//         <span className="font-medium text-gray-700 mt-30">{grievance.employee}</span> — {grievance.date}
//       </div>
//     </div>
//   );
// };


// import React, { useState } from "react";
// import type { Grievance } from "../../../pages/GrievanceManagement/GrievanceManagement";
// import { FONTS } from "../../../constants/uiConstants";

// type Props = {
//   grievance: Grievance;
// };

// export const GrievanceCard: React.FC<Props> = ({ grievance }) => {
//   const isSolved = grievance.status === "solved";
//   const [isActive, setIsActive] = useState(false);

//   return (
//     <div 
//       className={`bg-white h-26 shadow-md rounded-lg p-2 border-l-2 transition-all duration-200 cursor-pointer border-[#5e59a9]
//                  ${isActive ? 'bg-blue-50' : 'hover:shadow-xl'}`}
//       onClick={() => setIsActive(!isActive)}
//     >
//       <div className="flex justify-between items-start">
//         <h3
//           className={`text-lg font-semibold ${isActive ? 'text-blue-800' : 'text-gray-800'}`}
//           style={{
//             fontSize: FONTS.header3.fontSize,
//             fontFamily: FONTS.paragraph.fontFamily,
//           }}
//         >
//           {grievance.title}
//         </h3>

//         <span
//           className={`text-sm font-semibold px-3 py-1 rounded-full ${
//             isSolved
//               ? isActive
//                 ? "bg-white text-green-700 border border-green-300"
//                 : "bg-green-100 text-green-700 border border-green-300"
//               : isActive
//                 ? "bg-white text-yellow-700 border border-yellow-300"
//                 : "bg-yellow-100 text-yellow-700 border border-yellow-300"
//           }`}
//         >
//           {grievance.status.charAt(0).toUpperCase() + grievance.status.slice(1)}
//         </span>
//       </div>

//       <div>
//         <h4
//           className={`text-sm font-medium ${isActive ? 'text-blue-600' : 'text-gray-600'} mb-1`}
//           style={{
//             fontSize: FONTS.paragraph.fontSize,
//             fontFamily: FONTS.paragraph.fontFamily,
//           }}
//         >
//           Issue Description
//         </h4>
//         <p className={`whitespace-pre-line text-sm leading-relaxed ${isActive ? 'text-blue-900' : 'text-gray-700'}`}>
//           {grievance.description}
//         </p>
//       </div>

//       <div
//         className={`text-xs border-t pt-2 mt-3 ${isActive ? 'text-blue-700 border-blue-200' : 'text-gray-500'}`}
//         style={{
//           fontSize: FONTS.paragraph.fontSize,
//           fontFamily: FONTS.paragraph.fontFamily,
//         }}
//       >
//         <span className={`font-medium ${isActive ? 'text-blue-800' : 'text-gray-700'}`}>
//           {grievance.employee}
//         </span> — {grievance.date}
//       </div>
//     </div>
//   );
// };


import React, { useState } from "react";
import type { Grievance } from "../../../pages/GrievanceManagement/GrievanceManagement";
import { FONTS } from "../../../constants/uiConstants";

type Props = {
  grievance: Grievance;
};

export const GrievanceCard: React.FC<Props> = ({ grievance }) => {
  const isSolved = grievance.status === "solved";
  const [isActive, setIsActive] = useState(false);

  return (
    <div 
      className={`bg-white h-26 shadow-md rounded-lg p-2 border-l-2 transition-all duration-200 cursor-pointer border-[#5e59a9]
                 ${isActive
                  //  ? 'bg-[#5e59a9] text-white' : 'hover:shadow-xl'
                  ? "bg-[#5e59a9] text-white border-[#5e59a9]"
                  : "text-bg-[#5e59a9] border-bg-[#5e59a9] hover:bg-[#e6f4f4]"
                  }`}

      onClick={() => setIsActive(!isActive)}
    >
      <div className="flex justify-between items-start">
        <h3
          className="text-lg font-semibold"
          style={{
            fontSize: FONTS.header3.fontSize,
            fontFamily: FONTS.paragraph.fontFamily,
          }}
        >
          {grievance.title}
        </h3>

        <span
          className={`text-sm font-semibold px-3 py-1 rounded-full ${
            isSolved
              ? isActive
                ? "bg-white text-green-700 border border-green-300"
                : "bg-green-100 text-green-700 border border-green-300"
              : isActive
                ? "bg-white text-yellow-700 border border-yellow-300"
                : "bg-yellow-100 text-yellow-700 border border-yellow-300"
          }`}
        >
          {grievance.status.charAt(0).toUpperCase() + grievance.status.slice(1)}
        </span>
      </div>

      <div>
        <h4
          className="text-sm font-medium mb-1"
          style={{
            fontSize: FONTS.paragraph.fontSize,
            fontFamily: FONTS.paragraph.fontFamily,
          }}
        >
          Issue Description
        </h4>
        <p className="whitespace-pre-line text-sm leading-relaxed">
          {grievance.description}
        </p>
      </div>

      <div
        className="text-xs border-t pt-2 mt-3 border-opacity-20"
        style={{
          fontSize: FONTS.paragraph.fontSize,
          fontFamily: FONTS.paragraph.fontFamily,
        }}
      >
        <span className="font-medium">
          {grievance.employee}
        </span> — {grievance.date}
      </div>
    </div>
  );
};
