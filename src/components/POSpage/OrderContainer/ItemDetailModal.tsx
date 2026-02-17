// import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { removeFromCart, selectSingleItem } from "@/app/(dashboard)/pos/posSlice"; // Adjust path
// import { RootState } from "@/store/store"; // Adjust path
// import Image from "next/image";
// import edit from "../../../../public/icons/edit.svg";
// import {
//   incrementQuantity,
//   decrementQuantity,
// } from "@/app/(dashboard)/pos/posSlice";
// import { Trash2 } from "lucide-react";

// interface ItemDetailModalProps {
//   itemId: number;
//   setIsModalOpen: any;
//   onClose: () => void;
// }

// const ItemDetailModal: React.FC<ItemDetailModalProps> = ({
//   itemId,
//   setIsModalOpen,
//   onClose
// }) => {
//   const item = useSelector(selectSingleItem(itemId));

//   const items = useSelector((state: RootState) => state.cart.items);
//   const dispatch = useDispatch();

//   if (!item) {
//     //   setIsModalOpen(false)
//     return null;
//     //   return <div className="text-red-500">Item not found in cart.</div>;
//   }
//   console.log(item);
//   console.log("item Quantity ---->>>", item?.quantity);

//   // const handleDelete = ()=>{
//   //   dispatch(removeFromCart(item.id));
//   //   // 2. Close the Modal immediately
//   //   onClose();
//   // }

//   const handleDelete = () => {
//     // 1. Remove from Redux
//     dispatch(removeFromCart(item.id));
//     // 2. Close the Modal immediately
//     onClose();
//   }

//   return (
//     // <div className="w-full bg-blue-100 mb-6" >
//     <div className="p-4 sm:p-6 divide-y divide-gray-200">
//       {/* ===== 1. HEADER ROW: IMAGE, TITLE, QUANTITY & KEY PRICE (PROMINENT) ===== */}
//       <div className="flex flex-col md:flex-row pb-6">
//         {/* 💥 Column 1 (Sized as 1/3): Image */}
//         <div className="w-full md:w-1/3 pr-0 md:pr-6 mb-4 md:mb-0 flex-shrink-0">
//           <Image
//             className="rounded-xl shadow-lg w-full h-auto object-cover"
//             src={item.imgSrc}
//             height={300}
//             width={300}
//             alt={item.name}
//             draggable="false"
//           />
//         </div>

//         {/* 💥 Column 2 (Sized as 2/3): Key Info (Title, Quantity, Total Price) */}
//         <div className="w-full md:w-2/3 flex flex-col justify-between">
//           {/* Title */}
//           <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 line-clamp-2 mb-3">
//             {item.name}
//           </h2>

//           {/* PRICE BLOCK (PROMINENT) */}
//           <div className="flex justify-between items-end border-b border-dashed border-gray-300 pb-3 mb-3">
//             {/* 💥 Prominent Total Price (1/3 of the key info space) */}
//             <div className="flex flex-col">
//               <p className="text-xl font-semibold text-gray-500">Total Price</p>
//               <p className="text-3xl font-bold text-green-600">
//                 ${(item.price * item.quantity).toFixed(2)}
//               </p>
//             </div>

//             {/* Quantity Controls (2/3 of the key info space) */}
//             <div className="flex flex-col items-center">
//               <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 space-x-4 shadow-md">
//                 <span className="text-sm font-semibold text-gray-700">
//                   QTY:
//                 </span>
//                 <button
//                   type="button"
//                   disabled={item.quantity < 2}
//                   className={`cursor-pointer text-xl bg-white p-2 rounded-full w-8 h-8 flex items-center justify-center transition disabled:opacity-50   disabled:cursor-not-allowed ${
//                     item.quantity >= 2 ? "cursor-pointer hover:bg-gray-200" : ""
//                   }`}
//                   onClick={() => dispatch(decrementQuantity(item.id))}
//                 >
//                   -
//                 </button>

//                 <p className="text-2xl font-bold text-gray-800 w-8 text-center">
//                   {item.quantity}
//                 </p>

//                 {/* Increment Button */}
//                 <span
//                   className="cursor-pointer text-xl bg-white p-2 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-200 transition"
//                   onClick={() => dispatch(incrementQuantity(item.id))}
//                 >
//                   +
//                 </span>

//                 {/* i want to delete thsi item  and while i delete model should close  */}
//                 <span
//                   className="cursor-pointer text-xl bg-white p-2 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-200 transition"
//                   // onClick={() => dispatch(removeFromCart(item.id))}
//                   onClick={handleDelete}
//                 >
//                   <Trash2 color="red" />
//                 </span>
//               </div>
//             </div>

//             {/* <div className="flex flex-col items-center">
//               <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 space-x-4 shadow-md">
              
//                 <span
//                   className="cursor-pointer text-xl bg-white p-2 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-200 transition"
//                   onClick={() => dispatch(incrementQuantity(item.id))}
//                 >
//                   <Trash2 />
//                 </span>
//               </div>
//             </div> */}
//           </div>

//           {/* Less Prominent Price Detail */}
//           <div className="text-right mt-1">
//             <p className="text-sm text-gray-500 italic">
//               (${item.price.toFixed(2)} per item)
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* ===== 2. DETAIL ROW: DESCRIPTION AND OTHER INFO (Full Width) ===== */}
//       <div className="pt-6 space-y-6">
//         {/* Description */}
//         <div>
//           <h3 className="text-xl font-semibold text-gray-800 mb-2">
//             Description
//           </h3>
//           <p className="text-gray-600 border-l-4 border-blue-400 pl-3">
//             {/* Replace with actual item.description */}
//             This is the product description. The clean, full-width layout
//             ensures this text is easy to read.
//           </p>
//         </div>

//         {/* Ingredients/Nutrition/Making */}
//         {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          

//         <div className="border border-gray-100 rounded-lg p-3 bg-white shadow-sm">
//           <h4 className="font-bold text-lg text-gray-800 mb-1">Ingredients</h4>
//           <ul className="list-disc list-inside text-sm text-gray-600 ml-4">
//             <li>Flour, Sugar, Eggs, Milk (Example)</li>
//             <li>Contains allergens: Wheat, Dairy</li>
//           </ul>
//         </div>
        

//         <div className="border border-gray-100 rounded-lg p-3 bg-white shadow-sm">
//           <h4 className="font-bold text-lg text-gray-800 mb-1">Nutrition Info</h4>
//           <ul className="text-sm text-gray-600">
//             <li>Calories: 250 kcal</li>
//             <li>Fat: 12g, Protein: 5g</li>
//           </ul>
//         </div>

   
//         <div className="border border-gray-100 rounded-lg p-3 bg-white shadow-sm">
//           <h4 className="font-bold text-lg text-gray-800 mb-1">Making Instructions</h4>
//           <p className="text-sm text-gray-600">
//             Preheat oven to 350°F. Bake for 25 minutes. Serve warm.
//           </p>
//         </div>
        
//       </div> */}
//         <div className="border border-gray-200 rounded-lg p-4">
//           <h3 className="text-xl font-semibold text-gray-800 mb-2">
//             Ingredients & Nutrition
//           </h3>
//           <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
//             <li>Ingredients: Flour, Sugar, Eggs, Milk (Example data)</li>
//             <li>
//               Nutrition Info: Calories, Fat, Protein details... (Example data)
//             </li>
//           </ul>
//         </div>

//         <div className="border border-gray-200 rounded-lg p-4">
//           <h3 className="text-xl font-semibold text-gray-800 mb-2">
//             Making Instructions
//           </h3>
//           <p className="text-gray-600">
//             {/* Replace with item.making_instructions */}
//             Instructions for preparation or assembly. For example: "Preheat oven
//             to 350F. Bake for 25 minutes until golden brown."
//           </p>
//         </div>
//       </div>
//     </div>
//     // {/* </div> */}
//     //   </li>
//   );
// };

// export default ItemDetailModal;



// import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { removeFromCart, selectSingleItem } from "@/app/(dashboard)/pos/posSlice"; // Adjust path
// import { RootState } from "@/store/store"; // Adjust path
// import Image from "next/image";
// import edit from "../../../../public/icons/edit.svg";
// import {
//   incrementQuantity,
//   decrementQuantity,
// } from "@/app/(dashboard)/pos/posSlice";
// import { Trash2 } from "lucide-react";

// interface ItemDetailModalProps {
//   itemId: number;
//   setIsModalOpen: any;
//   onClose: () => void;
// }

// const ItemDetailModal: React.FC<ItemDetailModalProps> = ({
//   itemId,
//   setIsModalOpen,
//   onClose
// }) => {
//   const item = useSelector(selectSingleItem(itemId));

//   const items = useSelector((state: RootState) => state.cart.items);
//   const dispatch = useDispatch();

//   if (!item) {
//     return null;
//   }
//   console.log(item);
//   console.log("item Quantity ---->>>", item?.quantity);

//   const handleDelete = () => {
//     // 1. Remove from Redux
//     dispatch(removeFromCart(item.id));
//     // 2. Close the Modal immediately
//     onClose();
//   }

//   return (
//     // <div className="w-full bg-blue-100 mb-6" >
//     <div className="p-4 sm:p-6 divide-y divide-gray-200">
//       {/* ===== 1. HEADER ROW: IMAGE, TITLE, QUANTITY & KEY PRICE (PROMINENT) ===== */}
//       <div className="flex flex-col md:flex-row pb-6">
//         {/* 💥 Column 1 (Sized as 1/3): Image */}
//         <div className="w-full md:w-1/3 pr-0 md:pr-6 mb-4 md:mb-0 flex-shrink-0">
//           <Image
//             className="rounded-xl shadow-lg w-full h-auto object-cover"
//             src={item.imgSrc}
//             height={300}
//             width={300}
//             alt={item.name}
//             draggable="false"
//           />
//         </div>

//         {/* 💥 Column 2 (Sized as 2/3): Key Info (Title, Quantity, Total Price) */}
//         <div className="w-full md:w-2/3 flex flex-col justify-between">
//           {/* Title */}
//           <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 line-clamp-2 mb-3">
//             {item.name}
//           </h2>

//           {/* PRICE BLOCK (PROMINENT) */}
//           <div className="flex justify-between items-end border-b border-dashed border-gray-300 pb-3 mb-3">
//             {/* 💥 Prominent Total Price (1/3 of the key info space) */}
//             <div className="flex flex-col">
//               <p className="text-xl font-semibold text-gray-500">Total Price</p>
//               <p className="text-3xl font-bold text-green-600">
//                 ${(item.price * item.quantity).toFixed(2)}
//               </p>
//             </div>

//             {/* Quantity Controls (2/3 of the key info space) */}
//             <div className="flex flex-col items-center">
//               <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 space-x-4 shadow-md">
//                 <span className="text-sm font-semibold text-gray-700">
//                   QTY:
//                 </span>
//                 <button
//                   type="button"
//                   disabled={item.quantity < 2}
//                   className={`cursor-pointer text-xl bg-white p-2 rounded-full w-8 h-8 flex items-center justify-center transition disabled:opacity-50   disabled:cursor-not-allowed ${
//                     item.quantity >= 2 ? "cursor-pointer hover:bg-gray-200" : ""
//                   }`}
//                   onClick={() => dispatch(decrementQuantity(item.id))}
//                 >
//                   -
//                 </button>

//                 <p className="text-2xl font-bold text-gray-800 w-8 text-center">
//                   {item.quantity}
//                 </p>

//                 {/* Increment Button */}
//                 <span
//                   className="cursor-pointer text-xl bg-white p-2 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-200 transition"
//                   onClick={() => dispatch(incrementQuantity(item.id))}
//                 >
//                   +
//                 </span>

//                 {/* i want to delete thsi item  and while i delete model should close  */}
//                 <span
//                   className="cursor-pointer text-xl bg-white p-2 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-200 transition"
//                   onClick={handleDelete}
//                 >
//                   <Trash2 color="red" />
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Less Prominent Price Detail */}
//           <div className="text-right mt-1">
//             <p className="text-sm text-gray-500 italic">
//               (${item.price.toFixed(2)} per item)
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* ===== 2. DETAIL ROW: DESCRIPTION AND OTHER INFO (Full Width) ===== */}
//       <div className="pt-6 space-y-6">
//         <div>
//           <h3 className="text-xl font-semibold text-gray-800 mb-2">
//             Description
//           </h3>
//           <p className="text-gray-600 border-l-4 border-blue-400 pl-3">
//             This is the product description. The clean, full-width layout
//             ensures this text is easy to read.
//           </p>
//         </div>
//         <div className="border border-gray-200 rounded-lg p-4">
//           <h3 className="text-xl font-semibold text-gray-800 mb-2">
//             Ingredients & Nutrition
//           </h3>
//           <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
//             <li>Ingredients: Flour, Sugar, Eggs, Milk (Example data)</li>
//             <li>
//               Nutrition Info: Calories, Fat, Protein details... (Example data)
//             </li>
//           </ul>
//         </div>

//         <div className="border border-gray-200 rounded-lg p-4">
//           <h3 className="text-xl font-semibold text-gray-800 mb-2">
//             Making Instructions
//           </h3>
//           <p className="text-gray-600">
//             Instructions for preparation or assembly. For example: "Preheat oven
//             to 350F. Bake for 25 minutes until golden brown."
//           </p>
//         </div>
//       </div>
//     </div>
 
//   );
// };

// export default ItemDetailModal;


import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, selectSingleItem, incrementQuantity, decrementQuantity } from "@/app/(dashboard)/pos/posSlice";
import { RootState } from "@/store/store";
import Image from "next/image";
import { Trash2, X } from "lucide-react";

interface ItemDetailModalProps {
  itemId: number;
  onClose: () => void;
}

const ItemDetailModal: React.FC<ItemDetailModalProps> = ({ itemId, onClose }) => {
  const item = useSelector(selectSingleItem(itemId));
  const dispatch = useDispatch();

  if (!item) return null;

  const handleDelete = () => {
    dispatch(removeFromCart(item.id));
    onClose();
  };

  return (
    <div className="flex flex-col h-[85vh] md:h-[70vh] w-full max-w-lg mx-auto bg-white rounded-t-3xl md:rounded-3xl overflow-hidden">
      
      {/* 1. FIXED HEADER */}
      <div className="relative flex items-center justify-center p-4 border-b">
        <h3 className="text-lg font-semibold text-gray-800">Detail Menu</h3>
        <button 
          onClick={onClose} 
          className="absolute right-1 p-1 rounded-full bg-red-50 hover:bg-red-100 transition"
        >
          <X className="w-7 h-7 text-red-500" />
        </button>
      </div>

      {/* 2. SCROLLABLE CONTENT AREA */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar scrollbar-hide">
        
        {/* Product Image Card */}
        <div className="w-full aspect-video relative bg-gray-50 rounded-2xl overflow-hidden flex items-center justify-center p-8">
          <Image
            src={item.imgSrc}
            alt={item.name}
            fill
            className="object-contain p-6"
            draggable="false"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-2">
          <span className="px-2 py-1 text-xs font-medium text-emerald-600 bg-emerald-50 rounded-md">
            {item.itemType || "Pastry"}
          </span>
          <h2 className="text-2xl font-bold text-gray-900">{item.name}</h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            Premium butter croissant with a crispy pastry crust and soft inside will melt away on your mouth!
          </p>
          <p className="text-2xl font-bold text-blue-600 pt-2">
            ${item.price.toFixed(2)}
          </p>
        </div>

        {/* Notes Input (Matches Image) */}
        <div className="bg-gray-50 rounded-xl p-3">
          <textarea 
            placeholder="Add notes to your order..." 
            className="w-full bg-transparent text-sm outline-none resize-none h-20 text-gray-600"
          />
        </div>

        {/* Additional Details (Scrollable Section) */}
        <div className="space-y-4 pt-4 border-t border-dashed">
          <div>
            <h4 className="font-semibold text-gray-800 mb-1 text-sm">Ingredients</h4>
            <p className="text-xs text-gray-500 italic">Flour, Premium Butter, Sugar, Natural Yeast.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-1 text-sm">Nutrition Info</h4>
            <p className="text-xs text-gray-500 italic">Calories: 340kcal | Fat: 18g | Protein: 6g</p>
          </div>
        </div>
      </div>

      {/* 3. FIXED FOOTER (ACTIONS) */}
      <div className="p-4 bg-white border-t space-y-4">
        
        {/* Quantity and Delete Row */}
        <div className="flex items-center justify-between gap-4">
          <button 
            onClick={handleDelete}
            className="p-3 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition"
            title="Remove from cart"
          >
            <Trash2 className="w-6 h-6" />
          </button>

          <div className="flex-1 flex items-center justify-between bg-gray-50 rounded-full px-2 py-1 shadow-inner border">
            <button
              onClick={() => dispatch(decrementQuantity(item.id))}
              disabled={item.quantity < 2}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm text-gray-400 disabled:opacity-30"
            >
              —
            </button>
            <span className="text-lg font-bold text-gray-800">{item.quantity}</span>
            <button
              onClick={() => dispatch(incrementQuantity(item.id))}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm text-gray-800 font-bold"
            >
              +
            </button>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button 
          onClick={onClose}
          className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg transition"
        >
          Update Cart (${(item.price * item.quantity).toFixed(2)})
        </button>
      </div>
    </div>
  );
};

export default ItemDetailModal;