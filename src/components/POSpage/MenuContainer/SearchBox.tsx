// "use client";
// import { Menudata } from "../../../../lib/TempData";
// import React, { useState } from "react";
// import Image from "next/image";

// const SearchBox = () => {
//   const [search, setSearch] = useState("");

//   const handlechange = (e: {
//     target: { value: React.SetStateAction<string> };
//   }) => {
//     setSearch(e.target.value);
//     console.log(search);
//   };

//   function filter (){

//     // Menudata.filter((item)=> return  )
//   }
//   return (
//     <div className="w-full-[2] h-14 m-2 mb-0 bg-white p-2 rounded-full">
//       <div className="w-full md:w-auto h-full flex items-center gap-2 text-lg rounded-full ring-[1.5px] ring-gray-300 px-2">
//         <input
//           type="text"
//           placeholder="Search to find items ..."
//           className="w-full p-2 bg-transparent outline-none"
//           onChange={(e) => handlechange(e)}
//         />
//         <div className="bg-gray-200 rounded-full p-2 h-18 w-18">
//           <Image src="/search.png" alt="search-icon" width={18} height={18} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SearchBox;

import { useState } from "react";
import { Search } from "lucide-react";
const SearchBox = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Filtering Logic

  return (
    <div className="relative w-full">
      <div className="absolute left-6 top-1/2 transform -translate-y-1/2 pointer-events-none">
        <Search className="text-gray-400" size={22} />
      </div>
      <input
        type="text"
        placeholder="Search something sweet on your mind..."
        className="w-full pl-16 pr-6 py-5 rounded-2xl bg-white border-none shadow-sm text-gray-700 placeholder-gray-400 focus:ring-4 focus:ring-blue-50 transition-all outline-none font-medium"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {/* Search Icon on the right (Optional filter icon) */}
      <div className="absolute right-6 top-1/2 transform -translate-y-1/2">
        <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400">
          <span className="text-xl">🔍</span>
        </button>
      </div>
    </div>
  );
};

export default SearchBox;
