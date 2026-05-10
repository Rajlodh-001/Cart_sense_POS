"use client";
import React from "react";
import { XCircle, CheckCircle2, Loader2 } from "lucide-react";
import LucideIconComponent from "@/components/shared/LucideIcon";

interface FormLayoutProps {
  title: string;
  subtitle?: string;
  icon?: any;
  iconName?: string;
  primaryColor?: string;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  isPending?: boolean;
  submitLabel: string;
  submitIcon?: any;
  children: React.ReactNode;
  footerExtra?: React.ReactNode;
}

export const FormLayout: React.FC<FormLayoutProps> = ({
  title,
  subtitle,
  icon: Icon,
  iconName,
  primaryColor = "#111827",
  onClose,
  onSubmit,
  isPending = false,
  submitLabel,
  submitIcon: SubmitIcon = CheckCircle2,
  children,
  footerExtra,
}) => {
  return (
    <div className="flex flex-col h-full bg-white relative font-sans overflow-hidden">
      {/* 🌌 UNIFIED HEADER */}
      <div className="p-8 md:p-10 border-b border-gray-50 flex items-center justify-between bg-white/80 backdrop-blur-md relative z-50">
        <div className="flex items-center gap-6 md:gap-8">
          <div 
            className="w-14 h-14 md:w-16 md:h-16 rounded-[1.5rem] md:rounded-[1.75rem] flex items-center justify-center shadow-2xl relative group/icon transition-all duration-500"
            style={{ 
              backgroundColor: primaryColor,
              color: 'white',
              boxShadow: primaryColor ? `0 15px 30px ${primaryColor}30` : '0 15px 40px rgba(0,0,0,0.1)'
            }}
          >
            {Icon ? (
              <Icon size={28} strokeWidth={2.5} className="group-hover/icon:rotate-12 transition-transform duration-700" />
            ) : iconName ? (
              <LucideIconComponent
                name={iconName}
                size={28}
                strokeWidth={2.5}
                className="group-hover/icon:rotate-12 transition-transform duration-700"
              />
            ) : null}
            <div className="absolute inset-0 bg-white/10 blur-2xl opacity-0 group-hover/icon:opacity-100 transition-opacity" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
              {title}
            </h2>
            {subtitle && (
              <h4 className="text-[10px] md:text-[11px] font-black text-gray-400 uppercase tracking-[0.4em] mt-1 md:mt-2">
                {subtitle}
              </h4>
            )}
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:text-red-500 transition-all border border-gray-100"
        >
          <XCircle size={20} />
        </button>
      </div>

      {/* 🚀 SCROLLABLE BODY */}
      <div className="flex-1 overflow-y-auto custom-scrollbar bg-gray-50/30 p-6 md:p-10 lg:p-16">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </div>

      {/* 🚀 UNIFIED FOOTER */}
      <div className="p-8 md:p-10 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between bg-white relative z-50 gap-6">
        <div className="flex items-center gap-4">
          {footerExtra || (
            <>
              <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
                <CheckCircle2 size={24} />
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                Awaiting deployment to system
              </p>
            </>
          )}
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 md:flex-none px-8 py-5 text-[11px] font-black uppercase tracking-[0.3em] text-gray-400 hover:text-red-500 transition-colors"
          >
            Discard
          </button>
          <button
            onClick={onSubmit}
            disabled={isPending}
            className="flex-1 md:flex-none px-12 md:px-16 py-5 md:py-6 bg-gray-900 text-white rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.3em] shadow-[0_15px_40px_rgba(0,0,0,0.1)] hover:bg-purple-600 hover:shadow-purple-500/20 transition-all active:scale-95 flex items-center justify-center gap-4 disabled:opacity-50"
          >
            {isPending ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <SubmitIcon size={18} strokeWidth={3} />
            )}
            {submitLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
