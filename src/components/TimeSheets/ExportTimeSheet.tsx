import React, { useState, useRef, useEffect } from "react";
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
    <div className="fixed top-0 right-0 h-full w-full max-w-2xl z-50 bg-white shadow-xl rounded-lg p-6"
      style={{ fontFamily: FONTS.paragraph.fontFamily }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-[#006666]"
        >Export Timesheet</h2>
        <button
          onClick={onClose}
          className="text-2xl text-gray-500 hover:bg-[#006666] hover:text-white px-2 pb-1 rounded-md"
          aria-label="Close Export Timesheet"
        >
          &times;
        </button>
      </div>

      <div className="mb-4 relative" ref={formatRef}>
        <label className="block font-semibold text-[#006666] mb-1 cursor-pointer"
        >
          File Format
        </label>
        <button
          type="button"
          onClick={() => toggleDropdown("format")}
          className="w-full px-4 py-2 bg-white border border-[#006666] rounded-md shadow-lg flex justify-between items-center text-[#006666] font-semibold hover:shadow-md hover:scale-[1.02] transition"
        >
          {format}
          <span className="ml-2">&#9662;</span>
        </button>
        {dropdownOpen.format && (
          <ul className="absolute z-50 mt-2 w-full bg-white text-[#006666] border border-gray-300 rounded-md shadow-lg max-h-48 overflow-auto">
            {formatOptions.map((option) => (
              <li
                key={option}
                onClick={() => selectOption("format", option)}
                className={`px-4 py-2 cursor-pointer hover:bg-[#f0fdfa] hover:text-[#006666] transition ${format === option ? "bg-[#e6fffa] font-semibold" : ""
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
            className="block font-semibold text-[#006666] mb-1 cursor-pointer"
          >
            From Date
          </label>
          <input
            id="fromDate"
            title="FromDate"
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="w-full px-4 py-2 border border-[#006666] rounded-md text-[#006666] font-medium focus:outline-none focus:ring-2 focus:ring-[#006666]"
          />
        </div>
        <div className="flex-1">
          <label
            htmlFor="toDate"
            className="block font-semibold text-[#006666] mb-1 cursor-pointer"
          >
            To Date
          </label>
          <input
            id="toDate"
            title="ToDate"
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="w-full px-4 py-2 border border-[#006666] rounded-md text-[#006666] font-medium focus:outline-none focus:ring-2 focus:ring-[#006666]"
          />
        </div>
      </div>

      <div className="mb-6 relative" ref={timeFormatRef}>
        <label className="block font-semibold text-[#006666] mb-1 cursor-pointer">
          Time Format
        </label>
        <button
          type="button"
          onClick={() => toggleDropdown("timeFormat")}
          className="w-full px-4 py-2 bg-white border border-[#006666] rounded-md shadow-lg flex justify-between items-center text-[#006666] font-semibold hover:shadow-md hover:scale-[1.02] transition"
        >
          {timeFormat === "24hr" ? "24 Hour" : "12 Hour"}
          <span className="ml-2">&#9662;</span>
        </button>
        {dropdownOpen.timeFormat && (
          <ul className="absolute z-50 mt-2 w-full bg-white text-[#006666] border border-gray-300 rounded-md shadow-lg max-h-48 overflow-auto">
            {timeFormatOptions.map((option) => (
              <li
                key={option}
                onClick={() => selectOption("timeFormat", option)}
                className={`px-4 py-2 cursor-pointer hover:bg-[#f0fdfa] hover:text-[#006666] transition ${timeFormat === option ? "bg-[#e6fffa] font-semibold" : ""
                  }`}
              >
                {option === "24hr" ? "24 Hour" : "12 Hour"}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex justify-end gap-4"
      >
        <button
          onClick={onClose}
          className="border border-[#006666] px-4 py-2 rounded text-[#006666] hover:bg-gray-100 transition"
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
    </div>
  );
};

export default ExportTimeSheet;
