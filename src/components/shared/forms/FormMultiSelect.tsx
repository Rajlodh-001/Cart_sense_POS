import React, { useState, useRef, useEffect } from "react";
import { LucideIcon, ChevronDown, X, Search, Check } from "lucide-react";

interface Option {
  value: string;
  label: string;
}

interface FormMultiSelectProps {
  label: string;
  icon?: LucideIcon;
  options: Option[];
  value: string[];
  onChange: (value: string[]) => void;
  error?: string;
  description?: string;
  placeholder?: string;
}

export const FormMultiSelect: React.FC<FormMultiSelectProps> = ({ 
  label, 
  icon: Icon, 
  options, 
  value, 
  onChange, 
  error, 
  description,
  placeholder = "Select nodes..."
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleOption = (optionValue: string) => {
    const newValue = value.includes(optionValue)
      ? value.filter(v => v !== optionValue)
      : [...value, optionValue];
    onChange(newValue);
  };

  const filteredOptions = options.filter(opt => 
    opt.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`flex flex-col gap-2.5 group/field w-full animate-in fade-in duration-500 transition-all ${isOpen ? "relative z-50" : "relative"}`} ref={containerRef}>
      {/* Label Area */}
      <div className="flex items-center justify-between px-2">
        <label className="text-[11px] font-black text-gray-900 uppercase tracking-widest flex items-center gap-2 group-focus-within/field:text-purple-600 transition-colors">
          {label}
        </label>
        {error && <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">{error}</span>}
      </div>

      {/* Main Multi-Select Plane */}
      <div className="relative">
        <div 
          onClick={() => setIsOpen(!isOpen)}
          className={`
            w-full flex items-center justify-between gap-4
            px-6 py-4 bg-white border-2 border-gray-100 rounded-2xl 
            cursor-pointer select-none transition-all duration-300
            ${isOpen ? 'border-purple-500 ring-8 ring-purple-500/5' : 'hover:border-gray-200'}
            ${error ? 'border-red-200 bg-red-50/10' : ''}
          `}
        >
          <div className="flex flex-wrap gap-2 flex-1 items-center min-h-[24px]">
            {value.length > 0 ? (
              value.map(val => (
                <div key={val} className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest animate-in zoom-in duration-300 group/tag">
                  {options.find(o => o.value === val)?.label}
                  <X 
                    size={12} 
                    className="cursor-pointer hover:text-red-400 transition-colors" 
                    onClick={(e) => { e.stopPropagation(); toggleOption(val); }} 
                  />
                </div>
              ))
            ) : (
              <span className="text-gray-300 font-bold text-sm">{placeholder}</span>
            )}
          </div>
          
          {/* Anti-Gravity Controls on the Right */}
          <div className="flex items-center gap-4 border-l border-gray-100 pl-4">
            {Icon && <Icon size={18} strokeWidth={2.5} className={`transition-colors ${isOpen ? 'text-purple-600' : 'text-gray-200'}`} />}
            <ChevronDown size={14} strokeWidth={4} className={`text-gray-400 transition-transform duration-500 ${isOpen ? 'rotate-180 text-purple-600' : ''}`} />
          </div>
        </div>

        {/* Floating Options Panel (The Anti-Gravity Dropdown) */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-4 bg-white/95 backdrop-blur-xl border border-gray-100 rounded-[2rem] shadow-2xl z-[100] p-4 animate-in slide-in-from-top-4 duration-500">
            <div className="relative mb-4">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={14} />
              <input 
                type="text" 
                autoFocus
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-xl text-xs font-bold outline-none focus:bg-gray-100/50 transition-colors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="max-h-60 overflow-y-auto custom-scrollbar flex flex-col gap-1">
              {filteredOptions.length > 0 ? (
                filteredOptions.map(option => {
                  const isSelected = value.includes(option.value);
                  return (
                    <div 
                      key={option.value}
                      onClick={() => toggleOption(option.value)}
                      className={`
                        flex items-center justify-between px-4 py-3.5 rounded-xl cursor-pointer transition-all gap-3
                        ${isSelected ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20' : 'hover:bg-gray-50 text-gray-900'}
                      `}
                    >
                      <span className="text-[11px] font-black uppercase tracking-widest">{option.label}</span>
                      {isSelected && <Check size={14} strokeWidth={3} />}
                    </div>
                  );
                })
              ) : (
                <div className="py-8 text-center text-[10px] font-black text-gray-300 uppercase tracking-widest">No matching nodes</div>
              )}
            </div>
          </div>
        )}
      </div>

      {description && (
        <p className="text-[10px] font-bold text-gray-400 px-2 leading-relaxed opacity-60 uppercase tracking-tighter">
          {description}
        </p>
      )}
    </div>
  );
};
