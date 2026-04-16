import React from "react";
import { LucideIcon } from "lucide-react";

interface FormSectionProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  className?: string;
}

export const FormSection: React.FC<FormSectionProps> = ({ icon: Icon, title, subtitle, children, className = "" }) => (
  <div className={`space-y-6 ${className}`}>
    <div className="flex items-center gap-4 mb-6">
      <div className="w-12 h-12 bg-gray-50 text-gray-900 rounded-2xl flex items-center justify-center shadow-sm border border-gray-100">
        <Icon size={20} strokeWidth={2.5} />
      </div>
      <div>
        <h4 className="font-black text-gray-900 uppercase tracking-widest text-[10px]">{title}</h4>
        <p className="text-[10px] font-bold text-gray-400 mt-0.5">{subtitle}</p>
      </div>
    </div>
    <div className="relative">
      {children}
    </div>
  </div>
);
