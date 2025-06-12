import { useState, type JSX } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FiHome,
  FiUsers,
  FiChevronDown,
  FiChevronRight,
  FiUserCheck,
  FiPower,
} from "react-icons/fi";
import { AiOutlineIssuesClose } from "react-icons/ai";
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
import { MdBusiness, MdEventAvailable } from "react-icons/md";
import { GrAnnounce } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { MdMoneyOffCsred } from "react-icons/md";
import { GiLaptop } from "react-icons/gi";
import { FaUserTimes } from "react-icons/fa";
import { MdOutlineSick } from "react-icons/md";
import { TbReportSearch } from "react-icons/tb";
import { MdOutlineDashboardCustomize } from "react-icons/md";



const COLOR = {
  primary: "#006666",
  bgColor: "#faf3eb",
  secondary: "#E6A895",
  white: "#ffffff",
};

const SIDEBAR_WIDTH_OPEN = "15rem";
const SIDEBAR_WIDTH_CLOSED = "6rem";

const SideBar = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) => {
  const [hovered, setHovered] = useState(false);
  const actualOpen = isOpen || hovered;

  const handleLinkClick = () => {
    if (!isOpen) setHovered(false);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    // window.location.reload();
  };

  return (
    <div
      className="border-r shadow-md transition-all hover:bg-[#5d8d99] duration-300 fixed top-0 left-0 h-[100vh] z-40 flex flex-col overflow-hidden"
      onMouseEnter={() => !isOpen && setHovered(true)}
      onMouseLeave={() => !isOpen && setHovered(false)}
      style={{
        // backgroundColor: COLOR.primary,
        width: actualOpen ? SIDEBAR_WIDTH_OPEN : SIDEBAR_WIDTH_CLOSED,
      //     backgroundColor: isOpen
      // ? "transparent"
      // : hovered
      // ? "#5d8d99"
      // : "transparent",

      }}
    >
      {/* Header */}
      <div className="flex flex-col sticky top-0  z-50">
        <div className="flex justify-center items-center h-20 text-lg font-bold text-white">HRM</div>
        <div className={`w-full flex  ${actualOpen ? "justify-end  px-2" : " justify-center"}`}>
          <button
            onClick={handleToggle}
            className="p-2 rounded-md transition duration-200 hover:bg-white/20"
            title="Toggle Sidebar"
          >
            {actualOpen ? (
              <RiMenu3Line size={20} color={COLOR.white} />
            ) : (
              <RiMenu2Line size={20} color={COLOR.white} />
            )}
          </button>
        </div>
        {/* <div className="flex justify-center items-center h-20 text-lg font-bold text-white">HRM</div> */}
      </div>

      {/* Navigation */}
      <div className="overflow-y-auto  scrollbar-hide flex-1 mt-4">
        <nav className="flex flex-col gap-4 w-full items-center">
          <SidebarDropdown icon={<MdOutlineDashboardCustomize />} label="Dashboard" isOpen={actualOpen}>
            <SidebarLink to="/" icon={<FiHome />} label="Dashboard" isOpen={actualOpen} onClick={handleLinkClick} />
            <SidebarLink to="/home-intro" icon={<FiHome />} label="Home Intro" isOpen={actualOpen} onClick={handleLinkClick} />
          </SidebarDropdown>

          <SidebarDropdown icon={<FiUsers />} label="Employee" isOpen={actualOpen}>
            <SidebarLink to="/employee" icon={<FiUsers />} label="Employee" isOpen={actualOpen} onClick={handleLinkClick} />
            <SidebarLink to="/shift" icon={<RiTimeLine />} label="Shifts" isOpen={actualOpen} onClick={handleLinkClick} />
            <SidebarLink to="/appraisal" icon={<FiUserCheck />} label="Appraisal" isOpen={actualOpen} onClick={handleLinkClick} />
            <SidebarLink to="/reports" icon={<TbReportSearch />} label="Reports" isOpen={actualOpen} onClick={handleLinkClick} />
          </SidebarDropdown>

          <SidebarDropdown icon={<RiUserSearchLine />} label="Recruitment" isOpen={actualOpen}>
            <SidebarLink to="/recruitment" icon={<RiBriefcaseLine />} label="Recruitment" isOpen={actualOpen} onClick={handleLinkClick} />
            <SidebarLink to="/candidates" icon={<RiUserFollowLine />} label="Candidates" isOpen={actualOpen} onClick={handleLinkClick} />
            <SidebarLink to="/pipeline" icon={<RiUserSearchLine />} label="Pipeline" isOpen={actualOpen} onClick={handleLinkClick} />
            <SidebarLink to="/recruitment/jobs" icon={<RiBriefcaseLine />} label="Job Postings" isOpen={actualOpen} onClick={handleLinkClick} />
            {/* <SidebarLink to="/recruitment/candidates" icon={<RiUserFollowLine />} label="Candidates" isOpen={actualOpen} onClick={handleLinkClick} /> */}
          </SidebarDropdown>

          <SidebarDropdown icon={<FaUserTimes />} label="Leaves" isOpen={actualOpen}>
            <SidebarLink to="/leave-management" icon={<MdEventAvailable />} label="Leave" isOpen={actualOpen} onClick={handleLinkClick} />
          <SidebarLink to="/leave-types" icon={<MdOutlineSick />} label="Leave Types" isOpen={actualOpen} onClick={handleLinkClick} />
          </SidebarDropdown>

          <SidebarLink to="/payroll" icon={<RiMoneyDollarCircleLine />} label="Payroll" isOpen={actualOpen} onClick={handleLinkClick} />
          <SidebarLink to="/time-sheet" icon={<RiTimeLine />} label="Time Sheet" isOpen={actualOpen} onClick={handleLinkClick} />
          <SidebarLink to="/asset" icon={<GiLaptop />} label="Assets" isOpen={actualOpen} onClick={handleLinkClick} />
          <SidebarLink to="/asset-category" icon={<RiArchiveDrawerLine />} label="Asset Category" isOpen={actualOpen} onClick={handleLinkClick} />
          <SidebarLink to="/organization-chart" icon={<MdBusiness />} label="Organization" isOpen={actualOpen} onClick={handleLinkClick} />
          <SidebarLink to="/attendance" icon={<CgProfile />} label="Attendance" isOpen={actualOpen} onClick={handleLinkClick} />
          <SidebarLink to="/deduction" icon={<MdMoneyOffCsred />} label="Deduction" isOpen={actualOpen} onClick={handleLinkClick} />
          <SidebarLink to="/announcement" icon={<GrAnnounce />} label="Announcement" isOpen={actualOpen} onClick={handleLinkClick} />
          <SidebarLink to="/grievance" icon={<AiOutlineIssuesClose />} label="Grievance" isOpen={actualOpen} onClick={handleLinkClick} />
          <SidebarLink to="/training-management" icon={<AiOutlineIssuesClose />} label="Training" isOpen={actualOpen} onClick={handleLinkClick} />
            <SidebarLink to="/chat" icon={<AiOutlineIssuesClose />} label="Chat" isOpen={actualOpen} onClick={handleLinkClick} />

          {/* Logout */}
          <div
            onClick={handleLogout}
            className={`flex items-center transition-all px-2 py-1 cursor-pointer ${actualOpen ? "w-full justify-start gap-5 pl-5 pr-1" : "justify-center w-10 h-8"
              } rounded-full hover:bg-white/20`}
          >
            <div className="text-xl" style={{ color: COLOR.white }}>
              <FiPower />
            </div>
            {actualOpen && <span style={{ color: COLOR.white }}>Logout</span>}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default SideBar;

// SidebarLink Component
const SidebarLink = ({
  to,
  icon,
  label,
  isOpen,
  onClick,
}: {
  to: string;
  icon: JSX.Element;
  label: string;
  isOpen: boolean;
  onClick: () => void;
}) => {
  const location = useLocation();
  const [isHovered, setIsHovered] = useState(false);
  const isActive = location.pathname === to;

  const backgroundColor = isActive
    ? "#ffffff33"
    : isHovered
      ? "#ffffff1a"
      : "transparent";

  return (
    <Link
      to={to}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ backgroundColor }}
      className={`flex items-center transition-all px-2 py-1 ${isOpen ? "w-full justify-start gap-5 pl-5 pr-1" : "justify-center w-20 h-8"
        } rounded-full`}
    >
      <div className="text-xl text-white">{icon}</div>
      {isOpen && <span className="text-white">{label}</span>}
    </Link>
  );
};

// SidebarDropdown Component
const SidebarDropdown = ({
  icon,
  label,
  children,
  isOpen,
}: {
  icon: JSX.Element;
  label: string;
  children: React.ReactNode;
  isOpen: boolean;
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="w-full">
      <button
        onClick={() => setExpanded(!expanded)}
        className={`flex items-center w-full transition-all px-2 py-2 rounded-full hover:bg-white/20 ${isOpen ? "justify-start gap-4 pl-5 pr-2" : "justify-center"
          }`}
      >
        <div className="text-xl text-white">{icon}</div>
        {isOpen && (
          <>
            <span className="text-sm text-white">{label}</span>
            <span className="ml-auto text-white">
              {expanded ? <FiChevronDown /> : <FiChevronRight />}
            </span>
          </>
        )}
      </button>
      {expanded && (
        <div className={`ml-8 mt-1 flex flex-col gap-2 ${isOpen ? "" : "hidden"}`}>
          {children}
        </div>
      )}
    </div>
  );
};
