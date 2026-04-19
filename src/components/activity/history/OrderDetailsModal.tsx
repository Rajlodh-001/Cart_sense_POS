"use client";

import React from "react";
import { X, Calendar, User, MapPin, Receipt, CreditCard, AlertCircle } from "lucide-react";
import { useOrder } from "@/hooks/useOrders";

interface OrderDetailsModalProps {
  orderId: string;
  onClose: () => void;
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  orderId,
  onClose,
}) => {
  const { data: order, isLoading, error } = useOrder(orderId);

  const formatDate = (dateString?: string) => {
    if (!dateString) return "No Date Provided";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid Date";
    return date.toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // --- LOADING STATE (SKELETON) ---
  if (isLoading) {
    return (
      <div className="flex flex-col w-full max-w-2xl mx-auto bg-white rounded-3xl overflow-hidden animate-pulse">
        <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-6 w-48 bg-gray-100 rounded-lg"></div>
            <div className="h-4 w-32 bg-gray-50 rounded-lg"></div>
          </div>
          <div className="h-10 w-10 bg-gray-50 rounded-full"></div>
        </div>
        <div className="p-8 space-y-8">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-10 h-10 bg-gray-50 rounded-xl"></div>
                  <div className="space-y-2 py-1">
                    <div className="h-3 w-16 bg-gray-100 rounded"></div>
                    <div className="h-4 w-32 bg-gray-100 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-10 h-10 bg-gray-50 rounded-xl"></div>
                  <div className="space-y-2 py-1">
                    <div className="h-3 w-16 bg-gray-100 rounded"></div>
                    <div className="h-4 w-32 bg-gray-100 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="h-40 bg-gray-50 rounded-2xl"></div>
          <div className="h-24 bg-gray-50 rounded-2xl"></div>
        </div>
      </div>
    );
  }

  // --- ERROR STATE ---
  if (error || !order) {
    return (
      <div className="flex flex-col w-full max-w-2xl mx-auto bg-white rounded-3xl overflow-hidden p-12 items-center text-center">
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-500 mb-4">
          <AlertCircle size={32} />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Failed to load order</h3>
        <p className="text-gray-500 mb-8 max-w-sm">We couldn't retrieve the details for this transaction. Please try again or contact support.</p>
        <button onClick={onClose} className="px-8 py-3 bg-gray-900 text-white font-bold rounded-xl active:scale-95 transition-all">Dismiss</button>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-full max-w-2xl mx-auto bg-white rounded-3xl overflow-hidden">
      {/* --- HEADER --- */}
      <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
        <div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">
            Order Details
          </h2>
          <p className="text-gray-400 text-sm font-medium mt-0.5">
            #{String(order?.orderNo ?? 0).padStart(4, "0")} ·{" "}
            {(order?.orderType || "Order").replace("_", " ")}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span
            className={`px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-widest border
            ${
              order?.status === "COMPLETED"
                ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                : "bg-amber-50 text-amber-600 border-amber-100"
            }
          `}
          >
            {order?.status || "PENDING"}
          </span>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all active:scale-95"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* --- BODY --- */}
      <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
        {/* INFO GRIDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500 flex-shrink-0">
                <Calendar size={18} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">
                  Date & Time
                </p>
                <p className="text-sm font-bold text-gray-700 leading-tight">
                  {formatDate(order?.orderTime)}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500 flex-shrink-0">
                <User size={18} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">
                  Customer
                </p>
                <p className="text-sm font-bold text-gray-700 leading-tight">
                  {order?.customer?.name || "Guest Checkout"}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-500 flex-shrink-0">
                <MapPin size={18} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">
                  Table / Location
                </p>
                <p className="text-sm font-bold text-gray-700 leading-tight">
                  {order?.table?.name || "N/A"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500 flex-shrink-0">
                <CreditCard size={18} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">
                  Payment Method
                </p>
                <p className="text-sm font-bold text-gray-700 leading-tight">
                  {order?.paymentMethod || "CASH"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ITEMS LIST */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <Receipt size={16} className="text-gray-400" />
            <span className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">
              Order Summary
            </span>
          </div>

          <div className="bg-gray-50/50 rounded-2xl border border-gray-100 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Item
                  </th>
                  <th className="py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">
                    Qty
                  </th>
                  <th className="py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">
                    Price
                  </th>
                  <th className="py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {order?.items?.map((item: any, idx: number) => (
                  <tr key={idx} className="group">
                    <td className="py-4 px-6">
                      <p className="text-sm font-bold text-gray-800">
                        {item.name}
                      </p>
                      {item.note && (
                        <p className="text-[11px] text-blue-400 italic mt-0.5">
                          {item.note}
                        </p>
                      )}
                    </td>
                    <td className="py-4 px-6 text-center text-sm font-bold text-gray-500">
                      x{item.quantity}
                    </td>
                    <td className="py-4 px-6 text-right text-sm font-medium text-gray-500">
                      ${Number(item.price).toFixed(2)}
                    </td>
                    <td className="py-4 px-6 text-right text-sm font-bold text-gray-900">
                      ${Number(item.total).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* PRICE BREAKDOWN */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="font-medium text-gray-400">Subtotal</span>
            <span className="font-bold text-gray-800">
              ${Number(order?.subTotal ?? 0).toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="font-medium text-gray-400">Tax (10%)</span>
            <span className="font-bold text-gray-800">
              ${Number(order?.tax ?? 0).toFixed(2)}
            </span>
          </div>
          {Number(order?.discount ?? 0) > 0 && (
            <div className="flex justify-between items-center text-sm">
              <span className="font-medium text-emerald-500">
                Discount Applied
              </span>
              <span className="font-bold text-emerald-500">
                -${Number(order.discount).toFixed(2)}
              </span>
            </div>
          )}
          <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
            <span className="text-lg font-black text-gray-900 uppercase tracking-tighter">
              Total Amount
            </span>
            <span className="text-2xl font-black text-blue-600 tracking-tight">
              ${Number(order?.totalAmount ?? 0).toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* --- FOOTER --- */}
      <div className="p-6 bg-gray-50 border-t border-gray-100 flex gap-3">
        <button
          onClick={() => window.print()}
          className="flex-1 py-4 bg-white border border-gray-200 text-gray-700 font-bold text-sm rounded-2xl hover:bg-gray-100 transition-all flex items-center justify-center gap-2 shadow-sm"
        >
          <Receipt size={18} />
          Print Receipt
        </button>
        <button
          onClick={onClose}
          className="flex-1 py-4 bg-gray-900 text-white font-bold text-sm rounded-2xl hover:bg-gray-800 transition-all shadow-lg active:scale-[0.98]"
        >
          Dismiss
        </button>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f9fafb;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e5e7eb;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default OrderDetailsModal;
