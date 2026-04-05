"use client";

import React, { useState } from "react";
import { useCreateCustomer, CreateCustomerPayload } from "@/hooks/useCustomers";
import { User, Phone, MapPin, FileText, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

interface CreateCustomerModalProps {
  phone: string;
  onSuccess: (customer: any) => void;
  onCancel: () => void;
}

const CreateCustomerModal: React.FC<CreateCustomerModalProps> = ({
  phone,
  onSuccess,
  onCancel,
}) => {
  const createCustomerMutation = useCreateCustomer();
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  const [address, setAddress] = useState({
    flat: "",
    building: "",
    street: "",
    city: "",
    zip: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Please enter the customer name.");
      return;
    }

    const payload: CreateCustomerPayload = {
      name,
      phone,
      notes,
      addressByFields: address.city ? address : undefined,
    };

    try {
      const newCustomer = await createCustomerMutation.mutateAsync(payload);
      toast.success("Customer created successfully!");
      onSuccess(newCustomer);
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to create customer."
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-gray-900">New Customer</h3>
        <p className="text-sm text-gray-500 mt-1">
          No record found for <span className="font-semibold text-blue-600">{phone}</span>. 
          Please fill in the details below.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-2">
            <User size={14} /> Full Name *
          </label>
          <input
            type="text"
            required
            autoFocus
            placeholder="e.g. John Doe"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Phone Field (Read-only) */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-2">
            <Phone size={14} /> Phone Number
          </label>
          <input
            type="text"
            readOnly
            className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 text-gray-500 outline-none text-sm cursor-not-allowed"
            value={phone}
          />
        </div>

        {/* Address Fields */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-2">
            <MapPin size={14} /> Address
          </label>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Flat / Unit"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 outline-none text-sm"
              value={address.flat}
              onChange={(e) => setAddress({ ...address, flat: e.target.value })}
            />
            <input
              type="text"
              placeholder="Building Name"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 outline-none text-sm"
              value={address.building}
              onChange={(e) => setAddress({ ...address, building: e.target.value })}
            />
          </div>
          <input
            type="text"
            placeholder="Street Address"
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 outline-none text-sm"
            value={address.street}
            onChange={(e) => setAddress({ ...address, street: e.target.value })}
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="City"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 outline-none text-sm"
              value={address.city}
              onChange={(e) => setAddress({ ...address, city: e.target.value })}
            />
            <input
              type="text"
              placeholder="Zip Code"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 outline-none text-sm"
              value={address.zip}
              onChange={(e) => setAddress({ ...address, zip: e.target.value })}
            />
          </div>
        </div>

        {/* Notes */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-2">
            <FileText size={14} /> Notes (Internal)
          </label>
          <textarea
            placeholder="e.g. Likes spicy food, frequent visitor"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm h-20 resize-none"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
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
            disabled={createCustomerMutation.isPending}
            className="flex-[2] py-3.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2"
          >
            {createCustomerMutation.isPending ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Creating...
              </>
            ) : (
              "Create Customer"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCustomerModal;
