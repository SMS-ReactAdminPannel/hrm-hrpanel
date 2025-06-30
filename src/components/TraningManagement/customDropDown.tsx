import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react"; // ✅ Import both icons

interface CustomDropdownProps {
  options: string[];
  value: string;
  onChange: (event: { target: { value: string } }) => void;
  FONTS?: { paragraph?: React.CSSProperties };
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  value,
  onChange,
  FONTS = {},
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option: string) => {
    onChange({ target: { value: option } });
    setOpen(false);
  };

  return (
    <div
      ref={ref}
      className="relative border border-gray-300 rounded-md md:w-68 backdrop-blur-xl bg-white/10 text-white"
    >
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-full md:w-96 flex justify-between items-center md:px-10 py-2 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-300"
        style={FONTS.paragraph}
      >
        <span>{value === "all" ? "All Categories" : value}</span>

        {/* ✅ Conditional rendering of up/down arrow */}
        {open ? (
          <ChevronUp className="w-4 h-4 text-white ml-2" />
        ) : (
          <ChevronDown className="w-4 h-4 text-white ml-2" />
        )}
      </button>

      {open && (
        <ul className="absolute z-10 w-full mt-1 bg-white text-black rounded-md shadow-lg max-h-60 overflow-auto">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => handleSelect(option)}
              className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
            >
              {option === "all" ? "All Categories" : option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
