import type React from "react"
import { useState, type JSX } from "react"
import { Link, useLocation } from "react-router-dom"
import {
  FiHome, FiUsers, FiChevronDown, FiChevronRight,
  FiUserCheck, FiMenu
} from "react-icons/fi"
import { AiOutlineIssuesClose } from "react-icons/ai"
import {
  // RiMenu2Line,
  // RiMenu3Line,
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
// import { FaUserTimes } from "react-icons/fa";
import { MdOutlineSick } from "react-icons/md";
// import { TbReportSearch } from "react-icons/tb";
// import { MdOutlineDashboardCustomize } from "react-icons/md";
import { FONTS } from "../../../constants/uiConstants"

//icons
import { CgCalendarDates } from "react-icons/cg";
import { IoCalendarNumberOutline, IoChatbox } from "react-icons/io5";
// import { FaListAlt } from "react-icons/fa";
import { GoOrganization } from "react-icons/go";
import { LuPackagePlus } from "react-icons/lu";
import { MdHotelClass } from "react-icons/md";
import { HiMiniCalendarDays } from "react-icons/hi2";
//<MdHotelClass /> training



const SIDEBAR_WIDTH_OPEN = "15rem"
const SIDEBAR_WIDTH_CLOSED = "4rem"

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

  
  

  return (
    <div
      className="fixed top-0 left-0 h-screen z-40 flex flex-col transition-all duration-300"
      onMouseEnter={() => !isOpen && setHovered(true)}
      onMouseLeave={() => !isOpen && setHovered(false)}
      style={{
        width: actualOpen ? SIDEBAR_WIDTH_OPEN : SIDEBAR_WIDTH_CLOSED,
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(30px)",
        ...FONTS.cardheader
      }}
    >
      {/* Header */}
      <div className="flex flex-col scrollbar-hide h-14 ">
        <div className="flex items-center justify-between p-4 h-16">
          <button
            onClick={handleToggle}
            className="p-2 rounded-md transition duration-200 hover:bg-white/10"
            title="Toggle Sidebar"
          >
            <FiMenu size={20} className="text-gray-200" />
          </button>
         
        </div>
      </div>
      {/* Navigation */}
      <div className="flex-1 overflow-y-scroll scrollbar-hide px-2 mt-3 pb-4">
        <nav className="flex flex-col">
      
          {/* Dashboard Group */}
          <div className="active-backdrop-blur-sm rounded-2xl ">
              <SidebarLink to="/" icon={<FiHome />} label="Dashboard" isOpen={actualOpen} onClick={handleLinkClick} />
          </div>

          {/* Employee Group */}
          <div className={`mb-2" : ""}`}>
              <SidebarDropdown icon={<FiUsers />} label="Employee" isOpen={actualOpen}>
                <div className={`mb-2 relative -left-[12%] w-[112%] 
                  ${actualOpen ? "bg-white/10 backdrop-blur-md rounded-2xl shadow-sm absolute transition-all " : " "}`}>
                
                  <SidebarLink to="/employee" icon={<FiUsers />} label="Employee" isOpen={actualOpen} onClick={handleLinkClick} />
                  <SidebarLink to="/shift" icon={<RiTimeLine />} label="Shifts" isOpen={actualOpen} onClick={handleLinkClick} />
                  <SidebarLink to="/appraisal" icon={<FiUserCheck />} label="Appraisal" isOpen={actualOpen} onClick={handleLinkClick} />
                </div>
                </SidebarDropdown>
            </div>

          {/* Recruitment Group */}
          <div className={`mb-2" : ""}`}>
                <SidebarDropdown icon={<RiBriefcaseLine />} label="Recruitment" isOpen={actualOpen}>
                <div className={`mb-2 relative -left-[12%] w-[112%]  ${actualOpen ? "bg-white/10 backdrop-blur-md rounded-2xl shadow-sm relative transition-all " : ""}`}>
                  <SidebarLink to="/recruitment" icon={<RiBriefcaseLine />} label="Recruitment" isOpen={actualOpen} onClick={handleLinkClick} />
                  <SidebarLink to="/recruitment/candidatelists" icon={<RiUserFollowLine />} label="Candidates" isOpen={actualOpen} onClick={handleLinkClick} />
                  <SidebarLink to="/recruitment/job-postings" icon={<RiBriefcaseLine />} label="Job Postings" isOpen={actualOpen} onClick={handleLinkClick} />
                </div>
                </SidebarDropdown>
              </div>
          
          <div className={`mb-2" : ""}`}>
            <SidebarDropdown icon={<RiUserSearchLine />} label="Boarding" isOpen={actualOpen}>
            <div className={`mb-2 relative -left-[12%] w-[112%]  ${actualOpen ? "bg-white/10 backdrop-blur-md rounded-2xl shadow-sm relative transition-all " : ""}`}>
                 
            <SidebarLink to="/onboarding" icon={<AiOutlineIssuesClose />} label="OnBoarding" isOpen={actualOpen} onClick={handleLinkClick} />
              <SidebarLink to="/offboarding" icon={<AiOutlineIssuesClose />} label="OffBoarding" isOpen={actualOpen} onClick={handleLinkClick} />
            </div>
             
            </SidebarDropdown>
          </div>

          <div className={`mb-2" : ""}`}>
            <SidebarDropdown icon={<CgCalendarDates />} label="Attendance" isOpen={actualOpen}>
            <div className={`mb-2 relative -left-[12%] w-[112%]  ${actualOpen ? "bg-white/10 backdrop-blur-md rounded-2xl shadow-sm relative transition-all " : ""}`}>
                 
              <SidebarLink to="/time-sheet" icon={<RiTimeLine />} label="Time Sheet" isOpen={actualOpen} onClick={handleLinkClick} />
              <SidebarLink to="/attendance" icon={<CgProfile />} label="Attendance" isOpen={actualOpen} onClick={handleLinkClick} />
              <SidebarLink to="/Attendancerequest" icon={<HiMiniCalendarDays />} label="Attendance Request" isOpen={actualOpen} onClick={handleLinkClick} />
            </div>
            </SidebarDropdown>
          </div>

          <div className={`mb-2" : ""}`}>
            <SidebarDropdown icon={<LuPackagePlus />} label="Assets" isOpen={actualOpen}>
            <div className={`mb-2 relative -left-[12%] w-[112%]  ${actualOpen ? "bg-white/10 backdrop-blur-md rounded-2xl shadow-sm relative transition-all " : ""}`}>
                 
              <SidebarLink to="/asset" icon={<GiLaptop />} label="Assets" isOpen={actualOpen} onClick={handleLinkClick} />
              <SidebarLink to="/asset-category" icon={<RiArchiveDrawerLine />} label="Asset Category" isOpen={actualOpen} onClick={handleLinkClick} />
            </div>
            </SidebarDropdown>
          </div>

          <div className={`mb-2" : ""}`}>
            <SidebarDropdown icon={<RiUserSearchLine />} label="Leave " isOpen={actualOpen}>
            <div className={`mb-2 relative -left-[12%] w-[112%]  ${actualOpen ? "bg-white/10 backdrop-blur-md rounded-2xl shadow-sm relative transition-all " : ""}`}>
                 
              <SidebarLink to="/leave-management" icon={<MdEventAvailable />} label="Leave Management" isOpen={actualOpen} onClick={handleLinkClick} />
              <SidebarLink to="/leave-types" icon={<MdOutlineSick />} label="Leave Types" isOpen={actualOpen} onClick={handleLinkClick} />
            </div>
            </SidebarDropdown>
          </div>

          <SidebarLink to="/departments" icon={<MdBusiness />} label="Departments" isOpen={actualOpen} onClick={handleLinkClick} />
          <SidebarLink to="/payroll" icon={<RiMoneyDollarCircleLine />} label="Payroll" isOpen={actualOpen} onClick={handleLinkClick} />
          <SidebarLink to="/organization-chart" icon={<GoOrganization />} label="Organization" isOpen={actualOpen} onClick={handleLinkClick} />
          <SidebarLink to="/deduction" icon={<MdMoneyOffCsred />} label="Deduction" isOpen={actualOpen} onClick={handleLinkClick} />
          <SidebarLink to="/announcement" icon={<GrAnnounce />} label="Announcement" isOpen={actualOpen} onClick={handleLinkClick} />
          <SidebarLink to="/grievance-management" icon={<AiOutlineIssuesClose />} label="Grievance" isOpen={actualOpen} onClick={handleLinkClick} />
          <SidebarLink to="/training-management" icon={<MdHotelClass />} label="Training" isOpen={actualOpen} onClick={handleLinkClick} />
          <SidebarLink to="/visitor-management" icon={<MdOutlineVisibility />} label="Visitor Management" isOpen={actualOpen} onClick={handleLinkClick} />
          <SidebarLink to="/calendar" icon={<IoCalendarNumberOutline />} label="Calendar" isOpen={actualOpen} onClick={handleLinkClick} />
          <SidebarLink to="/chat" icon={<IoChatbox />} label="Chat" isOpen={actualOpen} onClick={handleLinkClick} />


          
          {/* <SidebarLink to="/attendance" icon={<MdEventAvailable />} label="Attendance" isOpen={actualOpen} onClick={handleLinkClick} /> */}
          {/* <SidebarLink to="/deduction" icon={<MdEventAvailable />} label="Deduction" isOpen={actualOpen} onClick={handleLinkClick} /> */}
          {/* <SidebarLink to="/announcement" icon={<MdEventAvailable />} label="Announcement" isOpen={actualOpen} onClick={handleLinkClick} /> */}
          {/* <SidebarLink to="/grievance-management" icon={<AiOutlineIssuesClose />} label="Grievance Management" isOpen={actualOpen} onClick={handleLinkClick} /> */}
          {/* <SidebarLink to="/candidatelists" icon={<FaListAlt />} label="CandidateLists" isOpen={actualOpen} onClick={handleLinkClick} /> */}
          {/* <SidebarLink to="/attendance" icon={<CgProfile />} label="Attendance" isOpen={actualOpen} onClick={handleLinkClick} /> */}
          {/* <SidebarLink to="/pipeline" icon={<RiUserSearchLine />} label="Pipeline" isOpen={actualOpen} onClick={handleLinkClick} /> */}
          {/* <SidebarLink to="/home-intro" icon={<FiHome />} label="Home Intro" isOpen={actualOpen} onClick={handleLinkClick} /> */}
             


         
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
      {isOpen && <span className="text-white font-medium text-sm  rounded-2xl  relative transition-all ">{label}</span>}
    </Link>
  )
}

// SidebarDropdown Component
const 
SidebarDropdown = ({
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
        className={`flex items-center w-full py-2  hover:bg-white/20 mb-1 ${
          isOpen ? "justify-start gap-3 px-3 transition-all  rounded-xl " : "justify-center px-0"
        }`}
      >
        <div className="text-lg text-white flex-shrink-0 ">{icon}</div>
        {isOpen && (
          <>
            <span className="text-white font-medium text-sm flex-1 text-left ">{label}</span>
            <span className="text-white text-sm">{expanded ? <FiChevronDown /> : <FiChevronRight />}</span>
          </>
        )}
      </button>
      {expanded && isOpen && <div className="ml-6 flex flex-col ">{children}</div>}
    </div>
  )
}