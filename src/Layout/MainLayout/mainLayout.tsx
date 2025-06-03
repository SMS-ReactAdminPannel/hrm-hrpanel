import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from '../../components/common/SideBar/SideBar';
import NavBar from '../../components/common/Navbar/NavBar';
import { COLORS } from '../../constants/uiConstants';

const MainLayout: React.FC = () => {
  const [isPinned, setIsPinned] = useState(false);
  const [hovered, setHovered] = useState(false);

  const isOpen = isPinned || hovered;

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <SideBar
        isPinned={isPinned}
        onTogglePinned={() => setIsPinned(prev => !prev)}
        onHoverChange={setHovered}
      />

      {/* Push main content based on sidebar state */}
      <div
        className={`flex flex-col flex-1 transition-all duration-300 ${
          isOpen ? 'ml-60' : ''
        }`}
      >
        <NavBar />
        <main className="flex-1 overflow-auto p-4">
          <div
            className="h-full rounded shadow"
            style={{ backgroundColor: COLORS.bgColor }}
          >
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
