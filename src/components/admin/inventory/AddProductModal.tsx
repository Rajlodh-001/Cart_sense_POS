"use client";
import React, { useState, useEffect } from "react";
import { Package, X, Check, Loader2, Image as ImageIcon } from "lucide-react";
import { Product, useCreateProduct, useUpdateProduct } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategories";

interface AddProductModalProps {
  product?: Product | null; // If provided, we are editing
  onClose: () => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ product, onClose }) => {
  const isEditing = !!product;
  const { data: categories = [] } = useCategories();
  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    skuId: "",
    categoryId: "",
    imageUrl: "",
    isActive: true,
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        price: product.price.toString(),
        skuId: product.skuId || "",
        categoryId: product.category?.id || "",
        imageUrl: product.imageUrl || "",
        isActive: product.isActive,
      });
    }
  }, [product]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      price: parseFloat(formData.price),
    };

    try {
      if (isEditing && product) {
        await updateMutation.mutateAsync({ id: product.id, data: payload });
      } else {
        await createMutation.mutateAsync(payload);
      }
      onClose();
    } catch (error) {
      console.error("Mutation failed", error);
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="relative theme-admin font-sans">
      {/* Header */}
      <div className="flex items-center justify-between p-10 pb-4">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 bg-gray-900 rounded-[1.5rem] flex items-center justify-center text-white shadow-premium">
            <Package size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-black text-gray-900 tracking-tight">
              {isEditing ? "Edit Product" : "New Product"}
            </h3>
            <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] leading-none mt-2">
              Store Catalog System
            </p>
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
        {/* Basic Info */}
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Product Name</label>
            <input
              required
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-8 py-5 bg-white border border-gray-100 rounded-full font-bold focus:border-primary focus:ring-8 focus:ring-primary/5 transition-all text-gray-900 outline-none shadow-sm"
              placeholder="e.g. Vanilla Latte"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Price ($)</label>
              <input
                required
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-8 py-5 bg-white border border-gray-100 rounded-full font-bold focus:border-primary focus:ring-8 focus:ring-primary/5 transition-all text-gray-900 outline-none shadow-sm"
                placeholder="0.00"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Category</label>
              <div className="relative">
                <select
                  required
                  value={formData.categoryId}
                  onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                  className="w-full px-8 py-5 bg-white border border-gray-100 rounded-full font-bold focus:border-primary focus:ring-8 focus:ring-primary/5 transition-all text-gray-900 appearance-none outline-none shadow-sm"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">SKU ID (Optional)</label>
            <input
              type="text"
              value={formData.skuId}
              onChange={(e) => setFormData({ ...formData, skuId: e.target.value })}
              className="w-full px-8 py-5 bg-white border border-gray-100 rounded-full font-bold focus:border-primary focus:ring-8 focus:ring-primary/5 transition-all text-gray-900 outline-none shadow-sm"
              placeholder="e.g. LAT-001"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Image Source</label>
            <div className="flex gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full px-8 py-5 bg-white border border-gray-100 rounded-full font-bold focus:border-primary focus:ring-8 focus:ring-primary/5 transition-all text-gray-900 outline-none shadow-sm"
                  placeholder="https://..."
                />
              </div>
              <div className="w-16 h-16 bg-gray-50 rounded-[1.5rem] border border-gray-100 flex items-center justify-center overflow-hidden shadow-inner">
                 {formData.imageUrl ? (
                   <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                 ) : (
                   <ImageIcon size={22} className="text-gray-300" />
                 )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-8 flex gap-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-5 font-black text-[12px] uppercase tracking-widest text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all rounded-full border border-transparent hover:border-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isPending}
            className="flex-[2] py-5 bg-primary text-white font-black text-[12px] uppercase tracking-widest rounded-full shadow-2xl shadow-primary/20 hover:bg-primary/95 transition-all flex items-center justify-center gap-3 group disabled:opacity-50 active:scale-[0.98]"
          >
            {isPending ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Check size={18} className="group-hover:scale-110 transition-transform" strokeWidth={3} />
            )}
            <span>{isEditing ? "Save Changes" : "Add to Catalog"}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductModal;
