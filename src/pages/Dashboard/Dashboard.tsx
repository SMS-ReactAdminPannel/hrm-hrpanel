import Dashboardcard from "../../components/DashBoard/DashBoardCard/DashBoardCard";
import { ChartCard } from "../../components/DashBoard/Attendance/DashBoardLineBar";
import VisterBar from "../../components/DashBoard/VisiterBar/VisterBar";
import ThingsDoList from "../../components/DashBoard/ThingsDoList/ThingsDoList";

import DailySchedule from "../../components/DashBoard/TimeSchedule/TimeScheule";

const Dashboard = () => {
  return (
    <div className="m-2 bg-[#faf3eb]  ">
      <div>
        {/* 1st content */}
        <div className="m-3">
          <Dashboardcard />
        </div>
      </div>
      {/* 2nd content */}
      <div className="flex m-3 gap-3 ">
        <div className="flex-2 border bg-white rounded-xl p-4 ">
          <ChartCard
            dataPoints={{
              FinancialTeam: [10, 20, 25, 30, 15],
              ProjectManager: [5, 15, 10, 20, 25],
              MarketingTeam: [12, 18, 22, 17, 13],
              ProductDesignTeam: [8, 16, 14, 18, 21],
            }}
          />
        </div>
        <div className="flex-1 bg-white border rounded-xl  ">
          <VisterBar />
        </div>
      </div>
      {/* 3rd content */}
      <div className="flex  gap-3 m-3 ">
        <div className="flex-2 bg-white rounded-xl">
            <DailySchedule/>
        </div>
        <div className="flex-4 bg-white rounded-xl">
          <ThingsDoList/>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
