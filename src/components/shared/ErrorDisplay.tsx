"use client";
import React from "react";
import { AlertCircle, RotateCcw, Home, ShieldAlert } from "lucide-react";
import Link from "next/link";

interface ErrorDisplayProps {
  title: string;
  description: string;
  error: Error & { digest?: string };
  reset: () => void;
  homeLink?: string;
  homeLabel?: string;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  title,
  description,
  error,
  reset,
  homeLink = "/admin",
  homeLabel = "Go Back to Dashboard",
}) => {
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
          <h1 className="text-5xl font-black text-gray-900 tracking-tight">{title}</h1>
          <p className="text-gray-500 text-lg font-medium max-w-md mx-auto">
            {description} Our containment systems have isolated the issue.
          </p>
        </div>

        {/* Error Detail (Ghosted) */}
        <div className="bg-gray-50 rounded-[2rem] p-8 border border-gray-100 text-left relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle size={18} className="text-red-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Diagnostic Signature</span>
          </div>
          <code className="text-xs font-mono text-gray-600 block break-all leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
            {error.message || "Unknown anomaly detected in the system layer."}
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
            Restore Application State
          </button>
          
          <Link
            href={homeLink}
            className="flex items-center gap-3 px-10 py-5 bg-white border-2 border-gray-100 text-gray-600 rounded-2xl font-bold text-xs uppercase tracking-[0.1em] hover:bg-gray-50 hover:border-gray-200 transition-all active:scale-95"
          >
            <Home size={18} />
            {homeLabel}
          </Link>
        </div>

        <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.4em] pt-8">
          CartSens POS • Fail-Safe Protocol v2.0
        </p>
      </div>
    </div>
  );
};
