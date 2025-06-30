import React from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { FormData } from "../../components/EmployeeShift/employee";
import { FONTS } from "../../constants/uiConstants";

interface AssignShiftModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: FormData;
  onFormDataChange: (data: FormData) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const AssignShiftModal: React.FC<AssignShiftModalProps> = ({
  isOpen,
  onClose,
  formData,
  onFormDataChange,
  onSubmit,
}) => {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    onFormDataChange({
      ...formData,
      [name]: value,
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black  bg-opacity-50 flex items-center justify-center z-50 "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-md w-full item-center max-w-xl p-6 relative shadow-xl "
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-1 left-1 -ml-7 text-white hover:text-gray-600 bg-blue-700 rounded-l-full text-gray-600 hover:text-black flex items-center justify-center "
            >
              <X size={24} />
            </button>

            <div className="">
              {/* Header */}
              <h2
                className="text-xl font-semibold !text-[#5e59a9] mb-4 border-b pb-2"
                style={{ ...FONTS.subHeader }}
              >
                Assign Rotating Shift
              </h2>

              {/* Form */}
              <form onSubmit={onSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Employee", name: "employee", type: "text" },
                    { label: "Title", name: "title", type: "text" },
                    {
                      label: "Rotate",
                      name: "rotate",
                      type: "text",
                      placeholder: "e.g. every 5 days",
                    },
                    { label: "Department", name: "department", type: "text" },
                    { label: "Job Role", name: "jobRole", type: "text" },
                    { label: "Start Date", name: "startDate", type: "date" },
                  ].map((field) => (
                    <div key={field.name}>
                      <label
                        className="block text-sm font-medium text-gray-800 mb-1"
                        htmlFor={field.name}
                        style={{ ...FONTS.statusCardHeader }}
                      >
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        name={field.name}
                        id={field.name}
                        value={(formData as any)[field.name]}
                        onChange={handleInputChange}
                        placeholder={field.placeholder || ""}
                        required
                        className="w-full border-0 border-b border-gray-400 focus:border-[#5e59a9] focus:ring-0 text-sm px-1 py-2 bg-transparent"
                        autoComplete="off"
                      />
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Based On */}
                  <div>
                    <label
                      htmlFor="basedOn"
                      className="block text-sm font-medium text-gray-800 mb-1"
                      style={{ ...FONTS.statusCardHeader }}
                    >
                      Based On
                    </label>
                    <select
                      id="basedOn"
                      name="basedOn"
                      value={formData.basedOn}
                      onChange={handleInputChange}
                      className="w-full  border-0 border-b bg-transparent border-gray-400 px-3 py-2 shadow-sm focus:ring-[#5e59a9] focus:border-[#5e59a9] text-sm"
                    >
                      <option value="After">After</option>
                      <option value="Weekend">Weekend</option>
                      <option value="Month">Month</option>
                    </select>
                  </div>

                  {/* Current Shift */}
                  <div>
                    <label
                      htmlFor="currentShift"
                      className="block text-sm font-medium text-gray-800 mb-1"
                      style={{ ...FONTS.statusCardHeader }}
                    >
                      Current Shift
                    </label>
                    <select
                      id="currentShift"
                      name="currentShift"
                      value={formData.currentShift}
                      onChange={handleInputChange}
                      required
                      className="w-full border-0 border-b bg-transparent border-gray-400 px-3 py-2 shadow-sm focus:ring-[#5e59a9] focus:border-[#5e59a9] text-sm"
                    >
                      <option value="">Select shift</option>
                      <option value="Morning">Morning</option>
                      <option value="Night">Night</option>
                      <option value="Regular Shift">Regular Shift</option>
                      <option value="None">None</option>
                    </select>
                  </div>

                  {/* Next Shift */}
                  <div>
                    <label
                      htmlFor="nextShift"
                      className="block text-sm font-medium text-gray-800 mb-1"
                      style={{ ...FONTS.statusCardHeader }}
                    >
                      Next Shift
                    </label>
                    <select
                      id="nextShift"
                      name="nextShift"
                      value={formData.nextShift}
                      onChange={handleInputChange}
                      required
                      className="w-full border-0 border-b bg-transparent border-gray-400 px-3 py-2 shadow-sm focus:ring-[#5e59a9] focus:border-[#5e59a9] text-sm"
                    >
                      <option value="">Select shift</option>
                      <option value="Morning">Morning</option>
                      <option value="Night">Night</option>
                      <option value="Regular Shift">Regular Shift</option>
                    </select>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex justify-end gap-3 pt-4 border-t">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-[#5e59a9] hover:bg-[#4c4aa1] rounded-md"
                  >
                    Assign Shift
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AssignShiftModal;
