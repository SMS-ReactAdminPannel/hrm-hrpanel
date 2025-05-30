import Dashboardcard from "../../components/DashBoard/DashBoardCard/DashBoardCard"

const Dashboard = () => {
  return (
    <div className="m-5 bg-[#faf3eb] h-full">
      <div>
        <strong className="text-[#006666] text-3xl">HRM</strong>
      </div>
      <div className="m-2">
        <Dashboardcard />
      </div>
    </div>
  )
}

export default Dashboard