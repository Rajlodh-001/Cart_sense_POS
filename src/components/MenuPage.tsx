import Image from "next/image";
import { Menudata } from "../../lib/TempData";

const MenuPage = () => {
  return (
    <>
      <div className="w-full-[2] m-2 h-screen scrollbar-hide overflow-scroll">
        <div className="p-1 grid bg-bgdarkgray rounded-md xl:grid-cols-5  lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-1.5 ">


          {/* <div className=" bg-blue-200 rounded-lg">
            <div className="flex flex-col">
              <div className="p-2">
                <Image
                  className="p-1 rounded-t-lg"
                  src="https://placehold.co/600x400/FAFAFA/000000.svg"
                  alt="product image"
                  height={600}
                  width={400}
                />
              </div>
              <p className="font-medium p-2  text-xl">Veg Sandwhich</p>
              <div className="flex flex-row">
                <p className=" text-xs m-2 rounded-full ">
                  {" "}
                  <span className=" bg-orange-50 p-2 rounded-full text-orange-400">
                    sandwich
                  </span>
                </p>
                <div className="text-2xl pl-auto p-2">$6.49</div>
              </div>
            </div>
          </div> */}

  

          {Menudata.map(
            (item: {
              id: number;
              name: string;
              imgSrc: string;
              itemType: string;
              price: string;
            },index) => (
              <div className=" bg-blue-200 rounded-lg" key={index}>
                <div className="flex flex-col">
                  <div className="p-2 pb-1">
                
                    <Image
                      className="p-1 rounded-t-lg"
                      src={item.imgSrc}
                      alt="product image"
                      height={600}
                      width={400}
                    />
                  </div>
                  <p className="font-medium p-2 pt-0 text-lg truncate">{item.name}</p>
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
