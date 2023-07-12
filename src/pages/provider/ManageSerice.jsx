import ServiceButton from "../../components/provider/ServiceButton";
import Sidebar from "../../components/provider/Sidebar";


const ManageServices = () => {
    return(
        <>
            <Sidebar />


            <div className="flex md:ml-64 lg:ml-64 ">
                
                <ServiceButton />
            </div>

        </>
    )
}

export default ManageServices;