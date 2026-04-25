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
  Zap
} from "lucide-react";
import { FormInput } from "@/components/shared/forms/FormInput";
import { FormSection } from "@/components/shared/forms/FormSection";
import { useCreateRole, useUpdateRole, RoleData, usePermissions } from "@/hooks/useUsers";
import toast from "react-hot-toast";

interface AddRoleModalProps {
  role?: RoleData | null;
  onClose: () => void;
}

const AddRoleModal: React.FC<AddRoleModalProps> = ({ role, onClose }) => {
  const isEditing = !!role;
  const createRole = useCreateRole();
  const updateRole = useUpdateRole();
  const { data: availablePermissions } = usePermissions();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    permissionIds: [] as string[],
  });

  useEffect(() => {
    if (role) {
      setFormData({
        name: role.name,
        description: role.description || "",
        permissionIds: role.permissions?.map(p => p.id) || [],
      });
    }
  }, [role]);

  const togglePermission = (id: string) => {
    setFormData(prev => ({
      ...prev,
      permissionIds: prev.permissionIds.includes(id)
        ? prev.permissionIds.filter(p => p !== id)
        : [...prev.permissionIds, id]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await toast.promise(updateRole.mutateAsync({ id: role!.id, data: formData }), {
          loading: "Updating security set...",
          success: "Role updated",
          error: (err) => err.message || "Failed to update",
        });
      } else {
        await toast.promise(createRole.mutateAsync(formData), {
          loading: "Defining role...",
          success: "Security role created",
          error: (err) => err.message || "Failed to create",
        });
      }
      onClose();
    } catch (error) {}
  };

  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* Product Style Header */}
      <div className="px-10 py-10 border-b border-gray-50 flex items-center justify-between bg-white">
         <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-purple-600 text-white rounded-[1.5rem] flex items-center justify-center shadow-2xl">
                <ShieldAlert size={28} strokeWidth={2.5} />
            </div>
            <div>
                <h2 className="text-3xl font-black text-gray-900 tracking-tight">{isEditing ? "Upgrade Role" : "New Security Set"}</h2>
                <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.3em] mt-1">Permission Matrix Control</h4>
            </div>
         </div>
         <button onClick={onClose} className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:text-red-500 transition-all border border-gray-100">
            <XCircle size={20} />
         </button>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto custom-scrollbar p-12">
        <div className="max-w-6xl mx-auto space-y-12">
            {/* TOP BROAD SECTION: DEFINITION */}
            <FormSection icon={Settings} title="Security Protocol" subtitle="Identity of this permission group">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FormInput 
                        label="Role Designation" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. SENIOR_CASHIER"
                        description="Internal identifier for system access."
                    />
                    <FormInput 
                        label="Role Narrative" 
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Brief description of responsibilities..."
                        description="Used for organizational clarity."
                    />
                </div>
            </FormSection>

            {/* RESOURCE MATRIX: BROAD GRID */}
            <FormSection icon={Layout} title="Resource Matrix" subtitle="Detailed system access configuration">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                    {availablePermissions?.map((perm) => {
                        const isSelected = formData.permissionIds.includes(perm.id);
                        return (
                            <div 
                                key={perm.id}
                                onClick={() => togglePermission(perm.id)}
                                className={`
                                    p-6 rounded-[1.5rem] border-2 cursor-pointer transition-all duration-300 flex flex-col gap-3 group
                                    ${isSelected 
                                        ? "bg-purple-50/50 border-purple-500 shadow-lg shadow-purple-500/10" 
                                        : "bg-white border-gray-100 hover:border-gray-200"
                                    }
                                `}
                            >
                                <div className="flex items-center justify-between">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${isSelected ? "bg-purple-600 text-white" : "bg-gray-50 text-gray-400"}`}>
                                        <Zap size={18} strokeWidth={3} />
                                    </div>
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${isSelected ? "bg-purple-600 border-purple-600 shadow-sm" : "border-gray-100 bg-white"}`}>
                                        {isSelected && <CheckCircle2 size={12} className="text-white" strokeWidth={4} />}
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <h5 className={`text-[11px] font-black uppercase tracking-wider ${isSelected ? "text-purple-900" : "text-gray-900"}`}>
                                        {perm.name.replace(/:/g, " / ")}
                                    </h5>
                                    <p className="text-[10px] font-bold text-gray-400 leading-relaxed uppercase tracking-tighter opacity-70">
                                        System Resource Authorization
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </FormSection>
        </div>
      </form>

      {/* Footer */}
      <div className="p-8 border-t border-gray-50 flex items-center justify-between bg-gray-50/50">
         <button type="button" onClick={onClose} className="px-10 py-5 text-[11px] font-black uppercase tracking-[0.3em] text-gray-400 hover:text-gray-900 transition-colors">Discard</button>
         <button 
           onClick={handleSubmit}
           className="px-12 py-5 bg-gray-900 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-2xl shadow-gray-900/20 hover:bg-purple-600 transition-all flex items-center gap-3"
         >
           <ShieldCheck size={16} strokeWidth={3} />
           {isEditing ? "Apply Policy Changes" : "Deploy Security Set"}
         </button>
      </div>
    </div>
  );
};

export default AddRoleModal;
