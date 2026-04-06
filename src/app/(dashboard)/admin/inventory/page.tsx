"use client";

import { Package, Plus } from "lucide-react";

export default function InventoryPage() {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Inventory Management</h1>
          <p className="text-gray-500 mt-1">Track and manage your products and stock levels.</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all">
          <Plus size={20} />
          <span>Add Product</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Placeholder Stats */}
        <div className="bg-blue-50 border border-blue-100 p-6 rounded-3xl">
          <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center text-white mb-4">
            <Package size={24} />
          </div>
          <h3 className="text-gray-600 font-semibold mb-1">Total Items</h3>
          <p className="text-3xl font-black text-blue-900">1,248</p>
        </div>
        
        {/* More cards could go here */}
      </div>

      <div className="mt-10 bg-gray-50 border border-dashed border-gray-200 rounded-3xl h-64 flex flex-col items-center justify-center text-gray-400">
        <Package size={48} className="mb-4 opacity-20" />
        <p className="font-medium">Inventory list will appear here</p>
      </div>
    </div>
  );
}
