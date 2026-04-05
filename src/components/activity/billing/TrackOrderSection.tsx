// "use client";
// import React, { useRef, useState } from 'react';
// import { Search, ChevronLeft, ChevronRight, Layout, LayoutList } from 'lucide-react';

// // Mock Data for the Carousel
// const TRACK_ORDERS = [
//   { id: 1, name: "Mike", table: "04", status: "On Kitchen Hand", items: 4 },
//   { id: 2, name: "Billie", table: "04", status: "All Done", items: 6, isDone: true },
//   { id: 3, name: "Richard", table: "05", status: "On Kitchen Hand", items: 3 },
//   { id: 4, name: "Sharon", table: "06", status: "On Kitchen Hand", items: 5 },
//   { id: 5, name: "Alex", table: "07", status: "On Kitchen Hand", items: 2 },
//   { id: 6, name: "Sarah", table: "08", status: "All Done", items: 8, isDone: true },
// ];

// const TrackOrderSection = () => {
//   const scrollContainerRef = useRef<HTMLDivElement>(null);
//   const [isVertical, setIsVertical] = useState(false);

//   // Scroll Handler
//   const scroll = (direction: 'left' | 'right') => {
//     if (scrollContainerRef.current) {
//       const { current } = scrollContainerRef;
//       const scrollAmount = isVertical ? 300 : 300; // Adjust scroll distance
      
//       if (direction === 'left') {
//         isVertical 
//           ? current.scrollBy({ top: -scrollAmount, behavior: 'smooth' })
//           : current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
//       } else {
//         isVertical 
//           ? current.scrollBy({ top: scrollAmount, behavior: 'smooth' })
//           : current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
//       }
//     }
//   };

//   return (
//     <section className="flex flex-col h-full min-h-0">
      
//       {/* --- HEADER --- */}
//       <div className="flex items-center justify-between mb-6 flex-shrink-0">
//         <h2 className="text-xl font-bold text-gray-800">Track Order</h2>
        
//         <div className="flex gap-2">
//           {/* Layout Toggle Button */}
//           <button 
//             onClick={() => setIsVertical(!isVertical)}
//             className="w-10 h-10 flex items-center justify-center bg-white rounded-full border border-gray-100 text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition"
//             title={isVertical ? "Switch to Horizontal" : "Switch to Vertical"}
//           >
//             {isVertical ? <Layout size={18} /> : <LayoutList size={18} />}
//           </button>

//           {/* Search Button */}
//           <button className="w-10 h-10 flex items-center justify-center bg-white rounded-full border border-gray-100 text-gray-400 hover:text-blue-600 transition">
//             <Search size={18} />
//           </button>
          
//           {/* Scroll Left / Up */}
//           <button 
//             onClick={() => scroll('left')}
//             className="w-10 h-10 flex items-center justify-center bg-white rounded-full border border-gray-100 text-gray-400 hover:bg-gray-50 transition active:scale-95"
//           >
//             <ChevronLeft size={18} className={isVertical ? "rotate-90" : ""} />
//           </button>
          
//           {/* Scroll Right / Down */}
//           <button 
//             onClick={() => scroll('right')}
//             className="w-10 h-10 flex items-center justify-center bg-blue-600 rounded-full text-white shadow-lg shadow-blue-200 hover:bg-blue-700 transition active:scale-95"
//           >
//             <ChevronRight size={18} className={isVertical ? "rotate-90" : ""} />
//           </button>
//         </div>
//       </div>

//       {/* --- CAROUSEL CONTAINER --- */}
//       {/* 1. We use 'flex-1' to allow it to fill available space 
//           2. We use 'overflow-hidden' on the parent to prevent page scroll 
//       */}
//       <div className={`relative flex-1 min-h-0 ${isVertical ? 'overflow-hidden' : ''}`}>
        
//         <div 
//           ref={scrollContainerRef}
//           className={`
//             flex gap-4 p-1 custom-scrollbar scroll-smooth
//             ${isVertical 
//               ? 'flex-col h-full overflow-y-auto overflow-x-hidden pb-20' // Vertical Styles
//               : 'flex-row overflow-x-auto overflow-y-hidden w-full pb-4'  // Horizontal Styles
//             }
//           `}
//         >
//           {TRACK_ORDERS.map((order) => (
//             <div 
//               key={order.id} 
//               className={`flex-shrink-0 ${isVertical ? 'w-full' : 'w-72 md:w-80'}`}
//             >
//               <TrackCard {...order} />
//             </div>
//           ))}
//         </div>
        
//         {/* Optional Gradient Overlay for Horizontal view to show there is more content */}
//         {!isVertical && (
//           <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#F8F9FB] to-transparent pointer-events-none" />
//         )}
//       </div>
//     </section>
//   );
// };

// // --- Helper: TrackCard ---
// const TrackCard = ({ name, table, status, items, isDone }: any) => (
//   <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-3 hover:shadow-md transition-shadow cursor-pointer h-full">
//     <div className="flex justify-between items-start">
//       <div>
//         <h4 className="font-bold text-gray-800 text-lg">{name}</h4>
//         <p className="text-xs text-gray-400 mt-0.5">Table: {table} • Dine In</p>
//         <p className="text-xs text-gray-400">10:00 AM</p>
//       </div>
//       <span className={`text-[10px] font-bold px-2 py-1 rounded-md whitespace-nowrap ${
//         isDone ? 'bg-emerald-50 text-emerald-500' : 'bg-orange-50 text-orange-500'
//       }`}>
//         {status}
//       </span>
//     </div>

//     <div className="border-t border-dashed border-gray-100 my-1"></div>

//     <div className="space-y-1">
//       <p className="text-xs text-gray-500">1x Beef Crowich</p>
//       <p className="text-xs text-gray-500">1x Grains Pan Bread</p>
//       <p className="text-xs text-blue-500 font-semibold cursor-pointer hover:underline">See More</p>
//     </div>

//     <div className="mt-auto pt-3 flex justify-between items-center text-xs font-medium text-gray-400">
//       <span>Total Order:</span>
//       <span>{items} Items</span>
//     </div>
//   </div>
// );

// export default TrackOrderSection;


"use client";
import React, { useRef, useState } from 'react';
import { Search, ChevronLeft, ChevronRight, Layout, LayoutList, X, Clock, MapPin, User } from 'lucide-react';

// --- MOCK DATA ---
const TRACK_ORDERS = [
  { 
    id: 1, name: "Mike", table: "04", status: "On Kitchen Hand", items: 4, 
    orderList: ["1x Beef Crowich", "1x Grains Pan Bread", "1x Cheezy Sourdough", "1x Iced Latte"] 
  },
  { 
    id: 2, name: "Billie", table: "04", status: "All Done", items: 6, isDone: true,
    orderList: ["2x Chicken Parm", "1x Caesar Salad", "1x Garlic Bread", "2x Coke Zero"] 
  },
  { 
    id: 3, name: "Richard", table: "05", status: "On Kitchen Hand", items: 3,
    orderList: ["1x Mushroom Soup", "1x Grilled Salmon", "1x Lemon Tea"] 
  },
  { 
    id: 4, name: "Sharon", table: "06", status: "On Kitchen Hand", items: 5,
    orderList: ["1x Tuna Sandwich", "1x Bagel Cream Cheese", "1x Black Coffee", "1x Blueberry Muffin", "1x Water"] 
  },
  { 
    id: 5, name: "Alex", table: "07", status: "On Kitchen Hand", items: 2,
    orderList: ["1x Steak (Medium)", "1x Red Wine"] 
  },
];

const TrackOrderSection = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isVertical, setIsVertical] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null); // For Modal

  // Scroll Logic
  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = 320; 
      const scrollOptions: ScrollToOptions = { behavior: 'smooth' };
      
      if (isVertical) {
         scrollOptions.top = direction === 'left' ? -scrollAmount : scrollAmount;
      } else {
         scrollOptions.left = direction === 'left' ? -scrollAmount : scrollAmount;
      }
      current.scrollBy(scrollOptions);
    }
  };

  return (
    <section className="flex flex-col h-full min-h-0 relative">
      
      {/* --- HEADER --- */}
      <div className="flex items-center justify-between mb-6 flex-shrink-0">
        <h2 className="text-xl font-bold text-gray-800">Track Order</h2>
        
        <div className="flex gap-2">
          {/* Layout Toggle */}
          <button 
            onClick={() => setIsVertical(!isVertical)}
            className="w-10 h-10 flex items-center justify-center bg-white rounded-full border border-gray-100 text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition"
          >
            {isVertical ? <Layout size={18} /> : <LayoutList size={18} />}
          </button>

          {/* Navigation Controls */}
          <button onClick={() => scroll('left')} className="w-10 h-10 flex items-center justify-center bg-white rounded-full border border-gray-100 text-gray-400 hover:bg-gray-50 transition active:scale-95">
            <ChevronLeft size={18} className={isVertical ? "rotate-90" : ""} />
          </button>
          <button onClick={() => scroll('right')} className="w-10 h-10 flex items-center justify-center bg-blue-600 rounded-full text-white shadow-lg shadow-blue-200 hover:bg-blue-700 transition active:scale-95">
            <ChevronRight size={18} className={isVertical ? "rotate-90" : ""} />
          </button>
        </div>
      </div>

      {/* --- CAROUSEL CONTAINER --- */}
      <div className={`relative flex-1 min-h-0 ${isVertical ? 'overflow-hidden' : ''}`}>
        <div 
          ref={scrollContainerRef}
          className={`
            flex gap-4 p-1 custom-scrollbar scroll-smooth
            ${isVertical 
              ? 'flex-col h-full overflow-y-auto overflow-x-hidden pb-20 pr-2' 
              : 'flex-row overflow-x-auto overflow-y-hidden w-full pb-4'
            }
          `}
        >
          {TRACK_ORDERS.map((order) => (
            <div 
              key={order.id} 
              className={`flex-shrink-0 transition-all duration-300 ${isVertical ? 'w-full' : 'w-72 md:w-80'}`}
            >
              <TrackCard 
                data={order} 
                isVertical={isVertical} 
                onOpenModal={() => setSelectedOrder(order)} 
              />
            </div>
          ))}
        </div>
      </div>

      {/* --- MODAL (Pop-up) --- */}
      {selectedOrder && (
        <OrderDetailModal 
          order={selectedOrder} 
          onClose={() => setSelectedOrder(null)} 
        />
      )}

    </section>
  );
};

// --- COMPONENT: Track Card ---
const TrackCard = ({ data, isVertical, onOpenModal }: any) => {
  const { name, table, status, items, isDone, orderList } = data;

  return (
    <div className={`
      bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-4 
      hover:shadow-md transition-shadow cursor-pointer h-full relative group
      ${isVertical ? 'border-l-4 border-l-blue-500' : ''} 
    `}>
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-bold text-gray-800 text-lg flex items-center gap-2">
            {name}
            {isVertical && <span className="text-xs font-normal text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">#{data.id}</span>}
          </h4>
          <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
             <span>Table: {table}</span> • <span>Dine In</span>
          </div>
        </div>
        <span className={`text-[10px] font-bold px-2.5 py-1.5 rounded-lg whitespace-nowrap ${
          isDone ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-600'
        }`}>
          {status}
        </span>
      </div>

      <div className="border-t border-dashed border-gray-100"></div>

      {/* Body: Conditional Rendering */}
      <div className="space-y-2">
        {isVertical ? (
          // VERTICAL MODE: Show EVERYTHING clearly
          <ul className="space-y-2 mt-1">
            {orderList.map((item: string, i: number) => (
              <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-1.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        ) : (
          // HORIZONTAL MODE: Show Summary + See More
          <>
            {orderList.slice(0, 3).map((item: string, i: number) => (
              <p key={i} className="text-xs text-gray-500 truncate">{item}</p>
            ))}
            {orderList.length > 3 && (
              <button 
                onClick={(e) => { e.stopPropagation(); onOpenModal(); }}
                className="text-xs text-blue-600 font-semibold hover:underline mt-1 flex items-center gap-1"
              >
                See More (+{orderList.length - 3})
              </button>
            )}
          </>
        )}
      </div>

      {/* Footer */}
      <div className="mt-auto pt-2 flex justify-between items-center text-xs font-medium text-gray-400">
        <span className="flex items-center gap-1"><Clock size={12}/> 10:00 AM</span>
        <span className="bg-gray-50 px-2 py-1 rounded text-gray-600 font-bold">{items} Items</span>
      </div>
    </div>
  );
};

// --- COMPONENT: Modal ---
const OrderDetailModal = ({ order, onClose }: any) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="bg-blue-600 p-6 text-white relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full transition"
          >
            <X size={18} className="text-white" />
          </button>
          
          <h2 className="text-2xl font-bold mb-1">{order.name}</h2>
          <div className="flex gap-4 text-blue-100 text-sm">
            <span className="flex items-center gap-1"><MapPin size={14}/> Table {order.table}</span>
            <span className="flex items-center gap-1"><User size={14}/> Dine In</span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800">Order Summary</h3>
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${
              order.isDone ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'
            }`}>
              {order.status}
            </span>
          </div>

          <ul className="space-y-3">
            {order.orderList.map((item: string, i: number) => (
              <li key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl border border-gray-100">
                <span className="text-sm font-medium text-gray-700">{item}</span>
                <span className="text-xs font-bold text-gray-400">x1</span>
              </li>
            ))}
          </ul>
          
          <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
            <span className="text-gray-500 font-medium">Total Items</span>
            <span className="text-xl font-bold text-gray-800">{order.items}</span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex gap-3">
           <button onClick={onClose} className="flex-1 py-3 text-sm font-bold text-gray-500 bg-white border border-gray-200 rounded-xl hover:bg-gray-100 transition">
             Close
           </button>
           <button className="flex-1 py-3 text-sm font-bold text-white bg-blue-600 rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 transition">
             Mark as Done
           </button>
        </div>
      </div>
    </div>
  );
};

export default TrackOrderSection;