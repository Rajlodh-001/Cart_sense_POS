// // import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { RootState } from '../../../store/store';
// import { 
//   incrementQuantity, 
//   decrementQuantity, 
//   selectTotalPrice, 
//   cartHasItems 
// } from "@/app/(dashboard)/pos/posSlice";// YOUR selectors & actions
// import { ShoppingBag, Minus, Plus } from 'lucide-react';

// const CartSidebar: React.FC = () => {
//   const dispatch = useDispatch();
  
//   // Use your selectors
//   const cartItems = useSelector((state: RootState) => state.cart.items);
//   const totalPrice:number = useSelector(selectTotalPrice);
//   const hasItems = useSelector(cartHasItems);

//   // Derived calculations
//   const tax = totalPrice * 0.10;
//   const discount = hasItems ? 1.00 : 0; // Only apply discount if items exist
//   const finalTotal = totalPrice + tax - discount;

//   return (
//     <div className="w-[400px] bg-white h-full shadow-2xl flex flex-col border-l border-gray-100">
      
//       {/* Header */}
//       <div className="p-6 border-b border-gray-100">
//         <h2 className="text-2xl font-bold text-gray-800">Current Order</h2>
//         <div className="flex space-x-3 mt-4">
//           <select className="flex-1 bg-gray-50 rounded-xl px-4 py-2 text-sm font-medium outline-none">
//              <option>Dine In</option>
//              <option>Take Away</option>
//           </select>
//           <select className="flex-1 bg-gray-50 rounded-xl px-4 py-2 text-sm font-medium outline-none">
//              <option>Table 05</option>
//           </select>
//         </div>
//       </div>

//       {/* Cart Items */}
//       <div className="flex-1 overflow-y-auto p-6 space-y-6">
//         {!hasItems ? (
//           <div className="text-center text-gray-400 mt-20">
//             <ShoppingBag size={48} className="mx-auto mb-4 opacity-30" />
//             <p>Cart is empty</p>
//           </div>
//         ) : (
//           cartItems.map((item) => (
//             <div key={item.id} className="flex items-center animate-in fade-in slide-in-from-right-4 duration-300">
//               <img src={item.imgSrc} alt={item.name} className="w-14 h-14 rounded-xl object-cover mr-4 shadow-sm" />
//               <div className="flex-1">
//                 <h4 className="font-bold text-gray-800 text-sm">{item.name}</h4>
//                 <p className="text-gray-400 text-sm">${item.price.toFixed(2)}</p>
//               </div>
              
//               {/* Controls using your increment/decrement actions */}
//               <div className="flex items-center space-x-3">
//                 <button 
//                   onClick={() => dispatch(decrementQuantity(item.id))}
//                   className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 text-gray-600 transition-colors"
//                 >
//                   <Minus size={14} />
//                 </button>
//                 <span className="font-bold w-4 text-center">{item.quantity}</span>
//                 <button 
//                   onClick={() => dispatch(incrementQuantity(item.id))}
//                   className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center hover:bg-blue-100 text-blue-600 transition-colors"
//                 >
//                   <Plus size={14} />
//                 </button>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       {/* Footer */}
//       <div className="p-6 bg-gray-50 rounded-t-3xl border-t border-gray-100">
//         <div className="space-y-2 mb-6 text-sm">
//           <div className="flex justify-between text-gray-500">
//              <span>Subtotal</span><span>${totalPrice.toFixed(2)}</span>
//           </div>
//           <div className="flex justify-between text-gray-500">
//              <span>Tax (10%)</span><span>${tax.toFixed(2)}</span>
//           </div>
//           <div className="flex justify-between text-green-600 font-medium">
//              <span>Discount</span><span>-${discount.toFixed(2)}</span>
//           </div>
//           <div className="flex justify-between font-bold text-xl text-gray-800 pt-2 border-t border-dashed border-gray-300 mt-2">
//             <span>Total</span><span>${finalTotal > 0 ? finalTotal.toFixed(2) : '0.00'}</span>
//           </div>
//         </div>
        
//         <button 
//           disabled={!hasItems}
//           className={`w-full py-4 rounded-2xl font-bold text-lg shadow-lg transition-all ${
//             hasItems 
//               ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-xl transform hover:-translate-y-1' 
//               : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//           }`}
//         >
//           Place Order
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CartSidebar;


import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store/store';
import { 
  incrementQuantity, 
  decrementQuantity, 
  selectTotalPrice, 
  cartHasItems 
} from "@/app/(dashboard)/pos/posSlice";
import { 
  Edit2, 
  Minus, 
  Plus, 
  FileText, 
  Percent,
  ScanLine, 
  ChevronDown
} from 'lucide-react';

const CartSidebar: React.FC = () => {
  const dispatch = useDispatch();
  
  // Redux State
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalPrice = useSelector(selectTotalPrice);
  const hasItems = useSelector(cartHasItems);

  // Calculations
  const tax = totalPrice * 0.10; // 10%
  const discount = hasItems ? 1.00 : 0;
  const finalTotal = totalPrice + tax - discount;

  return (
    <div className="w-[400px] bg-white h-full shadow-2xl flex flex-col border-l border-gray-100 font-sans">
      
      {/* --- HEADER --- */}
      <div className="p-6 pb-2">
        <div className="flex justify-between items-start mb-6">
          {/* Left Icon (Receipt) */}
          <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center hover:bg-gray-100 text-gray-600 transition-colors">
            <FileText size={20} />
          </button>

          {/* Title */}
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-900">Eloise's Order</h2>
            <p className="text-gray-400 text-xs mt-1">Order Number: #005</p>
          </div>

          {/* Right Icon (Edit) */}
          <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center hover:bg-gray-100 text-gray-600 transition-colors">
            <Edit2 size={20} />
          </button>
        </div>

        {/* Selectors (Table / Dine In) */}
        <div className="flex space-x-3 mb-2">
          <div className="flex-1 relative">
            <select className="w-full appearance-none bg-gray-50 text-gray-700 font-medium rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 cursor-pointer">
              <option>Table 05</option>
              <option>Table 06</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
          </div>
          <div className="flex-1 relative">
            <select className="w-full appearance-none bg-gray-50 text-gray-700 font-medium rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 cursor-pointer">
              <option>Dine In</option>
              <option>Take Away</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
          </div>
        </div>
      </div>

      {/* --- CART ITEMS LIST --- */}
      <div className="flex-1 overflow-y-auto px-6 py-2">
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-4">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center">
              <FileText size={32} className="opacity-20" />
            </div>
            <p className="text-sm">No items yet</p>
          </div>
        ) : (
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div key={item.id} className="group">
                <div className="flex items-start">
                  {/* Product Image */}
                  <div className="w-16 h-16 rounded-xl overflow-hidden shadow-sm flex-shrink-0 mr-4 border border-gray-100">
                    <img src={item.imgSrc} alt={item.name} className="w-full h-full object-cover" />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-900 text-sm truncate pr-2">{item.name}</h4>
                    <p className="text-gray-400 text-sm mt-1">${item.price.toFixed(2)}</p>
                    
                    {/* Small Edit Button (Blue Pencil) */}
                    <button className="mt-2 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors">
                       <Edit2 size={10} />
                    </button>
                  </div>

                  {/* Quantity Controls (Capsule Style) */}
                  <div className="flex items-center bg-gray-50 rounded-full px-2 py-1 space-x-3 mt-2">
                    <button 
                      onClick={() => dispatch(decrementQuantity(item.id))}
                      className="w-6 h-6 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-600 hover:text-red-500 hover:bg-red-50 transition-all active:scale-90"
                    >
                      <Minus size={12} />
                    </button>
                    
                    <span className="font-bold text-gray-800 w-4 text-center text-sm">{item.quantity}</span>
                    
                    <button 
                      onClick={() => dispatch(incrementQuantity(item.id))}
                      className="w-6 h-6 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all active:scale-90"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
                {/* Dashed Separator Line */}
                <div className="border-b border-dashed border-gray-200 mt-6 group-last:hidden"></div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* --- FOOTER (Totals & Buttons) --- */}
      <div className="px-6 pb-6 pt-2 bg-white">
        
        {/* Wave/Dashed Divider */}
        <div className="relative h-4 w-full mb-4 overflow-hidden">
             <div className="absolute top-0 left-0 w-full border-t-2 border-dashed border-gray-200"></div>
        </div>

        {/* Financial Breakdown */}
        <div className="space-y-3 mb-6 text-sm">
          <div className="flex justify-between items-center text-gray-500">
             <span>Subtotal</span>
             <span className="font-semibold text-gray-900">${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-gray-500">
             <span>Tax (10%)</span>
             <span className="font-semibold text-gray-900">${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-green-500">
             <span>Discount</span>
             <span className="font-semibold">-${discount.toFixed(2)}</span>
          </div>
          
          <div className="pt-2 flex justify-between items-center">
            <span className="font-bold text-lg text-gray-900">TOTAL</span>
            <span className="font-bold text-lg text-gray-900">${finalTotal > 0 ? finalTotal.toFixed(2) : '0.00'}</span>
          </div>
        </div>

        {/* Action Buttons: Promo & QRIS */}
        <div className="flex space-x-3 mb-4">
           {/* Promo Button */}
           <button className="flex-1 flex items-center justify-between px-4 py-3 bg-green-50 border border-green-200 rounded-xl text-green-700 font-medium hover:bg-green-100 transition-colors">
              <span className="text-sm">Promo Applied</span>
              <div className="w-5 h-5 rounded-full bg-green-200 flex items-center justify-center">
                <Percent size={10} className="text-green-700" />
              </div>
           </button>
           
           {/* QRIS Button */}
           <button className="flex-1 flex items-center justify-center px-4 py-3 bg-white border-2 border-blue-100 rounded-xl text-blue-600 font-bold text-sm hover:bg-blue-50 transition-colors">
              QRIS
           </button>
        </div>

        {/* Main CTA: Place Order */}
        <button 
          disabled={!hasItems}
          className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all flex justify-center items-center ${
            hasItems 
              ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-200' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Place Order
        </button>
      </div>

    </div>
  );
};

export default CartSidebar;