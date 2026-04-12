"use client";
import React from "react";
import { Map, Plus, Square, MapPin } from "lucide-react";

export default function TablesPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Tables & Seating</h2>
          <p className="text-gray-500 font-medium mt-1 text-sm">Configure your dining areas, table layouts, and place types.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-4 bg-gray-900 text-white rounded-[1.5rem] font-bold shadow-xl shadow-gray-200 hover:bg-emerald-600 hover:shadow-emerald-100 transition-all active:scale-95">
          <Plus size={20} />
          <span>Add New Table</span>
        </button>
      </div>

      {/* Areas Quick View */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Main Hall", count: "12 Tables", status: "Active" },
          { label: "Garden", count: "8 Tables", status: "Active" },
          { label: "VIP Room", count: "4 Tables", status: "Active" },
          { label: "Takeaway", count: "N/A", status: "Active" },
        ].map((area) => (
          <div key={area.label} className="p-6 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:border-emerald-200 transition-all group cursor-pointer">
            <div className="flex items-center justify-between mb-2">
               <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                 <MapPin size={16} />
               </div>
               <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">{area.status}</span>
            </div>
            <p className="text-lg font-black text-gray-900 leading-tight">{area.label}</p>
            <p className="text-xs text-gray-400 font-bold">{area.count}</p>
          </div>
        ))}
      </div>

      {/* Placeholder Canvas */}
      <div className="p-10 bg-white rounded-[3rem] border border-gray-100 shadow-sm flex flex-col items-center justify-center min-h-[400px] border-dashed border-2 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px]">
        <div className="w-20 h-20 bg-white rounded-3xl border border-gray-100 shadow-xl flex items-center justify-center text-emerald-500 mb-6 scale-110">
          <Square size={32} strokeWidth={3} />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Visual Floor Plan</h3>
        <p className="text-gray-400 max-w-sm text-center font-medium">
          Drag and drop table configurations will be available here. You'll be able to mirror your physical store layout exactly.
        </p>
      </div>
    </div>
  );
}
