// import React from "react";

// Icons
import { IoArrowForward } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";

// Dummy values
const queries = [
     {
    title: "Schedule Interviews",
    desc: "Coordinate with candidates and panel to schedule technical interviews for frontend role.",
    profilePicUrl:
      "https://t3.ftcdn.net/jpg/08/86/78/68/360_F_886786813_XhL8zD8rhZCW7F5HvJdOPvquFh3n23vd.jpg",
  },
  {
    title: "Update Employee Records",
    desc: "Verify and update personal details of new employees in the HRMS portal.",
    profilePicUrl:
      "https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    title: "Organize Training Session",
    desc: "Plan a soft skills development workshop for the newly onboarded batch.",
    profilePicUrl:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    title: "Performance Review Alerts",
    desc: "Send reminders to department heads to complete Q2 performance evaluations.",
    profilePicUrl:
      "https://t3.ftcdn.net/jpg/08/86/78/68/360_F_886786813_XhL8zD8rhZCW7F5HvJdOPvquFh3n23vd.jpg",
  },
  {
    title: "Prepare Monthly Report",
    desc: "Compile leave, attendance, and recruitment data for May's HR review report.",
    profilePicUrl:
      "https://www.shutterstock.com/image-photo/happy-middle-aged-45-years-260nw-2516789519.jpg",
  },
  {
    title: "Schedule Interviews",
    desc: "Coordinate with candidates and panel to schedule technical interviews for frontend role.",
    profilePicUrl:
      "https://t3.ftcdn.net/jpg/08/86/78/68/360_F_886786813_XhL8zD8rhZCW7F5HvJdOPvquFh3n23vd.jpg",
  },
  {
    title: "Update Employee Records",
    desc: "Verify and update personal details of new employees in the HRMS portal.",
    profilePicUrl:
      "https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    title: "Organize Training Session",
    desc: "Plan a soft skills development workshop for the newly onboarded batch.",
    profilePicUrl:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    title: "Performance Review Alerts",
    desc: "Send reminders to department heads to complete Q2 performance evaluations.",
    profilePicUrl:
      "https://t3.ftcdn.net/jpg/08/86/78/68/360_F_886786813_XhL8zD8rhZCW7F5HvJdOPvquFh3n23vd.jpg",
  },
  {
    title: "Prepare Monthly Report",
    desc: "Compile leave, attendance, and recruitment data for May's HR review report.",
    profilePicUrl:
      "https://www.shutterstock.com/image-photo/happy-middle-aged-45-years-260nw-2516789519.jpg",
  },
];

const ThingsDoList = () => {
  const notificationCount = 5;

  return (
    <div className="gap-3 grid p-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold text-[#006666]">Things-To-Do</h1>
          {notificationCount > 0 && (
            <span className=" -top-1 -right-1 bg-gray-400 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
              {notificationCount}
            </span>
          )}
        </div>
        <button className="text-xl text-[#006666] p-1 hover:text-[#004d4d]">
          <IoArrowForward />
        </button>
      </div>

      {/* Scrollable List */}
      <div className="space-y-4 overflow-y-auto max-h-[400px] pr-1 scrollbar-hide">
        {queries.map((q, idx) => (
          <div
            key={idx}
            className="flex items-start gap-4 bg-white p-3 rounded-md shadow-sm border border-gray-100"
          >
            <img
              src={q.profilePicUrl}
              alt="Profile"
              className="h-12 w-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h3 className="font-medium text-[#004d4d]">{q.title}</h3>
                <BsThreeDots className="text-gray-400 hover:text-gray-600 cursor-pointer" />
              </div>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {q.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThingsDoList;
