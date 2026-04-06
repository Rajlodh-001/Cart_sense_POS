"use client";
import React, { useState } from 'react';
import BillingSidebar from '../BillingSidebar';
import { MoreHorizontal, Search, ChevronLeft, ChevronRight, Inbox, Clock, HelpCircle, Phone } from 'lucide-react';
import OrderItem from './OrderItem';
import TablesView from '../tables/TablesView';
import HistoryView from '../history/HistoryView';
import TrackOrderSection from './TrackOrderSection';

import { useOrders } from '@/hooks/useOrders';

const BillingQueue = () => {
  // 1. STATE MANAGEMENT
  const [filterStatus, setFilterStatus] = useState('All'); // 'All', 'Active', 'Closed'
  const [orderType, setOrderType] = useState('All'); // 'All', 'DINE_IN', 'TAKEAWAY', 'DELIVERY'

  // Map local filter labels to backend status Enums
  const statusMap: Record<string, string | undefined> = {
    'All': undefined,
    'Active': 'PENDING',
    'Closed': 'COMPLETED'
  };

  const typeMap: Record<string, string | undefined> = {
    'All': undefined,
    'Dine In': 'DINE_IN',
    'Takeaway': 'TAKEAWAY',
    'Delivery': 'DELIVERY'
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).replace(',', '');
  };

  // 2. FETCH DATA
  const { data: ordersData, isLoading } = useOrders({
    status: statusMap[filterStatus],
    type: typeMap[orderType],
    limit: 50 // fetch latest 50
  });

  const orders = ordersData?.orders || [];

  // Active count from DB or loosely calculated from all orders if filter is not "Active"
  const activeCount = orders.filter((o: any) => o.status === 'PENDING').length;

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
          {/* Order Type Filter */}
          <select 
            className="border border-gray-200 outline-none rounded-xl px-3 py-2 text-sm font-bold text-gray-700 bg-white"
            value={orderType}
            onChange={(e) => setOrderType(e.target.value)}
          >
            <option value="All">All Types</option>
            <option value="Dine In">Dine In</option>
            <option value="Takeaway">Takeaway</option>
            <option value="Delivery">Delivery</option>
          </select>

          <div className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl text-sm font-bold animate-pulse">
            {activeCount} Active Queue
          </div>
        </div>
      </header>

      {/* SCROLLABLE BODY: Takes remaining height */}
      <main className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
        
        {/* ORDERS LIST */}
        <section className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden min-h-[300px]">
          <div className="divide-y divide-gray-50">
            {isLoading ? (
              <div className="p-8 text-center text-blue-400 font-medium">Loading orders...</div>
            ) : orders.length > 0 ? (
              orders.map((order: any) => (
                <OrderItem 
                  key={order.id}
                  id={`#${order.orderNo}`}
                  name={order.customer?.name || "Guest"}
                  table={order.table?.name || (order.orderType === 'TAKEAWAY' ? 'Takeaway' : 'Delivery')}
                  date={formatDate(order.orderTime)}
                  price={Number(order.totalAmount).toFixed(2)}
                  status={order.status === 'PENDING' ? 'Active' : 'Closed'}
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