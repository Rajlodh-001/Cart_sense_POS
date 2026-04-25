import React from "react";
import { LucideIcon } from "lucide-react";

interface FormSectionProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  className?: string;
  isBorderless?: boolean;
}

export const FormSection: React.FC<FormSectionProps> = ({ 
  icon: Icon, 
  title, 
  subtitle, 
  children, 
  className = "",
  isBorderless = false 
}) => (
  <div className={`space-y-6 ${className} animate-in slide-in-from-bottom-4 duration-700`}>
    {/* Anti-Gravity Section Header */}
    <div className="flex items-center gap-5 px-2">
      <div className="w-12 h-12 bg-gray-900 text-white rounded-2xl flex items-center justify-center shadow-lg border border-white/20">
        <Icon size={20} strokeWidth={2.5} />
      </div>
      <div>
        <h4 className="font-black text-gray-900 uppercase tracking-widest text-[11px] leading-tight mb-1">{title}</h4>
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest opacity-60 leading-tight">{subtitle}</p>
      </div>
    </div>

    {/* Stabilized Data Plane */}
    <div className={`
        ${isBorderless ? '' : 'bg-white/50 backdrop-blur-sm rounded-[2rem] p-8 border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-purple-500/5 transition-all duration-500'}
    `}>
      {children}
    </div>
  </div>
);
