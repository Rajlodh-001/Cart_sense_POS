"use client";

import React, { useState } from "react";
import { useCreateUser, CreateUserPayload, Role } from "@/hooks/useUsers";
import { useSessionStatus } from "@/hooks/useAuth";
import { User as UserIcon, Mail, Lock, Shield, Loader2, KeyRound, X } from "lucide-react";
import toast from "react-hot-toast";

interface CreateUserModalProps {
  onSuccess: (user: any) => void;
  onCancel: () => void;
}

const CreateUserModal: React.FC<CreateUserModalProps> = ({
  onSuccess,
  onCancel,
}) => {
  const createUserMutation = useCreateUser();
  const { data: session } = useSessionStatus();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    pin: "",
    role: "CASHIER" as Role,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session?.locationId) {
      toast.error("Store location not identified. Please reactivate terminal.");
      return;
    }

    if (formData.pin.length < 4) {
      toast.error("PIN must be at least 4 digits.");
      return;
    }

    const payload: CreateUserPayload = {
      ...formData,
      locationId: session.locationId,
    };

    try {
      const newUser = await createUserMutation.mutateAsync(payload);
      toast.success("Staff member created successfully!");
      onSuccess(newUser);
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to create staff member."
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center relative">
        <h3 className="text-xl font-bold text-gray-900">Add New Staff</h3>
        <p className="text-sm text-gray-500 mt-1">
          Create a new account for your team at <span className="font-semibold text-blue-600">{session?.locationName || "this location"}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-2">
            <UserIcon size={14} /> Full Name
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Alex Rivera"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        {/* Email Field */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-2">
            <Mail size={14} /> Email Address
          </label>
          <input
            type="email"
            required
            placeholder="alex@example.com"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Password Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-2">
              <Lock size={14} /> Password
            </label>
            <input
              type="password"
              required
              placeholder="Minimum 6 chars"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          {/* PIN Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-2">
              <KeyRound size={14} /> Login PIN
            </label>
            <input
              type="text"
              required
              maxLength={6}
              placeholder="4-6 digits"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm"
              value={formData.pin}
              onChange={(e) => setFormData({ ...formData, pin: e.target.value.replace(/\D/g, "") })}
            />
          </div>
        </div>

        {/* Role Field */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-2">
            <Shield size={14} /> Access Level
          </label>
          <div className="flex bg-gray-50 p-1 rounded-xl border border-gray-100">
            {(["CASHIER", "MANAGER", "ADMIN"] as Role[]).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setFormData({ ...formData, role: r })}
                className={`flex-1 py-2 text-[11px] font-bold rounded-lg transition-all ${
                  formData.role === r
                    ? "bg-white text-blue-600 shadow-sm border border-gray-100"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-3.5 rounded-xl font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={createUserMutation.isPending}
            className="flex-[2] py-3.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2"
          >
            {createUserMutation.isPending ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Saving...
              </>
            ) : (
              "Save Staff Member"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUserModal;
