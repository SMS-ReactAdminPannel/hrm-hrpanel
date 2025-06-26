

import { useRef } from 'react';
import { motion } from 'framer-motion';
import type { Card, NewCard } from './types';
import { FONTS } from '../../constants/uiConstants';
import { X } from 'lucide-react';



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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex pl-[15%] items-center justify-center z-50">
        <div className=" h-[6%] relative -top-[32%]">
            <button onClick={onClose} className="p-1 rounded-l-full transition bg-[#3a357f]">
             <X className="text-white  ml-1  " />
        </button>
  </div>

      <motion.div
      ref={modalRef}
      variants={modalVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="relative bg-white rounded-2xl mt-[4%] w-[90%] h-[84%] shadow-2xl overflow-y-auto "
    >
      <div className="">
        <div className="pl-[5%] pr-[5%] pt-5 pb-5 h-full w-full">
          
          {/* <div className="bg-white rounded-2xl shadow-xl border p-8 w-full "> */}
            <div className="flex  rounded border-b ">
              <h3
                className="text-xl font-semibold !text-black mt-4  mb-7"
                style={{ ...FONTS.header }}
              >
                {editingCard ? 'Edit Leave Type' : 'Create New Leave Type'}
              </h3>
            </div>

            <div className="grid grid-cols-2 grid-rows-2 gap-6 mt-4 ">
               
              <div className="flex items-center gap-2 p-3 ">
                  <label
                    className="text-md font-medium !text-black whitespace-nowrap"
                    style={{ ...FONTS.paragraph }}
                  >
                    Title<span className="text-red-500"> *</span>
                    <span className='ml-10'>  :</span>
                  </label>
                  <div className="flex flex-col w-full">
                    <input
                      type="text"
                      className="p-1 w-[90%] rounded-xl  focus:outline-none transition"
                      placeholder="Title"
                      value={newCard.title}
                      onChange={(e) => setNewCard({ ...newCard, title: e.target.value })}
                    />
                    <hr className="border border-gray-400 mt-1  w-[91%]" />
                  </div>
                </div>

              <div className="flex items-center gap-2 p-3">
                  <label
                    className="text-md font-medium !text-black whitespace-nowrap"
                    style={{ ...FONTS.paragraph }}
                  >
                    Description<span className="text-red-500"> *</span>
                    <span className='ml-1'>  :</span>
                  </label>
                  <div className="flex flex-col w-full">
                    <input
                      type="text"
                      className="p-1 w-[90%] rounded-xl focus:outline-none transition"
                      placeholder="Description"
                      value={newCard.description}
                      onChange={(e) => setNewCard({ ...newCard, description: e.target.value })}
                    />
                    <hr className="border border-gray-400 mt-1 w-[91%]" />
                  </div>
                </div>


              <div className="flex items-center gap-2 p-3">
                  <label
                    className="text-md font-medium !text-black whitespace-nowrap"
                    style={{ ...FONTS.paragraph }} 
                  >
                    Total Days<span className="text-red-500"> *</span>
                    <span className='ml-1'>  :</span>
                  </label>
                  <div className="flex flex-col w-full">
                    <input
                      type="text"
                      className="p-1 w-[90%] rounded-xl focus:outline-none transition"
                      placeholder="Total Days"
                      value={newCard.max_days}
                      onChange={(e) => setNewCard({ ...newCard, max_days: e.target.value })}
                    />
                    <hr className="border border-gray-400 mt-1 w-[92%]" />
                  </div>
                </div>

                <div className="flex items-center gap-2 p-3">
                  <label
                    className="text-md font-medium !text-black whitespace-nowrap"
                    style={{ ...FONTS.paragraph }}
                  >
                    Is Paid<span className="text-red-500"> *</span>
                    <span className='ml-8 '>  :</span>
                  </label>

                  <div className="flex flex-col w-full">
                    <select
                      className="p-1 w-[90%] rounded-xl   focus:outline-none transition"
                      value={newCard.isPaid}
                      onChange={(e) => setNewCard({ ...newCard, isPaid: e.target.value })}
                    >
                      <option value="Paid">Paid</option>
                      <option value="Unpaid">Unpaid</option>
                      <option value="Partial">Partial</option>
                    </select>
                    <hr className="border border-gray-400 mt-1 ml-1 w-[90%]" />
                  </div>
                </div>

            </div>

            
            <div className="flex  gap-4  items-start justify-end mt-7">
              <button
                className="w-[100px] h-[35px] border border-gray-900 !text-black rounded-2xl hover:bg-gray-500 hover:!text-white transition"
                onClick={onClose}
                type="button"
                style={{ ...FONTS.button }}
              >
                Cancel
              </button>
              <button
                className={`w-[100px] h-[35px] rounded-2xl text-white transition ${
                  !newCard.title || !newCard.max_days
                    ? 'bg-[#3a357f] opacity-50 cursor-not-allowed'
                    : 'bg-[#3a357f] hover:bg-[#3a357f]'
                }`}
                onClick={onSubmit}
                type="button"
                disabled={!newCard.title || !newCard.max_days}
                style={{ ...FONTS.button }}
              >
                {editingCard ? 'Update' : 'Create'}
              </button>
            </div>

            <p
              className="!text-gray-800 mt-[10%] ml-[17%] text-xl"
              style={{ ...FONTS.paragraph }}
            >
              {editingCard? 'NOTE : Please ensure all the edited fields are filled out correctly before submitting.':
              'NOTE : Please ensure all the data is filled out correctly before submitting.'}
            </p>
          {/* </div> */}
        </div>
      </div>
    </motion.div>

  
</div>
);
}

