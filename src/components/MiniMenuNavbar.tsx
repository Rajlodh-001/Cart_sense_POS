// import Image from "next/image";

// const MiniMenuNavbar = () => {
//   return (
//     <>
//       <div className="w-full-[4] m-2 mb-0 ">
//         <div className="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-2 ">

//             <div className=" ">
//               <div className="border-blue-500 border-2 w-[140px] h-[140px] rounded-lg bg-white py-1">
//                 <Image className=" m-3 rounded-full" src="https://placehold.co/50x50/909497/000000.svg" alt="product image" height={48} width={48} />
//                 <div className=" text-blue-500 px-2 font-medium text-lg">
//                   ALL Menu
//                 </div>
//                 <div className=" px-2 text-gray-500">20 Items</div>
//               </div>
//             </div>

//             <div className="">
//               <div className="w-[140px] h-[140px] rounded-lg bg-white py-1">
//                 <div className="circle m-3  rounded-full w-12 h-12 bg-blue-400">
//                   <p className="text-center font-bold text-4xl">M</p>
//                 </div>
//                 <div className=" text-blue-500 px-2 font-medium text-lg">
//                   ALL Menu
//                 </div>
//                 <div className=" px-2 text-gray-500">20 Items</div>
//               </div>
//             </div>

//             <div className="">
//               <div className="w-[140px] h-[140px] rounded-lg bg-white py-1">
//                 <div className="circle m-3  rounded-full w-12 h-12 bg-blue-400">
//                   <p className="text-center font-bold text-4xl">M</p>
//                 </div>
//                 <div className=" text-blue-500 px-2 font-medium text-lg">
//                   ALL Menu
//                 </div>
//                 <div className=" px-2 text-gray-500">20 Items</div>
//               </div>
//             </div>

//             <div className="">
//               <div className="w-[140px] h-[140px] rounded-lg bg-white py-1">
//                 <div className="circle m-3  rounded-full w-12 h-12 bg-blue-400">
//                   <p className="text-center font-bold text-4xl">M</p>
//                 </div>
//                 <div className=" text-blue-500 px-2 font-medium text-lg">
//                   ALL Menu
//                 </div>
//                 <div className=" px-2 text-gray-500">20 Items</div>
//               </div>
//             </div>



//             <div className=" ">
//               <div className="  w-full h-full rounded-lg bg-white py-1">
//                 <Image className=" m-3 rounded-full" src="https://placehold.co/50x50/909497/000000.svg" alt="product image" height={48} width={48} />
//                 <div className=" text-blue-500 px-2 font-medium text-lg">
//                   ALL Menu
//                 </div>
//                 <div className=" px-2 text-gray-500">20 Items</div>
//               </div>
//             </div>
//             <div className="flex justify-center">
//           <div className="border-blue-500 border-2 w-[140px] h-[140px] rounded-lg bg-white py-1 flex flex-col items-start p-2">
//             <Image className="rounded-full" src="https://placehold.co/50x50/909497/000000.svg" alt="product image" height={48} width={48} />
//             <div className="text-blue-500 font-medium text-lg mt-2">
//               ALL Menu
//             </div>
//             <div className="text-gray-500">20 Items</div>
//           </div>
//         </div>
            
            
         
          

        
//         </div>
//       </div>
//     </>
//   );
// };

// export default MiniMenuNavbar;

import Image from "next/image";

const MiniMenuNavbar = () => {
  return (
    <div className="w-full p-2">
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 overflow-auto"> */}
      <div className="flex flex-row overflow-auto gap-2">

        

        <div className="flex justify-center">
          <div className="border-blue-500 border-2 w-[140px] h-[140px] rounded-lg bg-white py-1 flex flex-col items-start p-2">
            <Image className="rounded-full m-2" src="https://placehold.co/50x50/909497/000000.svg" alt="product image" height={48} width={48} />
            <div className="text-blue-500 font-medium text-lg mt-2">
              ALL Menu
            </div>
            <div className="text-gray-500">20 Items</div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="border-blue-500 border-2 w-[140px] h-[140px] rounded-lg bg-white py-1 flex flex-col items-start p-2">
            <Image className="rounded-full m-2" src="https://placehold.co/50x50/909497/000000.svg" alt="product image" height={48} width={48} />
            <div className="text-blue-500 font-medium text-lg mt-2">
              ALL Menu
            </div>
            <div className="text-gray-500">20 Items</div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="border-blue-500 border-2 w-[140px] h-[140px] rounded-lg bg-white py-1 flex flex-col items-start p-2">
            <Image className="rounded-full m-2" src="https://placehold.co/50x50/909497/000000.svg" alt="product image" height={48} width={48} />
            <div className="text-blue-500 font-medium text-lg mt-2">
              ALL Menu
            </div>
            <div className="text-gray-500">20 Items</div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="border-blue-500 border-2 w-[140px] h-[140px] rounded-lg bg-white py-1 flex flex-col items-start p-2">
            <Image className="rounded-full m-2" src="https://placehold.co/50x50/909497/000000.svg" alt="product image" height={48} width={48} />
            <div className="text-blue-500 font-medium text-lg mt-2">
              ALL Menu
            </div>
            <div className="text-gray-500">20 Items</div>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="border-blue-500 border-2 w-[140px] h-[140px] rounded-lg bg-white py-1 flex flex-col items-start p-2">
            <Image className="rounded-full m-2" src="https://placehold.co/50x50/909497/000000.svg" alt="product image" height={48} width={48} />
            <div className="text-blue-500 font-medium text-lg mt-2">
              ALL Menu
            </div>
            <div className="text-gray-500">20 Items</div>
          </div>
        </div>
        

      </div>
    </div>
  );
};

export default MiniMenuNavbar;
