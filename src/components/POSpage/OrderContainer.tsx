"use client";

import React, { useState } from "react";
import Image from "next/image";
import edit from "../../../public/icons/arrow-drop-down.png";
import OrderBottomSection from "./OrderContainer/OrderBottomSection";
import OrderItemList from "./OrderContainer/OrderItemList";

// Dropdown options
const orderTypeOptions = [
  { id: 1, label: "Dine in" },
  { id: 2, label: "Takeaway" },
  { id: 3, label: "Timed order" },
];

const tableOptions = [
  { id: 1, label: "Table 1" },
  { id: 2, label: "Table 2" },
  { id: 3, label: "Table 3" },
];

// Inline DropDownMenu (was DropDownMenu.tsx)
const DropDown = ({
  options,
}: {
  options: { id: number; label: string }[];
}) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="relative inline-block text-left w-46">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full px-2 py-1 text-gray-700 bg-gray-200 rounded-full"
      >
        {selected !== null
          ? options.find((opt) => opt.id === selected)?.label
          : "Select Option"}
        <Image
          draggable="false"
          src={edit}
          alt="More"
          width={25}
          height={25}
          className={`ml-2 p-1.5 bg-primary-white-light rounded-full transition-transform duration-50 ease-in ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul className="absolute left-0 mt-2 w-46 bg-white rounded-lg shadow-lg overflow-hidden z-10">
          {options.map((option) => (
            <li
              key={option.id}
              className="px-2 py-1 flex items-center bg-primary-red-dark text-nowrap"
              onClick={() => {
                setSelected(option.id);
                setOpen(false);
              }}
            >
              <input
                type="radio"
                name="dropdown-option"
                value={option.id}
                checked={selected === option.id}
                onChange={() => setSelected(option.id)}
                className="mr-2"
              />
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const OrderContainer = () => {
  return (
    <div className="container h-dvh w-full flex flex-col">
      {/* Order Top Section (was OrderTopSection.tsx) */}
      <div className="flex-none bg-white flex flex-col">
        <div className="top flex flex-row justify-between p-1 pt-2">
          <div className="bg-white rounded-full mx-2 h-12 w-12 flex justify-between items-center">
            <button className="bg-slate-200 rounded-full h-10 w-10 mx-1 font-bold">
              B
            </button>
          </div>
          <div>
            <h4 className="text-xl text-center">Raj&apos;s Order</h4>
            <span className="text-xs text-center">Order Number #0001</span>
          </div>
          <div className="bg-white rounded-full mx-2 h-12 w-12 flex justify-between items-center">
            <button className="bg-slate-200 rounded-full h-10 w-10 mx-1 font-bold">
              E
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 p-2 px-4">
          <DropDown options={orderTypeOptions} />
          <DropDown options={tableOptions} />
        </div>
      </div>

      {/* Order Item List */}
      <div className="flex-grow overflow-y-scroll scrollbar-hide">
        <OrderItemList />
      </div>

      {/* Order Bottom / Summary */}
      <div className="flex-none">
        <OrderBottomSection />
      </div>
    </div>
  );
};

export default OrderContainer;
