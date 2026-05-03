"use client";

import React, { useEffect } from "react";
import { AlertCircle, RotateCcw, Home, ShieldAlert } from "lucide-react";
import Link from "next/link";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Admin Dashboard Error:", error);
  }, [error]);

  const getPageContext = () => {
    const path = typeof window !== 'undefined' ? window.location.pathname : '';
    if (path.includes('/admin/users')) return { title: "Staff Directory Failure", desc: "The identity matrix for your staff records encountered an anomaly." };
    if (path.includes('/admin/inventory')) return { title: "Inventory Matrix Interrupted", desc: "The catalog system failed to synchronize your product data." };
    if (path.includes('/admin/tables')) return { title: "Seating Infrastructure Error", desc: "The physical layout engine could not render the floor plan." };
    if (path.includes('/admin/settings')) return { title: "Configuration Engine Failure", desc: "The global system preferences encountered a state error." };
    return { title: "System Interruption", desc: "The administrative matrix encountered an unexpected state." };
  };

  const context = getPageContext();

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6">
      <div className="max-w-2xl w-full text-center space-y-10 animate-in fade-in zoom-in duration-700">
        
        {/* Visual Identity Focal Point */}
        <div className="relative inline-block">
          <div className="w-32 h-32 bg-red-50 rounded-[2.5rem] flex items-center justify-center text-red-500 shadow-xl shadow-red-100/50 relative z-10 mx-auto">
            <ShieldAlert size={64} strokeWidth={1.5} />
          </div>
          <div className="absolute inset-0 bg-red-500/20 blur-3xl rounded-full scale-150 animate-pulse" />
        </div>

        <div className="space-y-4">
          <h1 className="text-5xl font-black text-gray-900 tracking-tight">{context.title}</h1>
          <p className="text-gray-500 text-lg font-medium max-w-md mx-auto">
            {context.desc} Our containment systems have isolated the issue.
          </p>
        </div>

        {/* Error Detail (Ghosted) */}
        <div className="bg-gray-50 rounded-[2rem] p-8 border border-gray-100 text-left relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle size={18} className="text-red-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Diagnostic Signature</span>
          </div>
          <code className="text-xs font-mono text-gray-600 block break-all leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
            {error.message || "Unknown anomaly detected in the administrative layer."}
          </code>
          {error.digest && (
            <p className="mt-4 text-[9px] font-black text-gray-300 uppercase tracking-widest">
              Trace ID: {error.digest}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => reset()}
            className="flex items-center gap-3 px-10 py-5 bg-gray-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-gray-200 hover:bg-red-500 hover:shadow-red-100 transition-all active:scale-95 group"
          >
            <RotateCcw size={18} className="group-hover:rotate-180 transition-transform duration-500" />
            Restore Matrix
          </button>
          
          <Link
            href="/admin"
            className="flex items-center gap-3 px-10 py-5 bg-white border-2 border-gray-100 text-gray-600 rounded-2xl font-bold text-xs uppercase tracking-[0.1em] hover:bg-gray-50 hover:border-gray-200 transition-all active:scale-95"
          >
            <Home size={18} />
            Return to Core
          </Link>
        </div>

        <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.4em] pt-8">
          CartSens POS • Fail-Safe Protocl v2.0
        </p>
      </div>
    </div>
  );
}
