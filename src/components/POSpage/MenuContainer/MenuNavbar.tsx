import { miniMenuBardata } from "../../../../lib/TempData";
import Image from "next/image";

const MenuNavbar = () => {
  return (
    <div className="w-full-[2] m-2 mb-0 bg-white p-1.5 rounded-lg  md:overflow-visible lg:overflow-visible 2xl:overflow-visible sm:overflow-x-auto scrollbar-hide">
      <div className="flex overflow-x-auto  gap-2 sm:grid  sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8  ">
        {miniMenuBardata?.map(
          (
            item: {
              id: number;
              name: string;
              textimg: string;
              totalItems: string;
            },
            index: number
          ) => (
            <div
              key={index}
              className="border-2 flex flex-col justify-center rounded-lg bg-white py-2 px-4 sm:p-2 items-start  min-w-[60px] md:min-w-0"
            >
              <div className="text-blue-500 font-medium mt-1">{item.name}</div>
              <div className="text-gray-500 text-sm">
                {item.totalItems} items
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default MenuNavbar;
