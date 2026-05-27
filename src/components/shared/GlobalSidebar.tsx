"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  BarChart3,
  Package,
  Users,
  Settings,
  LayoutDashboard,
  ShoppingCart,
  Activity,
  Map,
  X,
  LogOut,
  ChevronRight,
  ChevronDown,
  ShieldCheck,
  Zap,
  MapPin,
  Laptop
} from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useLogout } from "@/hooks/useAuth";
import { useSidebar } from "@/context/SidebarContext";
import { usePermissions } from "@/hooks/usePermissions";

interface GlobalSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const GlobalSidebar: React.FC<GlobalSidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab")?.toLowerCase();

  const user = useSelector((state: RootState) => state.user);
  const logoutMutation = useLogout();
  const { isCollapsed, toggleCollapse } = useSidebar();
  const { hasPermission } = usePermissions();

  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({
    "Inventory & Products": true,
    "User Management": true,
    "Operational Activity": true
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const toggleMenu = (label: string, e: React.MouseEvent) => {
    e.preventDefault();
    setExpandedMenus(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  const navSections = [
    {
      title: "Operations",
      items: [
        { 
          label: "Point of Sale", 
          href: "/pos", 
          icon: ShoppingCart, 
          color: "text-blue-500", 
          bgColor: "bg-blue-50",
          permission: { resource: "order", action: "CREATE" }
        },
        { 
          label: "Operational Activity", 
          href: "/activity", 
          icon: Activity, 
          color: "text-orange-500", 
          bgColor: "bg-orange-50",
          permission: { resource: "order", action: "READ" }
        },
      ],
    },
    {
      title: "Management",
      items: [
        { 
          label: "Admin Overview", 
          href: "/admin/dashboard", 
          icon: LayoutDashboard, 
          color: "text-emerald-500", 
          bgColor: "bg-emerald-50",
          permission: { resource: "dashboard", action: "READ" }
        },
        { 
          label: "Inventory & Products", 
          href: "/admin/inventory", 
          icon: Package, 
          color: "text-purple-500", 
          bgColor: "bg-purple-50",
          permission: { resource: "product", action: "READ" }
        },
        { 
          label: "Tables & Layout", 
          href: "/admin/tables", 
          icon: Map, 
          color: "text-rose-500", 
          bgColor: "bg-rose-50",
          permission: { resource: "table", action: "READ" }
        },
        { 
          label: "Locations", 
          href: "/admin/locations", 
          icon: MapPin, 
          color: "text-amber-500", 
          bgColor: "bg-amber-50",
          permission: { resource: "location", action: "READ" }
        },
        { 
          label: "Devices", 
          href: "/admin/devices", 
          icon: Laptop, 
          color: "text-indigo-500", 
          bgColor: "bg-indigo-50",
          permission: { resource: "location", action: "READ" }
        },
        { 
          label: "User Management", 
          href: "/admin/users", 
          icon: Users, 
          color: "text-blue-600", 
          bgColor: "bg-blue-50",
          permission: { resource: "user", action: "READ" }
        },
      ],
    },
  ];

  const systemItems = [
    { 
      label: "Global Settings", 
      href: "/admin/settings", 
      icon: Settings, 
      color: "text-gray-500", 
      bgColor: "bg-gray-100",
      permission: { resource: "setting", action: "READ" }
    },
  ];

  // Helper to filter items and nested sub-items by capability
  const filterItem = (item: any) => {
    if (!item.permission) return true;
    return hasPermission(item.permission.resource, item.permission.action);
  };

  const filteredNavSections = navSections.map(section => {
    const filteredItems = section.items.filter(filterItem).map((item: any) => {
      if (item.items) {
        return {
          ...item,
          items: item.items.filter(filterItem)
        };
      }
      return item;
    });
    return {
      ...section,
      items: filteredItems
    };
  }).filter(section => section.items.length > 0);

  const filteredSystemItems = systemItems.filter(filterItem);

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] lg:hidden transition-all duration-500"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <div
        className={`
        fixed lg:relative inset-y-0 left-0 z-[101]
        h-full bg-white flex flex-col overflow-hidden font-sans
        transition-all duration-500 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        ${isOpen ? "border-r border-gray-100 shadow-premium" : "border-none"}
        ${isOpen 
          ? (isCollapsed ? "xl:w-24 w-20" : "xl:w-80 w-72") 
          : "w-0 lg:w-0"
        }
      `}
      >
        {/* --- Brand / Header --- */}
        <div className={`p-6 pb-10 flex items-center ${isCollapsed ? "justify-center" : "justify-between"}`}>
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-2xl bg-gray-900 flex items-center justify-center text-white font-black shadow-xl shadow-gray-200 flex-shrink-0">
               CS
             </div>
             {!isCollapsed && (
               <div>
                 <h1 className="text-xl font-black text-gray-900 tracking-tight leading-none">
                   CartSens
                 </h1>
                 <p className="text-[9px] font-black text-blue-600 uppercase tracking-[0.3em] mt-1.5 opacity-80">
                   Enterprise POS
                 </p>
               </div>
             )}
          </div>
          
          {!isCollapsed && (
             <button
               onClick={onClose}
               className="lg:hidden p-3 bg-red-50 text-red-500 rounded-xl border border-red-100 active:scale-95 transition-all"
             >
               <X size={18} />
             </button>
          )}
        </div>

        {/* --- Navigation Sections --- */}
        <div className={`flex-1 overflow-y-auto px-4 pb-8 space-y-10 custom-scrollbar ${isCollapsed ? "flex flex-col items-center" : ""}`}>
          {filteredNavSections.map((section) => (
            <div key={section.title} className={`space-y-3 w-full ${isCollapsed ? "flex flex-col items-center" : ""}`}>
              {!isCollapsed && (
                <p className="px-5 text-[10px] font-black text-gray-300 uppercase tracking-[0.25em]">
                  {section.title}
                </p>
              )}
              <div className="space-y-1.5 w-full">
                {section.items.map((item) => {
                  const isActive = pathname === item.href || (item.href !== "/pos" && pathname?.startsWith(item.href));
                  const Icon = item.icon;
                  const hasSubItems = item.items && item.items.length > 0;
                  const isExpanded = expandedMenus[item.label];

                  return (
                    <div key={item.href} className="w-full">
                      <Link
                        href={item.href}
                        onClick={(e) => {
                          if (hasSubItems && !isCollapsed) {
                            toggleMenu(item.label, e);
                          }
                        }}
                        className={`flex items-center transition-all duration-300 group relative
                          ${isCollapsed ? "justify-center p-3 rounded-2xl" : "justify-between px-5 py-4 rounded-2xl"}
                          ${
                            isActive
                              ? "bg-blue-600 text-white shadow-[0_15px_30px_-5px_rgba(37,99,235,0.25)] scale-[1.02]"
                              : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                          }
                        `}
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`p-2 rounded-xl transition-colors ${isActive ? "bg-white/20" : item.bgColor + " group-hover:bg-white border border-transparent group-hover:border-gray-100"}`}
                          >
                            <Icon
                              size={18}
                              strokeWidth={isActive ? 3 : 2}
                              className={isActive ? "text-white" : item.color}
                            />
                          </div>
                          {!isCollapsed && (
                            <span className={`tracking-tight text-sm ${isActive ? "font-black" : "font-bold"}`}>
                              {item.label}
                            </span>
                          )}
                        </div>
                        
                        {!isCollapsed && (
                          hasSubItems ? (
                            <button onClick={(e) => toggleMenu(item.label, e)} className="p-1 hover:bg-white/10 rounded-lg">
                              <ChevronDown size={14} className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
                            </button>
                          ) : (
                            isActive && <ChevronRight size={14} className="opacity-50" />
                          )
                        )}
                        
                        {isCollapsed && (
                          <div className="absolute left-full ml-4 px-3 py-2 bg-gray-900 text-white text-[10px] font-black uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-[200] shadow-xl">
                            {item.label}
                          </div>
                        )}
                      </Link>

                      {/* INDENTED NESTED SUB-ITEMS */}
                      {hasSubItems && !isCollapsed && isExpanded && (
                        <div className="mt-2 pl-6 space-y-1 border-l-2 border-gray-100 ml-9 transition-all duration-300 animate-in fade-in slide-in-from-top-2 duration-300">
                          {item.items.map((subItem: any) => {
                            const tabParamVal = subItem.href.split("?tab=")[1];
                            const isSubActive = pathname === subItem.href.split("?")[0] && 
                              (tabParamVal ? currentTab === tabParamVal : true);

                            return (
                              <Link
                                key={subItem.href}
                                href={subItem.href}
                                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all
                                  ${isSubActive 
                                    ? "bg-blue-50 text-blue-600 font-black shadow-sm" 
                                    : "text-gray-400 hover:bg-gray-50/50 hover:text-gray-700"}`}
                              >
                                <div className={`w-1.5 h-1.5 rounded-full transition-transform duration-300 ${isSubActive ? "bg-blue-600 scale-125 shadow-premium shadow-blue-400" : "bg-gray-300"}`} />
                                <span>{subItem.label}</span>
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* System Section */}
          {filteredSystemItems.length > 0 && (
            <div className={`space-y-3 w-full ${isCollapsed ? "flex flex-col items-center" : ""}`}>
              {!isCollapsed && (
                <p className="px-5 text-[10px] font-black text-gray-300 uppercase tracking-[0.25em]">
                  Configuration
                </p>
              )}
              <div className="space-y-1.5 w-full">
                {filteredSystemItems.map((item) => {
                  const isActive = pathname?.startsWith(item.href);
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center transition-all duration-300 group relative
                        ${isCollapsed ? "justify-center p-3 rounded-2xl" : "gap-4 px-5 py-4 rounded-2xl"}
                        ${
                          isActive
                            ? "bg-gray-900 text-white shadow-xl scale-[1.02]"
                            : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                        }
                      `}
                    >
                      <div className={`p-2 rounded-xl transition-colors ${isActive ? "bg-white/20" : "bg-gray-100 group-hover:bg-white"}`}>
                        <Icon size={18} className={isActive ? "text-white" : item.color} />
                      </div>
                      {!isCollapsed && (
                        <span className={`tracking-tight text-sm ${isActive ? "font-black" : "font-bold"}`}>
                          {item.label}
                        </span>
                      )}

                      {isCollapsed && (
                        <div className="absolute left-full ml-4 px-3 py-2 bg-gray-900 text-white text-[10px] font-black uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-[200] shadow-xl">
                          {item.label}
                        </div>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>


        {/* --- Footer / User Context --- */}
        <div className={`p-4 bg-gray-50/50 border-t border-gray-100 ${isCollapsed ? "flex flex-col items-center gap-4" : ""}`}>
           {/* Terminal Status Card */}
           {!isCollapsed ? (
              <div className="mb-6 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[9px] font-black text-gray-900 uppercase tracking-widest">Node Healthy</span>
                </div>
                <p className="text-[10px] text-gray-400 font-bold leading-tight uppercase tracking-tighter">
                  Session Active • v2.4.12
                </p>
              </div>
           ) : (
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
           )}

           <button
             onClick={handleLogout}
             className={`flex items-center rounded-2xl bg-red-50 text-red-600 hover:bg-red-100 transition-all font-black group relative
               ${isCollapsed ? "p-3" : "w-full justify-between px-5 py-4 text-sm"}
             `}
           >
             <div className="flex items-center gap-3">
               <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
               {!isCollapsed && <span>Terminate</span>}
             </div>
             {!isCollapsed && <ChevronRight size={14} className="opacity-50" />}
             
             {isCollapsed && (
                <div className="absolute left-full ml-4 px-3 py-2 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-[200] shadow-xl">
                  Sign Out
                </div>
             )}
           </button>
        </div>

        {/* --- Collapse Toggle --- */}
        <button 
          onClick={toggleCollapse}
          className="hidden lg:flex items-center justify-center p-3 bg-white border-t border-gray-100 text-gray-400 hover:text-blue-600 hover:bg-gray-50 transition-all"
        >
          {isCollapsed ? <ChevronRight size={18} /> : <div className="flex items-center gap-2"><ChevronRight className="rotate-180" size={14} /> <span className="text-[10px] font-black uppercase tracking-widest">Collapse Menu</span></div>}
        </button>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #E5E7EB;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #D1D5DB;
        }
      `}</style>
    </>
  );
};

export default GlobalSidebar;
