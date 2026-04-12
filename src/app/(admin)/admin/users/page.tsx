"use client";
import React from "react";
import { Users, Plus, ShieldCheck, UserPlus } from "lucide-react";

export default function UsersPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Staff & Roles</h2>
          <p className="text-gray-500 font-medium mt-1 text-sm">Manage employee accounts, permissions, and security roles.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-4 bg-gray-900 text-white rounded-[1.5rem] font-bold shadow-xl shadow-gray-200 hover:bg-purple-600 hover:shadow-purple-100 transition-all active:scale-95">
          <UserPlus size={20} />
          <span>Invite New User</span>
        </button>
      </div>

      {/* Role Distribution */}
      <div className="flex flex-wrap gap-4">
        {[
          { label: "Admins", count: 2, color: "text-purple-600", bg: "bg-purple-50" },
          { label: "Managers", count: 4, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Cashiers", count: 12, color: "text-orange-600", bg: "bg-orange-50" },
          { label: "Kitchen Staff", count: 8, color: "text-emerald-600", bg: "bg-emerald-50" },
        ].map((role) => (
          <div key={role.label} className={`px-6 py-3 ${role.bg} rounded-2xl flex items-center gap-4 border border-transparent hover:border-current transition-all cursor-default`}>
             <span className={`text-xl font-black ${role.color}`}>{role.count}</span>
             <span className="text-sm font-bold text-gray-600">{role.label}</span>
          </div>
        ))}
      </div>

      {/* Placeholder Directory */}
      <div className="p-10 bg-white rounded-[3rem] border border-gray-100 shadow-sm flex flex-col items-center justify-center min-h-[400px]">
        <div className="flex -space-x-4 mb-8">
           {[1,2,3,4].map(i => (
             <div key={i} className="w-16 h-16 rounded-[1.5rem] bg-gray-100 border-4 border-white flex items-center justify-center text-gray-300 font-bold text-xl ring-1 ring-gray-100">
               ?
             </div>
           ))}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Team Directory Management</h3>
        <p className="text-gray-400 max-w-sm text-center font-medium">
          Control who can access the terminal, manage inventory, or view financial reports. Role-based access control (RBAC) is built into the core.
        </p>
      </div>
    </div>
  );
}
