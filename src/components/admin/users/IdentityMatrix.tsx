import React, { useState } from "react";
import {
  Building2,
  Lock,
  Mail,
  Phone,
  MapPin,
  Clock,
  Zap,
  Fingerprint,
  CheckCircle2,
  XCircle,
  User as UserIcon,
  ShieldCheck,
  Palette,
} from "lucide-react";
import LucideIcon from "@/components/shared/LucideIcon";
import { FormInput } from "@/components/shared/forms/FormInput";
import { FormSelect } from "@/components/shared/forms/FormSelect";
import { FormMultiSelect } from "@/components/shared/forms/FormMultiSelect";
import { FormToggle } from "@/components/shared/forms/FormToggle";
import { FormImage } from "@/components/shared/forms/FormImage";
import { FormSection } from "@/components/shared/forms/FormSection";
import FormPhone from "@/components/shared/forms/FormPhone";
import { FormSearchSelect } from "@/components/shared/forms/FormSearchSelect";
import {
  useCreateUser,
  useUpdateUser,
  User,
  useAllLocations,
  useRoles,
} from "@/hooks/useUsers";
import toast from "react-hot-toast";

// --- GHOSTED SECTION COMPONENT ---
const GhostedSection = ({ title, data }: { title: string; data: any[] }) => (
  <div className="p-10 rounded-[2.5rem] bg-gray-50/40 border-2 border-dashed border-gray-100/50 text-gray-400 group hover:bg-gray-50/60 transition-all duration-700">
    <div className="flex items-center gap-5 mb-8">
      <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center opacity-40">
        <Clock size={20} />
      </div>
      <div>
        <h4 className="text-[11px] font-black uppercase tracking-[0.3em]">
          {title}
        </h4>
        <p className="text-[9px] font-bold opacity-60">
          User record metadata
        </p>
      </div>
    </div>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
      {data.map((item, id) => (
        <div key={id} className="space-y-1.5 px-1 border-l border-gray-100">
          <p className="text-[9px] font-black uppercase tracking-widest opacity-40">
            {item.label}
          </p>
          <p className="text-[11px] font-black text-gray-400 truncate">
            {item.value || "---"}
          </p>
        </div>
      ))}
    </div>
  </div>
);

interface IdentityMatrixProps {
  user?: User | null;
  onClose: () => void;
}

export const IdentityMatrix: React.FC<IdentityMatrixProps> = ({
  user,
  onClose,
}) => {
  const isEditing = !!user;
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();
  const { data: locations } = useAllLocations();
  const { data: roles } = useRoles();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    roleId:
      typeof user?.role === "string" ? user.role : user?.roleData?.id || "",
    isActive: user?.isActive ?? true,
    phone: user?.phone || "",
    address: user?.address || "",
    locationId: "",
    accessibleLocations: user?.accessibleLocationIds || [],
    password: "",
    pin: user?.pin || "",
    image: user?.image || "",
    primaryColor: user?.primaryColor || "",
    secondaryColor: user?.secondaryColor || "",
    iconName: user?.iconName || "",
    groupBy: user?.groupBy || "",
  });

  const handleSubmit = async () => {
    try {
      if (isEditing) {
        await toast.promise(
          updateUser.mutateAsync({ id: user!.id, data: formData }),
          {
            loading: "Updating user...",
            success: "User updated successfully",
            error: "Update failed",
          },
        );
      } else {
        await toast.promise(createUser.mutateAsync(formData), {
          loading: "Creating user...",
          success: "User created successfully",
          error: "Creation failed",
        });
      }
      onClose();
    } catch (e) {}
  };

  return (
    <div className="flex flex-col h-full bg-white relative font-sans overflow-hidden">
      {/* 🌌 ANTI-GRAVITY SYSTEM HEADER */}
      <div className="p-10 md:p-12 border-b border-gray-50 flex items-center justify-between bg-white/80 backdrop-blur-md relative z-50">
        <div className="flex items-center gap-8">
          <div 
            className="w-16 h-16 rounded-[1.75rem] flex items-center justify-center shadow-2xl relative group/icon transition-colors duration-500"
            style={{ 
              backgroundColor: formData.primaryColor || '#111827',
              color: 'white',
              boxShadow: formData.primaryColor ? `0 15px 30px ${formData.primaryColor}30` : '0 15px 40px rgba(0,0,0,0.1)'
            }}
          >
            <LucideIcon
              name={formData.iconName || 'Zap'}
              size={28}
              strokeWidth={2.5}
              className="group-hover/icon:rotate-12 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-purple-500/20 blur-2xl opacity-0 group-hover/icon:opacity-100 transition-opacity" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">
              {isEditing ? "Edit User" : "Add User"}
            </h2>
            <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.4em] mt-2">
              Account Details
            </h4>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="px-8 py-5 text-[11px] font-black uppercase tracking-[0.3em] text-gray-400 hover:text-red-500 transition-all flex items-center gap-2"
          >
            <XCircle size={14} /> Discard
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar bg-gray-50/30 p-6 md:p-10 lg:p-16">
        {/* 🛡️ MASTER GRID STABILIZER: 12-Column Split (Responsive Transition at LG) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 w-full max-w-7xl mx-auto items-start">
          {/* 📍 LEFT PLANE: VISUAL IDENTITY (Sticky on LG+) */}
          <div className="lg:col-span-4 flex flex-col gap-6 lg:gap-8 lg:sticky lg:top-8">
            <FormImage
              label="Profile Photo"
              value={formData.image}
              onChange={(val) => setFormData({ ...formData, image: val })}
              description="Visual ID for receipts and staff directory."
            />

            {/* Status Badge Elevation */}
            <div className="p-8 rounded-[2.5rem] bg-white border border-gray-100 shadow-sm relative overflow-hidden group/status">
              <div className={`absolute top-0 left-0 w-1.5 h-full transition-colors duration-500 ${formData.isActive ? "bg-emerald-500" : "bg-red-500"}`} />
              <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">
                Operational Status
              </h5>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-3 h-3 rounded-full animate-pulse ${formData.isActive ? "bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.4)]" : "bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.4)]"}`}
                  />
                  <span
                    className={`text-sm font-black uppercase tracking-widest ${formData.isActive ? "text-emerald-600" : "text-red-500"}`}
                  >
                    {formData.isActive ? "Active Account" : "Disabled Account"}
                  </span>
                </div>
                <div className={`p-3 rounded-2xl ${formData.isActive ? "bg-emerald-50 text-emerald-500" : "bg-red-50 text-red-500"}`}>
                   <LucideIcon name={formData.isActive ? "Activity" : "ShieldAlert"} size={18} />
                </div>
              </div>
            </div>
          </div>

          {/* ⚡ RIGHT PLANE: CORE DATA (Dense Matrix) */}
          <div className="lg:col-span-8 flex flex-col gap-10 pb-20">
            {/* PLANE: BASIC PROFILE */}
            <FormSection
              icon={UserIcon}
              title="User Profile"
              subtitle="Basic Account Information"
            >
              <div className="space-y-8">
                <FormInput
                  label="Full Name"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="e.g. Michael Scott"
                  className="py-4 px-6"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <FormInput
                    label="Email Address"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="name@example.com"
                    className="py-4 px-6"
                  />
                  <FormSearchSelect
                    label="User Role"
                    icon={ShieldCheck}
                    required
                    value={formData.roleId}
                    onChange={(val) =>
                      setFormData({ ...formData, roleId: val })
                    }
                    options={
                      roles?.map((r) => ({ value: r.id, label: r.name })) || []
                    }
                    placeholder="Select role..."
                  />
                </div>

                <FormToggle
                  label="Active Status"
                  icon={Zap}
                  checked={formData.isActive}
                  onChange={(val) =>
                    setFormData({ ...formData, isActive: val })
                  }
                />
              </div>
            </FormSection>

            {/* PLANE: SPATIAL MAPPING */}
            <FormSection
              icon={Building2}
              title="Location Access"
              subtitle="Manage branch permissions"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <FormPhone
                  label="Phone Number"
                  value={formData.phone}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  description="Primary contact for staff."
                />
                <FormInput
                  label="Physical Address"
                  icon={MapPin}
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  placeholder="e.g. 123 Main St"
                  className="py-4 px-6"
                />
              </div>
              <FormMultiSelect
                label="Accessible Locations"
                icon={Building2}
                placeholder="Search locations..."
                options={
                  locations?.map((l) => ({ value: l.id, label: l.name })) || []
                }
                value={formData.accessibleLocations}
                onChange={(val) =>
                  setFormData({ ...formData, accessibleLocations: val })
                }
              />
            </FormSection>

            {/* PLANE: NEURAL AUTH */}
            <FormSection
              icon={Lock}
              title="Security"
              subtitle="Login credentials"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormInput
                  label={
                    isEditing
                      ? "Change Password"
                      : "Password"
                  }
                  type="password"
                  required={!isEditing}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="••••••••"
                  className="py-4 px-6"
                />
                <FormInput
                  label="Terminal PIN"
                  icon={Fingerprint}
                  maxLength={4}
                  required
                  value={formData.pin}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      pin: e.target.value.replace(/\D/g, ""),
                    })
                  }
                  placeholder="4-digit PIN"
                  className="py-4 px-6"
                />
              </div>
            </FormSection>

            {/* PLANE: VISUAL IDENTITY */}
            <FormSection
              icon={Zap}
              title="Visual Identity"
              subtitle="Theming & Categorization"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormInput
                  label="Primary Color"
                  value={formData.primaryColor}
                  onChange={(e) =>
                    setFormData({ ...formData, primaryColor: e.target.value })
                  }
                  placeholder="e.g. #3b82f6"
                  className="py-4 px-6"
                />
                <FormInput
                  label="Secondary Color"
                  value={formData.secondaryColor}
                  onChange={(e) =>
                    setFormData({ ...formData, secondaryColor: e.target.value })
                  }
                  placeholder="e.g. #eff6ff"
                  className="py-4 px-6"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                <FormInput
                  label="Icon Name"
                  value={formData.iconName}
                  onChange={(e) =>
                    setFormData({ ...formData, iconName: e.target.value })
                  }
                  placeholder="e.g. Shield, Zap"
                  className="py-4 px-6"
                />
                <FormInput
                  label="Group By / Category"
                  value={formData.groupBy}
                  onChange={(e) =>
                    setFormData({ ...formData, groupBy: e.target.value })
                  }
                  placeholder="e.g. Management Team"
                  className="py-4 px-6"
                />
              </div>
            </FormSection>

            {/* PLANE: METADATA */}
            <GhostedSection
              title="User Details"
              data={[
                {
                  label: "Created At",
                  value: user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "N/A",
                },
                {
                  label: "Last Login",
                  value: user?.lastLogin
                    ? new Date(user.lastLogin).toLocaleDateString()
                    : "Never",
                },
                { label: "Created By", value: "Admin" },
                { label: "Account Status", value: "STABLE" },
              ]}
            />
          </div>
        </div>
      </div>

      {/* 🚀 DEPLOYMENT FOOTER */}
      <div className="p-10 border-t border-gray-100 flex items-center justify-between bg-white relative z-50">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
            <CheckCircle2 size={24} />
          </div>
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
            All changes saved successfully
          </p>
        </div>
        <button
          onClick={handleSubmit}
          className="px-16 py-6 bg-gray-900 text-white rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.3em] shadow-[0_15px_40px_rgba(0,0,0,0.1)] hover:bg-purple-600 hover:shadow-purple-500/20 transition-all active:scale-95 flex items-center gap-4"
        >
          <CheckCircle2 size={18} strokeWidth={3} />
          {isEditing ? "Update User" : "Add User"}
        </button>
      </div>
    </div>
  );
};

export default IdentityMatrix;
