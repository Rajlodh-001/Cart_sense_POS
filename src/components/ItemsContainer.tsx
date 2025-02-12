import MenuPage from "./MenuPage"
import MiniMenuNavbar from "./MiniMenuNavbar";
import TopContainer from "./TopContainer";

const ItemsContainer = ()=>{

return(
    <div className="h-screen bg-slate-300 w-full flex flex-col">
        <TopContainer/>
        <MiniMenuNavbar/>
        <MenuPage/>
    </div>
)
}

export default ItemsContainer