"use client";
import React from "react";
import { LayoutDashboard, BarChart3, TrendingUp, Calendar } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Admin Dashboard</h2>
          <p className="text-gray-500 font-medium mt-1 text-sm">Welcome back. Here's what's happening across your store today.</p>
        </div>
        <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-gray-100 shadow-sm">
           <Calendar size={18} className="text-blue-500 ml-2" />
           <span className="text-sm font-bold text-gray-700 mr-2">Today, April 11</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {[
          { label: "Gross Revenue", value: "$4,280.50", change: "+12%", icon: TrendingUp, color: "blue" },
          { label: "Total Orders", value: "156", change: "+8%", icon: BarChart3, color: "purple" },
          { label: "Avg. Ticket", value: "$27.44", change: "-2%", icon: BarChart3, color: "orange" },
          { label: "Items Sold", value: "482", change: "+15%", icon: TrendingUp, color: "emerald" },
        ].map((card) => (
          <div key={card.label} className="p-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-xl hover:shadow-blue-900/5 transition-all">
             <div className={`absolute top-0 right-0 w-24 h-24 bg-${card.color}-50 rounded-full -mr-10 -mt-10 transition-transform group-hover:scale-110`} />
             <card.icon size={20} className={`text-${card.color}-500 mb-4 relative z-10`} />
             <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-2 mt-2">{card.label}</p>
             <p className="text-3xl font-black text-gray-900 mb-1">{card.value}</p>
             <span className={`text-[10px] font-black ${card.change.startsWith('+') ? 'text-emerald-500' : 'text-red-500'} uppercase`}>{card.change} vs yesterday</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <div className="h-64 bg-white rounded-[3rem] border border-gray-100 shadow-sm flex items-center justify-center border-dashed">
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Revenue Chart Placeholder</p>
         </div>
         <div className="h-64 bg-white rounded-[3rem] border border-gray-100 shadow-sm flex items-center justify-center border-dashed">
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Top Products Placeholder</p>
         </div>
      </div>
    </div>
  );
}
