"use client";
import React, { useState } from "react";
import { Search, Filter, Calendar, ChevronDown } from "lucide-react";
import { useOrders } from "@/hooks/useOrders";
import Modal from "@/components/shared/Modal";
import OrderDetailsModal from "./OrderDetailsModal";

const HistoryView = () => {
  // --- STATE ---
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // --- FETCH DATA ---
  const { data: ordersData } = useOrders({ limit: 50 });
  const orders = ordersData?.orders || [];

  // helpers
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date
      .toLocaleString("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
      .replace(",", " -");
  };

  const handleOpenDetails = (id: string) => {
    setSelectedOrderId(id);
    setIsDetailsOpen(true);
  };

  return (
    <div className="flex flex-col h-full bg-white p-6 overflow-hidden">
      {/* ... (previous filter header code) ... */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-gray-500 font-medium mr-2">Date:</span>
          <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full border border-gray-200 text-sm text-gray-600 cursor-pointer hover:bg-gray-100">
            <span>May 25, 2024</span> <Calendar size={16} className="text-blue-500" />
          </div>
          <span className="text-gray-400">-</span>
          <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full border border-gray-200 text-sm text-gray-600 cursor-pointer hover:bg-gray-100">
            <span>May 29, 2024</span> <Calendar size={16} className="text-blue-500" />
          </div>
          <span className="text-gray-500 font-medium mx-2">Time:</span>
          <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full border border-gray-200 text-sm text-gray-600 cursor-pointer hover:bg-gray-100">
            <span>08.00 AM</span> <ChevronDown size={16} className="text-blue-500" />
          </div>
          <span className="text-gray-400">-</span>
          <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full border border-gray-200 text-sm text-gray-600 cursor-pointer hover:bg-gray-100">
            <span>01.00 PM</span> <ChevronDown size={16} className="text-blue-500" />
          </div>
        </div>
        <div className="flex gap-2">
          <button className="p-3 bg-white border border-gray-200 rounded-full text-gray-400 hover:text-gray-600 transition"><Search size={18} /></button>
          <button className="p-3 bg-white border border-gray-200 rounded-full text-gray-400 hover:text-gray-600 transition"><Filter size={18} /></button>
        </div>
      </div>

      {/* --- TABLE SECTION --- */}
      <div className="flex-1 overflow-auto custom-scrollbar">
        <table className="w-full text-left border-separate border-spacing-0">
          <thead className="sticky top-0 bg-white z-10">
            <tr>
              <th className="sticky left-0 top-0 py-4 px-4 bg-gray-50 rounded-tl-xl text-sm font-bold text-gray-500 text-center z-20">#</th>
              <th className="py-4 px-4 bg-gray-50 text-sm font-bold text-gray-500">Date & Time</th>
              <th className="py-4 px-4 bg-gray-50 text-sm font-bold text-gray-500 text-center">Customer Name</th>
              <th className="py-4 px-4 bg-gray-50 text-sm font-bold text-gray-500 text-center">Order Status</th>
              <th className="py-4 px-4 bg-gray-50 text-sm font-bold text-gray-500 text-center">Total Payment</th>
              <th className="py-4 px-4 bg-gray-50 text-sm font-bold text-gray-500 text-center">Payment Status</th>
              <th className="py-4 px-4 bg-gray-50 last:rounded-r-xl text-sm font-bold text-gray-500 text-center">Orders</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.map((row: any) => (
              <tr key={row.id} className="hover:bg-gray-50 transition-colors group">
                <td className="sticky left-0 py-4 px-4 text-center font-medium text-gray-800 bg-white group-hover:bg-gray-50 transition-colors z-10 border-b border-gray-100">{String(row.orderNo).padStart(3, "0")}</td>
                <td className="py-4 px-4 font-medium text-gray-800 border-b border-gray-100">{formatDate(row.orderTime)}</td>
                <td className="py-4 px-4 text-center font-medium text-gray-800">{row.customer?.name || "Guest"}</td>
                <td className="py-4 px-4 text-center">
                  <span className={`px-3 py-1 rounded-lg text-xs font-bold inline-block min-w-[80px]
                    ${row.status === "COMPLETED" ? "bg-blue-50 text-blue-600" : row.status === "CANCELLED" ? "bg-gray-100 text-gray-500" : "bg-amber-50 text-amber-600"}
                  `}>
                    {row.status === "COMPLETED" ? "Done" : row.status === "CANCELLED" ? "Canceled" : row.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-center font-medium text-gray-800">${Number(row.totalAmount).toFixed(2)}</td>
                <td className="py-4 px-4 text-center">
                  <span className={`px-3 py-1 rounded-lg text-xs font-bold inline-block min-w-[80px]
                    ${row.status === "COMPLETED" ? "bg-emerald-50 text-emerald-500" : "bg-red-50 text-red-400"}
                  `}>
                    {row.status === "COMPLETED" ? "Paid" : "Unpaid"}
                  </span>
                </td>
                <td className="py-4 px-4 text-center border-b border-gray-100">
                  <button 
                    onClick={() => handleOpenDetails(row.id)}
                    className="text-blue-500 font-medium text-sm hover:underline"
                  >
                    Detail
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- DETAILS MODAL --- */}
      {selectedOrderId && (
        <Modal
          show={isDetailsOpen}
          onClose={() => setIsDetailsOpen(false)}
          title="Order Details"
          index={100}
          showCloseButton={false} // Our component has its own close button
        >
          <OrderDetailsModal 
            orderId={selectedOrderId} 
            onClose={() => setIsDetailsOpen(false)} 
          />
        </Modal>
      )}
    </div>
  );
};

export default HistoryView;
