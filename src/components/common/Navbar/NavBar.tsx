import { useState, useRef, useEffect, type JSX } from 'react';
import { Search, Star, Moon, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { postLogout } from '../../../features/auth/service';
import { MdYoutubeSearchedFor } from 'react-icons/md';
import { GoSearch } from 'react-icons/go';
import { motion, AnimatePresence } from "framer-motion"

export default function Navbar() {
  const [showBookmark, setShowBookmark] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [tab, setTab] = useState<'all' | 'Read' | 'Unread'>('all');
  const [expanded, setExpanded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const bookmarkRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (bookmarkRef.current && !bookmarkRef.current.contains(event.target as Node)) {
        setShowBookmark(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      // await postLogout();
      localStorage.clear()
      navigate('/login');
      window
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const toggleSearch = () => {
    setExpanded((prev) => !prev);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  // Click outside to collapse
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setExpanded(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex items-center justify-between px-4 py-3 h-14 bg-white/10 relative">
      <div>
        {/* <h2 className="text-xl font-semibold flex items-center gap-1">
          Welcome HRM <span>👋</span>
        </h2>
        <p className="text-gray-500 text-sm">Welcome you all guys.</p> */}
      </div>

      <div className="flex items-center gap-4">
        <div ref={wrapperRef} className="relative flex items-center shadow-md rounded-full">
      <motion.input
        ref={inputRef}
        type="text"
        placeholder="Search..."
        animate={{
              width: expanded ? 200 : 0,
              opacity: expanded ? 1 : 0,
              paddingLeft: expanded ? 16 : 0,
              paddingRight: expanded ? 32 : 0,
            }}
        className={`absolute right-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-sm text-white py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-white/20 h-9 placeholder-white/60 h-8
          ${expanded ? "w-50 opacity-100 px-4 " : "w-0 px-0 opacity-0"}
        `}
      />
      <button
        onClick={toggleSearch}
        className="z-10  text-white p-2 rounded-full transition"
      >
        <GoSearch className='text-xl text-white/70'/> 
      </button>
    </div>

        <IconButton icon={<Moon className="w-5 h-5 text-white/70" />} />

        <div className="relative" ref={notificationRef}>
          <div
            onClick={() => setShowNotifications((prev) => !prev)}
            className="w-9 h-9 flex items-center rounded-full shadow-md justify-center cursor-pointer hover:scale-110 transition"
          >
            <Bell className="w-5 h-5 text-white/50" />
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-pulse">4</span>
          </div>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 bg-white rounded-xl shadow-xl p-4 z-50">
              <h3 className="font-semibold text-lg mb-2">
                Notifications <span className="text-sm text-gray-500">(4 New)</span>
              </h3>

              <div className="flex gap-4 border-b mb-3 pb-2">
                {['all', 'Read', 'Unread'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t as 'all' | 'Read' | 'Unread')}
                    className={`capitalize text-sm font-medium ${
                      tab === t ? 'text-teal-700 border-b-2 border-teal-700' : 'text-gray-500'
                    }`}
                  >
                    {t === 'all' && 'All(3)'}
                    {t === 'Read' && 'Read'}
                    {t === 'Unread' && 'Unread'}
                  </button>
                ))}
              </div>

              {tab === 'Unread' && <UnreadItem />}
              {tab === 'Read' && (
                <div className="space-y-3">
                  <MessageItem
                    name="Floyd Miles"
                    message="Sir, can I remove part in des..."
                    img="https://randomuser.me/api/portraits/men/36.jpg"
                  />
                  <MessageItem
                    name="Dianne Russell"
                    message="So, what is my next work?"
                    img="https://randomuser.me/api/portraits/women/45.jpg"
                  />
                </div>
              )}
              {tab === 'all' && (
                <>
                  <UnreadItem />
                  <div className="space-y-3">
                    <MessageItem
                      name="Floyd Miles"
                      message="Sir, can I remove part in des..."
                      img="https://randomuser.me/api/portraits/men/36.jpg"
                    />
                    <MessageItem
                      name="Dianne Russell"
                      message="So, what is my next work?"
                      img="https://randomuser.me/api/portraits/women/45.jpg"
                    />
                  </div>
                </>
              )}

              <button
                onClick={() => {
                  setShowNotifications(false);
                  navigate('/notification');
                }}
                className="w-full mt-4 bg-teal-600 text-white py-2 rounded-md text-sm font-medium hover:bg-teal-700"
              >
                View all
              </button>
            </div>
          )}
        </div>

        <div className="relative" ref={profileRef}>
          <div
            onClick={() => setShowProfileMenu((prev) => !prev)}
            className="w-9 h-9 rounded-full overflow-hidden border border-gray-300 transform transition duration-300 hover:scale-105 cursor-pointer"
          >
            <img
              src="https://th.bing.com/th/id/OIP.Kk4i-k-7bOfsgPv0SJtj5AHaHa?rs=1&pid=ImgDetMain"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-xl z-50 py-2">
              <div className="px-4 py-2 text-sm text-gray-600 cursor-pointer hover:bg-gray-100">My Profile</div>
              <div className="px-4 py-2 text-sm text-gray-600 cursor-pointer hover:bg-gray-100">Inbox</div>
              <div className="px-4 py-2 text-sm text-gray-600 cursor-pointer hover:bg-gray-100">Settings</div>
              <div
                className="px-4 py-2 text-sm text-red-600 cursor-pointer hover:bg-red-100 font-medium"
                onClick={handleLogout}
              >
                Log Out
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function IconButton({
  icon,
  onClick,
}: {
  icon: JSX.Element;
  onClick?: () => void;
})
 {
  return (
    <div
      onClick={onClick}
      className="w-8 h-8  rounded-full flex items-center  border-white/50 justify-center shadow-md  cursor-pointer transform transition duration-300 hover:scale-110 active:scale-95" 
    >
      {icon}
    </div>
  );
}

function BookmarkItem({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center cursor-pointer hover:text-blue-600">
      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mb-1">
        <div className="w-4 h-4 bg-gray-400 rounded" />
      </div>
      <span className="text-sm">{label}</span>
    </div>
  );
}

function UnreadItem() {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between">
        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="Product"
          className="w-12 h-12 rounded-full"
        />
        <div className="flex-1 mx-3">
          <h4 className="font-medium text-sm">Alex</h4>
          <p className="text-xs text-gray-500 truncate">Need, my timesheet</p>
        </div>
      </div>
    </div>
  );
}

function MessageItem({
  name,
  message,
  img,
}: {
  name: string;
  message: string;
  img: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <img src={img} alt={name} className="w-10 h-10 rounded-full" />
      <div className="flex-1">
        <p className="font-medium text-sm">{name}</p>
        <p className="text-xs text-gray-500 truncate">{message}</p>
      </div>
      <div className="text-gray-400 hover:text-gray-600 cursor-pointer">⋮</div>
    </div>
  );
}
