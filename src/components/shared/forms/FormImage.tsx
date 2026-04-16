import React from "react";
import { Image as ImageIcon, Link as LinkIcon, Trash2 } from "lucide-react";

interface FormImageProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const FormImage: React.FC<FormImageProps> = ({ label, value, onChange, placeholder = "https://..." }) => (
  <div className="space-y-4 group/image">
    <div className="px-5">
      <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2 group-focus-within/image:text-emerald-500 transition-colors">
        <ImageIcon size={12} className="opacity-70" /> {label}
      </label>
    </div>
    
    <div className="flex flex-col lg:flex-row gap-8 items-start px-2">
      <div className="flex-1 w-full space-y-3">
        <div className="relative group">
          <LinkIcon className="absolute left-8 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-emerald-500 transition-colors" size={18} />
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full pl-16 pr-16 py-6 bg-white border border-gray-100 rounded-[2.5rem] font-bold text-gray-900 placeholder:text-gray-200 outline-none shadow-sm hover:shadow-md focus:shadow-xl focus:shadow-emerald-500/5 focus:border-emerald-500/20 focus:ring-8 focus:ring-emerald-500/5 transition-all duration-300"
            placeholder={placeholder}
          />
          {value && (
            <button 
              type="button"
              onClick={() => onChange("")}
              className="absolute right-8 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-red-50 text-red-400 hover:bg-red-500 hover:text-white transition-all shadow-sm"
            >
              <Trash2 size={14} />
            </button>
          )}
        </div>
        <p className="px-6 text-[10px] text-gray-400 font-bold italic opacity-60">
          * Enter a valid image URL (Unsplash, Firebase, etc.) for high-quality visuals.
        </p>
      </div>

      {/* Unified Preview Section */}
      <div className="flex-shrink-0">
        <div className="w-48 h-32 lg:w-40 lg:h-40 rounded-[2.5rem] bg-gray-50 border-2 border-dashed border-gray-100 flex items-center justify-center overflow-hidden group hover:border-emerald-200 hover:bg-emerald-50/10 transition-all duration-500 shadow-sm relative">
          {value ? (
            <img src={value} alt="Preview" className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700" />
          ) : (
            <div className="flex flex-col items-center gap-2 opacity-20 group-hover:opacity-40 transition-opacity">
              <ImageIcon size={32} strokeWidth={1} />
              <span className="text-[8px] font-black uppercase tracking-[0.2em]">Asset Preview</span>
            </div>
          )}
          
          {/* Subtle Overlay Badge */}
          {value && (
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
              <div className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[8px] font-black text-white uppercase tracking-widest border border-white/20">
                Live Preview
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);
