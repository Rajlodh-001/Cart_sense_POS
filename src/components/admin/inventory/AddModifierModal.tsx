import React, { useState, useEffect } from "react";
import { 
  Sliders, 
  X, 
  Check, 
  Loader2, 
  Package,
  Info,
  Zap,
  Plus,
  Type
} from "lucide-react";
import { Modifier, useCreateModifier, useUpdateModifier } from "@/hooks/useModifiers";
import { useCategories } from "@/hooks/useCategories";
import { FormInput, FormSection } from "@/components/shared/forms";

interface AddModifierModalProps {
  modifier?: Modifier | null;
  onClose: () => void;
}

const AddModifierModal: React.FC<AddModifierModalProps> = ({ modifier, onClose }) => {
  const isEditing = !!modifier;
  const { data: categories = [] } = useCategories();
  const createMutation = useCreateModifier();
  const updateMutation = useUpdateModifier();

  const [formData, setFormData] = useState({
    name: "",
    note: "",
    description: "",
  });
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);

  useEffect(() => {
    if (modifier) {
      setFormData({
        name: modifier.name,
        note: modifier.note || "",
        description: modifier.description || "",
      });
      if (modifier.categories) {
        setSelectedCategoryIds(modifier.categories.map(c => c.id));
      }
    }
  }, [modifier]);

  const toggleCategory = (id: string) => {
    setSelectedCategoryIds(prev => 
      prev.includes(id) ? prev.filter(cid => cid !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!formData.name.trim()) return;

    const payload = {
      ...formData,
      categoryIds: selectedCategoryIds,
    };

    try {
      if (isEditing && modifier) {
        await updateMutation.mutateAsync({ id: modifier.id, data: payload as any });
      } else {
        await createMutation.mutateAsync(payload as any);
      }
      onClose();
    } catch (error) {
       console.error("Failed to save modifier", error);
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="relative theme-admin font-sans max-h-[85vh] flex flex-col">
      {/* Header Section */}
      <div className="p-10 pb-8 border-b border-gray-100 shrink-0 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-100">
            <Sliders size={28} />
          </div>
          <div>
             <h2 className="text-3xl font-black text-gray-900 leading-tight">
               {isEditing ? "Refine Modifier" : "Global Modifier"}
             </h2>
             <p className="text-[10px] text-gray-400 font-black mt-2 uppercase tracking-[0.3em] flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Catalog Customization Engine
             </p>
          </div>
        </div>
        <button 
          type="button"
          onClick={onClose}
          className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-red-50 text-gray-400 hover:text-red-500 transition-all border border-transparent hover:border-red-100"
        >
          <X size={20} />
        </button>
      </div>

      {/* Form Body - Scrollable */}
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="flex-1 overflow-y-auto p-12 space-y-16 custom-scrollbar bg-gray-50/20">
        
        <FormSection icon={Type} title="Labeling & Context" subtitle="Basic identity for staff and customers">
          <div className="space-y-8">
            <FormInput 
              label="Modifier Primary Name"
              required
              autoFocus={!isEditing}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Milk Selection"
              className="text-2xl font-black py-8"
            />

            <FormInput 
              label="Options / Pricing Note"
              value={formData.note}
              onChange={(e) => setFormData({ ...formData, note: e.target.value })}
              placeholder="e.g. Soy, Oat (+ $0.50), Almond"
              className="font-bold py-6"
            />

            <div className="space-y-3 px-5">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Internal Description</label>
              <textarea 
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Technical details for kitchen staff..."
                className="w-full px-8 py-6 bg-white border border-gray-100 rounded-[2rem] font-medium text-gray-600 outline-none focus:ring-8 focus:ring-blue-500/5 focus:border-blue-500/20 transition-all resize-none shadow-sm"
              />
            </div>
          </div>
        </FormSection>

        <FormSection icon={Zap} title="Smart Suggestions" subtitle="Link to categories for intelligent prompting">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-2">
            {categories.map((cat) => {
               const isSelected = selectedCategoryIds.includes(cat.id);
               return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => toggleCategory(cat.id)}
                    className={`flex items-center gap-4 p-5 rounded-3xl border-2 transition-all text-left group
                      ${isSelected 
                        ? "bg-blue-600 border-blue-600 shadow-xl shadow-blue-100" 
                        : "bg-white border-gray-100 hover:border-blue-200"
                      }
                    `}
                  >
                     <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors
                       ${isSelected ? "bg-white/20 text-white" : "bg-blue-50 text-blue-500"}
                     `}>
                        {isSelected ? <Check size={18} strokeWidth={3} /> : <Plus size={18} />}
                     </div>
                     <span className={`text-sm font-black transition-colors ${isSelected ? "text-white" : "text-gray-900"}`}>
                        {cat.name}
                     </span>
                  </button>
               );
            })}
          </div>
        </FormSection>

        {isEditing && modifier?.products && modifier.products.length > 0 && (
           <FormSection icon={Package} title="Association Map" subtitle={`Currently active on ${modifier.products.length} products`}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-2">
                 {modifier.products.map(product => (
                    <div key={product.id} className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm min-w-0">
                       <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center overflow-hidden shrink-0">
                          {product.imageUrl ? <img src={product.imageUrl} alt="" className="w-full h-full object-cover" /> : <Package size={16} className="text-gray-300" />}
                       </div>
                       <span className="text-xs font-black text-gray-900 truncate">{product.name}</span>
                    </div>
                 ))}
              </div>
           </FormSection>
        )}

        <div className="p-8 bg-blue-50/50 rounded-[2.5rem] border border-blue-100/50 flex gap-6">
           <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center shrink-0">
              <Info size={24} className="text-blue-500" />
           </div>
           <div>
              <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2 leading-none">Global Architecture Tip</p>
              <p className="text-xs font-bold text-blue-900/60 leading-relaxed">
                 Modifiers attached to categories appear as "Smart Suggestions" during product creation. This streamlines inventory management for large menus.
              </p>
           </div>
        </div>
      </form>

      {/* Footer */}
      <div className="p-10 bg-white border-t border-gray-50 shrink-0 flex items-center gap-6 rounded-b-[3rem]">
        <button 
          type="button" 
          onClick={onClose}
          className="flex-1 py-6 text-gray-400 font-black text-[12px] uppercase tracking-[0.2em] hover:text-gray-900 transition-colors rounded-[2rem] border border-transparent hover:border-gray-50"
        >
          Cancel
        </button>
        <button 
          onClick={() => handleSubmit()}
          disabled={isPending || !formData.name.trim()}
          className="flex-[2] py-6 bg-blue-600 text-white rounded-[2rem] font-black shadow-2xl shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-4 group"
        >
          {isPending ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <Check size={20} />
          )}
          <span className="text-[12px] uppercase tracking-[0.2em] font-black">{isEditing ? "Modify Definition" : "Commit Modifier"}</span>
        </button>
      </div>
    </div>
  );
};

export default AddModifierModal;
