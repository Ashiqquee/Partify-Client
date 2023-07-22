import Sidebar from "../../components/admin/Sidebar";
import ServiceList from "../../components/admin/serviceList";

const Service = () => {

    return(
        <div className='bg-gray-100 min-h-screen min-w-screen font-sans overflow-x-hidden'>
            <Sidebar />


            <div className="flex md:ml-64 lg:ml-64 ">
                <ServiceList/>
            </div>
        </div>
    )

}

export default Service;