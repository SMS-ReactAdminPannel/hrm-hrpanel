import React, { useState } from "react";
import FilterTimeSheet from "./FilterTimeSheet";

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

  const handleExport = () => {
    onExport({
      format,
      fromDate,
      toDate,
      timeFormat,
    });
    onClose();
  };

  return (
      <div className="fixed top-0 right-0 h-[100vh] z-50 w-full h-full max-w-2xl bg-gray-200 shadow-xl rounded-lg border border-[#006666] p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-[#006666]">Export Timesheet</h2>
          <button onClick={onClose} className="text-xl text-gray-500 hover:text-black hover:bg-[#006666] hover:text-white px-2 pb-1 rounded-md">
            &times;
          </button>
        </div>

        <div className="mb-4">
          <label className="block font-semibold text-[#006666] mb-1">File Format</label>
          <select
            title="fileformat"
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            className="w-full border border-[#006666] rounded-md p-2 text-[#006666] font-semibold"
          >
            <option value="CSV">CSV</option>
            <option value="PDF">PDF</option>
            <option value="Excel">Excel</option>
          </select>
        </div>

        <FilterTimeSheet />

        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label className="block font-semibold text-[#006666] mb-1">From Date</label>
            <input
            title="FromDate"
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="w-full border border-[#006666] rounded-md p-2 text-[#006666]"
            />
          </div>
          <div className="flex-1">
            <label className="block font-semibold text-[#006666] mb-1">To Date</label>
            <input
            title="ToDate"
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="w-full border border-[#006666] rounded-md p-2 text-[#006666]"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block font-semibold text-[#006666] mb-1">Time Format</label>
          <select
          title="timeFormat"
            value={timeFormat}
            onChange={(e) => setTimeFormat(e.target.value)}
            className="w-full border border-[#006666] rounded-md p-2 text-[#006666] font-semibold"
          >
            <option value="24hr">24 Hour</option>
            <option value="12hr">12 Hour</option>
          </select>
        </div>

        <div className="flex justify-end gap-4">
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
    // </div>
  );
};

export default ExportTimeSheet;
