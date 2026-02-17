"use client";
import React, { useState } from 'react';
import { Plus, Edit2, Search, Filter } from 'lucide-react';

const TablesView = () => {
  const [activeFloor, setActiveFloor] = useState('1st Floor');

  // --- MOCK DATA BASED ON IMAGE ---
  const tables = [
    // 2 Persons Tables
    { id: 'T-01', type: '2 Persons', status: 'Served', name: 'Sharon', guests: 2, time: '09:00 AM' },
    { id: 'T-02', type: '2 Persons', status: 'Available', name: '', guests: 0, time: '--:--' },
    { id: 'T-03', type: '2 Persons', status: 'Served', name: 'Billie', guests: 2, time: '09:00 AM' },
    { id: 'T-04', type: '2 Persons', status: 'Served', name: 'Mike', guests: 1, time: '09:00 AM' },
    { id: 'T-05', type: '2 Persons', status: 'Available', name: '', guests: 0, time: '--:--' },
    { id: 'T-06', type: '2 Persons', status: 'Available', name: '', guests: 0, time: '--:--' },
    
    // 4 Persons Tables
    { id: 'T-07', type: '4 Persons', status: 'Available', name: '', guests: 0, time: '--:--' },
    { id: 'T-08', type: '4 Persons', status: 'Reserved', name: 'Hyacinth', guests: 3, time: '01:00 PM' },
    { id: 'T-09', type: '4 Persons', status: 'Available', name: '', guests: 0, time: '--:--' },
    { id: 'T-10', type: '4 Persons', status: 'Served', name: 'Justin', guests: 4, time: '09:30 AM' },

    // Max 12 Persons
    { id: 'T-11', type: 'Max 12 Persons', status: 'Available', name: '', guests: 0, time: '--:--' },
    { id: 'T-12', type: 'Max 12 Persons', status: 'Served', name: 'Clark', guests: 5, time: '09:00 AM' },
    { id: 'T-13', type: 'Max 12 Persons', status: 'Reserved', name: 'Meera', guests: 10, time: '09:00 AM' },
    { id: 'T-14', type: 'Max 12 Persons', status: 'Available', name: '', guests: 0, time: '--:--' },
    { id: 'T-15', type: 'Max 12 Persons', status: 'Available', name: '', guests: 0, time: '--:--' },
    { id: 'T-16', type: 'Max 12 Persons', status: 'Reserved', name: 'Wendy', guests: 12, time: '09:00 AM' },
  ];

  const renderSection = (title: string, filterType: string) => (
    <div className="mb-8">
      <h3 className="text-gray-500 font-medium mb-4 text-sm">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {tables.filter(t => t.type === filterType).map((table) => (
          <TableCard key={table.id} data={table} />
        ))}
      </div>
    </div>
  );

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
          {['1st Floor', '2nd Floor', '3rd Floor'].map((floor) => (
            <button
              key={floor}
              onClick={() => setActiveFloor(floor)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all
                ${activeFloor === floor 
                  ? 'bg-white text-blue-600 shadow-sm border border-gray-200' 
                  : 'text-gray-400 hover:text-gray-600'}
              `}
            >
              {floor}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button className="p-3 bg-white border border-gray-200 rounded-full text-gray-400 hover:text-gray-600"><Edit2 size={18} /></button>
          <button className="p-3 bg-white border border-gray-200 rounded-full text-gray-400 hover:text-gray-600"><Search size={18} /></button>
          <button className="p-3 bg-white border border-gray-200 rounded-full text-gray-400 hover:text-gray-600"><Filter size={18} /></button>
        </div>
      </div>

      {/* TABLE GRIDS */}
      {renderSection('2 Persons Table', '2 Persons')}
      {renderSection('4 Persons', '4 Persons')}
      {renderSection('Max 12 Persons', 'Max 12 Persons')}

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
      card: 'bg-white border-transparent text-gray-400',
      pill: 'bg-gray-100 text-gray-400',
      name: 'text-gray-400',
      time: 'text-gray-300'
    },
    Served: {
      card: 'bg-white border-transparent shadow-sm',
      pill: 'bg-blue-600 text-white',
      name: 'text-blue-600',
      time: 'text-gray-500'
    },
    Reserved: {
      card: 'bg-red-50 border-red-100', // Light reddish background for Reserved
      pill: 'bg-red-500 text-white',
      name: 'text-red-500',
      time: 'text-gray-600'
    }
  };

  const currentStyle = styles[data.status];

  return (
    <div className={`p-6 rounded-3xl border flex flex-col items-center justify-center gap-3 transition-all cursor-pointer hover:shadow-md ${currentStyle.card}`}>
      {/* Table ID Pill */}
      <div className={`w-20 h-12 rounded-3xl flex items-center justify-center text-sm font-bold ${currentStyle.pill}`}>
        {data.id}
      </div>

      {/* Guest Info */}
      <div className="text-center">
        {data.status === 'Available' ? (
          <p className="text-sm font-medium">0 Guest</p>
        ) : (
          <p className={`text-sm font-bold ${currentStyle.name}`}>
            {data.name}: <span className="font-medium text-gray-500">{data.guests} Guests</span>
          </p>
        )}
      </div>

      {/* Time */}
      <div className={`text-xs ${currentStyle.time}`}>
        {data.time}
      </div>
    </div>
  );
};

export default TablesView;