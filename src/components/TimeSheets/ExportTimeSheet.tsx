import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FilterTimeSheet from "./FilterTimeSheet";
import { FONTS } from "../../constants/uiConstants";

interface ExportTimeSheetProps {
  onClose: () => void;
  onExport: (params: any) => void;
}

const ExportTimeSheet: React.FC<ExportTimeSheetProps> = ({
  onClose,
  onExport,
}) => {
  const [format, setFormat] = useState("CSV");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [timeFormat, setTimeFormat] = useState("24hr");

  const [dropdownOpen, setDropdownOpen] = useState({
    format: false,
    timeFormat: false,
  });

  const formatRef = useRef<HTMLDivElement>(null);
  const timeFormatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        formatRef.current && !formatRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen((prev) => ({ ...prev, format: false }));
      }
      if (
        timeFormatRef.current && !timeFormatRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen((prev) => ({ ...prev, timeFormat: false }));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (name: "format" | "timeFormat") => {
    setDropdownOpen((prev) => ({
      format: false,
      timeFormat: false,
      [name]: !prev[name],
    }));
  };

  const selectOption = (name: "format" | "timeFormat", value: string) => {
    if (name === "format") setFormat(value);
    else if (name === "timeFormat") setTimeFormat(value);
    setDropdownOpen((prev) => ({ ...prev, [name]: false }));
  };

  const handleExport = () => {
    onExport({
      format,
      fromDate,
      toDate,
      timeFormat,
    });
    onClose();
  };

  const formatOptions = ["CSV", "PDF", "Excel"];
  const timeFormatOptions = ["24hr", "12hr"];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <AnimatePresence>
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="w-full max-w-2xl bg-white rounded-t-2xl p-6 shadow-xl backdrop-blur-md"
        >
           <button
              onClick={onClose}
              className="absoulte top-4 text-4xl left-3 -ml-[65px]  text-white -mt-6
               hover:text-gray-600 bg-blue-700 rounded-l-full h-10 w-10 flex items-center justify-center shadow"
              aria-label="Close Export Timesheet"
            >
              &times; 
            </button>

          <div className="flex justify-between items-center mb-6">
            <h2
              className="!text-2xl font-bold text-black"
              style={{ fontSize: FONTS.header.fontSize }}
            >
              Export Timesheet
            </h2>
           
          </div>

          <div className="mb-4 relative" ref={formatRef}>
            <label className="block font-semibold text-black mb-1 cursor-pointer">
              File Format
            </label>
            <button
              type="button"
              onClick={() => toggleDropdown("format")}
              className="w-full px-4 py-2 bg-gray border border-[#006666] rounded-md shadow-lg flex justify-between items-center text-black font-semibold hover:shadow-md hover:scale-[1.02] transition"
            >
              {format}
              <span className="ml-2">&#9662;</span>
            </button>
            {dropdownOpen.format && (
              <ul className="absolute z-50 mt-2 w-full bg-white text-black border border-gray-300 rounded-md shadow-lg max-h-48 overflow-auto">
                {formatOptions.map((option) => (
                  <li
                    key={option}
                    onClick={() => selectOption("format", option)}
                    className={`px-4 py-2 cursor-pointer hover:bg-[#f0fdfa] transition ${
                      format === option ? "bg-[#e6fffa] font-semibold" : ""
                    }`}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <FilterTimeSheet />

          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <label
                htmlFor="fromDate"
                className="block font-semibold text-black mb-1 cursor-pointer"
              >
                From Date
              </label>
              <input
                id="fromDate"
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full px-4 py-2 border border-[#006666] rounded-md text-black font-medium focus:outline-none focus:ring-2 focus:ring-[#006666]"
              />
            </div>
            <div className="flex-1">
              <label
                htmlFor="toDate"
                className="block font-semibold text-black mb-1 cursor-pointer"
              >
                To Date
              </label>
              <input
                id="toDate"
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full px-4 py-2 border border-[#006666] rounded-md text-black font-medium focus:outline-none focus:ring-2 focus:ring-[#006666]"
              />
            </div>
          </div>

          <div className="mb-6 relative" ref={timeFormatRef}>
            <label className="block font-semibold text-black mb-1 cursor-pointer">
              Time Format
            </label>
            <button
              type="button"
              onClick={() => toggleDropdown("timeFormat")}
              className="w-full px-4 py-2 bg-white border border-[#006666] rounded-md shadow-lg flex justify-between items-center text-black font-semibold hover:shadow-md hover:scale-[1.02] transition"
            >
              {timeFormat === "24hr" ? "24 Hour" : "12 Hour"}
              <span className="ml-2">&#9662;</span>
            </button>
            {dropdownOpen.timeFormat && (
              <ul className="absolute z-50 mt-2 w-full bg-white text-black border border-gray-300 rounded-md shadow-lg max-h-48 overflow-auto">
                {timeFormatOptions.map((option) => (
                  <li
                    key={option}
                    onClick={() => selectOption("timeFormat", option)}
                    className={`px-4 py-2 cursor-pointer hover:bg-[#f0fdfa] transition ${
                      timeFormat === option ? "bg-[#e6fffa] font-semibold" : ""
                    }`}
                  >
                    {option === "24hr" ? "24 Hour" : "12 Hour"}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex justify-end gap-4">
            <button
              onClick={onClose}
               className="bg-[#006666] text-white px-4 py-2 rounded hover:bg-[#005555] transition"
            >
              Cancel
            </button>
            <button
              onClick={handleExport}
              className="bg-[#006666] text-white px-4 py-2 rounded hover:bg-[#005555] transition"
            >
              Export
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ExportTimeSheet;
