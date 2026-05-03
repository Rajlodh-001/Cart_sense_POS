"use client";
import React, { useEffect, useState } from "react";
import { X, ShieldCheck, Hash, Zap, Layout, Save, Info, Trash2, Loader2, CheckCircle2, Layers } from "lucide-react";
import LucideIcon from "@/components/shared/LucideIcon";
import { Permission, useCreatePermission, useUpdatePermission } from "@/hooks/useUsers";
import { FormInput } from "@/components/shared/forms/FormInput";
import { FormSelect } from "@/components/shared/forms/FormSelect";
import toast from "react-hot-toast";

interface AddPermissionModalProps {
  permission: Permission | null;
  onClose: () => void;
}

const AddPermissionModal: React.FC<AddPermissionModalProps> = ({ permission, onClose }) => {
  const createMutation = useCreatePermission();
  const updateMutation = useUpdatePermission();

  const [formData, setFormData] = useState({
    name: "",
    resource: "",
    action: "",
    category: "OPERATIONS",
    description: "",
    primaryColor: "",
    secondaryColor: "",
    iconName: "",
    groupBy: "",
    imageUrl: "",
  });

  useEffect(() => {
    if (permission) {
      setFormData({
        name: permission.name || "",
        resource: permission.resource || "",
        action: permission.action || "",
        category: permission.category || "OPERATIONS",
        description: permission.description || "",
        primaryColor: permission.primaryColor || "",
        secondaryColor: permission.secondaryColor || "",
        iconName: permission.iconName || "",
        groupBy: permission.groupBy || "",
        imageUrl: permission.imageUrl || "",
      });
    } else {
      setFormData({
        name: "",
        resource: "",
        action: "",
        category: "OPERATIONS",
        description: "",
        primaryColor: "",
        secondaryColor: "",
        iconName: "",
        groupBy: "",
        imageUrl: "",
      });
    }
  }, [permission]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (permission?.id) {
        await toast.promise(updateMutation.mutateAsync({ id: permission.id, data: formData }), {
          loading: "Updating capability...",
          success: "Capability updated",
          error: "Failed to update capability",
        });
      } else {
        await toast.promise(createMutation.mutateAsync(formData), {
          loading: "Creating capability...",
          success: "Capability created",
          error: "Failed to create capability",
        });
      }
      onClose();
    } catch (error) {}
  };

  return (
    <div className="bg-white rounded-[2.5rem] overflow-hidden flex flex-col">
      {/* Header */}
      <div className="px-10 py-10 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
        <div className="flex items-center gap-5">
          <div 
            className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-colors"
            style={{ 
              backgroundColor: formData.primaryColor || '#9333ea',
              color: 'white',
              boxShadow: `0 10px 15px -3px ${formData.primaryColor || '#9333ea'}20` 
            }}
          >
            <LucideIcon name={formData.iconName || 'Zap'} size={28} />
          </div>
          <div>
            <h3 className="text-2xl font-black text-gray-900 tracking-tight">
              {permission ? "Edit Capability" : "New Capability"}
            </h3>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-0.5">Authorization Layer</p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-100 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all shadow-sm"
        >
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-10 space-y-8">
        <FormInput 
          label="Display Name"
          icon={ShieldCheck}
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="e.g. Manage Tables, Process Refunds"
          description="A human-readable name for this capability."
        />

        <div className="grid grid-cols-2 gap-6">
          <FormInput 
            label="Resource Code"
            icon={Hash}
            required
            value={formData.resource}
            onChange={(e) => setFormData({ ...formData, resource: e.target.value })}
            placeholder="e.g. table, product"
            description="Technical identifier (singular)."
          />
          <FormSelect 
            label="Action Type"
            icon={Zap}
            required
            value={formData.action}
            onChange={(e) => setFormData({ ...formData, action: e.target.value })}
            options={[
              { value: "CREATE", label: "Create" },
              { value: "UPDATE", label: "Update" },
              { value: "DELETE", label: "Delete" },
              { value: "MANAGE", label: "Manage" },
              { value: "READ", label: "Read / View" },
              { value: "FINANCIAL", label: "Financial" },
            ]}
          />
        </div>

        <FormSelect 
          label="Domain (Category)"
          icon={Layers}
          required
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          options={[
            { value: "POS", label: "Point of Sale" },
            { value: "KITCHEN", label: "Kitchen Ops" },
            { value: "MANAGEMENT", label: "Management" },
            { value: "OPERATIONS", label: "Store Operations" },
            { value: "ANALYTICS", label: "Analytics & Reports" },
          ]}
        />

        <FormInput 
          label="Description"
          icon={ShieldCheck}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="What does this capability allow staff to do?"
        />

        <div className="pt-6 border-t border-gray-100 space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
              <Layers size={16} />
            </div>
            <h4 className="text-xs font-black uppercase tracking-widest text-gray-500">Visual Identity & Grouping</h4>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <FormInput 
              label="Primary Color"
              icon={ShieldCheck}
              value={formData.primaryColor}
              onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
              placeholder="e.g. #3b82f6"
              description="HEX code for branding."
            />
            <FormInput 
              label="Secondary Color"
              icon={ShieldCheck}
              value={formData.secondaryColor}
              onChange={(e) => setFormData({ ...formData, secondaryColor: e.target.value })}
              placeholder="e.g. #eff6ff"
              description="Light variation for backgrounds."
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <FormInput 
              label="Icon Name"
              icon={Zap}
              value={formData.iconName}
              onChange={(e) => setFormData({ ...formData, iconName: e.target.value })}
              placeholder="e.g. Zap, Shield, User"
              description="Lucide icon identifier."
            />
            <FormInput 
              label="Group By Label"
              icon={Layers}
              value={formData.groupBy}
              onChange={(e) => setFormData({ ...formData, groupBy: e.target.value })}
              placeholder="e.g. ANALYTICS Domain"
              description="Used for section headers."
            />
          </div>

          <FormInput 
            label="Image URL"
            icon={Layers}
            value={formData.imageUrl}
            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            placeholder="https://..."
            description="Optional illustrative image."
          />
        </div>

        <button 
          type="submit"
          disabled={createMutation.isPending || updateMutation.isPending}
          className="w-full py-5 bg-gray-900 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-gray-200 hover:bg-purple-600 hover:shadow-purple-100 transition-all active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50"
        >
          {(createMutation.isPending || updateMutation.isPending) ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            <CheckCircle2 size={18} />
          )}
          {permission ? "Save Changes" : "Create Capability"}
        </button>
      </form>
    </div>
  );
};

export default AddPermissionModal;
