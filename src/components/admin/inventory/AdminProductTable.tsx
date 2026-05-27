"use client";
import React from "react";
import { Product, useDeleteProduct } from "@/hooks/useProducts";
import ConfirmModal from "@/components/shared/ConfirmModal";
import { usePermissions } from "@/hooks/usePermissions";
import toast from "react-hot-toast";
import { 
  Tag, 
  Layers, 
  CheckCircle, 
  XCircle, 
  Edit, 
  Trash2 
} from "lucide-react";
import LucideIcon from "@/components/shared/LucideIcon";

interface AdminProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  isLoading: boolean;
}

const AdminProductTable: React.FC<AdminProductTableProps> = ({
  products,
  onEdit,
  isLoading,
}) => {
  const deleteMutation = useDeleteProduct();
  const { hasPermission } = usePermissions();
  const canUpdate = hasPermission("product", "UPDATE");
  const canDelete = hasPermission("product", "DELETE");

  const [confirmDelete, setConfirmDelete] = React.useState<{ id: string; name: string } | null>(null);

  const handleDelete = (id: string, name: string) => {
    setConfirmDelete({ id, name });
  };

  const handleConfirmDelete = async () => {
    if (!confirmDelete) return;
    try {
      await toast.promise(deleteMutation.mutateAsync(confirmDelete.id), {
        loading: "Deleting product...",
        success: "Product deleted successfully",
        error: (err: any) => {
          const msg = err.response?.data?.error?.details || err.response?.data?.error?.message;
          return msg || "Failed to delete product";
        },
      });
      setConfirmDelete(null);
    } catch (error) {}
  };

  if (isLoading) {
    return (
      <div className="w-full bg-white rounded-[2rem] border border-gray-100 overflow-hidden">
        <div className="h-20 bg-gray-50 animate-pulse border-b border-gray-100" />
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-24 bg-white animate-pulse border-b border-gray-50"
          />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50">
              <th className="py-5 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Product
              </th>
              <th className="py-5 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">
                SKU
              </th>
              <th className="py-5 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">
                Price
              </th>
              <th className="py-5 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">
                Category
              </th>
              <th className="py-5 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">
                Status
              </th>
              <th className="py-5 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {products.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="py-20 text-center text-gray-400 font-medium"
                >
                  No products found. Add your first product to get started!
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-gray-50/30 transition-colors group"
                >
                  <td className="py-5 px-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-gray-100 flex-shrink-0 overflow-hidden border border-gray-50 shadow-sm">
                        {product.imageUrl ? (
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                "https://placehold.co/100x100?text=No+Img";
                            }}
                          />
                        ) : (
                          <div 
                            className="w-full h-full flex items-center justify-center transition-colors"
                            style={{ 
                                backgroundColor: product.primaryColor || "#f9fafb",
                                color: product.primaryColor ? "#ffffff" : "#d1d5db"
                            }}
                          >
                            <LucideIcon name={product.iconName || "Tag"} size={20} />
                          </div>
                        )}
                      </div>
                      <div>
                        <h4 className="font-black text-gray-900 leading-tight">
                          {product.name}
                        </h4>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">
                          ID: {product.id.substring(0, 8)}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-5 px-6 text-center font-bold text-gray-500 text-sm">
                    {product.skuId || "N/A"}
                  </td>
                  <td className="py-5 px-6 text-center font-black text-gray-900 text-base">
                    ${Number(product.price).toFixed(2)}
                  </td>
                  <td className="py-5 px-6 text-center">
                    <span
                      className="px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest inline-flex items-center gap-1.5 border transition-all duration-300"
                      style={{
                        backgroundColor:
                          (product.category?.color || "#94a3b8") + "15",
                        color: product.category?.color || "#64748b",
                        borderColor:
                          (product.category?.color || "#94a3b8") + "20",
                      }}
                    >
                      <Layers size={12} />
                      {product.category?.name || "Uncategorized"}
                    </span>
                  </td>
                  <td className="py-5 px-6 text-center">
                    {product.isActive ? (
                      <span className="text-emerald-500 font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-1.5">
                        <CheckCircle size={14} strokeWidth={3} />
                        Active
                      </span>
                    ) : (
                      <span className="text-gray-400 font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-1.5">
                        <XCircle size={14} strokeWidth={3} />
                        Inactive
                      </span>
                    )}
                  </td>
                  <td className="py-5 px-6">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onEdit(product)}
                        disabled={!canUpdate}
                        className="p-2.5 bg-white text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all border border-gray-100 hover:border-blue-100 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-gray-400 disabled:hover:border-gray-100"
                        title={canUpdate ? "Edit Product" : "Requires update permission"}
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id, product.name)}
                        disabled={!canDelete || deleteMutation.isPending}
                        className="p-2.5 bg-white text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all border border-gray-100 hover:border-red-100 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-gray-400 disabled:hover:border-gray-100"
                        title={canDelete ? "Delete Product" : "Requires delete permission"}
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

      <ConfirmModal 
        isOpen={!!confirmDelete}
        onClose={() => setConfirmDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Product"
        message={`Are you sure you want to delete "${confirmDelete?.name}"? This will permanently remove the item from your inventory.`}
        confirmText="Yes, Delete"
        isLoading={deleteMutation.isPending}
      />
    </>
  );
};

export default AdminProductTable;
