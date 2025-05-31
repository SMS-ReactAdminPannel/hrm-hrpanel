
//icon
import { MdSupervisorAccount } from "react-icons/md";
import { FaSuitcase } from "react-icons/fa";
import { MdPersonAddAlt1 } from "react-icons/md";
import { MdPersonRemove } from "react-icons/md";
import DashBoardCardBar from "../DashBoardCardBar/DashBoardCardBar";

const Dashboardcard = () => {
  return (
    <div className="flex flec-cols justify-between  bg-white rounded-xl  flex-1 p-2 text-[#006666]   md:flex-cols md:flex ">
      <div className="grid grid-cols-2 flex-2.5  md:grid-cols-1 md:grid md:flex-0.5 ">
        <div className=" border-r-2 border-b-2  p-5    ">
          <div className="p-3 ">
            <div className="mb-3">
              <MdSupervisorAccount className="w-10 h-10 rounded-xl bg-gray-500 text-white p-1.5" />
            </div>
            <div className="gap-3 flex ">
              <strong className="text-3xl">1,450</strong>
              <strong className="text-sky-400">5.15%</strong>
            </div>
            <div>
                <p>Total Empoloyees</p>
            </div>
          </div>
        </div>


        <div className="  border-b-2 p-5  ">
          <div className="p-3 ">
            <div className="mb-3">
              <FaSuitcase  className="w-10 h-10 rounded-xl  bg-gray-500 text-white p-2" />
            </div>
            <div className="gap-3 flex">
              <strong className="text-3xl">950</strong>
              <strong className="text-sky-400">2.05%</strong>
            </div>
            <div>
                <p>Job Applicants</p>
            </div>
          </div>
        </div>


        <div className="  p-5 border-r-2  ">
          <div className=" p-3">
            <div className="mb-3">
              <MdPersonAddAlt1 className="w-10 h-10 rounded-xl  bg-gray-500 text-white p-1.5" />
            </div>
            <div className="gap-3 flex">
              <strong className="text-3xl">856</strong>
              <strong className="text-red-400">5.15%</strong>
            </div>
            <div>
                <p>New Empoloyees</p>
            </div>
          </div>
        </div>


        <div className="  p-5  ">
          <div className="p-3">
            <div className="mb-3">
              <MdPersonRemove  className="w-10 h-10 rounded-xl  bg-gray-500 text-white p-1.5" />
            </div>
            <div className="gap-3 flex">
              <strong className="text-3xl">450</strong>
              <strong className="text-red-400">2.25%</strong>
            </div>
            <div className="">
                <p className="text-lg">Resign Empoloyees</p>
            </div>
          </div>
        </div>
      </div>
      <div className=" flex-4">
        <DashBoardCardBar/>
      </div>
    </div>
  );
};

export default Dashboardcard;