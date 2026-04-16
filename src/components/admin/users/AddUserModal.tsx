import React, { useState, useEffect } from "react";
import { 
  User as UserIcon, 
  Mail, 
  Shield, 
  Lock, 
  Fingerprint, 
  Phone, 
  MapPin, 
  Check, 
  Loader2, 
  Activity,
  UserCircle
} from "lucide-react";
import { useCreateUser, useUpdateUser, User as UserType } from "@/hooks/useUsers";
import { FormSection } from "@/components/shared/forms/FormSection";
import { FormInput } from "@/components/shared/forms/FormInput";
import { FormSelect } from "@/components/shared/forms/FormSelect";
import { FormToggle } from "@/components/shared/forms/FormToggle";
import { FormImage } from "@/components/shared/forms/FormImage";

interface AddUserModalProps {
  user?: UserType | null;
  onClose: () => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({ user, onClose }) => {
  const isEditing = !!user;
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();
  const isPending = createUser.isPending || updateUser.isPending;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "CASHIER" as UserType["role"],
    password: "",
    pin: "",
    phone: "",
    address: "",
    image: "",
    isActive: true,
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
        password: "", 
        pin: (user as any).pin || "", 
        phone: (user as any).phone || "",
        address: (user as any).address || "",
        image: user.image || "",
        isActive: user.isActive,
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing) {
        const updateData: any = { ...formData };
        if (!formData.password) delete updateData.password;
        await updateUser.mutateAsync({ id: user.id, data: updateData });
      } else {
        await createUser.mutateAsync(formData);
      }
      onClose();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-[3rem] overflow-hidden">
      <form id="user-form" onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-10 py-8 custom-scrollbar space-y-12">
        
        {/* --- SECTION: BASIC PROFILE --- */}
        <FormSection icon={UserIcon} title="Staff Identity" subtitle="Basic identification and contact details">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormInput 
              label="Full Name" 
              icon={UserIcon}
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="John Doe"
            />
            <FormInput 
              label="Email Address" 
              icon={Mail}
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="john@example.com"
            />
            <FormInput 
              label="Phone Number" 
              icon={Phone}
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+1 (555) 000-0000"
            />
            <FormInput 
              label="Street Address" 
              icon={MapPin}
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="123 Business Way, Suite 100"
            />
          </div>
        </FormSection>

        {/* --- SECTION: ACCESS & AUTH --- */}
        <FormSection icon={Shield} title="Security & Access" subtitle="Login credentials and terminal authorization">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FormSelect 
              label="Security Role"
              icon={Shield}
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
              options={[
                { value: "ADMIN", label: "System Admin" },
                { value: "MANAGER", label: "Store Manager" },
                { value: "CASHIER", label: "Cashier / Staff" },
                { value: "KITCHEN", label: "Kitchen Ops" },
              ]}
            />
            <FormInput 
              label={isEditing ? "Update Password" : "Password"}
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
              placeholder="0000"
            />
          </div>
        </FormSection>

        {/* --- SECTION: VISUALS --- */}
        <FormSection icon={UserCircle} title="Appearance" subtitle="Profile photo and visual representation">
          <FormImage 
            label="Staff Profile Photo"
            value={formData.image}
            onChange={(val) => setFormData({ ...formData, image: val })}
          />
        </FormSection>

        {/* --- SECTION: ACCOUNT STATUS --- */}
        <FormSection icon={Activity} title="System Status" subtitle="Manage account lifecycle and availability">
          <div className="max-w-md">
            <FormToggle 
              label="Account Active"
              icon={Activity}
              checked={formData.isActive}
              onChange={(val) => setFormData({ ...formData, isActive: val })}
              description="Temporarily disable this account to revoke all terminal and dashboard access."
            />
          </div>
        </FormSection>
      </form>

      {/* Footer Actions */}
      <div className="p-10 border-t border-gray-50 bg-white/80 backdrop-blur-sm flex gap-4">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 py-5 font-black text-[12px] uppercase tracking-widest text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all rounded-full border border-transparent hover:border-gray-100"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={isPending}
          className="flex-[2] py-5 bg-purple-600 text-white font-black text-[12px] uppercase tracking-widest rounded-full shadow-2xl shadow-purple-200 hover:bg-purple-700 transition-all flex items-center justify-center gap-3 group disabled:opacity-50"
        >
          {isPending ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Check size={18} className="group-hover:scale-110 transition-transform" strokeWidth={3} />
          )}
          <span>{isEditing ? "Sync Profile Changes" : "Activate Staff Account"}</span>
        </button>
      </div>
    </div>
  );
};

export default AddUserModal;
