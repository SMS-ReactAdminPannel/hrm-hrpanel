// import React from "react";
import { ClipboardCheck } from "lucide-react";
import { GoProjectSymlink } from "react-icons/go";
import { GrUserNew } from "react-icons/gr";
import { IoIosPeople } from "react-icons/io";
import { MdEventNote } from "react-icons/md";
import { TbCalendarShare, TbMoneybag } from "react-icons/tb";

const cards = [ 
  {
    icon: <TbCalendarShare className="w-10 h-10 p-3 rounded-xl text-white border" />,
    title: "Attendance",
    value: 124,
    percent: "96%",
  },
  {
    icon: <GoProjectSymlink className="w-10 h-10 p-3 rounded-xl text-white border" />,
    title: "Total Projects",
    value: 18,
    percent: "12%",
  },
  {
    icon: <IoIosPeople className="w-10 h-10 p-3 rounded-xl text-white border" />,
    title: "Total Clients",
    value: 45,
    percent: "34%",
  },
  {
    icon: <ClipboardCheck className="w-10 h-10 p-3 rounded-xl text-white border" />,
    title: "Total Tasks",
    value: 275,
    percent: "76%",
  },
  {
    icon: <TbMoneybag className="w-10 h-10 p-3 rounded-xl text-white border" />,
    title: "Earnings",
    value: 6500,
    percent: "18%",
  },
  {
    icon: <MdEventNote className="w-10 h-10 p-3 rounded-xl text-white border" />,
    title: "Profit This Week",
    value: 1200,
    percent: "9%",
  },
  {
    icon: <IoIosPeople className="w-10 h-10 p-3 rounded-xl text-white border" />,
    title: "Job Applicants",
    value: 27,
    percent: "15%",
  },
  {
    icon: <GrUserNew className="w-10 h-10 p-3 rounded-xl text-white border" />,
    title: "New Hire",
    value: 6,
    percent: "3%",
  },
];


const CardDashboard = () => {
  return (
    <div className="w-full h-full">
      <div className="grid grid-cols-4 md:grid-cols-2 gap-4">
        {cards.map((card, index) => (
          <div
            key={index}
            className="p-2 h-[150px] w-full border bg-gray-500 bg-clip-padding backdrop-filter backdrop-blur bg-opacity-10 backdrop-saturate-100 backdrop-contrast-100 rounded-xl flex flex-col justify-between"
          >
            <div>
              {card.icon}
              <p className="font-semibold text-sm mt-2">{card.title}</p>
             <div className=" flex gap-2 ">
                <div className="">
                <p className="text-lg font-bold">{card.value}</p>
                </div>
                <div className="">
                <p className=" text-md  font-semibold text-gray-300 mt-0.5 ">{card.percent}</p>
                </div>
             </div>
            </div>
            <div>
              <button className="text-sm text-white hover:text-blue-200">View All</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardDashboard;
