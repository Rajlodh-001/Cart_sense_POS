"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  BarChart3, 
  Package, 
  Users, 
  Settings, 
  LayoutDashboard, 
  Monitor, 
  ShoppingBag,
  Map,
  ArrowLeft
} from "lucide-react";

const AdminSidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    {
      label: "Overview",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
      color: "text-blue-500",
    },
    {
      label: "Inventory",
      href: "/admin/inventory",
      icon: Package,
      color: "text-orange-500",
    },
    {
      label: "Tables & Zones",
      href: "/admin/tables",
      icon: Map,
      color: "text-emerald-500",
    },
    {
      label: "User Management",
      href: "/admin/users",
      icon: Users,
      color: "text-purple-500",
    },
    {
      label: "Store Settings",
      href: "/admin/settings",
      icon: Settings,
      color: "text-gray-500",
    },
  ];

  return (
    <div className="w-85 h-full bg-white border-r border-gray-100 flex flex-col p-10 overflow-y-auto theme-admin font-sans shadow-premium z-30">
      {/* Brand / Title */}
      <div className="mb-14 px-2 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Admin</h1>
          <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mt-1.5 opacity-80">Management Panel</p>
        </div>
        <Link 
          href="/pos"
          className="p-4 bg-gray-50 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-full transition-all border border-gray-100 group shadow-sm hover:shadow-md"
          title="Back to POS"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1.5 transition-transform" />
        </Link>
      </div>

      {/* Main Nav */}
      <nav className="flex-1 space-y-4">
        <p className="px-6 text-[10px] font-black text-gray-300 uppercase tracking-[0.25em] mb-8">Core Management</p>
        {menuItems.map((item) => {
          const isActive = pathname?.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-5 px-6 py-5 rounded-full transition-all duration-300 group
                ${isActive 
                  ? "bg-blue-600 text-white shadow-[0_20px_40px_-10px_rgba(37,99,235,0.3)] scale-[1.02]" 
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"}
              `}
            >
              <div className={`p-2.5 rounded-full transition-colors ${isActive ? "bg-white/20" : "bg-gray-100 group-hover:bg-white"}`}>
                <Icon size={18} strokeWidth={isActive ? 3 : 2} className={isActive ? "text-white" : item.color} />
              </div>
              <span className={`tracking-tight text-sm ${isActive ? "font-black" : "font-bold"}`}>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* System Health / Status */}
      <div className="mt-14 p-8 bg-gray-50 rounded-[3rem] border border-gray-100/50 shadow-inner group transition-all hover:bg-white hover:shadow-premium">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-2.5 h-2.5 rounded-full bg-success animate-pulse shadow-sm shadow-success/50" />
          <span className="text-[10px] font-black text-gray-900 uppercase tracking-widest">System Online</span>
        </div>
        <p className="text-[11px] text-gray-500 font-bold leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
          Management services active. Cloud sync completed 2 mins ago.
        </p>
      </div>
    </div>
  );
};

export default AdminSidebar;
