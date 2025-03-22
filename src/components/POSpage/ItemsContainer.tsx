import MenuNavbar from "./MenuContainer/MenuNavbar";
import MenuPage from "./MenuContainer/MenuPage"
import MiniMenuNavbar from "../MiniMenuNavbar";
import TopContainer from "./MenuContainer/TopContainer";
import SearchBox from "./MenuContainer/SearchBox";

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