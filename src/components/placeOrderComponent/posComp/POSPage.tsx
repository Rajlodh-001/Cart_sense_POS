// // import React, { useState } from 'react';
// // import { Search, Calendar, Clock } from 'lucide-react';
// // import ProductCard from './components/ProductCard';
// // import CartSidebar from './components/CartSidebar';
// // import { Category } from './types';

// // // Mock Data
// // const CATEGORIES: Category[] = [
// //   { id: 'all', name: 'All Menu', icon: '🍽️', count: 110 },
// //   { id: 'bread', name: 'Breads', icon: '🍞', count: 20 },
// //   { id: 'cake', name: 'Cakes', icon: '🍪', count: 20 },
// // ];

// // const PRODUCTS = [
// //   { id: 1, name: 'Beef Crowich', price: 5.50, category: 'bread', image: 'https://images.unsplash.com/photo-1604152135912-04a022e23696?w=400', tag: 'Hot' },
// //   { id: 2, name: 'Cheese Cake', price: 4.00, category: 'cake', image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400', tag: 'Sweet' },
// //   // ... add more products
// // ];

// // const POSPage: React.FC = () => {
// //   const [activeCategory, setActiveCategory] = useState('all');
// //   const [searchQuery, setSearchQuery] = useState('');

// //   const filteredProducts = PRODUCTS.filter(p => {
// //     const matchCat = activeCategory === 'all' || p.category === activeCategory;
// //     const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
// //     return matchCat && matchSearch;
// //   });

// //   return (
// //     <div className="flex h-screen bg-gray-50 font-sans text-gray-800 overflow-hidden">
      
// //       {/* LEFT: Main Content */}
// //       <div className="flex-1 flex flex-col p-6 overflow-y-auto">
        
// //         {/* Header Bar */}
// //         <div className="flex justify-between items-center mb-8">
// //           <div className="flex items-center space-x-4">
// //             <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-xl shadow-sm">
// //               <Calendar size={18} className="text-blue-500" />
// //               <span className="font-medium text-sm">Wed, 29 May 2024</span>
// //             </div>
// //             <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-xl shadow-sm">
// //               <Clock size={18} className="text-blue-500" />
// //               <span className="font-medium text-sm">08:00 AM</span>
// //             </div>
// //           </div>
// //           {/* Search */}
// //           <div className="relative w-96">
// //             <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
// //             <input 
// //               type="text" 
// //               placeholder="Search menu..." 
// //               className="w-full pl-12 pr-4 py-3 rounded-xl border-none shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
// //               value={searchQuery}
// //               onChange={(e) => setSearchQuery(e.target.value)}
// //             />
// //           </div>
// //         </div>

// //         {/* Category Filter */}
// //         <div className="flex space-x-4 mb-8 overflow-x-auto pb-2">
// //           {CATEGORIES.map(cat => (
// //             <button
// //               key={cat.id}
// //               onClick={() => setActiveCategory(cat.id)}
// //               className={`flex flex-col items-center justify-center min-w-[100px] p-4 rounded-2xl transition-all border ${
// //                 activeCategory === cat.id 
// //                   ? 'bg-blue-600 text-white shadow-lg border-blue-600' 
// //                   : 'bg-white text-gray-500 hover:bg-gray-100 border-transparent'
// //               }`}
// //             >
// //               <span className="text-2xl mb-2">{cat.icon}</span>
// //               <span className="font-medium text-sm">{cat.name}</span>
// //             </button>
// //           ))}
// //         </div>

// //         {/* Product Grid */}
// //         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-20">
// //           {filteredProducts.map(product => (
// //             <ProductCard key={product.id} product={product} />
// //           ))}
// //         </div>
// //       </div>

// //       {/* RIGHT: Cart Sidebar */}
// //       <CartSidebar />
// //     </div>
// //   );
// // };

// // export default POSPage;


// import React, { useState } from 'react';
// import { Search, Calendar, Clock } from 'lucide-react';
// import ProductCard from './ProductCard';
// import CartSidebar from './CartSidebar';
// import { categories, products } from '../../../../lib/TempData';

// // Types relative to your app
// interface Category {
//   id: string;
//   name: string;
//   icon: string;
// }

// // const CATEGORIES: Category[] = [
// //   { id: 'all', name: 'All Menu', icon: '🍽️' },
// //   { id: 'bread', name: 'Breads', icon: '🍞' },
// //   { id: 'cake', name: 'Cakes', icon: '🍪' },
// // ];

// // Note: Keys match your CartItem interface (imgSrc, itemType)
// // const PRODUCTS = [
// //   { 
// //     id: 1, 
// //     name: 'Beef Crowich', 
// //     price: 5.50, 
// //     itemType: 'bread', 
// //     imgSrc: 'https://images.unsplash.com/photo-1604152135912-04a022e23696?w=400', 
// //   },
// //   { 
// //     id: 2, 
// //     name: 'Cheese Cake', 
// //     price: 4.00, 
// //     itemType: 'cake', 
// //     imgSrc: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400', 
// //   },
// //   { 
// //     id: 3, 
// //     name: 'Butter Croissant', 
// //     price: 3.50, 
// //     itemType: 'bread', 
// //     imgSrc: 'https://images.unsplash.com/photo-1555507036-ab1f40388085?w=400', 
// //   },
// // ];

// const CATEGORIES=categories

// const  PRODUCTS = products
// const POSPage: React.FC = () => {
//   const [activeCategory, setActiveCategory] = useState('all');
//   const [searchQuery, setSearchQuery] = useState('');

//   // Filter Logic
//   const filteredProducts = PRODUCTS.filter(p => {
//     const matchCat = activeCategory === 'all' || p.itemType === activeCategory;
//     const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
//     return matchCat && matchSearch;
//   });

//   return (
//     <div className="flex h-screen bg-gray-50 font-sans text-gray-800 overflow-hidden">
      
//       {/* LEFT SIDE: Menu Grid */}
//       <div className="flex-1 flex flex-col p-6 overflow-y-auto">
        
//         {/* Header */}
//         <div className="flex justify-between items-center mb-8">
//           <div className="flex items-center space-x-4">
//              <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-xl shadow-sm">
//                 <Calendar size={18} className="text-blue-500" />
//                 <span className="font-medium text-sm">Wed, 29 May 2024</span>
//              </div>
//              <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-xl shadow-sm">
//                 <Clock size={18} className="text-blue-500" />
//                 <span className="font-medium text-sm">08:00 AM</span>
//              </div>
//           </div>
//           {/* Search */}
//           <div className="relative w-96">
//             <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//             <input 
//               type="text" 
//               placeholder="Search menu..." 
//               className="w-full pl-12 pr-4 py-3 rounded-xl border-none shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>
//         </div>

//         {/* Categories */}
//         <div className="flex space-x-4 mb-8 overflow-x-auto pb-2">
//           {CATEGORIES.map(cat => (
//             <button
//               key={cat.id}
//               onClick={() => setActiveCategory(cat.id)}
//               className={`flex flex-col items-center justify-center min-w-[100px] p-4 rounded-2xl transition-all border ${
//                 activeCategory === cat.id 
//                   ? 'bg-blue-600 text-white shadow-lg border-blue-600' 
//                   : 'bg-white text-gray-500 hover:bg-gray-100 border-transparent'
//               }`}
//             >
//               <span className="text-2xl mb-2">{cat.icon}</span>
//               <span className="font-medium text-sm">{cat.name}</span>
//             </button>
//           ))}
//         </div>

//         {/* Grid */}
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-20">
//           {filteredProducts.map(product => (
//             // We pass the product directly. Note: product needs 'quantity' to match CartItem, 
//             // but we'll handle that in the card dispatch.
//             <ProductCard key={product.id} product={product} />
//           ))}
//         </div>
//       </div>

//       {/* RIGHT SIDE: Cart */}
//       <CartSidebar />
//     </div>
//   );
// };

// export default POSPage;




import React, { JSX, useState } from 'react';
import { Search, Calendar, Clock, Menu, Power } from 'lucide-react';
import ProductCard from './ProductCard';
import CartSidebar from './CartSidebar';

// --- MOCK DATA ---
interface Category {
  id: string;
  name: string;
  count: number;
  icon: JSX.Element;
}

const CATEGORIES: Category[] = [
  { id: 'all', name: 'All Menu', count: 110, icon: <span className="text-2xl">🍽️</span> },
  { id: 'bread', name: 'Breads', count: 20, icon: <span className="text-2xl">🍞</span> },
  { id: 'cake', name: 'Cakes', count: 20, icon: <span className="text-2xl">🍰</span> },
  { id: 'donut', name: 'Donuts', count: 20, icon: <span className="text-2xl">🍩</span> },
  { id: 'pastry', name: 'Pastries', count: 20, icon: <span className="text-2xl">🥐</span> },
  { id: 'sandwich', name: 'Sandwich', count: 20, icon: <span className="text-2xl">🥪</span> },
];

const PRODUCTS = [
  { id: 1, name: 'Beef Crowich', price: 5.50, itemType: 'sandwich', imgSrc: 'https://images.unsplash.com/photo-1604152135912-04a022e23696?w=400' },
  { id: 2, name: 'Buttermelt Croissant', price: 4.00, itemType: 'pastry', imgSrc: 'https://images.unsplash.com/photo-1555507036-ab1f40388085?w=400' },
  { id: 3, name: 'Cereal Cream Donut', price: 2.45, itemType: 'donut', imgSrc: 'https://images.unsplash.com/photo-1551024601-562943300ac1?w=400' },
  { id: 4, name: 'Cheesy Cheesecake', price: 3.75, itemType: 'cake', imgSrc: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400' },
  { id: 5, name: 'Cheezy Sourdough', price: 4.50, itemType: 'bread', imgSrc: 'https://images.unsplash.com/photo-1585478259539-e62233b4b50c?w=400' },
  { id: 6, name: 'Egg Tart', price: 3.25, itemType: 'pastry', imgSrc: 'https://images.unsplash.com/photo-1584332460450-424a8fc37812?w=400' },
  { id: 7, name: 'Grains Pan Bread', price: 4.50, itemType: 'bread', imgSrc: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400' },
  { id: 8, name: 'Spinchoco Roll', price: 4.00, itemType: 'pastry', imgSrc: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=400' },
];

const POSPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtering Logic
  const filteredProducts = PRODUCTS.filter(p => {
    const matchCat = activeCategory === 'all' || p.itemType === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="flex h-screen bg-[#F8F9FD] font-sans text-gray-800 overflow-hidden">
      
      {/* --- LEFT SIDE: MENU AREA (Responsive Flex) --- */}
      <div className="flex-1 flex flex-col h-full relative">
        
        {/* === FIXED HEADER SECTION === */}
        {/* This div stays at the top and does not scroll */}
        <div className="px-8 pt-8 pb-4 bg-[#F8F9FD] z-10 flex-shrink-0">
          
          {/* 1. Top Bar (Hamburger, Date, Time, Status) */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-6">
              {/* Hamburger */}
              <button className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm hover:shadow-md transition-all text-blue-600">
                <Menu size={24} />
              </button>
              
              {/* Date Widget */}
              <div className="flex items-center space-x-3 bg-white px-5 py-3 rounded-2xl shadow-sm">
                <Calendar size={20} className="text-blue-500" />
                <span className="font-bold text-gray-700">Wed, 29 May 2024</span>
              </div>
              
              {/* Time Widget */}
              <div className="flex items-center space-x-3 bg-white px-5 py-3 rounded-2xl shadow-sm">
                <Clock size={20} className="text-blue-500" />
                <span className="font-bold text-gray-700">07:59 AM</span>
              </div>
            </div>

            {/* Right Side Status Button */}
            <div className="flex items-center space-x-4">
               <button className="flex items-center space-x-2 bg-red-50 text-red-500 px-5 py-3 rounded-2xl font-bold hover:bg-red-100 transition-colors">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                  <span>Close Order</span>
               </button>
               <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-red-500 hover:bg-gray-50">
                  <Power size={20} />
               </button>
            </div>
          </div>

          {/* 2. Categories List (Horizontal Scroll) */}
          <div className="flex space-x-4 mb-8 overflow-x-auto pb-2 scrollbar-hide">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex flex-col items-center justify-center min-w-[110px] h-[130px] p-4 rounded-3xl transition-all duration-300 border-2 ${
                  activeCategory === cat.id 
                    ? 'bg-blue-600 text-white shadow-xl shadow-blue-200 border-blue-600 scale-105' 
                    : 'bg-white text-gray-500 hover:bg-gray-50 border-transparent hover:border-blue-100'
                }`}
              >
                <div className={`mb-3 transition-transform ${activeCategory === cat.id ? 'scale-110' : ''}`}>
                  {cat.icon}
                </div>
                <span className="font-bold text-sm mb-1">{cat.name}</span>
                <span className={`text-xs ${activeCategory === cat.id ? 'text-blue-200' : 'text-gray-400'}`}>
                  {cat.count} Items
                </span>
              </button>
            ))}
          </div>

          {/* 3. Search Bar */}
          <div className="relative w-full">
             <div className="absolute left-6 top-1/2 transform -translate-y-1/2 pointer-events-none">
               <Search className="text-gray-400" size={22} />
             </div>
             <input 
              type="text" 
              placeholder="Search something sweet on your mind..." 
              className="w-full pl-16 pr-6 py-5 rounded-2xl bg-white border-none shadow-sm text-gray-700 placeholder-gray-400 focus:ring-4 focus:ring-blue-50 transition-all outline-none font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {/* Search Icon on the right (Optional filter icon) */}
            <div className="absolute right-6 top-1/2 transform -translate-y-1/2">
               <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400">
                  <span className="text-xl">🔍</span>
               </button>
            </div>
          </div>
        </div>

        {/* === SCROLLABLE CONTENT SECTION === */}
        {/* Only this part scrolls */}
        <div className="flex-1 overflow-y-auto px-8 pb-8 custom-scrollbar">
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 pt-2">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

      </div>

      {/* --- RIGHT SIDE: CART SIDEBAR (Fixed Width) --- */}
      <CartSidebar />
    </div>
  );
};

export default POSPage;