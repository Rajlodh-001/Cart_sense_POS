"use client";
import React, { useState, useEffect } from "react";
import { X, CheckCircle2, Loader2, MapPin } from "lucide-react";
import { useCreateLocation, useUpdateAnyLocation, LocationSettings } from "@/hooks/useSettings";
import { FormInput } from "@/components/shared/forms/FormInput";
import toast from "react-hot-toast";

interface LocationFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  location?: LocationSettings | null;
}

const LocationFormModal: React.FC<LocationFormModalProps> = ({ isOpen, onClose, location }) => {
  const [formData, setFormData] = useState({
    name: "",
    locationSkuId: "",
    address: "",
    phone: "",
    email: "",
  });

  const createMutation = useCreateLocation();
  const updateMutation = useUpdateAnyLocation();

  useEffect(() => {
    if (location && isOpen) {
      setFormData({
        name: location.name || "",
        locationSkuId: (location as any).locationSkuId || "",
        address: location.address || "",
        phone: (location as any).phone || "",
        email: (location as any).email || "",
      });
    } else if (isOpen) {
      setFormData({
        name: "",
        locationSkuId: "",
        address: "",
        phone: "",
        email: "",
      });
    }
  }, [location, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (location?.id) {
        await toast.promise(updateMutation.mutateAsync({ id: location.id, data: formData }), {
          loading: "Updating location...",
          success: "Location updated successfully",
          error: (err) => err.message || "Failed to update location",
        });
      } else {
        await toast.promise(createMutation.mutateAsync(formData), {
          loading: "Creating location...",
          success: "Location created successfully",
          error: (err) => err.message || "Failed to create location",
        });
      }
      onClose();
    } catch (error) {}
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="px-10 py-10 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-gray-900 text-white shadow-lg">
              <MapPin size={24} />
            </div>
            <div>
              <h3 className="text-2xl font-black text-gray-900 tracking-tight">
                {location ? "Edit Location" : "Create Location"}
              </h3>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-0.5">Store Node</p>
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
            label="Location Name"
            icon={MapPin}
            required
            autoFocus
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Flagship Store (HQ)"
          />
          <FormInput 
            label="Location SKU ID"
            required
            value={formData.locationSkuId}
            onChange={(e) => setFormData({ ...formData, locationSkuId: e.target.value })}
            placeholder="e.g. BK-BO-001"
            disabled={!!location} // Preserve original SKU identifier on edit
          />
          <FormInput 
            label="Address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            placeholder="e.g. 123 Main St, New York"
          />
          <FormInput 
            label="Phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="e.g. +1234567890"
          />
          <FormInput 
            label="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="e.g. store@example.com"
          />

          <button 
            type="submit"
            disabled={createMutation.isPending || updateMutation.isPending || !formData.name.trim() || !formData.locationSkuId.trim()}
            className="w-full py-5 bg-gray-900 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-gray-200 hover:bg-blue-600 hover:shadow-blue-100 transition-all active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {(createMutation.isPending || updateMutation.isPending) ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <CheckCircle2 size={18} />
            )}
            {location ? "Save Changes" : "Create Location"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LocationFormModal;
