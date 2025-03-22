"use client";
import React, { useState } from "react";
import edit from "../../../../public/icons/arrow-drop-down.png";
import Image from "next/image";

const options = [
  { id: 1, label: "Dine in" },
  { id: 2, label: "Takeaway" },
  { id: 3, label: "Timed order" },
];

const DropDownMenu = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className=" relative inline-block text-left w-46 ">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full px-2 py-1 text-gray-700 bg-gray-200 rounded-full "
      >
        {selected !== null
          ? options.find((opt) => opt.id === selected)?.label
          : "Select Option"}
        <Image 
        draggable="false"
          src={edit}
          alt="More"
          width={25}
        //   13
          height={25}
          className={`ml-2  p-1.5 bg-primary-white-light rounded-full  transition-transform duration-50 ease-in ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul className="absolute left-0 mt-2 w-46 bg-white rounded-lg shadow-lg overflow-hidden z-10">
          {options.map((option) => (
            <li
              key={option.id}
              className="px-2 py-1 flex items-center   bg-primary-red-dark text-nowrap"
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

export default DropDownMenu;
