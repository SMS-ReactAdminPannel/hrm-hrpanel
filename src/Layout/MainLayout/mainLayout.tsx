import { Outlet } from 'react-router-dom';
import SideBar from '../../components/common/SideBar/SideBar';
import NavBar from '../../components/common/Navbar/NavBar';
import { COLORS } from '../../constants/uiConstants';

export const MainLayout = () => {
    return (
        <div className="flex h-screen bg-gray-100 overflow-hidden">
            {/* Sidebar (fixed) */}
            <SideBar />

            {/* Main content — push right with margin to account for sidebar */}
            <div className="flex flex-col flex-1 transition-all duration-300 ml-0"> {/* ml-56 = 14rem */}
                <NavBar />
                <main className="flex-1 overflow-auto scrollbar-hide">
                    <div
                        className="p-4 rounded shadow"
                        style={{ backgroundColor: COLORS.bgColor }}
                    >
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

