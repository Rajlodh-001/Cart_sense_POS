import ItemsContainer from "@/components/ItemsContainer";
import MiniMenuNavbar from "@/components/MenuPage";

const PosPage = () => {
  return (
    <div className="h-screen flex">
      {/* Left */}
      <div className="sm:w-1/2 md:w-2/3 lg:w-2/3 xl:w-[75%] w-1/2 bg-bgdarkgray">
        <ItemsContainer />
      </div>
      {/* Right */}
      <div className="sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-[25%] w-1/2 xl:bg-red-500 bg-red-200"></div>
    </div>
  );
};

export default PosPage;
