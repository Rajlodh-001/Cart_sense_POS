import React from "react";
import { 
  LayoutDashboard, 
  ShoppingCart, 
  BarChart2, 
  Package, 
  Users, 
  Settings, 
  LogOut 
} from "lucide-react";

const SidebarPO = () => {
  return (
    <div className="flex flex-col h-full p-4">
      {/* Branding / Logo Area */}
      <div className="flex items-center gap-3 px-2 mb-10 mt-2">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
          <ShoppingCart size={24} />
        </div>
        <span className="text-xl font-bold text-slate-800 tracking-tight">POS System</span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-2">
        <NavItem icon={<LayoutDashboard size={20} />} label="Point of Sales" active />
        <NavItem icon={<BarChart2 size={20} />} label="Activity" />
        <NavItem icon={<Package size={20} />} label="Inventory" />
        <NavItem icon={<Users size={20} />} label="Customers" />
        <NavItem icon={<Settings size={20} />} label="Settings" />
      </nav>

      {/* Bottom Profile & Logout Section */}
      <div className="border-t border-slate-100 pt-4 mt-auto">
        <div className="flex items-center gap-3 p-2 mb-4">
          <div className="w-10 h-10 rounded-full bg-slate-200" />
          <div className="flex flex-col">
            <span className="text-sm font-bold text-slate-700">Admin User</span>
            <span className="text-xs text-slate-400">Store Manager</span>
          </div>
        </div>
        
        <button className="w-full flex items-center justify-between bg-red-50 text-red-600 p-3 rounded-xl hover:bg-red-100 transition-colors group">
          <span className="font-bold text-sm">Log Out</span>
          <LogOut size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

// Sub-component for clean navigation items
const NavItem = ({ icon, label, active = false }: { icon: any, label: string, active?: boolean }) => (
  <div className={`
    flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200
    ${active 
      ? "bg-blue-600 text-white shadow-md shadow-blue-200 font-semibold" 
      : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"}
  `}>
    {icon}
    <span className="text-sm">{label}</span>
  </div>
);

export default SidebarPO;