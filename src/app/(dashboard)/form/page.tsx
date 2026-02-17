"use client";
import React, { useState } from "react";

const Form = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className="h-screen bg-blue-200 flex justify-center items-center">
      <button
        className="p-2 px-6 rounded-lg bg-green-400  "
        onClick={() => {
          setOpen(!open);
        }}
      >
        Form
      </button>

      {open && (
        <div className="w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-30 z-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
            <div
              className="absolute top-4 right-4 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              X
            </div>
            <div>
              
              <label htmlFor="">Increment by amount</label>
              <input type="text" className="borde border-2 border-gray-500" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
