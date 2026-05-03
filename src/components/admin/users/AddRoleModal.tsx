import React, { useState, useEffect } from "react";
import {
  Settings,
  ShieldCheck,
  ShieldAlert,
  CheckCircle2,
  XCircle,
  Layout,
  Lock,
  Search,
  Zap,
  Plus,
  Save,
  Tag,
  Key,
  Palette
} from "lucide-react";
import { FormInput } from "@/components/shared/forms/FormInput";
import { FormSection } from "@/components/shared/forms/FormSection";
import {
  useCreateRole,
  useUpdateRole,
  RoleData,
  usePermissions,
  useCreatePermission,
  useRoleGroups,
  usePermissionGroups
} from "@/hooks/useUsers";
import { FormCreatableSelect } from "@/components/shared/forms/FormCreatableSelect";
import LucideIcon from "@/components/shared/LucideIcon";
import toast from "react-hot-toast";

interface AddRoleModalProps {
  role?: RoleData | null;
  onClose: () => void;
}

const AddRoleModal: React.FC<AddRoleModalProps> = ({ role, onClose }) => {
  const isEditing = !!role;
  const createRole = useCreateRole();
  const updateRole = useUpdateRole();
  const createPermission = useCreatePermission();
  const { data: availablePermissions } = usePermissions();
  const { data: roleGroups } = useRoleGroups();
  const { data: permissionGroups } = usePermissionGroups();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    permissionIds: [] as string[],
    primaryColor: "",
    secondaryColor: "",
    iconName: "",
    groupBy: "",
    imageUrl: "",
  });

  // NEW: Permission Creation State
  const [showAddPermission, setShowAddPermission] = useState(false);
  const [newPerm, setNewPerm] = useState({
    resource: "",
    action: "",
    category: "GENERAL",
    primaryColor: "",
    secondaryColor: "",
    iconName: "",
    groupBy: "",
    imageUrl: ""
  });

  useEffect(() => {
    if (role) {
      setFormData({
        name: role.name,
        description: role.description || "",
        permissionIds: role.permissions?.map((p) => p.id) || [],
        primaryColor: role.primaryColor || "",
        secondaryColor: role.secondaryColor || "",
        iconName: role.iconName || "",
        groupBy: role.groupBy || "",
        imageUrl: role.imageUrl || "",
      });
    }
  }, [role]);

  const togglePermission = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      permissionIds: prev.permissionIds.includes(id)
        ? prev.permissionIds.filter((p) => p !== id)
        : [...prev.permissionIds, id],
    }));
  };

  const handleCreatePermission = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!newPerm.name || !newPerm.resource || !newPerm.action) {
        toast.error("Please fill all permission fields");
        return;
    }
    try {
        await toast.promise(createPermission.mutateAsync(newPerm), {
            loading: "Creating capability...",
            success: "New capability added to hub",
            error: "Failed to create capability"
        });
        setShowAddPermission(false);
        setNewPerm({ 
          name: "", 
          resource: "", 
          action: "", 
          category: "GENERAL",
          primaryColor: "",
          secondaryColor: "",
          iconName: "",
          groupBy: "",
          imageUrl: ""
        });
    } catch (error) {}
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await toast.promise(
          updateRole.mutateAsync({ id: role!.id, data: formData }),
          {
            loading: "Updating role...",
            success: "Role updated",
            error: (err) => err.message || "Failed to update",
          },
        );
      } else {
        await toast.promise(createRole.mutateAsync(formData), {
          loading: "Creating role...",
          success: "Role created",
          error: (err) => err.message || "Failed to create",
        });
      }
      onClose();
    } catch (error) {}
  };

  return (
    <div className="flex-1 min-h-0 flex flex-col bg-white relative">
      {/* Product Style Header */}
      <div className="px-10 py-10 border-b border-gray-50 flex items-center justify-between bg-white">
        <div className="flex items-center gap-6">
          <div 
            className="w-16 h-16 rounded-[1.5rem] flex items-center justify-center shadow-2xl transition-all duration-500"
            style={{ 
                backgroundColor: formData.primaryColor || '#9333ea',
                color: 'white',
                boxShadow: formData.primaryColor ? `0 15px 40px ${formData.primaryColor}30` : '0 15px 40px rgba(0,0,0,0.1)'
            }}
          >
            <ShieldAlert size={28} strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">
              {isEditing ? "Edit Role" : "New Role"}
            </h2>
            <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.3em] mt-1">
              Identity Hub
            </h4>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:text-red-500 transition-all border border-gray-100"
        >
          <XCircle size={20} />
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex-1 min-h-0 overflow-y-auto custom-scrollbar p-12"
      >
        <div className="max-w-6xl mx-auto space-y-16">
          {/* TOP BROAD SECTION: DEFINITION */}
          <FormSection
            icon={Settings}
            title="Role Details"
            subtitle="Name and description of this role"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FormInput
                label="Role Designation"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="e.g. SENIOR_CASHIER"
                description="Internal identifier for system access."
              />
              <FormInput
                label="Role Narrative"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Brief description of responsibilities..."
                description="Used for organizational clarity."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 border-t border-gray-50 pt-8">
              <div className="grid grid-cols-2 gap-6">
                <FormInput
                  label="Primary Color"
                  value={formData.primaryColor}
                  onChange={(e) =>
                    setFormData({ ...formData, primaryColor: e.target.value })
                  }
                  placeholder="e.g. #9333ea"
                  description="Branding primary color."
                />
                <FormInput
                  label="Secondary Color"
                  value={formData.secondaryColor}
                  onChange={(e) =>
                    setFormData({ ...formData, secondaryColor: e.target.value })
                  }
                  placeholder="e.g. #faf5ff"
                  description="Branding light color."
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <FormInput
                  label="Icon Name"
                  value={formData.iconName}
                  onChange={(e) =>
                    setFormData({ ...formData, iconName: e.target.value })
                  }
                  placeholder="e.g. Shield, Zap"
                  description="Lucide icon name."
                />
                <FormInput
                  label="Group By / Category"
                  value={formData.groupBy}
                  onChange={(e) =>
                    setFormData({ ...formData, groupBy: e.target.value })
                  }
                  placeholder="e.g. Management Team"
                  description="UI grouping label."
                />
              </div>
            </div>
            <div className="mt-8">
                <FormInput
                  label="Role Image URL"
                  value={formData.imageUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, imageUrl: e.target.value })
                  }
                  placeholder="https://..."
                  description="Optional image for the role profile."
                />
            </div>
          </FormSection>

          {/* RESOURCE MATRIX: GROUPED GRID */}
          <FormSection
            icon={Layout}
            title="System Capabilities"
            subtitle="Configure granular access across POS domains"
          >
            <div className="space-y-16 mt-8">
              {/* Grouping Logic */}
              {(Array.from(new Set(availablePermissions?.map((p) => p.category) || [])).sort()).map((category) => (
                <div key={category} className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="h-px flex-1 bg-gray-100" />
                    <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 bg-white px-4">
                      {category} Group
                    </h3>
                    <div className="h-px flex-1 bg-gray-100" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {availablePermissions?.filter((p) => p.category === category).map((perm) => {
                      const isSelected = formData.permissionIds.includes(perm.id);
                      return (
                        <div
                          key={perm.id}
                          onClick={() => togglePermission(perm.id)}
                          className={`
                            p-6 rounded-[2rem] border-2 cursor-pointer transition-all duration-500 flex flex-col gap-4 group relative overflow-hidden
                            ${isSelected
                              ? "bg-purple-50/80 border-purple-500 shadow-xl shadow-purple-500/10 scale-[1.02]"
                              : "bg-white border-gray-100 hover:border-purple-200 hover:shadow-lg hover:scale-[1.01]"
                            }
                          `}
                        >
                          {isSelected && (
                            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full -mr-8 -mt-8 animate-pulse" />
                          )}
                          <div className="flex items-center justify-between relative z-10">
                            <div
                              className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500"
                              style={{
                                backgroundColor: isSelected ? (perm.primaryColor || "#9333ea") : "#f9fafb",
                                color: isSelected ? "#ffffff" : (perm.primaryColor || "#9ca3af"),
                                boxShadow: isSelected ? `0 8px 20px ${(perm.primaryColor || "#9333ea")}40` : "none"
                              }}
                            >
                              <LucideIcon name={perm.iconName || "Zap"} size={20} strokeWidth={2.5} />
                            </div>
                            <div
                              className="w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-500"
                              style={{
                                backgroundColor: isSelected ? (perm.primaryColor || "#9333ea") : "#ffffff",
                                borderColor: isSelected ? (perm.primaryColor || "#9333ea") : "#f3f4f6"
                              }}
                            >
                              {isSelected && <CheckCircle2 size={14} className="text-white" strokeWidth={3} />}
                            </div>
                          </div>
                          <div className="space-y-2 relative z-10">
                            <h5 className={`text-[13px] font-black tracking-tight leading-tight ${isSelected ? "text-purple-900" : "text-gray-900 group-hover:text-purple-700"}`}>
                              {perm.name}
                            </h5>
                            <div className="flex items-center gap-1.5 opacity-50">
                              <Key size={10} style={{ color: isSelected ? (perm.primaryColor || "#9333ea") : "#9ca3af" }} />
                              <span className="text-[10px] font-bold uppercase tracking-tighter" style={{ color: isSelected ? (perm.primaryColor || "#9333ea") : "#9ca3af" }}>
                                {perm.resource}:{perm.action}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* ADD CUSTOM PERMISSION SECTION */}
              <div className="space-y-6 pt-8 border-t border-gray-50">
                <div className="flex items-center gap-4">
                  <div className="h-px flex-1 bg-gray-100" />
                  <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-purple-400 bg-white px-4">
                    Expand Capabilities
                  </h3>
                  <div className="h-px flex-1 bg-gray-100" />
                </div>

                {!showAddPermission ? (
                  <div
                    onClick={() => setShowAddPermission(true)}
                    className="p-8 rounded-[2rem] border-2 border-dashed border-gray-200 hover:border-purple-400 hover:bg-purple-50/30 transition-all duration-500 flex flex-col items-center justify-center gap-4 group cursor-pointer max-w-sm mx-auto"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-purple-600 group-hover:text-white group-hover:rotate-90 transition-all duration-500">
                      <Plus size={28} strokeWidth={2.5} />
                    </div>
                    <div className="text-center">
                      <span className="block text-[11px] font-black uppercase tracking-widest text-gray-900 group-hover:text-purple-600 transition-colors">Create Custom Skill</span>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter opacity-70">Define new system authorization</span>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 bg-white border border-purple-100 rounded-[2.5rem] mt-6 space-y-8 animate-in slide-in-from-top-4 duration-500">
                    <div className="flex items-center justify-between">
                      <div>
                        <h6 className="text-[13px] font-black text-gray-900 tracking-tight">New System Skill</h6>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Expansion Protocol</p>
                      </div>
                      <button type="button" onClick={() => setShowAddPermission(false)} className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-red-500 transition-all">
                        <XCircle size={14} />
                      </button>
                    </div>

                    <div className="space-y-6">
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Label</label>
                        <input
                          autoFocus
                          className="w-full bg-gray-50 border-2 border-transparent rounded-2xl px-5 py-4 text-xs font-black focus:border-purple-500 focus:bg-white transition-all outline-none"
                          placeholder="e.g. VIP REFUND"
                          value={newPerm.name}
                          onChange={(e) => setNewPerm({ ...newPerm, name: e.target.value })}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                          <label className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Domain</label>
                          <input
                            className="w-full bg-gray-50 border-2 border-transparent rounded-2xl px-5 py-4 text-[10px] font-black focus:border-purple-500 focus:bg-white transition-all outline-none uppercase tracking-widest"
                            placeholder="RESOURCE"
                            value={newPerm.resource}
                            onChange={(e) => setNewPerm({ ...newPerm, resource: e.target.value.toLowerCase() })}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Action</label>
                          <input
                            className="w-full bg-gray-50 border-2 border-transparent rounded-2xl px-5 py-4 text-[10px] font-black focus:border-purple-500 focus:bg-white transition-all outline-none uppercase tracking-widest"
                            placeholder="VERB"
                            value={newPerm.action}
                            onChange={(e) => setNewPerm({ ...newPerm, action: e.target.value.toUpperCase() })}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <FormCreatableSelect
                            label="Group Label"
                            value={newPerm.groupBy}
                            onChange={(val) => setNewPerm({ ...newPerm, groupBy: val })}
                            options={permissionGroups?.map((g) => ({ value: g, label: g })) || []}
                            placeholder="System, Inventory, etc."
                          />
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handleCreatePermission}
                        className="w-full py-5 bg-purple-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-purple-600/30 hover:bg-purple-700 transition-all flex items-center justify-center gap-3 mt-4"
                      >
                        <Save size={16} strokeWidth={3} />
                        Deploy Skill
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </FormSection>

          {/* SECTION: VISUAL IDENTITY */}
          <FormSection icon={Palette} title="Branding & Sorting" subtitle="Configure how this role appears in the system">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormInput 
                    label="Primary Color"
                    icon={Palette}
                    value={formData.primaryColor}
                    onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                    placeholder="#HEX"
                />
                <FormCreatableSelect 
                    label="Group Label"
                    icon={Layout}
                    value={formData.groupBy}
                    onChange={(val) => setFormData({ ...formData, groupBy: val })}
                    options={roleGroups?.map(g => ({ value: g, label: g })) || []}
                    placeholder="Management, Operations, etc."
                />
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                <FormInput 
                    label="Icon Name"
                    icon={Zap}
                    value={formData.iconName}
                    onChange={(e) => setFormData({ ...formData, iconName: e.target.value })}
                    placeholder="Shield, User, etc."
                />
                <FormInput 
                    label="Secondary Color"
                    icon={Palette}
                    value={formData.secondaryColor}
                    onChange={(e) => setFormData({ ...formData, secondaryColor: e.target.value })}
                    placeholder="#HEX"
                />
             </div>
          </FormSection>
        </div>
      </form>

      {/* Footer */}
      <div className="px-10 py-10 border-t border-gray-50 flex items-center justify-between bg-gray-50/50">
        <button
          type="button"
          onClick={onClose}
          className="px-10 py-5 text-[11px] font-black uppercase tracking-[0.3em] text-gray-400 hover:text-gray-900 transition-colors"
        >
          Discard
        </button>
        <button
          onClick={handleSubmit}
          className="px-12 py-5 bg-gray-900 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-2xl shadow-gray-900/20 hover:bg-purple-600 transition-all flex items-center gap-3"
        >
          <ShieldCheck size={16} strokeWidth={3} />
          {isEditing ? "Update Role" : "Create Role"}
        </button>
      </div>
    </div>
  );
};

export default AddRoleModal;
