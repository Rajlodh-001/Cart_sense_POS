"use client";
import React, { useState, useEffect } from "react";
import { Search, Filter, Calendar, ChevronDown } from "lucide-react";
import { useOrderHistory } from "@/hooks/useOrders";
import Modal from "@/components/shared/Modal";
import OrderDetailsModal from "./OrderDetailsModal";

const HistoryView = () => {
  // --- STATE ---
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // Filter State
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Search Debouncing
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(timer);
  }, [search]);

  // --- FETCH DATA ---
  const { data: ordersData, isLoading } = useOrderHistory({
    limit: 50,
    search: debouncedSearch || undefined,
    fromDate: fromDate || undefined,
    toDate: toDate || undefined,
  });
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
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col xl:flex-row items-center justify-between gap-4 mb-6">
        <div className="flex flex-wrap items-center gap-2">
          {/* Search Input (Integrated into the pill style) */}
          <div className="relative group">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search Order # or Name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm text-gray-700 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all w-64"
            />
          </div>

          <div className="h-6 w-px bg-gray-200 mx-2 hidden md:block" />

          <span className="text-gray-500 font-medium mr-2">Date:</span>
          <div className="flex items-center gap-2 bg-gray-50 px-4 py-1.5 rounded-full border border-gray-200 text-sm text-gray-600 hover:bg-gray-100 transition-colors">
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="bg-transparent outline-none cursor-pointer font-medium"
            />
            <Calendar size={14} className="text-blue-500" />
          </div>
          <span className="text-gray-400">-</span>
          <div className="flex items-center gap-2 bg-gray-50 px-4 py-1.5 rounded-full border border-gray-200 text-sm text-gray-600 hover:bg-gray-100 transition-colors">
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="bg-transparent outline-none cursor-pointer font-medium"
            />
            <Calendar size={14} className="text-blue-500" />
          </div>

          {(search || fromDate || toDate) && (
            <button
              onClick={() => {
                setSearch("");
                setFromDate("");
                setToDate("");
              }}
              className="ml-2 text-xs font-bold text-red-500 hover:underline px-2"
            >
              Clear
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span className="font-medium">Total: {ordersData?.filteredCount || 0}</span>
          <button className="p-2.5 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition shadow-sm">
            <Filter size={16} />
          </button>
        </div>
      </div>

      {/* --- TABLE SECTION --- */}
      <div className="flex-1 overflow-auto custom-scrollbar">
        <table className="w-full text-left border-separate border-spacing-0">
          <thead>
            <tr>
              <th className="sticky left-0 top-0 py-4 px-4 bg-gray-50 rounded-tl-xl text-sm font-bold text-gray-500 text-center z-30">
                #
              </th>
              <th className="sticky top-0 py-4 px-4 bg-gray-50 text-sm font-bold text-gray-500 z-20">
                Date & Time
              </th>
              <th className="sticky top-0 py-4 px-4 bg-gray-50 text-sm font-bold text-gray-500 text-center z-20">
                Customer Name
              </th>
              <th className="sticky top-0 py-4 px-4 bg-gray-50 text-sm font-bold text-gray-500 text-center z-20">
                Order Status
              </th>
              <th className="sticky top-0 py-4 px-4 bg-gray-50 text-sm font-bold text-gray-500 text-center z-20">
                Total Payment
              </th>
              <th className="sticky top-0 py-4 px-4 bg-gray-50 text-sm font-bold text-gray-500 text-center z-20">
                Payment Status
              </th>
              <th className="sticky top-0 py-4 px-4 bg-gray-50 last:rounded-tr-xl text-sm font-bold text-gray-500 text-center z-20">
                Orders
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {isLoading ? (
              Array.from({ length: 10 }).map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td className="sticky left-0 py-4 px-4 bg-white border-b border-gray-100">
                    <div className="h-5 w-8 bg-gray-100 rounded mx-auto"></div>
                  </td>
                  <td className="py-4 px-4 border-b border-gray-100">
                    <div className="h-4 w-32 bg-gray-100 rounded"></div>
                  </td>
                  <td className="py-4 px-4 border-b border-gray-100">
                    <div className="h-4 w-24 bg-gray-100 rounded mx-auto"></div>
                  </td>
                  <td className="py-4 px-4 border-b border-gray-100 text-center">
                    <div className="h-6 w-16 bg-gray-50 rounded-lg mx-auto"></div>
                  </td>
                  <td className="py-4 px-4 border-b border-gray-100">
                    <div className="h-4 w-12 bg-gray-100 rounded mx-auto"></div>
                  </td>
                  <td className="py-4 px-4 border-b border-gray-100 text-center">
                    <div className="h-6 w-16 bg-gray-50 rounded-lg mx-auto"></div>
                  </td>
                  <td className="py-4 px-4 border-b border-gray-100 text-center">
                    <div className="h-4 w-10 bg-gray-100 rounded mx-auto"></div>
                  </td>
                </tr>
              ))
            ) : (
              orders.map((row: any) => (
              <tr key={row.id} className="hover:bg-gray-50 transition-colors group">
                <td className="sticky left-0 py-4 px-4 text-center font-medium text-gray-800 bg-white group-hover:bg-gray-50 transition-colors z-10 border-b border-gray-100">
                  {String(row.orderNo).padStart(3, "0")}
                </td>
                <td className="py-4 px-4 font-medium text-gray-800 border-b border-gray-100">
                  {formatDate(row.orderTime)}
                </td>
                <td className="py-4 px-4 text-center font-medium text-gray-800">
                  {row.customer?.name || "Guest"}
                </td>
                <td className="py-4 px-4 text-center border-b border-gray-100">
                  <span
                    className={`px-3 py-1 rounded-lg text-xs font-bold inline-block min-w-[80px]
                    ${
                      row.status === "COMPLETED"
                        ? "bg-blue-50 text-blue-600"
                        : row.status === "CANCELLED"
                        ? "bg-gray-100 text-gray-500"
                        : "bg-amber-50 text-amber-600"
                    }
                  `}
                  >
                    {row.status === "COMPLETED"
                      ? "Done"
                      : row.status === "CANCELLED"
                      ? "Canceled"
                      : row.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-center font-medium text-gray-800 border-b border-gray-100">
                  ${Number(row.totalAmount).toFixed(2)}
                </td>
                <td className="py-4 px-4 text-center border-b border-gray-100">
                  <span
                    className={`px-3 py-1 rounded-lg text-xs font-bold inline-block min-w-[80px]
                    ${
                      row.status === "COMPLETED"
                        ? "bg-emerald-50 text-emerald-500"
                        : "bg-red-50 text-red-400"
                    }
                  `}
                  >
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
            )))}
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
          showCloseButton={false}
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
