

import type React from "react"
import { useState, type JSX } from "react"
import { Link, useLocation } from "react-router-dom"
import { FiHome, FiUsers, FiChevronDown, FiUserCheck, FiMenu } from "react-icons/fi"
import { AiOutlineIssuesClose } from "react-icons/ai"
import {
  RiUserSearchLine,
  RiMoneyDollarCircleLine,
  RiTimeLine,
  RiArchiveDrawerLine,
  RiBriefcaseLine,
  RiUserFollowLine,
} from "react-icons/ri"
import { MdBusiness, MdEventAvailable, MdOutlineVisibility } from "react-icons/md"
import { GrAnnounce } from "react-icons/gr"
import { CgProfile } from "react-icons/cg"
import { MdMoneyOffCsred } from "react-icons/md"
import { GiLaptop } from "react-icons/gi"
import { MdOutlineSick } from "react-icons/md"
import { FONTS } from "../../../constants/uiConstants"
import { CgCalendarDates } from "react-icons/cg"
import { IoCalendarNumberOutline, IoChatbox } from "react-icons/io5"
import { GoOrganization } from "react-icons/go"
import { LuPackagePlus } from "react-icons/lu"
import { MdHotelClass } from "react-icons/md"
import { HiMiniCalendarDays } from "react-icons/hi2"

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
      className="fixed top-0 left-0 h-screen z-40 flex flex-col transition-all duration-300 p-1"
      onMouseEnter={() => !isOpen && setHovered(true)}
      onMouseLeave={() => !isOpen && setHovered(false)}
      style={{
        width: actualOpen ? SIDEBAR_WIDTH_OPEN : SIDEBAR_WIDTH_CLOSED,
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(30px)",
        ...FONTS.cardheader,
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 h-16">
        <button
          onClick={handleToggle}
          className="p-2 rounded-md transition duration-200 hover:bg-white/10"
          title="Toggle Sidebar"
        >
          <FiMenu size={20} className="text-gray-200" />
        </button>
      </div>

      <nav
        className="flex-1 overflow-y-auto p-2"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        
        <SidebarLink to="/" icon={<FiHome />} label="Dashboard" isOpen={actualOpen} onClick={handleLinkClick} />

       
        <div className="mb-1">
          <SidebarDropdown
            icon={<FiUsers />}
            label="Employee"
            isOpen={actualOpen}
            childRoutes={["/employee", "/shift", "/appraisal"]}
          >
            <div className="relative ml-[-12%]">
              <SidebarLink
                to="/employee"
                icon={<FiUsers />}
                label="Employee"
                isOpen={actualOpen}
                onClick={handleLinkClick}
              />
              <SidebarLink
                to="/shift"
                icon={<RiTimeLine />}
                label="Shifts"
                isOpen={actualOpen}
                onClick={handleLinkClick}
              />
              <SidebarLink
                to="/appraisal"
                icon={<FiUserCheck />}
                label="Appraisal"
                isOpen={actualOpen}
                onClick={handleLinkClick}
              />
            </div>
          </SidebarDropdown>
        </div>

        <div className="mb-1">
          <SidebarDropdown
            icon={<RiBriefcaseLine />}
            label="Recruitment"
            isOpen={actualOpen}
            childRoutes={["/recruitment", "/recruitment/candidatelists", "/recruitment/job-postings"]}
          >
            <div className="relative ml-[-12%]">
              <SidebarLink
                to="/recruitment"
                icon={<RiBriefcaseLine />}
                label="Recruitment"
                isOpen={actualOpen}
                onClick={handleLinkClick}
              />
              <SidebarLink
                to="/recruitment/candidatelists"
                icon={<RiUserFollowLine />}
                label="Candidates"
                isOpen={actualOpen}
                onClick={handleLinkClick}
              />
              <SidebarLink
                to="/recruitment/job-postings"
                icon={<RiBriefcaseLine />}
                label="Job Postings"
                isOpen={actualOpen}
                onClick={handleLinkClick}
              />
            </div>
          </SidebarDropdown>
        </div>

        <div className="mb-1">
          <SidebarDropdown
            icon={<RiUserSearchLine />}
            label="Boarding"
            isOpen={actualOpen}
            childRoutes={["/onboarding", "/offboarding"]}
          >
            <div className="relative ml-[-12%]">
              <SidebarLink
                to="/onboarding"
                icon={<AiOutlineIssuesClose />}
                label="OnBoarding"
                isOpen={actualOpen}
                onClick={handleLinkClick}
              />
              <SidebarLink
                to="/offboarding"
                icon={<AiOutlineIssuesClose />}
                label="OffBoarding"
                isOpen={actualOpen}
                onClick={handleLinkClick}
              />
            </div>
          </SidebarDropdown>
        </div>

        <div className="mb-1">
          <SidebarDropdown
            icon={<CgCalendarDates />}
            label="Attendance"
            isOpen={actualOpen}
            childRoutes={["/time-sheet", "/attendance", "/Attendancerequest"]}
          >
            <div className="relative ml-[-12%]">
              <SidebarLink
                to="/time-sheet"
                icon={<RiTimeLine />}
                label="Time Sheet"
                isOpen={actualOpen}
                onClick={handleLinkClick}
              />
              <SidebarLink
                to="/attendance"
                icon={<CgProfile />}
                label="Attendance"
                isOpen={actualOpen}
                onClick={handleLinkClick}
              />
              <SidebarLink
                to="/Attendancerequest"
                icon={<HiMiniCalendarDays />}
                label="Attendance Request"
                isOpen={actualOpen}
                onClick={handleLinkClick}
              />
            </div>
          </SidebarDropdown>
        </div>

        <div className="mb-1">
          <SidebarDropdown
            icon={<LuPackagePlus />}
            label="Assets"
            isOpen={actualOpen}
            childRoutes={["/asset", "/asset-category"]}
          >
            <div className="relative ml-[-12%]">
              <SidebarLink
                to="/asset"
                icon={<GiLaptop />}
                label="Assets"
                isOpen={actualOpen}
                onClick={handleLinkClick}
              />
              <SidebarLink
                to="/asset-category"
                icon={<RiArchiveDrawerLine />}
                label="Asset Category"
                isOpen={actualOpen}
                onClick={handleLinkClick}
              />
            </div>
          </SidebarDropdown>
        </div>

        <div className="mb-1">
          <SidebarDropdown
            icon={<RiUserSearchLine />}
            label="Leave"
            isOpen={actualOpen}
            childRoutes={["/leave-management", "/leave-types"]}
          >
            <div className="relative ml-[-12%]">
              <SidebarLink
                to="/leave-management"
                icon={<MdEventAvailable />}
                label="Leave Management"
                isOpen={actualOpen}
                onClick={handleLinkClick}
              />
              <SidebarLink
                to="/leave-types"
                icon={<MdOutlineSick />}
                label="Leave Types"
                isOpen={actualOpen}
                onClick={handleLinkClick}
              />
            </div>
          </SidebarDropdown>
        </div>

        <SidebarLink
          to="/departments"
          icon={<MdBusiness />}
          label="Departments"
          isOpen={actualOpen}
          onClick={handleLinkClick}
        />
        <SidebarLink
          to="/payroll"
          icon={<RiMoneyDollarCircleLine />}
          label="Payroll"
          isOpen={actualOpen}
          onClick={handleLinkClick}
        />
        <SidebarLink
          to="/organization-chart"
          icon={<GoOrganization />}
          label="Organization"
          isOpen={actualOpen}
          onClick={handleLinkClick}
        />
        <SidebarLink
          to="/deduction"
          icon={<MdMoneyOffCsred />}
          label="Deduction"
          isOpen={actualOpen}
          onClick={handleLinkClick}
        />
        <SidebarLink
          to="/announcement"
          icon={<GrAnnounce />}
          label="Announcement"
          isOpen={actualOpen}
          onClick={handleLinkClick}
        />
        <SidebarLink
          to="/grievance-management"
          icon={<AiOutlineIssuesClose />}
          label="Grievance"
          isOpen={actualOpen}
          onClick={handleLinkClick}
        />
        <SidebarLink
          to="/training-management"
          icon={<MdHotelClass />}
          label="Training"
          isOpen={actualOpen}
          onClick={handleLinkClick}
        />
        <SidebarLink
          to="/visitor-management"
          icon={<MdOutlineVisibility />}
          label="Visitor Management"
          isOpen={actualOpen}
          onClick={handleLinkClick}
        />
        <SidebarLink
          to="/calendar"
          icon={<IoCalendarNumberOutline />}
          label="Calendar"
          isOpen={actualOpen}
          onClick={handleLinkClick}
        />
        <SidebarLink to="/chat" icon={<IoChatbox />} label="Chat" isOpen={actualOpen} onClick={handleLinkClick} />
      </nav>
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
      className={`flex items-center transition-all py-2 rounded-md ${
        isActive ? "bg-white/30 backdrop-blur-sm" : isHovered ? "bg-white/20" : "hover:bg-white/10"
      } ${isOpen ? "justify-start gap-3 px-3" : "justify-center px-0"}`}
    >
      <div className="text-lg text-white  flex-shrink-0">{icon}</div>
      {isOpen && <span className="text-white font-medium text-sm">{label}</span>}
    </Link>
  )
}



// import { useEffect } from "react"


// const SidebarDropdown = ({
//   icon,
//   label,
//   children,
//   isOpen,
//   childRoutes = [],
// }: {
//   icon: JSX.Element
//   label: string
//   children: React.ReactNode
//   isOpen: boolean
//   childRoutes?: string[]
// }) => {
//   const location = useLocation()

//   const isChildActive = childRoutes.some((route) => location.pathname === route)

//   const [expanded, setExpanded] = useState(false)

//   useEffect(() => {
//     if (isChildActive) {
//       setExpanded(true)
//     }
//   }, [isChildActive])

//   const shouldHighlightParent = !isOpen && isChildActive
//   const showChildren = expanded || isChildActive

//   return (
//     <div
//       className={`w-full  ${
//         (expanded && isOpen) || shouldHighlightParent
//           ? "bg-white/13 backdrop-blur-lg rounded-md border border-white/20"
//           : "hover:backdrop-blur-md rounded-xl"
//       }`}>
//       <button
//         onClick={() => setExpanded((prev) => !prev)}
//         className={`flex items-center w-full py-2  transition-all ${
//           isOpen ? "justify-start gap-3 px-3 rounded-md" : "justify-center rounded-md "
//         }`}
//       >
//           <div
//                 className={`text-lg flex-shrink-0 transition-colors ${
//                   expanded ? "text-white/50" : "text-white"
//                 }`}
//                 >
//                 {icon}
//           </div>

      

//         {isOpen && (
//           <>
//             <span
//               className={`font-medium text-sm flex-1 text-left transition-colors ${
//                 expanded ? "text-white/50" : "text-white"
//               }`}
//             >
//               {label}
//             </span>
//             <span
//               className={`text-white transition-transform duration-200 ${
//                 expanded ? "rotate-180 text-white/" : ""
//               }`}
//             >
//               <FiChevronDown />
//             </span>
//           </>
//         )}

//       </button>

//       {showChildren && (
//         <div
//           className={`flex flex-col space-y-1 ${
//             isOpen
//               ? "ml-6"
//               : " ml-1 "
//           }`}
//         >
//           {children}
//         </div>
//       )}
//     </div>
//   )
// }

import { useEffect } from "react"


const SidebarDropdown = ({
  icon,
  label,
  children,
  isOpen,
  childRoutes = [],
}: {
  icon: JSX.Element
  label: string
  children: React.ReactNode
  isOpen: boolean
  childRoutes?: string[]
}) => {
  const location = useLocation()
  const [expanded, setExpanded] = useState(false)

  const isChildActive = childRoutes.some((route) => location.pathname === route)

  useEffect(() => {
    if (isChildActive) {
      setExpanded(true)
    } else {
      setExpanded(false) // 👈 Collapse when child is no longer active
    }
  }, [location.pathname, isChildActive])

  const shouldHighlightParent = !isOpen && isChildActive
  const showChildren = expanded

  return (
    <div
      className={`w-full ${
        (expanded && isOpen) || shouldHighlightParent
          ? "bg-white/13 backdrop-blur-lg rounded-md border border-white/20"
          : "hover:backdrop-blur-md rounded-xl"
      }`}
    >
      <button
        onClick={() => setExpanded((prev) => !prev)}
        className={`flex items-center w-full py-2 transition-all ${
          isOpen ? "justify-start gap-3 px-3 rounded-md" : "justify-center rounded-md"
        }`}
      >
        <div className={`text-lg flex-shrink-0 transition-colors ${expanded ? "text-white/50" : "text-white"}`}>
          {icon}
        </div>

        {isOpen && (
          <>
            <span
              className={`font-medium text-sm flex-1 text-left transition-colors ${
                expanded ? "text-white/50" : "text-white"
              }`}
            >
              {label}
            </span>
            <span
              className={`text-white transition-transform duration-200 ${
                expanded ? "rotate-180" : ""
              }`}
            >
              <FiChevronDown />
            </span>
          </>
        )}
      </button>

      {showChildren && (
        <div className={`flex flex-col space-y-1 ${isOpen ? "ml-6" : "ml-1"}`}>
          {children}
        </div>
      )}
    </div>
  )
}














