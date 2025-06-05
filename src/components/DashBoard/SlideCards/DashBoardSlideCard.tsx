import  { useEffect, useState } from "react";

// interface CardData {
//   title: string;
//   subtitle: string;
//   imageUrl: string;
//   stats: { label: string; value: string }[];
// }

const cardItems = [
  {
    title: "Admin Department",
    subtitle: "Efficiency Rate Improved by 28.25%",
    imageUrl:
      "https://demos.pixinvent.com/vuexy-nextjs-admin-template/demo-1/images/cards/graphic-illustration-2.png",
    stats: [
      { label: "Leave Requests", value: "120" },
      { label: "Attendance Rate", value: "92%" },
      { label: "Approvals", value: "87%" },
      { label: "Policy Updates", value: "3" },
    ],
  },
  {
    title: "Digital Marketing",
    subtitle: "15% Increase in Engagement",
    imageUrl:
      "https://demos.pixinvent.com/vuexy-nextjs-admin-template/demo-1/images/cards/graphic-illustration-1.png",
    stats: [
      { label: "Ad Clicks", value: "3.2K" },
      { label: "Campaigns", value: "5 " },
      { label: "Leads Generated", value: "750" },
      { label: "Conversion Rate", value: "12.4%" },
    ],
  },
  {
    title: "Development",
    subtitle: "New Feature Release Successful",
    imageUrl:
      "https://demos.pixinvent.com/vuexy-nextjs-admin-template/demo-1/images/cards/graphic-illustration-3.png",
    stats: [
      { label: "Tickets Closed", value: "96" },
      { label: "Code Coverage", value: "89%" },
      { label: "Deployments", value: "12 " },
      { label: "Bugs Fixed", value: "34" },
    ],
  },
  
];

const DashBoardSlideCard = () => {
  const [index, setIndex] = useState(0);

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % cardItems.length);
    }, 5000); // 5 seconds

    return () => clearInterval(interval); // Clear on unmount
  }, []);

  //   const handleNext = () => {
  //     setIndex((prev) => (prev + 1) % cardItems.length);
  //   };

  //   const handlePrev = () => {
  //     setIndex((prev) => (prev - 1 + cardItems.length) % cardItems.length);
  //   };

  const current = cardItems[index];

  return (
  <div className="h-full">
    <div className="h-full flex flex-col justify-around rounded-lg shadow p-4 transition-all duration-300 ease-in-out relative">
      
      {/* Dot indicators at top right */}
      <div className="absolute top-2 right-2">
        <div className="flex gap-1">
          {cardItems.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === i ? "bg-blue-100 scale-125" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Header */}
      <div className="mb-2">
        <p className="font-semibold text-xl">{current.title}</p>
        <p className="text-md text-gray-500">{current.subtitle}</p>
      </div>

      {/* Body */}
      <div className="flex items-center gap-3">
        {/* Stats */}
        <div className="flex-2">
          <h2 className="font-bold text-lg mb-2">Spending</h2>
          <div className="grid grid-cols-2 gap-3">
            {current.stats.map((stat, i) => (
              <div key={i} className="flex gap-2">
                <p className="bg-blue-100 rounded-lg font-bold p-1 text-sm w-16 h-8 flex text-center justify-center items-center">
                  {stat.value}
                </p>
                <p className="text-gray-600 text-sm mt-1">{stat.label}</p>
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

{
  /* Navigation Arrows */
}
{
  /* <button
        onClick={handlePrev}
        className="absolute left-2 top-1/2 -translate-y-1/2  shadow p-2 rounded-full"
      >
        ◀
      </button>
      <button
        onClick={handleNext}
        className="absolute right-2 top-1/2 -translate-y-1/2  shadow p-2 rounded-full"
      >
        ▶
      </button> */
}
