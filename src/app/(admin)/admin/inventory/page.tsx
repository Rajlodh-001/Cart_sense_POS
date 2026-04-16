"use client";
import React, { useState } from "react";
import { Package, Plus, Layers, Sliders, Search, Trash2, Edit } from "lucide-react";
import { useInitialProducts, Product } from "@/hooks/useProducts";
import { useModifiers } from "@/hooks/useModifiers";
import { useCategories, useDeleteCategory, Category } from "@/hooks/useCategories";
import Modal from "@/components/shared/Modal";
import AdminProductTable from "@/components/admin/inventory/AdminProductTable";
import AddProductModal from "@/components/admin/inventory/AddProductModal";
import AddCategoryModal from "@/components/admin/inventory/AddCategoryModal";
import AddModifierModal from "@/components/admin/inventory/AddModifierModal";

type TabId = "products" | "categories" | "modifiers";

export default function InventoryPage() {
  const [activeTab, setActiveTab] = useState<TabId>("products");
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isModifierModalOpen, setIsModifierModalOpen] = useState(false);
  
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingModifier, setEditingModifier] = useState<any | null>(null);

  const { data: products = [], isLoading: isLoadingProducts } = useInitialProducts();
  const { data: categories = [], isLoading: isLoadingCategories } = useCategories();
  const { data: modifiersData, isLoading: isLoadingModifiers } = useModifiers();
  const modifiers = modifiersData?.data || [];

  const deleteCategoryMutation = useDeleteCategory();

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsProductModalOpen(true);
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setIsCategoryModalOpen(true);
  };

  const handleEditModifier = (modifier: any) => {
    setEditingModifier(modifier);
    setIsModifierModalOpen(true);
  };

  const handleDeleteCategory = (id: string, name: string) => {
    if (confirm(`Delete category "${name}"? This will not delete the products inside it, but they will become uncategorized.`)) {
      deleteCategoryMutation.mutate(id);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Page Header ... (keep lines 42-69) */}
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
              onClick={() => { setEditingCategory(null); setIsCategoryModalOpen(true); }}
              className="flex items-center gap-2 px-6 py-4 bg-gray-900 text-white rounded-[1.5rem] font-bold shadow-xl shadow-gray-200 hover:bg-emerald-600 transition-all active:scale-95"
            >
              <Plus size={20} />
              <span>Add Category</span>
            </button>
          )}
          {activeTab === "modifiers" && (
            <button 
              onClick={() => { setEditingModifier(null); setIsModifierModalOpen(true); }}
              className="flex items-center gap-2 px-6 py-4 bg-gray-900 text-white rounded-[1.5rem] font-bold shadow-xl shadow-gray-200 hover:bg-blue-600 transition-all active:scale-95"
            >
              <Plus size={20} />
              <span>Add Modifier</span>
            </button>
          )}
        </div>
      </div>

      {/* Tabs Navigation ... (keep lines 70-164) */}
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            {categories.map((category) => (
              <div key={category.id} className="p-10 bg-white rounded-[3.5rem] border border-gray-100 shadow-premium group hover:border-emerald-200 hover:shadow-2xl hover:shadow-emerald-100/50 transition-all duration-500 relative overflow-hidden">
                <div className="absolute -right-4 -top-4 w-32 h-32 bg-emerald-50 rounded-full opacity-0 group-hover:opacity-40 transition-opacity blur-3xl" />
                
                <div className="flex items-start justify-between mb-8 relative z-10">
                    <div 
                      className="w-20 h-20 rounded-[2rem] flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500"
                      style={{ backgroundColor: (category.color || "#10b981") + "15", color: category.color || "#10b981" }}
                    >
                       <Layers size={32} strokeWidth={1.5} />
                    </div>
                    <div className="flex items-center gap-2">
                       <button 
                         onClick={() => handleEditCategory(category)}
                         className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:bg-emerald-50 hover:text-emerald-500 transition-all border border-transparent hover:border-emerald-100"
                       >
                         <Edit size={16} />
                       </button>
                       <button 
                         onClick={() => handleDeleteCategory(category.id, category.name)}
                         className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all border border-transparent hover:border-red-100"
                       >
                         <Trash2 size={16} />
                       </button>
                    </div>
                </div>
                
                <h4 className="text-2xl font-black text-gray-900 mb-2 relative z-10">{category.name}</h4>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6">Catalog Division</p>
                
                <div className="flex items-center justify-between pt-6 border-t border-gray-50 relative z-10">
                   <div className="flex items-center gap-3">
                      <div className="px-5 py-2 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100/50">
                         {category._count?.products || 0} Products
                      </div>
                   </div>
                   <div className="flex -space-x-3">
                      <div className="w-10 h-10 rounded-full border-4 border-white bg-gray-100 flex items-center justify-center text-[10px] font-black text-gray-300">
                         {category._count?.products || ""}
                      </div>
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
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
             <div className="flex items-center justify-between px-2">
                <div>
                   <div className="text-xs font-black text-gray-400 uppercase tracking-widest">
                      Global Modifier Library
                   </div>
                   <p className="text-[10px] font-bold text-gray-400 mt-1 italic">
                      Edit a modifier once to update it across all attached products.
                   </p>
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {modifiers.map((mod) => (
                  <div key={mod.id} className="p-10 bg-white rounded-[3rem] border border-gray-100 shadow-premium-hover group hover:border-blue-200 transition-all duration-500 flex flex-col justify-between">
                     <div>
                        <div className="flex items-center justify-between mb-8">
                           <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-[1.75rem] flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                              <Sliders size={28} />
                           </div>
                           <button 
                             onClick={() => handleEditModifier(mod)}
                             className="px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all border border-blue-100/50"
                           >
                             Manage
                           </button>
                        </div>
                        <h4 className="text-xl font-black text-gray-900 mb-2">{mod.name}</h4>
                        <p className="text-sm text-gray-500 font-bold mb-6 line-clamp-2 leading-relaxed">{mod.note || "No details provided."}</p>
                     </div>
                     
                     <div className="pt-6 border-t border-gray-50 flex flex-col gap-5">
                        <div className="flex items-center justify-between">
                           <div className="px-4 py-2 bg-blue-50/50 rounded-full text-[10px] font-black text-blue-500 uppercase tracking-widest border border-blue-100/30">
                              Used by {mod._count?.products || 0} Products
                           </div>
                        </div>
                        {mod.products && mod.products.length > 0 && (
                          <div className="flex -space-x-3 pb-2 overflow-hidden">
                             {mod.products.slice(0, 5).map((p: any) => (
                               <div key={p.id} className="w-12 h-12 rounded-full border-4 border-white bg-gray-100 overflow-hidden shadow-sm" title={p.name}>
                                 {p.imageUrl ? <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-gray-300"><Layers size={14} /></div>}
                               </div>
                             ))}
                             {(mod._count?.products || 0) > 5 && (
                               <div className="w-12 h-12 rounded-full border-4 border-white bg-gray-50 flex items-center justify-center text-xs font-black text-gray-500 shadow-sm">
                                 +{(mod._count?.products || 0) - 5}
                               </div>
                             )}
                          </div>
                        )}
                     </div>
                  </div>
                ))}
                {modifiers.length === 0 && !isLoadingModifiers && (
                  <div className="col-span-full py-20 bg-white rounded-[3rem] border-2 border-dashed border-gray-100 flex flex-col items-center justify-center text-gray-400">
                     <Sliders size={48} strokeWidth={1} className="mb-4 opacity-20" />
                     <p className="font-bold uppercase tracking-widest text-[10px]">Your Library is Empty</p>
                     <p className="text-xs mt-2">Create your first global modifier to start sharing it.</p>
                  </div>
                )}
             </div>
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
        className="w-full md:w-3/4 lg:w-[85%] xl:max-w-6xl"
      >
        <AddProductModal 
          product={editingProduct}
          onClose={() => { setIsProductModalOpen(false); setEditingProduct(null); }} 
        />
      </Modal>

      <Modal 
        show={isCategoryModalOpen} 
        onClose={() => { setIsCategoryModalOpen(false); setEditingCategory(null); }}
        index={100}
        title={editingCategory ? "Edit Category" : "Add Category"}
        showCloseButton={false}
        className="w-full md:w-3/4 lg:w-[85%] xl:max-w-4xl"
      >
        <AddCategoryModal 
          category={editingCategory}
          onClose={() => { setIsCategoryModalOpen(false); setEditingCategory(null); }} 
        />
      </Modal>

      <Modal 
        show={isModifierModalOpen} 
        onClose={() => { setIsModifierModalOpen(false); setEditingModifier(null); }}
        index={100}
        title={editingModifier ? "Edit Modifier" : "Add Modifier"}
        showCloseButton={false}
        className="w-full md:w-3/4 lg:w-[85%] xl:max-w-4xl"
      >
        <AddModifierModal 
          modifier={editingModifier}
          onClose={() => { setIsModifierModalOpen(false); setEditingModifier(null); }} 
        />
      </Modal>
    </div>
  );
}
