"use client";
import React, { useState } from "react";
import { Plus, Users, MapPin, Edit3, RefreshCw, LayoutGrid, Layers } from "lucide-react";
import { useTables, useZones, Table, Zone } from "@/hooks/useTables";
import TableFormModal from "@/components/admin/TableFormModal";
import ZoneFormModal from "@/components/admin/ZoneFormModal";
import AdminPageLayout from "@/components/shared/AdminPageLayout";

export default function TablesPage() {
  const { data: tables, isLoading, isError, refetch } = useTables();
  const { data: zones } = useZones();
  const [selectedTable, setSelectedTable] = useState<Partial<Table> | null>(null);
  const [selectedZoneId, setSelectedZoneId] = useState<string | null>(null);
  const [editingZone, setEditingZone] = useState<Zone | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isZoneModalOpen, setIsZoneModalOpen] = useState(false);

  const filteredTables = selectedZoneId 
    ? tables?.filter(t => t.zoneId === selectedZoneId)
    : tables;

  const openAddPanel = () => {
    setSelectedTable(null);
    setIsPanelOpen(true);
  };

  const openEditPanel = (table: Table) => {
    setSelectedTable(table);
    setIsPanelOpen(true);
  };

  const openEditZone = (zone: Zone) => {
    setEditingZone(zone);
    setIsZoneModalOpen(true);
  };

  const openAddZone = () => {
    setEditingZone(null);
    setIsZoneModalOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "AVAILABLE": return "bg-emerald-50 text-emerald-600 border-emerald-100";
      case "OCCUPIED": return "bg-blue-50 text-blue-600 border-blue-100";
      case "DIRTY": return "bg-amber-50 text-amber-600 border-amber-100";
      case "RESERVED": return "bg-purple-50 text-purple-600 border-purple-100";
      default: return "bg-gray-50 text-gray-600 border-gray-100";
    }
  };

  const renderTables = () => {
    if (isLoading) {
      return (
        <div className="h-64 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600" />
        </div>
      );
    }

    if (isError) {
      return (
        <div className="h-64 flex flex-col items-center justify-center gap-4 bg-red-50/50 rounded-[2.5rem] border border-red-100 border-dashed">
          <p className="text-red-500 font-bold">Failed to load tables matrix</p>
          <button onClick={() => refetch()} className="text-xs font-black uppercase tracking-widest bg-white px-6 py-3 rounded-xl border border-red-100 hover:bg-red-50 transition-all">
            Retry Sync
          </button>
        </div>
      );
    }

    const tablesToRender = filteredTables || [];
    
    // Group by zone if All Tables is selected
    const grouped = tablesToRender.reduce((acc: any, table) => {
      const zoneName = table.zone?.name || "Main Area";
      if (!acc[zoneName]) acc[zoneName] = [];
      acc[zoneName].push(table);
      return acc;
    }, {});

    if (tablesToRender.length === 0) return null;

    return Object.entries(grouped).map(([zoneName, zoneTables]: [string, any]) => (
      <div key={zoneName} className="space-y-6">
        <div className="flex items-center gap-4 px-2">
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-emerald-600 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100">
            {zoneName} AREA
          </span>
          <div className="h-[1px] flex-grow bg-emerald-100/50" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {zoneTables.map((table: any) => (
            <div 
              key={table.id}
              onClick={() => openEditPanel(table)}
              className={`group bg-white rounded-[2.5rem] border p-8 shadow-sm hover:shadow-xl hover:shadow-emerald-50 transition-all duration-500 relative overflow-hidden cursor-pointer active:scale-95 ${!table.isActive ? 'opacity-60 border-gray-100 bg-gray-50/30' : 'border-gray-100'}`}
            >
              <div className={`absolute top-0 right-0 px-6 py-2 rounded-bl-3xl text-[10px] font-black uppercase tracking-widest border-l border-b transition-colors flex items-center gap-2 ${getStatusColor(table.status)}`}>
                {!table.isActive && <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />}
                {table.status}
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-900 font-black text-xl group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-500">
                    {table.name.split('-').pop()}
                  </div>
                  <div className="p-3 text-gray-300 group-hover:text-emerald-600 transition-all opacity-0 group-hover:opacity-100">
                    <Edit3 size={20} />
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-black text-gray-900 tracking-tight">{table.name}</h3>
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-1.5 text-gray-500">
                      <Users size={16} className="text-gray-400" />
                      <span className="text-sm font-bold">{table.capacity} Seats</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-500">
                      <MapPin size={16} className="text-gray-400" />
                      <span className="text-sm font-bold">{table.zone?.name || 'Main Area'}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                   <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">
                     ID: {table.id.slice(-6).toUpperCase()}
                   </p>
                   <div className="flex items-center gap-2">
                     <div className={`w-2 h-2 rounded-full animate-pulse ${table.status === 'AVAILABLE' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                     <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Real-time</span>
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ));
  };

  return (
    <AdminPageLayout>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-gray-900 tracking-tight">Tables & Seating</h2>
          <p className="text-gray-500 font-medium mt-1 text-base">Configure your dining areas and manage table layouts.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => refetch()} className="p-4 bg-white border border-gray-100 text-gray-400 hover:text-blue-600 rounded-2xl shadow-sm transition-all active:rotate-180">
            <RefreshCw size={24} />
          </button>
          <button onClick={openAddZone} className="flex items-center gap-3 px-6 py-4 bg-white border-2 border-gray-100 text-gray-600 rounded-[1.5rem] font-bold hover:bg-gray-50 hover:border-gray-200 transition-all active:scale-95">
            <Layers size={20} />
            <span className="hidden sm:inline text-sm">Add New Area</span>
          </button>
          <button onClick={openAddPanel} className="flex items-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-[1.5rem] font-black shadow-xl shadow-gray-200 hover:bg-blue-600 hover:shadow-blue-100 transition-all active:scale-95">
            <Plus size={24} />
            <span className="hidden sm:inline">Add New Table</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
          <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Total Tables</p>
          <p className="text-3xl font-black text-gray-900">{tables?.length || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
          <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Available</p>
          <p className="text-3xl font-black text-emerald-500">{tables?.filter(t => t.status === 'AVAILABLE').length || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
          <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Dining Areas</p>
          <p className="text-3xl font-black text-blue-600">{zones?.length || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
          <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Occupancy</p>
          <p className="text-3xl font-black text-amber-500">
            {tables && tables.length > 0 
              ? Math.round((tables.filter(t => t.status === 'OCCUPIED').length / tables.length) * 100)
              : 0}%
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 overflow-x-auto pb-4 scrollbar-hide">
        <button onClick={() => setSelectedZoneId(null)} className={`px-6 py-3 rounded-2xl font-bold whitespace-nowrap transition-all ${selectedZoneId === null ? "bg-gray-900 text-white shadow-lg shadow-gray-200" : "bg-white border border-gray-100 text-gray-500 hover:text-blue-600"}`}>
          All Tables
        </button>
        {zones?.map(zone => (
          <div key={zone.id} className="relative group/tab">
            <button onClick={() => setSelectedZoneId(zone.id)} className={`px-6 py-3 pr-10 rounded-2xl font-bold whitespace-nowrap transition-all flex items-center gap-2 ${selectedZoneId === zone.id ? "bg-gray-900 text-white shadow-lg shadow-gray-200" : "bg-white border border-gray-100 text-gray-500 hover:text-blue-600"}`}>
              {zone.name}
            </button>
            <button onClick={() => openEditZone(zone)} className={`absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg opacity-0 group-hover/tab:opacity-100 transition-all ${selectedZoneId === zone.id ? "text-gray-400 hover:text-white" : "text-gray-300 hover:text-blue-600 hover:bg-blue-50"}`}>
              <Edit3 size={14} />
            </button>
          </div>
        ))}
      </div>

      <div className="space-y-12">
        {renderTables()}

        {!isLoading && filteredTables?.length === 0 && (
          <button onClick={openAddPanel} className="w-full border-2 border-dashed border-gray-200 rounded-[2.5rem] p-12 flex flex-col items-center justify-center gap-4 text-gray-400 hover:border-emerald-300 hover:bg-emerald-50/30 hover:text-emerald-500 transition-all duration-300 group">
            <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
              <Plus size={32} />
            </div>
            <span className="font-black text-lg tracking-tight">Add Your First Table</span>
          </button>
        )}
      </div>

      <TableFormModal isOpen={isPanelOpen} table={selectedTable} onClose={() => { setIsPanelOpen(false); setSelectedTable(null); }} />
      <ZoneFormModal isOpen={isZoneModalOpen} zone={editingZone} onClose={() => { setIsZoneModalOpen(false); setEditingZone(null); }} />
    </AdminPageLayout>
  );
}
