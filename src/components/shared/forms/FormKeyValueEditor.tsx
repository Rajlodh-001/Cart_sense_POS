"use client";
import React, { useState } from "react";
import { Plus, X, Check } from "lucide-react";

interface KeyValueEditorProps {
  data: Record<string, string>;
  onChange: (newData: Record<string, string>) => void;
  placeholderKey?: string;
  placeholderValue?: string;
  accentColor?: "green" | "orange" | "blue" | "red";
}

export const FormKeyValueEditor: React.FC<KeyValueEditorProps> = ({ 
  data, 
  onChange, 
  placeholderKey = "Key", 
  placeholderValue = "Value", 
  accentColor = "blue" 
}) => {
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = () => {
    if (!newKey.trim()) return;
    onChange({ ...data, [newKey.trim()]: newValue.trim() });
    setNewKey("");
    setNewValue("");
    setIsAdding(false);
  };

  const removeKey = (key: string) => {
    const newData = { ...data };
    delete newData[key];
    onChange(newData);
  };

  const accentStyles = {
    green: "text-green-600 bg-green-50 border-green-100 focus:border-green-500",
    orange: "text-orange-600 bg-orange-50 border-orange-100 focus:border-orange-500",
    blue: "text-blue-600 bg-blue-50 border-blue-100 focus:border-blue-500",
    red: "text-red-600 bg-red-50 border-red-100 focus:border-red-500"
  };

  return (
    <div className="space-y-4 px-4">
      <div className="flex flex-wrap gap-2">
        {Object.entries(data || {}).map(([key, val]) => (
          <div 
            key={key} 
            className={`flex items-center gap-2 px-4 py-2 rounded-2xl border text-xs font-bold animate-in fade-in zoom-in-95 ${accentStyles[accentColor]}`}
          >
            <span className="opacity-60">{key}:</span>
            <span>{val}</span>
            <button 
              type="button"
              onClick={() => removeKey(key)}
              className="ml-1 p-1 hover:bg-black/5 rounded-full transition-colors"
            >
              <X size={12} strokeWidth={3} />
            </button>
          </div>
        ))}
        {!isAdding && (
          <button
            type="button"
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-2xl border border-dashed border-gray-200 text-gray-400 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-all text-xs font-bold"
          >
            <Plus size={14} strokeWidth={3} /> Add Item
          </button>
        )}
      </div>

      {isAdding && (
        <div className="flex gap-2 animate-in slide-in-from-top-2 duration-200">
          <input
            autoFocus
            type="text"
            value={newKey}
            onChange={(e) => setNewKey(e.target.value)}
            placeholder={placeholderKey}
            className="flex-1 px-6 py-3 bg-white border border-gray-100 rounded-2xl text-xs font-bold focus:border-blue-500 outline-none shadow-sm"
          />
          <input
            type="text"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            placeholder={placeholderValue}
            className="flex-1 px-6 py-3 bg-white border border-gray-100 rounded-2xl text-xs font-bold focus:border-blue-500 outline-none shadow-sm"
          />
          <div className="flex gap-1">
            <button
              type="button"
              onClick={handleAdd}
              className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95"
            >
              <Check size={18} strokeWidth={3} />
            </button>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="w-10 h-10 bg-gray-100 text-gray-400 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-all"
            >
              <X size={18} strokeWidth={3} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
