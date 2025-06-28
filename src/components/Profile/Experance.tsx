import type React from "react";
import { useState } from "react";
import { Briefcase, Pencil, Plus, Trash2 } from "lucide-react";
import { FONTS } from "../../constants/uiConstants";

interface ExperienceProps {
  data: string[];
  onUpdate?: (data: string[]) => void;
}

export const ExperienceComponent: React.FC<ExperienceProps> = ({
  data,
  onUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [experience, setExperience] = useState<string[]>(data);

  const handleArrayFieldChange = (index: number, value: string) => {
    const newExperience = [...experience];
    newExperience[index] = value;
    setExperience(newExperience);
  };

  const addExperience = () => {
    setExperience([...experience, ""]);
  };

  const removeExperience = (index: number) => {
    const newExperience = experience.filter((_, i) => i !== index);
    setExperience(newExperience);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Experience updated:", experience);
    setIsEditing(false);
    if (onUpdate) {
      onUpdate(experience);
    }
  };

  return (
    <div className="flex flex-1 flex-col rounded-xl bg-white p-4 shadow-2xl border border-[#006666]/20 hover:shadow-3xl hover:scale-[1.02] transition-all duration-300 group">
      {isEditing && (
        <div className="-mb-2 p-2 ">
          <p className="text-red-800 text-xs">
            Edit Mode Active - Make your changes and click Save
          </p>
        </div>
      )}

      <div className="flex items-center gap-3 mb-6 relative justify-between">
        <div className="flex gap-1 justify-center items-center">
          <div className="p-3 -mr-2  group-hover:scale-110 transition-transform duration-300">
            <Briefcase size={24} />
          </div>
         <div> <h2 className="text-zxl font-bold !text-[#000000]"
         style={{...FONTS.cardheader}}>Experience</h2></div>
        </div>
        <div className="flex gap-1 ">
          {isEditing && (
            <button
              onClick={addExperience}
              className="p-1 rounded-lg hover:text-blue-200 "
            >
              <Plus size={16} />
            </button>
          )}
          <button
            className=" p-1 hover:text-blue-200  rounded-lg cursor-pointer"
            onClick={() => setIsEditing(!isEditing)}
          >
            <Pencil size={16} />
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {experience.map((item, index) => (
            <div
              key={index}
              className="p-4 bg-gradient-to-r border border-gray-500 rounded-xl hover:shadow-md transition-shadow duration-200 relative"
            >
              {isEditing && experience.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeExperience(index)}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200"
                >
                  <Trash2 size={12} />
                </button>
              )}
              <input
                type="text"
                className="font-semibold bg-transparent w-full !text-gray-900 outline-none"
                value={item}
                onChange={(e) => handleArrayFieldChange(index, e.target.value)}
                readOnly={!isEditing}
                placeholder="Experience details"
                style={{...FONTS.cardSubHeader}}
              />
            </div>
          ))}
        </div>

        {isEditing && (
          <div className="mt-3 flex justify-end gap-3 p-1 ">
            <button
              onClick={() => setIsEditing(false)}
              type="button"
              className="px-2 py-1 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-2 py-1 bg-gradient-to-r from-[#006666] to-[#008080] text-white rounded-lg hover:from-[#008080] hover:to-[#006666] transition-all duration-200 font-semibold shadow-lg transform hover:scale-105"
            >
              Save Changes
            </button>
          </div>
        )}
      </form>
    </div>
  );
};
