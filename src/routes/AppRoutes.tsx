import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import SignupPage from "../pages/auth/SignupPage";
import { useAuth } from "../pages/auth/AuthContext";
import { MainLayout } from "../Layout/MainLayout/mainLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import AssetsManagement from "../pages/Assets Management/AssetsManagement";
import Attendance from "../pages/AttendanceManagement/Attendance";
import Employee from "../pages/Employee Mangament/Employee";
import Leave from "../pages/Leave Management/Leave";
import OrganizationChart from "../pages/Organization Charts/OrganizationChart";
import Payroll from "../pages/Payroll Management/Payroll";
import Recuritment from "../pages/Recuritment/Recuritment";
import TimeSheet from "../pages/TimeSheet/TimeSheet";
import TrainingManage from "../pages/Training Management/TrainingManage";

const AppRoutes = () => {
  const  isAuthenticated  = true

//   const AuthRoutes = () => (
//     <Routes>
//       <Route path="/login" element={<LoginPage />} />
//       <Route path="/signup" element={<SignupPage />} />
//       <Route path="*" element={<Navigate to="/login" />} />
//     </Routes>
//   );

  const AdminRoutes = () => (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        
        <Route index element={<Dashboard />} />
         <Route path="assets-management" element={<AssetsManagement />} /> 
         <Route path="attendance" element={<Attendance />} /> 
         <Route path="employee" element={<Employee />} /> 
         <Route path="Leave-management" element={<Leave />} /> 
         <Route path="organization-chart" element={<OrganizationChart />} /> 
         <Route path="payroll" element={<Payroll />} /> 
         <Route path="recuritment" element={<Recuritment />} /> 
         <Route path="time-sheet" element={<TimeSheet />} /> 
         <Route path="training-management" element={<TrainingManage />} /> 
        
      </Route>
    </Routes>
  );
  return <AdminRoutes />

//   return isAuthenticated ? <AdminRoutes /> : <AuthRoutes />;
};

export default AppRoutes;
