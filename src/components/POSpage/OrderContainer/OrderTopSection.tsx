"use client";
import React, { useState } from "react";
import edit from "../../public/icons/edit.svg";
import Image from "next/image";
import DropDownMenu from "./DropDownMenu";

const options = [
  { id: 1, label: "Dine in" },
  { id: 2, label: "Takeaway" },
  { id: 3, label: "Timed order" },
];



const options2 = [
  { id: 1, label: "Table 1 " },
  { id: 2, label: "Table 2" },
  { id: 3, label: "Table 3" },
];

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

      <div className="grid grid-cols-2 gap-4 p-2 px-4 ">
        {/* <div className="">
          <label htmlFor="">Dine in</label>
        </div> */}
  
        <DropDownMenu options ={options}/>

        <DropDownMenu options ={options2}/>
         
      </div>
    </div>
  );
};

export default OrderTopSection;
