"use client";
import React, { useState, useEffect, useMemo } from "react";
import { 
  Package, 
  X, 
  Check, 
  Loader2, 
  Image as ImageIcon, 
  Info, 
  Layers,
  FileText, 
  Percent, 
  Palette, 
  Maximize, 
  Flame, 
  Activity, 
  Zap, 
  Waves, 
  Plus,
  Trash2,
  Sliders,
  Weight as WeightIcon 
} from "lucide-react";
import LucideIcon from "@/components/shared/LucideIcon";
import { Product, useCreateProduct, useUpdateProduct } from "@/hooks/useProducts";
import { useCategories, useCreateCategory } from "@/hooks/useCategories";
import { useModifiers } from "@/hooks/useModifiers";
import { useQueryClient } from "@tanstack/react-query";
import { FormInput, FormKeyValueEditor, FormLayout } from "@/components/shared/forms";

interface AddProductModalProps {
  product?: Product | null; // If provided, we are editing
  onClose: () => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ product, onClose }) => {
  const isEditing = !!product;
  const queryClient = useQueryClient();
  const { data: categories = [] } = useCategories();
  const { data: modifiersData } = useModifiers({ limit: 100 });
  const allModifiers = modifiersData?.data || [];
  
  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct();
  const createCategoryMutation = useCreateCategory();

  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [recipe, setRecipe] = useState<Record<string, string>>({});
  const [cookingDescription, setCookingDescription] = useState<Record<string, string>>({});
  const [selectedModifierIds, setSelectedModifierIds] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    skuId: "",
    categoryId: "",
    imageUrl: "",
    isActive: true,
    description: "",
    additionalNotes: "",
    discount: "0",
    color: "",
    size: "",
    calories: "0",
    protein: "0",
    carbs: "0",
    fat: "0",
    weight: "0",
    primaryColor: "",
    secondaryColor: "",
    iconName: "",
    groupBy: "",
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
        description: product.description || "",
        additionalNotes: product.additionalNotes || "",
        discount: (product.discount || 0).toString(),
        color: product.color || "",
        size: product.size || "",
        calories: (product.calories || 0).toString(),
        protein: (product.protein || 0).toString(),
        carbs: (product.carbs || 0).toString(),
        fat: (product.fat || 0).toString(),
        weight: (product.weight || 0).toString(),
        primaryColor: product.primaryColor || "",
        secondaryColor: product.secondaryColor || "",
        iconName: product.iconName || "",
        groupBy: product.groupBy || "",
      });
      setRecipe(product.recipe || {});
      setCookingDescription(product.cookingDescription || {});
      if (product.modifiers) {
        setSelectedModifierIds(product.modifiers.map(m => m.id));
      }
    }
  }, [product]);

  // Logic for intelligent suggestions - placed after formData
  const suggestedModifiers = React.useMemo(() => 
    allModifiers.filter(mod => mod.categories?.some(cat => cat.id === formData.categoryId)),
    [allModifiers, formData.categoryId]
  );
  
  const otherModifiers = React.useMemo(() => 
    allModifiers.filter(mod => !mod.categories?.some(cat => cat.id === formData.categoryId)),
    [allModifiers, formData.categoryId]
  );

  const toggleModifier = (id: string) => {
    setSelectedModifierIds(prev => 
      prev.includes(id) ? prev.filter(mid => mid !== id) : [...prev, id]
    );
  };

  const renderModifierCard = (mod: any, isSuggested: boolean) => {
    const isSelected = selectedModifierIds.includes(mod.id);
    return (
      <button 
        key={mod.id}
        type="button"
        onClick={() => toggleModifier(mod.id)}
        className={`p-5 rounded-3xl border-2 transition-all text-left flex items-start gap-4 h-full group
          ${isSelected 
            ? "bg-blue-600 border-blue-600 shadow-xl shadow-blue-200" 
            : isSuggested
              ? "bg-blue-50/30 border-blue-100 hover:border-blue-200"
              : "bg-white border-gray-100 hover:border-gray-200 hover:shadow-sm"
          }
        `}
      >
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors
          ${isSelected ? "bg-white/20 text-white" : isSuggested ? "bg-blue-100 text-blue-600" : "bg-blue-50 text-blue-500"}
        `}>
          {isSelected ? <Check size={18} strokeWidth={3} /> : isSuggested ? <Zap size={18} /> : <Plus size={18} />}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <p className={`text-sm font-black transition-colors ${isSelected ? "text-white" : "text-gray-900"}`}>
              {mod.name}
            </p>
          </div>
          <p className={`text-[10px] font-bold mt-1 line-clamp-1 transition-colors ${isSelected ? "text-white/70" : "text-gray-400"}`}>
            {mod.note || "No options specified"}
          </p>
        </div>
      </button>
    );
  };

  const handleQuickAddCategory = async () => {
    if (!newCategoryName.trim()) return;
    try {
      const res = await createCategoryMutation.mutateAsync({ name: newCategoryName });
      setFormData({ ...formData, categoryId: res.id });
      setIsAddingCategory(false);
      setNewCategoryName("");
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const payload = {
      ...formData,
      price: parseFloat(formData.price),
      discount: parseFloat(formData.discount),
      calories: parseFloat(formData.calories),
      protein: parseFloat(formData.protein),
      carbs: parseFloat(formData.carbs),
      fat: parseFloat(formData.fat),
      weight: parseFloat(formData.weight),
      recipe: recipe,
      cookingDescription: cookingDescription,
      modifierIds: selectedModifierIds,
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

  const SectionHeader = ({ icon: Icon, title, subtitle }: { icon: any, title: string, subtitle: string }) => (
    <div className="flex items-center gap-4 mb-6 mt-4">
      <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
        <Icon size={20} />
      </div>
      <div>
        <h4 className="text-sm font-black text-gray-900 uppercase tracking-tight">{title}</h4>
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{subtitle}</p>
      </div>
    </div>
  );

  return (
    <FormLayout
      title={isEditing ? "Edit Product" : "New Product"}
      subtitle="Store Catalog System"
      iconName={formData.iconName || "Package"}
      primaryColor={formData.primaryColor || "#111827"}
      onClose={onClose}
      onSubmit={handleSubmit}
      isPending={createMutation.isPending || updateMutation.isPending}
      submitLabel={isEditing ? "Save Changes" : "Add to Catalog"}
    >
        {/* TOP SECTION: IMAGE & PRIMARY DETAILS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Huge Image Preview */}
          <div className="lg:col-span-4 space-y-6">
             <div className="relative aspect-square w-full bg-gray-50 rounded-[2.5rem] border-2 border-dashed border-gray-100 flex items-center justify-center overflow-hidden shadow-inner group">
                {formData.imageUrl ? (
                  <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                ) : (
                  <div className="flex flex-col items-center gap-4 text-gray-300">
                    <ImageIcon size={48} strokeWidth={1} />
                    <span className="text-[10px] font-black uppercase tracking-widest">No Image Provided</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <p className="text-white text-[10px] font-black uppercase tracking-widest">Product Visual</p>
                </div>
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Image Source URL</label>
                <input
                  type="text"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full px-8 py-4 bg-white border border-gray-100 rounded-full font-bold focus:border-primary focus:ring-8 focus:ring-primary/5 transition-all text-gray-900 outline-none shadow-sm"
                  placeholder="https://..."
                />
             </div>
          </div>

          {/* Right: Name, Price, Category, Status */}
          <div className="lg:col-span-8 space-y-8">
             {/* Name & Status Row */}
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Product Name</label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-10 py-6 bg-white border border-gray-100 rounded-[2rem] text-xl font-black focus:border-primary focus:ring-8 focus:ring-primary/5 transition-all text-gray-900 outline-none shadow-premium-hover"
                    placeholder="e.g. Vanilla Latte"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Status</label>
                  <div className="flex h-16 bg-gray-50 border border-gray-100 rounded-[2rem] p-2 overflow-hidden shadow-inner">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, isActive: true })}
                      className={`flex-1 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all ${formData.isActive ? "bg-white text-emerald-600 shadow-md" : "text-gray-400"}`}
                    >
                      Active
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, isActive: false })}
                      className={`flex-1 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all ${!formData.isActive ? "bg-white text-red-500 shadow-md" : "text-gray-400"}`}
                    >
                      Hidden
                    </button>
                  </div>
                </div>
             </div>

             {/* Price & Category Row */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Retail Price ($)</label>
                  <div className="relative">
                    <span className="absolute left-8 top-1/2 -translate-y-1/2 font-black text-gray-400">$</span>
                    <input
                      required
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full pl-14 pr-8 py-5 bg-white border border-gray-100 rounded-full font-black text-lg focus:border-primary focus:ring-8 focus:ring-primary/5 transition-all text-gray-900 outline-none shadow-sm"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between mb-2 px-4">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Catalog Category</label>
                    <button 
                      type="button"
                      onClick={() => setIsAddingCategory(!isAddingCategory)}
                      className="text-[10px] font-black text-blue-600 uppercase tracking-widest flex items-center gap-1 hover:blue-700 hover:scale-105 transition-all"
                    >
                      {isAddingCategory ? "Cancel" : <><Plus size={10} strokeWidth={3} /> Quick New</>}
                    </button>
                  </div>
                  
                  {isAddingCategory ? (
                    <div className="flex gap-2 animate-in fade-in slide-in-from-right-2">
                      <input 
                        autoFocus
                        type="text"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        placeholder="Cat Name..."
                        className="flex-1 px-8 py-5 bg-white border border-blue-200 rounded-full font-bold focus:ring-4 focus:ring-blue-100 transition-all text-gray-900 outline-none text-sm"
                      />
                      <button 
                        type="button"
                        onClick={handleQuickAddCategory}
                        className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-all shadow-lg active:scale-95"
                      >
                         <Check size={20} strokeWidth={3} />
                      </button>
                    </div>
                  ) : (
                    <div className="relative group">
                      <select
                        required
                        value={formData.categoryId}
                        onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                        className="w-full px-8 py-5 bg-white border border-gray-100 rounded-full font-bold focus:border-primary focus:ring-8 focus:ring-primary/5 transition-all text-gray-900 appearance-none outline-none shadow-sm pr-14"
                      >
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                      <Layers size={18} className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300 transition-colors group-hover:text-blue-500" />
                    </div>
                  )}
                </div>
             </div>

             <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4 leading-none">SKU ID (Optional)</label>
                <input
                  type="text"
                  value={formData.skuId}
                  onChange={(e) => setFormData({ ...formData, skuId: e.target.value })}
                  className="w-full px-8 py-4 bg-white border border-gray-100 rounded-full font-bold focus:border-primary focus:ring-8 focus:ring-primary/5 transition-all text-gray-900 outline-none shadow-sm"
                  placeholder="e.g. LAT-001"
                 />
             </div>

             <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4 leading-none">Additional Notes (Optional)</label>
                <textarea
                  value={formData.additionalNotes}
                  onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                  className="w-full px-8 py-4 bg-white border border-gray-100 rounded-[2rem] font-medium text-sm focus:border-primary focus:ring-8 focus:ring-primary/5 transition-all text-gray-900 outline-none shadow-sm min-h-[100px] resize-none"
                  placeholder="Extra instructions or backend references..."
                />
             </div>
          </div>
        </div>

        {/* --- SECTION: GLOBAL MODIFIERS LIBRARY --- */}
        <div className="pt-4">
           <div className="flex items-center justify-between mb-4">
              <SectionHeader icon={Sliders} title="Modifier Library" subtitle="Attach Global Customizations" />
              {formData.categoryId && suggestedModifiers.length > 0 && (
                <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full border border-blue-100 animate-pulse">
                  <Zap size={10} className="text-blue-600" />
                  <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">
                    {suggestedModifiers.length} Smart Suggestions
                  </span>
                </div>
              )}
           </div>
           
           <div className="space-y-8">
              {/* Suggested Section */}
              {formData.categoryId && suggestedModifiers.length > 0 && (
                <div className="space-y-4">
                  <h5 className="text-[10px] font-black text-blue-600 uppercase tracking-widest ml-4 flex items-center gap-2">
                    <Check size={10} strokeWidth={3} /> Highly Relevant for {categories.find(c => c.id === formData.categoryId)?.name}
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {suggestedModifiers.map((mod) => renderModifierCard(mod, true))}
                  </div>
                </div>
              )}

              {/* Others Section */}
              <div className="space-y-4">
                {formData.categoryId && suggestedModifiers.length > 0 && (
                  <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Other Options</h5>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {otherModifiers.map((mod) => renderModifierCard(mod, false))}
                </div>
              </div>
           </div>

           {allModifiers.length === 0 && (
              <div className="col-span-full py-10 bg-gray-50/50 rounded-[2.5rem] border-2 border-dashed border-gray-100 flex flex-col items-center justify-center text-gray-400">
                 <Sliders size={24} className="mb-2 opacity-50" />
                 <p className="text-[10px] font-black uppercase tracking-widest">Library is Empty</p>
                 <p className="text-[10px] italic mt-1 font-medium">Create modifiers in the inventory tab first.</p>
              </div>
           )}
        </div>

        {/* --- SECTION: DETAILS & SPECS --- */}
        <div className="pt-4">
          <SectionHeader icon={Layers} title="Inventory & Specs" subtitle="Styles, Sizes & Descriptions" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4 flex items-center gap-2">
                    <Palette size={10} /> Color
                  </label>
                  <input
                    type="text"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    className="w-full px-8 py-4 bg-white border border-gray-100 rounded-full font-bold focus:border-primary focus:ring-8 focus:ring-primary/5 transition-all text-gray-900 outline-none shadow-sm"
                    placeholder="e.g. Brown"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4 flex items-center gap-2">
                    <Maximize size={10} /> Size
                  </label>
                  <input
                    type="text"
                    value={formData.size}
                    onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                    className="w-full px-8 py-4 bg-white border border-gray-100 rounded-full font-bold focus:border-primary focus:ring-8 focus:ring-primary/5 transition-all text-gray-900 outline-none shadow-sm"
                    placeholder="e.g. Large"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4 flex items-center gap-2">
                  <Percent size={10} /> Discount (Fixed Amount)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.discount}
                  onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                  className="w-full px-8 py-4 bg-white border border-gray-100 rounded-full font-bold focus:border-primary focus:ring-8 focus:ring-primary/5 transition-all text-gray-900 outline-none shadow-sm"
                  placeholder="0.00"
                />
              </div>

              <div className="pt-8 border-t border-gray-100 space-y-8">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Visual Branding</h4>
                <div className="grid grid-cols-2 gap-6">
                  <FormInput 
                    label="Primary Color"
                    value={formData.primaryColor}
                    onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                    placeholder="#HEX"
                  />
                  <FormInput 
                    label="Secondary Color"
                    value={formData.secondaryColor}
                    onChange={(e) => setFormData({ ...formData, secondaryColor: e.target.value })}
                    placeholder="#HEX"
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <FormInput 
                    label="Icon Name"
                    value={formData.iconName}
                    onChange={(e) => setFormData({ ...formData, iconName: e.target.value })}
                    placeholder="e.g. Flame"
                  />
                  <FormInput 
                    label="Group By Label"
                    value={formData.groupBy}
                    onChange={(e) => setFormData({ ...formData, groupBy: e.target.value })}
                    placeholder="e.g. Featured Items"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4 flex items-center gap-2">
                  <FileText size={10} /> Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={5}
                  className="w-full px-8 py-5 bg-white border border-gray-100 rounded-[2.5rem] font-bold focus:border-primary focus:ring-8 focus:ring-primary/5 transition-all text-gray-900 outline-none shadow-sm resize-none"
                  placeholder="Write a brief product description..."
                />
              </div>
            </div>

            <div className="space-y-10 mt-4">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4 flex items-center gap-2">
                  <FileText size={10} /> Structured Recipe
                </label>
                <FormKeyValueEditor 
                  data={recipe} 
                  onChange={setRecipe} 
                  placeholderKey="Ingredient"
                  placeholderValue="Quantity"
                  accentColor="green"
                />
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4 flex items-center gap-2">
                  <Flame size={10} /> Cooking Instructions
                </label>
                <FormKeyValueEditor 
                  data={cookingDescription} 
                  onChange={setCookingDescription} 
                  placeholderKey="Step Name"
                  placeholderValue="Action"
                  accentColor="orange"
                />
              </div>

              <p className="px-8 text-[10px] leading-relaxed text-gray-400 font-medium italic">
                * Use the Add button to include ingredients and cooking steps as key-value pairs.
              </p>
            </div>
          </div>
        </div>

        {/* --- SECTION: NUTRITIONAL DATA --- */}
        <div className="pt-4">
          <SectionHeader icon={Activity} title="Nutritional Data" subtitle="Vitamins, Calories & Macros" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4 flex items-center gap-2">
                <Flame size={10} /> Calories
              </label>
              <input
                type="number"
                value={formData.calories}
                onChange={(e) => setFormData({ ...formData, calories: e.target.value })}
                className="w-full px-6 py-4 bg-white border border-gray-100 rounded-full font-bold focus:border-primary focus:ring-8 focus:ring-primary/5 transition-all text-gray-900 outline-none shadow-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4 flex items-center gap-2">
                <Zap size={10} /> Protein (g)
              </label>
              <input
                type="number"
                value={formData.protein}
                onChange={(e) => setFormData({ ...formData, protein: e.target.value })}
                className="w-full px-6 py-4 bg-white border border-gray-100 rounded-full font-bold focus:border-primary focus:ring-8 focus:ring-primary/5 transition-all text-gray-900 outline-none shadow-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4 flex items-center gap-2">
                <Waves size={10} /> Carbs (g)
              </label>
              <input
                type="number"
                value={formData.carbs}
                onChange={(e) => setFormData({ ...formData, carbs: e.target.value })}
                className="w-full px-6 py-4 bg-white border border-gray-100 rounded-full font-bold focus:border-primary focus:ring-8 focus:ring-primary/5 transition-all text-gray-900 outline-none shadow-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4 flex items-center gap-2">
                <Zap size={10} /> Fat (g)
              </label>
              <input
                type="number"
                value={formData.fat}
                onChange={(e) => setFormData({ ...formData, fat: e.target.value })}
                className="w-full px-6 py-4 bg-white border border-gray-100 rounded-full font-bold focus:border-primary focus:ring-8 focus:ring-primary/5 transition-all text-gray-900 outline-none shadow-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4 flex items-center gap-2">
                <WeightIcon size={10} /> Weight (g)
              </label>
              <input
                type="number"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                className="w-full px-6 py-4 bg-white border border-gray-100 rounded-full font-bold focus:border-primary focus:ring-8 focus:ring-primary/5 transition-all text-gray-900 outline-none shadow-sm"
              />
            </div>
          </div>
        </div>
    </FormLayout>
  );
};

export default AddProductModal;
