"use client"

import { Routes, Route, Navigate } from "react-router-dom"
import { MainLayout } from "../Layout/MainLayout/mainLayout"
import Dashboard from "../pages/Dashboard/Dashboard"
import AssetsManagement from "../pages/Assets Management/AssetsManagement"
import Attendance from "../pages/AttendanceManagement/Attendance"
import Employee from "../pages/Employee Mangament/Employee"
import Leave from "../pages/Leave Management/Leave"
import OrganizationChart from "../pages/Organization Charts/OrganizationChart"
import Payroll from "../pages/Payroll Management/Payroll"
import Recuritment from "../pages/Recuritment/Recuritment"
import TimeSheet from "../pages/TimeSheet/TimeSheet"
import TrainingManage from "../pages/Training Management/TrainingManage"
import Profile from "../pages/Profile/Profile"
import EmployeeShift from "../pages/Employee Mangament/EmployeeShift/EmployeeShift"
import Announcement from "../pages/Announcement/Announcement"
import LeaveTypes from "../pages/Leave Management/LeaveTypes"
import Deduction from "../pages/Deduction/Deduction"
import RecruitmentPipeline from "../pages/Recuritment/pipeline"
import CandidatesPage from "../pages/Recuritment/Candidates"
import Assetcategory from "../pages/Asset Category/Assetcategory"
import EmployeeDetails from "../pages/AttendanceManagement/EmployeeDetailsPage"

import SignupPage from "../pages/auth/SignupPage"
import { LoginPage } from "../pages/auth/LoginPage"
import ForgotPassword from "../pages/auth/ForgetPassword"
import ResetPassword from "../pages/auth/ResetPassword"

import { useAuth } from "../pages/auth/AuthContext"
import CandidateDetailPage from "../pages/Recuritment/Candidates/Candidatesdetailpage"
import CandidatePipelinePage from "../pages/Recuritment/Candidates/Candidatespipelinepage"
import CandidatesList from "../pages/Recuritment/Candidates/Candidateslistpage"

const AppRoutes = () => {
  const { isAuthenticated } = useAuth()

  return (
    <Routes>
      {/* Public Routes */}
      {!isAuthenticated && (
        <>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          
          <Route path="*" element={<Navigate to="/login" replace />} />
        </>
      )}

      {/* Protected Routes */}
      {isAuthenticated && (
        <>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="assets-management" element={<AssetsManagement />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="attendance-id" element={<EmployeeDetails />} />
            <Route path="employee" element={<Employee />} />
            <Route path="leave-management" element={<Leave />} />
            <Route path="organization-chart" element={<OrganizationChart />} />
            <Route path="payroll" element={<Payroll />} />
            <Route path="recruitment" element={<Recuritment />} />
            <Route path="candidates" element={<CandidatesPage />} />
            <Route path="pipeline" element={<RecruitmentPipeline />} />
            <Route path="time-sheet" element={<TimeSheet />} />
            <Route path="training-management" element={<TrainingManage />} />
            <Route path="profile" element={<Profile />} />
            <Route path="shift" element={<EmployeeShift />} />
            <Route path="announcement" element={<Announcement />} />
            <Route path="leave-types" element={<LeaveTypes />} />
            <Route path="deduction" element={<Deduction />} />
            <Route path="employee-shift" element={<EmployeeShift />} />
            <Route path="rotating-shift" element={<EmployeeShift />} />
            <Route path="asset-category" element={<Assetcategory />} />
            <Route path="candidates" element={<CandidatesList />} />
        <Route path="candidates" element={<CandidateDetailPage />} />
        <Route path="pipeline" element={<CandidatePipelinePage />} />
          </Route>

          {/* Default fallback for protected users */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </>
      )}
    </Routes>
  )
}

export default AppRoutes