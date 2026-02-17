"use client";
import React from 'react';
import { Search, Filter, Calendar, ChevronDown } from 'lucide-react';

const HistoryView = () => {
  // --- MOCK DATA ---
  const historyData = [
    { id: '001', date: '25/05/2024 - 08:00 AM', name: 'George', status: 'Done', amount: 'USD 35.00', payment: 'Paid' },
    { id: '002', date: '25/05/2024 - 08:17 AM', name: 'Charlie', status: 'Done', amount: 'USD 12.50', payment: 'Paid' },
    { id: '003', date: '25/05/2024 - 08:30 AM', name: 'Hyacinth', status: 'Done', amount: 'USD 15.25', payment: 'Paid' },
    { id: '004', date: '25/05/2024 - 08:35 AM', name: 'Francesca', status: 'Done', amount: 'USD 22.10', payment: 'Paid' },
    { id: '005', date: '25/05/2024 - 08:42 AM', name: 'Eliza', status: 'Canceled', amount: 'USD 12.25', payment: 'Unpaid' },
    { id: '006', date: '25/05/2024 - 09:00 AM', name: 'Jelly', status: 'Done', amount: 'USD 64.00', payment: 'Paid' },
    { id: '007', date: '25/05/2024 - 11:20 AM', name: 'Justin', status: 'Done', amount: 'USD 21.50', payment: 'Paid' },
    { id: '008', date: '25/05/2024 - 11:58 AM', name: 'Gregory', status: 'Done', amount: 'USD 16.25', payment: 'Paid' },
    { id: '009', date: '25/05/2024 - 12:03 AM', name: 'Alwi', status: 'Canceled', amount: 'USD 19.20', payment: 'Unpaid' },
    { id: '010', date: '25/05/2024 - 12:15 PM', name: 'Ganta', status: 'Done', amount: 'USD 12.25', payment: 'Paid' },
    { id: '011', date: '25/05/2024 - 01:00 PM', name: 'Zelda', status: 'Done', amount: 'USD 20.12', payment: 'Paid' },
    { id: '001', date: '26/05/2024 - 10:08 AM', name: 'Penelope', status: 'Done', amount: 'USD 13.50', payment: 'Paid' },
    { id: '002', date: '26/05/2024 - 12:47 AM', name: 'Olivia', status: 'Done', amount: 'USD 10.50', payment: 'Paid' },
  ];

  return (
    <div className="flex flex-col h-full bg-white p-6 overflow-hidden">
      
      {/* --- FILTER HEADER --- */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        
        {/* Date & Time Range Pickers */}
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

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button className="p-3 bg-white border border-gray-200 rounded-full text-gray-400 hover:text-gray-600 transition"><Search size={18} /></button>
          <button className="p-3 bg-white border border-gray-200 rounded-full text-gray-400 hover:text-gray-600 transition"><Filter size={18} /></button>
        </div>
      </div>

      {/* --- TABLE SECTION --- */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 bg-white z-10">
            <tr>
              <th className="py-4 px-4 bg-gray-50 first:rounded-l-xl text-sm font-bold text-gray-500 text-center">#</th>
              <th className="py-4 px-4 bg-gray-50 text-sm font-bold text-gray-500">Date & Time</th>
              <th className="py-4 px-4 bg-gray-50 text-sm font-bold text-gray-500 text-center">Customer Name</th>
              <th className="py-4 px-4 bg-gray-50 text-sm font-bold text-gray-500 text-center">Order Status</th>
              <th className="py-4 px-4 bg-gray-50 text-sm font-bold text-gray-500 text-center">Total Payment</th>
              <th className="py-4 px-4 bg-gray-50 text-sm font-bold text-gray-500 text-center">Payment Status</th>
              <th className="py-4 px-4 bg-gray-50 last:rounded-r-xl text-sm font-bold text-gray-500 text-center">Orders</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {historyData.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors group">
                <td className="py-4 px-4 text-center font-medium text-gray-800">{row.id}</td>
                <td className="py-4 px-4 font-medium text-gray-800">{row.date}</td>
                <td className="py-4 px-4 text-center font-medium text-gray-800">{row.name}</td>
                
                {/* Order Status */}
                <td className="py-4 px-4 text-center">
                  <span className={`text-sm font-medium ${row.status === 'Canceled' ? 'text-gray-400' : 'text-gray-800'}`}>
                    {row.status}
                  </span>
                </td>

                <td className="py-4 px-4 text-center font-medium text-gray-800">{row.amount}</td>
                
                {/* Payment Badge */}
                <td className="py-4 px-4 text-center">
                  <span className={`px-3 py-1 rounded-lg text-xs font-bold inline-block min-w-[60px]
                    ${row.payment === 'Paid' 
                      ? 'bg-emerald-50 text-emerald-500' 
                      : 'bg-red-50 text-red-400'}
                  `}>
                    {row.payment}
                  </span>
                </td>

                {/* Details Link */}
                <td className="py-4 px-4 text-center">
                  <button className="text-blue-500 font-medium text-sm hover:underline">Detail</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default HistoryView;




