"use client";

import React, { useEffect } from "react";
import { AlertTriangle, RefreshCw, ShoppingCart, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Dashboard/POS Error:", error);
  }, [error]);

  const getPageContext = () => {
    const path = typeof window !== 'undefined' ? window.location.pathname : '';
    if (path.includes('/pos')) return { title: "POS Terminal Interrupted", desc: "We've encountered a temporary synchronization issue with the sales terminal." };
    if (path.includes('/activity')) return { title: "Activity Feed Suspended", desc: "The real-time transaction stream encountered a buffer overflow." };
    if (path.includes('/form')) return { title: "Data Entry Failure", desc: "The submission gateway is temporarily unresponsive." };
    return { title: "Dashboard Sync Failure", desc: "We've encountered a temporary synchronization issue. Your data is safe." };
  };

  const context = getPageContext();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 font-sans">
      <div className="max-w-xl w-full bg-white rounded-[3rem] shadow-premium p-12 text-center space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
        
        {/* Animated Warning Icon */}
        <div className="w-24 h-24 bg-amber-50 rounded-[2rem] flex items-center justify-center text-amber-500 mx-auto relative group">
          <AlertTriangle size={48} className="relative z-10 group-hover:scale-110 transition-transform" />
          <div className="absolute inset-0 bg-amber-200 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">{context.title}</h1>
          <p className="text-gray-500 font-medium leading-relaxed">
            {context.desc} The terminal needs to be restored.
          </p>
        </div>

        {/* Action Matrix */}
        <div className="grid grid-cols-1 gap-4">
          <button
            onClick={() => reset()}
            className="w-full flex items-center justify-center gap-3 py-6 bg-gray-900 text-white rounded-3xl font-black text-sm uppercase tracking-[0.2em] shadow-2xl shadow-gray-200 hover:bg-emerald-600 hover:shadow-emerald-100 transition-all active:scale-[0.98]"
          >
            <RefreshCw size={20} />
            Reset Terminal
          </button>
          
          <div className="flex gap-4">
             <Link
                href="/pos"
                className="flex-1 flex items-center justify-center gap-2 py-5 bg-white border-2 border-gray-100 text-gray-600 rounded-3xl font-bold text-xs uppercase tracking-widest hover:bg-gray-50 transition-all"
             >
                <ShoppingCart size={16} />
                POS Home
             </Link>
             <button
                onClick={() => window.location.reload()}
                className="flex-1 flex items-center justify-center gap-2 py-5 bg-gray-50 text-gray-400 rounded-3xl font-bold text-xs uppercase tracking-widest hover:bg-gray-100 transition-all"
             >
                <ArrowLeft size={16} />
                Hard Reload
             </button>
          </div>
        </div>

        {/* Support Footprint */}
        <div className="pt-6 border-t border-gray-50">
           <p className="text-[9px] font-black text-gray-300 uppercase tracking-[0.5em]">
             Fail-Safe Node Alpha • 0x{error.digest?.slice(0, 8) || "UNKNOWN"}
           </p>
        </div>
      </div>
    </div>
  );
}
