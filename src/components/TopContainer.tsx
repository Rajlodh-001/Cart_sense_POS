const TopContainer = () => {
  return (
    <div className="flex flex-row justify-between py-1 md:bg-blue-200 sm:bg-green-200 lg:bg-purple-200 xl:bg-violet-300 items-center">
      <div className="w-full flex flex-row items-center">
        <div className="bg-white rounded-full mx-2  h-12 w-12 flex justify-between items-center">
          <button className="bg-slate-200 rounded-full h-10 w-10 mx-1 font-bold">
            M
          </button>
        </div>

        <div className="w-full flex flex-row items-center ">
          <div className="bg-white rounded-full  h-12 flex justify-between items-center ">
            <button className="bg-slate-200 rounded-full h-10 w-10 mx-1 font-bold">
              D
            </button>
            <p className="  px-3 pr-4 font-semibold hidden lg:block xl:block ">
              wed, 8 Feb 2025
            </p>
            <p className="  px-3 pr-4 font-semibold  lg:hidden xl:hidden ">
              8 Feb
            </p>
          </div>

          <p className="px-4 font-bold text-xl">-</p>

          <div className="bg-white rounded-full  h-12 flex justify-between items-center">
            <button className="bg-slate-200 rounded-full h-10 w-10 mx-1 font-bold">
              T
            </button>
            <p className="px-3 pr-4 font-semibold flex ">
              07:59 <p className="text-slate-400 px-1 font-normal">AM</p>
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-full h-12 flex justify-between items-center">
        <p className="text-red-400 pl-2  hidden lg:block xl:block ">•</p>
        <p className=" px-3 pr-4 font-semibold text-red-500  min-w-[120px]  hidden lg:block ">
          Order Close
        </p>
        <button className="bg-slate-200 rounded-full h-10 w-10 mx-1 text-red-500 font-bold">
          C
        </button>
      </div>
    </div>
  );
};

export default TopContainer;
