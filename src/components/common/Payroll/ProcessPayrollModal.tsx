import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedOption: string;
  setSelectedOption: (value: string) => void;
  departmentOptions: string[];
  selectedDepartment: string;
  setSelectedDepartment: (value: string) => void;
}

const ProcessPayrollModal: React.FC<Props> = ({
  isOpen,
  onClose,
  selectedOption,
  setSelectedOption,
  departmentOptions,
  selectedDepartment,
  setSelectedDepartment,
}) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showFinalModal, setShowFinalModal] = useState(false);
  const [confirm, setConfirm] = useState("");

  const isValid =
    selectedOption === "all" || (selectedOption === "department" && selectedDepartment);

  const target =
    selectedOption === "all"
      ? "All Employees"
      : selectedDepartment || "No Department Selected";

  const handleProcess = () => {
    if (isValid) {
      setShowConfirmModal(true);
    }
  };

  const handleConfirm = () => {
    setShowConfirmModal(false);
    setShowFinalModal(true);
  };

  const handleFinalConfirm = () => {
    if (confirm.trim().toLowerCase() === "confirm") {
      alert(`Payroll processed for: ${target}`);
      setConfirm("");
      setShowFinalModal(false);
      onClose();
    } else {
      alert("Please type 'confirm' to proceed.");
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-clip-padding backdrop-filter backdrop-blur bg-black/40 backdrop-saturate-100 backdrop-contrast-100 overflow-hidden rounded-xl shadow-lg p-6 w-full max-w-2xl"
            >
              <h2 className="text-xl font-semibold text-white mb-4">Process Payroll</h2>

              <label className="block mb-2 text-sm font-medium text-white">
                Select Payroll Option
              </label>
              <select
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4"
              >
                <option value="all">All Employees</option>
                <option value="department">By Department</option>
              </select>

              {selectedOption === "department" && (
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-medium text-white">
                    Select Department
                  </label>
                  <select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-4 py-2"
                  >
                    <option value="">-- Select --</option>
                    {departmentOptions.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-sm bg-gray-300 rounded-md"
                >
                  Cancel
                </button>
                <button
                  disabled={!isValid}
                  onClick={handleProcess}
                  className={`px-4 py-2 text-sm rounded-md text-white ${
                    isValid ? "bg-[#006666]" : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  Process
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showConfirmModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm"
            >
              <h3 className="text-lg font-semibold mb-4">Are you sure?</h3>
              <p className="mb-6">
                You are about to process payroll for <strong>{target}</strong>.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="px-4 py-2 text-sm bg-gray-300 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  className="px-4 py-2 text-sm bg-[#006666] text-white rounded-md"
                >
                  Yes, Continue
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showFinalModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm"
            >
              <h3 className="text-lg font-semibold mb-4">
                Are you sure you want to confirm the payroll process
              </h3>
              <input
                type="text"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Type confirm to continue.."
                className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4"
              />
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowFinalModal(false)}
                  className="px-4 py-2 text-sm bg-gray-300 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleFinalConfirm}
                  className="px-4 py-2 text-sm bg-[#006666] text-white rounded-md"
                >
                  Confirm
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProcessPayrollModal;
