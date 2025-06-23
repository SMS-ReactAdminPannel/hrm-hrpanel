import { FaPlus } from "react-icons/fa6";
import { useState, useRef, useEffect } from "react";
import { FONTS } from "../../constants/uiConstants";

const FilterTimeSheet = () => {
    const hourOptions = Array.from({ length: 10 }, (_, i) => `${i}-${i + 1} hr`);
    const dropdownData = [
        { title: "Payroll Hours", options: hourOptions },
        { title: "Departments", options: ["No Data found"] },
        // { title: "Members", options: ["Work", "Intern"] },
        // { title: "Member Codes", options: ["Code - 1", "Code - 2"] },
    ];

    const [dropdownStates, setDropdownStates] = useState(
        dropdownData.map(() => ({ open: false, selected: "" }))
    );

    const dropdownRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            dropdownRefs.current.forEach((ref, idx) => {
                if (ref && !ref.contains(event.target as Node)) {
                    setDropdownStates((prev) =>
                        prev.map((item, i) => (i === idx ? { ...item, open: false } : item))
                    );
                }
            });
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleDropdown = (index: number) => {
        setDropdownStates((prev) =>
            prev.map((item, i) => ({
                ...item,
                open: i === index ? !item.open : false,
            }))
        );
    };

    const selectOption = (index: number, value: string) => {
        setDropdownStates((prev) =>
            prev.map((item, i) =>
                i === index ? { ...item, selected: value, open: false } : item
            )
        );
    };

    return (
        <div className="flex flex-wrap gap-4 items-end py-5">
            {dropdownData.map((dropdown, index) => (
                <div
                    key={dropdown.title}
                    className="relative w-35"
                    ref={(el) => {
                        dropdownRefs.current[index] = el;
                    }}
                >
                    <button
                        type="button"
                        onClick={() => toggleDropdown(index)}
                        className="w-full px-4 py-2 !bg-[#eff4f5]  !text-black rounded-md shadow-lg flex justify-between items-center hover:shadow-md hover:scale-[1.02] transition"
                       style={{...FONTS.button}}
                    >
                        {dropdownStates[index].selected || dropdown.title}
                        <span className="ml-2 !text-gray-800" style={{...FONTS.description}}>&#9662;</span>
                    </button>
                    {dropdownStates[index].open && (
                        <ul className="absolute z-50 mt-2 w-full !bg-white !text-[#006666] border !border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto" 
                         style={{...FONTS.paragraph}}
                        >
                            {dropdown.options.map((option) => (
                                <li
                                    key={option}
                                    onClick={() => selectOption(index, option)}
                                    className={`px-4 py-2 cursor-pointer !hover:bg-[#f0fdfa] !hover:text-[#006666] transition ${dropdownStates[index].selected === option
                                        ? "!bg-[#e6fffa] !text-[#006666] !font-semibold"
                                        : ""
                                        }`}
                                >
                                    {option}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            ))}

            {/* <button className="bg-[#006666] text-white px-5 py-2 rounded-md flex items-center gap-2 hover:bg-[#005555] transition">
                <FaPlus /> Filter
            </button> */}
        </div>
    );
};

export default FilterTimeSheet;
