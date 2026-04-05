"use client";

import ItemsContainer from "@/components/pos/ItemsContainer";
import OrderContainer from "@/components/pos/OrderContainer";

const PosPage = () => {
  return (
    <div className="min-h-screen md:h-screen w-full flex flex-col md:flex-row bg-[#f0f2f5] overflow-x-hidden">
      {/* Left — Menu (Top on Mobile, Left on Tablets/Desktop) */}
      <div className="w-full md:w-[60%] xl:w-[70%] 2xl:w-[75%] flex-none md:flex-1 bg-bgdarkgray overflow-hidden">
        <ItemsContainer />
      </div>
      
      {/* Right — Order (Bottom on Mobile, Right on Tablets/Desktop) */}
      <div className="w-full md:w-[40%] xl:w-[30%] 2xl:w-[25%] flex-none border-t md:border-t-0 md:border-l border-gray-200 bg-white shadow-2xl md:shadow-none z-10">
        <div className="h-[70vh] md:h-full">
          <OrderContainer />
        </div>
      </div>
    </div>
  );
};

export default PosPage;
