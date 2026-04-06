"use client";
import React, { useState } from "react";
import { Plus, Edit2, Search, Filter } from "lucide-react";

import { useTables, Table } from "@/hooks/useTables";

const TablesView = () => {
  const { data: dbTables, isLoading } = useTables();
  const tables: Table[] = dbTables || [];

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
            if (table.status === "OCCUPIED" || hasOrder)
              mappedStatus = "Served";
            // if (table.status === 'DIRTY') mappedStatus = 'Dirty'; // could add a grey styling
            if (table.status === "RESERVED" && !hasOrder)
              mappedStatus = "Reserved";

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
      </div>
    </div>
  );
};

// --- SUB-COMPONENT: Table Card ---
const TableCard = ({ data }: { data: any }) => {
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
  };

  const currentStyle = styles[data.status];

  return (
    <div
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
