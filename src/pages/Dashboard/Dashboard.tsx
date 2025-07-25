// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../pages/auth/AuthContext"; // Make sure the path is correct
import DashBoardSlideCard from "../../components/DashBoard/SlideCards/DashBoardSlideCard";
import Empolyeetotal from "../../components/DashBoard/EmpolyeeTotal/EmpolyeeTotal";
import AttentDashboard from "../../components/DashBoard/AttentDashboard/AttentDashboard";
import QuerystartDash from "../../components/DashBoard/Query/QuerystartDash";
// import Dashboardcard from "../../components/DashBoard/DashBoardCard/DashBoardCard";
// import { ChartCard } from "../../components/DashBoard/Attendance/DashBoardLineBar";
// import VisterBar from "../../components/DashBoard/VisiterBar/VisterBar";
// import ThingsDoList from "../../components/DashBoard/ThingsDoList/ThingsDoList";
// import DailySchedule from "../../components/DashBoard/TimeSchedule/TimeScheule";




const Dashboard = () => {
  return (
    <div className="m-3 grid gap-3">
      {/* content 1 */}
      <div className="flex flex-1  gap-3 h-64  ">
        <div className="flex-2 md:flex-3 sm:flex-3bg-gray-500 bg-clip-padding backdrop-filter  backdrop-blur bg-opacity-10 backdrop-saturate-100 backdrop-contrast-100 rounded-xl h-full">
          <DashBoardSlideCard />
        </div>
        <div className="flex-1 md:flex-1 bg-gray-500 bg-clip-padding backdrop-filter  backdrop-blur bg-opacity-10 backdrop-saturate-100 backdrop-contrast-100 rounded-xl sm:flex-1">
          <Empolyeetotal
            desc="just texting"
            title="Empolyee Total"
            value={34434}
            perColor="#006666 "
            borderColor="rgba(0, 102, 102,0.8)"
            dataPoints={[12, 41, 10, 51, 33, 5, 61, 10,98]}
          />
        </div>
      </div>

      {/* content -2 */}

      <div className="flex-1  flex-cols flex gap-3 rounded-xl">
        <div className="flex-1 border  bg-gray-500 bg-clip-padding backdrop-filter  backdrop-blur bg-opacity-10 backdrop-saturate-100 backdrop-contrast-100 rounded-xl ">
          <AttentDashboard/>
        </div>
        <div className="flex-1 border bg-gray-500 bg-clip-padding backdrop-filter  backdrop-blur bg-opacity-10 backdrop-saturate-100 backdrop-contrast-100 rounded-xl">
          <QuerystartDash/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

// <div className="m-2 ">

//       {/* 1st content */}
//       <div className="m-3">
//         <Dashboardcard />
//       </div>

//       {/* 2nd content */}
//       <div className="flex m-3 gap-3">
//         <div className="flex-2 border bg-white rounded-xl p-4">
//           <ChartCard
//             dataPoints={{
//               FinancialTeam: [10, 20, 25, 30, 15],
//               ProjectManager: [5, 15, 10, 20, 25],
//               MarketingTeam: [12, 18, 22, 17, 13],
//               ProductDesignTeam: [8, 16, 14, 18, 21],
//             }}
//           />
//         </div>
//         <div className="flex-1 bg-white border rounded-xl">
//           <VisterBar />
//         </div>
//       </div>

//       {/* 3rd content */}
//       <div className="flex gap-3 m-3">
//         <div className="flex-2  rounded-xl">
//           <DailySchedule />
//         </div>
//         <div className="flex-4 bg-white rounded-xl">
//           <ThingsDoList />
//         </div>
//       </div>
//     </div>
