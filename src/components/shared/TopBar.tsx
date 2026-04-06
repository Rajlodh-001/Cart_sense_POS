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

import { useState, useEffect } from "react";
import { Menu, Calendar, Clock, Power } from "lucide-react";
import { useLogout } from "@/hooks/useAuth";
import SidebarMenu from "./SidebarMenu";

const TopBar = () => {
  const logoutMutation = useLogout();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  const shortDate = currentDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
  });

  const formattedTime = currentDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4 mt-1 select-none">
        <div className="flex items-center space-x-1.5 md:space-x-3 lg:space-x-5">
          {/* Hamburger Menu */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm hover:shadow-md transition-all text-blue-600 flex-shrink-0 border border-gray-50 active:scale-95"
          >
            <Menu size={20} />
          </button>

          {/* Date Info */}
          <div className="flex items-center space-x-1.5 md:space-x-2 bg-white px-2 md:px-4 py-1.5 md:py-2 rounded-xl border border-gray-50 shadow-sm flex-shrink-0">
            <Calendar size={16} className="text-blue-500 flex-shrink-0" />
            <span className="font-bold text-gray-700 text-[11px] md:text-sm lg:text-base tracking-tight whitespace-nowrap capitalize">
              <span className="hidden lg:inline">{formattedDate}</span>
              <span className="lg:hidden">{shortDate}</span>
            </span>
          </div>

          {/* Time Info */}
          <div className="flex items-center space-x-1.5 md:space-x-2 bg-white px-2 md:px-4 py-1.5 md:py-2 rounded-xl border border-gray-50 shadow-sm flex-shrink-0">
            <Clock size={16} className="text-blue-500 flex-shrink-0" />
            <span className="font-bold text-gray-700 text-[11px] md:text-sm lg:text-base tracking-tight">
              {formattedTime}
            </span>
          </div>
        </div>

        {/* Right Corner Utilities */}
        <div className="flex items-center space-x-1.5 md:space-x-3 lg:space-x-4">
          <button className="flex items-center space-x-1.5 md:space-x-2 bg-red-50 text-red-500 px-2 md:px-4 py-1.5 md:py-2 rounded-xl font-bold hover:bg-red-100 transition-colors border border-red-100 flex-shrink-0 group active:scale-95">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
            <span className="hidden lg:inline text-[11px] md:text-xs lg:text-sm font-extrabold ">
              Close Order
            </span>
          </button>

          <button
            onClick={handleLogout}
            title="Sign Out"
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-red-500 hover:bg-red-50 hover:shadow-md transition-all flex-shrink-0 border border-gray-50 active:scale-95"
          >
            <Power size={18} />
          </button>
        </div>
      </div>

      {/* Sidebar Menu */}
      <SidebarMenu isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
};

export default TopBar;
