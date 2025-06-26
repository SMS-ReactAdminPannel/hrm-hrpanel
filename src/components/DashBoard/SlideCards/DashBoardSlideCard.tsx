import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FONTS } from "../../../constants/uiConstants";

const cardItems = [
  {
    title: "Admin Department",
    subtitle: "Efficiency Rate Improved by 28.25%",
    imageUrl:
      "https://demos.pixinvent.com/vuexy-nextjs-admin-template/demo-1/images/cards/graphic-illustration-2.png",
    stats: [
      { label: "Information Technology", value: "120" },
      { label: "Engineering", value: "92" },
      { label: "Mobile App Development", value: "87" },
      { label: "Networking Support", value: "39" },
    ],
  },
  {
    title: "Digital Marketing",
    subtitle: "15% Increase in Engagement",
    imageUrl:
      "https://demos.pixinvent.com/vuexy-nextjs-admin-template/demo-1/images/cards/graphic-illustration-1.png",
    stats: [
      { label: "Content Marketing", value: "3.2K" },
      { label: "Search Engine Optimization (SEO)", value: "5 " },
      { label: "Social Media Marketing", value: "750" },
      { label: "Email & Automation Marketing", value: "12.4%" },
    ],
  },
  {
    title: "Software Development",
    subtitle: "New Feature Release Successful",
    imageUrl:
      "https://demos.pixinvent.com/vuexy-nextjs-admin-template/demo-1/images/cards/graphic-illustration-3.png",
    stats: [
      { label: "Frontend Development", value: "96" },
      { label: "Backend Development", value: "89" },
      { label: "Quality Assurance (QA) & Testing", value: "12 " },
      { label: " DevOps & Deployment", value: "34" },
    ],
  },
  
];

const DashBoardSlideCard = () => {
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % cardItems.length);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + cardItems.length) % cardItems.length);
  };

  const current = cardItems[index];

  return (
    <div className="h-full">
      <div className="h-full flex flex-col border rounded-lg shadow p-4 bg-gray-500 bg-clip-padding backdrop-filter  backdrop-blur bg-opacity-10 backdrop-saturate-100 backdrop-contrast-100 transition-all duration-300 ease-in-out relative">
        
        {/* Top Section: Title + Arrows + Dots */}
        <div className="flex justify-between items-center mb-2">
          <div>
            <p className=" text-white font-semibold mb-3"
              style={{ ...FONTS.header }}>{current.title}</p>
            <p className="text-sm !text-white "
            style={{...FONTS.cardSubHeader }}>{current.subtitle}</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="bg-white hover:bg-gray-100 shadow p-1.5 rounded-full"
            >
              <ChevronLeft className="w-4 h-4 text-gray-700" />
            </button>
            <button
              onClick={handleNext}
              className="bg-white hover:bg-gray-100 shadow p-1.5 rounded-full"
            >
              <ChevronRight className="w-4 h-4 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Body - Moved up */}
        <div className="flex items-center gap-6 mt-3">
          {/* Stats */}
          <div className="flex-1">
            <h2 className=" text-md mb-2"></h2> 
            <div className="grid grid-cols-2 gap-3">
              {current.stats.map((stat, i) => (
                <div key={i} className="flex gap-2">
                  <p className="bg-blue-100 rounded-lg font-bold p-1 text-sm w-16 h-8 flex justify-center items-center">
                    {stat.value}
                  </p>
                  <p className="text-white text-sm mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="flex-1 flex justify-center">
            <img src={current.imageUrl} alt="card" className="w-28" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardSlideCard;
