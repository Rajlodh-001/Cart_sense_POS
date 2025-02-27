import React from "react";

const OrderBottomSection = () => {
  return (
    <div className="h-full w-full bg-gray-100">
      <div className="">
        <div className=" flex flex-row justify-between p-1 px-2">
          <div className="w-[70%] flex flex-row justify-between">
            <span>SubTotal</span>
            <span className="pr-2">$</span>
          </div>
          <div className="flex flex-row justify-between">
            <span>2.43</span>
          </div>
        </div>

        <div className=" flex flex-row justify-between p-1 px-2">
          <div className="w-[70%] flex flex-row justify-between">
            <span>SubTotal</span>
            <span className="pr-2">$</span>
          </div>
          <div className="flex flex-row justify-between">
            <span>2.43</span>
          </div>
        </div>
        <div className="max-w-full mx-auto flex justify-center">
          <div className="text-xl  ">
            -----------------------------------------
          </div>
        </div>

        <div className=" flex flex-row justify-between p-1 px-2">
          <div className="w-[70%] flex flex-row justify-between">
            <span>SubTotal</span>
            <span className="pr-2">$</span>
          </div>
          <div className="flex flex-row justify-between">
            <span>2.43</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderBottomSection;
