"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { 
  Menu, 
  Calendar, 
  Clock, 
  Power, 
  ChevronRight,
  Bell,
  Search,
  Globe,
  Settings
} from "lucide-react";
import { RootState } from "@/store/store";
import { useLogout } from "@/hooks/useAuth";
import { useSidebar } from "@/context/SidebarContext";

interface UnifiedTopBarProps {
  title?: string;
  subtitle?: string;
  variant?: "admin" | "pos";
  showDateTime?: boolean;
  rightActions?: React.ReactNode;
  onMenuClick?: () => void;
}

const UnifiedTopBar: React.FC<UnifiedTopBarProps> = ({
  title,
  subtitle,
  variant = "pos",
  showDateTime = true,
  rightActions,
  onMenuClick,
}) => {
  const user = useSelector((state: RootState) => state.user);
  const logoutMutation = useLogout();
  const { toggle } = useSidebar();
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    if (showDateTime) {
      const timer = setInterval(() => setCurrentDate(new Date()), 1000);
      return () => clearInterval(timer);
    }
  }, [showDateTime]);

  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "short",
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

  const handleBurgerClick = () => {
    if (onMenuClick) {
      onMenuClick();
    } else {
      toggle();
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6 mt-1 select-none animate-in fade-in slide-in-from-top-4 duration-500">
        <div className="flex items-center gap-3 md:gap-5">
          {/* Hamburger Menu / Back Button */}
          <button
            onClick={handleBurgerClick}
            className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm hover:shadow-md transition-all text-blue-600 flex-shrink-0 border border-gray-100 active:scale-95 group"
          >
            <Menu size={20} className="group-hover:rotate-90 transition-transform duration-300" />
          </button>

          {/* Context Display */}
          <div className="flex items-center gap-4">
             {variant === "admin" ? (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center text-white font-black shadow-lg shadow-gray-200">
                    CS
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] leading-none mb-1">
                      {subtitle || "System Command"}
                    </p>
                    <h2 className="text-sm font-black text-gray-900 leading-none tracking-tight">
                      {title || "Management Hub"}
                    </h2>
                  </div>
                </div>
             ) : (
                <div className="hidden sm:flex flex-col">
                  <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] leading-none mb-1">
                    Terminal Active
                  </p>
                  <h2 className="text-sm font-black text-gray-900 leading-none tracking-tight">
                    {title || "Nexus POS Dashboard"}
                  </h2>
                </div>
             )}
          </div>

          {/* Date/Time Info - Desktop Only */}
          {showDateTime && (
            <div className="hidden lg:flex items-center gap-3">
              <div className="h-6 w-[1px] bg-gray-100 mx-2" />
              <div className="flex items-center gap-2.5 bg-white px-4 py-2 rounded-xl border border-gray-100 shadow-sm transition-all hover:shadow-md">
                <Calendar size={14} className="text-blue-500" />
                <span className="font-black text-gray-700 text-[11px] uppercase tracking-wider">
                  {formattedDate}
                </span>
              </div>
              <div className="flex items-center gap-2.5 bg-white px-4 py-2 rounded-xl border border-gray-100 shadow-sm transition-all hover:shadow-md">
                <Clock size={14} className="text-blue-500" />
                <span className="font-black text-gray-700 text-[11px] uppercase tracking-wider">
                  {formattedTime}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Right Utilities */}
        <div className="flex items-center gap-3 md:gap-4">
          {rightActions}

          {/* Search Bar - Desktop Admin */}
          {variant === "admin" && (
            <div className="hidden md:flex relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={16} />
              <input 
                type="text" 
                placeholder="Global Search..."
                className="pl-10 pr-4 py-2.5 bg-gray-50 border border-transparent rounded-xl text-xs font-bold focus:bg-white focus:border-blue-100 outline-none transition-all w-48 focus:w-64"
              />
            </div>
          )}

          {/* User Profile */}
          <div className="flex items-center gap-3 bg-white p-1.5 pr-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-default group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-[11px] font-black uppercase shadow-lg shadow-blue-100 group-hover:scale-105 transition-transform">
              {user.name?.charAt(0) || "U"}
            </div>
            <div className="hidden md:flex flex-col">
              <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">
                {user.role?.name || "Access Level"}
              </span>
              <span className="text-xs font-black text-gray-900 leading-none truncate max-w-[100px]">
                {user.name || "User"}
              </span>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            title="Sign Out"
            className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-red-500 hover:bg-red-50 hover:text-red-600 hover:shadow-md transition-all border border-gray-100 active:scale-95"
          >
            <Power size={18} />
          </button>
        </div>
      </div>
    </>
  );
};

export default UnifiedTopBar;
