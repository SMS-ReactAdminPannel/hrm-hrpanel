import type React from "react";
import { useState } from "react";
import { GraduationCap, Pencil, Plus, Trash2 } from "lucide-react";
import { FONTS } from "../../constants/uiConstants";

interface EducationItem {
  instituteName: string;
  degree: string;
  startDate: string;
  endDate: string;
}

interface EducationProps {
  data: EducationItem[];
  onUpdate?: (data: EducationItem[]) => void;
}

export const EducationComponent: React.FC<EducationProps> = ({
  data,
  onUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [education, setEducation] = useState<EducationItem[]>(data);

  const handleArrayFieldChange = (
    index: number,
    key: string,
    value: string
  ) => {
    const newEducation = [...education];
    newEducation[index] = { ...newEducation[index], [key]: value };
    setEducation(newEducation);
  };

  const addEducation = () => {
    setEducation([
      ...education,
      { instituteName: "", degree: "", startDate: "", endDate: "" },
    ]);
  };

  const removeEducation = (index: number) => {
    const newEducation = education.filter((_, i) => i !== index);
    setEducation(newEducation);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Education updated:", education);
    setIsEditing(false);
    if (onUpdate) {
      onUpdate(education);
    }
  };

  return (
    <div className="flex flex-1 flex-col rounded-xl bg-white p-4 shadow-2xl border border-[#006666]/20 hover:shadow-3xl  transition-all duration-300 group">
      {isEditing && (
        <div className="-mb-2 p-2 ">
          <p className="text-red-800 text-xs">
            Edit Mode Active - Make your changes and click Save
          </p>
        </div>
      )}

      <div className="flex items-center gap-3 mb-2 relative justify-between">
        <div className="flex gap-2 items-center justify-center">
          <div className="p-3 -mr-3   transition-transform duration-300">
            <GraduationCap size={24} />
          </div>
          <div><h2 className="text-2xl  !text-[#000000]"
          style={{...FONTS.cardheader}}>Education</h2></div>
        </div>
        
        <div className="flex gap-2">
          {isEditing && (
            <button
              onClick={addEducation}
              className=" rounded-lg hover:text-blue-200 "
            >
              <Plus size={16} />
            </button>
          )}
          <button
            className=" p-1  rounded-lg hover:text-blue-200 cursor-pointer"
            onClick={() => setIsEditing(!isEditing)}
          >
            <Pencil size={16} />
          </button>
        </div>
      </div>
      <hr className="border-gray-900 mb-5" />
      <form onSubmit={handleSubmit}>
        <div className="space-y-4 h-64 overflow-y-auto scrollbar-hide">
          {education.map((item, index) => (
            <div
              key={index}
              className="p-2 bg-gradient-to-r  rounded-xl  transition-shadow duration-200 relative"
            >
              {isEditing && education.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeEducation(index)}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200"
                >
                  <Trash2 size={12} />
                </button>
              )}
              <input
                type="text"
                className="font-semibold !text-gray-800 bg-transparent w-full mb-2 outline-none"
                value={item.instituteName}
                onChange={(e) =>
                  handleArrayFieldChange(index, "instituteName", e.target.value)
                }
                readOnly={!isEditing}
                placeholder="Institute Name"
                style={{...FONTS.cardSubHeader}}
              />
              <input
                type="text"
                className="font-semibold bg-transparent !text-[#000000]/60 w-full text-slate-800 mb-1 outline-none"
                value={item.degree}
                onChange={(e) =>
                  handleArrayFieldChange(index, "degree", e.target.value)
                }
                readOnly={!isEditing}
                placeholder="Degree"
                style={{...FONTS.subParagraph}}
              />
              <div className="flex flex-row space-x-1 ">
                <input
                  type="text"
                  className="bg-transparent w-1/2 text-slate-900 outline-none"
                  value={item.startDate}
                  onChange={(e) =>
                    handleArrayFieldChange(index, "startDate", e.target.value)
                  }
                  readOnly={!isEditing}
                  placeholder="Start Date"
                  style={{...FONTS.statusCardDescription}}
                />
                <input
                  type="text"
                  className="bg-transparent w-1/2 text-slate-900 outline-none"
                  value={item.endDate}
                  onChange={(e) =>
                    handleArrayFieldChange(index, "endDate", e.target.value)
                  }
                  readOnly={!isEditing}
                  placeholder="End Date"
                  style={{...FONTS.statusCardDescription}}
                />
              </div>
            </div>
          ))}
        </div>

        {isEditing && (
          <div className="mt-3 flex justify-end gap-3 p-1">
            <button
              onClick={() => setIsEditing(false)}
              type="button"
              className="px-2 py-1 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200 font-semibold"
              style={{...FONTS.button}}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-2 py-1 bg-gradient-to-r from-[#006666] to-[#008080] text-white rounded-lg hover:from-[#008080] hover:to-[#006666] transition-all duration-200 font-semibold shadow-lg transform hover:scale-105"
              style={{...FONTS.button}}
            >
              Save Changes
            </button>
          </div>
        )}
      </form>
    </div>
  );
};
