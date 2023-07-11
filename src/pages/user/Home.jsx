import Sidebar from "../../components/user/Sidebar";
import Feed from "../../components/user/Feed";
// import FavProvider  from "../../components/user/FavProvider";

const Home = () => {
   
   
    return (
        <>
            <Sidebar />
            <div className="flex  md:ml-72  lg:ml-96 ">
                <Feed />
                
            </div>    
        </>
    )
}

export default Home;