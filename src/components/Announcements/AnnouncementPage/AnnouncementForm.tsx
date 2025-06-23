import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import { FONTS } from "../../../constants/uiConstants";
import { X } from "lucide-react";

type AnnouncementType = {
  title: string;
  startDate: string;
  endDate: string;
  description: string;
};

type Props = {
  formData: AnnouncementType;
  setFormData: (data: AnnouncementType) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
  isEditing: boolean;
};

const AnnouncementForm: React.FC<Props> = ({ formData, setFormData, onSubmit, onClose, isEditing }) => {
  
return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="fixed inset-0"
          initial={{ 
            opacity: 0,
            backdropFilter: "blur(0px)",
            backgroundColor: "rgba(0, 0, 0, 0)"
          }}
          animate={{ 
            opacity: 1,
            backdropFilter: "blur(5px)",
            backgroundColor: "rgba(0, 0, 0, 0.5)"
          }}
          exit={{ 
            opacity: 0,
            backdropFilter: "blur(0px)",
            backgroundColor: "rgba(0, 0, 0, 0)"
          }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        />


 <button
            onClick={onClose}
            className="absolute  left-[200px] top-[100px] flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full hover:bg-blue-800 transition-colors"
          >
            <X size={18} />
          </button>


        <motion.div
          className="w-full max-w-4xl h-[85vh] max-h-[90vh] rounded-t-lg p-10 shadow-lg absolute bg-white sm:rounded-lg overflow-y-auto"
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 60, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          
 
          <div className="h-full flex flex-col">
            
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {isEditing ? "Edit Announcement" : "Add New Announcement"}
            </h2>

            <form onSubmit={onSubmit} className="flex-1 flex flex-col space-y-4 overflow-y-auto">
              <div>
                <label 
                  className="block text-sm font-medium !text-gray-900 mb-1"
                  style={{...FONTS.paragraph}}>
                  Title
                </label>
                <input 
                  title="Announcement Title"
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4c469f]"
                />
              </div>
         
              <div className="flex gap-4">
                <div className="flex-1">
                  <label 
                    className="block text-sm font-medium !text-gray-900 mb-1"
                    style={{...FONTS.paragraph}}>
                    Start Date
                  </label>
                  <input
                    title="Announcement Start Date"
                    type="date"
                    required
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4c469f]"
                  />
                </div>
                <div className="flex-1">
                  <label 
                    className="block text-sm font-medium !text-gray-900 mb-1" 
                    style={{...FONTS.paragraph}}>
                    End Date
                  </label>
                  <input
                    title="Announcement End Date"
                    type="date"
                    required
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4c469f]"
                  />
                </div>
              </div>

              <div className="flex-1">
                <label 
                  className="block text-sm font-medium !text-gray-900 mb-1"
                  style={{...FONTS.paragraph}}>
                  Description
                </label>
                <textarea
                  title="Announcement Description"
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={8}
                  className="w-full h-full min-h-[200px] border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4c469f]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 pb-4 sticky bottom-0 bg-white">
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#4c469f] text-white rounded-md hover:bg-[#3b3880] transition-colors"
                >
                  {isEditing ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
    
export default AnnouncementForm;


