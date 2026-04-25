import React from "react";
import { LucideIcon } from "lucide-react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: LucideIcon;
  error?: string;
  description?: string;
}

export const FormInput: React.FC<FormInputProps> = ({ label, icon: Icon, error, description, className = "", ...props }) => (
  <div className="flex flex-col gap-2.5 group/field w-full">
    {/* Product Modal Style Label: Dark, Heavy, Bold */}
    <div className="flex items-center justify-between px-1">
      <label className="text-[11px] font-black text-gray-900 uppercase tracking-widest flex items-center gap-2 group-focus-within/field:text-purple-600 transition-colors">
        {label} {props.required && <span className="text-purple-500 font-bold">*</span>}
      </label>
      {error && <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">{error}</span>}
    </div>

    {/* Primary Input Container: Sharp 2px Border, Clean White */}
    <div className="relative">
      {Icon && (
        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within/field:text-gray-900 transition-colors">
           <Icon size={18} strokeWidth={2.5} />
        </div>
      )}
      <input
        {...props}
        className={`
          w-full ${Icon ? 'pl-16' : 'px-8'} py-4 px-6 
          bg-white 
          border-2 border-gray-100 
          rounded-[1.25rem] 
          font-bold text-gray-900 
          placeholder:text-gray-300 
          outline-none 
          shadow-sm
          focus:border-purple-500 
          hover:border-gray-200
          transition-all duration-300 
          ${className} 
          ${error ? 'border-red-200 bg-red-50/10' : ''}
        `}
      />
    </div>

    {description && (
      <p className="text-[10px] font-black text-gray-400 pl-1 leading-relaxed uppercase tracking-tighter opacity-70">
        {description}
      </p>
    )}
  </div>
);
