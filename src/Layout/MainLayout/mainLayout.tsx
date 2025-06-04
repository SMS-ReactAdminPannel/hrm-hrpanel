import { Outlet } from 'react-router-dom';
import SideBar from '../../components/common/SideBar/SideBar';
import NavBar from '../../components/common/Navbar/NavBar';
import { useState } from 'react';
import mainLayout2 from '../../assets/mainLayout4.jpg';

const SIDEBAR_WIDTH_OPEN = 240;
const SIDEBAR_WIDTH_CLOSED = 96;

export const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const marginLeft = isSidebarOpen ? SIDEBAR_WIDTH_OPEN : SIDEBAR_WIDTH_CLOSED;

  return (
    <div className="relative flex h-screen overflow-hidden">
    
      <div
  className="absolute inset-0 bg-cover bg-no-repeat bg-center z-0"
  style={{
    backgroundImage: `url(${mainLayout2})`,
    filter: 'blur(2px)', 
  }}
/>

    
      <div className="relative flex flex-1 z-10">
        <SideBar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        <div
          className="flex flex-col flex-1 transition-all duration-300"
          style={{ marginLeft }}
        >
          <NavBar />
          <main className="flex-1 overflow-auto scrollbar-hide">
            <div className="p-4 rounded shadow">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
