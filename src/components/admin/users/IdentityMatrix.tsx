import React, { useState, useEffect } from "react";
import {
  Building2,
  Lock,
  Mail,
  MapPin,
  Clock,
  Zap,
  Fingerprint,
  User as UserIcon,
  ShieldCheck,
  Palette,
  Activity,
  ShieldAlert,
  CheckCircle2,
  Layers,
} from "lucide-react";
import LucideIcon from "@/components/shared/LucideIcon";
import { 
  FormInput, 
  FormMultiSelect, 
  FormToggle, 
  FormImage, 
  FormSection, 
  FormSearchSelect,
  FormCreatableSelect,
} from "@/components/shared/forms";
import { FormLayout } from "@/components/shared/forms/FormLayout";
import FormPhone from "@/components/shared/forms/FormPhone";
import {
  useCreateUser,
  useUpdateUser,
  User,
  useAllLocations,
  useRoles,
  useUserGroups,
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
  const { data: userGroups } = useUserGroups();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    roleId: user?.roleId || (typeof user?.role === "string" ? "" : user?.roleData?.id || ""),
    isActive: user?.isActive ?? true,
    phone: user?.phone || "",
    address: user?.address || "",
    locationId: user?.locationId || "",
    accessibleLocationIds: user?.accessibleLocationIds || [],
    password: "",
    pin: user?.pin || "",
    imageUrl: user?.imageUrl || user?.image || "",
    icon: user?.icon || "",
    primaryColor: user?.primaryColor || "",
    secondaryColor: user?.secondaryColor || "",
    iconName: user?.iconName || "",
    groupBy: user?.groupBy || "",
  });

  // Sync state if user changes (e.g. switching between users in modal)
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        roleId: user.roleId || (typeof user.role === "string" ? "" : user.roleData?.id || ""),
        isActive: user.isActive ?? true,
        phone: user.phone || "",
        address: user.address || "",
        locationId: user.locationId || "",
        accessibleLocationIds: user.accessibleLocationIds || [],
        password: "",
        pin: user.pin || "",
        imageUrl: user.imageUrl || user.image || "",
        icon: user.icon || "",
        primaryColor: user.primaryColor || "",
        secondaryColor: user.secondaryColor || "",
        iconName: user.iconName || "",
        groupBy: user.groupBy || "",
      });
    }
  }, [user]);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    // Clean data before sending
    const payload = { ...formData };
    if (isEditing && !payload.password) {
      delete (payload as any).password;
    }

    try {
      if (isEditing) {
        await toast.promise(
          updateUser.mutateAsync({ id: user!.id, data: payload }),
          {
            loading: "Updating identity...",
            success: "Identity synchronized",
            error: "Update failed",
          },
        );
      } else {
        await toast.promise(createUser.mutateAsync(payload), {
          loading: "Deploying identity...",
          success: "Identity deployed to hub",
          error: "Deployment failed",
        });
      }
      onClose();
    } catch (e) {}
  };

  return (
    <FormLayout
      title={isEditing ? "Edit Identity" : "Deploy Identity"}
      subtitle="Identity Matrix"
      iconName={formData.iconName || "User"}
      primaryColor={formData.primaryColor || "#111827"}
      onClose={onClose}
      onSubmit={handleSubmit}
      isPending={createUser.isPending || updateUser.isPending}
      submitLabel={isEditing ? "Update Matrix" : "Deploy Matrix"}
    >
        {/* 🛡️ MASTER GRID STABILIZER: 12-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 w-full items-start">
          
          {/* 📍 LEFT PLANE: VISUAL IDENTITY & STATUS */}
          <div className="lg:col-span-4 flex flex-col gap-10">
            <FormImage
              label="Visual Identifier"
              value={formData.imageUrl}
              onChange={(val) => setFormData({ ...formData, imageUrl: val })}
              description="Profile photo for staff directory and receipts."
            />

            <div className="p-10 rounded-[3rem] bg-white border border-gray-100 shadow-sm relative overflow-hidden group/status transition-all hover:shadow-xl hover:shadow-gray-100/50">
              <div className={`absolute top-0 left-0 w-2 h-full transition-colors duration-500 ${formData.isActive ? "bg-emerald-500" : "bg-red-500"}`} />
              <div className="flex items-center justify-between mb-8">
                <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">
                  Security Status
                </h5>
                <div className={`p-3 rounded-2xl ${formData.isActive ? "bg-emerald-50 text-emerald-500" : "bg-red-50 text-red-500"}`}>
                   <LucideIcon name={formData.isActive ? "Activity" : "ShieldAlert"} size={20} strokeWidth={2.5} />
                </div>
              </div>
              
              <div className="flex flex-col gap-6">
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
                
                <FormToggle
                  label="Authorize Access"
                  icon={ShieldCheck}
                  checked={formData.isActive}
                  onChange={(val) =>
                    setFormData({ ...formData, isActive: val })
                  }
                />
              </div>
            </div>

            <FormSection
              icon={Palette}
              title="Branding"
              subtitle="UI Theming"
            >
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                   <FormInput
                    label="Primary"
                    value={formData.primaryColor}
                    onChange={(e) =>
                      setFormData({ ...formData, primaryColor: e.target.value })
                    }
                    placeholder="#HEX"
                  />
                  <FormInput
                    label="Secondary"
                    value={formData.secondaryColor}
                    onChange={(e) =>
                      setFormData({ ...formData, secondaryColor: e.target.value })
                    }
                    placeholder="#HEX"
                  />
                </div>
                <FormInput
                  label="Lucide Icon"
                  value={formData.iconName}
                  onChange={(e) =>
                    setFormData({ ...formData, iconName: e.target.value })
                  }
                  placeholder="e.g. Shield, Zap"
                />
                <FormCreatableSelect
                  label="Staff Category"
                  icon={Layers}
                  value={formData.groupBy}
                  onChange={(val) =>
                    setFormData({ ...formData, groupBy: val })
                  }
                  options={userGroups?.map((g) => ({ value: g, label: g })) || []}
                  placeholder="Management, Kitchen, etc."
                />
              </div>
            </FormSection>
          </div>

          {/* ⚡ RIGHT PLANE: CORE DATA */}
          <div className="lg:col-span-8 flex flex-col gap-12">
            <FormSection
              icon={UserIcon}
              title="Identity Profile"
              subtitle="Basic Account Information"
            >
              <div className="space-y-8">
                <FormInput
                  label="Full Legal Name"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="e.g. Michael Scott"
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
                  />
                  <FormSearchSelect
                    label="Assigned Role"
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
              </div>
            </FormSection>

            <FormSection
              icon={Building2}
              title="Store Distribution"
              subtitle="Manage operational boundaries"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <FormPhone
                  label="Contact Number"
                  value={formData.phone}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  description="Primary mobile for staff alerts."
                />
                <FormSearchSelect
                  label="Primary Branch"
                  icon={MapPin}
                  value={formData.locationId}
                  onChange={(val) =>
                    setFormData({ ...formData, locationId: val })
                  }
                  options={
                    locations?.map((l) => ({ value: l.id, label: l.name })) || []
                  }
                  placeholder="Select home branch..."
                />
              </div>
              <FormMultiSelect
                label="Accessible Branches"
                icon={Building2}
                placeholder="Authorize multiple locations..."
                options={
                  locations?.map((l) => ({ value: l.id, label: l.name })) || []
                }
                value={formData.accessibleLocationIds}
                onChange={(val) =>
                  setFormData({ ...formData, accessibleLocationIds: val })
                }
              />
              <div className="mt-8">
                <FormInput
                  label="Physical Address"
                  icon={MapPin}
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  placeholder="e.g. 1725 Slough Avenue, Scranton, PA"
                />
              </div>
            </FormSection>

            <FormSection
              icon={Lock}
              title="Security Authorization"
              subtitle="Login & Terminal Credentials"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormInput
                  label={
                    isEditing
                      ? "Reset Password"
                      : "Hub Password"
                  }
                  type="password"
                  required={!isEditing}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="••••••••"
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
                />
              </div>
            </FormSection>

            <GhostedSection
              title="Registry Metadata"
              data={[
                {
                  label: "Created At",
                  value: user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "NEW RECORD",
                },
                {
                  label: "Last Hub Login",
                  value: user?.lastLogin
                    ? new Date(user.lastLogin).toLocaleString()
                    : "NEVER",
                },
                { label: "Matrix Status", value: user?.isActive ? "VERIFIED" : "LOCKED" },
                { label: "Sync Priority", value: "HIGH" },
              ]}
            />
          </div>
        </div>
    </FormLayout>
  );
};

export default IdentityMatrix;
