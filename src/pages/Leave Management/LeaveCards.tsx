// import { useRef } from 'react';

// type LeaveTypeCardProps = {
//   card: {
//     id: number;
//     title: string;
//     periodIn: string;
//     totalDays: number;
//     isPaid: string;
//   };
//   color: string;
//   onEdit: (card: any) => void;
//   onDelete: (id: number) => void;
//   onShowDetails: (card: any) => void;
//   dropdownRef: React.RefObject<HTMLDivElement | null>;
//   showDropdown: boolean;
//   toggleDropdown: () => void;
//   getInitials: (title: string) => string;
// };

// export default function LeaveTypeCard({
//   card,
//   color,
//   onEdit,
//   onDelete,
//   onShowDetails,
//   dropdownRef,
//   showDropdown,
//   toggleDropdown,
//   getInitials
// }: LeaveTypeCardProps) {
//   return (
//     <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
//       <div className="p-5">
//         <div className="flex justify-between items-start">
//           <div className="flex items-center">
//             <div className={`${color} w-12 h-12 rounded-full flex items-center justify-center text-black text-lg font-bold mr-4`}>
//               {getInitials(card.title)}
//             </div>
//             <div>
//               <h3 className="text-lg font-semibold text-gray-800">{card.title}</h3>
//               <p className="text-sm text-gray-500">{card.periodIn} • {card.totalDays} days</p>
//             </div>
//           </div>
          
//           <div className="relative" ref={dropdownRef}>
//             <button 
//               onClick={toggleDropdown}
//               className="text-gray-500 rounded-md hover:text-gray-700 focus:outline-none"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                 <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
//               </svg>
//             </button>
            
//             {showDropdown && (
//               <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
//                 <div className="py-1">
//                   <button
//                     onClick={() => {
//                       onEdit(card);
//                       toggleDropdown();
//                     }}
//                     className="block w-full text-left px-4 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-100"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => {
//                       onShowDetails(card);
//                       toggleDropdown();
//                     }}
//                     className="block w-full text-left px-4 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-100"
//                   >
//                     View Details
//                   </button>
//                   <button
//                     onClick={() => onDelete(card.id)}
//                     className="block w-full text-left px-4 py-2 text-sm text-red-600 rounded-md hover:bg-gray-100"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
        
//         <div className="mt-4 flex justify-between items-center">
//           <span className={`px-3 py-1 rounded-full text-xs font-medium ${
//             card.isPaid === 'Paid' 
//               ? 'bg-green-100 text-green-800' 
//               : card.isPaid === 'Unpaid' 
//                 ? 'bg-red-100 text-red-800' 
//                 : 'bg-yellow-100 text-yellow-800'
//           }`}>
//             {card.isPaid}
//           </span>
          
//           <button 
//             onClick={() => onShowDetails(card)}
//             className="text-blue-600 rounded-md hover:text-blue-800 text-sm font-medium"
//           >
//             View Details
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }