import Sidebar from '../../components/admin/Sidebar';
import Dashboard from '../../components/admin/Dashboard';

const Home = () => {
  
    return (

        
         <div className='bg-gray-100 h-screen'>
            <Sidebar />


            <div className="flex md:ml-64 lg:ml-64 ">
                <Dashboard />
            </div>
        </div>
            

    );
};

export default Home;
