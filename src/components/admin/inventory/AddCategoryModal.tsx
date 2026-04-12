"use client";
import React, { useState } from "react";
import { Layers, X, Check, Loader2 } from "lucide-react";
import { useCreateCategory } from "@/hooks/useCategories";

interface AddCategoryModalProps {
  onClose: () => void;
}

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({ onClose }) => {
  const createMutation = useCreateCategory();
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      await createMutation.mutateAsync({ name });
      onClose();
    } catch (error) {
       console.error("Failed to create category", error);
    }
  };

  return (
    <div className="relative theme-admin font-sans">
      <div className="flex items-center justify-between p-10 pb-4">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 bg-gray-900 rounded-[1.5rem] flex items-center justify-center text-white shadow-premium">
            <Layers size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-black text-gray-900 tracking-tight">New Category</h3>
            <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] leading-none mt-2">Classification System</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all border border-gray-100 shadow-sm"
        >
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-10 space-y-8">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Category Name</label>
          <input
            required
            autoFocus
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-8 py-5 bg-white border border-gray-100 rounded-full font-bold focus:border-primary focus:ring-8 focus:ring-primary/5 transition-all text-gray-900 outline-none shadow-sm"
            placeholder="e.g. Beverages"
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-5 font-black text-[12px] uppercase tracking-widest text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all rounded-full border border-transparent hover:border-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={createMutation.isPending}
            className="flex-[2] py-5 bg-primary text-white font-black text-[12px] uppercase tracking-widest rounded-full shadow-2xl shadow-primary/20 hover:bg-primary/95 transition-all flex items-center justify-center gap-3 group disabled:opacity-50 active:scale-[0.98]"
          >
            {createMutation.isPending ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Check size={18} className="group-hover:scale-110 transition-transform" strokeWidth={3} />
            )}
            <span>Commit Category</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategoryModal;
