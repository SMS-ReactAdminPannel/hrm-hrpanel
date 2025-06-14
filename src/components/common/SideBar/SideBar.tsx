
import { useState, type JSX } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FiHome,
  FiUsers,
  FiChevronDown,
  FiChevronRight,
  FiUserCheck,
  FiTruck,
} from "react-icons/fi";
import {
  RiMenu2Line, RiMenu3Line, RiUserSearchLine, RiMoneyDollarCircleLine,
  RiTimeLine, RiArchiveDrawerLine,
} from "react-icons/ri";
import { MdBusiness, MdEventAvailable } from "react-icons/md";
import { RiBriefcaseLine, RiUserFollowLine } from "react-icons/ri";

const COLOR = {
  primary: "#006666",
  bgColor: "#faf3eb",
  secondary: "#E6A895",
  white: "#ffffff",
};

const SideBar = () => {
  const [isPinned, setIsPinned] = useState(false); 
  const [hovered, setHovered] = useState(false); 

  const isOpen = isPinned || hovered;

  const handleLinkClick = () => {
    if (!isPinned) setHovered(false);
  };

  return (
    <div className="flex h-screen">
      <div
  className="border-r shadow-md transition-all duration-300 fixed top-0 left-0 h-screen z-40 flex flex-col rounded-tr-3xl rounded-br-3xl overflow-hidden "
  onMouseEnter={() => {
    if (!isPinned) setHovered(true); 
  }}
  onMouseLeave={() => {
    if (!isPinned) setHovered(false); 
  }}
  style={{
    backgroundColor: COLOR.primary,
    width: isOpen ? "15rem" : "6rem",
  }}
>

        <div className="flex flex-col sticky top-0 bg-[#006666] z-50">
          <div className="flex justify-center items-center h-20 text-lg font-bold text-white">
            HRM
          </div>
          <div className={`w-full flex ${isOpen ? "justify-end px-2" : "justify-center"}`}>
            <button
              onClick={() => setIsPinned(!isPinned)}
              className="p-2 rounded-md transition duration-200 hover:bg-white/20"
              title="Toggle Sidebar"
            >
              {isOpen ? (
                <RiMenu3Line size={20} color={COLOR.white} />
              ) : (
                <RiMenu2Line size={20} color={COLOR.white} />
              )}
            </button>
          </div>
        </div>

        <div className="overflow-y-auto scrollbar-hide flex-1 mt-4">
          <nav className="flex flex-col gap-4 w-full items-center">
            <SidebarDropdown icon={<FiHome />} label="Dashboards" isOpen={isOpen}>
              <SidebarLink to="/default" icon={<FiHome />} label="Default" isOpen={isOpen} onClick={handleLinkClick} />
              <SidebarLink to="/ecommerce" icon={<FiHome />} label="Ecommerce" isOpen={isOpen} onClick={handleLinkClick} />
            </SidebarDropdown>

            <SidebarDropdown icon={<FiUsers />} label="Employee" isOpen={isOpen}>
              <SidebarLink to="/employee/list" icon={<FiUsers />} label="Employee List" isOpen={isOpen} onClick={handleLinkClick} />
              <SidebarLink to="/employee/details" icon={<FiUserCheck />} label="Employee Details" isOpen={isOpen} onClick={handleLinkClick} />
            </SidebarDropdown>

            <SidebarDropdown icon={<RiUserSearchLine />} label="Recruitment" isOpen={isOpen}>
               <SidebarLink to="/recuritment" icon={<RiBriefcaseLine />} label="Recruitment" isOpen={isOpen} onClick={handleLinkClick} />
               <SidebarLink to="/candidates" icon={<RiUserFollowLine />} label="Candidates" isOpen={isOpen} onClick={handleLinkClick} />
                <SidebarLink to="/pipeline" icon={<RiUserSearchLine />} label="Pipeline" isOpen={isOpen} onClick={handleLinkClick} />
              <SidebarLink to="/recruitment/jobs" icon={<RiBriefcaseLine />} label="Job Postings" isOpen={isOpen} onClick={handleLinkClick} />
              <SidebarLink to="/recruitment/candidates" icon={<RiUserFollowLine />} label="Candidates" isOpen={isOpen} onClick={handleLinkClick} />
            </SidebarDropdown>

            <SidebarLink to="/payroll" icon={<RiMoneyDollarCircleLine />} label="Payroll" isOpen={isOpen} onClick={handleLinkClick} />
            <SidebarLink to="/time-sheet" icon={<RiTimeLine />} label="Time-Sheet" isOpen={isOpen} onClick={handleLinkClick} />
            <SidebarLink to="/assets-management" icon={<RiArchiveDrawerLine />} label="Assets" isOpen={isOpen} onClick={handleLinkClick} />
            <SidebarLink to="/organization-chart" icon={<MdBusiness />} label="Organization" isOpen={isOpen} onClick={handleLinkClick} />
            <SidebarLink to="/attendance" icon={<MdEventAvailable />} label="Attendance" isOpen={isOpen} onClick={handleLinkClick} />
             <SidebarLink to="/deduction" icon={<MdEventAvailable />} label="Deduction" isOpen={isOpen} onClick={handleLinkClick} />
          <SidebarLink to="/leave-management" icon={<MdEventAvailable />} label="Leave" isOpen={isOpen} onClick={handleLinkClick} />
          <SidebarLink to="/leave-types" icon={<MdEventAvailable />} label="Attendance" isOpen={isOpen} onClick={handleLinkClick} />
          <SidebarLink to="/employee" icon={<MdEventAvailable />} label="employee" isOpen={isOpen} onClick={handleLinkClick} />
          <SidebarLink to="/shift" icon={<MdEventAvailable />} label="shift" isOpen={isOpen} onClick={handleLinkClick} />
          <SidebarLink to="/time-sheet" icon={<MdEventAvailable />} label="time-sheet" isOpen={isOpen} onClick={handleLinkClick} />
          <SidebarLink to="/announcement" icon={<MdEventAvailable />} label="Announcement" isOpen={isOpen} onClick={handleLinkClick} />
          <SidebarLink
            to="/asset-category"
            icon={<FiTruck />}
            label="Asset-category"
            isOpen={isOpen}
            onClick={handleLinkClick}
          />
          </nav>
        </div>
      </div>

      <div className={`transition-all duration-300 ${isOpen ? "ml-60" : "ml-24"}`}></div>
    </div>
  );
};

export default SideBar;

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

  const textColor = COLOR.white;

  return (
    <Link
      to={to}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ backgroundColor }}
      className={`flex items-center transition-all px-2 py-1 ${
        isOpen ? "w-full justify-start gap-5 pl-5 pr-1" : "justify-center w-20 h-8"
      } rounded-full`}
    >
      <div className="text-xl" style={{ color: textColor }}>
        {icon}
      </div>
      {isOpen && <span style={{ color: textColor }}>{label}</span>}
    </Link>
  );
};

const SidebarSection = ({ title }: { title: string }) => (
  <div className="w-full px-4 mt-4 text-white/60 text-xs font-semibold uppercase tracking-widest">
    {title}
  </div>
);

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
        className={`flex items-center w-full transition-all px-2 py-2 rounded-full hover:bg-white/20 ${
          isOpen ? "justify-start gap-4 pl-5 pr-2" : "justify-center"
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

