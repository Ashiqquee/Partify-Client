import Sidebar from "../../components/user/Sidebar";
import Feed from "../../components/user/Feed";
// import FavProvider  from "../../components/user/FavProvider";

const Home = () => {
   
   
    return (
        <div className="bg-gray-100" >
            <Sidebar />
            <div className="flex  md:ml-72  lg:ml-72 ">
                <Feed />
                
            </div>   
            <div className="flex  md:ml-72  lg:ml-72 ">
              </div>
        </div>
        
    )
}

export default Home;