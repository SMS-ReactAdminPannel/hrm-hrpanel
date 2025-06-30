
import {  BsClipboardCheckFill } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
// import {  } from "react-icons/fa6";
import { GiSwapBag } from "react-icons/gi";
import { GrProjects, GrUserNew } from "react-icons/gr";
import { IoIosPeople } from "react-icons/io";
import { IoCalendarSharp } from "react-icons/io5";
import { MdEventNote } from "react-icons/md";
import {FONTS} from "../../../constants/uiConstants";
import Dashboard_bg2 from "../../../assets/HomePage/Dashboard_bg2.jpg";
// import Dashboard_bg3 from "../../../assets/HomePage/Dashboard_bg3.jpg"

const cards = [ 
  {
    icon: <IoCalendarSharp className="w-10 h-10 p-2 rounded-xl text-[#4c469f] border " />,
    title: "Attendance",
    value: 124,
    percent: "96%",
  },
  {
    icon: <GrProjects className="w-10 h-10 p-2 rounded-xl text-green-600 border" />,
    title: "Total Projects",
    value: 18,
    percent: "12%",
  },
  {
    icon: <FaUsers className="w-10 h-10 p-2 rounded-xl text-red-600 border" />,
    title: "Total Clients",
    value: 45,
    percent: "34%",
  },
  {
    icon: <BsClipboardCheckFill className="w-10 h-10 p-2 rounded-xl text-yellow-500 border" />,
    title: "Total Tasks",
    value: 275,
    percent: "76%",
  },
  {
    icon: <GiSwapBag className="w-10 h-10 p-2 rounded-xl text-yellow-500 border" />,
    title: "Earnings",
    value: 6500,
    percent: "18%",
  },
  {
    icon: <MdEventNote className="w-10 h-10 p-2 rounded-xl text-red-600 border" />,
    title: "Profit This Week",
    value: 1200,
    percent: "9%",
  },
  {
    icon: <IoIosPeople className="w-10 h-10 p-2 rounded-xl text-green-500  border" />,
    title: "Job Applicants",
    value: 27,
    percent: "15%",
  },
  {
    icon: <GrUserNew className="w-10 h-10 p-2 rounded-xl text-[#4c469f] border" />,
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
            className="p-2 h-[150px] w-full border rounded-xl flex flex-col bg-white hover:scale-97 transition-transform duration-300" style={{backgroundImage: `url(${Dashboard_bg2})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}} 
          >
            <div className="  flex-1 flex flex-col ">
              <div className="">
                {card.icon}
              </div>
              <div>
                <p className="!font-semibold !text-gray-800 text-sm mt-2"style={{...FONTS.paragraph}}>{card.title}</p>
              </div>
             <div className=" flex gap-2  mt-2">
                <div className="">
                <p className="text-lg font-bold text-gray-700">{card.value}</p>
                </div>
                <div className="">
                <p className=" text-md  font-semibold text-gray-600 mt-0.5  ">{card.percent}</p>
                </div>
             </div>
            </div>
            <div>
              <button className="text-sm !text-gray-500 hover:!text-black" style={{...FONTS.paragraph}}>View All</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardDashboard;
