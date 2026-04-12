"use client";
import React, { useState } from 'react';
import { 
  Search, Grid, List, User, MapPin, Tag, 
  CreditCard, Banknote, Smartphone, Plus, Minus, Trash2,
  Check, Loader2, ImageIcon
} from 'lucide-react';

const PlaceOrderView = () => {
  // --- STATE ---
  const [orderType, setOrderType] = useState<"dine-in" | "take-away">(
    "take-away",
  );
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
    <div className="flex h-full w-full bg-[#F8F9FB] overflow-hidden theme-pos font-sans">
      
      {/* --- LEFT SIDE: MENU SELECTION --- */}
      <div className="flex-1 flex flex-col p-12 pr-6 overflow-hidden">
        
        {/* Search Header */}
        <div className="flex justify-between items-center mb-12">
          <div className="relative w-full max-w-2xl">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search menu items or categories..." 
              className="w-full pl-16 pr-6 py-5 rounded-full bg-white border border-gray-100 shadow-premium focus:ring-8 focus:ring-primary/5 focus:border-primary transition-all outline-none font-black text-sm"
            />
          </div>
          <div className="flex gap-4">
             <button className="w-14 h-14 bg-white rounded-full shadow-premium text-primary hover:bg-primary hover:text-white transition-all flex items-center justify-center border border-gray-50"><Grid size={22}/></button>
             <button className="w-14 h-14 bg-white rounded-full shadow-premium text-gray-400 hover:bg-gray-50 transition-all flex items-center justify-center border border-gray-50"><List size={22}/></button>
          </div>
        </div>

        {/* Categories (rendered here if unified, but usually in MenuNavbar) */}
         {/* Assuming MenuNavbar handles its own structure, but ensuring the gap is good */}

        {/* Menu Carousel (Horizontal Scroll) */}
        <div className="flex-1 flex flex-col min-h-0">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6 px-1">Available Menu</h3>
          <div className="flex gap-8 overflow-x-auto custom-scrollbar pb-12 pt-2 px-1">
             {menuItems.map((item) => (
               <div key={item.id} className="min-w-[320px] bg-white p-6 rounded-[3rem] border border-gray-100 shadow-premium hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all cursor-pointer group flex flex-col h-fit">
                  <div className="h-56 bg-gray-50 rounded-[2.5rem] flex items-center justify-center text-6xl mb-6 group-hover:scale-105 transition-transform overflow-hidden relative border border-gray-50">
                     <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                     {item.image}
                  </div>
                  <div className="px-2 flex flex-col flex-1">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="font-black text-gray-900 group-hover:text-primary transition-colors text-xl leading-tight">{item.name}</h4>
                    </div>
                    <div className="flex items-center gap-2 mb-6">
                      <span className={`badge-soft ${
                        item.category === 'Bakery' ? 'text-teal-600 bg-teal-50' : 
                        item.category === 'Breakfast' ? 'text-orange-600 bg-orange-50' : 
                        'text-blue-600 bg-blue-50'
                      }`}>
                        {item.category}
                      </span>
                    </div>
                    <div className="mt-auto flex justify-between items-center pt-4 border-t border-gray-50">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Price</span>
                        <span className="font-black text-2xl text-gray-900">${item.price.toFixed(2)}</span>
                      </div>
                      <button className="w-16 h-16 bg-primary text-white rounded-full hover:bg-primary/90 transition-all flex items-center justify-center shadow-xl shadow-primary/20 hover:scale-110 active:scale-95">
                        <Plus size={24} strokeWidth={3} />
                      </button>
                    </div>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </div>

      {/* --- RIGHT SIDE: ORDER FORM & CHECKOUT --- */}
      <div className="w-[440px] bg-white border-l border-gray-100 flex flex-col h-full shadow-2xl z-20">
        
        {/* 1. CUSTOMER & TYPE HEADER */}
        <div className="p-8 border-b border-gray-50 space-y-6">
           <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">Active Order</h2>
              <div className="px-4 py-1.5 bg-green-50 text-green-600 rounded-full text-[10px] items-center flex gap-2 font-black uppercase tracking-widest">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                Live Session
              </div>
           </div>
           
           {/* Dine In / Take Away Toggle */}
           <div className="flex bg-gray-50 p-1.5 rounded-full border border-gray-100">
              <button 
                onClick={() => setOrderType('dine-in')}
                className={`flex-1 py-3 text-xs font-black uppercase tracking-widest rounded-full transition-all ${orderType === 'dine-in' ? 'bg-white text-primary shadow-md' : 'text-gray-400'}`}
              >
                Dine In
              </button>
              <button 
                onClick={() => setOrderType('take-away')}
                className={`flex-1 py-3 text-xs font-black uppercase tracking-widest rounded-full transition-all ${orderType === 'take-away' ? 'bg-white text-primary shadow-md' : 'text-gray-400'}`}
              >
                Take Away
              </button>
           </div>

           {/* Customer & Table Inputs */}
           <div className="grid grid-cols-1 gap-4">
             <div className="flex items-center gap-4 bg-gray-50 px-6 py-4 rounded-full border border-gray-100 focus-within:border-primary/20 focus-within:bg-white focus-within:ring-4 focus-within:ring-primary/5 transition-all">
                <User size={18} className="text-gray-400" />
                <input type="text" placeholder="Customer Name" className="bg-transparent outline-none w-full text-sm font-bold text-gray-900" />
             </div>
             
             {orderType === 'dine-in' && (
               <div className="flex items-center gap-4 bg-gray-50 px-6 py-4 rounded-full border border-gray-100 focus-within:border-primary/20 focus-within:bg-white focus-within:ring-4 focus-within:ring-primary/5 transition-all animate-in slide-in-from-top-2 duration-300">
                  <MapPin size={18} className="text-gray-400" />
                  <input 
                    type="text" 
                    value={tableNo} 
                    onChange={(e) => setTableNo(e.target.value)}
                    placeholder="Table No." 
                    className="bg-transparent outline-none w-full text-sm font-bold text-gray-900" 
                  />
               </div>
             )}
           </div>
        </div>

        {/* 2. CART ITEMS */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
           <div className="flex items-center justify-between mb-2">
              <h3 className="font-black text-gray-400 text-[10px] uppercase tracking-widest px-1">Selected Items</h3>
              <button className="text-[10px] font-black uppercase tracking-widest text-red-500 hover:text-red-600 transition-colors">Clear All</button>
           </div>
           {cart.map((item) => (
             <div key={item.id} className="flex gap-5 items-center group">
                <div className="w-16 h-16 bg-gray-50 rounded-[1.2rem] flex items-center justify-center text-3xl border border-gray-100 group-hover:scale-105 transition-transform">{item.image}</div>
                <div className="flex-1">
                   <h4 className="font-extrabold text-gray-900 text-sm mb-1">{item.name}</h4>
                   <p className="text-primary font-black text-xs tracking-tight">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-3 bg-gray-50 rounded-full p-1.5 border border-gray-100">
                   <button className="w-8 h-8 flex items-center justify-center bg-white rounded-full text-gray-500 shadow-sm hover:text-primary transition-all active:scale-90"><Minus size={14}/></button>
                   <span className="text-sm font-black w-4 text-center text-gray-900">{item.qty}</span>
                   <button className="w-8 h-8 flex items-center justify-center bg-white rounded-full text-gray-500 shadow-sm hover:text-primary transition-all active:scale-90"><Plus size={14}/></button>
                </div>
             </div>
           ))}
        </div>

        {/* 3. COUPON & PAYMENT */}
        <div className="p-8 bg-[#F8F9FB] border-t border-gray-100 space-y-6">
           {/* Totals */}
           <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm space-y-3">
              <div className="flex justify-between text-gray-400 text-xs font-bold px-1"><span>Subtotal</span> <span className="text-gray-900">${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between text-gray-400 text-xs font-bold px-1"><span>Tax (10%)</span> <span className="text-gray-900">${tax.toFixed(2)}</span></div>
              <div className="flex justify-between text-xl font-black text-gray-900 pt-4 border-t border-gray-50 mt-2 px-1">
                 <span>Total Pay</span> 
                 <span className="text-primary">${total.toFixed(2)}</span>
              </div>
           </div>

           {/* Payment Method */}
           <div className="grid grid-cols-3 gap-3">
              <PaymentOption icon={<Banknote size={20}/>} label="Cash" active={paymentMethod === 'cash'} onClick={() => setPaymentMethod('cash')} />
              <PaymentOption icon={<CreditCard size={20}/>} label="Card" active={paymentMethod === 'card'} onClick={() => setPaymentMethod('card')} />
              <PaymentOption icon={<Smartphone size={20}/>} label="QR" active={paymentMethod === 'qr'} onClick={() => setPaymentMethod('qr')} />
           </div>

           <button className="w-full bg-primary text-white font-black py-5 rounded-full shadow-2xl shadow-primary/30 hover:bg-primary/90 transition-all active:scale-[0.98] flex items-center justify-center gap-3 uppercase tracking-widest text-xs">
             <CreditCard size={18} />
             Confirm Order
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
    className={`flex flex-col items-center justify-center gap-2 py-4 rounded-2xl border transition-all
      ${active 
        ? 'bg-white border-primary/20 text-primary shadow-lg shadow-primary/5 scale-105 ring-4 ring-primary/5' 
        : 'bg-white border-gray-100 text-gray-400 hover:bg-gray-50'}
    `}
  >
    <div className={`p-2 rounded-full ${active ? 'bg-primary/10' : 'bg-gray-50'}`}>
      {icon}
    </div>
    <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
  </button>
);

export default PlaceOrderView;