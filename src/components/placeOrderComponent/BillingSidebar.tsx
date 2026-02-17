"use client";
import React from 'react';
import { Search } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const BillingSidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  
  const menuItems = [
    { id: 'place-order', label: 'Place Order' },
    { id: 'billing', label: 'Billing Queue' },
    { id: 'tables', label: 'Tables' },
    { id: 'history', label: 'Order History' },
  ];

  return (
    <div className="flex flex-col h-full w-80 bg-white border-r border-gray-100 p-6 flex-shrink-0 justify-between transition-all">
      
      {/* --- TOP SECTION --- */}
      <div className="space-y-6">
        
        {/* Search Bar */}
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full bg-gray-50 text-gray-700 rounded-2xl pl-12 pr-4 py-4 outline-none focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all shadow-sm"
          />
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-3">
          {menuItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full text-left font-medium text-lg px-6 py-5 rounded-2xl transition-all duration-200 flex items-center
                  ${isActive 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 scale-100' 
                    : 'bg-white text-gray-600 hover:bg-gray-50 hover:pl-7'}
                `}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* --- FOOTER SECTION --- */}
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-blue-600 font-bold text-xl flex items-center gap-2 cursor-default">
            Bakehouse <span className="text-gray-400 font-normal text-sm">• POS System</span>
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            The dreamy taste & magic of sweet moments in every bite from our bakery.
          </p>
        </div>

        {/* Interactive Footer Pills */}
        <div className="flex flex-wrap gap-2 text-[10px] font-bold text-gray-500">
          <span className="px-3 py-2 rounded-full border border-gray-200 bg-white cursor-default">
            © 2024. Bakehouse
          </span>
          <button 
            onClick={() => onTabChange('contacts')}
            className={`px-3 py-2 rounded-full transition-colors ${activeTab === 'contacts' ? 'bg-blue-100 text-blue-600' : 'bg-gray-50 hover:bg-gray-100'}`}
          >
            Contacts
          </button>
          <button 
             onClick={() => onTabChange('help')}
             className={`px-3 py-2 rounded-full transition-colors ${activeTab === 'help' ? 'bg-blue-100 text-blue-600' : 'bg-gray-50 hover:bg-gray-100'}`}
          >
            Help
          </button>
        </div>
      </div>
    </div>
  );
};

export default BillingSidebar;