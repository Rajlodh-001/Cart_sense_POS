import MenuNavbar from "./MenuNavbar";
import MenuPage from "./MenuPage"
import MiniMenuNavbar from "./MiniMenuNavbar";
import TopContainer from "./TopContainer";
import SearchBox from "./SearchBox";

const ItemsContainer = ()=>{

return(
    <div className="h-screen bg-slate-300 w-full flex flex-col">
        <TopContainer/>
        {/* <MiniMenuNavbar/> */}
        <MenuNavbar/>
        <SearchBox/>
        <MenuPage/>
    </div>
)
}

export default ItemsContainer