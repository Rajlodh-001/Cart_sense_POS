"use client";

import React, { useEffect, memo } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useLogout } from "@/hooks/useAuth";
import {
  X,
  ShoppingCart,
  Activity,
  BarChart3,
  Package,
  Users,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";
import Portal from "./Portal";

export type ViewId =
  | "pos"
  | "activity"
  | "admin"
  | "report"
  | "inventory"
  | "teams"
  | "settings";

interface SidebarMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems: {
  label: string;
  icon: typeof ShoppingCart;
  id: ViewId;
  href: string;
}[] = [
  { label: "Point of Sales", icon: ShoppingCart, id: "pos", href: "/pos" },
  { label: "Activity", icon: Activity, id: "activity", href: "/activity" },
  { label: "Admin Panel", icon: Settings, id: "admin", href: "/admin/inventory" },
  { label: "Report", icon: BarChart3, id: "report", href: "#" },
  { label: "Inventory", icon: Package, id: "inventory", href: "#" },
  { label: "Teams", icon: Users, id: "teams", href: "#" },
  { label: "Settings", icon: Settings, id: "settings", href: "#" },
];

const SidebarMenu: React.FC<SidebarMenuProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const pathname = usePathname();
  const logoutMutation = useLogout();

  // ESC key to close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const handleNavClick = (href: string) => {
    if (href !== "#") {
      router.push(href);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Portal>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-[999] backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Sidebar Panel */}
      <div
        className="fixed top-0 left-0 h-full w-[320px] bg-white z-[1000] shadow-2xl flex flex-col animate-slideIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ─── User Profile Header ─── */}
        <div className="flex items-center justify-between px-6 pt-8 pb-6">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-200 ring-4 ring-blue-50">
              R
            </div>
            {/* User Info */}
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-gray-900 text-base tracking-tight">
                  Raj Lodh
                </span>
                <ChevronDown size={14} className="text-gray-400" />
              </div>
              <span className="text-xs text-blue-600 font-bold uppercase tracking-wider">
                Store Manager
              </span>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-2xl bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all border border-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* ─── Navigation Links ─── */}
        <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
          <p className="px-4 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">
            Main Menu
          </p>
          {menuItems.map((item) => {
            const isActive = pathname?.startsWith(
              item.href === "#" ? "___" : item.href,
            );
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.href)}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-lg font-bold transition-all duration-200 group
                  ${
                    isActive
                      ? "bg-blue-600 text-white shadow-xl shadow-blue-200 scale-[1.02]"
                      : "text-gray-500 hover:bg-gray-50 hover:text-blue-600"
                  }
                `}
              >
                <div className={`p-2 rounded-xl transition-colors ${isActive ? "bg-white/10" : "bg-gray-50 group-hover:bg-blue-50"}`}>
                  <Icon
                    size={22}
                    className={`transition-colors ${
                      isActive ? "text-white" : "text-gray-400 group-hover:text-blue-600"
                    }`}
                  />
                </div>
                <span className="tracking-tight">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* ─── Footer: Logout ─── */}
        <div className="px-4 pb-8 pt-4">
          <div className="mx-2 border-t border-gray-100 mb-6" />
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-between px-6 py-4 rounded-2xl bg-red-50 text-red-600 hover:bg-red-100 transition-all group font-bold"
          >
            <div className="flex items-center gap-3">
              <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-lg">Sign Out</span>
            </div>
            <ChevronDown size={18} className="-rotate-90 opacity-50" />
          </button>
        </div>
      </div>

      {/* Slide-in animation */}
      <style jsx global>{`
        @keyframes slideIn {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slideIn {
          animation: slideIn 0.25s ease-out;
        }
      `}</style>
    </Portal>
  );
};

export default memo(SidebarMenu);
