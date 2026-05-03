"use client";
import React, { useEffect, useState } from "react";
import { X, Users, MapPin, Hash, Save, Trash2, LayoutGrid, CheckCircle2, Loader2 } from "lucide-react";
import { useZones, useCreateTable, useUpdateTable, useDeleteTable, Table } from "@/hooks/useTables";
import { FormInput } from "@/components/shared/forms/FormInput";
import { FormSelect } from "@/components/shared/forms/FormSelect";
import ConfirmModal from "@/components/shared/ConfirmModal";
import toast from "react-hot-toast";

interface TableFormModalProps {
  table: Partial<Table> | null;
  isOpen: boolean;
  onClose: () => void;
}

const TableFormModal: React.FC<TableFormModalProps> = ({ table, isOpen, onClose }) => {
  const { data: zones } = useZones();
  const createMutation = useCreateTable();
  const updateMutation = useUpdateTable();
  const deleteMutation = useDeleteTable();

  const [formData, setFormData] = useState({
    name: "",
    capacity: 2,
    zoneId: "",
    status: "AVAILABLE",
    isActive: true,
    primaryColor: "",
    secondaryColor: "",
    iconName: "",
    groupBy: "",
    imageUrl: "",
  });

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  useEffect(() => {
    if (table) {
      setFormData({
        name: table.name || "",
        capacity: table.capacity || 2,
        zoneId: table.zoneId || "",
        status: table.status || "AVAILABLE",
        isActive: table.isActive !== undefined ? table.isActive : true,
        primaryColor: table.primaryColor || "",
        secondaryColor: table.secondaryColor || "",
        iconName: table.iconName || "",
        groupBy: table.groupBy || "",
        imageUrl: table.imageUrl || "",
      });
    } else {
      setFormData({
        name: "",
        capacity: 2,
        zoneId: zones?.[0]?.id || "",
        status: "AVAILABLE",
        isActive: true,
        primaryColor: "",
        secondaryColor: "",
        iconName: "",
        groupBy: "",
        imageUrl: "",
      });
    }
  }, [table, zones, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (table?.id) {
        await toast.promise(updateMutation.mutateAsync({ id: table.id, data: formData }), {
          loading: "Updating table...",
          success: "Table updated successfully",
          error: (err: any) => {
            const msg = err.response?.data?.error?.details || err.response?.data?.error?.message;
            return msg || "Failed to update table";
          },
        });
      } else {
        await toast.promise(createMutation.mutateAsync(formData), {
          loading: "Creating table...",
          success: "Table created successfully",
          error: (err: any) => {
            const msg = err.response?.data?.error?.details || err.response?.data?.error?.message;
            return msg || "Failed to create table";
          },
        });
      }
      onClose();
    } catch (error) {}
  };

  const handleDelete = async () => {
    if (!table?.id) return;

    if (table.status === "OCCUPIED") {
      toast.error("Cannot delete an occupied table. Please clear the table first.", {
        icon: "⚠️",
      });
      return;
    }

    setIsConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!table?.id) return;
    
    try {
      await toast.promise(deleteMutation.mutateAsync(table.id), {
        loading: "Deleting table...",
        success: "Table deleted successfully",
        error: (err: any) => {
          const backendMessage = err.response?.data?.error?.details || err.response?.data?.error?.message;
          return backendMessage || "Failed to delete table";
        },
      });
      setIsConfirmOpen(false);
      onClose();
    } catch (error) {}
  };

  return (
    <>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Header */}
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
              <LayoutGrid size={24} />
            </div>
            <div>
              <h3 className="text-2xl font-black text-gray-900 tracking-tight">
                {table?.id ? "Edit Table" : "Create Table"}
              </h3>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-0.5">Configuration Module</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-100 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all shadow-sm"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-10 space-y-10 max-h-[70vh] overflow-y-auto custom-scrollbar">
          <FormInput 
            label="Table Label / Number"
            icon={Hash}
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. T-1, Window Table"
            description="Unique identifier for the table."
          />

          <FormInput 
            label="Seating Capacity"
            icon={Users}
            type="number"
            required
            value={formData.capacity.toString()}
            onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) || 0 })}
            placeholder="e.g. 2, 4, 6"
            description="Number of people this table can accommodate."
          />

          <FormSelect 
            label="Dining Zone"
            icon={MapPin}
            required
            value={formData.zoneId}
            onChange={(e) => setFormData({ ...formData, zoneId: e.target.value })}
            options={zones?.map(z => ({ value: z.id, label: z.name })) || []}
            description={zones?.length === 0 ? "No zones found. Create one first." : "Dining area for this table."}
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
                placeholder="e.g. LayoutGrid"
              />
              <FormInput 
                label="Group By Label"
                value={formData.groupBy}
                onChange={(e) => setFormData({ ...formData, groupBy: e.target.value })}
                placeholder="e.g. Premium Tables"
              />
            </div>
            <FormInput 
              label="Table Image URL"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              placeholder="https://..."
            />
          </div>

          <div className="flex items-center justify-between p-6 bg-gray-50 rounded-3xl border border-gray-100">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm transition-all ${formData.isActive ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                <LayoutGrid size={24} />
              </div>
              <div>
                <p className="font-black text-gray-900 text-sm tracking-tight">Active Status</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Toggle visibility</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, isActive: !formData.isActive })}
              className={`w-14 h-8 rounded-full p-1 transition-all duration-300 flex items-center ${formData.isActive ? 'bg-emerald-500 justify-end' : 'bg-gray-300 justify-start'}`}
            >
              <div className="w-6 h-6 bg-white rounded-full shadow-md" />
            </button>
          </div>

          {/* Footer Actions */}
          <div className="flex gap-4 pt-4">
            {table?.id && (
              <button 
                type="button"
                onClick={handleDelete}
                disabled={deleteMutation.isPending || table.status === "OCCUPIED"}
                title={table.status === "OCCUPIED" ? "Cannot delete occupied table" : "Delete Table"}
                className={`p-5 rounded-2xl transition-all border flex items-center justify-center
                  ${table.status === "OCCUPIED" 
                    ? "bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed" 
                    : "bg-red-50 text-red-500 hover:bg-red-500 hover:text-white border-red-100 disabled:opacity-50"
                  }
                `}
              >
                <Trash2 size={24} />
              </button>
            )}
            <button 
              type="submit"
              disabled={createMutation.isPending || updateMutation.isPending}
              className="flex-1 py-5 bg-gray-900 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-gray-200 hover:bg-blue-600 hover:shadow-blue-100 transition-all active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {(createMutation.isPending || updateMutation.isPending) ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <CheckCircle2 size={18} />
              )}
              {table?.id ? "Update Table" : "Create Table"}
            </button>
          </div>
        </form>
      </div>
    </div>

    <ConfirmModal 
      isOpen={isConfirmOpen}
      onClose={() => setIsConfirmOpen(false)}
      onConfirm={confirmDelete}
      title="Delete Table"
      message={`Are you sure you want to delete "${table?.name}"? This action cannot be undone and will remove all associated layout data.`}
      confirmText="Yes, Delete"
      isLoading={deleteMutation.isPending}
    />
  </>
);
};

export default TableFormModal;
