import React from "react";
import OrderTopSection from "./OrderTopSection";
import OrderBottomSection from "./OrderBottomSection";
import OrderItemList from "./OrderItemList";

const OrderContainer = () => {
  return (
   

      <div className="container h-dvh w-full flex flex-col">
  
  <div className="flex-none">
    <OrderTopSection />
  </div>


  <div className="flex-grow  overflow-y-scroll scrollbar-hide  ">
    <OrderItemList />
  </div>


  <div className="flex-none">
    <OrderBottomSection />
  </div>
</div>

    
  );
};

export default OrderContainer;
