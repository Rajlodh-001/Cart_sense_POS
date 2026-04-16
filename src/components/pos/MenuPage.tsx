"use client";

import Image from "next/image";
import { useDispatch } from "react-redux";
import { addToCart } from "@/app/(dashboard)/pos/posSlice";
import { Product } from "@/hooks/useProducts";
import Badge from "../common/Badge";

interface MenuPageProps {
  products: Product[];
}

const MenuPage = ({ products }: MenuPageProps) => {
  const dispatch = useDispatch();

  if (!products || products.length === 0) {
    return null; // Return null so the parent (ItemsContainer) can show its beautiful empty state
  }

  return (
    // <div className="w-full m-0 sm:m-2 h-full scrollbar-hide overflow-y-auto">
    //   <div className="p-1 grid bg-bgdarkgray rounded-md grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-1.5 border border-border">
    //     {products.map((item) => (
    //       <div
    //         className="bg-blue-200 rounded-lg select-none cursor-pointer hover:bg-blue-300 transition-colors"
    //         onClick={() =>
    //           dispatch(
    //             addToCart({
    //               id: item.id,
    //               name: item.name,
    //               imgSrc:
    //                 item.imageUrl ||
    //                 "https://placehold.co/600x400/FAFAFA/000000.svg", // Handle potentially missing imageUrl
    //               itemType: item.category?.name || "Unknown", // Handle missing itemType
    //               price: Number(item.price),
    //               quantity: 1,
    //               note: "",
    //               availableModifiers: item.notes?.map((n) => n.name) || [],
    //             }),
    //           )
    //         }
    //         key={item.id}
    //       >
    //         <div className="flex flex-col">
    //           <div className="p-2 pb-1">
    //             <Image
    //               draggable="false"
    //               className="p-1 rounded-t-lg bg-white object-cover aspect-[4/3]"
    //               src={
    //                 item.imageUrl ||
    //                 "https://placehold.co/600x400/FAFAFA/000000.svg"
    //               }
    //               alt={item.name}
    //               height={600}
    //               width={400}
    //             />
    //           </div>
    //           <p className="font-medium p-2 pt-0 text-lg truncate">
    //             {item.name}
    //           </p>
    //           <div className="flex flex-row justify-between items-center px-2 pb-2">
    //             <p className="text-xs rounded-full">
    //               <span className="bg-orange-50 p-2 border border-orange-200 rounded-full text-orange-400">
    //                 {item.category?.name || "Unknown"}
    //               </span>
    //             </p>
    //             <div className="text-xl font-semibold">
    //               ${Number(item.price).toFixed(2)}
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    // </div>

    <div className="p-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
      {products.map((item) => (
        <div
          className="group bg-white rounded-[1.5rem] p-3 select-none cursor-pointer shadow-sm hover:shadow-md border border-gray-100 transition-all duration-300 hover:-translate-y-1 flex flex-col active:scale-95"
          onClick={() =>
            dispatch(
              addToCart({
                id: item.id,
                name: item.name,
                imgSrc: item.imageUrl ||
                  "https://placehold.co/600x400/FAFAFA/000000.svg",
                itemType: item.category?.name || "Unknown",
                price: Number(item.price),
                quantity: 1,
                note: "",
                availableModifiers: item.modifiers?.map((m) => m.name) || [],
                description: item.description || ""
              }),
            )
          }
          key={item.id}
        >
          {/* ─── Image Container ─── */}
          <div className="w-full aspect-[5/4] mb-3 rounded-xl flex items-center justify-center p-2 overflow-hidden bg-gray-50/30">
            <Image
              draggable="false"
              className="object-contain w-full h-full drop-shadow-sm transition-transform duration-500 group-hover:scale-110"
              src={
                item.imageUrl ||
                "https://placehold.co/600x400/FAFAFA/000000.svg"
              }
              alt={item.name}
              height={300}
              width={300}
            />
          </div>

          {/* ─── Product Info ─── */}
          <div className="flex flex-col flex-1 justify-end px-1 pb-1">
            <p className="font-medium text-gray-900 text-[15px] mb-2 truncate">
              {item.name}
            </p>

            <div className="flex flex-row justify-between items-center">
              {/* The New Dynamic Badge */}
              <Badge
                text={item.category?.name || "Unknown"}
                color={item.category?.color  || "#9CA3AF"} // Fallback to gray if no color exists
              />

              {/* Price */}
              <div className="text-[16px] font-bold text-gray-900">
                ${Number(item.price).toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MenuPage;
