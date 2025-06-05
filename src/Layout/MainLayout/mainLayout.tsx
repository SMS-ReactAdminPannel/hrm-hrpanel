import { Outlet } from 'react-router-dom';
import SideBar from '../../components/common/SideBar/SideBar';
import NavBar from '../../components/common/Navbar/NavBar';
import { useState } from 'react';
import mainLayout2 from '../../assets/mainLayout4.jpg'

const SIDEBAR_WIDTH_OPEN = 240; // 15rem
const SIDEBAR_WIDTH_CLOSED = 96; // 6rem

export const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // shared state

  const marginLeft = isSidebarOpen ? SIDEBAR_WIDTH_OPEN : SIDEBAR_WIDTH_CLOSED;

  return (
    <div className="flex h-screen  overflow-hidden" style={{backgroundImage: `url(${mainLayout2})`  , backgroundSize:'cover' , backgroundRepeat:'no-repeat'}}>
      {/* Sidebar */}
      <SideBar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main content */}
      <div
        className="flex flex-col flex-1 transition-all duration-300"
        style={{ marginLeft }}
      >
        <NavBar />
        <main className="flex-1 overflow-auto scrollbar-hide">
          <div
            className="p-4 rounded shadow"
            // style={{ backgroundColor: COLORS.bgColor }}
          >
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
