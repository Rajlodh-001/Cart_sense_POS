"use client"
import React from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
// import { selectTotalPrice, selectTotalQuantity } from "../../../app/(dashboard)/pos/posSlice";
import { selectTotalPrice ,selectTotalQuantity} from "@/app/(dashboard)/pos/posSlice";
import { RootState } from "@/store/store";

const OrderBottomSection = () => {

  // const totalQuantity = useSelector(selectTotalQuantity);
  const totalPrice = useSelector(selectTotalPrice);
  return (
    
    // <div className="h-full w-full bg-gray-100">
    //   <div className="">
    //     <div className=" flex flex-row justify-between p-1 px-2">
    //       <div className="w-[70%] flex flex-row justify-between">
    //         <span>SubTotal</span>
    //         <span className="pr-2">$</span>
    //       </div>
    //       <div className="flex flex-row justify-between">
    //         <span>2.43</span>
    //       </div>
    //     </div>

    //     <div className=" flex flex-row justify-between p-1 px-2">
    //       <div className="w-[70%] flex flex-row justify-between">
    //         <span>SubTotal</span>
    //         <span className="pr-2">$</span>
    //       </div>
    //       <div className="flex flex-row justify-between">
    //         <span>2.43</span>
    //       </div>
    //     </div>
    //     <div className="max-w-full mx-auto flex justify-center">
    //       <div className="text-xl  ">
    //         -----------------------------------------
    //       </div>
    //     </div>

    //     <div className=" flex flex-row justify-between p-1 px-2">
    //       <div className="w-[70%] flex flex-row justify-between">
    //         <span>SubTotal</span>
    //         <span className="pr-2">$</span>
    //       </div>
    //       <div className="flex flex-row justify-between">
    //         <span>2.43</span>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="bg-slate-300">
    //     <div className="flex flex-col">
    //       <div className="flex flex-row">
    //         <div className="w-[55%]">
    //           <div className="w-full h-7 m-2 mb-0 bg-white p-2 rounded-full">
    //             <div className="w-full md:w-auto h-full flex items-center gap-2 text-sm rounded-full ring-[1.5px]px-2">
    //               <input
    //                 type="text"
    //                 placeholder="Add Coupon ..."
    //                 className="w-full p-2 bg-transparent outline-none"
    //               />
    //               <div className="bg-gray-200 rounded-full p-2 h-18 w-18">
    //                 <Image
    //                   src="/search.png"
    //                   alt="search-icon"
    //                   width={12}
    //                   height={12}
    //                 />
    //               </div>
    //             </div>
    //           </div>
    //         </div>

    //         <div className="w-[45%] text-sm flex bg-red-600 rounded-full   ">
    //           <div className="w-full flex justify-center items-center ">Apply Coppon </div>
    //           </div>
    //       </div >
    //       <div className="w-full flex items-center justify-center">
    //       checkOut
    //       </div>
          
    //     </div>
        
    //   </div>
    // </div>

    <div className="h-full w-full bg-gray-100 rounded-t-lg shadow-lg">
  <div className="p-2">
  
    <div className="flex flex-row justify-between ">
      <div className="w-[70%] flex justify-between text-sm font-semibold">
        <span >SubTotal</span>
        <span className="text-base font-normal">$</span>
      </div>
      <span>2.43</span>
    </div>

   
    <div className="flex flex-row justify-between">
      <div className="w-[70%] flex justify-between text-sm font-semibold">
        <span>Tax</span>
        <span className="text-base font-normal">$</span>
      </div>
      <span>0.50</span>
    </div>

  
    <div className="max-w-full mx-auto flex justify-center py-1">
      <div className="border-t-2 border-dashed w-full"></div>
    </div>

  
    <div className="flex flex-row justify-between py-1 font-bold">
      <div className="w-[70%] flex justify-between text-lg">
        <span>Total</span>
        <span>$</span>
      </div>
      <span>{totalPrice}</span>
    </div>
  </div>
  {/* <div className="max-w-full mx-auto flex justify-center ">
      <div className="border-t-1 border w-full"></div>
    </div> */}

  
  <div className=" rounded-lg mb-2  px-3 ">
    <div className="flex items-center gap-2">
      <div className="flex-grow">
        <div className="relative">
          <input
            type="text"
            placeholder="Add Coupon..."
            className="w-full p-2 px-4 text-sm border rounded-full outline-none"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gray-200 rounded-full p-1 cursor-pointer">
            <Image src="/search.png" alt="search-icon" width={14} height={14} />
          </div>
        </div>
      </div>

      <button className="bg-primary-red-dark text-sm text-white rounded-full py-2 px-4 hover:bg-red-500 transition text-nowrap">
        Apply Coupon
      </button>
    </div>
  </div>

  {/* Checkout Button */}
  <div className="text-center ">
    <button className="w-full bg-primary-blue-dark  text-white py-3  hover:bg-blue-600 transition">
      Checkout
    </button>
  </div>
</div>

  );
};

export default OrderBottomSection;
