import ItemsContainer from "@/components/POSpage/ItemsContainer";
import MiniMenuNavbar from "@/components/POSpage/MenuContainer/MenuPage";
import OrderContainer from "@/components/POSpage/OrderContainer";

const PosPage = () => {
  return (
    <div className="h-screen flex">
      {/* Left */}
      <div className="sm:w-1/2 md:w-3/5 lg:w-2/3 xl:w-[75%] w-1/2 bg-bgdarkgray">
        <ItemsContainer />
      </div>
      {/* Right */}
      <div className="sm:w-1/2 md:w-2/5 lg:w-1/3 xl:w-[25%] w-1/2 xl:bg-red-500 ">
      <OrderContainer/>
      </div>
    </div>
  );
};


// w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center
export default PosPage;
