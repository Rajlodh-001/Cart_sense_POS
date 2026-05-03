"use client";
import React, { useEffect, useState } from "react";
import { X, CheckCircle2, Loader2, LayoutGrid, Trash2 } from "lucide-react";
import { useCreateZone, useUpdateZone, useDeleteZone, Zone } from "@/hooks/useTables";
import { FormInput } from "@/components/shared/forms/FormInput";
import LucideIcon from "@/components/shared/LucideIcon";
import toast from "react-hot-toast";

interface ZoneFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  zone?: Zone | null; // Optional zone for editing
}

const ZoneFormModal: React.FC<ZoneFormModalProps> = ({ isOpen, onClose, zone }) => {
  const [formData, setFormData] = useState({
    name: "",
    primaryColor: "",
    secondaryColor: "",
    iconName: "",
    groupBy: "",
    imageUrl: "",
  });
  
  const createMutation = useCreateZone();
  const updateMutation = useUpdateZone();
  const deleteMutation = useDeleteZone();

  useEffect(() => {
    if (zone && isOpen) {
      setFormData({
        name: zone.name || "",
        primaryColor: zone.primaryColor || "",
        secondaryColor: zone.secondaryColor || "",
        iconName: zone.iconName || "",
        groupBy: zone.groupBy || "",
        imageUrl: zone.imageUrl || "",
      });
    } else if (isOpen) {
      setFormData({
        name: "",
        primaryColor: "",
        secondaryColor: "",
        iconName: "",
        groupBy: "",
        imageUrl: "",
      });
    }
  }, [zone, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (zone?.id) {
        await toast.promise(updateMutation.mutateAsync({ id: zone.id, data: formData }), {
          loading: "Updating area...",
          success: "Area updated successfully",
          error: (err) => err.message || "Failed to update area",
        });
      } else {
        await toast.promise(createMutation.mutateAsync(formData), {
          loading: "Creating area...",
          success: "Area created successfully",
          error: (err) => err.message || "Failed to create area",
        });
      }
      onClose();
    } catch (error) {}
  };

  const handleDelete = async () => {
    if (!zone?.id) return;
    if (confirm("Are you sure you want to delete this dining area?")) {
      try {
        await toast.promise(deleteMutation.mutateAsync(zone.id), {
          loading: "Deleting area...",
          success: "Area deleted successfully",
          error: (err) => err.message || "Failed to delete area",
        });
        onClose();
      } catch (error) {}
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="px-10 py-10 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
          <div className="flex items-center gap-5">
            <div 
              className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-colors"
              style={{ 
                backgroundColor: formData.primaryColor || '#111827',
                color: 'white',
                boxShadow: `0 8px 15px -3px ${formData.primaryColor || '#111827'}20` 
              }}
            >
              <LucideIcon name={formData.iconName || 'LayoutGrid'} size={24} />
            </div>
            <div>
              <h3 className="text-2xl font-black text-gray-900 tracking-tight">
                {zone ? "Edit Area" : "Create Area"}
              </h3>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-0.5">Dining Infrastructure</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-100 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all shadow-sm"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-10">
          <FormInput 
            label="Area Name"
            icon={LayoutGrid}
            required
            autoFocus
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Roof Top, Garden, VIP"
            description="Give this dining section a recognizable name."
          />

          <div className="pt-8 border-t border-gray-100 space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Visual Identity</h4>
            <div className="grid grid-cols-2 gap-6">
              <FormInput 
                label="Primary Color"
                value={formData.primaryColor}
                onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                placeholder="#HEX"
              />
              <FormInput 
                label="Secondary Color"
                value={formData.secondaryColor}
                onChange={(e) => setFormData({ ...formData, secondaryColor: e.target.value })}
                placeholder="#HEX"
              />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <FormInput 
                label="Icon Name"
                value={formData.iconName}
                onChange={(e) => setFormData({ ...formData, iconName: e.target.value })}
                placeholder="e.g. Map"
              />
              <FormInput 
                label="Group By Label"
                value={formData.groupBy}
                onChange={(e) => setFormData({ ...formData, groupBy: e.target.value })}
                placeholder="e.g. Store Layout"
              />
            </div>
            <FormInput 
              label="Area Image URL"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              placeholder="https://..."
            />
          </div>

          <div className="flex gap-4">
            {zone && (
              <button 
                type="button"
                onClick={handleDelete}
                disabled={deleteMutation.isPending}
                className="p-5 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-2xl transition-all border border-red-100 disabled:opacity-50"
              >
                <Trash2 size={24} />
              </button>
            )}
            <button 
              type="submit"
              disabled={createMutation.isPending || updateMutation.isPending || !formData.name.trim()}
              className="flex-1 py-5 bg-gray-900 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-gray-200 hover:bg-blue-600 hover:shadow-blue-100 transition-all active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {(createMutation.isPending || updateMutation.isPending) ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <CheckCircle2 size={18} />
              )}
              {zone ? "Update Area" : "Create Area"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ZoneFormModal;
