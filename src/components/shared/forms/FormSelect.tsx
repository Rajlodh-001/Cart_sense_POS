import React from "react";
import { LucideIcon, ChevronDown } from "lucide-react";

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  icon?: LucideIcon;
  options: { value: string; label: string }[];
  error?: string;
}

export const FormSelect: React.FC<FormSelectProps> = ({ label, icon: Icon, options, error, className = "", ...props }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4 flex items-center gap-2">
      {Icon && <Icon size={10} />} {label}
    </label>
    <div className="relative group">
      <select
        {...props}
        className={`w-full px-8 py-5 bg-white border border-gray-100 rounded-[2rem] font-bold focus:border-gray-900 focus:ring-8 focus:ring-gray-900/5 transition-all text-gray-900 outline-none shadow-sm appearance-none ${className} ${error ? 'border-red-500' : ''}`}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-focus-within:text-gray-900 transition-colors">
        <ChevronDown size={18} />
      </div>
      {error && <p className="text-[10px] font-bold text-red-500 mt-1 ml-4">{error}</p>}
    </div>
  </div>
);
