"use client";
import React, { useState } from "react";
import { 
  Users, 
  Plus, 
  ShieldCheck, 
  UserPlus, 
  Search, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Mail, 
  Clock, 
  Key,
  ShieldAlert,
  Loader2
} from "lucide-react";
import { useUsers, useDeleteUser, User } from "@/hooks/useUsers";
import Modal from "@/components/shared/Modal";
import AddUserModal from "@/components/admin/users/AddUserModal";

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const { data, isLoading } = useUsers({ search, page });
  const deleteUser = useDeleteUser();

  const users = data?.data || [];
  const totalCount = data?.meta?.total || 0;

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleDelete = async (user: User) => {
    if (window.confirm(`Are you sure you want to remove ${user.name}?`)) {
      await deleteUser.mutateAsync(user.id);
    }
  };

  const getRoleBadge = (role: string) => {
    const roles: any = {
      ADMIN: { bg: "bg-purple-100", text: "text-purple-700", icon: ShieldCheck, label: "Admin" },
      MANAGER: { bg: "bg-blue-100", text: "text-blue-700", icon: Users, label: "Manager" },
      CASHIER: { bg: "bg-orange-100", text: "text-orange-700", icon: Key, label: "Cashier" },
      KITCHEN: { bg: "bg-emerald-100", text: "text-emerald-700", icon: Clock, label: "Kitchen" },
    };
    const config = roles[role] || roles.CASHIER;
    const Icon = config.icon;

    return (
      <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full ${config.bg} ${config.text} text-[10px] font-black uppercase tracking-wider`}>
        <Icon size={12} strokeWidth={3} />
        {config.label}
      </div>
    );
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
        <div>
          <h2 className="text-4xl font-black text-gray-900 tracking-tight">Staff & Roles</h2>
          <p className="text-gray-500 font-bold mt-1 text-sm">Security & Access Management for your store.</p>
        </div>
        <button 
          onClick={() => { setEditingUser(null); setIsModalOpen(true); }}
          className="flex items-center gap-3 px-8 py-5 bg-purple-600 text-white rounded-[1.75rem] font-black text-[12px] uppercase tracking-widest shadow-2xl shadow-purple-200 hover:bg-purple-700 transition-all active:scale-95 group"
        >
          <UserPlus size={18} className="group-hover:scale-110 transition-transform" />
          <span>Invite New User</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Search & Stats Bar */}
          <div className="flex items-center justify-between bg-white p-4 rounded-[2rem] border border-gray-100 shadow-sm">
             <div className="relative w-80 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-500 transition-colors" size={18} />
                <input 
                   type="text" 
                   value={search}
                   onChange={(e) => setSearch(e.target.value)}
                   placeholder="Search staff by name or email..." 
                   className="w-full pl-12 pr-6 py-3.5 bg-gray-50/50 border-transparent rounded-[1.25rem] font-bold text-sm focus:bg-white focus:ring-4 focus:ring-purple-500/5 focus:border-purple-500/20 transition-all outline-none"
                />
             </div>
             <div className="px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-50 py-3 rounded-xl border border-gray-100">
                {isLoading ? "Fetching Directory..." : `Active Staff: ${totalCount}`}
             </div>
          </div>

          {/* Staff Table */}
          <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-50">
                    <th className="px-8 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Employee</th>
                    <th className="px-8 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Role & Access</th>
                    <th className="px-8 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Last Activity</th>
                    <th className="px-8 py-6 text-right text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {isLoading ? (
                    <tr>
                      <td colSpan={4} className="py-20 text-center">
                         <Loader2 size={32} className="animate-spin text-purple-600 mx-auto" />
                         <p className="mt-4 font-bold text-gray-400 text-sm">Synchronizing directory...</p>
                      </td>
                    </tr>
                  ) : users.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-20 text-center">
                         <Users size={40} className="text-gray-200 mx-auto mb-4" />
                         <p className="font-bold text-gray-400 text-sm">No staff members found.</p>
                      </td>
                    </tr>
                  ) : (
                    users.map((user) => (
                      <tr key={user.id} className="group hover:bg-gray-50/50 transition-colors">
                        <td className="px-8 py-6">
                           <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center border border-white shadow-sm overflow-hidden">
                                {user.image ? <img src={user.image} alt="" className="w-full h-full object-cover" /> : <Users className="text-purple-200" size={24} />}
                              </div>
                              <div>
                                <h5 className="font-black text-gray-900 text-sm leading-tight">{user.name}</h5>
                                <p className="text-xs font-bold text-gray-400 flex items-center gap-1.5 mt-0.5"><Mail size={12} /> {user.email}</p>
                              </div>
                           </div>
                        </td>
                        <td className="px-8 py-6">
                          {getRoleBadge(user.role)}
                        </td>
                        <td className="px-8 py-6">
                           <div className="flex flex-col">
                              <span className="text-xs font-bold text-gray-500">{user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never logged in'}</span>
                              <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mt-1">Status: Active</span>
                           </div>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                             <button 
                               onClick={() => handleEdit(user)}
                               className="p-3 text-gray-400 hover:text-purple-600 bg-white border border-gray-100 rounded-xl shadow-sm transition-all hover:scale-105 active:scale-95"
                             >
                               <Edit size={16} />
                             </button>
                             <button 
                               onClick={() => handleDelete(user)}
                               className="p-3 text-gray-400 hover:text-red-500 bg-white border border-gray-100 rounded-xl shadow-sm transition-all hover:scale-105 active:scale-95"
                             >
                               <Trash2 size={16} />
                             </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sidebar Info Cards */}
        <div className="space-y-6">
          <div className="p-8 bg-purple-600 text-white rounded-[3rem] shadow-2xl shadow-purple-100 relative overflow-hidden group">
            <div className="absolute right-[-20px] top-[-20px] opacity-10 group-hover:scale-110 transition-transform">
               <ShieldCheck size={180} />
            </div>
            <h4 className="text-xl font-black mb-2 relative z-10 uppercase tracking-tighter">Security Center</h4>
            <p className="text-purple-100 text-xs font-bold leading-relaxed relative z-10">
              Role-based access ensures cashiers can't delete inventory, and managers have higher authority.
            </p>
            <div className="mt-8 relative z-10 flex items-center gap-3 bg-purple-500/30 p-4 rounded-3xl border border-white/10">
               <ShieldAlert size={20} />
               <p className="text-[10px] font-black uppercase tracking-widest text-purple-200">System Fully Secured</p>
            </div>
          </div>

          <div className="p-8 bg-white rounded-[3rem] border border-gray-100 shadow-sm">
             <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6">Staff Insights</h4>
             <div className="space-y-5">
               {[
                 { label: "Management", count: users.filter(u => u.role === 'ADMIN' || u.role === 'MANAGER').length || 0, color: "bg-blue-500" },
                 { label: "Operations", count: users.filter(u => u.role === 'CASHIER').length || 0, color: "bg-orange-500" },
                 { label: "Service", count: users.filter(u => u.role === 'KITCHEN').length || 0, color: "bg-emerald-500" },
               ].map((stat) => (
                 <div key={stat.label}>
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">
                       <span>{stat.label}</span>
                       <span>{stat.count}</span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-50 rounded-full overflow-hidden">
                       <div className={`h-full ${stat.color} transition-all duration-1000`} style={{ width: `${(stat.count / (totalCount || 1)) * 100}%` }} />
                    </div>
                 </div>
               ))}
             </div>
          </div>
        </div>
      </div>

      <Modal 
        show={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        index={100}
        title={editingUser ? "Modify Staff Access" : "Staff Registration"}
        showCloseButton={false}
      >
        <AddUserModal 
          user={editingUser}
          onClose={() => setIsModalOpen(false)} 
        />
      </Modal>
    </div>
  );
}
