import React, { useState, useEffect } from "react";
import { 
  Layers, 
  X, 
  Check, 
  Loader2, 
  Palette, 
  SmilePlus
} from "lucide-react";
import { Category, useCreateCategory, useUpdateCategory } from "@/hooks/useCategories";
import { useQueryClient } from "@tanstack/react-query";
import { FormInput, FormImage, FormSection } from "@/components/shared/forms";

interface AddCategoryModalProps {
  category?: Category | null;
  onClose: () => void;
}

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({ category, onClose }) => {
  const isEditing = !!category;
  const queryClient = useQueryClient();
  const createMutation = useCreateCategory();
  const updateMutation = useUpdateCategory();

  const [formData, setFormData] = useState({
    name: "",
    color: "#3B82F6",
    icon: "Layers",
    imageUrl: "",
  });

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        color: category.color || "#3B82F6",
        icon: category.icon || "Layers",
        imageUrl: category.imageUrl || "",
      });
    }
  }, [category]);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!formData.name.trim()) return;

    try {
      if (isEditing && category) {
        await updateMutation.mutateAsync({ id: category.id, data: formData });
      } else {
        await createMutation.mutateAsync(formData);
      }
      onClose();
    } catch (error) {
       console.error("Failed to save category", error);
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="relative theme-admin font-sans max-h-[85vh] flex flex-col">
      {/* Header - Fixed */}
      <div className="flex items-center justify-between p-10 pb-8 border-b border-gray-50 flex-shrink-0">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-gray-900 rounded-[2rem] flex items-center justify-center text-white shadow-premium relative overflow-hidden group">
            <Layers size={32} className="relative z-10 transition-transform group-hover:scale-110 duration-500" />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div>
            <h3 className="text-3xl font-black text-gray-900 tracking-tight">
              {isEditing ? "Modify Category" : "Establish Category"}
            </h3>
            <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.3em] leading-none mt-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Global Classification System
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-14 h-14 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all border border-gray-100 shadow-sm hover:rotate-90 duration-300"
        >
          <X size={24} />
        </button>
      </div>

      {/* Form Body - Scrollable */}
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="flex-1 overflow-y-auto p-12 space-y-16 custom-scrollbar bg-gray-50/20">
        
        <FormSection 
          icon={Palette} 
          title="Visual Identity" 
          subtitle="Define how this category appears in the menu"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Category Card Preview */}
            <div className="space-y-4">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-5 leading-none">Live Preview</label>
              <div 
                className="h-56 rounded-[3.5rem] border border-gray-100 shadow-premium flex flex-col items-center justify-center relative overflow-hidden group p-10 transition-all duration-500"
                style={{ backgroundColor: formData.color + "15" }}
              >
                <div 
                  className="w-20 h-20 rounded-[1.75rem] flex items-center justify-center mb-5 shadow-2xl transition-all group-hover:scale-110 group-hover:rotate-3 duration-500"
                  style={{ backgroundColor: formData.color, color: "#fff" }}
                >
                  <Layers size={36} strokeWidth={1.5} />
                </div>
                <h4 className="text-2xl font-black text-gray-900 tracking-tight">{formData.name || "Category Name"}</h4>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mt-2">Active Taxonomy Division</p>
                
                {/* Decoration */}
                <div 
                  className="absolute bottom-0 right-0 w-48 h-48 blur-[100px] -mr-24 -mb-24 opacity-30"
                  style={{ backgroundColor: formData.color }}
                />
              </div>
            </div>

            {/* Customization Controls */}
            <div className="space-y-8">
               <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-5 leading-none flex items-center gap-2">
                    <Palette size={12} /> Theme Selection
                  </label>
                  <div className="flex gap-4 p-2 bg-white rounded-[2rem] border border-gray-100 shadow-sm">
                     <div className="relative">
                       <input
                         type="color"
                         value={formData.color}
                         onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                         className="w-16 h-16 rounded-2xl cursor-pointer border-none bg-transparent outline-none p-0 overflow-hidden"
                       />
                       <div className="absolute inset-0 rounded-2xl border-4 border-white pointer-events-none" />
                     </div>
                     <input
                       type="text"
                       value={formData.color}
                       onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                       className="flex-1 px-6 bg-transparent font-black tracking-widest text-gray-900 outline-none uppercase"
                       placeholder="#3B82F6"
                     />
                  </div>
               </div>

               <FormInput 
                 label="Menu Search Icon"
                 icon={SmilePlus}
                 value={formData.icon}
                 onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                 placeholder="e.g. Layers, Coffee, Pizza"
               />
            </div>
          </div>
        </FormSection>

        <FormSection 
          icon={Layers} 
          title="General Settings" 
          subtitle="Primary naming and marketing assets"
        >
          <div className="space-y-10">
            <FormInput 
              label="Category Display Name"
              required
              autoFocus={!isEditing}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Handcrafted Pizza"
              className="text-2xl font-black py-8"
            />

            <FormImage 
              label="Promotional Banner Image"
              value={formData.imageUrl}
              onChange={(val) => setFormData({ ...formData, imageUrl: val })}
              placeholder="https://images.unsplash.com/photo-..."
            />
          </div>
        </FormSection>
      </form>

      {/* Footer - Fixed */}
      <div className="p-10 border-t border-gray-50 flex gap-6 bg-white/80 backdrop-blur-sm rounded-b-[3rem]">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 py-6 font-black text-[12px] uppercase tracking-[0.2em] text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all rounded-[2rem] border border-transparent hover:border-gray-100"
        >
          Dismiss
        </button>
        <button
          onClick={() => handleSubmit()}
          disabled={isPending}
          className="flex-[2] py-6 bg-gray-900 text-white font-black text-[12px] uppercase tracking-[0.2em] rounded-[2rem] shadow-2xl shadow-gray-200 hover:bg-blue-600 transition-all flex items-center justify-center gap-4 group disabled:opacity-50 active:scale-[0.98]"
        >
          {isPending ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            <Check size={20} className="group-hover:scale-110 transition-transform" strokeWidth={3} />
          )}
          <span>{isEditing ? "Refine Category" : "Authorize Category"}</span>
        </button>
      </div>
    </div>
  );
};

export default AddCategoryModal;
