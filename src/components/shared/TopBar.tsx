"use client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Menu, Calendar, Clock, Power } from "lucide-react";
import { RootState } from "@/store/store";
import { useLogout } from "../../hooks/useAuth";
import SidebarMenu from "./SidebarMenu";

const TopBar = () => {
  const user = useSelector((state: RootState) => state.user);
  const logoutMutation = useLogout();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  const shortDate = currentDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
  });

  const formattedTime = currentDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4 mt-1 select-none">
        <div className="flex items-center space-x-1.5 md:space-x-3 lg:space-x-5">
          {/* Hamburger Menu */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm hover:shadow-md transition-all text-blue-600 flex-shrink-0 border border-gray-50 active:scale-95"
          >
            <Menu size={20} />
          </button>

          {/* Date Info */}
          <div className="flex items-center space-x-1.5 md:space-x-2 bg-white px-2 md:px-4 py-1.5 md:py-2 rounded-xl border border-gray-50 shadow-sm flex-shrink-0">
            <Calendar size={16} className="text-blue-500 flex-shrink-0" />
            <span className="font-bold text-gray-700 text-[11px] md:text-sm lg:text-base tracking-tight whitespace-nowrap capitalize">
              <span className="hidden lg:inline">{formattedDate}</span>
              <span className="lg:hidden">{shortDate}</span>
            </span>
          </div>

          {/* Time Info */}
          <div className="flex items-center space-x-1.5 md:space-x-2 bg-white px-2 md:px-4 py-1.5 md:py-2 rounded-xl border border-gray-50 shadow-sm flex-shrink-0">
            <Clock size={16} className="text-blue-500 flex-shrink-0" />
            <span className="font-bold text-gray-700 text-[11px] md:text-sm lg:text-base tracking-tight">
              {formattedTime}
            </span>
          </div>
        </div>

        {/* Right Corner Utilities */}
        <div className="flex items-center space-x-1.5 md:space-x-3 lg:space-x-4">
          {/* User Info */}
          {user.isAuthenticated && (
            <div className="hidden sm:flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-100">
              <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px] font-black uppercase">
                {user.name?.charAt(0)}
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-gray-400 leading-tight uppercase tracking-tighter">Cashier</span>
                <span className="text-xs font-black text-blue-700 leading-tight truncate max-w-[80px]">{user.name}</span>
              </div>
            </div>
          )}

          <button className="flex items-center space-x-1.5 md:space-x-2 bg-red-50 text-red-500 px-2 md:px-4 py-1.5 md:py-2 rounded-xl font-bold hover:bg-red-100 transition-colors border border-red-100 flex-shrink-0 group active:scale-95">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
            <span className="hidden lg:inline text-[11px] md:text-xs lg:text-sm font-extrabold ">
              Close Order
            </span>
          </button>

          <button
            onClick={handleLogout}
            title="Sign Out"
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-red-500 hover:bg-red-50 hover:shadow-md transition-all flex-shrink-0 border border-gray-50 active:scale-95"
          >
            <Power size={18} />
          </button>
        </div>
      </div>

      {/* Sidebar Menu */}
      <SidebarMenu isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
};

export default TopBar;
