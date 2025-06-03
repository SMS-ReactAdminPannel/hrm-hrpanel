import { useState, useRef, useEffect } from 'react';
import { Search, Star, Moon, Bell, Trash2, Plus, Minus } from 'lucide-react';
import type { JSX } from 'react/jsx-runtime';

export default function Navbar() {
  const [showBookmark, setShowBookmark] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [tab, setTab] = useState<'all' | 'messages' | 'cart'>('all');

  const bookmarkRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        bookmarkRef.current &&
        !bookmarkRef.current.contains(event.target as Node)
      ) {
        setShowBookmark(false);
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setShowProfileMenu(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex items-center justify-between bg-[#f8f8f8] px-6 py-4 border-b relative">
      <div>
        <h2 className="text-xl font-semibold flex items-center gap-1">
          Welcome HRM <span>👋</span>
        </h2>
        <p className="text-gray-500 text-sm">Welcome you all guys.</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center bg-white border rounded-lg px-3 py-1 shadow-sm transition-all duration-300 focus-within:ring-2 focus-within:ring-blue-400 hover:scale-[1.02]">
          <Search className="text-gray-400 w-4 h-4 mr-2" />
          <input
            type="text"
            placeholder="Search"
            className="outline-none text-sm w-40 bg-transparent placeholder-gray-500"
          />
        </div>

        <div className="relative" ref={bookmarkRef}>
          <IconButton
            icon={<Star className="w-5 h-5 text-gray-600" />}
            onClick={() => setShowBookmark((prev) => !prev)}
          />
          {showBookmark && (
            <div className="absolute right-0 mt-2 w-60 bg-white shadow-lg rounded-xl p-4 z-50">
              <h3 className="font-semibold text-lg mb-3 text-center">Bookmark</h3>
              <div className="flex justify-around mb-3">
                <BookmarkItem label="Forms" />
                <BookmarkItem label="Profile" />
                <BookmarkItem label="Tables" />
              </div>
              <p className="text-center text-blue-600 font-medium cursor-pointer hover:underline">
                Add New Bookmark
              </p>
            </div>
          )}
        </div>

        
        <IconButton icon={<Moon className="w-5 h-5 text-gray-600" />} />
       
        <div className="relative" ref={notificationRef}>
          <div
            onClick={() => setShowNotifications((prev) => !prev)}
            className="w-9 h-9 bg-white rounded-full shadow flex items-center justify-center cursor-pointer hover:scale-110 transition"
          >
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-pulse">
              4
            </span>
          </div>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 bg-white rounded-xl shadow-xl p-4 z-50">
              <h3 className="font-semibold text-lg mb-2">
                Notifications <span className="text-sm text-gray-500">(4 New)</span>
              </h3>

              <div className="flex gap-4 border-b mb-3 pb-2">
                {['all', 'messages', 'cart'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t as 'all' | 'messages' | 'cart')}
                    className={`capitalize text-sm font-medium ${
                      tab === t ? 'text-teal-700 border-b-2 border-teal-700' : 'text-gray-500'
                    }`}
                  >
                    {t === 'all' && 'All(3)'}
                    {t === 'messages' && 'Messages'}
                    {t === 'cart' && 'Cart'}
                  </button>
                ))}
              </div>

              {tab === 'cart' && <CartItem />}
              {tab === 'messages' && (
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
                  <CartItem />
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

              <button className="w-full mt-4 bg-teal-600 text-white py-2 rounded-md text-sm font-medium hover:bg-teal-700">
                Check all
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
              <div className="px-4 py-2 text-sm text-red-600 cursor-pointer hover:bg-red-100 font-medium">Log Out</div>
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
}) {
  return (
    <div
      onClick={onClick}
      className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow hover:bg-gray-100 cursor-pointer transform transition duration-300 hover:scale-110 active:scale-95"
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

function CartItem() {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between">
        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="Product"
          className="w-12 h-12 rounded-md"
        />
        <div className="flex-1 mx-3">
          <h4 className="font-medium text-sm">Men Blue T-Shirt</h4>
          <div className="flex items-center mt-1 gap-2">
            <Minus className="w-4 h-4 text-gray-500 cursor-pointer" />
            <span className="text-sm">1</span>
            <Plus className="w-4 h-4 text-gray-500 cursor-pointer" />
          </div>
        </div>
        <div className="text-green-600 font-semibold">$695.00</div>
        <Trash2 className="w-4 h-4 text-red-500 ml-2 cursor-pointer" />
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
