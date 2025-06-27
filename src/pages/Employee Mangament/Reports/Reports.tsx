// import React from 'react';
// import { ArrowLeft } from 'lucide-react';
// import { FONTS } from '../../../constants/uiConstants';

// type TabType = "dashboard" | "appraisal" | "reports";

// interface ReportsProps {
//   setActiveTab: (tab: TabType) => void;
// }

// const Reports: React.FC<ReportsProps> = ({ setActiveTab }) => {
// //   const paragraphStyle = {
// //   fontFamily: FONTS.paragraph.fontFamily,
// //   fontWeight: FONTS.paragraph.fontWeight,
// // };
//   return (

// <div className="">
//   <button
//     onClick={() => setActiveTab('dashboard')}
//     className="mb-4"
//   >
//     <ArrowLeft className="text-white" />
//   </button>

//   <section className="rounded-xl shadow-sm">
//     <div className="flex justify-between items-center mb-6">
//       <h3 className="text-2xl font-semibold" style={{ ...FONTS.header }}>
//         Performance Analytics
//       </h3>
//     </div>

//     {/* Single Card with 50/50 Split */}
//     <div className="bg-white rounded-lg p-6 flex flex-col ">

//       {/* Left Side: Department Performance (50%) */}
//       <div className="w-[50%]  pr-[14%]">
//         <h4 className="text-lg font-semibold mb-4">Department Performance</h4>
//         <ul className="space-y-2">
//           {[
//             { name: 'Engineering', score: '4.5' },
//             { name: 'Product', score: '4.2' },
//             { name: 'Design', score: '4.8' },
//             { name: 'Marketing', score: '4.3' },
//             { name: 'Sales', score: '4.0' },
//             { name: 'Support', score: '4.6' },
//           ].map(({ name, score }, index) => (
//             <li
//               key={index}
//               className="flex justify-between text-sm  pb-1 text-gray-700"
//             >
//               <span>{name}</span>
//               <span className="font-medium">{score}</span>
//             </li>
//           ))}
//         </ul>
//       </div>
//       <div>
      

//       </div>
     
//       {/* Right Side: Overall Summary (50%) */}
//       <div className=" flex flex-col justify-center items-end text-right absolute left-[70%] bottom-[40%]">
//         <h4 className="text-lg font-semibold mb-2 text-center">Overall Department Percentage</h4>
//         <span className="text-2xl font-bold text-black mb-1">89%</span>
//         <span className="text-sm text-green-600">+5% from last quarter</span>
//       </div>
//     </div>
//   </section>
// </div>







//   );
// };

// export default Reports;



import type React from "react"
import { ArrowLeft } from "lucide-react"
import { FONTS } from "../../../constants/uiConstants"

type TabType = "dashboard" | "appraisal" | "reports"

interface ReportsProps {
  setActiveTab: (tab: TabType) => void
}

const Reports: React.FC<ReportsProps> = ({ setActiveTab }) => {
  //   const paragraphStyle = {
  //   fontFamily: FONTS.paragraph.fontFamily,
  //   fontWeight: FONTS.paragraph.fontWeight,
  // };
  return (
    <div className="">
      <div className="flex items-center mb-6">
        <button onClick={() => setActiveTab("dashboard")} className="mr-2">
          <ArrowLeft className="text-white/30" />
        </button>
        <h3 className="text-2xl font-semibold" style={{ ...FONTS.header }}>
          Performance Analytics
        </h3>
      </div>

      <section className="rounded-xl shadow-sm">
        <div className="bg-white rounded-lg p-6 flex">
          
          <div className="w-1/2 pr-6">
            <h4 className="text-lg font-semibold mb-4 !text-gray-700 "
            style={{ ...FONTS.cardheader}}>Department Performance</h4>
            <ul className="space-y-2">
              {[
                { name: "Engineering", score: "4.5" },
                { name: "Product", score: "4.2" },
                { name: "Design", score: "4.8" },
                { name: "Marketing", score: "4.3" },
                { name: "Sales", score: "4.0" },
                { name: "Support", score: "4.6" },
              ].map(({ name, score }, index) => (
                <li key={index} className="flex justify-between text-sm  pb-1 text-gray-700">
                  <span style={{ ...FONTS.paragraph}} className="!text-black">{name}</span>
                  <span className="font-medium text-lg ">{score}</span>
                </li>
              ))}
            </ul>
          </div>

          
          <div className="w-px bg-gray-300 ml-[10%]"></div>

          
          <div className="w-1/2 pl-6 flex flex-col justify-center items-center text-center">
            <h4 className="text-lg font-semibold mb-2 !text-gray-700"
            style={{ ...FONTS.cardheader}}>Overall Department Percentage</h4>
            <span className="text-6xl font-semibold text-black mb-4">89%</span>
            <span className="text-sm text-green-600">+5% from last quarter</span>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Reports
