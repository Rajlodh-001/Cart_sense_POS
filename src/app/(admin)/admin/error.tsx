"use client";

import React, { useEffect } from "react";
import { AlertCircle, RefreshCcw, ShieldAlert, Home } from "lucide-react";
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
    console.error("Admin Domain Error:", error);
  }, [error]);

  return (
    <div className="min-h-[80vh] w-full flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-700">
      <div className="relative mb-10">
        <div className="w-24 h-24 rounded-[2rem] bg-red-50 flex items-center justify-center text-red-500 shadow-2xl shadow-red-500/10 relative z-10">
          <ShieldAlert size={48} strokeWidth={2.5} className="animate-pulse" />
        </div>
        <div className="absolute inset-0 bg-red-500/20 blur-3xl rounded-full scale-150 animate-pulse opacity-50" />
      </div>

      <div className="max-w-md space-y-4">
        <h1 className="text-4xl font-black text-gray-900 tracking-tight">
          System Breach
        </h1>
        <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.4em]">
          Critical Administrative Failure
        </p>
        
        <div className="mt-8 p-6 bg-gray-50 rounded-[2rem] border border-gray-100 text-left relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-red-500" />
          <div className="flex items-start gap-4">
            <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={18} />
            <div>
              <p className="text-[11px] font-black text-red-600 uppercase tracking-widest mb-1">
                Diagnostic Report
              </p>
              <p className="text-xs font-bold text-gray-600 leading-relaxed italic">
                {error.message || "An unexpected synchronization error occurred within the admin matrix."}
              </p>
              {error.digest && (
                <p className="text-[10px] font-mono text-gray-400 mt-2 opacity-50">
                  ID: {error.digest}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 pt-8">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto px-10 py-5 bg-gray-900 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-2xl shadow-gray-900/20 hover:bg-red-600 hover:shadow-red-500/20 transition-all active:scale-95 flex items-center justify-center gap-3"
          >
            <RefreshCcw size={16} strokeWidth={3} />
            Initialize Recovery
          </button>
          
          <Link
            href="/admin"
            className="w-full sm:w-auto px-10 py-5 bg-white border border-gray-100 text-gray-900 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-gray-50 transition-all flex items-center justify-center gap-3"
          >
            <Home size={16} strokeWidth={3} />
            Return to Hub
          </Link>
        </div>
      </div>
    </div>
  );
}
