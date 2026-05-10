"use client";
import React, { useState } from "react";
import { Plus, Edit2, Search, Filter, X, Clock, User, ChevronRight, CheckCircle2, Timer, UtensilsCrossed } from "lucide-react";
import Portal from "../../shared/Portal";

import { useTables, Table } from "@/hooks/useTables";
import { useUpdateOrder } from "@/hooks/useOrders";
import PaymentModal from "@/components/activity/PaymentModal";
import ConnectionError from "@/components/shared/ConnectionError";
import toast from "react-hot-toast";

const TablesView = () => {
  const { data: dbTables, isLoading, isError } = useTables(true);
  const tables: Table[] = dbTables || [];

  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [showBillModal, setShowBillModal] = useState(false);
  const updateOrderMutation = useUpdateOrder();

  // Derived Zones for "Floors" filter
  const zones = Array.from(
    new Set(tables.map((t) => t.zone?.name || "Main Area")),
  );
  const [activeFloor, setActiveFloor] = useState(zones[0] || "Main Area");

  // When zones update from fetch, guarantee a valid active floor
  React.useEffect(() => {
    if (zones.length > 0 && !zones.includes(activeFloor)) {
      setActiveFloor(zones[0]);
    }
  }, [zones, activeFloor]);

  // Group tables dynamically by capacity for sections
  const filteredTables = tables.filter(
    (t) => (t.zone?.name || "Main Area") === activeFloor,
  );
  const capacities = Array.from(
    new Set(filteredTables.map((t) => t.capacity)),
  ).sort((a, b) => a - b);
  const renderSection = (capacity: number) => {
    const sectionTables = filteredTables.filter((t) => t.capacity === capacity);
    if (sectionTables.length === 0) return null;

    return (
      <div className="mb-8" key={`cap-${capacity}`}>
        <h3 className="text-gray-500 font-medium mb-4 text-sm">
          {capacity} Persons
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {sectionTables.map((table) => {
            // Check status via derived active orders or backend truth
            const hasOrder = table.orders && table.orders.length > 0;
            const hasReservation =
              table.reservations && table.reservations.length > 0;

            // Map DB status to UI styles
            let mappedStatus = "Available";
            if (table.status === "OCCUPIED" || hasOrder) mappedStatus = "Served";
            if (table.status === "DIRTY") mappedStatus = "Dirty";
            if (table.status === "RESERVED" && !hasOrder) mappedStatus = "Reserved";

            let guests = 0;
            let timeStr = "--:--";
            let DisplayName = "";

            if (hasOrder) {
              guests = 0; // The active Order usually has seat count, but we didn't fetch it explicitly in table query. Let's show "Occupied"
              timeStr = new Date(table.orders![0].orderTime)
                .toLocaleString("en-US", { hour: "2-digit", minute: "2-digit" })
                .replace(",", "");
              DisplayName = table.orders![0].customer?.name || "Guest";
            } else if (hasReservation) {
              timeStr = new Date(table.reservations![0].startTime)
                .toLocaleString("en-US", { hour: "2-digit", minute: "2-digit" })
                .replace(",", "");
              DisplayName = table.reservations![0].customerName || "Reserved";
            }

            return (
              <TableCard
                key={table.id}
                onClick={() => setSelectedTable(table)}
                data={{
                  id: table.name, // Usually T-01 is stored in 'name'
                  status: mappedStatus,
                  name: DisplayName,
                  guests: guests || "N/A",
                  time: timeStr,
                }}
              />
            );
          })}
        </div>
      </div>
    );
  };

  const handleGoToBilling = () => {
    if (selectedTable?.orders?.[0]) {
      setShowBillModal(true);
    }
  };

  const handleSettlement = async (details: any) => {
    const activeOrder = selectedTable?.orders?.[0];
    if (!activeOrder) return;

    try {
      await toast.promise(
        updateOrderMutation.mutateAsync({
          id: activeOrder.id,
          data: {
            status: "COMPLETED",
            paymentMethod: details.paymentMethod,
            cashReceived: details.cashReceived,
            changeReturned: details.changeReturned,
            notes: details.orderNote,
          },
        }),
        {
          loading: "Finalizing settlement...",
          success: "Table settled successfully!",
          error: "Failed to settle table.",
        },
      );

      setShowBillModal(false);
      setSelectedTable(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#F8F9FB] p-6 overflow-y-auto custom-scrollbar">
      {/* HEADER: Title & Add Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Add Table</h1>
        <button className="p-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition">
          <Plus size={20} />
        </button>
      </div>

      {/* CONTROLS: Floors & Actions */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        {/* Floor Tabs */}
        <div className="bg-gray-100 p-1 rounded-full flex gap-1">
          {zones.map((floor) => (
            <button
              key={floor}
              onClick={() => setActiveFloor(floor)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all
                ${
                  activeFloor === floor
                    ? "bg-white text-blue-600 shadow-sm border border-gray-200"
                    : "text-gray-400 hover:text-gray-600"
                }
              `}
            >
              {floor}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button className="p-3 bg-white border border-gray-200 rounded-full text-gray-400 hover:text-gray-600">
            <Edit2 size={18} />
          </button>
          <button className="p-3 bg-white border border-gray-200 rounded-full text-gray-400 hover:text-gray-600">
            <Search size={18} />
          </button>
          <button className="p-3 bg-white border border-gray-200 rounded-full text-gray-400 hover:text-gray-600">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* TABLE GRIDS */}
      {isLoading ? (
        <div className="flex-1 flex items-center justify-center text-blue-400">
          Loading tables...
        </div>
      ) : isError ? (
        <ConnectionError entityName="tables" fullScreen={false} />
      ) : capacities.length > 0 ? (
        capacities.map((cap) => renderSection(cap))
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-400 italic">
          No tables found.
        </div>
      )}

      {/* FOOTER: Legend */}
      <div className="mt-auto pt-6 flex items-center gap-6 border-t border-gray-200">
        <span className="text-sm font-bold text-gray-800">Table Status:</span>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span className="w-3 h-3 rounded-full bg-gray-300"></span> Available
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span className="w-3 h-3 rounded-full bg-blue-600"></span> Served
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span className="w-3 h-3 rounded-full bg-red-500"></span> Reserved
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span className="w-3 h-3 rounded-full bg-amber-500"></span> Dirty
        </div>
      </div>

      {/* DETAIL MODAL */}
      <TableDetailModal
        table={selectedTable}
        onClose={() => setSelectedTable(null)}
        onBilling={handleGoToBilling}
      />

      {showBillModal && selectedTable?.orders?.[0] && (
        <PaymentModal
          totalAmount={selectedTable.orders[0].items?.reduce((acc: number, item: any) => acc + Number(item.total || 0), 0) || 0}
          items={selectedTable.orders[0].items || []}
          initialDetails={{
            customer: selectedTable.orders[0].customer as any,
            phone: selectedTable.orders[0].customer?.phone,
            orderNote: selectedTable.orders[0].notes,
            orderType: selectedTable.orders[0].orderType?.toLowerCase() as any,
            tableId: selectedTable.id,
            seatCount: selectedTable.orders[0].seatCount,
          }}
          showPayLater={false}
          onClose={() => setShowBillModal(false)}
          onConfirm={handleSettlement}
        />
      )}
    </div>
  );
};

// --- SUB-COMPONENT: Table Detail Modal ---
const TableDetailModal = ({
  table,
  onClose,
  onBilling,
}: {
  table: Table | null;
  onClose: () => void;
  onBilling: () => void;
}) => {
  if (!table) return null;

  const activeOrder = table.orders?.[0];
  const items = activeOrder?.items || [];

  return (
    <Portal>
      <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={onClose}
        />

        {/* Modal Content */}
        <div className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200 group">
          {/* Header Section */}
          <div className="p-8 bg-gradient-to-br from-gray-50 to-white border-b border-gray-100">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-blue-600 rounded-3xl flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-blue-100">
                  {table.name}
                </div>
                <div>
                  <h2 className="text-2xl font-black text-gray-900 tracking-tight">
                    {activeOrder?.customer?.name || "Guest Table"}
                  </h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider
                      ${
                        table.status === "OCCUPIED"
                          ? "bg-blue-100 text-blue-600"
                          : table.status === "DIRTY"
                            ? "bg-amber-100 text-amber-600"
                            : "bg-gray-100 text-gray-500"
                      }
                    `}
                    >
                      {table.status}
                    </span>
                    <span className="text-xs text-gray-400 font-bold flex items-center gap-1">
                      <Clock size={12} />{" "}
                      {activeOrder
                        ? new Date(activeOrder.orderTime).toLocaleTimeString(
                            [],
                            { hour: "2-digit", minute: "2-digit" },
                          )
                        : "No active order"}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-3 bg-white hover:bg-red-50 hover:text-red-500 rounded-2xl border border-gray-100 transition-all active:scale-90"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                  <User size={10} className="text-blue-500" /> Seated Guests
                </p>
                <p className="text-lg font-bold text-gray-900">
                  {table.capacity} Persons
                </p>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                  <Timer size={10} className="text-blue-500" /> Active Time
                </p>
                <p className="text-lg font-bold text-gray-900">--:--</p>
              </div>
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-8 max-h-[400px] bg-white scrollbar-hide">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <UtensilsCrossed size={14} className="text-blue-500" /> Order
              Summary
            </h3>

            {items.length === 0 ? (
              <div className="py-10 text-center text-gray-400 font-bold italic">
                No items ordered yet.
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center group/item"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 font-bold text-sm transition-colors group-hover/item:bg-blue-50 group-hover/item:text-blue-600">
                        {item.quantity}x
                      </div>
                      <div>
                        <p className="font-bold text-gray-800 text-base leading-tight">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-400 font-bold mt-0.5">
                          Regular
                        </p>
                      </div>
                    </div>

                    <div
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-black text-[10px] uppercase tracking-wider
                      ${
                        item.status === "SERVED"
                          ? "bg-green-50 text-green-600"
                          : item.status === "READY"
                            ? "bg-blue-50 text-blue-600"
                            : item.status === "PREPARING"
                              ? "bg-amber-50 text-amber-600"
                              : "bg-gray-50 text-gray-400"
                      }
                    `}
                    >
                      {item.status === "SERVED" && <CheckCircle2 size={12} />}
                      {item.status}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="p-8 bg-gray-50 border-t border-gray-100 flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-4 bg-white border border-gray-200 rounded-2xl font-black text-gray-600 hover:bg-gray-100 transition-all active:scale-95"
            >
              Close
            </button>
            <button
              onClick={onBilling}
              disabled={!activeOrder}
              className={`flex-[1.5] py-4 rounded-2xl font-black shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2 group/btn ${
                activeOrder 
                  ? "bg-blue-600 text-white shadow-blue-100 hover:bg-blue-700" 
                  : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
              }`}
            >
              Go to Billing{" "}
              <ChevronRight
                size={18}
                className="group-hover/btn:translate-x-1 transition-transform"
              />
            </button>
          </div>
        </div>
      </div>
    </Portal>
  );
};

// --- SUB-COMPONENT: Table Card ---
const TableCard = ({ data, onClick }: { data: any; onClick: () => void }) => {
  // Styles configuration based on status
  const styles: any = {
    Available: {
      card: "bg-white border-transparent text-gray-400",
      pill: "bg-gray-100 text-gray-400",
      name: "text-gray-400",
      time: "text-gray-300",
    },
    Served: {
      card: "bg-white border-transparent shadow-sm",
      pill: "bg-blue-600 text-white",
      name: "text-blue-600",
      time: "text-gray-500",
    },
    Reserved: {
      card: "bg-red-50 border-red-100", // Light reddish background for Reserved
      pill: "bg-red-500 text-white",
      name: "text-red-500",
      time: "text-gray-600",
    },
    Dirty: {
      card: "bg-white border-amber-100 grayscale-[0.5]",
      pill: "bg-amber-500 text-white",
      name: "text-amber-600",
      time: "text-gray-400",
    },
  };

  const currentStyle = styles[data.status];

  return (
    <div
      onClick={onClick}
      className={`p-6 rounded-3xl border flex flex-col items-center justify-center gap-3 transition-all cursor-pointer hover:shadow-md ${currentStyle.card}`}
    >
      {/* Table ID Pill */}
      <div
        className={`w-20 h-12 rounded-3xl flex items-center justify-center text-sm font-bold ${currentStyle.pill}`}
      >
        {data.id}
      </div>

      {/* Guest Info */}
      <div className="text-center">
        {data.status === "Available" ? (
          <p className="text-sm font-medium">0 Guest</p>
        ) : (
          <p className={`text-sm font-bold ${currentStyle.name} truncate w-32`}>
            {data.name}
            {data.guests !== "N/A" && (
              <>
                <br />
                <span className="font-medium text-gray-500">
                  {data.guests} Guests
                </span>
              </>
            )}
          </p>
        )}
      </div>

      {/* Time */}
      <div className={`text-xs ${currentStyle.time}`}>{data.time}</div>
    </div>
  );
};

export default TablesView;
