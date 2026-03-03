// import Image from "next/image";
// import imgMenu from "../../../../public/icons/menu-burger.png"
// import imgCalendar from "../../../../public/icons/calendar-day.png"
// import imgClock from "../../../../public/icons/clock.svg"
// import imgPower from "../../../../public/icons/power.svg"
// import imgPowergreen from "../../public/icons/powergreen.svg"

// const TopContainer = () => {
//   return (
//     <div className="flex flex-row justify-between py-1 px-2 md:bg-blue-200 sm:bg-green-200 lg:bg-purple-200 xl:bg-violet-300 items-center ">

//       <div className="w-full flex flex-row items-center ">

//         {/* thsi is the menu */}
//         <div className="bg-white rounded-full mx-1  h-12 w-12 flex justify-between items-center">
//           <button className="bg-slate-200 rounded-full h-10 w-10 mx-1 font-bold flex justify-center items-center">

//             <Image className="" src={imgMenu} height={20} width={20} alt=""></Image>
//           </button>
//         </div>

//         <div className="w-full flex flex-row items-center ">
//           <div className="bg-white rounded-full  h-12 flex justify-between items-center ">
//             <button className="bg-slate-200 rounded-full h-10 w-10 mx-1 font-bold flex items-center justify-center">
//               <Image src={imgCalendar} width={20} height={20} alt=""/>
//             </button>
//             <p className="  px-3 pr-4 font-semibold hidden lg:block xl:block text-nowrap">
//               wed, 8 Feb 2025
//             </p>
//             <p className="  px-3 pr-4 font-semibold  lg:hidden xl:hidden text-nowrap ">
//               8 Feb
//             </p>
//           </div>

//           <p className="px-4 font-bold text-xl hidden sm:block md:block lg:block xl:block">-</p>

//           <div className="bg-white rounded-full  h-12 flex justify-between items-center">
//             <button className="bg-slate-200 rounded-full h-10 w-10 mx-1 font-bold flex justify-center items-center">
//               <Image src={imgClock} height={20} width={20} alt=""></Image>
//             </button>
//             <p className="px-3 pr-4 font-semibold flex ">
//               07:59 <span className="text-slate-400 px-1 font-normal">AM</span>
//             </p>
//           </div>
//         </div>
//       </div>

//       <div className="bg-white rounded-full h-12 flex justify-between items-center">
//         <p className="text-red-400 pl-2  hidden lg:block xl:block ">•</p>
//         <p className=" px-3 pr-4 font-semibold text-red-500  min-w-[120px]  hidden lg:block ">
//           Order Close
//         </p>
//         <button className="bg-slate-200 rounded-full h-10 w-10 mx-1 text-red-500 font-bold flex items-center justify-center">
//           <Image src={imgPower} height={20} width={20} alt="close button"></Image>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TopContainer;

"use client";

import { Menu, Calendar, Clock, Power } from "lucide-react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { logout } from "@/app/auth/authSlice";
import type { AppDispatch } from "@/store/store";

const TopContainer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleLogout = async () => {
    const result = await dispatch(logout());
    if (logout.fulfilled.match(result)) {
      router.push("/auth/login");
    }
  };

  return (
    <div className="flex justify-between items-center mb-8">
      <div className="flex items-center space-x-6">
        {/* Hamburger */}
        <button className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm hover:shadow-md transition-all text-blue-600">
          <Menu size={24} />
        </button>

        {/* Date Widget */}
        <div className="flex items-center space-x-3 bg-white px-5 py-3 rounded-2xl shadow-sm">
          <Calendar size={20} className="text-blue-500" />
          <span className="font-bold text-gray-700">Wed, 29 May 2024</span>
        </div>

        {/* Time Widget */}
        <div className="flex items-center space-x-3 bg-white px-5 py-3 rounded-2xl shadow-sm">
          <Clock size={20} className="text-blue-500" />
          <span className="font-bold text-gray-700">07:59 AM</span>
        </div>
      </div>

      {/* Right Side Status Button */}
      <div className="flex items-center space-x-4">
        <button className="flex items-center space-x-2 bg-red-50 text-red-500 px-5 py-3 rounded-2xl font-bold hover:bg-red-100 transition-colors">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
          <span>Close Order</span>
        </button>
        <button
          onClick={handleLogout}
          title="Logout"
          className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-red-500 hover:bg-red-50 hover:shadow-md transition-all"
        >
          <Power size={20} />
        </button>
      </div>
    </div>
  );
};

export default TopContainer;
