// import React from "react";
import StackBar from "./Charts/StackBar";
import { CardForProcessBar } from "./Charts/CardsForProcessBar";



//icon

import { RxCross2 } from "react-icons/rx";
import { FaCheck } from "react-icons/fa6";
import { FaExclamation } from "react-icons/fa";

const AttentDashboard = () => {
  return (
    <div className="flex bg-[#eff4f5]">
      {/* Main content */}
      <div className="flex-1 ">
        {/* Top Content */}
        <div className="flex justify-between  p-4">
          <div className="flex-1 flex flex-col">
            <div className="mb-14">
              <h1 className="text-xl text-black font-semibold">Attendance</h1>
              <p className=" text-sm ">
                Weekly Attendance Overview
              </p>
            </div>
            <div>
              <p className="text-md text-black">Total Employees</p>
              <p className="text-lg font-semibold">234k</p>
            </div>
          </div>
          <div className="flex-1">
            <StackBar />
          </div>
        </div>

        {/* Bottom Card */}
        <div className="flex justify-around p-4">
          <CardForProcessBar
            icon={<RxCross2 />}
            title="Absent"
            value={2}
            per={20}
            perColor="#800123"
            borderColor="rgba(145, 3, 41,0.8)"
            backgroundColor="#800123"
          />
          <CardForProcessBar
            icon={<FaCheck />}
            title="Present"
            value={200}
            per={70}
            perColor="#207a01"
            borderColor="rgba(32, 122, 1,0.8)"
            backgroundColor="#207a01"
          />
          <CardForProcessBar
            icon={<FaExclamation />}
            title="Premission"
            value={15}
            per={10}
            perColor="#facc15"
            borderColor="rgba(234,179,8,0.8)"
            backgroundColor="#facc15"
          />
        </div>
      </div>
    </div>
  );
};

export default AttentDashboard;
