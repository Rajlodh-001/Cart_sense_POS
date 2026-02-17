"use client";
import React, { useState } from 'react';
import { 
  Search, Grid, List, User, MapPin, Tag, 
  CreditCard, Banknote, Smartphone, Plus, Minus, Trash2 
} from 'lucide-react';

const PlaceOrderView = () => {
  // --- STATE ---
  const [orderType, setOrderType] = useState<'dine-in' | 'take-away'>('dine-in');
  const [tableNo, setTableNo] = useState('T-04');
  const [paymentMethod, setPaymentMethod] = useState('cash'); // 'cash', 'card', 'qr'
  const [cart, setCart] = useState([
    { id: 1, name: "Beef Crowich", price: 12.00, qty: 1, image: "🥩" },
    { id: 2, name: "Iced Latte", price: 4.50, qty: 2, image: "🥤" },
  ]);

  // --- MOCK MENU ITEMS ---
  const menuItems = [
    { id: 101, name: "Croissant", price: 3.50, category: "Bakery", image: "🥐" },
    { id: 102, name: "Bagel", price: 2.00, category: "Bakery", image: "🥯" },
    { id: 103, name: "Pancakes", price: 8.00, category: "Breakfast", image: "🥞" },
    { id: 104, name: "Burger", price: 12.50, category: "Lunch", image: "🍔" },
    { id: 105, name: "Pizza", price: 15.00, category: "Lunch", image: "🍕" },
    { id: 106, name: "Salad", price: 9.00, category: "Lunch", image: "🥗" },
  ];

  // Calculations
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  return (
    <div className="flex h-full bg-[#F8F9FB] overflow-hidden">
      
      {/* --- LEFT SIDE: MENU SELECTION --- */}
      <div className="flex-1 flex flex-col p-6 pr-2 overflow-hidden">
        
        {/* Search & Categories Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search menu..." 
              className="w-full pl-12 pr-4 py-3 rounded-2xl border-none outline-none focus:ring-2 focus:ring-blue-100 shadow-sm"
            />
          </div>
          <div className="flex gap-2">
             <button className="p-3 bg-white rounded-xl shadow-sm text-blue-600"><Grid size={20}/></button>
             <button className="p-3 bg-white rounded-xl shadow-sm text-gray-400"><List size={20}/></button>
          </div>
        </div>

        {/* Categories Pills */}
        <div className="flex gap-3 mb-6 overflow-x-auto pb-2 custom-scrollbar">
           {['All Menu', 'Bakery', 'Coffee', 'Beverage', 'Main Course', 'Appetizer'].map((cat, i) => (
             <button key={i} className={`px-5 py-2 rounded-full whitespace-nowrap text-sm font-bold transition-colors ${i===0 ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-white text-gray-500 hover:bg-gray-50'}`}>
               {cat}
             </button>
           ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 overflow-y-auto custom-scrollbar pb-20">
           {menuItems.map((item) => (
             <div key={item.id} className="bg-white p-4 rounded-3xl shadow-sm hover:shadow-md transition-all cursor-pointer group">
                <div className="h-32 bg-gray-50 rounded-2xl flex items-center justify-center text-4xl mb-4 group-hover:scale-105 transition-transform">
                  {item.image}
                </div>
                <h4 className="font-bold text-gray-800">{item.name}</h4>
                <p className="text-sm text-gray-400 mb-2">{item.category}</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg text-gray-800">${item.price.toFixed(2)}</span>
                  <button className="p-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition">
                    <Plus size={16} />
                  </button>
                </div>
             </div>
           ))}
        </div>
      </div>

      {/* --- RIGHT SIDE: ORDER FORM & CHECKOUT --- */}
      <div className="w-[400px] bg-white border-l border-gray-100 flex flex-col h-full shadow-xl z-20">
        
        {/* 1. CUSTOMER & TYPE HEADER */}
        <div className="p-6 border-b border-gray-100 space-y-4">
           <h2 className="text-xl font-bold text-gray-800">New Order</h2>
           
           {/* Dine In / Take Away Toggle */}
           <div className="flex bg-gray-100 p-1 rounded-xl">
              <button 
                onClick={() => setOrderType('dine-in')}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${orderType === 'dine-in' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'}`}
              >
                Dine In
              </button>
              <button 
                onClick={() => setOrderType('take-away')}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${orderType === 'take-away' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'}`}
              >
                Take Away
              </button>
           </div>

           {/* Customer & Table Inputs */}
           <div className="space-y-3">
             <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-xl border border-transparent focus-within:border-blue-200 focus-within:bg-white transition-colors">
                <User size={18} className="text-gray-400" />
                <input type="text" placeholder="Customer Name" className="bg-transparent outline-none w-full text-sm font-medium text-gray-700" />
             </div>
             
             {/* Show Table Input ONLY if Dine In */}
             {orderType === 'dine-in' && (
               <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-xl border border-transparent focus-within:border-blue-200 focus-within:bg-white transition-colors animate-in slide-in-from-top-1">
                  <MapPin size={18} className="text-gray-400" />
                  <input 
                    type="text" 
                    value={tableNo} 
                    onChange={(e) => setTableNo(e.target.value)}
                    placeholder="Table No." 
                    className="bg-transparent outline-none w-full text-sm font-medium text-gray-700" 
                  />
               </div>
             )}
           </div>
        </div>

        {/* 2. CART ITEMS */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
           <h3 className="font-bold text-gray-800 text-sm">Current Order</h3>
           {cart.map((item) => (
             <div key={item.id} className="flex gap-4 items-center">
                <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center text-2xl">{item.image}</div>
                <div className="flex-1">
                   <h4 className="font-bold text-gray-800 text-sm">{item.name}</h4>
                   <p className="text-blue-600 font-bold text-xs">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1">
                   <button className="w-6 h-6 flex items-center justify-center bg-white rounded text-gray-600 shadow-sm hover:text-blue-600"><Minus size={12}/></button>
                   <span className="text-sm font-bold w-4 text-center">{item.qty}</span>
                   <button className="w-6 h-6 flex items-center justify-center bg-white rounded text-gray-600 shadow-sm hover:text-blue-600"><Plus size={12}/></button>
                </div>
             </div>
           ))}
        </div>

        {/* 3. COUPON & PAYMENT */}
        <div className="p-6 bg-gray-50 border-t border-gray-100 space-y-4">
           {/* Coupon Input */}
           <div className="flex gap-2">
              <div className="flex-1 flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-gray-200">
                 <Tag size={16} className="text-gray-400" />
                 <input type="text" placeholder="Coupon Code" className="w-full text-sm outline-none" />
              </div>
              <button className="bg-blue-600 text-white text-xs font-bold px-4 rounded-xl hover:bg-blue-700">Apply</button>
           </div>

           {/* Payment Method */}
           <div className="grid grid-cols-3 gap-2">
              <PaymentOption icon={<Banknote size={20}/>} label="Cash" active={paymentMethod === 'cash'} onClick={() => setPaymentMethod('cash')} />
              <PaymentOption icon={<CreditCard size={20}/>} label="Card" active={paymentMethod === 'card'} onClick={() => setPaymentMethod('card')} />
              <PaymentOption icon={<Smartphone size={20}/>} label="QR" active={paymentMethod === 'qr'} onClick={() => setPaymentMethod('qr')} />
           </div>

           {/* Totals */}
           <div className="space-y-2 pt-2 text-sm">
              <div className="flex justify-between text-gray-500"><span>Subtotal</span> <span>${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between text-gray-500"><span>Tax (10%)</span> <span>${tax.toFixed(2)}</span></div>
              <div className="flex justify-between text-xl font-bold text-gray-800 pt-2 border-t border-gray-200 mt-2">
                 <span>Total</span> 
                 <span>${total.toFixed(2)}</span>
              </div>
           </div>

           <button className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-200 hover:bg-blue-700 transition active:scale-95">
             Place Order
           </button>
        </div>

      </div>
    </div>
  );
};

// Helper for Payment Button
const PaymentOption = ({ icon, label, active, onClick }: any) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center gap-1 py-3 rounded-xl border transition-all
      ${active 
        ? 'bg-blue-50 border-blue-200 text-blue-600' 
        : 'bg-white border-gray-200 text-gray-400 hover:bg-gray-50'}
    `}
  >
    {icon}
    <span className="text-[10px] font-bold">{label}</span>
  </button>
);

export default PlaceOrderView;