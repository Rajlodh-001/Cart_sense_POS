import React from "react";
import { Image as ImageIcon, Link as LinkIcon, Trash2 } from "lucide-react";

interface FormImageProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  description?: string;
}

export const FormImage: React.FC<FormImageProps> = ({ 
  label, 
  value, 
  onChange, 
  placeholder = "https://...",
  description = "Neural image feed URL."
}) => (
  <div className="flex flex-col gap-6 w-full animate-in fade-in duration-700">
    {/* Anti-Gravity Stabilizer: Vertical Stacking Only */}
    <div className="space-y-4">
      <div className="flex items-center justify-between px-2">
        <label className="text-[11px] font-black text-gray-900 uppercase tracking-[0.25em] flex items-center gap-2 group-focus-within/image:text-purple-600 transition-colors">
          <ImageIcon size={14} strokeWidth={2.5} className="opacity-70" />
          {label}
        </label>
      </div>

      {/* Primary Vertical Image Plane */}
      <div className="aspect-[1/1] w-full rounded-[2.5rem] bg-gray-50/50 border-2 border-dashed border-gray-100 flex items-center justify-center overflow-hidden group hover:border-purple-200 hover:bg-purple-50/10 transition-all duration-700 shadow-sm relative">
        {value ? (
          <img src={value} alt="Preview" className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-1000" />
        ) : (
          <div className="flex flex-col items-center gap-4 opacity-20 group-hover:opacity-40 transition-opacity">
            <ImageIcon size={48} strokeWidth={1} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-center">Unlinked Asset</span>
          </div>
        )}
        
        {value && (
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
            <div className="px-5 py-2 bg-white/20 backdrop-blur-xl rounded-full text-[10px] font-black text-white uppercase tracking-widest border border-white/20">
              Live resonance established
            </div>
          </div>
        )}
      </div>
    </div>

    {/* URL Input Bridge (Directly Below Preview) */}
    <div className="flex flex-col gap-2 group/field">
        <div className="relative">
          <LinkIcon className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-200 group-focus-within/field:text-purple-600 transition-colors" size={16} strokeWidth={3} />
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full pl-14 pr-14 py-4 px-6 bg-white border-2 border-gray-100 rounded-2xl font-bold text-gray-900 placeholder:text-gray-200 outline-none shadow-sm focus:border-purple-500/20 focus:ring-8 focus:ring-purple-500/5 hover:border-gray-200 transition-all duration-300"
            placeholder={placeholder}
          />
          {value && (
            <button 
              type="button"
              onClick={() => onChange("")}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-xl bg-red-50 text-red-400 hover:bg-red-500 hover:text-white transition-all shadow-sm"
            >
              <Trash2 size={14} strokeWidth={3} />
            </button>
          )}
        </div>
        <p className="text-[10px] font-bold text-gray-400 px-2 leading-relaxed opacity-60 italic">
          * {description}
        </p>
    </div>
  </div>
);
