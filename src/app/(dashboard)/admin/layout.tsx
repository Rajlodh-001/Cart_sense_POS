"use client";

import VerticalNav, { NavItem } from "@/components/shared/VerticalNav";
import TopBar from "@/components/shared/TopBar";
import { Package, Users, BarChart3, Settings } from "lucide-react";

const adminNavItems: NavItem[] = [
  {
    id: "inventory",
    label: "Inventory",
    href: "/admin/inventory",
    icon: Package,
  },
  { id: "users", label: "Staff Management", href: "/admin/users", icon: Users },
  {
    id: "reports",
    label: "Financial Reports",
    href: "/admin/reports",
    icon: BarChart3,
  },
  {
    id: "settings",
    label: "General Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen w-full bg-[#F8F9FB] overflow-hidden">
      <div className="p-4 pb-0 z-[10]">
        <TopBar />
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Reusable Collapsible Vertical Navigation for Admin */}
        <VerticalNav items={adminNavItems} />

        {/* Page content */}
        <div className="flex-1 flex flex-col h-full min-w-0 transition-all bg-white rounded-tl-3xl shadow-sm overflow-hidden m-2 ml-0">
          {children}
        </div>
      </div>
    </div>
  );
}
