"use client";
import React, { useEffect, useState } from "react";
import { X, Users, MapPin, Hash, Save, Trash2, LayoutGrid } from "lucide-react";
import { useZones, useCreateTable, useUpdateTable, useDeleteTable, Table } from "@/hooks/useTables";
import { FormInput } from "@/components/shared/forms/FormInput";
import { FormSelect } from "@/components/shared/forms/FormSelect";
import toast from "react-hot-toast";

interface TableFormPanelProps {
  table: Partial<Table> | null;
  isOpen: boolean;
  onClose: () => void;
}

const TableFormPanel: React.FC<TableFormPanelProps> = ({ table, isOpen, onClose }) => {
  const { data: zones } = useZones();
  const createMutation = useCreateTable();
  const updateMutation = useUpdateTable();
  const deleteMutation = useDeleteTable();

  const [formData, setFormData] = useState({
    name: "",
    capacity: 2,
    zoneId: "",
  });

  useEffect(() => {
    if (table) {
      setFormData({
        name: table.name || "",
        capacity: table.capacity || 2,
        zoneId: table.zoneId || (zones?.[0]?.id || ""),
      });
    } else {
      setFormData({
        name: "",
        capacity: 2,
        zoneId: zones?.[0]?.id || "",
      });
    }
  }, [table, zones, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (table?.id) {
        await toast.promise(updateMutation.mutateAsync({ id: table.id, data: formData }), {
          loading: "Updating table...",
          success: "Table updated successfully",
          error: (err) => err.message || "Failed to update table",
        });
      } else {
        await toast.promise(createMutation.mutateAsync(formData), {
          loading: "Creating table...",
          success: "Table created successfully",
          error: (err) => err.message || "Failed to create table",
        });
      }
      onClose();
    } catch (error) {}
  };

  const handleDelete = async () => {
    if (table?.id && confirm("Are you sure you want to delete this table?")) {
      try {
        await toast.promise(deleteMutation.mutateAsync(table.id), {
          loading: "Deleting table...",
          success: "Table deleted successfully",
          error: (err) => err.message || "Failed to delete table",
        });
        onClose();
      } catch (error) {}
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end overflow-hidden">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-8 border-b border-gray-50 bg-gray-50/30">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-gray-900 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-gray-200">
                <LayoutGrid size={24} />
             </div>
             <div>
                <h3 className="text-xl font-black text-gray-900 tracking-tight">
                {table?.id ? "Edit Table" : "New Table"}
                </h3>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-0.5">
                Configuration Panel
                </p>
             </div>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-gray-100 rounded-xl transition-all text-gray-400">
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar">
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
            label="Assigned Area (Zone)"
            icon={MapPin}
            required
            value={formData.zoneId}
            onChange={(e) => setFormData({ ...formData, zoneId: e.target.value })}
            options={zones?.map(z => ({ value: z.id, label: z.name })) || []}
            placeholder="Select a zone..."
            description={zones?.length === 0 ? "No zones found. Create one first." : "Dining area for this table."}
          />
        </form>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 flex items-center gap-4">
          {table?.id && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
              className="p-4 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-2xl transition-all border border-red-100 shadow-sm"
            >
              <Trash2 size={24} />
            </button>
          )}
          <button
            onClick={handleSubmit}
            disabled={createMutation.isPending || updateMutation.isPending}
            className="flex-1 flex items-center justify-center gap-2 py-4 bg-gray-900 text-white rounded-2xl font-black shadow-xl shadow-gray-200 hover:bg-blue-600 hover:shadow-blue-100 transition-all active:scale-95 disabled:opacity-50"
          >
            <Save size={20} />
            <span>{table?.id ? "Update Table" : "Create Table"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableFormPanel;
