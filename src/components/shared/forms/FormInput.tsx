import React from "react";
import { LucideIcon } from "lucide-react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: LucideIcon;
  error?: string;
}

export const FormInput: React.FC<FormInputProps> = ({ label, icon: Icon, error, className = "", ...props }) => (
  <div className="space-y-3 group/field">
    <div className="flex items-center justify-between px-5">
      <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2 group-focus-within/field:text-blue-500 transition-colors">
        {Icon && <Icon size={12} className="opacity-70" />} {label}
      </label>
      {error && <span className="text-[9px] font-bold text-red-500 uppercase tracking-wider animate-pulse">{error}</span>}
    </div>
    <div className="relative">
      <input
        {...props}
        className={`w-full px-10 py-6 bg-white border border-gray-100/80 rounded-[2.5rem] font-bold text-gray-900 placeholder:text-gray-200 outline-none shadow-sm hover:shadow-md focus:shadow-xl focus:shadow-blue-500/5 focus:border-blue-500/20 focus:ring-8 focus:ring-blue-500/5 transition-all duration-300 ${className} ${error ? 'border-red-500 ring-red-500/5' : ''}`}
      />
    </div>
  </div>
);
