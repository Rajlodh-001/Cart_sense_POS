"use client";
import React from "react";
import { Settings, Store, Bell, Lock, Globe, Save } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Store Settings</h2>
          <p className="text-gray-500 font-medium mt-1 text-sm">Configure your global store preferences and system behavior.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-4 bg-gray-900 text-white rounded-[1.5rem] font-bold shadow-xl shadow-gray-200 hover:bg-blue-600 transition-all active:scale-95">
          <Save size={20} />
          <span>Save Configuration</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8">
            <h3 className="text-lg font-black text-gray-900 mb-6 flex items-center gap-3">
              <Store size={20} className="text-blue-500" />
              Store Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Store Name</label>
                <input type="text" placeholder="Main Street Bakery" className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Contact Email</label>
                <input type="email" placeholder="hello@mainstreetbakery.com" className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8">
            <h3 className="text-lg font-black text-gray-900 mb-6 flex items-center gap-3">
              <Globe size={20} className="text-emerald-500" />
              Regional & Units
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Currency</label>
                <select className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold appearance-none">
                  <option>USD ($)</option>
                  <option>EUR (€)</option>
                  <option>GBP (£)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Timezone</label>
                <select className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold appearance-none">
                  <option>Eastern Time (US & Canada)</option>
                  <option>UTC</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-900 text-white rounded-[2.5rem] p-8">
            <h3 className="text-lg font-bold mb-4">Admin Security</h3>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Ensure you periodically rotate your administrative credentials and review active session history.
            </p>
            <button className="w-full py-4 bg-white/10 hover:bg-white/20 rounded-2xl font-bold transition-all text-sm">
              View Access Logs
            </button>
          </div>
          
          <div className="bg-blue-600 text-white rounded-[2.5rem] p-8">
             <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
                <Bell size={24} />
             </div>
             <h3 className="text-lg font-bold mb-2">Notifications</h3>
             <p className="text-blue-100 text-sm leading-relaxed mb-6">
                Manage alerts for low stock, large transactions, and voided orders.
             </p>
             <button className="text-white font-black uppercase tracking-widest text-[10px] hover:underline">Configure Alerts</button>
          </div>
        </div>
      </div>
    </div>
  );
}
