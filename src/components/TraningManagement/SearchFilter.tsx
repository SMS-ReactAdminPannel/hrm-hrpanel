import type React from "react";
import { Search, Plus } from "lucide-react";
import { FONTS } from "../../constants/uiConstants";
import CustomDropdown from "./customDropDown"; // update path as needed

interface SearchFilterBarProps {
  searchTerm: string;
  selectedCategory: string;
  categories: string[];
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCategoryChange: (e: { target: { value: string } }) => void; // ✅ FIXED TYPE
  onNewProgram: () => void;
}

export const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  searchTerm,
  selectedCategory,
  categories,
  onSearchChange,
  onCategoryChange,
  onNewProgram,
}) => (
  <div className="flex flex-row gap-5  justify-start items-center">
    <div className="flex">
      <header className="border-gray-200">
        <div className="max-w-full px-3">
          <div className="flex justify-start items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="font-bold !text-3xl" style={FONTS.header}>
                Training Management
              </h1>
            </div>
          </div>
        </div>
      </header>
    </div>

    <div className="flex items-center flex gap-3">
      <div className="flex h-9">
        <button
          onClick={onNewProgram}
          className="flex items-center space-x-1 bg-[#5e59a9] text-white px-1 md:px-2 py-2 md:py-2 rounded-lg hover:bg-[#4c4aa1] transition-colors"
          style={FONTS.button}
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm md:text-base" style={{...FONTS.button}}>New Program</span>
        </button>
      </div>

      <div className="flex h-9 ">
        <div className="flex relative border border-gray-300 rounded-md md:w-68 backdrop-blur-xl bg-white/10">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 !text-gray-300"
            style={FONTS.paragraph}
          />
          <input
            type="text"
            placeholder="Search programs..."
            value={searchTerm}
            onChange={onSearchChange}
            className="w-50% md:w-68 pl-10 pr-4 py-2  rounded-lg focus:border-transparent bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-300 text-white placeholder-gray-300 !text-gray-600"
            style={FONTS.paragraph}
          />
        </div>
      </div>

      <div className="flex items-center space-x-2  ">
        <CustomDropdown
          options={categories}
          value={selectedCategory}
          onChange={onCategoryChange}
           //FONTS={FONTS.}
        />
      </div>
    </div>
  </div>
);
