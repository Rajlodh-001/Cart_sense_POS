import React from 'react';
import { 
  LayoutDashboard, 
  TrendingUp, 
  PieChart, 
  Box, 
  Users, 
  Settings, 
  LogOut, 
  ChevronDown, 
  X 
} from 'lucide-react';
import Image from 'next/image';

const menuItems = [
  { name: 'Point of Sales', icon: LayoutDashboard, active: true },
  { name: 'Activity', icon: TrendingUp, active: false },
  { name: 'Report', icon: PieChart, active: false },
  { name: 'Inventory', icon: Box, active: false },
  { name: 'Teams', icon: Users, active: false },
  { name: 'Settings', icon: Settings, active: false },
];

const Sidebar = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <aside className={`
      fixed inset-y-0 left-0 z-50 w-72 bg-white transition-transform duration-300 
      ${isOpen ? "translate-x-0" : "-translate-x-full"} 
      md:relative md:translate-x-0 
    `}>
      
      {/* 1. USER PROFILE HEADER */}
      <div className="flex items-center justify-between bg-gray-50 rounded-full p-2 pl-3 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
            {/* Replace with your actual user image */}
            <div className="w-full h-full bg-orange-200 flex items-center justify-center text-xs">👤</div>
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-800 leading-tight">Jelly Grande</h4>
            <p className="text-[10px] text-gray-400">Cashier</p>
          </div>
        </div>
        <div className="flex items-center gap-1 pr-2">
          <ChevronDown className="w-4 h-4 text-gray-400" />
          <button onClick={onClose} className="md:hidden p-1 rounded-full bg-red-50">
            <X className="w-4 h-4 text-red-500" />
          </button>
        </div>
      </div>

      {/* 2. NAVIGATION MENU */}
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <div
            key={item.name}
            className={`
              flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition-all
              ${item.active 
                ? 'bg-blue-50 text-blue-600 shadow-sm' 
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'}
            `}
          >
            <div className={`
              p-2 rounded-full 
              ${item.active ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400'}
            `}>
              <item.icon className="w-5 h-5" />
            </div>
            <span className="font-semibold text-sm">{item.name}</span>
          </div>
        ))}
      </nav>

      {/* 3. LOG OUT SECTION */}
      <div className="mt-auto">
        <div className="flex items-center justify-between bg-gray-50 rounded-full p-2 pl-6 group cursor-pointer hover:bg-red-50 transition-colors">
          <span className="text-sm font-bold text-gray-800 group-hover:text-red-600">Log Out</span>
          <div className="bg-red-500 text-white p-2 rounded-full shadow-lg shadow-red-200">
            <LogOut className="w-5 h-5 rotate-180" />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;