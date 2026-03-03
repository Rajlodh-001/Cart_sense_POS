"use client";

import React, { useState } from "react";
import Image from "next/image";
import MenuNavbar from "./MenuContainer/MenuNavbar";
import MenuPage from "./MenuContainer/MenuPage";
import TopContainer from "./MenuContainer/TopContainer";
import { categories } from "../../../lib/TempData";

const ItemsContainer = () => {
  const [search, setSearch] = useState("");
  const [activeCategoryId, setActiveCategoryId] = useState<
    number | string | undefined
  >(undefined);

  return (
    <div className="h-screen bg-slate-300 w-full flex flex-col">
      <TopContainer />
      <MenuNavbar
        categories={categories}
        activeCategoryId={activeCategoryId}
        onSelectCategory={(id) => setActiveCategoryId(id)}
      />

      {/* Search Box */}
      <div className="w-full-[2] h-14 m-2 mb-0 bg-white p-2 rounded-full">
        <div className="w-full md:w-auto h-full flex items-center gap-2 text-lg rounded-full ring-[1.5px] ring-gray-300 px-2">
          <input
            type="text"
            placeholder="Search to find items ..."
            className="w-full p-2 bg-transparent outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="bg-gray-200 rounded-full p-2 h-18 w-18">
            <Image src="/search.png" alt="search-icon" width={18} height={18} />
          </div>
        </div>
      </div>

      <MenuPage />
    </div>
  );
};

export default ItemsContainer;
