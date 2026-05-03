import React from "react";
import { LucideIcon, Check, X } from "lucide-react";

interface FormToggleProps {
  label: string;
  icon?: LucideIcon;
  checked: boolean;
  onChange: (checked: boolean) => void;
  description?: string;
  required?: boolean;
}

export const FormToggle: React.FC<FormToggleProps> = ({
  label,
  icon: Icon,
  checked,
  onChange,
  description,
  required,
}) => {
  return (
    <div className="flex flex-col gap-3 group/field w-full">
      {/* Label Layer */}
      <div className="flex items-center justify-between px-1">
        <label className="text-[11px] font-black text-gray-900 uppercase tracking-widest flex items-center gap-2 transition-colors">
          {Icon && <Icon size={14} className="text-gray-400 group-focus-within/field:text-gray-900" />}
          {label} {required && <span className="text-red-500 font-bold">*</span>}
        </label>
      </div>

      {/* High-Fidelity Status Card Toggle */}
      <div 
        onClick={() => onChange(!checked)}
        className={`relative w-full h-[72px] rounded-[1.75rem] cursor-pointer transition-all duration-500 border-2 flex items-center px-6 overflow-hidden ${
          checked 
            ? "bg-emerald-50/50 border-emerald-100 shadow-sm" 
            : "bg-gray-50/50 border-gray-100"
        }`}
      >
        {/* Animated Background Pulse */}
        {checked && (
          <div className="absolute inset-0 bg-emerald-500/5 animate-pulse" />
        )}

        <div className="flex-1 flex flex-col">
          <span className={`text-[11px] font-black uppercase tracking-widest transition-colors duration-500 ${checked ? "text-emerald-700" : "text-gray-500"}`}>
            {checked ? "Active" : "Inactive"}
          </span>
          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter mt-0.5">
            {checked ? "User can access the system" : "Access is currently suspended"}
          </span>
        </div>

        {/* The Toggle Switch itself */}
        <div className={`relative w-14 h-8 rounded-full transition-all duration-500 flex items-center p-1 ${
          checked ? "bg-emerald-500 shadow-lg shadow-emerald-500/30" : "bg-gray-200"
        }`}>
          <div className={`w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center transition-all duration-500 transform ${
            checked ? "translate-x-6" : "translate-x-0"
          }`}>
            {checked ? (
              <Check size={12} strokeWidth={4} className="text-emerald-600" />
            ) : (
              <X size={12} strokeWidth={4} className="text-gray-400" />
            )}
          </div>
        </div>
      </div>

      {description && !checked && (
        <p className="text-[10px] font-bold text-red-400/80 pl-1 leading-relaxed uppercase tracking-widest italic animate-in fade-in duration-500">
           Warning: This will suspend all access permissions.
        </p>
      )}
    </div>
  );
};
