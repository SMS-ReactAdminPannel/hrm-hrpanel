
import {  BsClipboardCheckFill } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
// import {  } from "react-icons/fa6";
import { GiSwapBag } from "react-icons/gi";
import { GrProjects, GrUserNew } from "react-icons/gr";
import { IoIosPeople } from "react-icons/io";
import { IoCalendarSharp } from "react-icons/io5";
import { MdEventNote } from "react-icons/md";

const cards = [ 
  {
    icon: <IoCalendarSharp className="w-10 h-10 p-2 rounded-xl text-white border" />,
    title: "Attendance",
    value: 124,
    percent: "96%",
  },
  {
    icon: <GrProjects className="w-10 h-10 p-2 rounded-xl text-white border" />,
    title: "Total Projects",
    value: 18,
    percent: "12%",
  },
  {
    icon: <FaUsers className="w-10 h-10 p-2 rounded-xl text-white border" />,
    title: "Total Clients",
    value: 45,
    percent: "34%",
  },
  {
    icon: <BsClipboardCheckFill className="w-10 h-10 p-2 rounded-xl text-white border" />,
    title: "Total Tasks",
    value: 275,
    percent: "76%",
  },
  {
    icon: <GiSwapBag className="w-10 h-10 p-2 rounded-xl text-white border" />,
    title: "Earnings",
    value: 6500,
    percent: "18%",
  },
  {
    icon: <MdEventNote className="w-10 h-10 p-2 rounded-xl text-white border" />,
    title: "Profit This Week",
    value: 1200,
    percent: "9%",
  },
  {
    icon: <IoIosPeople className="w-10 h-10 p-2 rounded-xl text-white border" />,
    title: "Job Applicants",
    value: 27,
    percent: "15%",
  },
  {
    icon: <GrUserNew className="w-10 h-10 p-2 rounded-xl text-white border" />,
    title: "New Hire",
    value: 6,
    percent: "3%",
  },
];


const CardDashboard = () => {
  return (
    <div className="w-full h-full ">
      <div className="grid grid-cols-4 md:grid-cols-2 gap-3 ">
        {cards.map((card, index) => (
          <div
            key={index}
            className="p-2 h-[150px] w-full border bg-gray-500 bg-clip-padding backdrop-filter backdrop-blur bg-opacity-10 backdrop-saturate-100 backdrop-contrast-100 rounded-xl flex flex-col justify-between  hover:scale-103 transition-transform duration-300" 
          >
            <div className="">
              <div className="">
                {card.icon}
              </div>
              <div>
                <p className="font-semibold text-sm mt-2">{card.title}</p>
              </div>
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
