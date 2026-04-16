import React from "react";
import { LucideIcon } from "lucide-react";

interface FormToggleProps {
  label: string;
  icon?: LucideIcon;
  checked: boolean;
  onChange: (checked: boolean) => void;
  description: string;
}

export const FormToggle: React.FC<FormToggleProps> = ({ label, icon: Icon, checked, onChange, description }) => (
  <div 
    onClick={() => onChange(!checked)}
    className={`p-6 rounded-[2.5rem] border transition-all cursor-pointer flex items-center justify-between group ${
      checked ? 'bg-gray-900 border-gray-900 shadow-xl' : 'bg-white border-gray-100 hover:border-gray-200'
    }`}
  >
    <div className="flex items-center gap-4">
      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-colors ${
        checked ? 'bg-white/10 text-white' : 'bg-gray-50 text-gray-400 group-hover:text-gray-900'
      }`}>
        {Icon && <Icon size={18} strokeWidth={2.5} />}
      </div>
      <div>
        <h5 className={`font-black uppercase tracking-widest text-[10px] ${checked ? 'text-white' : 'text-gray-900'}`}>{label}</h5>
        <p className={`text-[10px] font-bold mt-0.5 ${checked ? 'text-gray-400' : 'text-gray-400 group-hover:text-gray-500'}`}>{description}</p>
      </div>
    </div>
    <div className={`w-14 h-8 rounded-full p-1.5 transition-colors relative ${checked ? 'bg-purple-500' : 'bg-gray-100'}`}>
      <div className={`w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 ${checked ? 'translate-x-[24px]' : 'translate-x-0'}`} />
    </div>
  </div>
);
