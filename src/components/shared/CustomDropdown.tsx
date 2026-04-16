"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface DropdownOption {
  id: number | string;
  label: string;
  subLabel?: string;
  isOccupied?: boolean;
}

interface CustomDropdownProps {
  options: DropdownOption[];
  value: number | string | null;
  onChange: (id: any) => void;
  icon: React.FC<{ size?: number; className?: string }>;
  placeholder?: string;
  className?: string;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  value,
  onChange,
  icon: Icon,
  placeholder = "Select...",
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selected = options.find((o) => o.id === value);

  return (
    <div className={`flex-1 relative ${className}`} ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all border ${
          isOpen
            ? "bg-blue-50 border-blue-200 text-blue-700 shadow-sm shadow-blue-100"
            : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50 focus:border-blue-300"
        }`}
      >
        <Icon
          size={16}
          className={isOpen ? "text-blue-500" : "text-gray-400"}
        />
        <span className="flex-1 text-left truncate">
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown
          size={15}
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180 text-blue-500" : "text-gray-400"
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-gray-100 rounded-xl shadow-lg shadow-gray-200/60 z-[100] py-1 overflow-hidden animate-dropdown">
          <div className="max-h-60 overflow-y-auto custom-scrollbar">
            {options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => {
                  onChange(opt.id);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors flex flex-col ${
                  opt.id === value
                    ? "bg-blue-50 text-blue-600"
                    : opt.isOccupied
                    ? "text-gray-400 hover:bg-gray-50"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate">{opt.label}</span>
                  {opt.subLabel && (
                    <span className="text-[10px] opacity-70 whitespace-nowrap">
                      {opt.subLabel}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes dropdownOpen {
          from {
            opacity: 0;
            transform: translateY(-6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-dropdown {
          animation: dropdownOpen 0.15s ease-out;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e5e7eb;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default CustomDropdown;
