import { Plus, Search } from "lucide-react";
import { FONTS } from "../../constants/uiConstants";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onAddClick: () => void;
}

export function SearchBar({
  searchTerm,
  onSearchChange,
  onAddClick,
}: SearchBarProps) {
  return (
   <div className="flex items-center justify-start gap-5 mb-6  px-2 py-2">
  {/* Heading */}
  <div className="text-2xl font-bold" style={{ ...FONTS.header }}>
    Deduction Management
  </div>

 <div className="flex gap-3">
   {/* Add Button */}
  <div className="h-8">
    <button
      className="rounded-md h-8 text-white px-4 py-1.5 shadow-md transition-colors duration-200 flex items-center justify-center gap-2 bg-[#5e59a9] hover:bg-[#4c4aa1]"
      onClick={onAddClick}
      style={{ ...FONTS.button, color: "#FFFFFF" }}
    >
      <Plus size={20} />
      Add Deduction
    </button>
  </div>

  {/* Search Bar */}
  <div className="flex relative border border-gray-300 rounded-md md:w-80 h-8 backdrop-blur-xl bg-white/10">
    <Search className="text-gray-300 absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4" />
    <input
      type="text"
      placeholder="Search employees..."
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
      className="w-full pr-12 pl-4 px-2 py-1 bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-lg text-white placeholder-gray-300"
      style={{ ...FONTS.paragraph }}
    />
  </div>
 </div>
</div>

  );
}
