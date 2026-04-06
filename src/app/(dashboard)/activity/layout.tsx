"use client";

import VerticalNav, { NavItem } from "@/components/shared/VerticalNav";
import TopBar from "@/components/shared/TopBar";
import { LayoutDashboard, Table, History } from "lucide-react";

const activityNavItems: NavItem[] = [
  {
    id: "billing",
    label: "Billing Queue",
    href: "/activity/billing",
    icon: LayoutDashboard,
  },
  { id: "tables", label: "Tables", href: "/activity/tables", icon: Table },
  {
    id: "history",
    label: "Order History",
    href: "/activity/history",
    icon: History,
  },
];

export default function ActivityLayout({
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
        {/* Reusable Collapsible Vertical Navigation */}
        <VerticalNav items={activityNavItems} />

        {/* Page content */}
        <div className="flex-1 flex flex-col h-full min-w-0 transition-all bg-white rounded-tr-3xl shadow-sm overflow-hidden mx-2 ml-0">
          {children}
        </div>
      </div>
    </div>
  );
}
