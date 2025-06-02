
import { Search, Star, Moon, Bell } from 'lucide-react';

export default function TopNavbar() {
  return (
    <div className="flex items-center justify-between bg-[#f8f8f8] px-6 py-4 border-b">
      <div>
        <h2 className="text-xl font-semibold flex items-center gap-1">
          Welcome HRM <span>👋</span>
        </h2>
        <p className="text-gray-500 text-sm">Welcome you all guys.</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center bg-white border rounded-lg px-3 py-1 shadow-sm transition-all duration-300 focus-within:ring-2 focus-within:ring-blue-400 hover:scale-[1.02]">
          <Search className="text-gray-400 w-4 h-4 mr-2 transition-colors duration-300 group-focus-within:text-blue-500" />
          <input
            type="text"
            placeholder="Search"
            className="outline-none text-sm w-40 bg-transparent placeholder-gray-500"
          />
        </div>

        <IconButton icon={<Star className="w-5 h-5 text-gray-600" />} />
        <IconButton icon={<Moon className="w-5 h-5 text-gray-600" />} />

        <div className="relative">
          <IconButton icon={<Bell className="w-5 h-5 text-gray-600" />} />
          <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-pulse">
            4
          </span>
        </div>

        <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-300 transform transition duration-300 hover:scale-105">
          <img
            src="https://th.bing.com/th/id/OIP.Kk4i-k-7bOfsgPv0SJtj5AHaHa?rs=1&pid=ImgDetMain"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

function IconButton({ icon }: { icon: JSX.Element }) {
  return (
    <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow hover:bg-gray-100 cursor-pointer transform transition duration-300 hover:scale-110 active:scale-95">
      {icon}
    </div>
  );
}
