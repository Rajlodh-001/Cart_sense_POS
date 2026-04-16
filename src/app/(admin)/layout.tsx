"use client";
import React, { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Menu } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-full bg-[#f8f9fb] text-gray-900 overflow-hidden theme-admin font-sans">
      {/* Persistent / Responsive Sidebar */}
      <AdminSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />

      {/* Content Area */}
      <main className="flex-1 overflow-hidden relative flex flex-col">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-6 md:px-10 flex-shrink-0">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-3 bg-gray-50 text-gray-400 hover:text-primary rounded-xl border border-gray-100 shadow-sm"
            >
              <Menu size={20} />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center text-white font-black">
                CS
              </div>
              <div className="hidden sm:block">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Store Location</p>
                <h2 className="text-sm font-bold text-gray-900 leading-none">Main Street Bakery (NYC)</h2>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex flex-col items-end">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Active Session</p>
              <h2 className="text-sm font-bold text-gray-900 leading-none">Admin Mode</h2>
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-100 border-2 border-white shadow-sm flex items-center justify-center text-blue-600 font-bold">
              RL
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-auto p-6 md:p-10 custom-scrollbar">
          {children}
        </div>
      </main>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
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
    </div>
  );
}
