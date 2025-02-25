import React from "react";

const OrderTopSection = () => {
  return (
    <div className="  bg-white flex flex-col">

      <div className="top flex flex-row justify-between p-1 pt-2">

        <div className="bg-white rounded-full mx-2  h-12 w-12 flex justify-between items-center">
          <button className="bg-slate-200 rounded-full h-10 w-10 mx-1 font-bold">
            B
          </button>
        </div>

        <div className="">
          <h4 className="text-xl text-center">Raj's Order</h4>
          <span className="text-xs text-center">Order Number #0001</span>
        </div>

         <div className="bg-white rounded-full mx-2  h-12 w-12 flex justify-between items-center">
          <button className="bg-slate-200 rounded-full h-10 w-10 mx-1 font-bold">
            E
          </button>
        </div>
      </div>


    </div>
  );
};

export default OrderTopSection;
