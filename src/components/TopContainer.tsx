const TopContainer = () => {
  return (
    <div className="flex flex-row mx-auto justify-between">
      <div className="w-full flex flex-row items-center">
        <div className="bg-white rounded-full mx-2  h-12 w-12 flex justify-between items-center">
          <button className="bg-slate-200 rounded-full h-10 w-10 mx-1">
            I
          </button>
        </div>

        <div className="w-full flex flex-row items-center ">
          <div className="bg-white rounded-full  h-12 min-w-[170px] flex justify-between items-center">
            <button className="bg-slate-200 rounded-full h-10 w-10 mx-1">
              I
            </button>
            <p className=" px-3 pr-4 font-semibold">wed, 8 Feb 2025</p>
          </div>

          <p className="px-4 font-bold text-xl">-</p>

          <div className="bg-white rounded-full  h-12 min-w-[150px] flex justify-between items-center">
            <button className="bg-slate-200 rounded-full h-10 w-10 mx-1">
              I
            </button>
            <p className=" px-3 pr-4 font-semibold flex  ">
              07:59 <p className="text-slate-400 px-1 font-normal">AM</p>
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-full  h-12 min-w-[170px] flex justify-between items-center">
        <p></p>
        <p className=" px-3 pr-4 font-semibold text-red-500 ">Order Close</p>
        <button className="bg-slate-200 rounded-full h-10 w-10 mx-1 text-red-500">M</button>
      </div>
    </div>
  );
};

export default TopContainer;
