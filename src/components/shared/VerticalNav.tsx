"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight, Search, LucideIcon } from "lucide-react";

export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
}

interface VerticalNavProps {
  items: NavItem[];
  title?: string;
  subtitle?: string;
}

const VerticalNav: React.FC<VerticalNavProps> = ({ items }) => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={`relative flex flex-col h-full bg-white border-r border-gray-100 p-6 flex-shrink-0 justify-between transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-24 items-center" : "w-80"
      }`}
    >
      {/* Collapse Toggle */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-7 w-8 h-8 bg-white border border-gray-100 rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-all text-gray-400 hover:text-blue-600 z-30"
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* --- TOP SECTION --- */}
      <div className="space-y-8 w-full">
        {/* Search Bar - only visible when expanded */}
        {!isCollapsed ? (
          <div className="relative group">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors"
              size={20}
            />
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-gray-50 text-gray-700 rounded-2xl pl-12 pr-4 py-4 outline-none focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all shadow-sm"
            />
          </div>
        ) : (
          <div className="flex justify-center">
            <Search
              size={24}
              className="text-gray-400 cursor-pointer hover:text-blue-500 transition-colors"
            />
          </div>
        )}

        {/* Navigation Menu */}
        <nav className="space-y-4">
          {items.map((item) => {
            const isActive = pathname?.startsWith(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.id}
                href={item.href}
                className={`flex items-center transition-all duration-200 rounded-2xl group relative
                  ${isCollapsed ? "justify-center p-4" : "px-6 py-5"}
                  ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                      : "bg-white text-gray-600 hover:bg-gray-50 hover:pl-7"
                  }
                `}
              >
                <Icon
                  size={isCollapsed ? 24 : 22}
                  className={`flex-shrink-0 ${isActive ? "text-white" : "text-gray-400 group-hover:text-blue-600"}`}
                />

                {!isCollapsed && (
                  <span className="ml-4 font-semibold text-lg whitespace-nowrap">
                    {item.label}
                  </span>
                )}

                {/* Tooltip for Collapsed State */}
                {isCollapsed && (
                  <div className="absolute left-full ml-6 px-4 py-2 bg-gray-900/90 text-white text-sm font-medium rounded-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-all shadow-xl whitespace-nowrap z-[100] backdrop-blur-sm">
                    {item.label}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* --- FOOTER SECTION --- */}
      {!isCollapsed ? (
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-blue-600 font-bold text-xl flex items-center gap-2 cursor-default">
              CartSens{" "}
              <span className="text-gray-400 font-normal text-sm">
                • POS System
              </span>
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              The dreamy taste & magic of sweet moments in every bite from our
              bakery.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 text-[10px] font-bold text-gray-500">
            <span className="px-3 py-2 rounded-full border border-gray-200 bg-white cursor-default">
              © 2024. CartSens
            </span>
            <span className="px-3 py-2 rounded-full bg-gray-50">Contacts</span>
            <span className="px-3 py-2 rounded-full bg-gray-50">Help</span>
          </div>
        </div>
      ) : (
        <div className="flex justify-center text-blue-600 font-black text-xs border border-blue-100 w-10 h-10 items-center rounded-xl bg-blue-50">
          CS
        </div>
      )}
    </div>
  );
};

export default VerticalNav;
