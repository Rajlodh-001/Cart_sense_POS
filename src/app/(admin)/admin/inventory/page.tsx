"use client";
import React, { useState } from "react";
import { Package, Plus, Layers, Sliders, Search, Trash2, Edit } from "lucide-react";
import { useInitialProducts, Product } from "@/hooks/useProducts";
import { useCategories, useDeleteCategory } from "@/hooks/useCategories";
import Modal from "@/components/shared/Modal";
import AdminProductTable from "@/components/admin/inventory/AdminProductTable";
import AddProductModal from "@/components/admin/inventory/AddProductModal";
import AddCategoryModal from "@/components/admin/inventory/AddCategoryModal";

type TabId = "products" | "categories" | "modifiers";

export default function InventoryPage() {
  const [activeTab, setActiveTab] = useState<TabId>("products");
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const { data: products = [], isLoading: isLoadingProducts } = useInitialProducts();
  const { data: categories = [], isLoading: isLoadingCategories } = useCategories();
  const deleteCategoryMutation = useDeleteCategory();

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsProductModalOpen(true);
  };

  const handleDeleteCategory = (id: string, name: string) => {
    if (confirm(`Delete category "${name}"? This will not delete the products inside it, but they will become uncategorized.`)) {
      deleteCategoryMutation.mutate(id);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2">
        <div>
          <h2 className="text-4xl font-black text-gray-900 tracking-tight">Inventory</h2>
          <p className="text-gray-500 font-medium mt-1 text-sm">Product catalog, categories, and customization options.</p>
        </div>
        
        <div className="flex items-center gap-3">
          {activeTab === "products" && (
            <button 
              onClick={() => { setEditingProduct(null); setIsProductModalOpen(true); }}
              className="flex items-center gap-2 px-6 py-4 bg-gray-900 text-white rounded-[1.5rem] font-bold shadow-xl shadow-gray-200 hover:bg-blue-600 transition-all active:scale-95"
            >
              <Plus size={20} />
              <span>Add Product</span>
            </button>
          )}
          {activeTab === "categories" && (
            <button 
              onClick={() => setIsCategoryModalOpen(true)}
              className="flex items-center gap-2 px-6 py-4 bg-gray-900 text-white rounded-[1.5rem] font-bold shadow-xl shadow-gray-200 hover:bg-emerald-600 transition-all active:scale-95"
            >
              <Plus size={20} />
              <span>Add Category</span>
            </button>
          )}
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 p-1.5 bg-gray-100/80 rounded-3xl w-fit">
        {[
          { id: "products", label: "Products", icon: Package },
          { id: "categories", label: "Categories", icon: Layers },
          { id: "modifiers", label: "Modifiers", icon: Sliders },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabId)}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all
                ${isActive 
                  ? "bg-white text-gray-900 shadow-sm scale-[1.02]" 
                  : "text-gray-500 hover:text-gray-900"}
              `}
            >
              <Icon size={18} className={isActive ? "text-blue-500" : "text-gray-400"} />
              <span className="text-sm">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="min-h-[500px]">
        {activeTab === "products" && (
          <div className="space-y-6">
             <div className="flex items-center justify-between px-2">
                <div className="relative w-96 group">
                   <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                   <input 
                      type="text" 
                      placeholder="Search products by name or SKU..." 
                      className="w-full pl-12 pr-6 py-3.5 bg-white border border-gray-100 rounded-2xl font-medium text-sm focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500/20 transition-all"
                   />
                </div>
                <div className="text-xs font-black text-gray-400 uppercase tracking-widest">
                   Showing {products.length} Items
                </div>
             </div>
             
             <AdminProductTable 
               products={products} 
               onEdit={handleEditProduct}
               isLoading={isLoadingProducts} 
             />
          </div>
        )}

        {activeTab === "categories" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
            {categories.map((category) => (
              <div key={category.id} className="p-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm group hover:border-emerald-200 transition-all">
                <div className="flex items-center justify-between mb-4">
                   <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
                      <Layers size={22} />
                   </div>
                   <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleDeleteCategory(category.id, category.name)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                   </div>
                </div>
                <h4 className="text-xl font-black text-gray-900 mb-1">{category.name}</h4>
                <div className="flex items-center gap-3 mt-4">
                   <div className="px-3 py-1 bg-gray-50 rounded-lg text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      {category._count?.products || 0} Products
                   </div>
                </div>
              </div>
            ))}
            {categories.length === 0 && !isLoadingCategories && (
              <div className="col-span-full py-20 bg-white rounded-[3rem] border-2 border-dashed border-gray-100 flex flex-col items-center justify-center text-gray-400">
                 <p className="font-bold">No categories yet.</p>
                 <p className="text-sm">Classify your products to organize the menu.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "modifiers" && (
          <div className="p-10 bg-white rounded-[3rem] border border-gray-100 shadow-sm flex flex-col items-center justify-center min-h-[400px] border-dashed border-2">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-6">
              <Sliders size={40} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Modifier Management</h3>
            <p className="text-gray-400 max-w-sm text-center font-medium">
              Toppings, syrups, and portions customization will be mapped here soon.
            </p>
          </div>
        )}
      </div>

      {/* --- MODALS --- */}
      <Modal 
        show={isProductModalOpen} 
        onClose={() => { setIsProductModalOpen(false); setEditingProduct(null); }}
        index={100}
        title={editingProduct ? "Edit Product" : "Add Product"}
        showCloseButton={false}
      >
        <AddProductModal 
          product={editingProduct}
          onClose={() => { setIsProductModalOpen(false); setEditingProduct(null); }} 
        />
      </Modal>

      <Modal 
        show={isCategoryModalOpen} 
        onClose={() => setIsCategoryModalOpen(false)}
        index={100}
        title="Add Category"
        showCloseButton={false}
      >
        <AddCategoryModal 
          onClose={() => setIsCategoryModalOpen(false)} 
        />
      </Modal>
    </div>
  );
}
