"use client";
import React, { useState } from "react";
import { X, CheckCircle2, Loader2, Laptop } from "lucide-react";
import { useCreateDevice } from "@/hooks/useDevices";
import { FormInput } from "@/components/shared/forms/FormInput";
import toast from "react-hot-toast";

interface DeviceFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DeviceFormModal: React.FC<DeviceFormModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    deviceType: "TERMINAL",
    slug: "",
  });

  const createMutation = useCreateDevice();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await toast.promise(createMutation.mutateAsync(formData), {
        loading: "Creating device...",
        success: "Device registered successfully",
        error: (err) => err.message || "Failed to register device",
      });
      setFormData({
        name: "",
        deviceType: "TERMINAL",
        slug: "",
      });
      onClose();
    } catch (error) {}
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="px-10 py-10 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-gray-900 text-white shadow-lg">
              <Laptop size={24} />
            </div>
            <div>
              <h3 className="text-2xl font-black text-gray-900 tracking-tight">Register Device</h3>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-0.5">Terminal Hardware</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-100 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all shadow-sm"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-6">
          <FormInput 
            label="Device Name"
            icon={Laptop}
            required
            autoFocus
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Cashier Register 1"
          />
          
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 block mb-1">
              Device Type
            </label>
            <select
              value={formData.deviceType}
              onChange={(e) => setFormData({ ...formData, deviceType: e.target.value })}
              className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl font-bold text-sm focus:bg-white focus:ring-8 focus:ring-gray-900/5 focus:border-gray-900/10 transition-all outline-none"
            >
              <option value="TERMINAL">Cash Register Terminal</option>
              <option value="KDS">Kitchen Display System (KDS)</option>
              <option value="CUSTOMER_DISPLAY">Customer Facing Display</option>
            </select>
          </div>

          <FormInput 
            label="Unique Identifier Slug (Optional)"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            placeholder="e.g. register-1"
            description="Auto-generated from name if left empty."
          />

          <button 
            type="submit"
            disabled={createMutation.isPending || !formData.name.trim()}
            className="w-full py-5 bg-gray-900 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-gray-200 hover:bg-blue-600 hover:shadow-blue-100 transition-all active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {createMutation.isPending ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <CheckCircle2 size={18} />
            )}
            Register Device
          </button>
        </form>
      </div>
    </div>
  );
};

export default DeviceFormModal;
