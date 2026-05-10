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
import { 
  FormInput, 
  FormSelect, 
  FormMultiSelect, 
  FormToggle, 
  FormImage, 
  FormSection, 
  FormSearchSelect,
} from "@/components/shared/forms";
import { FormLayout } from "@/components/shared/forms/FormLayout";
import FormPhone from "@/components/shared/forms/FormPhone";
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
    imageUrl: user?.imageUrl || "",
    icon: user?.icon || "",
    primaryColor: user?.primaryColor || "",
    secondaryColor: user?.secondaryColor || "",
    iconName: user?.iconName || "",
    groupBy: user?.groupBy || "",
  });

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
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
    <FormLayout
      title={isEditing ? "Edit User" : "Add User"}
      subtitle="Identity Matrix"
      iconName={formData.iconName || "User"}
      primaryColor={formData.primaryColor || "#111827"}
      onClose={onClose}
      onSubmit={handleSubmit}
      isPending={createUser.isPending || updateUser.isPending}
      submitLabel={isEditing ? "Update Identity" : "Deploy Identity"}
    >
        {/* 🛡️ MASTER GRID STABILIZER: 12-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 w-full items-start">
          {/* 📍 LEFT PLANE: VISUAL IDENTITY */}
          <div className="lg:col-span-4 flex flex-col gap-6 lg:gap-8">
            <FormImage
              label="Profile Photo"
              value={formData.imageUrl}
              onChange={(val) => setFormData({ ...formData, imageUrl: val })}
              description="Visual ID for receipts and staff directory."
            />

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

          {/* ⚡ RIGHT PLANE: CORE DATA */}
          <div className="lg:col-span-8 flex flex-col gap-10">
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
                  label="Lucide Icon"
                  value={formData.iconName}
                  onChange={(e) =>
                    setFormData({ ...formData, iconName: e.target.value })
                  }
                  placeholder="e.g. Shield, Zap"
                  className="py-4 px-6"
                />
                <FormInput
                  label="Alt Icon / Simple"
                  value={formData.icon}
                  onChange={(e) =>
                    setFormData({ ...formData, icon: e.target.value })
                  }
                  placeholder="e.g. coffee, star"
                  className="py-4 px-6"
                />
              </div>
              <div className="mt-8">
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
                { label: "Account Status", value: "STABLE" },
              ]}
            />
          </div>
        </div>
    </FormLayout>
  );
};

export default IdentityMatrix;
