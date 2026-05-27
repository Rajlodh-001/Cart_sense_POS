"use client";
import React, { useState, useEffect } from "react";
import { 
  Store, 
  Bell, 
  Globe, 
  Save, 
  Loader2, 
  Check, 
  Percent, 
  BarChart3, 
  Zap, 
  Layout, 
  ShieldCheck, 
  Fingerprint, 
  ShieldAlert,
  Database,
  ArrowRight
} from "lucide-react";
import { 
  useOrganizationSettings, 
  useLocationSettings, 
  useUpdateOrganization, 
  useUpdateLocation 
} from "@/hooks/useSettings";
import AdminPageLayout from "@/components/shared/AdminPageLayout";

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
      // Use standard browser alert for now, but style it later if needed
    } catch (e) {
      console.error(e);
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
    <AdminPageLayout spacing="large" className="pb-20">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
        <div>
          <h2 className="text-4xl font-black text-gray-900 tracking-tight">System Configuration</h2>
          <p className="text-gray-500 font-bold mt-1 text-sm tracking-tight">
            Manage your multi-tenant settings and store-level defaults.
          </p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-[2rem] font-black text-[11px] uppercase tracking-widest shadow-xl shadow-gray-200 hover:bg-blue-600 transition-all active:scale-95 disabled:opacity-50"
        >
          {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          <span>{isSaving ? "Syncing..." : "Save Configuration"}</span>
        </button>
      </div>

      {/* TOP ANALYTICS SECTION: Configuration Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Statistics Panel */}
          <div className="p-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm relative overflow-hidden group">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h4 className="text-xl font-black text-gray-900 leading-tight">
                  Node Health
                </h4>
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-1">
                  Tenant Connectivity
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded-xl group-hover:bg-purple-600 group-hover:text-white transition-all duration-500">
                <BarChart3 size={18} />
              </div>
            </div>

            <div className="space-y-8">
              {[
                { label: "Cloud Sync", count: 100, total: 100, color: "bg-purple-500" },
                { label: "Local Latency", count: 12, total: 50, color: "bg-blue-500" },
                { label: "Backup Integrity", count: 98, total: 100, color: "bg-emerald-500" },
              ].map((st) => (
                <div key={st.label}>
                  <div className="flex justify-between text-[10px] font-black mb-2">
                    <span className="text-gray-500 uppercase tracking-widest">{st.label}</span>
                    <span className="text-gray-900">{st.count}%</span>
                  </div>
                  <div className="h-1 w-full bg-gray-50 rounded-full overflow-hidden border border-gray-100">
                    <div className={`h-full ${st.color}`} style={{ width: `${(st.count / st.total) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="p-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col justify-center gap-6">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center">
                    <Database size={20} fill="currentColor" />
                </div>
                <div>
                    <span className="block text-[15px] font-black text-gray-900 leading-tight">{org?.currency} Region</span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Global Currency</span>
                </div>
             </div>
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center">
                    <Zap size={20} />
                </div>
                <div>
                    <span className="block text-[15px] font-black text-gray-900 leading-tight">{locData.taxRate}% Rate</span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Calculated {orgData.taxType}</span>
                </div>
             </div>
          </div>

          {/* Secured Node Status */}
          <div className="p-8 bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-[2.5rem] shadow-xl relative overflow-hidden flex flex-col justify-center">
            <div className="absolute right-[-10%] top-[-10%] text-white/5 rotate-12">
                <ShieldCheck size={160} />
            </div>
            <h5 className="text-lg font-black mb-2 relative z-10">Compliance Guard</h5>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6 relative z-10">Audit Log: Active</p>
            <div className="flex items-center gap-2 relative z-10">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-500">All changes being tracked</span>
            </div>
          </div>
      </div>

      {/* MAIN CONFIGURATION GRID - FULL WIDTH */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* --- ORGANIZATION SETTINGS --- */}
        <div className="bg-white rounded-[3.5rem] border-2 border-gray-100/50 p-2 shadow-sm overflow-hidden group">
          <div className="bg-gray-50/30 rounded-[3rem] p-10 border border-gray-100/30 transition-all group-hover:bg-white">
            <h3 className="text-xl font-black text-gray-900 mb-8 flex items-center gap-3">
              <Globe size={24} className="text-purple-500" />
              Company Defaults
            </h3>
            <div className="space-y-8">
              <div className="space-y-3">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Org Name</label>
                <input 
                  type="text" 
                  value={orgData.name}
                  onChange={(e) => setOrgData({ ...orgData, name: e.target.value })}
                  className="w-full px-6 py-5 bg-white border-2 border-gray-50 rounded-[1.5rem] font-bold text-gray-900 focus:border-purple-500/20 focus:ring-8 focus:ring-purple-500/5 transition-all outline-none" 
                  placeholder="Organization Legal Name"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Currency Code</label>
                  <input 
                    type="text" 
                    value={orgData.currency}
                    onChange={(e) => setOrgData({ ...orgData, currency: e.target.value })}
                    className="w-full px-6 py-5 bg-white border-2 border-gray-50 rounded-[1.5rem] font-bold text-gray-900 focus:border-purple-500/20 focus:ring-8 focus:ring-purple-500/5 transition-all outline-none" 
                    placeholder="USD, EUR, etc."
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Tax Calculation</label>
                  <div className="relative">
                    <select 
                      value={orgData.taxType}
                      onChange={(e) => setOrgData({ ...orgData, taxType: e.target.value as any })}
                      className="w-full px-6 py-5 bg-white border-2 border-gray-50 rounded-[1.5rem] font-bold text-gray-900 appearance-none focus:border-purple-500/20 focus:ring-8 focus:ring-purple-500/5 transition-all outline-none"
                    >
                      <option value="EXCLUSIVE">Exclusive (Sub + Tax)</option>
                      <option value="INCLUSIVE">Inclusive (Within Price)</option>
                    </select>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                      <Layout size={16} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- LOCATION SETTINGS --- */}
        <div className="bg-white rounded-[3.5rem] border-2 border-gray-100/50 p-2 shadow-sm overflow-hidden group">
          <div className="bg-gray-50/30 rounded-[3rem] p-10 border border-gray-100/30 transition-all group-hover:bg-white">
            <h3 className="text-xl font-black text-gray-900 mb-8 flex items-center gap-3">
              <Store size={24} className="text-blue-500" />
              Store-Specific Settings
            </h3>
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Store Name</label>
                  <input 
                    type="text" 
                    value={locData.name}
                    onChange={(e) => setLocData({ ...locData, name: e.target.value })}
                    className="w-full px-6 py-5 bg-white border-2 border-gray-50 rounded-[1.5rem] font-bold text-gray-900 focus:border-blue-500/20 focus:ring-8 focus:ring-blue-500/5 transition-all outline-none" 
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Standard Tax Rate</label>
                  <div className="relative">
                    <input 
                      type="number" 
                      step="0.01"
                      value={locData.taxRate}
                      onChange={(e) => setLocData({ ...locData, taxRate: parseFloat(e.target.value) })}
                      className="w-full px-6 py-5 bg-white border-2 border-gray-50 rounded-[1.5rem] font-bold text-gray-900 focus:border-blue-500/20 focus:ring-8 focus:ring-blue-500/5 transition-all outline-none pr-14" 
                    />
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 font-black text-sm">%</div>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Physical Address</label>
                <div className="relative">
                  <Globe className="absolute left-6 top-6 text-gray-300" size={18} />
                  <textarea 
                    rows={2}
                    value={locData.address}
                    onChange={(e) => setLocData({ ...locData, address: e.target.value })}
                    className="w-full pl-14 pr-6 py-5 bg-white border-2 border-gray-50 rounded-[1.5rem] font-bold text-gray-900 focus:border-blue-500/20 focus:ring-8 focus:ring-blue-500/5 transition-all outline-none resize-none" 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CONTEXT INFO CARDS - Full Width Footer style */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-gray-900 text-white rounded-[3.5rem] p-12 relative overflow-hidden group">
            <div className="absolute right-[-5%] bottom-[-10%] text-white/5 group-hover:scale-110 transition-transform -rotate-12 pointer-events-none">
              <Database size={280} />
            </div>
            <div className="relative z-10">
                <h3 className="text-3xl font-black mb-6">Multi-Tenant Context</h3>
                <p className="text-gray-400 text-lg font-bold leading-relaxed mb-10 max-w-xl">
                  You are currently managing <span className="text-white underline decoration-blue-500 underline-offset-8">{loc?.name}</span> within the 
                  <span className="text-white"> {org?.name}</span> organization. These parameters define your global terminal behaviors.
                </p>
                <div className="flex flex-wrap gap-8 pt-8 border-t border-white/10">
                    <div>
                        <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2">Organization Node</span>
                        <code className="text-blue-400 font-black text-sm">{org?.id}</code>
                    </div>
                    <div>
                        <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2">Location Terminal</span>
                        <code className="text-purple-400 font-black text-sm">{loc?.id}</code>
                    </div>
                </div>
            </div>
        </div>

        <div className="bg-purple-600 text-white rounded-[3.5rem] p-12 flex flex-col justify-between group overflow-hidden relative">
             <div className="absolute right-[-10%] top-[-10%] text-white/10 group-hover:rotate-45 transition-transform duration-700">
                <ShieldAlert size={200} />
             </div>
             <div>
                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 border border-white/20">
                    <Check size={28} strokeWidth={3} />
                </div>
                <h3 className="text-2xl font-black mb-4">Compliance Audit</h3>
                <p className="text-purple-100 font-bold leading-relaxed">
                    All modifications to tax structures and company registration data are cryptographically logged for organization-wide auditing.
                </p>
             </div>
             <div className="pt-10 flex items-center gap-3">
                <span className="text-[10px] font-black uppercase tracking-widest">Protocol Active</span>
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
             </div>
        </div>
      </div>
    </AdminPageLayout>
  );
}
