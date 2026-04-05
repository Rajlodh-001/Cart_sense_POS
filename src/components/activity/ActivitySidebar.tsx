"use client";
import React from 'react';
import { 
  LayoutDashboard, 
  TrendingUp, 
  PieChart, 
  Box, 
  Users, 
  Settings, 
  LogOut, 
  ChevronDown 
} from 'lucide-react';

const ActivitySidebar = () => {
  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-100 p-4 w-72 flex-shrink-0">
      
      {/* 1. USER PROFILE (Top) */}
      <div className="flex items-center justify-between bg-gray-50 rounded-full p-2 pl-3 mb-10 cursor-pointer hover:bg-gray-100 transition">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-orange-100 border border-orange-200 flex items-center justify-center overflow-hidden">
             <span className="text-xl">👤</span> {/* Replace with Image if needed */}
          </div>
          <div className="flex flex-col">
            <h4 className="text-sm font-bold text-gray-800 leading-tight">Jelly Grande</h4>
            <p className="text-[10px] text-gray-400 font-medium">Cashier</p>
          </div>
        </div>
        <div className="pr-3">
          <ChevronDown size={16} className="text-gray-400" />
        </div>
      </div>

      {/* 2. NAVIGATION MENU (Middle) */}
      <nav className="flex-1 space-y-2">
        <SidebarLink icon={<LayoutDashboard size={20} />} label="Point of Sales" />
        <SidebarLink icon={<TrendingUp size={20} />} label="Activity" active />
        <SidebarLink icon={<PieChart size={20} />} label="Report" />
        <SidebarLink icon={<Box size={20} />} label="Inventory" />
        <SidebarLink icon={<Users size={20} />} label="Teams" />
        <SidebarLink icon={<Settings size={20} />} label="Settings" />
      </nav>

      {/* 3. LOG OUT (Bottom) */}
      <div className="mt-auto pt-4">
        <div className="flex items-center justify-between bg-gray-50 rounded-full p-2 pl-6 cursor-pointer group hover:bg-red-50 transition-all duration-200">
          <span className="text-sm font-bold text-gray-700 group-hover:text-red-600">Log Out</span>
          <div className="bg-red-500 text-white p-2 rounded-full shadow-lg shadow-red-200 group-hover:scale-105 transition-transform">
            <LogOut size={18} className="rotate-180" />
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Component for Sidebar Links
const SidebarLink = ({ icon, label, active = false }: { icon: any, label: string, active?: boolean }) => (
  <div className={`
    flex items-center gap-4 px-4 py-3.5 rounded-2xl cursor-pointer transition-all duration-200
    ${active 
      ? 'bg-blue-50 text-blue-600 font-bold shadow-sm' 
      : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600'}
  `}>
    <div className={`p-1.5 rounded-full ${active ? 'bg-blue-600 text-white' : 'bg-transparent'}`}>
      {React.cloneElement(icon, { size: active ? 16 : 20 })}
    </div>
    <span className="text-sm">{label}</span>
  </div>
);

export default ActivitySidebar;