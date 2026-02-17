"use client";
import React, { useState } from "react";
import BillingSidebar from "@/components/placeOrderComponent/BillingSidebar";
import {
  MoreHorizontal,
  Search,
  ChevronLeft,
  ChevronRight,
  Inbox,
  Clock,
  HelpCircle,
  Phone,
} from "lucide-react";
import OrderItem from "@/components/placeOrderComponent/OrderItem"; // Ensure this exists
import TablesView from "./TablesView";
import HistoryView from "./HistoryView";
import BillingQueue from "./BillingQueue";
import PlaceOrderView from "./PlaceOrderView";

// --- MOCK DATA ---
// const INITIAL_ORDERS = [
//   { id: '#006', name: "Francois", table: "06", date: "Wed, 29 May 2024 • 09:15 AM", price: "20.00", status: "Active" },
//   { id: '#005', name: "Elouise", table: "05", date: "Wed, 29 May 2024 • 09:00 AM", price: "19.35", status: "Closed" },
//   { id: '#004', name: "Mike", table: "04", date: "Wed, 29 May 2024 • 08:15 AM", price: "25.00", status: "Active" },
//   { id: '#003', name: "Billie", table: "03", date: "Wed, 29 May 2024 • 08:00 AM", price: "31.50", status: "Active" },
//   { id: '#002', name: "John", table: "02", date: "Wed, 29 May 2024 • 07:45 AM", price: "12.00", status: "Closed" },
// ];

const PlaceorderContainer = () => {
  // 1. STATE MANAGEMENT
  const [activeTab, setActiveTab] = useState("billing"); // 'billing', 'tables', 'history', 'contacts', 'help'
  // const [filterStatus, setFilterStatus] = useState('All'); // 'All', 'Active', 'Closed'

  // 2. FILTER LOGIC
  // const filteredOrders = INITIAL_ORDERS.filter(order => {
  //   if (filterStatus === 'All') return true;
  //   return order.status === filterStatus;
  // });

  // const activeCount = INITIAL_ORDERS.filter(o => o.status === 'Active').length;

  return (
    <div className="flex h-screen w-full bg-[#F8F9FB] overflow-hidden">
      {/* SIDEBAR: Controls the 'activeTab' state */}
      <BillingSidebar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col h-full min-w-0 transition-all">
        {/* === VIEW 1: BILLING QUEUE (The Main Dashboard) === */}
        {activeTab === "place-order" && <PlaceOrderView />}

        {activeTab === "billing" && <BillingQueue />}

        {/* === VIEW 2: TABLES PLACEHOLDER === */}
        {activeTab === "tables" && (
          // <EmptyState
          //   icon={<Inbox size={48} />}
          //   title="Tables Management"
          //   desc="Manage table reservations and availability here."
          // />

          <TablesView />
        )}

        {/* === VIEW 3: HISTORY PLACEHOLDER === */}
        {activeTab === "history" && (
          // <EmptyState
          //   icon={<Clock size={48} />}
          //   title="Order History"
          //   desc="View past transactions and reports."
          // />
          <HistoryView />
        )}

        {/* === VIEW 4: CONTACTS PLACEHOLDER === */}
        {activeTab === "contacts" && (
          <EmptyState
            icon={<Phone size={48} />}
            title="Contacts"
            desc="Supplier and customer contact list."
          />
        )}
        {/* === VIEW 5: HELP PLACEHOLDER === */}
        {activeTab === "help" && (
          <EmptyState
            icon={<HelpCircle size={48} />}
            title="Help Center"
            desc="Guides, tutorials, and support."
          />
        )}
      </div>
    </div>
  );
};

// --- HELPER COMPONENTS ---

const EmptyState = ({ icon, title, desc }: any) => (
  <div className="flex-1 flex flex-col items-center justify-center text-gray-400 bg-gray-50 m-8 rounded-3xl border-2 border-dashed border-gray-200">
    <div className="bg-white p-6 rounded-full shadow-sm mb-4">{icon}</div>
    <h2 className="text-2xl font-bold text-gray-700">{title}</h2>
    <p>{desc}</p>
  </div>
);

// (Include TrackCard component from previous answers here if not imported)
const TrackCard = ({ name, table, status, items, isDone }: any) => (
  <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-3 hover:shadow-md transition-shadow cursor-pointer">
    <div className="flex justify-between items-start">
      <div>
        <h4 className="font-bold text-gray-800 text-lg">{name}</h4>
        <p className="text-xs text-gray-400 mt-0.5">Table: {table} • Dine In</p>
        <p className="text-xs text-gray-400">10:00 AM</p>
      </div>
      <span
        className={`text-[10px] font-bold px-2 py-1 rounded-md whitespace-nowrap ${
          isDone
            ? "bg-emerald-50 text-emerald-500"
            : "bg-orange-50 text-orange-500"
        }`}
      >
        {status}
      </span>
    </div>
    <div className="border-t border-dashed border-gray-100 my-1"></div>
    <div className="space-y-1">
      <p className="text-xs text-gray-500">1x Beef Crowich</p>
      <p className="text-xs text-gray-500">1x Grains Pan Bread</p>
      <p className="text-xs text-blue-500 font-semibold cursor-pointer hover:underline">
        See More
      </p>
    </div>
    <div className="mt-auto pt-3 flex justify-between items-center text-xs font-medium text-gray-400">
      <span>Total Order:</span>
      <span>{items} Items</span>
    </div>
  </div>
);

export default PlaceorderContainer;
