import React from "react";
import OrderTopSection from "./OrderTopSection";
import OrderBottomSection from "./OrderBottomSection";
import OrderItemList from "./OrderItemList";

const OrderContainer = () => {
  return (
   
      // <div className="conatiner h-dvh w-full ">
      //   <div className="grid grid-cols-1">
      //     <div className="">
           
      //       <OrderTopSection />
      //     </div>
      //     <div className="">

      //       <OrderItemList/>
      //     </div>
      //     <div className="">
      //       <OrderBottomSection />
      //     </div>
      //   </div>
      // </div>
      <div className="container h-dvh w-full flex flex-col">
  {/* Top Section */}
  <div className="flex-none">
    <OrderTopSection />
  </div>

  {/* Middle Section (Order List) Taking Maximum Height */}
  <div className="flex-grow  overflow-y-scroll scrollbar-hide  ">
    <OrderItemList />
  </div>

  {/* Bottom Section */}
  <div className="flex-none">
    <OrderBottomSection />
  </div>
</div>

    
  );
};

export default OrderContainer;
