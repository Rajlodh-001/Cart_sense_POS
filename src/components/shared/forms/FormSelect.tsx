import React from "react";
import { LucideIcon, ChevronDown } from "lucide-react";

interface Option {
  value: string;
  label: string;
}

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  icon?: LucideIcon;
  options: Option[];
  error?: string;
  description?: string;
  placeholder?: string;
}

export const FormSelect: React.FC<FormSelectProps> = ({ 
  label, 
  icon: Icon, 
  options, 
  error, 
  description, 
  placeholder,
  className = "", 
  ...props 
}) => (
  <div className="flex flex-col gap-2.5 group/field w-full animate-in fade-in duration-500">
    {/* Anti-Gravity Label Strategy */}
    <div className="flex items-center justify-between px-2">
      <label className="text-[11px] font-black text-gray-900 uppercase tracking-widest flex items-center gap-2 group-focus-within/field:text-purple-600 transition-colors">
        {label} {props.required && <span className="text-purple-500 font-bold">*</span>}
      </label>
      {error && <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">{error}</span>}
    </div>

    {/* Primary Select Plane: Standardized with py-4 px-6 padding */}
    <div className="relative group/select">
      <select
        {...props}
        className={`
          w-full px-6 py-4 
          bg-white 
          border-2 border-gray-100 
          rounded-2xl 
          font-bold text-gray-900 
          outline-none 
          appearance-none
          shadow-sm
          group-hover/select:border-gray-200
          focus:border-purple-500 
          transition-all duration-300 
          ${className} 
          ${error ? 'border-red-200 bg-red-50/10' : ''}
        `}
      >
        <option value="" disabled className="text-gray-300">{placeholder || 'Select an option...'}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-white text-gray-900 font-bold p-4">
            {option.label}
          </option>
        ))}
      </select>
      
      {/* Product Aesthetic: Resource Icon + High-Intensity Chevron on the Right */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-4 pointer-events-none">
        {Icon && (
          <div className="pr-4 border-r border-gray-100 transition-colors group-focus-within/field:border-purple-100">
             <Icon size={18} strokeWidth={2.5} className="text-gray-200 group-focus-within/field:text-purple-600 transition-colors" />
          </div>
        )}
        <ChevronDown size={14} strokeWidth={4} className="text-gray-400 group-focus-within/field:text-purple-600 transition-transform group-focus-within/field:rotate-180 duration-500" />
      </div>
    </div>

    {description && (
      <p className="text-[10px] font-black text-gray-400 pl-2 leading-relaxed uppercase tracking-tighter opacity-70">
        {description}
      </p>
    )}
  </div>
);
