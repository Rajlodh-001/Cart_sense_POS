"use client";

import Image from "next/image";
import { useDispatch } from "react-redux";
import { addToCart } from "@/app/(dashboard)/pos/posSlice";
import { apiProducts } from "../../../../lib/TempData";

// Product type matching apiProducts shape
interface Product {
  id: string;
  name: string;
  price: number;
  skuId: string;
  isActive: boolean;
  imgSrc: string;
  itemType: string;
  category: { id: string; name: string };
}

const MenuPage = () => {
  const dispatch = useDispatch();

  return (
    <div className="w-full-[2] m-2 h-screen scrollbar-hide overflow-scroll">
      <div className="p-1 grid bg-bgdarkgray rounded-md xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-1.5">
        {(apiProducts as Product[]).map((item) => (
          <div
            className="bg-blue-200 rounded-lg select-none cursor-pointer hover:bg-blue-300 transition-colors"
            onClick={() =>
              dispatch(
                addToCart({
                  id: item.id,
                  name: item.name,
                  imgSrc: item.imgSrc,
                  itemType: item.itemType,
                  price: item.price,
                  quantity: 1,
                }),
              )
            }
            key={item.id}
          >
            <div className="flex flex-col">
              <div className="p-2 pb-1">
                <Image
                  draggable="false"
                  className="p-1 rounded-t-lg"
                  src={item.imgSrc}
                  alt={item.name}
                  height={600}
                  width={400}
                />
              </div>
              <p className="font-medium p-2 pt-0 text-lg truncate">
                {item.name}
              </p>
              <div className="flex flex-row justify-between items-center px-2 pb-2">
                <p className="text-xs rounded-full">
                  <span className="bg-orange-50 p-2 rounded-full text-orange-400">
                    {item.category.name}
                  </span>
                </p>
                <div className="text-xl font-semibold">${item.price}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuPage;
