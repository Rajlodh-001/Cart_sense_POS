"use client";
import React, { useState, useEffect } from "react";
import * as Icons from "lucide-react";
import { useSearchParams } from "next/navigation";
import {
  Users as UsersIcon,
  Plus,
  ShieldCheck,
  UserPlus,
  Search,
  Edit,
  Trash2,
  Mail,
  Clock,
  Key,
  ShieldAlert,
  Loader2,
  Lock,
  Layers,
  Settings,
  Fingerprint,
  Zap,
  LineChart,
  Receipt,
  Utensils,
  BarChart3,
  Globe,
  Layout,
} from "lucide-react";
import {
  useUsers,
  useDeleteUser,
  User,
  useRoles,
  useDeleteRole,
  RoleData,
  usePermissions,
  useDeletePermission,
  Permission,
} from "@/hooks/useUsers";
import Modal from "@/components/shared/Modal";
import AddUserModal from "@/components/admin/users/AddUserModal";
import AddRoleModal from "@/components/admin/users/AddRoleModal";
import AddPermissionModal from "@/components/admin/users/AddPermissionModal";
import { IdentityMatrix } from "@/components/admin/users/IdentityMatrix";
import { usePermissions as useAuthPermissions } from "@/hooks/usePermissions";
import { ErrorBoundary } from "@/components/shared/ErrorBoundary";
import toast from "react-hot-toast";
import VerticalNav from "@/components/shared/VerticalNav";
import AdminPageLayout from "@/components/shared/AdminPageLayout";

type TabTab = "USERS" | "ROLES" | "PERMISSIONS" | "INSIGHTS";

export default function UsersPage() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab")?.toUpperCase() as TabTab;
  const [activeTab, setActiveTab] = useState<TabTab>("USERS");

  useEffect(() => {
    if (tabParam && ["USERS", "ROLES", "PERMISSIONS", "INSIGHTS"].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // User Modals
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // Role Modals
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<RoleData | null>(null);

  // Permission Modals
  const [isPermissionModalOpen, setIsPermissionModalOpen] = useState(false);
  const [editingPermission, setEditingPermission] = useState<Permission | null>(
    null,
  );

  const { data: usersData, isLoading: usersLoading } = useUsers({
    search,
    page,
  });
  const { data: rolesData, isLoading: rolesLoading } = useRoles(search);
  const { data: permissionsData, isLoading: permissionsLoading } =
    usePermissions(search);

  const { hasPermission } = useAuthPermissions();
  const canUpdateUser = hasPermission("user", "UPDATE");
  const canDeleteUser = hasPermission("user", "DELETE");
  const canUpdateRole = hasPermission("role", "UPDATE");
  const canDeleteRole = hasPermission("role", "DELETE");
  const canUpdatePermission = hasPermission("permission", "UPDATE");
  const canDeletePermission = hasPermission("permission", "DELETE");

  console.log("permissionsData", {
    permissionsData: permissionsData?.map((perm) => {
      return { name: perm.name, resource: perm.resource, action: perm.action };
    }),
  });

  // console.log("rolesData", { permissionsData });
  const deleteUser = useDeleteUser();
  const deleteRole = useDeleteRole();
  const deletePermission = useDeletePermission();

  const users = usersData?.data || [];
  const totalUsers = usersData?.meta?.total || 0;
  const roles = rolesData || [];
  const permissions = permissionsData || [];

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setIsUserModalOpen(true);
  };

  const handleDeleteUser = async (user: User) => {
    if (
      window.confirm(
        `Are you sure you want to remove ${user.name}? This action is irreversible.`,
      )
    ) {
      await toast.promise(deleteUser.mutateAsync(user.id), {
        loading: "Removing user...",
        success: "User removed successfully",
        error: "Failed to remove user",
      });
    }
  };

  const handleEditRole = (role: RoleData) => {
    setEditingRole(role);
    setIsRoleModalOpen(true);
  };

  const handleDeleteRole = async (role: RoleData) => {
    if (role.isSystem) return toast.error("System roles cannot be deleted");
    if (
      window.confirm(`Are you sure you want to delete the ${role.name} role?`)
    ) {
      await toast.promise(deleteRole.mutateAsync(role.id), {
        loading: "Deleting role...",
        success: "Role deleted",
        error: "Failed to delete role",
      });
    }
  };

  const handleEditPermission = (perm: Permission) => {
    setEditingPermission(perm);
    setIsPermissionModalOpen(true);
  };

  const handleDeletePermission = async (perm: Permission) => {
    if (
      window.confirm(
        `Are you sure you want to delete the capability "${perm.name}"?`,
      )
    ) {
      await toast.promise(deletePermission.mutateAsync(perm.id), {
        loading: "Deleting capability...",
        success: "Capability removed",
        error: "Failed to delete capability",
      });
    }
  };

  const getRoleBadge = (roleInput: any) => {
    const roleName = typeof roleInput === "string" ? roleInput : roleInput?.name || "No Role";
    const roleData = typeof roleInput === "object" ? roleInput : null;

    // Use database-provided visual metadata if available
    const primaryColor = roleData?.primaryColor || "#6366f1";
    const secondaryColor = roleData?.secondaryColor || "#f5f3ff";
    const iconName = roleData?.iconName || "Shield";
    
    const IconComponent = (Icons as any)[iconName] || Icons.Lock;

    return (
      <div
        className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border border-current/10 whitespace-nowrap"
        style={{ backgroundColor: secondaryColor, color: primaryColor }}
      >
        <IconComponent size={12} strokeWidth={3} className="shrink-0" />
        {roleName}
      </div>
    );
  };

  const usersNavItems = [
    { id: "users", label: "Staff Directory", href: "/admin/users?tab=users", icon: UsersIcon },
    { id: "roles", label: "Roles Management", href: "/admin/users?tab=roles", icon: ShieldCheck },
    { id: "permissions", label: "Capabilities", href: "/admin/users?tab=permissions", icon: Zap },
  ];

  return (
    <AdminPageLayout sidebar={<VerticalNav items={usersNavItems} />}>
        {/* Header Area */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
          <div>
            <h2 className="text-4xl font-black text-gray-900 tracking-tight">
              Identity Hub
            </h2>
            <p className="text-gray-500 font-bold mt-1 text-sm tracking-tight">
              Secure your store with role-based access & staff management.
            </p>
          </div>
        </div>

      <div className="space-y-12">
        {/* TOP ANALYTICS SECTION: Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Statistics Panel */}
          <div className="p-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm relative overflow-hidden group">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h4 className="text-xl font-black text-gray-900 leading-tight">
                  Hub Insights
                </h4>
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-1">
                  System Capacity
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded-xl group-hover:bg-purple-600 group-hover:text-white transition-all duration-500">
                <BarChart3 size={18} />
              </div>
            </div>

            <div className="space-y-8">
              {[
                { label: "Admin Presence", count: roles.length, total: 10, color: "bg-purple-500" },
                { label: "Storage Capacity", count: users.length, total: 50, color: "bg-blue-500" },
                { label: "Terminal Slots", count: 4, total: 10, color: "bg-emerald-500" },
              ].map((st) => (
                <div key={st.label}>
                  <div className="flex justify-between text-[10px] font-black mb-2">
                    <span className="text-gray-500 uppercase tracking-widest">{st.label}</span>
                    <span className="text-gray-900">{st.count}/{st.total}</span>
                  </div>
                  <div className="h-1 w-full bg-gray-50 rounded-full overflow-hidden border border-gray-100">
                    <div className={`h-full ${st.color}`} style={{ width: `${(st.count / st.total) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Metrics (Placeholder/Future) */}
          <div className="p-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col justify-center gap-6">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center">
                    <Zap size={20} fill="currentColor" />
                </div>
                <div>
                    <span className="block text-[15px] font-black text-gray-900 leading-tight">Active Pulse</span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Real-time Auth</span>
                </div>
             </div>
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center">
                    <Layout size={20} />
                </div>
                <div>
                    <span className="block text-[15px] font-black text-gray-900 leading-tight">{permissions.length} Skills</span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Global Registry</span>
                </div>
             </div>
          </div>

          <div className="p-8 bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-[2.5rem] shadow-xl relative overflow-hidden flex flex-col justify-center">
            <div className="absolute right-[-10%] top-[-10%] text-white/5 rotate-12">
                <ShieldCheck size={160} />
            </div>
            <h5 className="text-lg font-black mb-2 relative z-10">Secured Node</h5>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6 relative z-10">Status: Operational</p>
            <div className="flex items-center gap-2 relative z-10">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-500">All protocols verified</span>
            </div>
          </div>
        </div>

        {/* Main List Area */}
        <div
          className={`space-y-6 ${activeTab === "INSIGHTS" ? "hidden" : ""}`}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between bg-white p-6 md:p-4 rounded-[2.5rem] border border-gray-100 shadow-sm relative overflow-hidden gap-4">
            {/* Border Accent */}
            <div className="absolute top-0 left-10 right-10 h-[2px] bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />

            <div className="relative w-full md:w-80 group">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-600 transition-colors"
                size={18}
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={`Search ${activeTab === "USERS" ? "staff..." : activeTab === "ROLES" ? "roles..." : "capabilities..."}`}
                className="w-full pl-12 pr-6 py-4 bg-gray-50/50 border-2 border-transparent rounded-[1.5rem] font-bold text-sm focus:bg-white focus:ring-8 focus:ring-purple-500/5 focus:border-purple-500/10 transition-all outline-none"
              />
            </div>

            <div className="flex items-center gap-4">
              <div className="px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-50/80 py-4 rounded-2xl border border-gray-100">
                {activeTab === "USERS"
                  ? `Headcount: ${totalUsers}`
                  : activeTab === "ROLES"
                    ? `Roles: ${roles.length}`
                    : `Skills: ${permissions.length}`}
              </div>
              <button
                onClick={() => {
                  if (activeTab === "USERS") {
                    setEditingUser(null);
                    setIsUserModalOpen(true);
                  } else if (activeTab === "ROLES") {
                    setEditingRole(null);
                    setIsRoleModalOpen(true);
                  } else {
                    setEditingPermission(null);
                    setIsPermissionModalOpen(true);
                  }
                }}
                className="flex items-center gap-2.5 px-6 py-4 bg-gray-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-purple-600 transition-all active:scale-95 shadow-xl shadow-gray-200"
              >
                <Plus size={14} strokeWidth={3} />
                <span>
                  {activeTab === "USERS"
                    ? "Add User"
                    : activeTab === "ROLES"
                      ? "Add Role"
                      : "Add Capability"}
                </span>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-[3.5rem] border-2 border-gray-100/50 p-2 shadow-sm overflow-hidden">
            <div className="bg-gray-50/30 rounded-[3rem] overflow-x-auto border border-gray-100/30 custom-scrollbar">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-white/80 border-b border-gray-100">
                    {activeTab === "USERS" ? (
                      <>
                        <th className="px-10 py-7 text-left text-[11px] font-black text-gray-400 uppercase tracking-[0.25em] whitespace-nowrap">
                          Profile
                        </th>
                        <th className="px-10 py-7 text-left text-[11px] font-black text-gray-400 uppercase tracking-[0.25em] whitespace-nowrap">
                          Role
                        </th>
                        <th className="px-10 py-7 text-left text-[11px] font-black text-gray-400 uppercase tracking-[0.25em] whitespace-nowrap">
                          Activity
                        </th>
                        <th className="px-10 py-7 text-right text-[11px] font-black text-gray-400 uppercase tracking-[0.25em] whitespace-nowrap">
                          Ops
                        </th>
                      </>
                    ) : activeTab === "ROLES" ? (
                      <>
                        <th className="px-10 py-7 text-left text-[11px] font-black text-gray-400 uppercase tracking-[0.25em] whitespace-nowrap">
                          Role Name
                        </th>
                        <th className="px-10 py-7 text-left text-[11px] font-black text-gray-400 uppercase tracking-[0.25em] whitespace-nowrap">
                          Permissions
                        </th>
                        <th className="px-10 py-7 text-left text-[11px] font-black text-gray-400 uppercase tracking-[0.25em] whitespace-nowrap">
                          Scope
                        </th>
                        <th className="px-10 py-7 text-right text-[11px] font-black text-gray-400 uppercase tracking-[0.25em] whitespace-nowrap">
                          Ops
                        </th>
                      </>
                    ) : (
                      <>
                        <th className="px-10 py-7 text-left text-[11px] font-black text-gray-400 uppercase tracking-[0.25em] whitespace-nowrap">
                          Capability
                        </th>
                        <th className="px-10 py-7 text-left text-[11px] font-black text-gray-400 uppercase tracking-[0.25em] whitespace-nowrap">
                          Resource Code
                        </th>
                        <th className="px-10 py-7 text-left text-[11px] font-black text-gray-400 uppercase tracking-[0.25em] whitespace-nowrap">
                          Domain
                        </th>
                        <th className="px-10 py-7 text-right text-[11px] font-black text-gray-400 uppercase tracking-[0.25em] whitespace-nowrap">
                          Ops
                        </th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody className="bg-white/40 divide-y divide-gray-50/50">
                  {activeTab === "USERS" ? (
                    usersLoading ? (
                      <tr>
                        <td colSpan={4} className="py-24 text-center">
                          <Loader2
                            className="animate-spin mx-auto text-blue-600 mb-4"
                            size={32}
                          />
                          <p className="font-black text-gray-400 uppercase text-[10px] tracking-widest">
                            Syncing Registry
                          </p>
                        </td>
                      </tr>
                    ) : (
                      Object.entries(
                        users.reduce((acc: any, user: any) => {
                          const roleName =
                            user.roleData?.name || user.role?.name || "UNASSIGNED";
                          if (!acc[roleName]) acc[roleName] = [];
                          acc[roleName].push(user);
                          return acc;
                        }, {}),
                      ).map(([role, roleUsers]: [string, any]) => (
                        <React.Fragment key={role}>
                          <tr className="bg-gray-50/50">
                            <td colSpan={4} className="px-10 py-4">
                              <div className="flex items-center gap-3">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100">
                                  {role} LEVEL
                                </span>
                                <div className="h-[1px] flex-grow bg-blue-100/50" />
                              </div>
                            </td>
                          </tr>
                          {roleUsers.map((user: any) => (
                            <tr
                              key={user.id}
                              className="group hover:bg-white transition-all cursor-default relative"
                            >
                              <td className="px-10 py-7">
                                <div className="flex items-center gap-5">
                                  <div 
                                    className="w-14 h-14 rounded-2xl flex items-center justify-center border-2 border-white shadow-xl group-hover:rotate-3 transition-transform overflow-hidden shrink-0"
                                    style={{ backgroundColor: user.primaryColor || user.roleData?.primaryColor || '#eff6ff' }}
                                  >
                                    {user.image ? (
                                      <img
                                        src={user.image}
                                        alt=""
                                        className="w-full h-full object-cover"
                                      />
                                    ) : (
                                      <UsersIcon
                                        style={{ color: user.primaryColor || user.roleData?.primaryColor || '#3b82f6' }}
                                        size={24}
                                        className="opacity-40"
                                      />
                                    )}
                                  </div>
                                  <div className="whitespace-nowrap">
                                    <h5 className="font-black text-gray-900 text-[15px]">
                                      {user.name}
                                    </h5>
                                    <p className="text-[11px] font-bold text-gray-400 flex items-center gap-1.5 mt-0.5">
                                      <Mail size={12} /> {user.email}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-10 py-7">
                                {getRoleBadge(user.roleData || user.role)}
                              </td>
                              <td className="px-10 py-7">
                                <div className="flex flex-col">
                                  <span className="text-xs font-black text-gray-700">
                                    {user.lastLogin
                                      ? new Date(
                                          user.lastLogin,
                                        ).toLocaleDateString()
                                      : "Inactive"}
                                  </span>
                                  <span
                                    className={`text-[9px] font-black uppercase tracking-wider mt-1 ${user.isActive ? "text-green-500" : "text-red-400"}`}
                                  >
                                    {user.isActive
                                      ? "Verified / Online"
                                      : "Account Disabled"}
                                  </span>
                                </div>
                              </td>
                              <td className="px-10 py-7 text-right">
                                <div className="flex items-center justify-end gap-2.5">
                                  <button
                                    onClick={() => handleEditUser(user)}
                                    disabled={!canUpdateUser}
                                    className="p-3 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-blue-600 shadow-sm hover:shadow-md transition-all active:scale-90 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:text-gray-400 disabled:hover:bg-white disabled:hover:shadow-sm"
                                    title={canUpdateUser ? "Edit User" : "Requires update permission"}
                                  >
                                    <Edit size={16} />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteUser(user)}
                                    disabled={!canDeleteUser}
                                    className="p-3 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-red-500 shadow-sm hover:shadow-md transition-all active:scale-90 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:text-gray-400 disabled:hover:bg-white disabled:hover:shadow-sm"
                                    title={canDeleteUser ? "Delete User" : "Requires delete permission"}
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </React.Fragment>
                      ))
                    )
                  ) : rolesLoading ? (
                    <tr>
                      <td colSpan={4} className="py-24 text-center">
                        <Loader2
                          className="animate-spin mx-auto text-purple-600 mb-4"
                          size={32}
                        />
                      </td>
                    </tr>
                  ) : activeTab === "ROLES" ? (
                    Object.entries(
                      roles.reduce((acc: any, role: any) => {
                        const type = role.isSystem ? "SYSTEM" : "OPERATIONAL";
                        if (!acc[type]) acc[type] = [];
                        acc[type].push(role);
                        return acc;
                      }, {}),
                    ).map(([type, typeRoles]: [string, any]) => (
                      <React.Fragment key={type}>
                        <tr className="bg-gray-50/50">
                          <td colSpan={4} className="px-10 py-4">
                            <div className="flex items-center gap-3">
                              <span
                                className={`text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-lg border ${type === "SYSTEM" ? "text-amber-600 bg-amber-50 border-amber-100" : "text-orange-600 bg-orange-50 border-orange-100"}`}
                              >
                                {type === "SYSTEM"
                                  ? "Architecture Foundation"
                                  : "Business Operations"}
                              </span>
                              <div
                                className={`h-[1px] flex-grow ${type === "SYSTEM" ? "bg-amber-100/50" : "bg-orange-100/50"}`}
                              />
                            </div>
                          </td>
                        </tr>
                        {typeRoles.map((role: any) => (
                          <tr
                            key={role.id}
                            className="group hover:bg-white transition-all cursor-default"
                          >
                            <td className="px-10 py-7">
                              <div className="flex items-center gap-5">
                                <div
                                  className="w-12 h-12 rounded-xl flex items-center justify-center border-2 border-white shadow-sm shrink-0"
                                  style={{ 
                                    backgroundColor: role.secondaryColor || (role.isSystem ? "#fffbeb" : "#fff7ed"),
                                    color: role.primaryColor || (role.isSystem ? "#f59e0b" : "#f97316")
                                  }}
                                >
                                  {(() => {
                                    const IconComponent = (Icons as any)[role.iconName] || Icons.Key;
                                    return <IconComponent size={20} className="shrink-0" />;
                                  })()}
                                </div>
                                <div className="whitespace-nowrap">
                                  <h5 className="font-black text-gray-900 text-[15px]">
                                    {role.name}
                                  </h5>
                                  <p className="text-[11px] font-bold text-gray-400 truncate max-w-[200px] mt-0.5">
                                    {role.description ||
                                      "Custom operational role"}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-10 py-7">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span
                                  className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded border ${role.isSystem ? "text-amber-600 bg-amber-50 border-amber-100" : "text-orange-600 bg-orange-50 border-orange-100"}`}
                                >
                                  {role.permissions?.length || 0} Permissions
                                </span>
                              </div>
                            </td>
                            <td className="px-10 py-7">
                              {role.isSystem ? (
                                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-500 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100">
                                  <ShieldCheck size={14} strokeWidth={3} />
                                  Protected System
                                </div>
                              ) : (
                                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
                                  <Settings size={14} strokeWidth={3} />
                                  Organizational
                                </div>
                              )}
                            </td>
                            <td className="px-10 py-7 text-right">
                              <div className="flex items-center justify-end gap-2.5">
                                {!role.isSystem && (
                                  <>
                                    <button
                                      onClick={() => handleEditRole(role)}
                                      disabled={!canUpdateRole}
                                      className="p-3 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-amber-600 shadow-sm hover:shadow-md transition-all active:scale-90 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:text-gray-400 disabled:hover:bg-white disabled:hover:shadow-sm"
                                      title={canUpdateRole ? "Edit Role" : "Requires update permission"}
                                    >
                                      <Edit size={16} />
                                    </button>
                                    <button
                                      onClick={() => handleDeleteRole(role)}
                                      disabled={!canDeleteRole}
                                      className="p-3 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-red-500 shadow-sm hover:shadow-md transition-all active:scale-90 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:text-gray-400 disabled:hover:bg-white disabled:hover:shadow-sm"
                                      title={canDeleteRole ? "Delete Role" : "Requires delete permission"}
                                    >
                                      <Trash2 size={16} />
                                    </button>
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </React.Fragment>
                    ))
                  ) : (
                    Object.entries(
                      permissions.reduce((acc: any, perm: any) => {
                        const cat = perm.category || "OTHER";
                        if (!acc[cat]) acc[cat] = [];
                        acc[cat].push(perm);
                        return acc;
                      }, {}),
                    ).map(([category, perms]: [string, any]) => {
                      const categoryColors: any = {
                        POS: "text-blue-600 bg-blue-50 border-blue-100",
                        KITCHEN:
                          "text-orange-600 bg-orange-50 border-orange-100",
                        MANAGEMENT:
                          "text-purple-600 bg-purple-50 border-purple-100",
                        OPERATIONS:
                          "text-emerald-600 bg-emerald-50 border-emerald-100",
                        ANALYTICS:
                          "text-indigo-600 bg-indigo-50 border-indigo-100",
                        OTHER: "text-gray-600 bg-gray-50 border-gray-100",
                      };
                      const catStyle =
                        categoryColors[category] || categoryColors.OTHER;

                        return (
                          <React.Fragment key={category}>
                            <tr className="bg-gray-50/30">
                              <td colSpan={4} className="px-10 py-4">
                                <span
                                  className={`text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-lg border ${catStyle}`}
                                >
                                  {category} Domain
                                </span>
                              </td>
                            </tr>
                            {perms.map((perm: any) => {
                              const actionStyle = {
                                backgroundColor: perm.primaryColor || '#6366f1',
                                color: '#ffffff'
                              };

                              // Dynamic Icon Component
                              const DynamicIcon = ({ name, ...props }: any) => {
                                const IconComponent = (Icons as any)[name] || Icons.Zap;
                                return <IconComponent {...props} />;
                              };

                              return (
                                <tr
                                  key={perm.id}
                                  className="group hover:bg-white transition-all cursor-default"
                                >
                                  <td className="px-10 py-7">
                                    <div className="flex items-center gap-5">
                                      <div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center border-2 border-white shadow-lg rotate-3 group-hover:rotate-0 transition-transform shrink-0 text-white"
                                        style={{ backgroundColor: perm.primaryColor || '#6366f1' }}
                                      >
                                        <div className="shrink-0">
                                          <DynamicIcon name={perm.iconName} size={18} strokeWidth={3} />
                                        </div>
                                      </div>
                                      <div className="whitespace-nowrap">
                                        <h5 className="font-black text-gray-900 text-[14px]">
                                          {perm.name}
                                        </h5>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter mt-0.5">
                                          {perm.description ||
                                            "System Authorization Layer"}
                                        </p>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-10 py-7">
                                    <div className="flex items-center">
                                      <div className="flex items-center rounded-lg border border-gray-100 overflow-hidden shadow-sm">
                                        <div className="bg-gray-50 px-3 py-2 text-[10px] font-black text-gray-400 border-r border-gray-100 uppercase tracking-[0.1em]">
                                          {perm.resource}
                                        </div>
                                        <div 
                                          className="px-3 py-2 text-[10px] font-black uppercase tracking-widest"
                                          style={actionStyle}
                                        >
                                          {perm.action}
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-10 py-7">
                                    <div
                                      className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-gray-100 bg-white text-[10px] font-black uppercase tracking-[0.2em] shadow-sm"
                                      style={{ color: perm.primaryColor || '#6366f1' }}
                                    >
                                      <div 
                                        className="w-2 h-2 rounded-full" 
                                        style={{ backgroundColor: perm.primaryColor || '#6366f1' }}
                                      />
                                      {perm.category}
                                    </div>
                                  </td>
                                <td className="px-10 py-7 text-right">
                                  <div className="flex items-center justify-end gap-2.5">
                                    <button
                                      onClick={() => handleEditPermission(perm)}
                                      disabled={!canUpdatePermission}
                                      className="p-3 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-purple-600 shadow-sm hover:shadow-md transition-all active:scale-90 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:text-gray-400 disabled:hover:bg-white disabled:hover:shadow-sm"
                                      title={canUpdatePermission ? "Edit Permission" : "Requires update permission"}
                                    >
                                      <Edit size={16} />
                                    </button>
                                    <button
                                      onClick={() =>
                                        handleDeletePermission(perm)
                                      }
                                      disabled={!canDeletePermission}
                                      className="p-3 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-red-500 shadow-sm hover:shadow-md transition-all active:scale-90 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:text-gray-400 disabled:hover:bg-white disabled:hover:shadow-sm"
                                      title={canDeletePermission ? "Delete Permission" : "Requires delete permission"}
                                    >
                                      <Trash2 size={16} />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                            })}
                          </React.Fragment>
                        );
                      })
                    )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* BOTTOM SECURITY SECTION - Final Footer Note */}
        <div className="p-8 md:p-12 bg-gray-900 text-white rounded-[3.5rem] shadow-2xl relative overflow-hidden group">
            <div className="absolute right-[-5%] bottom-[-10%] text-white/5 group-hover:scale-110 transition-transform -rotate-12 pointer-events-none">
              <Fingerprint size={280} />
            </div>
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-10">
              <div className="max-w-2xl">
                <div className="bg-purple-600 w-12 h-12 rounded-2xl flex items-center justify-center mb-8 border border-white/20 shadow-lg">
                  <ShieldAlert size={20} />
                </div>
                <h4 className="text-3xl font-black mb-4 leading-tight">
                  Terminal Security Protocol
                </h4>
                <p className="text-gray-400 text-sm font-bold leading-relaxed">
                  Every user action is logged by their terminal PIN and verified against the organization's global capability registry. 
                  Maintaining staff PIN secrecy is critical to preserving the integrity of audit logs and preventing unauthorized POS overrides.
                </p>
              </div>
              <div className="flex items-center gap-6 pt-10 md:pt-0">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="w-12 h-12 rounded-full bg-gray-800 border-2 border-gray-900 flex items-center justify-center overflow-hidden shadow-xl"
                    >
                      <UsersIcon size={18} className="text-gray-500" />
                    </div>
                  ))}
                </div>
                <div>
                    <span className="block text-[11px] font-black uppercase tracking-[0.2em] text-purple-400 mb-1">
                        Shield Node Active
                    </span>
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">
                            All actions authenticated
                        </span>
                    </div>
                </div>
              </div>
            </div>
        </div>
      </div>

      {/* Modals */}
      <Modal
        show={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        index={100}
        title={editingUser ? "Edit User" : "New User"}
        showCloseButton={false}
        className="w-full md:w-[90vw] lg:w-[85vw] xl:max-w-6xl"
      >
        <ErrorBoundary
          fallbackTitle="User Management error"
          fallbackDescription="The staff records engine encountered a critical state error."
        >
          <IdentityMatrix
            user={editingUser}
            onClose={() => setIsUserModalOpen(false)}
          />
        </ErrorBoundary>
      </Modal>

      <Modal
        show={isRoleModalOpen}
        onClose={() => setIsRoleModalOpen(false)}
        index={100}
        title={editingRole ? "Edit Role" : "New Role"}
        showCloseButton={false}
        className="w-full md:w-[90vw] lg:w-[85vw] xl:max-w-6xl"
      >
        <ErrorBoundary
          fallbackTitle="Authorization Failure"
          fallbackDescription="The role management system failed to stabilize."
        >
          <AddRoleModal
            role={editingRole}
            onClose={() => setIsRoleModalOpen(false)}
          />
        </ErrorBoundary>
      </Modal>

      <Modal
        show={isPermissionModalOpen}
        onClose={() => setIsPermissionModalOpen(false)}
        index={110}
        title={editingPermission ? "Edit Capability" : "New Capability"}
        showCloseButton={false}
        className="w-full md:w-[90vw] lg:w-[85vw] xl:max-w-4xl"
      >
        <ErrorBoundary
          fallbackTitle="Capability Anomaly"
          fallbackDescription="The permission registry encountered a synchronization error."
        >
          <AddPermissionModal
            permission={editingPermission}
            onClose={() => setIsPermissionModalOpen(false)}
          />
        </ErrorBoundary>
      </Modal>
    </AdminPageLayout>
  );
}
