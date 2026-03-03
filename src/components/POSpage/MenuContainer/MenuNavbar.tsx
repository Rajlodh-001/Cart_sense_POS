// import { categories } from "../../../../lib/TempData";

// const MenuNavbar = () => {
//   return (
//     <div className="w-full-[2] m-2 mb-0 bg-white p-1.5 rounded-lg md:overflow-visible lg:overflow-visible 2xl:overflow-visible sm:overflow-x-auto scrollbar-hide">
//       <div className="flex overflow-x-auto gap-2 sm:grid sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8">
//         {categories?.map(
//           (
//             item: {
//               id: number;
//               name: string;
//               slug?: string;
//               icon?: string;
//               color?: string;
//               count: number;
//               imageurl?: string;
//             },
//             index: number,
//           ) => (
//             <div
//               key={index}
//               className="border-2 flex flex-col justify-center rounded-lg bg-white py-2 px-4 sm:p-2 items-start min-w-[60px] md:min-w-0"
//             >
//               <div className="text-blue-500 font-medium mt-1">{item.name}</div>
//               <div className="text-gray-500 text-sm">{item.count} items</div>
//             </div>
//           ),
//         )}
//       </div>
//     </div>
//   );
// };

// export default MenuNavbar;

import React from "react";
import { categories } from "../../../../lib/TempData";

// Define the type for your component props
interface CategoryItem {
  id: number | string;
  name: string;
  slug?: string;
  icon?: string;
  color?: string;
  count: number;
  imageurl?: string;
}
interface MenuNavbarProps {
  categories: CategoryItem[];
  activeCategoryId?: number | string; // Pass the active ID to highlight it
  onSelectCategory?: (id: number | string) => void; // Function to handle clicks
}

const MenuNavbar: React.FC<MenuNavbarProps> = ({
  categories,
  activeCategoryId,
  onSelectCategory,
}) => {
  return (
    <div className="w-full mb-6 relative">
      {/* Horizontal Scroll Container */}
      {/* Note: add 'scrollbar-hide' to your global CSS or use tailwind-scrollbar-hide plugin */}
      <div className="flex space-x-4 overflow-x-auto pb-4 pt-2 px-1 scrollbar-hide">
        {categories?.map((item) => {
          const isActive = activeCategoryId === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onSelectCategory?.(item.id)}
              className={`flex flex-col items-center justify-center min-w-[120px] h-[130px] p-4 rounded-3xl transition-all duration-300 border-2 flex-shrink-0 outline-none ${
                isActive
                  ? "bg-blue-600 text-white shadow-xl shadow-blue-200 border-blue-600 scale-105"
                  : "bg-white text-gray-500 hover:bg-gray-50 border-transparent hover:border-blue-100 shadow-sm hover:shadow-md"
              }`}
            >
              {/* Icon / Image Container */}
              <div
                className={`mb-3 w-12 h-12 flex items-center justify-center rounded-2xl transition-colors duration-300 ${
                  isActive
                    ? "bg-blue-500 bg-opacity-50"
                    : "bg-blue-50 text-blue-500"
                }`}
              >
                {item.imageurl ? (
                  <img
                    src={item.imageurl}
                    alt={item.name}
                    className="w-8 h-8 object-contain drop-shadow-sm"
                  />
                ) : (
                  <span className="text-2xl drop-shadow-sm">
                    {item.icon || "🍽️"}
                  </span>
                )}
              </div>

              {/* Category Name */}
              <span
                className={`font-bold text-sm mb-1 ${isActive ? "text-white" : "text-gray-700"}`}
              >
                {item.name}
              </span>

              {/* Item Count */}
              <span
                className={`text-xs font-medium ${isActive ? "text-blue-200" : "text-gray-400"}`}
              >
                {item.count} items
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MenuNavbar;
