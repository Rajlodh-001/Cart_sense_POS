"use client";
import React, { useState } from "react";
import { Laptop, RefreshCw, Plus } from "lucide-react";
import { useDevices } from "@/hooks/useDevices";
import AdminPageLayout from "@/components/shared/AdminPageLayout";
import PermissionGuard from "@/components/shared/PermissionGuard";
import DeviceFormModal from "@/components/admin/DeviceFormModal";

export default function DevicesPage() {
  const { data: devices, isLoading, isError, refetch } = useDevices();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const renderDevices = () => {
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
          <p className="text-red-500 font-bold">Failed to load devices</p>
          <button onClick={() => refetch()} className="text-xs font-black uppercase tracking-widest bg-white px-6 py-3 rounded-xl border border-red-100 hover:bg-red-50 transition-all">
            Retry Sync
          </button>
        </div>
      );
    }

    const devicesToRender = devices || [];

    if (devicesToRender.length === 0) {
      return (
        <div className="h-64 flex flex-col items-center justify-center text-gray-400 italic">
          No devices registered yet.
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {devicesToRender.map((dev) => (
          <div 
            key={dev.id}
            className="group bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm hover:shadow-xl hover:shadow-emerald-50 transition-all duration-500 relative overflow-hidden"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-900 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-500">
                  <Laptop size={24} />
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-black text-gray-900 tracking-tight">{dev.name}</h3>
                <p className="text-gray-500 font-bold mt-2 text-sm">Slug: {dev.slug}</p>
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-1.5 text-gray-500">
                    <span className="text-xs font-black uppercase tracking-widest bg-emerald-50 text-emerald-600 px-3 py-1 rounded-lg border border-emerald-100">
                      Type: {dev.deviceType}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                 <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">
                   ID: {dev.id.slice(-6).toUpperCase()}
                 </p>
                 <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                   <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active</span>
                 </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <PermissionGuard
      resource="location"
      action="READ"
      fallback={
        <AdminPageLayout>
          <div className="h-64 flex flex-col items-center justify-center gap-4 bg-red-50/50 rounded-[2.5rem] border border-red-100 border-dashed">
            <p className="text-red-500 font-bold">Access Denied: You do not have permission to view devices.</p>
          </div>
        </AdminPageLayout>
      }
    >
      <AdminPageLayout>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-4xl font-black text-gray-900 tracking-tight">Devices</h2>
            <p className="text-gray-500 font-medium mt-1 text-base">Monitor registered registers, terminals, and displays.</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => refetch()} className="p-4 bg-white border border-gray-100 text-gray-400 hover:text-blue-600 rounded-2xl shadow-sm transition-all active:rotate-180">
              <RefreshCw size={24} />
            </button>
            <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-[1.5rem] font-black shadow-xl shadow-gray-200 hover:bg-blue-600 hover:shadow-blue-100 transition-all active:scale-95">
              <Plus size={24} />
              <span className="hidden sm:inline">Add New Device</span>
            </button>
          </div>
        </div>

        <div className="space-y-12">
          {renderDevices()}
        </div>
      </AdminPageLayout>

      <DeviceFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </PermissionGuard>
  );
}
