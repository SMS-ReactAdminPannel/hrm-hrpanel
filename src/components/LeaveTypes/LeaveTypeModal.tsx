

import { useRef } from 'react';
import { motion } from 'framer-motion';
import type { Card, NewCard } from './types';
import { FONTS } from '../../constants/uiConstants';
import { X } from 'lucide-react';
import backgroundimg from '../../assets/backgroundimg.jpg';


interface LeaveTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  newCard: NewCard;
  setNewCard: React.Dispatch<React.SetStateAction<NewCard>>;
  editingCard: Card | null;
}

const modalVariants = {
  hidden: { y: 100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 80, damping: 20 },
  },
  exit: { y: 100, opacity: 0 },
};

export default function LeaveTypeModal({
  isOpen,
  onClose,
  onSubmit,
  newCard,
  setNewCard,
  editingCard,
}: LeaveTypeModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex pl-[15%] items-center justify-center z-50">
//         {/* <div className="rounded-l-full bg-green-900  w-[3.4%] h-[6%] relative -top-[31%]">
//             <button onClick={onClose} className="p-1 rounded transition">
//              <X className="text-white pt-1 ml-1" />
//         </button>
//   </div> */}

//   <motion.div
//     ref={modalRef}
//     variants={modalVariants}
//     initial="hidden"
//     animate="visible"
//     exit="exit"
//     className="relative bg-white rounded-2xl mt-[4%] w-[90%] h-[80%] shadow-2xl overflow-y-auto"
//   >
//     <div className="bg-green-200 pl-[15%] pr-[15%] pt-5 pb-5 h-[100%] w-full">
//       <div className="p-10 bg-white rounded-2xl h-[100%] w-full">
        
//         <div className="flex justify-between items-center rounded border-b pb-4 mb-2 bg-green-900 ">
//           <h3 className="text-xl font-semibold !text-yellow-100 mt-4 pl-[22%]  " style={{ ...FONTS.header2 }}>
//             {editingCard ? 'Edit Leave Type' : 'Create New Leave Type'}
//           </h3>
//         </div>

        
//         <div className="grid grid-cols-2 grid-rows-2 gap-6 mt-4">
          
//           <div className="flex flex-col gap-2">
//             <label className="text-sm font-medium !text-black " style={{ ...FONTS.paragraph }}>
//               Title<span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               className="p-2  w-[90%] rounded-xl focus:outline-none  transition"
//               value={newCard.title}
//               onChange={(e) => setNewCard({ ...newCard, title: e.target.value })}
//               placeholder="Enter leave type title"
//               required
//             />
//             <hr className='border border-gray-400'/>
//           </div>

          
//           <div className="flex flex-col gap-2">
//             <label className="text-sm font-medium !text-black" style={{ ...FONTS.paragraph }}>
//               Description<span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               className="p-2    w-[90%]  rounded-xl focus:outline-none  transition"
//               placeholder="Description"
//               value={newCard.description}
//               onChange={(e) => setNewCard({ ...newCard, description: e.target.value })}
//             />
//             <hr className='border border-gray-400'/>
//           </div>

        
//           <div className="flex flex-col gap-2">
//             <label className="text-sm font-medium !text-black" style={{ ...FONTS.paragraph }}>
//               Total Days<span className="text-red-500">*</span>
//             </label>
//             <input
//               type="number"
//               className="p-2 w-[90%]  rounded-xl focus:outline-none  transition"
//               value={newCard.max_days}
//               onChange={(e) => setNewCard({ ...newCard, max_days: e.target.value })}
//               placeholder="Enter total days"
//               required
//             />
//             <hr className='border border-gray-400'/>
//           </div>

          
//           <div className="flex flex-col gap-2">
//             <label className="text-sm font-medium !text-black" style={{ ...FONTS.paragraph }}>
//               Is Paid
//             </label>
//             <select
//               className="p-2  w-[90%]  rounded-xl focus:outline-none  transition"
//               value={newCard.isPaid}
//               onChange={(e) => setNewCard({ ...newCard, isPaid: e.target.value })}
//             >
//               <option value="Paid">Paid</option>
//               <option value="Unpaid">Unpaid</option>
//               <option value="Partial">Partial</option>
//             </select>
//             <hr className='border border-gray-400'/>
//           </div>
//         </div>

        
//         <div className="flex gap-4 ml-[25%] items-center justify-end mt-7">
//           <button
//             className="px-5 border border-gray-900 !text-black rounded-lg hover:bg-gray-500 hover:!text-white transition"
//             onClick={onClose}
//             type="button"
//             style={{ ...FONTS.button }}
//           >
//             Cancel
//           </button>
//           <button
//             className={`px-5 py-1 rounded-lg text-white transition ${
//               !newCard.title || !newCard.max_days
//                 ? 'bg-[#006666] opacity-50 cursor-not-allowed'
//                 : 'bg-[#006666] hover:bg-[#004d4d]'
//             }`}
//             onClick={onSubmit}
//             type="button"
//             disabled={!newCard.title || !newCard.max_days}
//             style={{ ...FONTS.button }}
//           >
//             {editingCard ? 'Update' : 'Create'}
//           </button>
//         </div>
//       </div>
//     </div>
//   </motion.div>
// </div>


// dummy
//  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//   <motion.div
//     ref={modalRef}
//     variants={modalVariants}
//     initial="hidden"
//     animate="visible"
//     exit="exit"
//     className="w-[800px] h-[500px] bg-white rounded-3xl shadow-lg flex overflow-hidden"
//   >
    
//     <div className="w-[40%] bg-gradient-to-br from-[#004d4d] to-[#009999] p-6 text-white flex flex-col justify-center">
//       <h2 className="text-2xl font-bold mb-2">
//         {editingCard ? 'Update Details' : 'New Leave Type'}
//       </h2>
//       <p className="text-sm mb-6 opacity-80">
        
//       </p>
//       <div className="mt-auto">
//         <img
//           src="https://www.svgrepo.com/show/488428/form.svg"
//           alt="form"
//           className="w-full"
//         />
//       </div>
//     </div>

   
//     <div className="w-[60%] p-8 overflow-y-auto">
      
//       <div className="flex justify-end mb-4">
//         <button onClick={onClose} className="text-gray-500 hover:text-black text-xl">✕</button>
//       </div>

      
//       <div className="space-y-5">
//         <div>
//           <label className="block font-medium text-gray-700 text-sm mb-1">
//             Title<span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             value={newCard.title}
//             onChange={(e) => setNewCard({ ...newCard, title: e.target.value })}
//             placeholder="Leave title"
//             className="w-full p-2 border rounded-md"
//           />
//         </div>

//         <div>
//           <label className="block font-medium text-gray-700 text-sm mb-1">
//             Description
//           </label>
//           <input
//             type="text"
//             value={newCard.description}
//             onChange={(e) => setNewCard({ ...newCard, description: e.target.value })}
//             placeholder="Leave description"
//             className="w-full p-2 border rounded-md"
//           />
//         </div>

//         <div>
//           <label className="block font-medium text-gray-700 text-sm mb-1">
//             Total Days<span className="text-red-500">*</span>
//           </label>
//           <input
//             type="number"
//             value={newCard.max_days}
//             onChange={(e) => setNewCard({ ...newCard, max_days: e.target.value })}
//             placeholder="e.g., 12"
//             className="w-full p-2 border rounded-md"
//           />
//         </div>

//         <div>
//           <label className="block font-medium text-gray-700 text-sm mb-1">Is Paid</label>
//           <select
//             value={newCard.isPaid}
//             onChange={(e) => setNewCard({ ...newCard, isPaid: e.target.value })}
//             className="w-full p-2 border rounded-md"
//           >
//             <option value="Paid">Paid</option>
//             <option value="Unpaid">Unpaid</option>
//             <option value="Partial">Partial</option>
//           </select>
//         </div>
//       </div>

      
//       <div className="mt-6 flex justify-end gap-3">
//         <button
//           onClick={onClose}
//           className="px-4 py-2 border text-gray-700 rounded hover:bg-gray-100"
//         >
//           Cancel
//         </button>
//         <button
//           onClick={onSubmit}
//           disabled={!newCard.title || !newCard.max_days}
//           className={`px-4 py-2 rounded text-white ${
//             !newCard.title || !newCard.max_days
//               ? 'bg-[#006666] opacity-50 cursor-not-allowed'
//               : 'bg-[#006666] hover:bg-[#004d4d]'
//           }`}
//         >
//           {editingCard ? 'Update' : 'Create'}
//         </button>
//       </div>
//     </div>
//   </motion.div>
// </div> 

//  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//   <motion.div
//     ref={modalRef}
//     variants={modalVariants}
//     initial="hidden"
//     animate="visible"
//     exit="exit"
//     className="bg-white w-[400px] p-6 rounded-xl shadow-2xl border border-gray-200"
//   >
    
//     <div className="flex justify-between items-center mb-4">
//       <h3 className="text-lg font-semibold text-[#006666]">
//         {editingCard ? 'Edit Leave Type' : 'New Leave Type'}
//       </h3>
//       <button onClick={onClose} className="text-gray-500 hover:text-black text-xl">
//         ✕
//       </button>
//     </div>

    
//     <div className="space-y-4 text-sm">
//       <div>
//         <label className="block font-medium text-gray-700 mb-1">
//           Title<span className="text-red-500">*</span>
//         </label>
//         <input
//           type="text"
//           value={newCard.title}
//           onChange={(e) => setNewCard({ ...newCard, title: e.target.value })}
//           placeholder="Leave title"
//           className="w-full p-2 border border-gray-300 rounded-md"
//         />
//       </div>

//       <div>
//         <label className="block font-medium text-gray-700 mb-1">Description</label>
//         <input
//           type="text"
//           value={newCard.description}
//           onChange={(e) => setNewCard({ ...newCard, description: e.target.value })}
//           placeholder="Leave description"
//           className="w-full p-2 border border-gray-300 rounded-md"
//         />
//       </div>

//       <div>
//         <label className="block font-medium text-gray-700 mb-1">
//           Total Days<span className="text-red-500">*</span>
//         </label>
//         <input
//           type="number"
//           value={newCard.max_days}
//           onChange={(e) => setNewCard({ ...newCard, max_days: e.target.value })}
//           placeholder="e.g., 10"
//           className="w-full p-2 border border-gray-300 rounded-md"
//         />
//       </div>

//       <div>
//         <label className="block font-medium text-gray-700 mb-1">Is Paid</label>
//         <select
//           value={newCard.isPaid}
//           onChange={(e) => setNewCard({ ...newCard, isPaid: e.target.value })}
//           className="w-full p-2 border border-gray-300 rounded-md"
//         >
//           <option value="Paid">Paid</option>
//           <option value="Unpaid">Unpaid</option>
//           <option value="Partial">Partial</option>
//         </select>
//       </div>
//     </div>

//     <div className="mt-6 flex justify-end gap-3">
//       <button
//         onClick={onClose}
//         className="px-4 py-2 border text-sm border-gray-400 text-gray-700 rounded hover:bg-gray-100"
//       >
//         Cancel
//       </button>
//       <button
//         onClick={onSubmit}
//         disabled={!newCard.title || !newCard.max_days}
//         className={`px-4 py-2 text-sm rounded text-white ${
//           !newCard.title || !newCard.max_days
//             ? 'bg-[#006666] opacity-50 cursor-not-allowed'
//             : 'bg-[#006666] hover:bg-[#004d4d]'
//         }`}
//       >
//         {editingCard ? 'Update' : 'Create'}
//       </button>
//     </div>
//   </motion.div>
// </div> 

 <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-[#001f1f] bg-opacity-90 backdrop-blur-lg z-50 flex items-center justify-center">
  <motion.div
    ref={modalRef}
    variants={modalVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
    className="w-[650px] bg-white/10 border border-white/20 backdrop-blur-xl rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] text-white overflow-hidden"
  >
    
    <div className="bg-gradient-to-r from-[#009999] to-[#004d4d] px-8 py-6 rounded-t-3xl flex items-center justify-between shadow-inner">
      <h2 className="text-2xl font-extrabold tracking-wide drop-shadow-sm">
        {editingCard ? 'Edit Leave Type' : 'Create New Leave Type'}
      </h2>
      <button
        onClick={onClose}
        className="text-white hover:text-gray-200 text-xl font-bold transition"
      >
        ✕
      </button>
    </div>

    
    <div className="p-8 space-y-6 text-md">
      <div>
        <label className="block font-semibold mb-2" style={{...FONTS.button}}>Title<span className="text-red-400">*</span></label>
        <input
          type="text"
          className="w-full p-3 rounded-xl bg-white/10 border border-white/30 placeholder-white/60 focus:outline-none"
          placeholder="Leave title"
          value={newCard.title}
          onChange={(e) => setNewCard({ ...newCard, title: e.target.value })}
          style={{ ...FONTS.paragraph }}
        />
      </div>

      <div>
        <label className="block font-semibold mb-2"
        style={{...FONTS.button}}>Description</label>
        <input
          type="text"
          className="w-full p-3 rounded-xl bg-white/10 border border-white/30 placeholder-white/60 focus:outline-none"
          placeholder="Brief description"
          value={newCard.description}
          onChange={(e) => setNewCard({ ...newCard, description: e.target.value })}
          style={{ ...FONTS.paragraph }}
        />
      </div>

      <div className="flex gap-4">
        <div className="w-1/2">
          <label className="block font-semibold mb-2"
          style={{...FONTS.button}}>Total Days<span className="text-red-400">*</span></label>
          <input
            type="number"
            className="w-full p-3 rounded-xl bg-white/10 border border-white/30 placeholder-white/60 focus:outline-none"
            placeholder="e.g. 10"
            value={newCard.max_days}
            onChange={(e) => setNewCard({ ...newCard, max_days: e.target.value })}
          />
        </div>
        <div className="w-1/2">
          <label className="block font-semibold mb-2"
          style={{...FONTS.button}}>Is Paid</label>
          <select
            className="w-full p-3 rounded-xl bg-white/10 border border-white/30 text-white"
            value={newCard.isPaid}
            onChange={(e) => setNewCard({ ...newCard, isPaid: e.target.value })}
          >
            <option value="Paid">Paid</option>
            <option value="Unpaid">Unpaid</option>
            <option value="Partial">Partial</option>
          </select>
        </div>
      </div>
    </div>

   
    <div className="px-8 py-6 flex justify-end gap-4 bg-white/5 border-t border-white/10 rounded-b-3xl">
      <button
        onClick={onClose}
        className="px-6 py-2 text-white border border-white/30 rounded-lg hover:bg-white/10 transition font-semibold"
      >
        Cancel
      </button>
      <button
        onClick={onSubmit}
        disabled={!newCard.title || !newCard.max_days}
        className={`px-6 py-2 rounded-lg font-semibold transition ${
          !newCard.title || !newCard.max_days
            ? 'bg-[#006666] opacity-40 cursor-not-allowed'
            : 'bg-[#00b3b3] hover:bg-[#008080]'
        }`}
      >
        {editingCard ? 'Update' : 'Create'}
      </button>
    </div>
  </motion.div>
</div> 






//     <div className="fixed inset-0 bg-black bg-opacity-50 flex pl-[15%] items-center justify-center z-50">
//   <div className="rounded-l-full bg-blue-600 w-[3.4%] h-[6%] relative -top-[33%]">
//     <button
//       onClick={onClose}
//       className="p-1 rounded transition"
//     >
//       <X className="text-white pt-1 ml-1" />
//     </button>
//   </div>

//   <motion.div
//     ref={modalRef}
//     variants={modalVariants}
//     initial="hidden"
//     animate="visible"
//     exit="exit"
//     className="relative   rounded-2xl mt-[4%] w-[85%] h-[85%] shadow-2xl overflow-y-auto"
//     //  style={{
//     //           backgroundImage: `url(${})`,
    
//     //         }}
    
//   >
    
//     <div className="p-10 h-full w-full">
//       <div className="flex justify-between items-center border-b pb-4 mb-2">
//         <h3
//           className="text-xl font-semibold  !text-black mt-4"
//           style={{ ...FONTS.header2 }}
//         >
//           {editingCard ? 'Edit Leave Type' : 'Create New Leave Type'}
//         </h3>
//       </div>

    
//       <div className="grid grid-cols-2 gap-4">
//         <div className="flex flex-col gap-2">
//           <label className="text-sm font-medium  !text-black" style={{ ...FONTS.paragraph }}>
//             Title<span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             className="p-1 border border-gray-400   rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006666] transition"
//             value={newCard.title}
//             onChange={(e) => setNewCard({ ...newCard, title: e.target.value })}
//             placeholder="Enter leave type title"
//             required
//           />
//         </div>

//         <div className="flex flex-col gap-2">
//           <label className="text-sm font-medium !text-black" style={{ ...FONTS.paragraph }}>
//             Description<span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             className="p-1 border border-gray-400   rounded-md focus:outline-none focus:ring-2 focus:ring-[#006666] transition"
//             placeholder="Description"
//             value={newCard.description}
//             onChange={(e) => setNewCard({ ...newCard, description: e.target.value })}
//           />
//         </div>

//         <div className="flex flex-col gap-2">
//           <label className="text-sm font-medium !text-black" style={{ ...FONTS.paragraph }}>
//             Total Days<span className="text-red-500">*</span>
//           </label>
//           <input
//             type="number"
//             className="p-1 border border-gray-400  rounded-md focus:outline-none focus:ring-2 focus:ring-[#006666] transition"
//             value={newCard.max_days}
//             onChange={(e) => setNewCard({ ...newCard, max_days: e.target.value })}
//             placeholder="Enter total days"
//             required
//           />
//         </div>

//         <div className="flex flex-col gap-2">
//           <label className="text-sm font-medium !text-black" style={{ ...FONTS.paragraph }}>
//             Is Paid
//           </label>
//           <select
//             className="p-1 border border-gray-400   rounded-md focus:outline-none focus:ring-2 focus:ring-[#006666] transition text-gray-700"
//             value={newCard.isPaid}
//             onChange={(e) => setNewCard({ ...newCard, isPaid: e.target.value })}
//           >
//             <option value="Paid">Paid</option>
//             <option value="Unpaid">Unpaid</option>
//             <option value="Partial">Partial</option>
//           </select>
//         </div>
//       </div>

//       <div className="flex justify-end gap-4 mt-7">
//         <button
//           className="px-5 border border-gray-900 !text-black rounded-lg hover:bg-gray-500 hover:!text-white transition"
//           onClick={onClose}
//           type="button"
//           style={{ ...FONTS.button }}
//         >
//           Cancel
//         </button>
//         <button
//           className={`px-5 py-1 rounded-lg text-white transition ${
//             !newCard.title || !newCard.max_days
//               ? 'bg-[#006666] opacity-50 cursor-not-allowed'
//               : 'bg-[#006666] hover:bg-[#004d4d]'
//           }`}
//           onClick={onSubmit}
//           type="button"
//           disabled={!newCard.title || !newCard.max_days}
//           style={{ ...FONTS.button }}
//         >
//           {editingCard ? 'Update' : 'Create'}
//         </button>
//       </div>
//     </div>
//   </motion.div>
// </div>

  );
}

