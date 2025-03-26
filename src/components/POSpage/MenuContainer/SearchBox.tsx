"use client";
import { Menudata } from "../../../../lib/TempData";
import React, { useState } from "react";
import Image from "next/image";

const SearchBox = () => {
  const [search, setSearch] = useState("");

  

  const handlechange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearch(e.target.value);
    console.log(search);
  };

  function filter (){

    // Menudata.filter((item)=> return  )
  }
  return (
    <div className="w-full-[2] h-14 m-2 mb-0 bg-white p-2 rounded-full">
      <div className="w-full md:w-auto h-full flex items-center gap-2 text-lg rounded-full ring-[1.5px] ring-gray-300 px-2">
        <input
          type="text"
          placeholder="Search to find items ..."
          className="w-full p-2 bg-transparent outline-none"
          onChange={(e) => handlechange(e)}
        />
        <div className="bg-gray-200 rounded-full p-2 h-18 w-18">
          <Image src="/search.png" alt="search-icon" width={18} height={18} />
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
