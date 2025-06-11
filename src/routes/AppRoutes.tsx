import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard";
import AssetsManagement from "../pages/Assets Management/AssetsManagement";
import Attendance from "../pages/AttendanceManagement/Attendance";
import Employee from "../pages/Employee Mangament/Employee";
import Leave from "../pages/Leave Management/Leave";
import OrganizationChart from "../pages/Organization Charts/OrganizationChart";
import Payroll from "../pages/Payroll Management/Payroll";
import Recuritment from "../pages/Recuritment/Recuritment";
import TimeSheet from "../pages/TimeSheet/TimeSheet";
import Profile from "../pages/Profile/Profile";
import EmployeeShift from "../pages/Employee Mangament/EmployeeShift/EmployeeShift";
import Announcement from "../pages/Announcement/Announcement";
import LeaveTypes from "../pages/Leave Management/LeaveTypes";
import Deduction from "../pages/Deduction/Deduction";
import RecruitmentPipeline from "../pages/Recuritment/pipeline";
import Assetcategory from "../pages/Asset Category/Assetcategory";
import EmployeeDetails from "../pages/AttendanceManagement/EmployeeDetailsPage";
import HomePage from "../pages/HomePage/HomePage";
import { MainLayout } from "../Layout/MainLayout/mainLayout";
import Appraisal from "../pages/Employee Mangament/Appraisal/Appraisal";
import Reports from "../pages/Employee Mangament/Reports/Reports";
import TrainingManage from "../pages/TrainingManagement/TrainingManage";
import OnboardingTemplate from "../pages/OffBoarding/OnBoarding";
import AdvancedHRMOffboarding from "../pages/OffBoarding/OffBoarding";

import SignupPage from "../pages/auth/SignupPage";
import { LoginPage } from "../pages/auth/LoginPage";
import ForgotPassword from "../pages/auth/ForgetPassword";
import ResetPassword from "../pages/auth/ResetPassword";

import { useAuth } from "../pages/auth/AuthContext";
import GrievanceManagement from "../pages/GrievanceManagement/GrievanceManagement";
import Notification from "../pages/Notification/Notification";
import VisitorManagementSystem from "../pages/Visitor Management/VisitorManagement";
import CandidatesPage from "../pages/Recuritment/Candidates";
import CandidateDetailPage from "../pages/Recuritment/Candidates/Candidatesdetailpage";
import OpenRecruitments from "../pages/Recuritment/openRecruitments";
// import JobDetails from "../pages/Recuritment/JobDetails";
// import JobDetailsModal from "../pages/Recuritment/JobDetails";
import JobDetailsPage from "../pages/Recuritment/jobDetailsPage";
import DepartmentList from "../pages/Department/DepartmentList";


const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {isAuthenticated ? (
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="attendance-id" element={<EmployeeDetails />} />
          <Route path="employee" element={<Employee />} />
          <Route path="leave-management" element={<Leave />} />
          <Route path="organization-chart" element={<OrganizationChart />} />
          <Route path="payroll" element={<Payroll />} />
          <Route path="recruitment" element={<Recuritment />} />
          {/* <Route path="candidates" element={<CandidatesList />} /> */}
          <Route path="pipeline" element={<RecruitmentPipeline />} />
          <Route path="time-sheet" element={<TimeSheet />} />
          <Route path="training-management" element={<TrainingManage />} />
          <Route path="profile" element={<Profile />} />
          <Route path="shift" element={<EmployeeShift />} />
          <Route path="announcement" element={<Announcement />} />
          <Route path="leave-types" element={<LeaveTypes />} />
          <Route path="deduction" element={<Deduction />} />
          <Route path="asset" element={<AssetsManagement />} />
          <Route path="asset-category" element={<Assetcategory />} />
          <Route path="home-intro" element={<HomePage />} />
          <Route path="appraisal" element={<Appraisal />} />
          <Route path="reports" element={<Reports />} />
          <Route path="offboarding" element={<AdvancedHRMOffboarding />} />
          <Route path="onboarding" element={<OnboardingTemplate />} />
          <Route path="profile" element={<Profile />} /> 
          <Route path="grievance" element={<GrievanceManagement/>}/>
          <Route path="notification" element={<Notification/>}/>
          <Route path="visitormanagement" element={<VisitorManagementSystem />}/>
          <Route path="/" element={<CandidatesPage />} />
          <Route path="candidates" element={<CandidateDetailPage />} />
      <Route path="/recruitment/jobs" element={<OpenRecruitments />} />
      <Route path="/job/:id" element={<JobDetailsPage />} />
      <Route path="/departments" element={<DepartmentList />} />
        </Route>
      ) : (
        <>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          {/* <Route path="*" element={<Navigate to="/login" />} /> */}
        </>
      )}
          
    </Routes>
  );
};

export default AppRoutes;
