import Sidebar from "../../components/provider/Sidebar";
import Dashboard from "../../components/provider/Dashboard";

const Home = () => {
    return (
        <div>
      
            
                <Sidebar />
            <div className="flex md:ml-64 lg:ml-64 ">

                <Dashboard />
            </div>
                
            
        </div>
    );
}

export default Home;