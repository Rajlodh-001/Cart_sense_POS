import React, { useState, useRef, useEffect } from "react";
import { LucideIcon, ChevronDown, Check, Search, Plus } from "lucide-react";

interface Option {
  value: string;
  label: string;
}

interface FormCreatableSelectProps {
  label: string;
  icon?: LucideIcon;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  description?: string;
  placeholder?: string;
  required?: boolean;
}

export const FormCreatableSelect: React.FC<FormCreatableSelectProps> = ({ 
  label, 
  icon: Icon, 
  options, 
  value, 
  onChange, 
  error, 
  description,
  placeholder = "Select or create...",
  required
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

  const selectedOption = options.find(opt => opt.value === value) || (value ? { value, label: value } : null);

  const filteredOptions = options.filter(opt => 
    opt.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const showCreateOption = searchTerm && !options.some(opt => opt.label.toLowerCase() === searchTerm.toLowerCase());

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
    setSearchTerm("");
  };

  const handleCreate = () => {
    if (searchTerm) {
      onChange(searchTerm);
      setIsOpen(false);
      setSearchTerm("");
    }
  };

  return (
    <div className={`flex flex-col gap-2.5 group/field w-full animate-in fade-in duration-500 transition-all ${isOpen ? "relative z-50" : "relative"}`} ref={containerRef}>
      {/* Label Area */}
      <div className="flex items-center justify-between px-2">
        <label className="text-[11px] font-black text-gray-900 uppercase tracking-widest flex items-center gap-2 group-focus-within/field:text-purple-600 transition-colors">
          {label} {required && <span className="text-purple-500 font-bold">*</span>}
        </label>
        {error && <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">{error}</span>}
      </div>

      {/* Main Signal Plane */}
      <div className="relative">
        <div 
          onClick={() => setIsOpen(!isOpen)}
          className={`
            w-full flex items-center justify-between gap-4
            px-6 py-4 bg-white border-2 border-gray-100 rounded-2xl 
            cursor-pointer select-none transition-all duration-300
            ${isOpen ? 'border-purple-500 ring-8 ring-purple-500/5 shadow-lg shadow-purple-500/5' : 'hover:border-gray-200'}
            ${error ? 'border-red-200 bg-red-50/10' : ''}
          `}
        >
          <div className="flex-1 truncate">
            {selectedOption ? (
              <span className="text-sm font-black text-gray-900 uppercase tracking-widest">{selectedOption.label}</span>
            ) : (
              <span className="text-gray-300 font-bold text-sm tracking-tight">{placeholder}</span>
            )}
          </div>
          
          <div className="flex items-center gap-4 border-l border-gray-100 pl-4 transition-colors group-focus-within/field:border-purple-100">
            {Icon && <Icon size={18} strokeWidth={2.5} className={`transition-colors ${isOpen ? 'text-purple-600' : 'text-gray-200'}`} />}
            <ChevronDown size={14} strokeWidth={4} className={`text-gray-400 transition-transform duration-500 ${isOpen ? 'rotate-180 text-purple-600' : ''}`} />
          </div>
        </div>

        {/* Custom Flying Dropdown Panel */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-4 bg-white/95 backdrop-blur-xl border border-gray-100 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] z-[100] p-4 animate-in slide-in-from-top-4 duration-500">
            <div className="relative mb-4">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={14} />
              <input 
                type="text" 
                autoFocus
                placeholder="Search or type new..."
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-xl text-xs font-bold outline-none focus:bg-gray-100/50 transition-colors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    if (showCreateOption) handleCreate();
                    else if (filteredOptions.length > 0) handleSelect(filteredOptions[0].value);
                  }
                }}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            
            <div className="max-h-60 overflow-y-auto custom-scrollbar flex flex-col gap-1">
              {showCreateOption && (
                <div 
                  onClick={(e) => { e.stopPropagation(); handleCreate(); }}
                  className="flex items-center justify-between px-5 py-4 rounded-xl cursor-pointer transition-all gap-4 bg-purple-50 text-purple-700 hover:bg-purple-100 group/create"
                >
                  <div className="flex items-center gap-3">
                    <Plus size={14} strokeWidth={3} />
                    <span className="text-[11px] font-black uppercase tracking-widest">Create "{searchTerm}"</span>
                  </div>
                  <span className="text-[9px] font-bold opacity-40 uppercase tracking-widest group-hover/create:opacity-100 transition-opacity">Press Enter</span>
                </div>
              )}

              {filteredOptions.length > 0 ? (
                filteredOptions.map(option => {
                  const isSelected = value === option.value;
                  return (
                    <div 
                      key={option.value}
                      onClick={(e) => { e.stopPropagation(); handleSelect(option.value); }}
                      className={`
                        flex items-center justify-between px-5 py-4 rounded-xl cursor-pointer transition-all gap-4
                        ${isSelected ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20' : 'hover:bg-gray-50 text-gray-900'}
                      `}
                    >
                      <span className="text-[11px] font-black uppercase tracking-widest leading-none">{option.label}</span>
                      {isSelected && <Check size={14} strokeWidth={3} className="shrink-0" />}
                    </div>
                  );
                })
              ) : !showCreateOption && (
                <div className="py-8 text-center text-[10px] font-black text-gray-300 uppercase tracking-widest">No existing groups</div>
              )}
            </div>
          </div>
        )}
      </div>

      {description && (
        <p className="text-[10px] font-bold text-gray-400 px-2 leading-relaxed uppercase tracking-tighter opacity-70 italic">
          * {description}
        </p>
      )}
    </div>
  );
};

export default FormCreatableSelect;
