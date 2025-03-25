"use client"

import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
} from "@/app/(dashboard)/pos/posSlice";
import { Menudata } from "../../../../lib/TempData";
import { RootState } from "@/store/store";

const MenuPage = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.items);

  // const getCartItem = (id: number) => cart.find((item) => item.id === id);
  return (
    <>
      <div className="w-full-[2] m-2 h-screen scrollbar-hide overflow-scroll">
        <div className="p-1 grid bg-bgdarkgray rounded-md xl:grid-cols-5  lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-1.5 ">
          {Menudata.map(
            (
              item: {
                id: number;
                name: string;
                imgSrc: string;
                itemType: string;
                price: string;
              },
              index
            ) => (
              <div
                className=" bg-blue-200 rounded-lg select-none"
                onClick={() => dispatch(addToCart({... item,quantity:1}))}
                key={index}
                
              >
                <div className="flex flex-col">
                  <div className="p-2 pb-1">
                    <Image
                      draggable="false"
                      className="p-1 rounded-t-lg "
                      src={item.imgSrc}
                      alt="product image"
                      height={600}
                      width={400}
                    />
                  </div>
                  <p className="font-medium p-2 pt-0 text-lg truncate">
                    {item.name}
                  </p>
                  <div className="flex flex-row">
                    <p className=" text-xs m-2 rounded-full ">
                      <span className=" bg-orange-50 p-2 rounded-full text-orange-400">
                        {item.itemType}
                      </span>
                    </p>
                    <div className="text-xl pl-auto p-2">${item.price}</div>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default MenuPage;
