"use client";
import React, { useState } from 'react';
import BillingSidebar from '@/components/placeOrderComponent/BillingSidebar';
import { MoreHorizontal, Search, ChevronLeft, ChevronRight, Inbox, Clock, HelpCircle, Phone } from 'lucide-react';
import OrderItem from '@/components/placeOrderComponent/OrderItem'; // Ensure this exists
import TablesView from './TablesView';
import HistoryView from './HistoryView';
import TrackOrderSection from './TrackOrderSection';

// --- MOCK DATA ---
const INITIAL_ORDERS = [
  { id: '#006', name: "Francois", table: "06", date: "Wed, 29 May 2024 • 09:15 AM", price: "20.00", status: "Active" },
  { id: '#005', name: "Elouise", table: "05", date: "Wed, 29 May 2024 • 09:00 AM", price: "19.35", status: "Closed" },
  { id: '#004', name: "Mike", table: "04", date: "Wed, 29 May 2024 • 08:15 AM", price: "25.00", status: "Active" },
  { id: '#003', name: "Billie", table: "03", date: "Wed, 29 May 2024 • 08:00 AM", price: "31.50", status: "Active" },
  { id: '#002', name: "John", table: "02", date: "Wed, 29 May 2024 • 07:45 AM", price: "12.00", status: "Closed" },
];

const BillingQueue = () => {
  // 1. STATE MANAGEMENT
  const [filterStatus, setFilterStatus] = useState('All'); // 'All', 'Active', 'Closed'

  // 2. FILTER LOGIC
  const filteredOrders = INITIAL_ORDERS.filter(order => {
    if (filterStatus === 'All') return true;
    return order.status === filterStatus;
  });

  const activeCount = INITIAL_ORDERS.filter(o => o.status === 'Active').length;

  return (
   // Top-level container: Flex column to stack Header + Scrollable Body
    <div className="flex flex-col flex-1 h-full bg-[#F8F9FB] overflow-hidden min-w-0">
      
      {/* HEADER: Fixed at the top */}
      <header className="px-8 py-5 bg-white border-b border-gray-100 flex items-center justify-between flex-shrink-0 z-10">
        
        {/* Interactive Filters */}
        <div className="flex gap-2 bg-gray-50 p-1 rounded-full">
          {['All', 'Active', 'Closed'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-200
                ${filterStatus === status 
                  ? 'bg-white text-blue-600 shadow-sm border border-gray-100 scale-105' 
                  : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'}
              `}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <div className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl text-sm font-bold animate-pulse">
            {activeCount} Active Queue
          </div>
          <button className="p-2 border border-gray-200 rounded-full hover:bg-gray-50 text-gray-400 transition">
            <MoreHorizontal size={20} />
          </button>
        </div>
      </header>

      {/* SCROLLABLE BODY: Takes remaining height */}
      <main className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
        
        {/* ORDERS LIST */}
        <section className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="divide-y divide-gray-50">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <OrderItem 
                  key={order.id}
                  {...order} // spread props: name, id, table, etc.
                />
              ))
            ) : (
              <div className="p-8 text-center text-gray-400 italic">No orders found.</div>
            )}
          </div>
        </section>

        {/* TRACK ORDER GRID */}
        {/* <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Track Order</h2>
            <div className="flex gap-2">
              <button className="w-10 h-10 flex items-center justify-center bg-white rounded-full border border-gray-100 text-gray-400 hover:text-blue-600 transition"><Search size={18} /></button>
              <button className="w-10 h-10 flex items-center justify-center bg-white rounded-full border border-gray-100 text-gray-400 hover:bg-gray-50 transition"><ChevronLeft size={18} /></button>
              <button className="w-10 h-10 flex items-center justify-center bg-blue-600 rounded-full text-white shadow-lg shadow-blue-200 hover:bg-blue-700 transition"><ChevronRight size={18} /></button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <TrackCard name="Mike" table="04" status="On Kitchen Hand" items={4} />
            <TrackCard name="Billie" table="04" status="All Done" items={6} isDone />
            <TrackCard name="Richard" table="04" status="On Kitchen Hand" items={6} />
            <TrackCard name="Sharon" table="04" status="On Kitchen Hand" items={6} />
          </div>
        </section> */}

        <TrackOrderSection/>
      </main>
    </div>
 
  );
};


// --- HELPER COMPONENTS ---
// (Include TrackCard component from previous answers here if not imported)
const TrackCard = ({ name, table, status, items, isDone }: any) => (
  <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-3 hover:shadow-md transition-shadow cursor-pointer">
    <div className="flex justify-between items-start">
      <div>
        <h4 className="font-bold text-gray-800 text-lg">{name}</h4>
        <p className="text-xs text-gray-400 mt-0.5">Table: {table} • Dine In</p>
        <p className="text-xs text-gray-400">10:00 AM</p>
      </div>
      <span className={`text-[10px] font-bold px-2 py-1 rounded-md whitespace-nowrap ${
        isDone ? 'bg-emerald-50 text-emerald-500' : 'bg-orange-50 text-orange-500'
      }`}>
        {status}
      </span>
    </div>
    <div className="border-t border-dashed border-gray-100 my-1"></div>
    <div className="space-y-1">
      <p className="text-xs text-gray-500">1x Beef Crowich</p>
      <p className="text-xs text-gray-500">1x Grains Pan Bread</p>
      <p className="text-xs text-blue-500 font-semibold cursor-pointer hover:underline">See More</p>
    </div>
    <div className="mt-auto pt-3 flex justify-between items-center text-xs font-medium text-gray-400">
      <span>Total Order:</span>
      <span>{items} Items</span>
    </div>
  </div>
);

export default BillingQueue;