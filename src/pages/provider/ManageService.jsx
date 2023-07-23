import Services from "../../components/provider/ServiceManage";
import Sidebar from "../../components/provider/Sidebar";


const ManageServices = () => {
    return(
        <>
            <Sidebar />


            <div className="flex md:ml-64 lg:ml-64 ">
                
                <Services />
            </div>

        </>
    )
}

export default ManageServices;