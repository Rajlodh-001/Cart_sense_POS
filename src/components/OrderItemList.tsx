import React from "react";
import Image from "next/image";
import { ItemLists } from "../../lib/TempData";

const OrderItemList = () => {
  return ItemLists.map((item:{id: number; name: string; imgSrc: string; itemType: string; price: string; quantity: string}, index:number) => (
    <li key={item.id} className="list-none ">
      <div className="w-full bg-blue-100">
        <div className="flex flex-row md:items-center p-2 ">
          <div className="item-image pr-2 ">
            <Image
              className="rounded-lg"
              src={item.imgSrc}
              height={120}
              width={120}
              alt="itemImage"
            />
          </div>
          <div className="detail flex flex-col flex-grow md:px-4">
            <div className="name text-lg px-3 pt-1 md:px-0 line-clamp-1 ">{item.name}</div>
            <div className="price px-4 md:px-0">$ {item.price}</div>
            <div className="modified-detail flex flex-row justify-between items-center mt-1">
              <div className="edit-btn cursor-pointer text-blue-500">e</div>
              <div className="inc-dec-btn flex flex-row items-center space-x-2">
                <span className="cursor-pointer text-lg">-</span>
                <p className="text-lg ">{item.quantity}</p>
                <span className="cursor-pointer text-lg">+</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  ));
};

export default OrderItemList;
