import React, { useState, useEffect } from "react";
import { 
  User as UserIcon, 
  Mail, 
  Phone, 
  MapPin, 
  Building2, 
  Shield, 
  Lock, 
  Fingerprint,
  Users,
  CheckCircle2,
  XCircle,
  Layout
} from "lucide-react";
import { FormInput } from "@/components/shared/forms/FormInput";
import { FormSelect } from "@/components/shared/forms/FormSelect";
import { FormMultiSelect } from "@/components/shared/forms/FormMultiSelect";
import { FormToggle } from "@/components/shared/forms/FormToggle";
import { FormImage } from "@/components/shared/forms/FormImage";
import { FormSection } from "@/components/shared/forms/FormSection";
import { useCreateUser, useUpdateUser, User, useAllLocations, useRoles } from "@/hooks/useUsers";
import toast from "react-hot-toast";

interface AddUserModalProps {
  user?: User | null;
  onClose: () => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({ user, onClose }) => {
  const isEditing = !!user;
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();
  const { data: locations } = useAllLocations();
  const { data: roles } = useRoles();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    roleId: "",
    pin: "",
    image: "",
    isActive: true,
    accessibleLocationIds: [] as string[],
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        password: "",
        phone: user.phone || "",
        address: user.address || "",
        roleId: typeof user.role === 'string' ? user.role : (user.role?.id || ""),
        pin: user.pin || "",
        image: user.image || "",
        isActive: user.isActive,
        accessibleLocationIds: user.accessibleLocations?.map((l: any) => l.id) || [],
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await toast.promise(updateUser.mutateAsync({ id: user!.id, data: formData }), {
          loading: "Updating profile...",
          success: "Staff updated",
          error: (err) => err.message || "Failed to update",
        });
      } else {
        await toast.promise(createUser.mutateAsync(formData), {
          loading: "Creating account...",
          success: "Staff onboarded",
          error: (err) => err.message || "Failed to create",
        });
      }
      onClose();
    } catch (error) {}
  };

  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* Product Style Header Layer */}
      <div className="px-10 py-10 border-b border-gray-50 flex items-center justify-between bg-white relative z-20">
         <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-gray-900 text-white rounded-[1.5rem] flex items-center justify-center shadow-2xl">
                <Users size={28} strokeWidth={2.5} />
            </div>
            <div>
                <h2 className="text-3xl font-black text-gray-900 tracking-tight">{isEditing ? "Edit Account" : "New Staff"}</h2>
                <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.3em] mt-1">Identity Control System</h4>
            </div>
         </div>
         
         <button 
            type="button"
            onClick={onClose}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all border border-gray-100"
         >
            <XCircle size={20} />
         </button>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto custom-scrollbar bg-white">
        {/* Main Product-Style 2-Column Broad Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 p-12 max-w-7xl mx-auto">
          
          {/* LEFT COLUMN: VISUALS (Broad Focal Point) */}
          <div className="lg:col-span-4 space-y-10">
             <div className="sticky top-0">
                <FormImage 
                    label="Staff Profile Photo"
                    value={formData.image}
                    onChange={(val) => setFormData({ ...formData, image: val })}
                    description="High-fidelity visual ID for receipts & dashboard."
                />
             </div>
          </div>

          {/* RIGHT COLUMN: CORE DATA (Compact Spacing) */}
          <div className="lg:col-span-8 space-y-12">
             
             {/* SECTION: BASIC IDENTITY */}
             <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                    <FormInput 
                        label="Full Legal Name" 
                        icon={UserIcon}
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Michael Scott"
                    />
                    <FormToggle 
                        label="Account Status"
                        icon={CheckCircle2}
                        checked={formData.isActive}
                        onChange={(val) => setFormData({ ...formData, isActive: val })}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormInput 
                        label="Email Address" 
                        icon={Mail}
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. michael@dundermifflin.com"
                    />
                    <FormSelect 
                        label="Primary Security Role"
                        icon={Shield}
                        required
                        value={formData.roleId}
                        onChange={(e) => setFormData({ ...formData, roleId: e.target.value })}
                        options={roles?.map(r => ({ value: r.id, label: r.name })) || []}
                        placeholder="Select clearance level..."
                    />
                </div>
             </div>

             {/* SECTION: CONTACT & LOCATION */}
             <FormSection icon={Building2} title="Branch Distribution" subtitle="Physical access permissions">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <FormInput 
                        label="Direct Contact" 
                        icon={Phone}
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (555) 000-0000"
                    />
                    <FormInput 
                        label="Postal Address" 
                        icon={MapPin}
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        placeholder="Scranton, Pennsylvania"
                    />
                </div>
                <FormMultiSelect 
                    label="Operable Locations"
                    icon={Building2}
                    placeholder="Search branches..."
                    options={locations?.map(l => ({ value: l.id, label: l.name })) || []}
                    value={formData.accessibleLocationIds}
                    onChange={(val) => setFormData({ ...formData, accessibleLocationIds: val })}
                />
             </FormSection>

             {/* SECTION: AUTHENTICATION */}
             <FormSection icon={Lock} title="Terminal Security" subtitle="Credentials for POS and Backoffice">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormInput 
                        label={isEditing ? "Reset Password" : "Dashboard Password"}
                        icon={Lock}
                        type="password"
                        required={!isEditing}
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        placeholder="••••••••"
                    />
                    <FormInput 
                        label="Terminal PIN"
                        icon={Fingerprint}
                        type="text"
                        maxLength={4}
                        required
                        value={formData.pin}
                        onChange={(e) => setFormData({ ...formData, pin: e.target.value.replace(/\D/g, '') })}
                        placeholder="4 Digits Only"
                    />
                </div>
             </FormSection>
          </div>
        </div>
      </form>

      {/* Product Style Footer */}
      <div className="p-8 border-t border-gray-50 flex items-center justify-between bg-gray-50/50 relative z-20">
         <button 
           type="button"
           onClick={onClose}
           className="px-10 py-5 text-[11px] font-black uppercase tracking-[0.3em] text-gray-400 hover:text-gray-900 transition-colors"
         >
           Discard Changes
         </button>
         <button 
           onClick={handleSubmit}
           className="px-12 py-5 bg-gray-900 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-2xl shadow-gray-900/20 hover:bg-purple-600 transition-all active:scale-95 flex items-center gap-3"
         >
           <CheckCircle2 size={16} strokeWidth={3} />
           {isEditing ? "Update Staff Profile" : "Authorize New Staff"}
         </button>
      </div>
    </div>
  );
};

export default AddUserModal;
