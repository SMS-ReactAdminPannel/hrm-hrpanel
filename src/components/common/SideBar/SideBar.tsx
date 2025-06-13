import type React from "react"
import { useState, type JSX } from "react"
import { Link, useLocation } from "react-router-dom"
import {
  FiHome, FiUsers, FiChevronDown, FiChevronRight,
  FiUserCheck, FiPower, FiMenu
} from "react-icons/fi"
import { AiOutlineIssuesClose } from "react-icons/ai"
import {
  RiMenu2Line,
  RiMenu3Line,
  RiUserSearchLine,
  RiMoneyDollarCircleLine,
  RiTimeLine,
  RiArchiveDrawerLine,
  RiBriefcaseLine,
  RiUserFollowLine,
} from "react-icons/ri";
import { MdBusiness, MdEventAvailable, MdOutlineVisibility } from "react-icons/md";
import { GrAnnounce } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { MdMoneyOffCsred } from "react-icons/md";
import { GiLaptop } from "react-icons/gi";
import { FaUserTimes } from "react-icons/fa";
import { MdOutlineSick } from "react-icons/md";
import { TbReportSearch } from "react-icons/tb";
import { MdOutlineDashboardCustomize } from "react-icons/md";



const SIDEBAR_WIDTH_OPEN = "18rem"
const SIDEBAR_WIDTH_CLOSED = "5rem"

const SideBar = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}) => {
  const [hovered, setHovered] = useState(false)
  const actualOpen = isOpen || hovered

  const handleLinkClick = () => {
    if (!isOpen) setHovered(false)
  }

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    localStorage.removeItem("userEmail")
  }

  return (
    <div
      className="fixed top-0 left-0 h-screen z-40 flex flex-col transition-all duration-300"
      onMouseEnter={() => !isOpen && setHovered(true)}
      onMouseLeave={() => !isOpen && setHovered(false)}
      style={{
        width: actualOpen ? SIDEBAR_WIDTH_OPEN : SIDEBAR_WIDTH_CLOSED,
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(30px)",
      }}
    >
      {/* Header */}
      <div className="flex flex-col scrollbar-hide h-16  ">
        <div className="flex items-center justify-between p-4 h-16">
          <button
            onClick={handleToggle}
            className="p-2 rounded-md transition duration-200 hover:bg-white/10"
            title="Toggle Sidebar"
          >
            <FiMenu size={20} color="white" />
          </button>
          {actualOpen && <div className="text-white text-xl font-semibold">HRM</div>}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-scroll scrollbar-hide px-4 pb-4">
        <nav className="flex flex-col gap-2">
          {/* Dashboard Group */}
          <div className="bg-white/6 backdrop-blur-sm rounded-2xl p-3 mb-2">
            <SidebarDropdown icon={<MdOutlineDashboardCustomize />} label="Dashboard" isOpen={actualOpen}>
              <SidebarLink to="/" icon={<FiHome />} label="Dashboard" isOpen={actualOpen} onClick={handleLinkClick} />
              <SidebarLink to="/home-intro" icon={<FiHome />} label="Home Intro" isOpen={actualOpen} onClick={handleLinkClick} />
            </SidebarDropdown>
          </div>

          {/* Employee Group */}
          <div className="bg-white/6 backdrop-blur-sm rounded-2xl p-3 mb-2">
              <SidebarDropdown icon={<FiUsers />} label="Employee" isOpen={actualOpen}>
              <SidebarLink to="/employee" icon={<FiUsers />} label="Employee" isOpen={actualOpen} onClick={handleLinkClick} />
              <SidebarLink to="/shift" icon={<RiTimeLine />} label="Shifts" isOpen={actualOpen} onClick={handleLinkClick} />
              <SidebarLink to="/appraisal" icon={<FiUserCheck />} label="Appraisal" isOpen={actualOpen} onClick={handleLinkClick} />
              
              </SidebarDropdown>
          </div>
          <SidebarLink to="/departments" icon={<MdBusiness />} label="Departments" isOpen={actualOpen}onClick={handleLinkClick} />
          <SidebarLink to="/payroll" icon={<RiMoneyDollarCircleLine />} label="Payroll" isOpen={actualOpen} onClick={handleLinkClick} />
          <SidebarLink to="/time-sheet" icon={<RiTimeLine />} label="Time Sheet" isOpen={actualOpen} onClick={handleLinkClick} />
          <SidebarLink to="/attendance" icon={<CgProfile />} label="Attendance" isOpen={actualOpen} onClick={handleLinkClick} />

          {/* Recruitment Group */}
          <div className="bg-white/6 backdrop-blur-sm rounded-2xl p-3 mb-2">
            <SidebarDropdown icon={<RiUserSearchLine />} label="Recruitment" isOpen={actualOpen}>
              <SidebarLink to="/recruitment" icon={<RiBriefcaseLine />} label="Recruitment" isOpen={actualOpen} onClick={handleLinkClick} />
              <SidebarLink to="/candidates" icon={<RiUserFollowLine />} label="Candidates" isOpen={actualOpen} onClick={handleLinkClick} />
              <SidebarLink to="/pipeline" icon={<RiUserSearchLine />} label="Pipeline" isOpen={actualOpen} onClick={handleLinkClick} />
              <SidebarLink to="/recruitment/jobs" icon={<RiBriefcaseLine />} label="Job Postings" isOpen={actualOpen} onClick={handleLinkClick} />
            </SidebarDropdown>
          </div>

          <SidebarLink to="/leave-management" icon={<MdEventAvailable />} label="Leave Management" isOpen={actualOpen} onClick={handleLinkClick} />
          <SidebarLink to="/leave-types" icon={<MdOutlineSick />} label="Leave Types" isOpen={actualOpen} onClick={handleLinkClick} />
          <SidebarLink to="/asset" icon={<GiLaptop />} label="Assets" isOpen={actualOpen} onClick={handleLinkClick} />
          <SidebarLink to="/asset-category" icon={<RiArchiveDrawerLine />} label="Asset Category" isOpen={actualOpen} onClick={handleLinkClick} />
          <SidebarLink to="/organization-chart" icon={<MdBusiness />} label="Organization" isOpen={actualOpen} onClick={handleLinkClick} />
          <SidebarLink to="/deduction" icon={<MdMoneyOffCsred />} label="Deduction" isOpen={actualOpen} onClick={handleLinkClick} />
          <SidebarLink to="/announcement" icon={<GrAnnounce />} label="Announcement" isOpen={actualOpen} onClick={handleLinkClick} />
          <SidebarLink to="/grievance-management" icon={<AiOutlineIssuesClose />} label="Grievance" isOpen={actualOpen} onClick={handleLinkClick} />
          <SidebarLink to="/training-management" icon={<AiOutlineIssuesClose />} label="Training" isOpen={actualOpen} onClick={handleLinkClick} />
           <SidebarLink to="/candidatelists" icon={<AiOutlineIssuesClose />} label="CandidateLists" isOpen={actualOpen} onClick={handleLinkClick} />
            <SidebarLink to="/chat" icon={<AiOutlineIssuesClose />} label="Chat" isOpen={actualOpen} onClick={handleLinkClick} />
          <SidebarLink to="/chat" icon={<AiOutlineIssuesClose />} label="Chat" isOpen={actualOpen} onClick={handleLinkClick} />
          <SidebarLink to="/attendance" icon={<MdEventAvailable />} label="Attendance" isOpen={actualOpen} onClick={handleLinkClick} />
          <SidebarLink to="/deduction" icon={<MdEventAvailable />} label="Deduction" isOpen={actualOpen} onClick={handleLinkClick} />
          <SidebarLink to="/announcement" icon={<MdEventAvailable />} label="Announcement" isOpen={actualOpen} onClick={handleLinkClick} />
          <SidebarLink to="/grievance-management" icon={<AiOutlineIssuesClose />} label="Grievance Management" isOpen={actualOpen} onClick={handleLinkClick} />
          <SidebarLink to="/visitor-management" icon={<MdOutlineVisibility />} label="Visitor Management" isOpen={actualOpen} onClick={handleLinkClick} />
          <SidebarLink to="/onboarding" icon={<AiOutlineIssuesClose />} label="OnBoarding" isOpen={actualOpen} onClick={handleLinkClick} />
          <SidebarLink to="/offboarding" icon={<AiOutlineIssuesClose />} label="OffBoarding" isOpen={actualOpen} onClick={handleLinkClick} />



          {/* Logout */}
          {/* <div
            onClick={handleLogout}
            className={`flex items-center transition-all px-2 py-1 cursor-pointer ${actualOpen ? "w-full justify-start gap-5 pl-5 pr-1" : "justify-center w-10 h-8"
              } rounded-full hover:bg-white/20`}
          >
            <div className="text-xl" style={{ color: COLOR.white }}>
              <FiPower />
            </div>
            {actualOpen && <span style={{ color: COLOR.white }}>Logout</span>}
          </div> */}
        </nav>
      </div>
    </div>
  )
}

export default SideBar

// SidebarLink Component
const SidebarLink = ({
  to,
  icon,
  label,
  isOpen,
  onClick,
}: {
  to: string
  icon: JSX.Element
  label: string
  isOpen: boolean
  onClick: () => void
}) => {
  const location = useLocation()
  const [isHovered, setIsHovered] = useState(false)
  const isActive = location.pathname === to

  return (
    <Link
      to={to}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`flex items-center transition-all py-2 rounded-xl mb-1 ${
        isActive ? "bg-white/30 backdrop-blur-sm" : isHovered ? "bg-white/20" : "hover:bg-white/10"
      } ${isOpen ? "justify-start gap-3 px-3" : "justify-center px-0"}`}
    >
      <div className="text-lg text-white flex-shrink-0">{icon}</div>
      {isOpen && <span className="text-white font-medium text-sm">{label}</span>}
    </Link>
  )
}

// SidebarDropdown Component
const SidebarDropdown = ({
  icon,
  label,
  children,
  isOpen,
}: {
  icon: JSX.Element
  label: string
  children: React.ReactNode
  isOpen: boolean
}) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="w-full">
      <button
        onClick={() => setExpanded(!expanded)}
        className={`flex items-center w-full transition-all py-2 rounded-xl hover:bg-white/20 mb-1 ${
          isOpen ? "justify-start gap-3 px-3" : "justify-center px-0"
        }`}
      >
        <div className="text-lg text-white flex-shrink-0">{icon}</div>
        {isOpen && (
          <>
            <span className="text-white font-medium text-sm flex-1 text-left">{label}</span>
            <span className="text-white text-sm">{expanded ? <FiChevronDown /> : <FiChevronRight />}</span>
          </>
        )}
      </button>
      {expanded && isOpen && <div className="ml-6 flex flex-col">{children}</div>}
    </div>
  )
}