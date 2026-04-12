"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const DropDownMenu = ({ options }: { options: any[] }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="relative inline-block text-left w-48 font-sans">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center justify-between w-full px-5 py-2.5 text-gray-700 bg-white border border-gray-100 rounded-full shadow-sm hover:border-primary transition-all duration-300 font-bold text-sm ${open ? 'border-primary ring-4 ring-primary/5' : ''}`}
      >
        <span className="truncate">
          {selected !== null
            ? options.find((opt) => opt.id === selected)?.label
            : "Select Option"}
        </span>
        <ChevronDown 
          size={18}
          className={`ml-2 text-gray-400 transition-transform duration-300 ease-in-out ${open ? "rotate-180 text-primary" : ""}`}
        />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)}></div>
          <ul className="absolute left-0 mt-3 w-full bg-white rounded-3xl shadow-2xl border border-gray-50 overflow-hidden z-20 animate-in fade-in zoom-in-95 duration-200">
            {options.map((option) => (
              <li
                key={option.id}
                className={`px-5 py-3.5 flex items-center justify-between cursor-pointer transition-colors
                  ${selected === option.id ? "bg-primary/5 text-primary font-bold" : "hover:bg-gray-50 text-gray-600 font-medium"}
                `}
                onClick={() => {
                  setSelected(option.id);
                  setOpen(false);
                }}
              >
                <span className="text-sm">{option.label}</span>
                {selected === option.id && (
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default DropDownMenu;
