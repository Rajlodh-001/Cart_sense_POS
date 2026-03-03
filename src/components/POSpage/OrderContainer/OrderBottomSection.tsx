"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { cartHasItems, selectTotalPrice } from "@/app/(dashboard)/pos/posSlice";
import PaymentModal from "@/components/placeOrderComponent/PaymentModal";

const OrderBottomSection = () => {
  const totalPrice = useSelector(selectTotalPrice);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const hasItems = useSelector(cartHasItems);

  const handlePaymentComplete = (details: any) => {
    console.log("Payment Success:", details);
    setShowPaymentModal(false);
  };

  const handlepaymentProcess = () => {
    if (hasItems) {
      setShowPaymentModal(true);
    }
  };

  return (
    <div className="h-full w-full bg-gray-100 rounded-t-lg shadow-lg">
      <div className="p-2 pb-1">
        <div className="flex flex-row justify-between ">
          <div className="w-[70%] flex justify-between text-sm font-semibold">
            <span>SubTotal</span>
            <span className="text-base font-normal">₹</span>
          </div>
          <span>2.43</span>
        </div>

        <div className="flex flex-row justify-between">
          <div className="w-[70%] flex justify-between text-sm font-semibold">
            <span>Tax</span>
            <span className="text-base font-normal">₹</span>
          </div>
          <span>0.50</span>
        </div>

        <div className="max-w-full mx-auto flex justify-center py-1">
          <div className="border-t-2 border-dashed w-full"></div>
        </div>

        <div className="flex flex-row justify-between py-1 font-bold">
          <div className="w-[70%] flex justify-between text-lg">
            <span>Total</span>
            <span>₹</span>
          </div>
          <span>{totalPrice.toFixed(2)}</span>
        </div>
      </div>

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
                <Image
                  src="/search.png"
                  alt="search-icon"
                  width={14}
                  height={14}
                />
              </div>
            </div>
          </div>

          <button className="bg-primary-red-dark text-sm text-white rounded-full py-2 px-4 hover:bg-red-500 transition text-nowrap">
            Apply Coupon
          </button>
        </div>
      </div>

      <button
        onClick={handlepaymentProcess}
        className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl..."
      >
        Proceed to Payment
      </button>

      {showPaymentModal && (
        <PaymentModal
          totalAmount={128.5}
          onClose={() => setShowPaymentModal(false)}
          onConfirm={handlePaymentComplete}
        />
      )}
    </div>
  );
};

export default OrderBottomSection;
