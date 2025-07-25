import { Routes, Route, Navigate } from "react-router-dom";
import AssetsManagement from "../pages/Assets Management/AssetsManagement";
import Attendance from "../pages/AttendanceManagement/Attendance";
import Employee from "../pages/Employee Mangament/Employee";
import OrganizationChart from "../pages/Organization Charts/OrganizationChart";
import Payroll from "../pages/Payroll Management/Payroll";
import Recuritment from "../pages/Recuritment/Recuritment";
import TimeSheet from "../pages/TimeSheet/TimeSheet";
import Profile from "../pages/Profile/Profile";
import EmployeeShift from "../pages/Employee Mangament/EmployeeShift/EmployeeShift";
import Announcement from "../pages/Announcement/Announcement";
import LeaveTypes from "../pages/Leave Types/LeaveTypes";
import Deduction from "../pages/Deduction/Deduction";
import RecruitmentPipeline from "../pages/Recuritment/pipeline";
import Assetcategory from "../pages/Asset Category/Assetcategory";
import EmployeeDetails from "../pages/AttendanceManagement/EmployeeDetailsPage";
import HomePage from "../pages/HomePage/HomePage";
import { MainLayout } from "../Layout/MainLayout/mainLayout";
import Appraisal from "../pages/Employee Mangament/Appraisal/Appraisal";
import TrainingManage from "../pages/TrainingManagement/TrainingManage";
import OnboardingTemplate from "../pages/OnBoarding/OnBoarding";


import SignupPage from "../pages/auth/SignupPage";
import LoginPage from "../pages/auth/LoginPage";
import ForgotPassword from "../pages/auth/ForgetPassword";
import ResetPassword from "../pages/auth/ResetPassword";

import { useAuth } from "../pages/auth/AuthContext";
import GrievanceManagement from "../pages/GrievanceManagement/GrievanceManagement";
import Notification from "../pages/Notification/Notification";
// import VisitorManagementSystem from "../pages/Visitor Management/VisitorManagement";
// import CandidatesPage from "../pages/Recuritment/Candidates/Candidateslistpage";
import CandidateDetailPage from "../pages/Recuritment/Candidates/Candidatesdetailpage";
import Chat from "../pages/ChatAPP/Chat";
// import OpenRecruitments from "../pages/Recuritment/openRecruitments";
import JobDetailsPage from "../pages/Recuritment/jobDetailsPage";
import DepartmentList from "../pages/Department/DepartmentList";
import EmployeesPage from "../components/Department/Employees";
// import Candidateslistpage from "../pages/Recuritment/Candidates/Candidateslistpage";
// import RecruitmentDashboard from "../pages/Recuritment/Recuritment";
import CandidatesPage from "../pages/Recuritment/Candidates";
import OpenRecruitments from "../pages/Recuritment/openRecruitments";
import Dashboard from "../pages/Dashboard/Dashboard";
import VisitorManagement from "../pages/Visitor Management/VisitorManagement";
import AdvancedHRMOffboardings from "../components/OffBoarding/advanced-hrm-offboarding";

// import EmployeesPage from "../components/Department/Employees";


const AppRoutes = () => {
  const { isAuthenticated } = useAuth();
  

  return (
    
    <Routes>
      {isAuthenticated ? (
        <Route path="/" element={<MainLayout />}>
          {/* Redirect to dashboard on login */}
          <Route index element={<Navigate to="dashboard" />} />

          {/* Authenticated routes */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="attendance-id" element={<EmployeeDetails />} />
          <Route path="employee" element={<Employee />} />
          <Route path="leave-management" element={<LeaveTypes />} />
          <Route path="organization-chart" element={<OrganizationChart />} />
          <Route path="payroll" element={<Payroll />} />
          <Route path="recruitment" element={<Recuritment />} />
          <Route path="pipeline" element={<RecruitmentPipeline />} />
          <Route path="time-sheet" element={<TimeSheet />} />
          <Route path="training-management" element={<TrainingManage />} />
          <Route path="chat" element={<Chat />} />
          <Route path="profile" element={<Profile />} />
          <Route path="shift" element={<EmployeeShift />} />
          <Route path="announcement" element={<Announcement />} />
          <Route path="leave-types" element={<LeaveTypes />} />
          <Route path="deduction" element={<Deduction />} />
          <Route path="asset" element={<AssetsManagement />} />
          <Route path="asset-category" element={<Assetcategory />} />
          {/* <Route path="home-intro" element={<HomePage />} /> */}
          <Route path="appraisal" element={<Appraisal />} />
          <Route path="offboarding" element={<AdvancedHRMOffboardings />} />
          <Route path="onboarding" element={<OnboardingTemplate />} />
          <Route path="grievance-management" element={<GrievanceManagement />} />
          <Route path="notification" element={<Notification />} />
          {/* <Route path="visitor-management" element={<VisitorManagementSystem />} /> */}
          <Route path="recruitment/candidatelists/candidatesPage" element={<CandidateDetailPage />} />
          <Route path="recruitment/candidatelists" element={<CandidatesPage />} />
          <Route path="/recruitment/job-postings" element={<OpenRecruitments />} />
          <Route path="/recruitment/job-postings/job-details" element={<JobDetailsPage />} />
          <Route path="departments" element={<DepartmentList />} />
          <Route path="employees" element={<EmployeesPage />} />
          <Route path="visitor-management" element={<VisitorManagement />} />
          
        </Route>
      ) : (
        <Route path="/">
          <Route index element={<Navigate to="/login" />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password/:token" element={<ResetPassword />} />
        </Route>
      )}
    </Routes>
  );
};

export default AppRoutes;
