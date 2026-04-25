"use client";
import React, { useState, useEffect } from "react";
import { Store, Bell, Globe, Save, Loader2, Check, Percent } from "lucide-react";
import { 
  useOrganizationSettings, 
  useLocationSettings, 
  useUpdateOrganization, 
  useUpdateLocation 
} from "@/hooks/useSettings";

export default function SettingsPage() {
  const { data: org, isLoading: orgLoading } = useOrganizationSettings();
  const { data: loc, isLoading: locLoading } = useLocationSettings();
  const updateOrg = useUpdateOrganization();
  const updateLoc = useUpdateLocation();

  const [orgData, setOrgData] = useState({
    name: "",
    currency: "",
    taxType: "EXCLUSIVE" as 'INCLUSIVE' | 'EXCLUSIVE',
  });

  const [locData, setLocData] = useState({
    name: "",
    address: "",
    taxRate: 0,
  });

  useEffect(() => {
    if (org) {
      setOrgData({
        name: org.name,
        currency: org.currency,
        taxType: org.taxType,
      });
    }
  }, [org]);

  useEffect(() => {
    if (loc) {
      setLocData({
        name: loc.name,
        address: loc.address,
        taxRate: Number(loc.taxRate),
      });
    }
  }, [loc]);

  const handleSave = async () => {
    try {
      await Promise.all([
        updateOrg.mutateAsync(orgData),
        updateLoc.mutateAsync(locData),
      ]);
      alert("Settings saved successfully!");
    } catch (e) {
      console.error(e);
      alert("Failed to save settings.");
    }
  };

  if (orgLoading || locLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="animate-spin text-blue-600" size={40} />
      </div>
    );
  }

  const isSaving = updateOrg.isPending || updateLoc.isPending;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">System Configuration</h2>
          <p className="text-gray-500 font-medium mt-1 text-sm">Manage your multi-tenant settings and store defaults.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-[1.5rem] font-bold shadow-xl shadow-gray-200 hover:bg-blue-600 transition-all active:scale-95 disabled:opacity-50"
        >
          {isSaving ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
          <span>{isSaving ? "Saving..." : "Save Configuration"}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          
          {/* --- ORGANIZATION SETTINGS --- */}
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8">
            <h3 className="text-lg font-black text-gray-900 mb-6 flex items-center gap-3">
              <Globe size={20} className="text-purple-500" />
              Company Defaults
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Org Name</label>
                <input 
                  type="text" 
                  value={orgData.name}
                  onChange={(e) => setOrgData({ ...orgData, name: e.target.value })}
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold focus:bg-white transition-all" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Currency Code</label>
                <input 
                   type="text" 
                   value={orgData.currency}
                   onChange={(e) => setOrgData({ ...orgData, currency: e.target.value })}
                   className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold focus:bg-white transition-all" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Tax Calculation</label>
                <select 
                  value={orgData.taxType}
                  onChange={(e) => setOrgData({ ...orgData, taxType: e.target.value as any })}
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold appearance-none"
                >
                  <option value="EXCLUSIVE">Exclusive (Subtotal + Tax)</option>
                  <option value="INCLUSIVE">Inclusive (Tax inside Price)</option>
                </select>
              </div>
            </div>
          </div>

          {/* --- LOCATION SETTINGS --- */}
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8">
            <h3 className="text-lg font-black text-gray-900 mb-6 flex items-center gap-3">
              <Store size={20} className="text-blue-500" />
              Store-Specific Settings
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Store Name</label>
                <input 
                  type="text" 
                  value={locData.name}
                  onChange={(e) => setLocData({ ...locData, name: e.target.value })}
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold focus:bg-white transition-all" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Standard Tax Rate (%)</label>
                <div className="relative">
                  <input 
                    type="number" 
                    step="0.01"
                    value={locData.taxRate}
                    onChange={(e) => setLocData({ ...locData, taxRate: parseFloat(e.target.value) })}
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold focus:bg-white transition-all pr-12" 
                  />
                  <Percent size={16} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Address</label>
                <input 
                  type="text" 
                  value={locData.address}
                  onChange={(e) => setLocData({ ...locData, address: e.target.value })}
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold focus:bg-white transition-all" 
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-900 text-white rounded-[2.5rem] p-8">
            <h3 className="text-lg font-bold mb-4">Multi-Tenant Context</h3>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              You are currently managing <strong>{loc?.name}</strong> within the <strong>{org?.name}</strong> organization.
            </p>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs py-2 border-b border-white/10">
                <span className="text-gray-500">Org ID</span>
                <span className="font-mono text-[10px]">{org?.id}</span>
              </div>
              <div className="flex items-center justify-between text-xs py-2 border-b border-white/10">
                <span className="text-gray-500">Store ID</span>
                <span className="font-mono text-[10px]">{loc?.id}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-purple-600 text-white rounded-[2.5rem] p-8">
             <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
                <Check size={24} strokeWidth={3} />
             </div>
             <h3 className="text-lg font-bold mb-2">Compliance</h3>
             <p className="text-purple-100 text-sm leading-relaxed mb-6">
                All changes to tax rates and company names are logged for auditing purposes.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}
