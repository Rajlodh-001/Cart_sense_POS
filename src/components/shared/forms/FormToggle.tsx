import React from "react";
import { LucideIcon } from "lucide-react";

interface FormToggleProps {
  label: string;
  icon: LucideIcon;
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
    <div className="flex flex-col gap-2.5 group/field w-full">
      {/* Label Layer */}
      <div className="flex items-center justify-between px-1">
        <label className="text-[11px] font-black text-gray-900 uppercase tracking-widest flex items-center gap-2 group-focus-within/field:text-purple-600 transition-colors">
          {label} {required && <span className="text-purple-500 font-bold">*</span>}
        </label>
      </div>

      {/* Product Modal Style Toggle (The Segmented Control) */}
      <div className="bg-gray-100 rounded-[1.25rem] p-1.5 flex items-center w-full min-h-[64px] border-2 border-transparent focus-within:border-purple-500 transition-all">
        <button
          type="button"
          onClick={() => onChange(true)}
          className={`flex-1 py-3 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl transition-all ${
            checked 
            ? "bg-white text-emerald-600 shadow-md scale-100" 
            : "text-gray-400 hover:text-gray-600 scale-95"
          }`}
        >
          Active / Enabled
        </button>
        <button
          type="button"
          onClick={() => onChange(false)}
          className={`flex-1 py-3 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl transition-all ${
            !checked 
            ? "bg-white text-red-500 shadow-md scale-100" 
            : "text-gray-400 hover:text-gray-600 scale-95"
          }`}
        >
          Disabled / Hidden
        </button>
      </div>

      {description && (
        <p className="text-[10px] font-black text-gray-400 pl-1 leading-relaxed uppercase tracking-tighter opacity-70">
          {description}
        </p>
      )}
    </div>
  );
};
