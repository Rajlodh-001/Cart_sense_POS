import React from "react";
import OrderTopSection from "./OrderTopSection";
import OrderBottomSection from "./OrderBottomSection";

const OrderContainer = () => {
  return (
    <div>
      <div className="conatiner h-screen w-full ">
        <div className="flex flex-col ">
          
          <OrderTopSection  />
        
         <OrderBottomSection />
         

          
        </div>
      </div>
    </div>
  );
};

export default OrderContainer;
