import Dashboardcard from "../../components/DashBoard/DashBoardCard/DashBoardCard";
import { ChartCard } from "../../components/DashBoard/Attendance/DashBoardLineBar";
import VisterBar from "../../components/DashBoard/VisiterBar/VisterBar";

const Dashboard = () => {
  return (
    <div className="m-5 bg-[#faf3eb]  ">
      <div>
        {/* 1st content */}
        <div>
          <strong className="text-[#006666] text-3xl">HRM</strong>
        </div>
        <div className="m-2">
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
    </div>
  );
};

export default Dashboard;
