import Sidebar from "../../components/user/Sidebar";
import Feed from "../../components/user/Feed";
import Footer from "../../components/Footer";

const Home = () => {
   
   
    return (
        <div className="bg-gray-100" >
            <Sidebar />
            <div className="flex  md:ml-72  lg:ml-72 ">
                <Feed />
                
            </div>   
            <div className="flex  md:ml-64  lg:ml-64 ">
              <Footer/>  
            </div>
             
        </div>
        
    )
}

export default Home;